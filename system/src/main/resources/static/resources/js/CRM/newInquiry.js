window.addEventListener('load', () => {

    newInquiry = {};

    //dynamic select start

    //dynamic select for courses
    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(inquiryCourse,'Please Select a Course',courses)

    //dynamic select for sources
    sources = ajaxGetRequest("/source/findall")
    fillSelectOptions(inquirySource,'Please Select a Source',sources)

    //dynamic select end

    //external libraries initialization
    $(".chosen-inquiry").chosen({width: '100%'});
    $(".chosen-inquiry-ID").chosen({width: '50%'});
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
            "format": "YYYY-MM-DD HH:mm"
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
            "format": "YYYY-MM-DD HH:mm"
        }
    });

    //validation chosen select (for new inquiry)
    $("#inquirySource").chosen().change(function () {
        $("#inquirySource_chosen .chosen-single").addClass('select-validated');
    });
    $("#inquiryCourse").chosen().change(function () {
        $("#inquiryCourse_chosen .chosen-single").addClass('select-validated');
    });
    $("#inquiryIdOption").chosen().change(function () {
        $("#inquiryIdOption_chosen .chosen-single").addClass('select-validated');
    });

    //validation for chosen select (for inquiry follow-up)
    $("#inquiryFollowUpType").chosen().change(function () {
        $("#inquiryFollowUpType_chosen .chosen-single").addClass('select-validated');
    });

    //external libraries initialization end
});

//new inquiry submit start

const newInquirySubmit = ()=>{
    console.log('New Inquiry Added', newInquiry);

    //check for form errors
    //calling checkFormErrors()
    const errors = checkFormErrors();

    if(errors===''){

        //this means there are no any errors

    }
    else {
        //there are errors
        //display them to the user using external-ModalFunction()
        showCustomModal(errors,'warning')
    }
}

const checkFormErrors = () =>{
    let errors = '' ;

    if(newInquiry.sourceId==null){
        errors = errors+'Source is Required, ';
    }
    if(newInquiry.courseId==null){
        errors = errors+'Course is Required, ';
    }
    if(newInquiry.firstName==null){
        errors = errors+'First Name is Required, ';
    }
    if(newInquiry.lastName==null){
        errors = errors+'Last Name is Required, ';
    }
    if(newInquiry.primaryMobileNumber==null){
        errors = errors+'Mobile Number is Required, ';

    }
    if(newInquiry.idType==null){
        errors = errors+'ID Type is Required, ';

    }
    if(newInquiry.idValue==null){
        errors = errors+'ID Value is Required, ';

    }
    if(newInquiry.contactTime==null){
        errors = errors+'Contact Time is Required, ';
    }
    if(newInquiry.description==null){
        errors = errors+'Description is Required, ';
    }

    return errors;
}