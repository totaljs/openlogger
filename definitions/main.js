MAIN.version = 1;
MAIN.name = 'OpenLogger';
MAIN.tokens = {};

ON('ready', function() {
	PREF.name && LOADCONFIG({ name: PREF.name });
	FUNC.preparetokens();
});