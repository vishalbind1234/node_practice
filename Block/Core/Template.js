const Model_Core_View = Ccc.loadClass("Model_Core_View");

class Block_Core_Template extends Model_Core_View
{
	template = null;
	jsFilePath = null;

	constructor()
	{
		super();
		//---------
	}

	setJsFilePath(path)
	{
		this.jsFilePath = Ccc.getRegistry("base_url") +  path;
	}

	getJsFilePath()
	{
		return this.jsFilePath;
	}

	setTemplate(template)
	{
		this.template = template;
	}

	getTemplate()
	{
		return Ccc.getRegistry("base_path") + this.template;
	}

	toHtml()
	{	
		var fileString = Ccc.fs.readFileSync(this.getTemplate() , "utf8");
		var html_cont = Ccc.ejs.render(fileString , {myBlock : this});
		// console.log(html_cont);
		return html_cont;
	}

}

module.exports = Block_Core_Template;

