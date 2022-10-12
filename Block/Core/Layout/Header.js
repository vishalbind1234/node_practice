const Block_Core_Layout = Ccc.loadClass("Block_Core_Layout");

class Block_Core_Layout_Header extends Block_Core_Layout
{
	constructor()
	{
		super();
		this.setTemplate("view/core/layout/header.ejs");
		
	}


}

module.exports = Block_Core_Layout_Header;

