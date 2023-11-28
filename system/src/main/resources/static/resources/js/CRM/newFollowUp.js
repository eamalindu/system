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
    //newFollowUp.inquiryId= document.querySelector('#inquirySheetId').innerText;
    newFollowUp.inquiryId = currentInquiry;
    console.log('New Inquiry Added',newFollowUp);

    //check for form errors
    //get user confirmation
    //pass data to backend

}


const checkFollowupFormErrors=()=>{
    let errors = '';

    if (newFollowUp.inquiryId == null) {
        errors = errors + 'Inquiry is Required<br>';
    }
    if (newFollowUp.type == null) {
        errors = errors + 'Type is Required<br>';
    }
    if (newFollowUp.content == null) {
        errors = errors + 'Content is Required<br>';
    }
    if (newFollowUp.feeling == null) {
        errors = errors + 'Feeling is Required<br>';
    }
    if (newFollowUp.confirmed == null) {
        errors = errors + 'Confirmed is Required<br>';
    }
    if (newFollowUp.nextFollowup == null) {
        errors = errors + 'Contact Time is Required<br>';
    }
    return errors;
}