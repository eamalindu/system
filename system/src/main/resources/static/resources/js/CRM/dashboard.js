window.addEventListener('load', () => {

    //calling refreshInquiryPoolTable function
    refreshInquiryPoolTable();

});


//refresh inquiryPool table start
const refreshInquiryPoolTable = () => {

    //get data from the database with ajax
    newInquiries = ajaxGetRequest("/inquiry/findall");

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

    displayPropertyListForInquiryPool = [
        {property: 'inquiryNumber', dataType: 'text'},
        {property: getCourse, dataType: 'function'},
        {property: getSource, dataType: 'function'},
        {property: getFullName, dataType: 'function'}
    ];

    fillDataIntoTable(tblInquiryPool, newInquiries, displayPropertyListForInquiryPool, rowEdit, rowPrint, rowDelete);


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
