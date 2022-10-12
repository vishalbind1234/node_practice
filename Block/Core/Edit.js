const Block_Core_Utils = Ccc.loadClass("Block_Core_Utils");

class Block_Core_Edit extends Block_Core_Utils
{
	formFields = {};
	model = null;
	constructor()
	{
		super();
		this.setTemplate("view/core/edit.ejs");
	}

	async setElements()
	{
		await this.prepareFormFields();
		await this.setFormFieldValue();
		await this.prepareButton();
		return this;
	}

	setFormFieldValue()
	{
		if(this.getModel() != null)
			for(var [key , value] of Object.entries( this.getModel().get() ))
			{
				if(key in this.getFormFields())
				{
					if(this.getFormFields(key).type == "date")
					{
						var date = new Date(value);
						var date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
						this.getFormFields(key).value = date;
					}
					else
					{
						this.getFormFields(key).value = value;
					}
				}
			}

		return this;
	}


	setModel(model)
	{
		this.model = model;
		return this;
	}

	getModel()
	{
		return this.model;
	}

	addFormFields(obj, key)
	{
		this.formFields[key] = obj;
		return this;
	}

	getFormFields(key = null)
	{
		if(key != null)
			if(key in this.formFields)
				return this.formFields[key];

		return this.formFields;
	}



}


module.exports = Block_Core_Edit;


