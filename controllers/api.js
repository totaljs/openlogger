exports.install = function() {

	CORS();

	ROUTE('+POST  /  *Logs   --> insert', 512); // max. 512 kB

	// Index
	ROUTE('GET /', index);
};

function index() {
	if (PREF.token)
		this.plain(MAIN.name + ' v' + MAIN.version);
	else
		this.redirect('/setup/');
}