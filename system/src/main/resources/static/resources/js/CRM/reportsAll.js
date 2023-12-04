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

    refreshReportAllTable();

    //testing data export as excel file
    btnToExcel.addEventListener('click',()=>{

        showCustomConfirm("You are About to Download the Inquiries From <span class='text-purple small'>"+reportrange.innerText.replace(' ','')+"</span><br> Are You Sure ?",function (result){


        })
         columnsToExport = [
            { name: "Inquiry Number", data: "inquiryNumber" },
            { name: "First Name", data: "firstName" },
            { name: "Last Name", data: "lastName" },
            { name: "Course ID", data: "courseId.name" }
        ];
        exportToExcel(allInquiries,reportrange.innerText.replace(' ',''),columnsToExport);
    })

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
    return ob.sourceId.name;

}

const getCourseName=(ob)=>{
    return ob.courseId.code;
}

const getFullName = (ob) => {
    return ob.firstName + " " + ob.lastName;
}

const getInquiryStatus = (ob)=>{

    return ob.inquiryStatusId.name;
}

const rowView = (ob)=>{

}