
jQuery("document").ready(function(){

	jQuery("body").on("click" , "#save" , function(){
		// var url = jQuery(this).val();
		// window.location = url;
		jQuery("#customer_edit_form").submit();
	});

	jQuery("body").on("click" , "#back_to_grid" , function(){
		var url = jQuery(this).val();
		window.location = url;
	});

	jQuery("body").on("click" , "#customer_edit_tab" , function(){
		var url = jQuery(this).val();
		jQuery.ajax({
			url : url,
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
			},
		});

	});

	jQuery("body").on("click" , "#customer_media_tab" , function(){
		// window.alert("hii");
		var url = jQuery(this).val();
		jQuery.ajax({
			url : url,
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
			},
		});

	});

});