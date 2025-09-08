// Functions are blocks of code that can be executed repeatably through the program

function name() {
    //code to be executed
    return "John Doe";
};

// Parameters can be passed to functions and used inside the block of code.

function fullname(first, last) {
    return first + " " + last;
};


//console.log(name());
//console.log(fullname("Agent", "Smith"));

//when executing, js will search for function when called, even if it is defined AFTER the call

let x = sum(1, 2);
//console.log(x);

function sum(a, b) {
    return a + b;
};

//Arrow functions

let diff = (a, b) => a - b;
let y = diff(2, 1);

//console.log(y);
//console.log(x + y);

hello = function(){
    return "Hello";
};

goodbye = () => "Goodbye";

console.log(hello());
console.log(goodbye());
console.log(hello());
console.log(goodbye());
console.log("\n");
console.log(hello());
console.log(goodbye());
console.log("\n");

// Calling functions in other functions

lyrics = function(h, g) {
    console.log("I don't know why you say " + g + ", I say " + h + ".");
}

// Passing functions as parameters to other functions

lyrics(hello(), goodbye());

