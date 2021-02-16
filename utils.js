// 1. Sortowanie na różne sposoby
var _ = require('lodash');

function sortNumbers(array) {
    let sortedArray = array.sort((function(a, b){return a - b}));
    return sortedArray;
}

function sortByAge(array) {
    let sortedUsers = _.sortBy(array,['age']);
    return sortedUsers;
}

function sortBySalary(array) {
    let sortedUsers = _.sortBy(array,['salary']);
    return sortedUsers;
}

// 3. Rzut kostką
// Napisz funkcję, która:
// - rzuca jedną kostką - sprawdzanie, czy wyrzuca liczbę mniejszą lub równą 6 i większą od 1
// - rzuca dwiema kostkami - sprawdzanie, czy wyrzuca liczbę mniejszą lub równą 12 i większą od 2
// - rzuca jedną kostką dopóki nie wyrzuci 6 - sprawdzenie, czy to się kiedykolwiek skończy
// rzuca jedną kostką 20 razy i sumuje liczbę - sprawdzenie, czy suma jest pomiędzy 20 a 120


module.exports = { sortNumbers, sortByAge, sortBySalary }