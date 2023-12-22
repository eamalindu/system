window.addEventListener('load',()=>{

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
    $('#employeeDesignation').chosen();
    $('#employeeCivilStatus').chosen();
    $('#employeeStatus').chosen();
})