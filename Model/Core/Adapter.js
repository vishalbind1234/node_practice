class Model_Core_Adapter
{
	mysql_await = require("mysql-await");
	db_config = null;
	connection = null;
	
	constructor()
	{
		this.db_config = Ccc.getRegistry("db_config");
	}

	getConnection()
	{
		if(this.connection == null)
		{
			this.setConnection();
		}
		return this.connection;

	}

	setConnection()
	{
		this.connection = this.mysql_await.createConnection(this.db_config);
		this.connection.connect((err) => {
			var message = (err) ? err : "connection successfull...";
			console.log(message);
		});
	}

	async fetch(query)
	{
		var result = null;
		try
		{
			result = await this.getConnection().awaitQuery(query);
		}
		catch(e)
		{
			console.log(e);
			console.log("I am in Model_Core_Adapter");
		}
		finally
		{
			// this.getConnection().awaitEnd();
			return result;
		}
	}

	
}

module.exports = Model_Core_Adapter;