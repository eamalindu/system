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

const newFollowUpSubmit = () => {
    //temp fix
    //newFollowUp.inquiryId= document.querySelector('#inquirySheetId').innerText;
    newFollowUp.inquiryId = currentInquiry;
    console.log('New Follow Up Added', newFollowUp);

    //check for form errors
    const errors = checkFollowupFormErrors();

    if (errors == '') {
        //this means there are no any errors
        //get user confirmation
        showCustomConfirm('Are You Sure?<br><small>You are about to add a Follow-up to the Inquiry <strong>#' + currentInquiry.inquiryNumber + '</strong></small>',function (result){

            if (result){
                //pass data to backend
                //reset the form
                //remove validations
                //close the offCanvas
                //refresh the table
                //null the newFollowup Object
            }
            else{
                showCustomModal("Operation Cancelled!", 'info');
            }
        });



    } else {
        //there are errors
        //display them to the user using external-ModalFunction()
        showCustomModal(errors, 'warning')
    }


}


const checkFollowupFormErrors = () => {
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