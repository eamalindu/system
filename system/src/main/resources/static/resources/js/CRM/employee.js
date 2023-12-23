window.addEventListener('load',()=>{

    //new employee object
    newEmployee = {};

    //dynamic select for courses
    Status = ajaxGetRequest("/employeestatus/findall");
    fillSelectOptions(employeeStatus, 'Please Select a Status', Status, 'status')

    //dynamic select for sources
    designations = ajaxGetRequest("/designation/findall")
    fillSelectOptions(employeeDesignation, 'Please Select a Designation', designations, 'designation')

    //initializing 3rd party libraries
    $('#employeeDOB').daterangepicker({
        "maxDate": new Date(),
        "singleDatePicker": true,
        "timePicker": false,
        "timePicker24Hour": true,
        "autoApply": true,
        "linkedCalendars": false,
        "showCustomRangeLabel": false,
        "drops": "up",
        "locale": {
            "format": "YYYY-MM-DD"
        }
    });
    $('#employeeDesignation').chosen({width: '100%'});
    $('#employeeCivilStatus').chosen({width: '100%'});
    $('#employeeStatus').chosen({width: '100%'});
    $('#employeeHighestEducation').chosen({width:'100%'});

    refreshEmployeeTable()

    //validation chosen select (for new employee)
    $("#employeeCivilStatus").chosen().change(function () {
        $("#employeeCivilStatus_chosen .chosen-single").addClass('select-validated');
    });
    $("#employeeDesignation").chosen().change(function () {
        $("#employeeDesignation_chosen .chosen-single").addClass('select-validated');
    });
    $("#employeeStatus").chosen().change(function () {
        $("#employeeStatus_chosen .chosen-single").addClass('select-validated');
    });
    $("#employeeHighestEducation").chosen().change(function () {
        $("#employeeHighestEducation_chosen .chosen-single").addClass('select-validated');
    });
})

const refreshEmployeeTable = ()=>{

}

const newEmployeeSubmit=()=>{
    console.log(newEmployee);

    const errors = checkEmployeeFormErrors()

    if(errors===''){
        //this means there are no any errors
        //user confirmation is needed (will add later)
        showCustomConfirm("You are about to add a New Employee<br>Are You Sure?", function (result) {
            if (result) {
                //passing the data to backend
                //if the data is successfully passed to the database it will set the value of the postServerResponse to "OK"
                let postServerResponse;

            } else {
                showCustomModal("Operation Cancelled!", "info");
            }
        });
    }
    else{
        //there are errors
        //display them to the user using external-ModalFunction()
        showCustomModal(errors, 'warning');
    }
}


const checkEmployeeFormErrors = ()=>{
    let errors = '';

    if(newEmployee.fullName==null){
        errors = errors +'Full Name is Required<br>';
    }
    if(newEmployee.nic==null){
        errors = errors +'NIC is Required<br>';
    }
    if(newEmployee.dob==null){
        errors = errors +'Date of Birth is Required<br>';
    }
    if(newEmployee.email==null){
        errors = errors +'Email is Required<br>';
    }
    if(newEmployee.mobileNumber==null){
        errors = errors +'Mobile Number is Required<br>';
    }
    if(newEmployee.address==null){
        errors = errors +'Address is Required<br>';
    }
    if(newEmployee.civilStatus==null){
        errors = errors +'Civil Status is Required<br>';
    }
    if(newEmployee.designationID==null){
        errors = errors +'Designation is Required<br>';
    }
    if(newEmployee.employeeStatusID==null){
        errors = errors +'Employee Status is Required<br>';
    }
    if(newEmployee.gender==null){
        errors = errors +'Gender is Required<br>';
    }
    if(newEmployee.callingName==null){
        errors = errors +'Calling Name is Required<br>';
    }
    if(newEmployee.photoPath==null){
        errors = errors +'Profile Photo is Required<br>';
    }
    if(newEmployee.highestEducationalQualification==null){
        errors = errors +'Highest Educational Qualification is Required<br>';
    }

    return errors;
}