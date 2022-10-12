class Controller_Core_Action
{
	request = null;
	response = null;
	layout = null;

	constructor(req, res)
	{
		this.request = req;
		this.response = res;
	}

	redirect(url)
	{
		this.getResponse().writeHead(301 , {'Location': url});
		this.getResponse().end();
	}

	getUrl(c , a , param = {} , reset = false)
	{
		var curr_data = Ccc.getUrlData();
		var url = Ccc.getRegistry("base_url");
		
		url += `?c=${c}&a=${a}`;

		delete curr_data.c;
		delete curr_data.a;

		if(reset == true)
			curr_data = {};

		Object.assign(curr_data , param);

		for(var [key , value] of Object.entries(curr_data))
			url += `&${key}=${value}`;

		return url;
	}

	getUrlData(key = null)
	{
		var url = Ccc.url.parse(this.getRequest().url , true);
		var dataObj = url.query;

		if(key)
		{
			if(key in dataObj)
				return dataObj[key];
			else
				return null;

		}

		return dataObj;
	}

	getRequest()
	{
		return this.request;
	}

	getResponse()
	{
		return this.response;
	}

	getLayout()
	{
		if(this.layout == null)
		{
			this.layout = Ccc.getBlock("Core_Layout");
		}
		return this.layout;
	}


	renderLayout()
	{
		var htmlContent = this.getLayout().toHtml();
		// console.log(htmlContent);
		this.getResponse().statusCode = 200;
		this.getResponse().setHeader('Content-type' , 'text/html');
		this.getResponse().write(htmlContent);
		this.getResponse().end();
	}

	renderJson(arr)
	{
		this.getResponse().statusCode = 200;
		// this.getResponse().setHeader('Content-type' , 'application/json'); 
		this.getResponse().setHeader('Content-type' , 'text/html');
		var json_string = JSON.stringify(arr); 
		this.getResponse().write(json_string);
		this.getResponse().end();
	}

	/*renderLayout()
	{
		var promise = this.getLayout().toHtml();
		promise.then((htmlContent) => {

			this.getResponse().statusCode = 200;
			this.getResponse().setHeader('Content-type' , 'text/html');
			this.getResponse().write(htmlContent);
			this.getResponse().end();
		});
	}*/


	

}

module.exports = Controller_Core_Action;