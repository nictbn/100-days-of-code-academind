const hobbies = ['Sports', 'Cooking'];
hobbies.push('Reading');
// hobbies = ['Coding', 'Sleeping']; // not allowed!
console.log(hobbies);

const person = {age: 32};

function getAdultYears(p) {
    p.age -= 18;
    return p.age;
    // return p.age - 18;
}

// console.log(getAdultYears(person));
console.log(getAdultYears({ ...person }));
console.log(person);