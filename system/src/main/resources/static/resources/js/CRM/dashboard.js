window.addEventListener('load', () => {

    //calling refreshInquiryPoolTable function
    refreshInquiryPoolTable();

    //dynamic select start

    //dynamic select for courses
    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(inquiryCourse,'',courses)

    //dynamic select for sources
    sources = ajaxGetRequest("/source/findall")
    fillSelectOptions(inquirySource,'',sources)

    //dynamic select end

    //external libraries initialization
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
    $("#inquirySource").chosen().change(function () {
        $("#inquirySource_chosen .chosen-single").addClass('select-validated');
    });
    $("#inquiryCourse").chosen().change(function () {
        $("#inquiryCourse_chosen .chosen-single").addClass('select-validated');
    });

    //validation for chosen select (for inquiry follow-up)
    $("#inquiryFollowUpType").chosen().change(function () {
        $("#inquiryFollowUpType_chosen .chosen-single").addClass('select-validated');
    });


});


//refresh inquiryPool table start
const refreshInquiryPoolTable = () => {

    //get data from the database with ajax
    newInquiries = [];
    $.ajax("/inquiry/newInquiry", {
        async: false,
        type: "Get",
        contentType: "json",
        success: function (data) {
            console.log(data);
            newInquiries = data;
        },
        error: function (resOb) {
            alert("error" + resOb);
        }

    });

    /*
    scheduledInquiries = [];
    $.ajax("/STEAM-CRM/Inquiry/test2", {
        async: false,
        type: "Get",
        contentType: "json",
        success: function (data) {
            console.log(data);
            scheduledInquiries = data;
        },
        error: function (resOb) {
            alert("error" + resOb);
        }

    });

     displayPropertyList2=[
        {property:'inquiry_id',dataType:'text'},
        {property:'course_id',dataType:'text'},
        {property:'source_id',dataType:'text'},
        {property:'firstname',dataType:'text'},
    ];
    fillDataIntoTable(tblScheduledPool, scheduledInquiries, displayPropertyList2, rowEdit, rowPrint, rowDelete);
     */

    displayPropertyList = [
        {property: 'inquiryNumber', dataType: 'text'},
        {property: getCourse, dataType: 'function'},
        {property: getSource, dataType: 'function'},
        {property: getFullName, dataType: 'function'}
    ];

    fillDataIntoTable(tblInquiryPool, newInquiries, displayPropertyList, rowEdit, rowPrint, rowDelete);


}

const getCourse = (ob) => {
    return ob.courseId.code;
}

const getSource = (ob) => {
    switch (ob.sourceId.name) {
        case "Cold Calling":
            return "<i class=\"fa-solid fa-table\"></i>";
            break;

        case "Facebook":
            return "<i class=\"fa-brands fa-facebook-f\"></i>";
            break;

        case "Leaflets":
            return "<i class=\"fa-solid fa-note-sticky\"></i>";
            break;

        case "Letter Campaign":
            return "<i class=\"fa-solid fa-envelope\"></i>";
            break;

        case "Personal Contact":
            return "<i class=\"fa-solid fa-person\"></i>";
            break;

        case "Phone Call":
            return "<i class=\"fa-solid fa-phone\"></i>";
            break;

        case "Seminar":
            return "<i class=\"fa-solid fa-person-chalkboard\"></i>";
            break;

        case "SMS Campaign":
            return "<i class=\"fa-solid fa-comment-sms\"></i>";
            break;

        case "Walk In":
            return "<i class=\"fa-solid fa-person-walking\"></i>";
            break;

        case "WhatsApp":
            return "<i class=\"fa-brands fa-whatsapp\"></i>";
            break;
    }

}

const getFullName = (ob) => {
    firstName = ob.firstName;
    lastName = ob.lastName;

    return firstName + " " + lastName;

}
const rowEdit = (ob, Index) => {

}
const rowPrint = (ob, Index) => {

}
const rowDelete = (ob, Index) => {

}

//refresh inquiryPool table end