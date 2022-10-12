const Block_Core_Grid = Ccc.loadClass("Block_Core_Grid");

class Block_Customer_Grid extends Block_Core_Grid
{
	module = "customer";

	constructor()
	{
		super();
		// this.setTemplate("view/customer/grid.ejs");
		this.setJsFilePath("js/customer/grid.js");
		//-----for prepareCollection() , prepareHeader() , prepareAction() we will call setElements() in Block_Core_Grid...

	}


	async prepareCollection()
	{
		var col_arr = [];
		for(var [key , value] of Object.entries( this.getHeader() ))
		{
			if(value.status == true)
			{
				col_arr.push(value.name);
			}
		}
		var customerModel = Ccc.getModel("Customer");
		var arr = await customerModel.fetchColumns(col_arr);
		this.setCollection(arr);
		return this;
	}

	prepareHeader()
	{
		this.addHeader({
			label : "Customer ID",
			name : "customer_id",
			type : "int",
			status : true,
		},"customer_id");

		this.addHeader({
			label : "Customer Name",
			name : "name",
			type : "varchar",
			status : true,
		},"name");

		this.addHeader({
			label : "Profile Photo",
			name : "profile_pic_url",
			type : "img",
			status : true,
		},"profile_pic_url");

		this.addHeader({
			label : "Customer Salary",
			name : "salary",
			type : "float",
			status : true,
		},"salary");

		this.addHeader({
			label : "Date Of Birth",
			name : "dob",
			type : "date",
			status : true,
		},"dob");

		// console.log(Object.keys(this.getHeader()));

		return this;
	}

	prepareAction()
	{
		this.addAction({
			self : this,
			label : "Edit",
			status : true,
			name : "edit_customer",
			getUrl : function(rowObj = null){	
				var params = {};
				if(rowObj != null)
				{
					params[rowObj.getPrimaryKey()] = rowObj.getId();
				}
				var url = this.self.getUrl("customer" , "edit" , params , true);
				return url;
			},
		}, "edit");

		this.addAction({
			self : this,
			label : "Delete",
			name : "delete_customer",
			status : true,
			getUrl : function(rowObj = null){	
				var params = {};
				if(rowObj != null)
				{
					params[rowObj.getPrimaryKey()] = rowObj.getId();
				}
				var url = this.self.getUrl("customer" , "delete" , params , true);
				return url;
			},
		}, "delete");

		return this;
	}

	prepareButton()
	{
		this.addButton({
			self : this,
			label : "Add New Customer",
			status : true,
			name : "add_new_customer",
			getUrl : function(dataObj = null){
				var params = {};
				if(dataObj != null)
				{
					// to do here 
				}	
				var url = this.self.getUrl("customer" , "edit" , params , true);
				return url;
			},
		}, "add_new_customer" , "top");
	}

	prepareData(key , obj)
	{
		var type = this.getHeader(key).type;
		if(type == "date")
		{
			var date = new Date(obj[key]);
			var date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
			return date;
		}
		else if(type == "img")
		{
			var url = Ccc.getRegistry("base_url") + obj[key];
			// var imgTag = "<h1>my photo</h1>";
			var imgTag = `<img width="50" height="50" src="${url}">`;
			return imgTag;
		}
		else
		{
			return obj[key];
		}
	}

}

module.exports = Block_Customer_Grid;