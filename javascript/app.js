//************** Variable Declaration **************

// HTML Declaration 
const wageForm = document.querySelector('#calculate'),
    contractTimeDisplay = document.querySelector('#contractDisplay'),
    extraTimeDisplay = document.querySelector('#extraTimeDisplay'),
    totalAmountDisplay = document.querySelector('#totalAmountDisplay'),
    messageDisplay = document.querySelector('#msgDisplay');

// Wages Variable Declaration 
const contractTime = 4,
    payPerHour = 1000,
    tip = 200;

// Error & Success Message and class Declaration 
const successMsg = "Wages successfully calculated",
    errorMsg = "Error!!!! Hour(s) spent must be stated",
    successClass = 'msg-success',
    errorClass = 'msg-error';

// This returns the result 
let result = '';

// Serves as placeholder
let extraHoursSpent = contractTimeAmount = extraTimeAmount = '';


//************** Event Listeners **************
eventListeners();
function eventListeners() {
    wageForm.addEventListener('submit', calcWage);
}



//************** Function Declaration **************

/*         Daily Wages Calculator: 
This calculate the daily wages of the employees */
function calcWage(e) {
    // Preventing the submit button from submitting through the default setting
    e.preventDefault();

    // Extracting the value of the total hours spent by the employee
    const hoursWorked = Number(document.querySelector('#totalHours').value);

    //******* Performing error check *******
    // Checking for empty input
    if (hoursWorked == '') {
        // Displaying error message
        msgDisplayer(errorMsg, errorClass);
    } else {
        // Checking the total hours spent against the contract time 
        if (hoursWorked <= contractTime) {
            // If the hours spent is less or equal to the contract time, then hours spent is the contract time
            contractTimeAmount = hoursWorked;
            extraTimeAmount = 0;

            // Calculating amount 
            result = normalTimePay(contractTimeAmount, payPerHour);

            // Displaying result and also success message
            resultDisplayer(result, extraTimeAmount, result)
            msgDisplayer(successMsg, successClass);
        } else {
            extraHoursSpent = extraTime(hoursWorked, contractTime)
            contractTimeAmount = hoursWorked * payPerHour;
            extraTimeAmount = extraHoursSpent * tip;
            
            // Calculating amount
            result = totalExtraTimePay(contractTimeAmount, extraTimeAmount);

            // Displaying result and also success message
            resultDisplayer(contractTimeAmount, extraTimeAmount, result);
            msgDisplayer(successMsg, successClass);
        }
    }
    this.reset();
}

/*          Extra Hour Spent Calculator: 
This calculate the extra hour spent by the employee using the total hours 
spent by the employee subtracted from their regualr contract time      */
function extraTime(hoursWorked, contractTime) {
    extraHours = hoursWorked - contractTime;
    return extraHours;
}

/*          Normal Time Amount Calculator: 
    This calculates the amount to be received by the  employee using 
the contract time, pay per hour, extra hours spent and tip for extra hours    */
function normalTimePay(hoursWorked, payPerHour) {
    result = hoursWorked * payPerHour;
    return result;
}

/*          Extra Time Amount Calculator: 
    This calculates the amount to be received by the  employee using 
the contract time, pay per hour, extra hours spent and tip for extra hours    */
function totalExtraTimePay(contractTimeAmount, extraTimeAmount) {
    result = contractTimeAmount + extraTimeAmount;
    return result;
}

/*          Result Displayer: 
    This displays either the results    */
function resultDisplayer(a, b, c) {
    contractDisplay.innerHTML = a;
    extraTimeDisplay.innerHTML = b;
    totalAmountDisplay.innerHTML = c;
}

/*          Message Displayer: 
    This displays either the error or success message    */
function msgDisplayer(msg, msgDisplayType) {
    messageDisplay.innerHTML = msg;
    messageDisplay.classList = msgDisplayType;
    if (msgDisplay) {
        setTimeout(function () {
            msgDisplay.style.display = 'none';
        }, 3000);
        msgDisplay.style.display = 'block';
    }
}
