console.log('hello jS!')

$(document).ready(readyNow);

function readyNow() {
    console.log('hello jQ!');
    $('#submitButton').on('click', handleSubmit);
    $('#tableBody').on('click', '.deleteButton', handleDelete);
}

let employees = [];

function handleSubmit() {
    //collect all input values and put them into person object
    const person = {
        firstName: $('#firstNameIn').val(),
        lastName: $('#lastNameIn').val(),
        id: $('#idIn').val(),
        title: $('#titleIn').val(),
        salary: $('#salaryIn').val(),
    }
    //add single employee/person to array of all employees
    employees.push(person);
    calculateCost();

    $('#tableBody').append(`
        <tr class="personInput">
            <td scope="row">${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.id}</td>
            <td>${person.title}</td>
            <td>$${person.salary}</td>
            <td>
                <button class="deleteButton">Delete</button>
            </td>
        </tr>`)

    //clear inputs
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#idIn').val('');
    $('#titleIn').val('');
    $('#salaryIn').val('');
}

function calculateCost(){
    let yearlyCost = 0;
    for (person of employees){
        yearlyCost += Number(person.salary);
    }
    let monthlyCost = yearlyCost/12;
    $('#monthlyCost').text(`$${monthlyCost}`);
    if (monthlyCost >= 20000){
        $('#toChange').addClass('redBackground');
    }
}

function handleDelete(){
    $(this).closest('.personInput').remove();

}
