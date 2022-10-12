const Block_Core_Template = Ccc.loadClass("Block_Core_Template");

class Block_Core_Edit_Tabs_Edit extends Block_Core_Template
{
	formFields = {};
	buttons = {"top" : {} , "bottom" : {} , "somewhere" : {}};
	modelName = null;
	model = null;

	constructor()
	{
		super();
		this.setTemplate("view/core/edit/tabs/edit.ejs");
	}

	async setElements()
	{
		var model = await Ccc.getModel(this.getModelName());
		model = await model.load(this.getUrlData(model.getPrimaryKey()));
		this.setModel(model);

		await this.prepareFormFields();
		await this.setFormFieldValue();
		await this.prepareButton();
		return this;
	}

	setModelName(modelName)
	{
		this.modelName = modelName;
		return this;
	}

	getModelName()
	{
		return this.modelName;
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

	addButton(button , key , location = "top")
	{
		this.buttons[location][key] = button;
		return this;
	}

	getButtons(location = null , key = null)
	{
		if(location)
		{
			if(location in this.buttons)
			{
				if(key)
				{
					if(key in this.buttons[location])
						return this.buttons[location][key];
					else
						return null;					
				}
				else
				{
					return this.buttons[location];
				}
			}
			else
			{
				return null;
			}
		}
	}


}


module.exports = Block_Core_Edit_Tabs_Edit;


