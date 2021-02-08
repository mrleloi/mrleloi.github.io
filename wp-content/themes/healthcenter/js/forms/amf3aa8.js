jQuery(document).ready(function($) {
	var form = $('.gg-appointment-miniform');
    
    $(form).each(function () {

    	$(this).find('#datePicker')
        .datetimepicker({debug: false})
        .on('dp.change dp.show', function(e) {
            // Revalidate the date field
            $(form).formValidation('revalidateField', 'datePicker');
        });

        $(this).formValidation({framework: 'bootstrap'})
        .on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var fv = $form.data('formValidation');

            $form.find("#amf-msg").html('<div class="gg-ajax-loader">Loading...</div>');
			$.ajax({
				type: 'POST',
				url: ajax_object_amf.ajax_url,
				data: $form.serialize(),
				dataType: 'json',
				success: function(response) {
					if (response.status == 'success') {
						$form[0].reset();
					}
					$form.find("#amf-msg .gg-ajax-loader").remove();
					$form.find("#amf-msg").html(response.errmessage);

				}

			});

        });
});
});