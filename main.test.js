var utils = require('./utils.js');

let MOCKED_USERS = [
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

test('Expect that sortNumbers sort numbers in ascending order', async () => {
    let arrayToBeSorted = [4,3,2,1];
    let sortedArray = utils.sortNumbers(arrayToBeSorted);
    let expectedArray = [1,2,3,4];

    expect.arrayContaining(sortedArray, expectedArray);
    expect(sortedArray[0]).toBe(expectedArray[0]);
    expect(sortedArray[sortedArray.length-1]).toBe(expectedArray[expectedArray.length-1]);
});

test('Expect that user will be sorted according to their age', async () => {
    let expectedSortedUsers = [
        { name: 'Wojtek', age: 20, salary: 5000 },
        { name: 'Kamil', age: 25, salary: 2500 },
        { name: 'Ania', age: 50, salary: 1000 }
      ]
      let sortedUsers = utils.sortByAge(MOCKED_USERS);
      expect.arrayContaining(sortedUsers, expectedSortedUsers);
      expect(sortedUsers[0]).toMatchObject(expectedSortedUsers[0]);
      expect(sortedUsers[sortedUsers.length-1]).toMatchObject(expectedSortedUsers[expectedSortedUsers.length-1]);
});

test('Expect that user will be sorted according to their salary', async () => {
    let expectedSortedUsers = [
        { name: 'Ania', age: 50, salary: 1000 },
        { name: 'Kamil', age: 25, salary: 2500 },
        { name: 'Wojtek', age: 20, salary: 5000 }
      ]
      let sortedUsers = utils.sortBySalary(MOCKED_USERS);
      expect.arrayContaining(sortedUsers, expectedSortedUsers);
      expect(sortedUsers[0]).toMatchObject(expectedSortedUsers[0]);
      expect(sortedUsers[sortedUsers.length-1]).toMatchObject(expectedSortedUsers[expectedSortedUsers.length-1]);
});


