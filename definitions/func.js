FUNC.preparetokens = function() {

	MAIN.tokens = {};

	if (PREF.tokens) {
		for (var token of PREF.tokens) {
			var obj = CLONE(token);
			MAIN.tokens[obj.token] = obj;
		}
	}

	if (MAIN.socket) {
		for (var key in MAIN.socket.connections) {
			var client = MAIN.socket.connections[key];
			if (client.user.token !== PREF.token) {
				var session = MAIN.tokens[client.user.token];
				if (session)
					client.user = session;
				else
					client.close(4001);
			}
		}
	}

};

FUNC.saveconfig = function() {
	var config = {};
	for (var item of F.extensions)
		config[item.id] = item.config;
	F.Fs.writeFile(PATH.databases('extensions.json'), JSON.stringify(config), NOOP);
};