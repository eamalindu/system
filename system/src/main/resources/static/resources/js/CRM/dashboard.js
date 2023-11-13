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
        {property: 'firstName', dataType: 'text'}
    ];

    fillDataIntoTable(tblInquiryPool, newInquiries, displayPropertyList, rowEdit, rowPrint, rowDelete);

}

const getCourse = (ob) => {
    return ob.courseId.code;
}

const getSource = (ob) => {
    return ob.sourceid.name;

}

const rowEdit = (ob,Index) =>{

}
const rowPrint = (ob,Index) =>{

}
const rowDelete =(ob,Index)=>{

}