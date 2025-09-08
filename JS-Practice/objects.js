//Objects are variables that contain related property : value pairs and functions

const person ={
    firstname: "John",
    lastname: "Dan",
    age: 50,
    eyecolor: "blue",
    fullname: function() {
        return this.firstname + " " + this.lastname;
    }
};

// Accessing property values 

console.log(person["firstname"]);
console.log(person.lastname);

console.log(person.fullname());

// Updating property values
person["age"] = 51;
person.eyecolor = "green";

console.log(person.age);
console.log(person["eyecolor"]);

// Passing variables as name and value of properties

const propertyName = "age";
let propertyValue = 52;

person[propertyName] = propertyValue;

console.log(person.age);