NEWSCHEMA('Logs', function(schema) {

	schema.define('type', ['info', 'warning', 'error', 'success'])('info');
	schema.define('data', String);
	schema.define('app', 'String(40)', true);
	schema.define('url', 'String(100)');
	schema.define('userid', 'String(30)');
	schema.define('username', 'String(50)');
	schema.define('schema', 'String(50)');
	schema.define('reference', 'String(50)');
	schema.define('message', 'String(500)');
	schema.define('ua', 'String(30)');
	schema.define('ip', 'String(80)');
	schema.define('clientside', Boolean);
	schema.define('date', Date);

	schema.setQuery(function($) {
		DB().list('nosql/logs').autoquery($.query, 'id:string,app:string,type:string,schema:string,userid:string,username:string,ua:string,message:string,url:string,ip:string,dtcreated:date,data:string', 'dtcreated_desc', 100).callback($.callback);
	});

	schema.setInsert(async function($, model) {

		model.id = UID();
		model.dtcreated = NOW = new Date();

		if (!model.date)
			model.date = model.dtcreated;

		DB().insert('nosql/logs', model);
		$.success();
	});

	schema.addWorkflow('remove', function($) {
		DB().remove('nosql/logs').in('id', $.query.id.split(',')).callback($.done());
	});

	schema.addWorkflow('clear', function($) {
		DB().clear('nosql/logs').callback($.done());
	});

	schema.addWorkflow('download', function($) {
		var filename = PATH.databases('logs.nosql');
		$.controller.file('~' + filename, true);
		$.cancel();
	});

});