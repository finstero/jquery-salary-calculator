console.log('hello jS!')

$(document).ready(readyNow);

function readyNow() {
    // console.log('hello jQ!');
    $('#submitButton').on('click', handleSubmit);
    $('#tableBody').on('click', '.deleteButton', handleDelete);
}

let employees = [];
let yearlyCost = 0;

//take in values from inputs on click of submit button and display on DOM
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
    //run calculateCost function to calculate and display monthly costs at bottom
    calculateCost();

    //append info from above into appropriate table position, assigning class to elements where needed
    $('#tableBody').append(`
        <tr class="personInput">
            <td scope="row">${person.firstName}</td>
            <td>${person.lastName}</td>
            <td class ="id">${person.id}</td>
            <td>${person.title}</td>
            <td class="salary">$<span>${person.salary}</span></td>
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
    // console.log('log array after submit', employees);
}

// calculates total monthly cost based on employee yearly salaries and displays to DOM
function calculateCost(){
    let yearlyCost = 0;
    //loop through employee array and sum up salaries
    for (person of employees){
        yearlyCost += Number(person.salary);
    }
    //get monthly cost
    let monthlyCost = yearlyCost/12;
    //display monthly cost to DOM
    $('#monthlyCost').text(`${monthlyCost}`);
    //if monthly cost over number, set background of  to red
    if (monthlyCost >= 20000){
        $('#monthlyCost').addClass('redBackground');
    }
    // console.log('calculate cost: yearly cost:', yearlyCost);
} 

// on click of delete button, delete respective employee from DOM and array, and update total monthly cost 
function handleDelete(){
    // assign id of deleted employee to a string. using id rather than salary so splice will work properly
    let deletedId = $(this).parent().siblings('.id').text(); //is there a simpler way to DOM traverse here?
    // delete html
    $(this).closest('.personInput').remove();
    
    //re calculates monthly cost KEEPING IN FOR MY OWN REFERENCE this doesn't work well because array still exists
    // let yearlyCost = calculateCost() - deletedSalary;
    // let monthlyCost = yearlyCost/12;
    // $('#monthlyCost').text(`${monthlyCost}`);

    //delete person in array and re run calculate cost function
    //using id because that should be unique. salary might not be unique.
    for (let i = 0; i<employees.length; i++){
        if(employees[i].id == deletedId){
            employees.splice(i, 1);
        }
    }
    calculateCost();
    // console.log('hopefully updated array', employees);
}
