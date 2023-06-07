exports.icon = 'ti ti-history';
exports.name = '@(Logs)';
exports.position = 1;
exports.permissions = [{ id: 'logs', name: 'Logs' }];
exports.visible = user => user.sa || user.permissions.includes('logs');

exports.install = function() {

	ROUTE('+POST    /                             *Logs   --> insert', 512);
	ROUTE('+GET     /api/download/                *Logs   --> download');

	ROUTE('+API     /api/         -logs           *Logs   --> query');
	ROUTE('+API     /api/         -logs_remove    *Logs   --> remove');
	ROUTE('+API     /api/         -logs_clear     *Logs   --> clear');

};