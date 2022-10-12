const Block_Core_Template = Ccc.loadClass("Block_Core_Template");

class Block_Core_Edit_Tab extends Block_Core_Template
{

	tabs = {};
	defaultTab = null;
	currentTab = null;
	

	constructor()
	{
		super();
		this.setTemplate("view/core/edit/tab.ejs");
		//---------
	}

	async setElements()
	{
		await this.prepareTabs();
		await this.setCurrentTab();
		return this;
	}

	setDefaultTab(tab)
	{
		this.defaultTab = tab;
		return this;
	}

	getDefaultTab()
	{
		return this.defaultTab;
	}

	async setCurrentTab()
	{
		var tab_name = this.getUrlData("tab");
		var tab_data = (tab_name == null) ? this.getTab(this.getDefaultTab()) : this.getTab(tab_name) ;
		var tabBlockObj = await Ccc.getBlock(tab_data.block).setElements();
		this.currentTab = tabBlockObj;
		// console.log(tabBlockObj);	////----////
		return this;
	}

	getCurrentTab()
	{
		return this.currentTab;
	}

	getTab(key = null)
	{
		if(key != null)
			if(key in this.tabs)
				return this.tabs[key];
			else
				return null;

		return this.tabs;
	}

	addTab(obj , key)
	{
		this.tabs[key] = obj;
		return this;
	}



}


module.exports = Block_Core_Edit_Tab;

