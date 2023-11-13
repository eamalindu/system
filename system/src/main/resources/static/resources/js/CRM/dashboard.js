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

window.addEventListener('load', () => {

    refreshTable();


});

const refreshTable = () => {

    //get data from the database with ajax
    newInquiries = [];
    $.ajax("/STEAM-CRM/Inquiry/newInquiry", {
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

    displayPropertyList = [
        {property: 'id', dataType: 'text'},
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
    switch (ob.sourceid.name) {
        case "Cold Calling":
            return "<i class=\"fa-solid fa-table\"></i>";
            break;

        case "Facebook":
            return "<i class=\"fa-brands fa-facebook-f\"></i>";
            break;

        case "Leaflets":
            return;
            break;

        case "Letter Campaign":
            return;
            break;

        case "Personal Contact":
            return;
            break;

        case "Phone Call":
            return;
            break;

        case "Seminar":
            return;
            break;

        case "SMS Campaign":
            return;
            break;

        case "Walk In":
            return;
            break;

        case "WhatsApp":
            return;
            break;

        default:
            console.log("Invalid marketing method");
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