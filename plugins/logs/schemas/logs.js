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

	schema.action('query', {
		name: 'Query logs',
		action: function($) {
			DATA.list('nosql/logs').autoquery($.query, 'id:string,app:string,type:string,schema:string,userid:string,username:string,ua:string,message:string,url:string,ip:string,dtcreated:date,data:string', 'dtcreated_desc', 100).callback($.callback);
		}
	});

	schema.action('insert', {
		name: 'insert logs',
		action: function($, model) {
			model.id = UID();
			model.dtcreated = NOW = new Date();

			if (!model.date)
				model.date = model.dtcreated;

			DATA.insert('nosql/logs', model);
			$.success();
		}
	});

	schema.action('remove', {
		name: 'remove logs',
		query: 'id:String',
		action: function($) {
			DATA.remove('nosql/logs').in('id', $.query.id.split(',')).callback($.done());
		}
	});

	schema.action('clear', {
		name: 'Clear logs',
		action: function($) {
			DATA.clear('nosql/logs').callback($.done());
		}
	});

	schema.action('download', {
		name: 'Download file',
		action: function($) {
			var filename = PATH.databases('logs.nosql');
			$.controller.file('~' + filename, true);
			$.cancel();
		}
	});

});