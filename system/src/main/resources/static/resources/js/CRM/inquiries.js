window.addEventListener('load', () => {

    refreshTable();

    $(".chosen-inquiry-search").chosen({width: '190px'});
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

});


const refreshTable = () => {

    //get data with ajax and database
    inquiriesWithFollowUps = [];
    $.ajax("/followup/findall", {
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
        {property: getInquiryId,dataType: 'function'},
        {property: getSource,dataType: 'function'},
        {property: getCourse,dataType: 'function'},
        {property: getFirstName,dataType: 'function'},
        {property: getMobileNumber,dataType: 'function'},
        {property: 'feeling',dataType: 'text'},
        {property: 'confirmed',dataType: 'text'},
        {property: 'addedBy',dataType: 'text'},
        {property: 'nextFollowup',dataType: 'text'},
        {property: getInquiryStatus,dataType: 'function'}

    ];

    fillDataIntoTable(tblInquiry,inquiriesWithFollowUps,displayPropertyList,rowEdit,rowPrint,rowDelete);

}

const getInquiryId = (ob) =>{
    return ob.inquiryId.id;

}
const getSource = (ob) => {
    return ob.inquiryId.sourceId.name;
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

    return ob.inquiryId.inquiryStatusId.name;
}

const rowEdit = (ob,rowIndex)=>{

    document.querySelector('#inquirySheetId').innerText = getInquiryId(ob);

    document.querySelector('#inquirySheetCourse').value = ob.inquiryId.courseId.code;
    document.querySelector('#inquirySheetSource').value = ob.inquiryId.sourceId.name;

    document.querySelector('#inquirySheetFirstName').value = ob.inquiryId.firstName;
    document.querySelector('#inquirySheetLastName').value = ob.inquiryId.lastName;
    document.querySelector('#inquirySheetPrimaryMobile').value = ob.inquiryId.primaryMobileNumber;

    //email is an optional value therefore it might contain null as the value
    //instead of displaying nothing, we can use if condition to set a value

    if(ob.inquiryId.email!==null){
        document.querySelector('#inquirySheetEmail').value = ob.inquiryId.email;
        document.querySelector('#inquirySheetEmail').classList.remove('text-muted');

    }
    else
    {
        document.querySelector('#inquirySheetEmail').value = '-- Not Provided --';
        document.querySelector('#inquirySheetEmail').classList.add('text-muted');
    }

    if(ob.inquiryId.secondaryMobileNumber !== null){
        document.querySelector('#inquirySheetSecondaryMobile').value =ob.inquiryId.secondaryMobileNumber ;
        document.querySelector('#inquirySheetSecondaryMobile').classList.remove('text-muted');

    }else{
        document.querySelector('#inquirySheetSecondaryMobile').value = '-- Not Provided --';
        document.querySelector('#inquirySheetSecondaryMobile').classList.add('text-muted');
    }

    document.querySelector('#inquirySheetIdValue').value = ob.inquiryId.idValue;

    //showing date and time with iSO Standarad
    document.querySelector('#inquirySheetNextFollowUp').value = (ob.inquiryId.contactTime).replace('T', ' ');
    document.querySelector('#inquirySheetDescription').value = ob.inquiryId.description;





}
const rowPrint = (ob,rowIndex)=>{

}
const rowDelete = (ob,rowIndex)=>{

}