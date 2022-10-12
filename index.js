class Ccc
{
	static fs = require("fs");
	static ejs = require("ejs");
	static mysql_await = require("mysql-await");
	static path = require("path");
	static formidable = require("formidable");

	static registry = require("./config.js");
	static url = require('url');
	
	static urlData = null;	



	static async prepareResponse(req, res)
	{
		var url_arr = req.url.split(Ccc.path.sep);
		var urlData = Ccc.url.parse(req.url,true).query;
		Ccc.urlData = urlData;

		if('c' in urlData && 'a' in urlData)
		{
			var controller_name = "Controller_" + urlData.c.charAt(0).toUpperCase() + urlData.c.slice(1).toLowerCase();
			var action = urlData.a.toLowerCase() + "Action";
			
			var controller_cls = Ccc.loadClass(controller_name);
			var controller_obj = new controller_cls(req , res);
			controller_obj[action]();
			
		}
		else if(url_arr[1] == "js")
		{
			res.statusCode = 200;
			res.setHeader("Content-type" , "text/javascript");
			var data = await Ccc.fs.promises.readFile(Ccc.getRegistry("base_path") + req.url , "utf8");
			// res.write(data);
			res.end(data);
		}
		else if(url_arr[1] == "Media")
		{
			res.statusCode = 200;
			res.setHeader("Content-type" , "text/javascript");
			var data = await Ccc.fs.promises.readFile(Ccc.getRegistry("base_path") + req.url);
			// res.write(data);
			res.end(data);
		}
		else
		{
			res.statusCode = 200;
			res.setHeader("Content-type" , "text/html");
			res.end("<h1>invalid URL....</h1>");
		}	

	}

	static getUrlData()
	{
		return Ccc.urlData;
	}

	static loadClass(class_name)
	{
		// console.log(class_name);	
		var class_path = class_name.replaceAll("_" , Ccc.path.sep);
		class_path = class_path + ".js";
		return Ccc.loadFile(class_path);
		
	}

	static loadFile(class_path)
	{

		var base_path = Ccc.getRegistry("base_path");
		var cls = require(base_path + class_path);
		return cls;
	}

	static getRegistry(key)
	{
		// console.log(Ccc.registry[key]);	
		if(key in Ccc.registry)
		{
			return Ccc.registry[key];
		}
	}

	static getBlock(block_name)
	{
		// console.log(class_name);
		block_name = "Block_" + block_name;	
		var block_path = block_name.replaceAll("_" , Ccc.path.sep);
		block_path = block_path + ".js";
		var block_cls = Ccc.loadFile(block_path);
		return new block_cls();
	}

	static getModel(model_name)
	{
		// console.log(class_name);
		model_name = "Model_" + model_name;	
		var model_path = model_name.replaceAll("_" , Ccc.path.sep);
		model_path = model_path + ".js";
		var model_cls = Ccc.loadFile(model_path);
		return new model_cls();
		
	}

	static getAdapter()
	{
		return Ccc.getModel("Core_Adapter");
	}

}

module.exports = Ccc;

	
// var data = Ccc.fs.readFileSync(path , 'utf8');	//------> reads the whole file at once thus block cpu , fast
// var data = await Ccc.fs.promises.readFile(path , 'utf8');  //----> reads the file in chunks thus doesn't block cpu ,slow

