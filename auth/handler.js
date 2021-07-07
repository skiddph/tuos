const _ = require("lodash");
const Joi = require("joi");
const Phone = Joi.extend(require('joi-phone-number'));
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");

module.exports = function (app, options) {
	// Plugin config from Tuos Universal Config
	const config = options.config?.plugins?.auth || {}

	// Users `key` to `app.mongoose[key]`
	const UsersModel = config.users.model || "Users"

	// Function for signing Users Token
	const newJWTToken = (payload) => app.jwt.sign(_.pick(payload, (config?.jwt?.payload || ["_id", "name", "user"])))

	// Global Response Schema
	const userResponseSchema = {
		_id: { type: 'string' },
		name: { type: 'string' },
		user: { type: 'string' },
		phone: { type: 'string' },
		phoneVerified: { type: 'boolean' },
		countryCode: { type: 'string' },
		lon: { type: 'number' },
		lat: { type: 'number' },
		email: { type: 'string' },
		emailVerified: { type: 'boolean' },
		defaultPhoto: { type: 'string' },
		created_at: { type: 'number' },
		createdAt: { type: 'string' },
		updatedAt: { type: 'string' },
		token: { type: 'string' }
	}

	// Global Schema Template for Users Model
	const gschema = {
		schema: {
			params: {
				type: "object",
				properties: {
					_id: { type: 'string' },
					user: { type: 'string' },
					page: {type: 'number'},
					items:{type: 'number'}
				}
			},
			body: {
				type: "object",
				required: [],
				properties: {
					_id: { type: 'string' },
					name: { type: 'string' },
					user: { type: 'string' },
					pass: { type: 'string' },
					opass: { type: 'string' },
					phone: { type: 'string' },
					countryCode: { type: 'string' },
					lon: { type: 'number' },
					lat: { type: 'number' },
					email: { type: 'string' },
					defaultPhoto: { type: 'string' }
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						type: { type: "string", default: "success" },
						message: { type: "string", default: "Request success" },
						data: {
							type: "array", 
							items: {
								type: "object",
								properties: userResponseSchema
							}
						},
						...userResponseSchema
					},
				},
				400: {
					type: "object",
					properties: {
						type: { type: "string", require: true, default: "error" },
						message: { type: "string", default: "Invalid data" },
					},
				},
				404: {
					type: "object",
					properties: {
						type: { type: "string", default: "error" },
						message: { type: "string", default: "Invalid Credentials" },
					},
				},
				500: {
					type: "object",
					properties: {
						type: { type: "string", default: "error" },
						message: { type: "string", default: "Server error" },
					},
				},
			}
		}
	}

	// Schema for Read Handler
	const rdschema = {
		schema: {
			params: gschema.schema.params,
			response: gschema.schema.response,
		}
	}
	
	// Add additional required parameters to `schema.body.required` from Global Schema
	const rschema = (req = []) => {
		const schem = gschema
		schem.schema.body.required = req
		return schem
	}

	// Password Complexity for Password Validation
	const complexityOptions = {
		min: 5,
		max: 1024,
		lowerCase: 1,
		upperCase: 1,
		numeric: 1,
		symbol: 1,
		requirementCount: 4,
	};

	// Request global validator for Users Model
	function validate(user) {
		const schema = Joi.object({
			name: Joi.string().pattern(new RegExp("^[a-zA-Z ]{2,50}$")).min(2).max(50),
			user: Joi.string().alphanum().min(3).max(30),
			pass: passwordComplexity(complexityOptions),
			cpass: passwordComplexity(complexityOptions),
			string: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
			phone: Phone.string().phoneNumber(),
			email: Joi.string().email(),
			lon: Joi.number(),
			lat: Joi.number(),
			defaultPhoto: Joi.string().min(1),
		});
		return schema.validate(user);
	}

	// Password Hashing
	async function pash(pass) {
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(pass, salt);
		return hashed;
	}

	// Register Handler
	const register = async (req, res) => {
		// Validate Request Data
		const { error } = validate(req.body);
		if (error) return res.code(400).send({message: error.details[0].message });

		// Validate Username
		const dups = await app.mongoose[UsersModel].findOne({user:req.body.user});
		if(dups) return res.code(400).send({message:"Username already exists" });

		// Create user object
		const user = new app.mongoose[UsersModel](req.body);
		
		// Set timestamp
		user.created_at = Date.now();
		
		// Hash password
		user.pass = await pash(req.body.pass)
		
		// Save user object to database
		await user.save()
			.then((u) => 
				res.code(200).send({
					message: "User successfully created.",
					data: u._doc,
					token: newJWTToken(u),
				})
			)
			.catch((e) =>{
				res.code(500).send({
					message:
						"Failed to register. Please contact your administrator to fix this error",
				})
			});
	}

	// Login Handler
	const login = async (req, res) => {
		// Filter Request Data
		const id = _.pick(req.body, (config?.login?.allowed || ['user','_id']))
		const entry = {...id,pass:req.body.pass}

		// Validate Request Data
		const { error } = validate(entry);
	    if (error)return res.code(400).send({ message: error.details[0].message });

	    // Check if user exists
	    const user = await app.mongoose[UsersModel].findOne(id);
	    if (!user) return res.code(400).send({ type: "error", message: "Invalid credentials" });
	    
	    // Verify Password
	    const pass = await bcrypt.compare(entry.pass, user.pass);
	    if (!pass)return res.code(400).send({ type: "error", message: "Invalid credentials" });

	    // Reply token
	    res.send({
	      status: "success",
	      message: "You are now logged in.",
	      token: newJWTToken(user),
	    });
	}

	// Auth + Global Schema 
	const auth = () => ({ preValidation: [app.authenticate],...gschema });

	// Auth + Read Handler Schema
	const rdauth = () => ({ preValidation: [app.authenticate],...rdschema});

	// Read User Handler
	// Make sure to add `rdauth()`` as a schema in your routes 
	// to validate the request before calling this handler
	const read = async (req, res) => {
		const me = {_id: req.user?._id}
		const other = _.pick(req.params,['user','_id'])
		const find = (other._id || other.user) ? other : me
		const user = await app.mongoose[UsersModel].findOne(find);
	    if (!user) return res.code(404).send({});
	    res.send(user);
	}

	// Read Users Handler
	const reads = async (req, res) => {
		const pg = _.pick(req.params,['page','items'])
		const page = pg.page || 1
		const items = pg.items || config.users?.items || 20
		const users = await app.mongoose[UsersModel].paginate({},{page:page,limit:items});
	    res.send({
	      type: "success",
	      message: `${users.docs.length} users found.`,
	      data: users.docs,
	    });
	}

	// Read Users Handler
	const update = async (req, res) => {
		console.log(req.params)
		res.send(req.user)
	}

	// Read Users Handler
	const remove = async (req, res) => {
		console.log(req.params)
		res.send(req.user)
	}

	// Returns Schema and Handlers
	return {
		register,
		gschema,
		rschema,
		login,
		auth,
		rdauth,
		read,
		reads,
		update,
		delete:remove
	}
}