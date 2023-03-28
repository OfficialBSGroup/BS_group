jQuery(document).ready(function() {
    jQuery("#cus-tabs").change(function() {
        var atab = jQuery(this).val();
        jQuery(".tab-pane").hide();
        jQuery('.' + atab).css("opacity", "1");
        jQuery('.' + atab).slideDown();

    });

});