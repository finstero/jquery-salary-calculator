console.log('hello jS!')

$(document).ready(readyNow);

function readyNow() {
    // console.log('hello jQ!');
    $('#submitButton').on('click', handleSubmit);
    $('#tableBody').on('click', '.deleteButton', handleDelete);
}
//global employees array to store employee objects
let employees = [];

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
    //if else to ensure a salary is input. allows not including other information.
    //If doing a real world app I think I would ask client what they preferred.
    if(!person.salary.length){
        alert("Please make sure you include an annual salary");
    }
    else{
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
                    <button class="deleteButton btn btn-light meBtn">Delete</button>
                </td>
            </tr>`)
    }
    console.log('only if includes salary', employees);
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
    //get monthly cost and round to two decimals
    let monthlyCost = yearlyCost/12;
    let roundedMonthly = roundTwoDecimals(monthlyCost, 2);
    //display monthly cost to DOM
    $('#monthlyCost').text(`${roundedMonthly}`);
    // console.log('un rounded monthly is: ', monthlyCost);
    //if monthly cost over number, set background of  to red
    if (roundedMonthly >= 20000){
        $('#monthlyCost').addClass('redBackground');
        //pop up to alert user of monthly cost
        alert('Monthly costs have exceeded $20,000');
    }
    // console.log('calculate cost: yearly cost:', yearlyCost);
}

// on click of delete button, delete respective employee from DOM and array, and update total monthly cost 
function handleDelete(){
    // assign id of deleted employee to a string. using id rather than salary so splice will work properly
    let deletedId = $(this).parent().siblings('.id').text(); //is there a simpler way to DOM traverse here?

    // delete html
    $(this).closest('.personInput').remove();
    
    //delete respective employee by matched id.
    //using id because that should be unique. salary might not be unique.
    for (let i = 0; i<employees.length; i++){
        if(employees[i].id == deletedId){
            employees.splice(i, 1); 
        }
    }
    //re run calculate cost function
    calculateCost();
    // console.log('hopefully updated array', employees);
}
// function to round monthly cost correctly. Taken from: https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
// did some research on rounding and it appears to be fairly difficult! used this answer because
// there was some consensus that it worked consistently unlike a lot of other options
// if there's an easier way to round, that would be great to know!
function roundTwoDecimals(value, decimals) {
    return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
}
