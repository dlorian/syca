var User = new mongoose.Schema({
	'email': {
		type: String,
		validate: [validatePresenceOf, 'an email is required'],
		index: {
			unique: true
		}
	},
	'hashed_password': String,
	'salt': String
});

User.virtual('id')
	.get(function() {
		return this._id.toHexString();
	});

User.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

User.method('authenticate', function(plainText) {
	return this.encryptPassword(plainText) === this.hashed_password;
});

User.method('makeSalt', function() {
	return Math.round((new Date().valueOf() * Math.random())) + '';
});

User.method('encryptPassword', function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

User.pre('save', function(next) {
	if (!validatePresenceOf(this.password)) {
		next(new Error('Invalid password'));
	} else {
		next();
	}
});

var user = mongoose.model('User', User);

function checkAuth(req, res, next) {
	if (!req.session.user_id) {
		res.send('You are not authorized to view this page');
	} else {
		next();
	}
}

app.get('/my_secret_page', checkAuth, function(req, res) {
	res.send('if you are viewing this page it means you are logged in');
});

app.post('/login', function(req, res) {
	var post = req.body;
	if (post.user == 'john' && post.password == 'johnspassword') {
		req.session.user_id = johns_user_id_here;
		res.redirect('/my_secret_page');
	} else {
		res.send('Bad user/pass');
	}
});

app.get('/logout', function(req, res) {
	delete req.session.user_id;
	res.redirect('/login');
});