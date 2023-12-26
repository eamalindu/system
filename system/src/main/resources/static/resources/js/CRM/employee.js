window.addEventListener('load',()=>{

    //new employee object
    newEmployee = {};

    //dynamic select for courses
    Status = ajaxGetRequest("/employeestatus/findall");
    fillSelectOptions(employeeStatus, 'Please Select a Status', Status, 'status')

    //dynamic select for sources
    designations = ajaxGetRequest("/designation/findall")
    fillSelectOptions(employeeDesignation, 'Please Select a Designation', designations, 'designation')


    //hide the update btn
    btnEmployeeSheetUpdate.style.display = 'none';

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
    employees = ajaxGetRequest("/employee/findall");
    displayPropertyListForEmployee = [
        {property:'employeeID',dataType:'text'},
        {property:'fullName',dataType:'text'},
        {property:'nic',dataType:'text'},
        {property:'email',dataType:'text'},
        {property:'mobileNumber',dataType:'text'},
        {property:getDesignationName,dataType:'function'},
        {property:getEmployeeStatus,dataType:'function'},
        {property:getUserAccountStatus,dataType:'function'},
    ];

    fillDataIntoTable(tblEmployee,employees,displayPropertyListForEmployee,rowView,'offCanvasEmployeeSheet')

}

const getDesignationName = (ob)=>{

    return ob.designationID.designation;
}
const getEmployeeStatus = (ob)=>{
    if(ob.employeeStatusID.status=="Working"){
        return '<i class="fa-solid fa-user-check text-success bg-custom-white p-2 rounded-circle" title="Employee Working"></i>';
    }
    if(ob.employeeStatusID.status=="Suspended"){
        return '<i class="fa-solid fa-user-slash text-warning bg-custom-white p-2 rounded-circle" title="Employee Suspended"></i>';
    }
    if(ob.employeeStatusID.status=="Resigned"){
        return '<i class="fa-solid fa-user-xmark fa-solid fa-user-xmark text-danger bg-custom-white p-2 rounded-circle" title="Employee Resigned"></i>';
    }

}

const getUserAccountStatus = (ob)=>{
    return '<i class="fa fa-xmark-circle text-danger fs-3"></i>';
}

const rowView=(ob,index) =>{

    inputs = document.querySelectorAll('.employeeSheetInputs');

    //remove the disabled attribute from the select
    //give a border color to indicate that select can be now edited

    inputs.forEach(function (input) {
        input.setAttribute('disabled', 'true');
        input.style = '';
        //remove bootstrap validation classes
        input.classList.remove('is-valid');
    });

    employeeSheetCallingNameText.classList.remove('text-muted');
    employeeSheetCallingNameText.classList.remove('text-warning');
    employeeSheetCallingNameText.classList.remove('text-danger');

    //hide the update btn
    btnEmployeeSheetUpdate.style.display = 'none';

    employeeSheetFullName.value = ob.fullName;
    employeeSheetCallingName.value = ob.callingName;
    employeeSheetNIC.value =ob.nic;
    employeeSheetDOB.value =ob.dob;

    //setting gender
    if(ob.gender=="Male"){
        employeeSheetGenderMale.checked = true;
    }
    else{
        employeeSheetGenderFemale.checked = true;
    }

    employeeSheetEmail.value=ob.email;
    employeeSheetMobile.value = ob.mobileNumber;

    //setting optional values
    if (ob.landNumber !== null) {
        employeeSheetLand.value = ob.landNumber;
        employeeSheetLand.classList.remove('text-muted');

    } else {
        employeeSheetLand.value = '-- Not Provided --';
        employeeSheetLand.classList.add('text-muted');
    }
    employeeSheetAddress.value = ob.address;
    employeeSheetCivilStatus.value = ob.civilStatus;
    employeeSheetDesignation.value = ob.designationID.designation;

//setting optional values
    if (ob.note !== null) {
        employeeSheetNote.value = ob.note;
        employeeSheetNote.classList.remove('text-muted');

    } else {
        employeeSheetNote.value = '-- Not Provided --';
        employeeSheetNote.classList.add('text-muted');
    }

    employeeSheetHighestEducation.value = ob.highestEducationalQualification;
    employeeSheetEmployeeStatus.value = ob.employeeStatusID.status;

    employeeSheetEmpIDText.innerText = ob.employeeID;

    const [joinedDate, joinedTime] =ob.added_timestamp.split("T");
    employeeSheetJoinedDateText.innerText = joinedDate;

    employeeSheetCallingNameText.innerText = ob.callingName;

    if(ob.employeeStatusID.status=="Working") {
        employeeSheetCallingNameText.classList.add('text-success');
    }
    else if (ob.employeeStatusID.status=="Suspended"){
        employeeSheetCallingNameText.classList.add('text-warning');
    }
    else{
        employeeSheetCallingNameText.classList.add('text-danger');
    }
}
const employeeEdit = () => {

    //display the update button once the edit button is clicked
    btnEmployeeSheetUpdate.style.display = 'block';

    //remove the attribute readonly to make inputs accept the user input values
    //give a border color to inputs indicate that the input's values are ready to be edited
    inputs = document.querySelectorAll('.employeeSheetInputs');

    //remove the disabled attribute from the select
    //give a border color to indicate that select can be now edited

    inputs.forEach(function (input) {
        input.removeAttribute('disabled');
        input.setAttribute('style', 'border:1px solid #0DCAF0!important;background-color:rgba(13,202,240,0.2);');
    });
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