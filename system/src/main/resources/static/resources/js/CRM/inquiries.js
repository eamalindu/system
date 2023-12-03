window.addEventListener('load', () => {

    //refresh table
    refreshTable();

    //dynamic select start
    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(inquirySearchCourse,'Please Select a Course',courses,'name');

    sources = ajaxGetRequest("/source/findall")
    fillSelectOptions(inquirySearchSource,'Please Select a Source',sources,'name')

    //need to add counsellors also (db not implemented yet)
    //dynamic select end


    //external libraries initialization
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
    inquiriesWithFollowUps = ajaxGetRequest("/followup/latestFollowup");

    displayPropertyList = [
        {property: getInquiryId,dataType: 'function'},
        {property: getSource,dataType: 'function'},
        {property: getCourse,dataType: 'function'},
        {property: getFirstName,dataType: 'function'},
        {property: getMobileNumber,dataType: 'function'},
        {property: 'feeling',dataType: 'text'},
        {property: 'confirmed',dataType: 'text'},
        {property: 'addedBy',dataType: 'text'},
        {property: getNextFollowup,dataType: 'function'},
        {property: getInquiryStatus,dataType: 'function'}

    ];

    fillDataIntoTable(tblInquiry,inquiriesWithFollowUps,displayPropertyList,rowView);

}

const getInquiryId = (ob) =>{
    return ob.inquiryId.inquiryNumber;

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

const getNextFollowup = (ob)=>{
    return ob.nextFollowup.replace('T', ' ');
}

const rowView = (ob,rowIndex)=>{

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

    const [addedDate, addedTime] = ob.inquiryId.timeStamp.split("T");
    document.querySelector('#inquirySheetAddedDate').innerText = addedDate;
    document.querySelector('#inquirySheetAddedTime').innerText = addedTime;
    document.querySelector('#inquirySheetAddedBy').innerText = ob.inquiryId.addedBy;



}
const rowEdit = (ob,rowIndex)=>{

}
const rowDelete = (ob,rowIndex)=>{

}