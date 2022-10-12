
jQuery("document").ready(function(){
	jQuery("body").on("click" , ".delete_customer" , function(){
		var url = jQuery(this).val();
		jQuery.ajax({
			url : url,
			data : {name : "vishal" , rollno : 44},
			// dataType : "json",	//----> means it will expect json data form server --> setHeader('application/json')
			type : "post",
			success : function(data_arr){
				var data_arr = JSON.parse(data_arr);
				for(var obj of data_arr)
				{
					if(obj.action == "replace")
					{
						jQuery(obj.location).html(obj.content);
					}
					else if(obj.action == "append")
					{
						jQuery(obj.location).append(obj.content);
					}
				}

			},
			error : function(err){
				console.log(err);
				window.alert("error");
			}
		});
	});

	jQuery("body").on("click" , ".edit_customer" , function(){
		var url = jQuery(this).val();
		window.location = url;
	});

	jQuery("body").on("click" , "#add_new_customer" , function(){
		var url = jQuery(this).val();
		window.location = url;
	});

});