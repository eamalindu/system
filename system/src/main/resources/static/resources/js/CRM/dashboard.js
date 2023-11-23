window.addEventListener('load', () => {

    //calling refreshInquiryPoolTable function
    refreshInquiryPoolTable();

    btnInquirySheetUpdate.style.display = 'none';

});


//refresh inquiryPool table start
const refreshInquiryPoolTable = () => {

    //get data from the database with ajax
    newInquiries = ajaxGetRequest("/inquiry/newInquiry");
    displayPropertyListForInquiryPool = [
        {property: 'inquiryNumber', dataType: 'text'},
        {property: getCourse, dataType: 'function'},
        {property: getSource, dataType: 'function'},
        {property: getFullName, dataType: 'function'}
    ];

    fillDataIntoTable(tblInquiryPool, newInquiries, displayPropertyListForInquiryPool, rowEdit, rowView, rowDelete);

    //testing code start

    scheduledInquiries = ajaxGetRequest("/inquiry/test2")

     displayPropertyListForScheduledPool=[
        {property:'inquiry_id',dataType:'text'},
        {property:'course_id',dataType:'text'},
        {property:'source_id',dataType:'text'},
        {property:'firstname',dataType:'text'},
    ];
    fillDataIntoTable(tblScheduledPool, scheduledInquiries, displayPropertyListForScheduledPool, rowEdit, rowView, rowDelete);

//testing code end

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
const rowView = (ob, Index) => {

    btnInquirySheetUpdate.style.display = 'none';
    inputs = document.querySelectorAll('input');
    textArea = document.querySelector('#inquirySheetDescription');
    textArea.setAttribute('readonly','true');
    textArea.style = '';
    inputs.forEach(function (input) {
        input.setAttribute('readonly','true');
        input.style = '';

    });

    document.querySelector('#inquirySheetId').innerText = ob.inquiryNumber;

    document.querySelector('#inquirySheetCourse').value = ob.courseId.code;
    document.querySelector('#inquirySheetSource').value = ob.sourceId.name;

    document.querySelector('#inquirySheetFirstName').value = ob.firstName;
    document.querySelector('#inquirySheetLastName').value = ob.lastName;
    document.querySelector('#inquirySheetPrimaryMobile').value = ob.primaryMobileNumber;

    //email is an optional value therefore it might contain null as the value
    //instead of displaying nothing, we can use if condition to set a value

    if(ob.email!==null){
        document.querySelector('#inquirySheetEmail').value = ob.email;
        document.querySelector('#inquirySheetEmail').classList.remove('text-muted');

    }
    else
    {
        document.querySelector('#inquirySheetEmail').value = '-- Not Provided --';
        document.querySelector('#inquirySheetEmail').classList.add('text-muted');
    }

    if(ob.secondaryMobileNumber !== null){
        document.querySelector('#inquirySheetSecondaryMobile').value =ob.secondaryMobileNumber ;
        document.querySelector('#inquirySheetSecondaryMobile').classList.remove('text-muted');

    }else{
        document.querySelector('#inquirySheetSecondaryMobile').value = '-- Not Provided --';
        document.querySelector('#inquirySheetSecondaryMobile').classList.add('text-muted');
    }

    document.querySelector('#inquirySheetIdValue').value = ob.idValue;

    //showing date and time with iSO Standarad
    document.querySelector('#inquirySheetNextFollowUp').value = (ob.contactTime).replace('T', ' ');
    document.querySelector('#inquirySheetDescription').value = ob.description;

    //set info section
    const [addedDate, addedTime] = ob.timeStamp.split("T");
    document.querySelector('#inquirySheetAddedDate').innerText = addedDate;
    document.querySelector('#inquirySheetAddedTime').innerText = addedTime;
    document.querySelector('#inquirySheetAddedBy').innerText = ob.addedBy;

}
const rowEdit = (ob, Index) => {
    //remove the attribute readonly to make inputs accept the user input values
    //give a border color to inputs indicate that the input's values are ready to be edited
    inputs = document.querySelectorAll('input');
    textArea = document.querySelector('#inquirySheetDescription');
    textArea.removeAttribute('readonly');
    textArea.setAttribute('style','border:1px solid #ffc107!important');
    inputs.forEach(function (input) {
        input.removeAttribute('readonly');
        input.setAttribute('style','border:1px solid #ffc107!important');
    });

    //display the update button once the edit button is clicked
    btnInquirySheetUpdate.style.display = 'block';


}
const rowDelete = (ob, Index) => {

}
//refresh inquiryPool table end