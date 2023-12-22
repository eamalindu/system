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
})

const refreshEmployeeTable = ()=>{

}