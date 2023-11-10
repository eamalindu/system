$(document).ready(function () {
    $(".chosen-inquiry").chosen({width: '100%'});
    $(".chosen-inquiry-search").chosen({width: '145px'});
    $('#inquiryTime').daterangepicker({
        "minDate": new Date(),
        "singleDatePicker": true,
        "timePicker": true,
        "timePicker24Hour": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "drops": "up",
        "locale": {
            "format": "YYYY-MM-DD [at] HH:mm"
        }
    });
    $('#inquirySearchDateRange').daterangepicker({
        "locale": {
            "format": "YYYY-MM-DD",
            //"separator": " to "
        }
    });

    //reset chosen select using jquery
    $('button[type=reset]').on('click', function () {
        setTimeout(function () {
            $('select').trigger('chosen:updated');
        }, 0);
    });


    //validation chosen select (for new inquiry)
    $("#inquirySource").chosen().change(function() {
        $("#inquirySource_chosen .chosen-single").addClass('select-validated');
    });
    $("#inquiryCourse").chosen().change(function() {
        $("#inquiryCourse_chosen .chosen-single").addClass('select-validated');
    });
});