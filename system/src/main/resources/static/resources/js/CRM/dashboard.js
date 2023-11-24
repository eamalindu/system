window.addEventListener('load', () => {

    //calling refreshInquiryPoolTable function
    refreshInquiryPoolTable();

    //hide the update button
    btnInquirySheetUpdate.style.display = 'none';

    //make the selects dynamic for inquiry sheet
    courses = ajaxGetRequest("/course/findall");
    fillSelectOptions(inquirySheetCourse, 'Please Select a Course', courses);
    sources = ajaxGetRequest("/source/findall")
    fillSelectOptions(inquirySheetSource, 'Please Select a Source', sources)

});


//refresh inquiryPool table start
const refreshInquiryPoolTable = () => {

    //get data from the database with ajax
    newInquiries = ajaxGetRequest("/inquiry/newInquiry");
    displayPropertyListForInquiryPool = [{property: 'inquiryNumber', dataType: 'text'}, {
        property: getCourse,
        dataType: 'function'
    }, {property: getSource, dataType: 'function'}, {property: getFullName, dataType: 'function'}];

    fillDataIntoTable(tblInquiryPool, newInquiries, displayPropertyListForInquiryPool, rowView);

    //testing code start

    scheduledInquiries = ajaxGetRequest("/inquiry/test2")

    displayPropertyListForScheduledPool = [{property: 'inquiry_id', dataType: 'text'}, {
        property: 'course_id',
        dataType: 'text'
    }, {property: 'source_id', dataType: 'text'}, {property: 'firstname', dataType: 'text'},];
    fillDataIntoTable(tblScheduledPool, scheduledInquiries, displayPropertyListForScheduledPool, rowView);

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
    //hide the update button
    btnInquirySheetUpdate.style.display = 'none';

    //make all the inputs readonly and remove inline styles
    inputs = document.querySelectorAll('input');
    textArea = document.querySelector('#inquirySheetDescription');
    textArea.setAttribute('readonly', 'true');
    textArea.style = '';
    inputs.forEach(function (input) {
        input.setAttribute('readonly', 'true');
        input.style = '';

    });

    //add the disabled attribute from the select
    //remove the border color to indicate that select cant be now edited
    inquirySheetCourse.setAttribute('disabled','true');
    inquirySheetCourse.setAttribute('style', '');

    //select the appropriate option as selected
    inquirySheetCourse.options[ob.courseId.id].selected = true;

    //add the disabled attribute from the select
    //remove the border color to indicate that select cant be now edited
    inquirySheetSource.setAttribute('disabled','true');
    inquirySheetSource.setAttribute('style', '');

    //select the appropriate option as selected
    inquirySheetSource.options[ob.sourceId.id].selected = true;

    inquirySheetId.innerText = ob.inquiryNumber;

    inquirySheetFirstName.value = ob.firstName;
    inquirySheetLastName.value = ob.lastName;
    inquirySheetPrimaryMobile.value = ob.primaryMobileNumber;

    //email is an optional value therefore it might contain null as the value
    //instead of displaying nothing, we can use if condition to set a value

    if (ob.email !== null) {
        inquirySheetEmail.value = ob.email;
        inquirySheetEmail.classList.remove('text-muted');

    } else {
        inquirySheetEmail.value = '-- Not Provided --';
        inquirySheetEmail.classList.add('text-muted');
    }

    if (ob.secondaryMobileNumber !== null) {
        inquirySheetSecondaryMobile.value = ob.secondaryMobileNumber;
        inquirySheetSecondaryMobile.classList.remove('text-muted');

    } else {
        inquirySheetSecondaryMobile.value = '-- Not Provided --';
        inquirySheetSecondaryMobile.classList.add('text-muted');
    }

    inquirySheetIdValue.value = ob.idValue;

    //showing date and time with iSO Standarad
    inquirySheetNextFollowUp.value = (ob.contactTime).replace('T', ' ');
    inquirySheetDescription.value = ob.description;

    //set info section
    const [addedDate, addedTime] = ob.timeStamp.split("T");
    inquirySheetAddedDate.innerText = addedDate;
    inquirySheetAddedTime.innerText = addedTime;
    inquirySheetAddedBy.innerText = ob.addedBy;

    //set the current object to be edited
    inquiryToBeEdited = ob;


}

const inquiryEdit = () => {
    //remove the attribute readonly to make inputs accept the user input values
    //give a border color to inputs indicate that the input's values are ready to be edited
    inputs = document.querySelectorAll('input');
    textArea = document.querySelector('#inquirySheetDescription');
    textArea.removeAttribute('readonly');
    textArea.setAttribute('style', 'border:1px solid #ffc107!important');

    //remove the disabled attribute from the select
    //give a border color to indicate that select can be now edited
    inquirySheetCourse.removeAttribute('disabled');
    inquirySheetCourse.setAttribute('style', 'border:1px solid #ffc107!important');

    inputs.forEach(function (input) {
        input.removeAttribute('readonly');
        input.setAttribute('style', 'border:1px solid #ffc107!important');
    });

    //display the update button once the edit button is clicked
    btnInquirySheetUpdate.style.display = 'block';

    //catch old inquiry and new inquiry
    oldInquiry = JSON.parse(JSON.stringify(inquiryToBeEdited));
    newInquiry = JSON.parse(JSON.stringify(inquiryToBeEdited));

    console.log(oldInquiry)
    console.log(newInquiry)

}
const rowDelete = (ob, Index) => {

}
//refresh inquiryPool table end