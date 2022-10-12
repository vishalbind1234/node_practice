const Controller_Core_Action = Ccc.loadClass("Controller_Core_Action");

class Controller_Customer extends Controller_Core_Action
{

	constructor(req, res)
	{
		super(req, res);

	}

	async gridAction()
	{
		Ccc.getModel("Customer").load(2).then(model => {
			model.getAddress().then(address_arr => {
				console.log(address_arr);
			});
		});
		var layout = this.getLayout();
		var blockCustomerGrid = await Ccc.getBlock("Customer_Grid").setElements();
		layout.getContent().addChild(blockCustomerGrid);
		this.renderLayout();

	}

	async editAction()
	{

		// console.log(this.getUrlData());	////----////
		// console.log("inside edit simple ...");	////----////
		var layout = this.getLayout();
		var blockCustomerEditTab = await Ccc.getBlock("Customer_Edit_Tab").setElements();
		layout.getContent().addChild(blockCustomerEditTab);
		this.renderLayout();

	}

	async ajax_editAction()
	{
		// console.log(this.getUrlData());	////----////
		// console.log("inside edit Ajax ...");	////----////
		var arr = [];
		var layout = this.getLayout();
		var blockCustomerEditTab = await Ccc.getBlock("Customer_Edit_Tab").setElements();
		arr.push({
			action : "replace",
			content : blockCustomerEditTab.toHtml(),
			location : "#content",
		});

		arr.push({
			action : "append",
			content : "<h2>Tab changed via Ajax ...</h2>",
			location : "#footer",
		});

		this.renderJson(arr);

	}


	async saveAction()
	{
		var formidable = Ccc.formidable;
		var form = formidable({multiples : true, uploadDir : Ccc.getRegistry("base_path") + "/temp", keepExtensions : true});

		form.parse(this.getRequest() , async (err , fields , files) => {
								// console.log(fields);  
								// console.log(files);
			var customerModel = await Ccc.getModel("Customer");
			if(fields.Customer)
			{
				for(var [key , value] of Object.entries(fields.Customer))
					customerModel.set(key , value);
				customerModel.save().then(model => {
					this.redirect(this.getUrl("customer" , "grid" , {} , true));
				});
			}

			if(Object.keys(files).length > 0)
			{
				var base_path = Ccc.getRegistry("base_path");
				var cust_path = "Media/Customer/";
				for(var [key , file] of Object.entries(files))
				{
					var id = this.getUrlData(customerModel.getPrimaryKey());
					if(id)
					{
						/*Ccc.fs.stat(base_path + cust_path + id + ".jpeg" , (err , stats) => {
							if(err)
							{
								console.log(err);
							}
							console.log(stats);
							console.log("inside stat");
						});*/ 
						Ccc.fs.rename(file.filepath , base_path + cust_path + id + ".jpeg" , (err) => { console.log(err); });
						customerModel.set(key , (cust_path + id + ".jpeg"));
						customerModel.set(customerModel.getPrimaryKey() , id);
						customerModel.save().then(model => {
							this.redirect(this.getUrl("customer" , "grid" , {} , true));
						});
					}
				}

			}
		});
		
		// this.redirect(this.getUrl("customer" , "grid" , {} , true));
	}

	async deleteAction()
	{
		var customerModel = await Ccc.getModel("Customer");
		var id = this.getUrlData(customerModel.getPrimaryKey());
		customerModel.load(id).then(model => {
			model.delete().then(async (data) => {
				var arr = [];
				var blockCustomerGrid = await Ccc.getBlock("Customer_Grid").setElements();
				arr.push({
					action : "replace",
					content : blockCustomerGrid.toHtml(),
					location : "#content",
				});
				arr.push({
					action : "append",
					content : "<h3>one Item Deleted</h3>",
					location : "#header",
				});
	
				this.renderJson(arr);
			});
		});
		
	}

}

module.exports = Controller_Customer;	//----> here we are exporting class ....