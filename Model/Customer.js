var Model_Core_Row = Ccc.loadClass("Model_Core_Row");

class Model_Customer extends Model_Core_Row
{
	modelCustomerAddress = null;
	address_arr = null;

	constructor()
	{
		super();
		this.setTableName("Customer").setPrimaryKey("customer_id");
	}

	async getAddress()
	{
		if(!this.modelCustomerAddress)
		{
			await this.setAddress();
		}
		return this.address_arr;
	}

	async setAddress(model_name = "Customer_Address")
	{
		if(this.getId())
		{
			this.modelCustomerAddress = await Ccc.getModel(model_name);
			var where = ` ${this.getPrimaryKey()} = ${this.getId()} `;
			this.address_arr = this.modelCustomerAddress.fetchAll(where)
			return this;
		}
	}

	

}

module.exports = Model_Customer;