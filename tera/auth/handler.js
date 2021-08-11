const _ = require("lodash");
const Joi = require("joi");
const Phone = Joi.extend(require('joi-phone-number'));
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");
var md5 = require('md5');

module.exports = function (app) {
	const UsersModel = "Users"

	// Password Hashing
	async function pash(pass) {
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(pass, salt);
		return hashed;
	}

	async function newHC(id,ip){
		const pass = md5(id + ip)
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(pass, salt);
		return pass;
	}

	// Function for signing Users Token
	const newJWTToken = async (payload,req) => {
		const hc =  await newHC(payload._id,req.ip)
		return String(app.jwt.sign({..._.pick(payload, ( ["_id", "name", "user"])),hc}))
	}

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
					page: { type: 'number' },
					items: { type: 'number' }
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
					npass: { type: 'string' },
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
			_id: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
			name: Joi.string().pattern(new RegExp("^[a-zA-Z ]{2,50}$")),
			user: Joi.string().alphanum().min(3).max(30),
			pass: passwordComplexity(complexityOptions),
			npass: passwordComplexity(complexityOptions),
			string: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
			phone: Phone.string().phoneNumber(),
			email: Joi.string().email(),
			lon: Joi.number(),
			lat: Joi.number(),
			defaultPhoto: Joi.string().min(1),
		});
		return schema.validate(user);
	}


	// Register Handler
	const register = async (req, res) => {
		// Validate Request Data
		const { error } = validate(req.body);
		if (error) return res.code(200).send({type: 'error', message: error.details[0].message });

		// Validate Username
		const dups = await app.mongoose[UsersModel].findOne({ user: req.body.user });
		if (dups) return res.code(200).send({type: 'error', message: "Username already exists" });

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
					...u._doc,
					token: newJWTToken(u,req),
				})
			)
			.catch((e) => {
				res.code(200).send({type: 'error',
					message:
						"Failed to register. Please contact your administrator to fix this error",
				})
			});
	}

	// Login Handler
	const login = async (req, res) => {
		// Filter Request Data
		const pre_id = _.pick(req.body, (['user', 'id','email']))
		const login_id = pre_id.id || pre_id.user || pre_id.email;

		const id = login_id.match(/^[0-9a-fA-F]{24}$/) ? { _id: login_id }
			: login_id.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? { email: login_id }
				: { user: login_id }

		const entry = { ...id, pass: req.body.pass }

		// Validate Request Data
		const { error } = validate(entry);
		if (error) return res.code(200).send({type: 'error', message: error.details[0].message });

		// Check if user exists
		const user = await app.mongoose[UsersModel].findOne(id);
		if (!user) return res.code(200).send({ type: "error", message: "Invalid credentials" });

		// Verify Password
		const pass = await bcrypt.compare(entry.pass, user.pass);
		if (!pass) return res.code(200).send({ type: "error", message: "Invalid credentials" });

		// Reply token
		console.log('+++++++ USER +++++++',user)
		res.code(200).send({
			status: "success",
			message: "You are now logged in.",
			token: await newJWTToken(user,req),
			..._.pick(user,['name','_id','user','created_at'])
		});
	}

	// Auth + Global Schema 
	const auth = () => ({ preValidation: [app.authenticate], ...gschema });

	// Auth + Read Handler Schema
	const rdauth = () => ({ preValidation: [app.authenticate], ...rdschema });

	// Read User Handler
	// Make sure to add `rdauth()`` as a schema in your routes 
	// to validate the request before calling this handler
	const read = async (req, res) => {
		const me = { _id: req.user?._id }
		const other = _.pick(req.params, ['user', '_id'])
		const find = (other._id || other.user) ? other : me
		const user = await app.mongoose[UsersModel].findOne(find);
		if (!user) return res.code(200).send({});
		res.send(user);
	}

	// Read Users Handler
	const reads = async (req, res) => {
		const pg = _.pick(req.params, ['page', 'items'])
		const page = pg.page || 1
		const items = pg.items || 20
		const users = await app.mongoose[UsersModel].paginate({}, { page: page, limit: items });
		res.send({
			type: "success",
			message: `${users.docs.length} users found.`,
			data: users.docs,
		});
	}

	// Update User Handler
	const update = async (req, res) => {
		// Filter Request
		const { error } = validate(req.body);
		if (error) return res.code(200).send({ type: 'error',message: error.details[0].message });

		// Filter Data
		
		// Updatables that don't need to resubmit password
		const upPub = _.pick(req.body, ['defaultPhoto', 'countryCode', 'phone', 'email'])
		
		// Confidential/Secured data that needs to re-sub mit password
		const cfPub = _.pick(req.body, ['user', 'pass', 'npass', 'name'])

		let ndata = {};

		const { _id } = req.user;
		const user = await app.mongoose[UsersModel].findOne({ _id });
		if (!user) return res.code(200).send({ type: 'error',message: "User not found" });

		if (Object.keys(cfPub).length > 0) {
			if (!cfPub.pass) return res.code(200).send({type: 'error', message: "Invalid password, you must re-submit your password to apply this changes." });

			const pass = await bcrypt.compare(cfPub.pass, user.pass);
			if (cfPub.npass) {
				if (cfPub.pass == cfPub.npass) {
					return res.code(200).send({type: 'error', message: "Invalid Password, must be different from previous password!" });
				} else {
					ndata["pass"] = await pash(cfPub.npass);
				}
			}

			if (!pass) return res.code(200).send({type: 'error', message: "Password doesn't match! try again later." });

			ndata = { ...ndata, ..._.pick(cfPub, ['user', 'name']) }

			if (typeof ndata.user == "string") {
				if (ndata.user == user.user) return res.code(200).send({type: 'error', message: "New username must not be equal to old username! try again later." });
				const usernameCheck = await app.mongoose[UsersModel].findOne({ user: ndata.user });
				if (usernameCheck) return res.code(200).send({type: 'error', message: "Username already exists, please choose another username" });
			}
		}

		ndata = { ...ndata, ...upPub }

		if (Object.keys(ndata).length <= 0) return res.code(200).send({ message: "Noting to update" });

		const update = await app.mongoose[UsersModel].findOneAndUpdate(
			{ _id },
			ndata,
			{ new: true }
		);

		if (!update) res.code(200).send({type: 'error', message: "Server error! Failed to update." })
		res.code(200).send({type: 'success', message: "Userdata updated successfully." })
	}

	// Delete User Handler
	const remove = async (req, res) => {
		if (!req.body?.pass) return res
			.code(200)
			.send({
				type: "error",
				message:
					"You must re-submit your password to complete this action.",
			});
		const { _id } = req.user;
		const user = await app.mongoose[UsersModel].findOne({ _id });
		if (!user) {
			return res
				.code(200)
				.send({
					type: "error",
					message:
						"Server Error. Failed to find user information, failed to delete",
				});
		}

		const pass = await bcrypt.compare(req.body.pass, user.pass);
		if (!pass)
			return res.code(200).send({ type: "error", message: "Invalid password" });

		const deleteStatus = await app.mongoose[UsersModel].findOneAndDelete({ _id });
		if (!deleteStatus)
			return res
				.code(200)
				.send({
					type: "error",
					message: "Server Error. Failed to delete user",
				});
		res.send({ message: "User deleted successfully" });
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
		delete: remove
	}
}