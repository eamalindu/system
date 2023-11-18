window.addEventListener('load', () => {

    newFollowUp = {};

    //external libraries initialization
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
            "format": "YYYY-MM-DD HH:mm"
        }
    });

    //validation for chosen select (for inquiry follow-up)
    $("#inquiryFollowUpType").chosen().change(function () {
        $("#inquiryFollowUpType_chosen .chosen-single").addClass('select-validated');
    });

});

const newFollowUpSubmit = ()=>{
    //temp fix
    newFollowUp.inquiryId= document.querySelector('#inquirySheetId').innerText;
    console.log(newFollowUp)
}