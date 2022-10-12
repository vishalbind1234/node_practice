const Block_Core_Edit_Tab = Ccc.loadClass("Block_Core_Edit_Tab");

class Block_Customer_Edit_Tab extends Block_Core_Edit_Tab
{

	constructor()
	{
		super();
		// this.setTemplate("view/customer/edit.ejs");
		this.setJsFilePath("js/customer/edit.js");

	}

	prepareTabs()
	{
		this.addTab({
			self : this,
			label : "Customer Edit Tab",
			name : "customer_edit_tab",
			block : "Customer_Edit_Tabs_Edit",
			status : true,
			getUrl : function(data = {}){
				var params = {tab : "customer_edit_tab"};
				Object.assign(params , data);
				var url = this.self.getUrl("customer" , "ajax_edit" , params , false);
				return url;
			},
		} , "customer_edit_tab");

		this.addTab({
			self : this,
			label : "Customer Media Tab",
			name : "customer_media_tab",
			block : "Customer_Edit_Tabs_Media",
			status : true,
			getUrl : function(data = {}){
				var params = {tab : "customer_media_tab"};
				Object.assign(params , data);	
				var url = this.self.getUrl("customer" , "ajax_edit" , params , false);
				return url;
			},
		} , "customer_media_tab");

		this.addTab({
			self : this,
			label : "Testing Tab 2",
			name : "testing_tab_2",
			block : "Customer_Edit_Tabs_Edit",
			status : true,
			getUrl : function(data = {}){
				var params = {tab : "testing_tab_2"};
				Object.assign(params , data);
				var url = this.self.getUrl("customer" , "ajax_edit" , params , false);
				return url;
			},
		} , "testing_tab_2");



		this.setDefaultTab("customer_edit_tab");
	}



}

module.exports = Block_Customer_Edit_Tab;