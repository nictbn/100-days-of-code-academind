let age = 32;
let userName = "Max";
let hobbies = ["Sports", "Cooking", "Reading"];
let job = {
    title: "Developer",
    place: "New York",
    salary: 50000
};

let adultYears = calculateAdultYears(age);
console.log(adultYears);
age = 45;

adultYears = calculateAdultYears(age);
console.log(adultYears);

let person = {
    name: "Max",
    greet() {
        console.log("Hello");
    }
}

person.greet();

function calculateAdultYears(age) {
    return age - 18;
}