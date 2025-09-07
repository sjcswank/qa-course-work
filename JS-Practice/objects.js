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

console.log(person["firstname"]);
console.log(person.lastname);

console.log(person.fullname());