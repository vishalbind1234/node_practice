const Block_Core_Edit_Tabs_Media = Ccc.loadClass("Block_Core_Edit_Tabs_Media");

class Block_Customer_Edit_Tabs_Media extends Block_Core_Edit_Tabs_Media
{

	constructor()
	{
		super();
		this.setTemplate("view/customer/edit/tabs/media.ejs");
		this.setJsFilePath("js/customer/edit.js");
		this.setModelName("Customer");

	}

	getFormActionUrl()
	{
		var url = this.getUrl('customer' , 'save' , {customer_id : this.getModel().getId()} , false);
		return url;
	}

	getImageUrl()
	{
		var url = this.getUrlPath(this.getModel().get('profile_pic_url'));
		return url;
	}

	/*prepareFormFields()
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
			getUrl : function(data = {}){
				var params = {};
				Object.assign(params , data);
				var url = this.self.getUrl("customer" , "grid" , params , true);
				return url;
			},
		}, "back_to_grid" , "bottom");
		
	}*/


}

module.exports = Block_Customer_Edit_Tabs_Media;