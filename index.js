/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
function createEmployeeRecord(array){
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    let newArray = []
    for(let i = 0; i < array.length; i++){
        newArray.push(createEmployeeRecord(array[i]))
    }
    return newArray
}

function createTimeInEvent(thisDate){
    this.timeInEvents.push({
        type: 'TimeIn',
        date: thisDate.split(' ')[0], 
        hour: parseInt(thisDate.split(' ')[1], 10)
    })
    return this
}

function createTimeOutEvent(thisDate){
    this.timeOutEvents.push({
        type: 'TimeOut',
        date: thisDate.split(' ')[0], 
        hour: parseInt(thisDate.split(' ')[1], 10)
    })
    return this
}

function hoursWorkedOnDate(thisDate){
    let timeInEvent = this.timeInEvents.find(function(e){
        return e.date == thisDate
    })
    let timeOutEvent = this.timeOutEvents.find(function(e){
        return e.date == thisDate
    })
    return (timeOutEvent.hour - timeInEvent.hour)/ 100
}

function wagesEarnedOnDate(thisDate){
    return hoursWorkedOnDate.call(this, thisDate) * this.payPerHour
}

let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(array){
    let totalPayroll = array.reduce(function(total, e){
        return total + allWagesFor.call(e)
    }, 0)
    return totalPayroll;
}

function findEmployeeByFirstName(array, name){
    return array.find(function(e){
        return e.firstName == name
    })
}