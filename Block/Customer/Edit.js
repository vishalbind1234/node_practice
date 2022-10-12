const Block_Core_Edit = Ccc.loadClass("Block_Core_Edit");

class Block_Customer_Edit extends Block_Core_Edit
{
	module = "customer";

	constructor()
	{
		super();
		// this.setTemplate("view/customer/edit.ejs");
		this.setJsFilePath("js/customer/edit.js");

	}

	prepareFormFields()
	{
		this.addFormFields({
			label : "Customer ID",
			name : "Customer[customer_id]",
			value : "",
			type : "text",
			status : true,
			attributes : ["autofocus" , "readonly"],
			constraints : {maxlength : "5" , placeholder : "your id number"},
		} , "customer_id");

		this.addFormFields({
			label : "Customer Name",
			name : "Customer[name]",
			value : "",
			type : "text",
			status : true,
			attributes : [],
			constraints : {maxlength : "10" , placeholder : "customer name"},
		}, "name");

		this.addFormFields({
			label : "Customer Salary",
			name : "Customer[salary]",
			value : "",
			type : "number",
			status : true,
			attributes : [],
			constraints : {min : "10" , max : "10000" , placeholder : "your salary"},
		}, "salary");

		this.addFormFields({
			label : "Date Of Birth",
			name : "Customer[dob]",
			value : "",
			type : "date",
			status : true,
			attributes : [],
			constraints : {},
		}, "dob");

	}

	prepareButton()
	{
		this.addButton({
			self : this,
			label : "Back To Grid",
			status : true,
			name : "back_to_grid",
			getUrl : function(dataObj = null){
				var params = {};
				if(dataObj != null)
				{
					// to do here 
				}	
				var url = this.self.getUrl("customer" , "grid" , params , true);
				return url;
			},
		}, "back_to_grid" , "bottom");

	}

	getSaveUrl()
	{
		return this.getUrl("customer", "save" , {name : "rama" , age : 22} , true);
	}


}

module.exports = Block_Customer_Edit;