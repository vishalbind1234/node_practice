var Model_Core_View = Ccc.loadClass("Model_Core_View");

class Model_Core_Row extends Model_Core_View
{
	data = {};
	tableName = null;
	primaryKey = null;

	constructor()
	{
		super();
	}

	set(key , value)
	{
		this.data[key] = value;
		return this;
	}

	get(key = null)
	{
		if(!key)
		{
			return this.data;
		}
		else if(key in this.data)
		{
			return this.data[key];
		}
		return null;
	}

	getId()
	{
		return this.get(this.getPrimaryKey());
	}


	getPrimaryKey()
	{
		return this.primaryKey;
	}

	setPrimaryKey(key)
	{
		this.primaryKey = key;
		return this;
	}

	getTableName()
	{
		return this.tableName;
	}

	setTableName(table)
	{
		this.tableName = table;
		return this;
	}

	async fetchAll(where = null)
	{
		var query = `SELECT * FROM ${this.getTableName()}`;
		if(where)
		{
			query += ` WHERE ${where} `;
		}
		var data = await this.getAdapter().fetch(query);
		for(var key in data)
		{
			var rowObj = new this.constructor();
			rowObj.data = data[key];
			data[key] = rowObj;
		}
		return data;
	}

	async fetchColumns(col_arr , where = null)
	{
		var query = `SELECT ${col_arr.toString()} FROM ${this.getTableName()}`;
		if(where)
		{
			query += `WHERE ${where}`;
		}
		var arr = await this.getAdapter().fetch(query);
		for(var key in arr)
		{
			var rowObj = new this.constructor();
			rowObj.data = arr[key];
			arr[key] = rowObj;
		}
		return arr;
	}

	async load(id = null)
	{
		if(id)
		{
			var query = `SELECT * FROM ${this.getTableName()} WHERE ${this.getPrimaryKey()} = ${id}`;
			var arr = await this.getAdapter().fetch(query);
			this.data = arr[0];
		}
		return this;

	}

	async delete()
	{
		var id = this.getId();
		if(!id)
		{
			return null;		
		}
		var query = `DELETE FROM ${this.getTableName()} WHERE ${this.getPrimaryKey()} = ${id}`;
		var deleteInfo = await this.getAdapter().fetch(query);
		// console.log(deleteInfo);
		return this;
	}

	async getCount()
	{
		var query = `SELECT COUNT(*) AS row_count FROM ${this.getTableName()}`;
		var arr = await this.getAdapter().fetch(query);
		return arr[0].row_count;
	}

	async save()
	{
		if(this.getId())
		{
			var set = "";
			for(var [key , value] of Object.entries( this.get() ))
			{
				set += `, ${key} = "${value}" `;
			}
			var query = `UPDATE ${this.getTableName()} SET ${set.slice(1)} WHERE ${this.getPrimaryKey()} = ${this.getId()}`;
			console.log(query);
			var updateInfo = await this.getAdapter().fetch(query);
		}
		else
		{
			delete this.get()[this.getPrimaryKey()];

			var keyStr = "";
			var valStr = "";
			for(var [key , val] of Object.entries( this.get() ))
			{
				keyStr += `, ${key} `;
				valStr += `, "${val}" `;
			}

			var query = `INSERT INTO ${this.getTableName()}(${keyStr.slice(1)}) VALUES(${valStr.slice(1)})`;
			var insertInfo = await this.getAdapter().fetch(query);
			this.set(this.getPrimaryKey() , insertInfo.insertId);
			
			/*var self = this;
			this.getAdapter().fetch(query).then(doWork.bind(null , self));
			async function doWork(self , data)
			{
				var query2 = `SELECT MAX(${self.getPrimaryKey()}) AS max_id FROM ${self.getTableName()}`;
				var insertInfo2 = await self.getAdapter().fetch(query2);
				
				self.set(self.getPrimaryKey() , insertInfo2[0].max_id);
				console.log(self);
				console.log(data);
			}*/
		}

		// console.log(this);
		return this;
	}



}

module.exports = Model_Core_Row;