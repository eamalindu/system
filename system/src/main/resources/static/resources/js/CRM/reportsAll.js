window.addEventListener('load',()=>{

    //Initializing Data Range picker
    $(function () {

        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
            $('#reportrange span').html(start.format('YYYY MMMM DD') + ' - ' + end.format('YYYY MMMM DD'));
        }

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);

    });

    refreshReportAllTable()

})

const refreshReportAllTable = () =>{

    allInquiries = ajaxGetRequest("/inquiry/findall");

    displayPropertyListForReoprtAll = [
        {property: 'inquiryNumber',dataType:'text'},
        {property: getSourceName,dataType: 'function'},
        {property: getCourseName,dataType: 'function'},
        {property: getFullName,dataType: 'function'},
        {property: 'primaryMobileNumber',dataType: 'text'},
        {property: 'addedBy',dataType: 'text'},
        {property: getInquiryStatus,dataType: 'function'},
    ];

    fillDataIntoTable(tblReportsAll,allInquiries,displayPropertyListForReoprtAll,rowView);

}

const getSourceName=(ob)=>{
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

const getCourseName=(ob)=>{
    return ob.courseId.code;
}

const rowView = (ob)=>{

}