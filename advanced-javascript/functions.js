function greetUser(greetingPrefix, username = 'User') {
    // console.log( greetingPrefix + ' ' + username + '!');
    console.log(`${greetingPrefix} ${username}!`);
}

greetUser('Hi', 'Max');
greetUser('Hello');

function sumUp(...numbers) {
    let result = 0;
    for (const number of numbers) {
        result += number;
    }
    return result;
}

console.log(sumUp(1, 5, 10, 11, 20, 31));

const inputNumbers = [1, 5, 10, 11, 20, 31];
console.log(sumUp(...inputNumbers));

sumUp.someProperty = 'what what?';
console.log(sumUp);