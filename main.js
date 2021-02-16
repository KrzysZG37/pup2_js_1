// 1. Sortowanie na różne sposoby

var utils = require('./utils.js');

let numbers = [5,4,3,2,111,43,32];

let sortedNumbers = utils.sortNumbers(numbers);

console.log("Before:");
console.log(numbers);
console.log("Sorted:");
console.log(sortedNumbers);


let users = [
    {
        name: 'Ania',
        age: 50,
        salary: 1000
    },
    {
        name: 'Wojtek',
        age: 20,
        salary: 5000
    },
    {
        name: 'Kamil',
        age: 25,
        salary: 2500
    }
];

let sortedUsers = utils.sortByAge(users);
console.log('Sorted users by age:');
console.log(sortedUsers);

let sortedUsersBySalary = utils.sortBySalary(users);
console.log('Sorted users by salary:');
console.log(sortedUsersBySalary);