console.log('hello jS!')

$(document).ready(readyNow);

function readyNow(){
    console.log('hello jQ!');
    $('#submitButton').on('click', handleSubmit);
}

function handleSubmit(){
    let firstName = $('#firstNameIn').val();
    
}
