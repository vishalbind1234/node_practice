var Block_Core_Template = Ccc.loadClass("Block_Core_Template");

class Block_Core_Layout extends Block_Core_Template
{
	children = {};

	constructor()
	{
		super();
		this.setTemplate("view/core/layout.ejs");
	}

	getHead()
	{
		if(!("head" in this.getChildren()))
		{
			var headBlock = Ccc.getBlock("Core_Layout_Head");
			this.addChild(headBlock , "head");
		}
		return this.getChild("head");
	}

	getHeader()
	{
		if(!("header" in this.getChildren()))
		{
			var headerBlock = Ccc.getBlock("Core_Layout_Header");
			this.addChild(headerBlock , "header");
		}
		return this.getChild("header");
	}

	getContent()
	{
		if(!("content" in this.getChildren()))
		{
			var contentBlock = Ccc.getBlock("Core_Layout_Content");
			this.addChild(contentBlock , "content");
		}
		// var content = this.getChild("content");
		return this.getChild("content");
	}

	getFooter()
	{
		if(!("footer" in this.getChildren()))
		{
			var footerBlock = Ccc.getBlock("Core_Layout_Footer");
			this.addChild(footerBlock , "footer");
		}
		return this.getChild("footer");
	}

	addChild(block , key = null)
	{
		if(key == null)
		{
			key = block.constructor.name;
		}
		this.children[key] = block;
	}

	getChild(key)
	{
		if(key in this.children)
		{
			return this.children[key];
		}
		return null;
	}

	getChildren()
	{
		return this.children;
	}

	
}

module.exports = Block_Core_Layout;

