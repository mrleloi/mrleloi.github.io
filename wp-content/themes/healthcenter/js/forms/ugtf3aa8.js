jQuery(document).ready(function($) {
	var form = $('.gg-testimonial-form');
    
    $(form).each(function () {

        $(this).formValidation({framework: 'bootstrap'})
        .on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var fvs = $form.data('formValidation');

            $form.find("#ugtf-msg").html('<div class="gg-ajax-loader">Loading...</div>');
			$.ajax({
				type: 'POST',
				url: ajax_object_ugtf.ajax_url,
				data: $form.serialize(),
				dataType: 'json',
				success: function(response) {
					if (response.status == 'success') {
						$form[0].reset();
					}
					$form.find("#ugtf-msg .gg-ajax-loader").remove();
					$form.find("#ugtf-msg").html(response.errmessage);

				}

			});

        });
});
});