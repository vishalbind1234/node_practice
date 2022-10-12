const Block_Core_Layout = Ccc.loadClass("Block_Core_Layout");

class Block_Core_Layout_Head extends Block_Core_Layout
{
	jsFilePaths = [];

	constructor()
	{
		super();
		this.setTemplate("view/core/layout/head.ejs");
	}

	addJsFilePath(path)
	{
		this.jsFilePaths.push(path);
	}

	getJsFilePaths()
	{
		return this.jsFilePaths;
	}


}

module.exports = Block_Core_Layout_Head;

