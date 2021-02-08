jQuery(document).ready(function() {
	jQuery('body').on('click','.jm-post-like',function(event){
		event.preventDefault();
		heart = jQuery(this);
		total_count = jQuery('.total-count');
		post_id = heart.data("post_id");
		heart.html("<i id='icon-gear' class='fa fa-cog fa-spin'></i>");
		jQuery.ajax({
			type: "post",
			url: ajax_var.url,
			data: "action=jm-post-like&nonce="+ajax_var.nonce+"&jm_post_like=&post_id="+post_id,
			success: function(count){
				if( count.indexOf( "already" ) !== -1 )
				{
					var lecount = count.replace("already","");
					if (lecount === "0")
					{
						lecount = "0";
					}

					heart.prop('title', 'Yes');
					heart.removeClass("liked");
					heart.html("Yes");
					total_count.html(lecount);
				}
				else
				{
					heart.prop('title', 'No');
					heart.addClass("liked");
					heart.html("No");
					total_count.html(count);
				}
			}
		});
	});
});
