var Model_Core_Row = Ccc.loadClass("Model_Core_Row");

class Model_Customer_Address extends Model_Core_Row
{

	constructor()
	{
		super();
		this.setTableName("Customer_Address").setPrimaryKey("address_id");
	}

	

}

module.exports = Model_Customer_Address;