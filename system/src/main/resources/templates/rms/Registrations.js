//will execute after the document is finished loading
window.addEventListener('load',()=>{

    //get the search input from the DOM
    let input_search= document.querySelector('#input-search');

    //get the search button from the DOM
    let btn_search = document.querySelector('#btn-search');

    //get the reset button from the DOM
    let btn_reset= document.querySelector('#btn-reset');

    //get the date select from the DOM
    let select_date = document.querySelector('#select-date');

    //get the payment select from the DOM
    let select_payment = document.querySelector('#select-payment');

    //get the user select from the DOM
    let select_user = document.querySelector('#select-user');

    //get the card footer that displays the data table form the DOM
    let footer_table_data = document.querySelector('#table-data');

    //get the card footer that act as the placeholder from the DOM
    let footer_table_placeholder = document.querySelector('#table-placeholder');

    //Clear all the values and selected items when the reset button is clicked
    btn_reset.addEventListener('click',()=>{

        //clear search input
        input_search.value = '';
        //clear select date [this will select the first option]
        select_date.selectedIndex = 0;
        //clear select payment
        select_payment.selectedIndex = 0;
        //clear select user
        select_user.selectedIndex = 0;
        //remove validation classes from the search input
        input_search.classList.remove('is-invalid');
        input_search.classList.remove('is-valid');
        //hide the card footer table
        footer_table_data.classList.remove('show');
        //show the card footer placeholder
        footer_table_placeholder.classList.add('show');


    });

    //validate search text on keyup
    //search text should only accept the student reg number, NIC Number or their mobile number

    input_search.addEventListener('keyup',()=>{

        const pattern = '^[0][0][0][0-9]{5}|[0][7][01245678][0-9]{7}|[0-9]{9}[x|X|v|V]|[0-9]{12}$';
        const regexPattern = new RegExp(pattern);

        if(regexPattern.test(input_search.value)){
            input_search.classList.add('is-valid');
            input_search.classList.remove('is-invalid')
        }
        else{
            input_search.classList.remove('is-valid');
            input_search.classList.add('is-invalid');
        }
    });

    //test purposes only
    //when the search Button is clicked placeholder wil be hidden from the DOM and the data-table will be displayed
    btn_search.addEventListener('click',()=>{

        //hide the footer placeholder
        footer_table_placeholder.classList.remove('show');
        //show the footer table
        footer_table_data.classList.add('show');

    });


});