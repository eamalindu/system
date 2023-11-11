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


window.addEventListener('load', () => {

    refreshTable();


});


const refreshTable = () => {

    //get data with ajax and database
    inquiriesWithFollowUps = [];
    $.ajax("/STEAM-CRM/followup/findall", {
        async: false,
        type: "Get",
        contentType: "json",
        success: function (data) {
            console.log(data);
            inquiriesWithFollowUps = data;
        },
        error: function (resOb) {
            alert("error" + resOb);
        }

    });

    displayPropertyList = [
        {property: getSource,dataType: 'function'},
        {property: getCourse,dataType: 'function'},
        {property: getFirstName,dataType: 'function'},
        {property: getMobileNumber,dataType: 'function'},
        {property: 'feeling',dataType: 'text'},
        {property: 'confirmed',dataType: 'text'},
        {property: 'addedBy',dataType: 'text'},
        {property: 'contactTime',dataType: 'text'},
        {property: getInquiryStatus,dataType: 'function'}

    ];

    fillDataIntoTable(tblInquiry,inquiriesWithFollowUps,displayPropertyList,rowEdit,rowPrint,rowDelete);

}

const getInquiryId = (ob) =>{
    return ob.inquiryId.id;

}
const getSource = (ob) => {
    return ob.inquiryId.sourceid.name;
};

const getCourse = (ob) =>{
    return ob.inquiryId.courseId.code;
}

const getFirstName = (ob) =>{
    return ob.inquiryId.firstName;
}

const getMobileNumber = (ob) =>{
    return ob.inquiryId.primaryMobileNumber;
}

const getInquiryStatus =(ob) =>{

    return ob.inquiryId.inquiryStatusid.name;
}

const rowEdit = (ob,rowIndex)=>{


}
const rowPrint = (ob,rowIndex)=>{

}
const rowDelete = (ob,rowIndex)=>{

}