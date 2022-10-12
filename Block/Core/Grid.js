const Block_Core_Template = Ccc.loadClass("Block_Core_Template");

class Block_Core_Grid extends Block_Core_Template
{
	header = {};
	collection = [];
	buttons = {"top" : {} , "bottom" : {} , "somewhere" : {}};
	action = {};

	constructor()
	{
		super();
		this.setTemplate("view/core/grid.ejs");
		//---------
	}

	async setElements()
	{
		await this.prepareHeader();
		await this.prepareAction();
		await this.prepareButton();
		await this.prepareCollection();  //----> this method should be at last .... 
		
		return this;
	}

	setCollection(collection)
	{
		this.collection = collection;
		return this;
	}

	getCollection()
	{
		return this.collection;
	}

	addHeader(header , key)
	{
		this.header[key] = header;
		return this;
	}

	getHeader(key = null)
	{
		if(key == null)
		{
			return this.header;
		}
		else if(key in this.header)
		{
			return this.header[key];
		}
		return null;
	}

	addAction(action , key)
	{
		this.action[key] = action;
		return this;
	}

	getAction()
	{
		return this.action;
	}

	addButton(button , key , location = "top")
	{
		this.buttons[location][key] = button;
		return this;
	}

	getButtons(location = null , key = null)
	{
		if(location != null)
		{
			if(location in this.buttons)
			{
				if(key != null)
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


module.exports = Block_Core_Grid;

