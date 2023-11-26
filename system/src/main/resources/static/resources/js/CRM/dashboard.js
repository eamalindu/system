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
        property: getCourse, dataType: 'function'
    }, {property: getSource, dataType: 'function'}, {property: getFullName, dataType: 'function'}];

    fillDataIntoTable(tblInquiryPool, newInquiries, displayPropertyListForInquiryPool, rowView);

    //testing code start

    scheduledInquiries = ajaxGetRequest("/inquiry/test2")

    displayPropertyListForScheduledPool = [{property: 'inquiry_id', dataType: 'text'}, {
        property: 'course_id', dataType: 'text'
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
    inputs = document.querySelectorAll('.inquirySheetInputs');
    inputs.forEach(function (input) {
        input.setAttribute('disabled', 'true');
        input.style = '';

    });

    //add the disabled attribute from the select
    //remove the border color to indicate that select cant be now edited
    inquirySheetCourse.setAttribute('disabled', 'true');
    inquirySheetCourse.setAttribute('style', '');

    //select the appropriate option as selected
    inquirySheetCourse.options[ob.courseId.id].selected = true;

    //add the disabled attribute from the select
    //remove the border color to indicate that select cant be now edited
    inquirySheetSource.setAttribute('disabled', 'true');
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

    //set id type
    inquirySheetIdType.value = ob.idType;

    //set the current object to be edited
    currentInquiry = ob;


}
//refresh inquiryPool table end

const inquiryEdit = () => {
    //remove the attribute readonly to make inputs accept the user input values
    //give a border color to inputs indicate that the input's values are ready to be edited
    inputs = document.querySelectorAll('.inquirySheetInputs');

    //remove the disabled attribute from the select
    //give a border color to indicate that select can be now edited
    inquirySheetCourse.removeAttribute('disabled');
    inquirySheetCourse.setAttribute('style', 'border:1px solid #ffc107!important');
    inquirySheetSource.removeAttribute('disabled');
    inquirySheetSource.setAttribute('style', 'border:1px solid #ffc107!important');

    inputs.forEach(function (input) {
        input.removeAttribute('disabled');
        input.setAttribute('style', 'border:1px solid #ffc107!important');
    });

    //display the update button once the edit button is clicked
    btnInquirySheetUpdate.style.display = 'block';

    //catch old inquiry and new inquiry
    oldInquiry = JSON.parse(JSON.stringify(currentInquiry));
    editedInquiry = JSON.parse(JSON.stringify(currentInquiry));

    console.log("old inquiry 👇")
    console.log(oldInquiry)
    console.log("edited inquiry 👇")
    console.log(editedInquiry)
    console.log("new inquiry 👇")
    console.log(newInquiry)

}
const inquiryDropped = () => {

    inquiryToBeDropped = currentInquiry;
    console.log(inquiryToBeDropped);

    showCustomConfirm('Are You Sure?<br><small>You are about to drop the inquiry <strong>#' + inquiryToBeDropped.inquiryNumber + '</strong></small>',function (result){

        if(result){
            //database query
        }
        else{
            //close the modal for dropped
        }
    });

}

const inquiryUpdate = () => {

    const errors = checkInquriyUpdateErrors();

    if (errors === '') {

        let updates = checkForInquiryUpdates();

        if (updates === "") {
            showCustomModal("No changes Detected!", "info")
        } else {
            showCustomModal("Following Changes Detected<br><br/><small>" + updates, "warning")
        }

    } else {
        showCustomModal(errors, 'warning');
    }
}

const checkForInquiryUpdates = () => {

    let updates = '';

    if (editedInquiry.firstName !== oldInquiry.firstName) {
        updates = updates + "First Name was changed to <span class='text-purple'>" + editedInquiry.firstName + "</span><br>";
    }
    if (editedInquiry.lastName !== oldInquiry.lastName) {
        updates = updates + "Last Name was changed to <span class='text-purple'>" + editedInquiry.lastName + "</span><br>";
    }
    if (editedInquiry.primaryMobileNumber !== oldInquiry.primaryMobileNumber) {
        updates = updates + "Phone Number was changed to <span class='text-purple'>" + editedInquiry.primaryMobileNumber + "</span><br>";
    }
    if (editedInquiry.email !== oldInquiry.email) {
        updates = updates + "Email was changed to <span class='text-lowercase text-purple'>" + editedInquiry.email + "</span><br>";
    }
    if (editedInquiry.secondaryMobileNumber !== oldInquiry.secondaryMobileNumber) {
        updates = updates + "Optional Phone Number was changed to <span class='text-purple'>" + editedInquiry.secondaryMobileNumber + "</span><br>";
    }
    if (editedInquiry.idValue !== oldInquiry.idValue) {
        updates = updates + "ID Value was changed to <span class='text-purple'>" + editedInquiry.idValue + "</span><br>";
    }
    if (editedInquiry.description !== oldInquiry.description) {
        updates = updates + "Description was changed to <span class='text-purple'>" + editedInquiry.description + "</span><br>";
    }
    if (editedInquiry.courseId.name !== oldInquiry.courseId.name) {
        updates = updates + "Course was changed to <span class='text-purple'>" + editedInquiry.courseId.name + "</span><br>";
    }
    if (editedInquiry.sourceId.name !== oldInquiry.sourceId.name) {
        updates = updates + "Source was changed to <span class='text-purple'>" + editedInquiry.sourceId.name + "</span><br>";
    }


    return updates;
}

const checkInquriyUpdateErrors = () => {
    let errors = '';

    if (editedInquiry.sourceId == null) {
        errors = errors + 'Source is Required<br>';
    }
    if (editedInquiry.courseId == null) {
        errors = errors + 'Course is Required<br>';
    }
    if (editedInquiry.firstName == null) {
        errors = errors + 'First Name is Required<br>';
    }
    if (editedInquiry.lastName == null) {
        errors = errors + 'Last Name is Required<br>';
    }
    if (editedInquiry.primaryMobileNumber == null) {
        errors = errors + 'Mobile Number is Required<br>';

    }
    if (editedInquiry.idType == null) {
        errors = errors + 'ID Type is Required<br>';

    }
    if (editedInquiry.idValue == null) {
        errors = errors + 'ID Value is Required<br>';

    }
    if (editedInquiry.contactTime == null) {
        errors = errors + 'Contact Time is Required<br>';
    }
    if (editedInquiry.description == null) {
        errors = errors + 'Description is Required<br>';
    }

    return errors;
}