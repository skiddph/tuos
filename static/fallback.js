module.exports = async function (app, options, done) {
	app.get('/home', (req, res) => res.redirect('/#'))
	app.get('/login', (req, res) => res.redirect('/#/login'))
	app.get('/register', (req, res) => res.redirect('/#/register'))
}
