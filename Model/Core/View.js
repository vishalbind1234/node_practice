class Model_Core_View
{
	adapter = null;
	
	constructor()
	{
		//------------------
	}

	getAdapter()
	{
		if(this.adapter == null)
		{
			this.adapter = Ccc.getAdapter();
		}
		return this.adapter;
	}

	getUrlData(key = null)
	{
		var dataObj = Ccc.getUrlData();

		if(key != null)
			if(key in dataObj)
				return dataObj[key];
			else
				return null;

		return dataObj;
	}

	getUrlPath(path = null)
	{
		var url = Ccc.getRegistry("base_url");
		if(path != null)
			url += path;

		return url;
	}

	getUrl(c , a , params = {} , reset = false)
	{
		var curr_data = Ccc.getUrlData();
		var url = Ccc.getRegistry("base_url");
		
		url += `?c=${c}&a=${a}`;

		delete curr_data.c;
		delete curr_data.a;

		if(reset == true)
			curr_data = {};

		Object.assign(curr_data , params);

		for(var [key , value] of Object.entries(curr_data))
			url += `&${key}=${value}`;

		return url;
	}

}

module.exports = Model_Core_View;