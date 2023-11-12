$(document).ready(function () {
    $(".chosen-inquiry").chosen({width: '100%'});
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
    $('#inquiryFollowUpTime').daterangepicker({
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

    //validation chosen select (for new inquiry)
    $("#inquirySource").chosen().change(function() {
        $("#inquirySource_chosen .chosen-single").addClass('select-validated');
    });
    $("#inquiryCourse").chosen().change(function() {
        $("#inquiryCourse_chosen .chosen-single").addClass('select-validated');
    });

    //validation for chosen select (for inquiry follow-up)
    $("#inquiryFollowUpType").chosen().change(function() {
        $("#inquiryFollowUpType_chosen .chosen-single").addClass('select-validated');
    });
});