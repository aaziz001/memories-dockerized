db.createUser(
	{
		user: 'root',
		pwd: 'memoriesDataBase##1122',
		roles: [{ role: 'root', db: 'admin' }],
	},
	{
		w: 'majority',
		wtimeout: 5000,
	}
);
db.createCollection('test');
db.createUser(
	{
		user: 'aziz',
		pwd: 'memoriesDataBase##1122',
		roles: [{ role: 'dbOwner', db: 'memories' }],
	},
	{
		w: 'majority',
		wtimeout: 5000,
	}
);
db.createCollection('test');