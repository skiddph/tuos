module.exports = function (app, options) {
    
    const writeSchema = {
	}

    const schema = {
        write: writeSchema
    }
    
    const write = (req, res) => {
		res.send({ok:"ok"})
    }

    return {
        write,
        schema
    }
}