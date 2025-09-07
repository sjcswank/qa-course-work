// Functions are blocks of code that can be executed repeatably through the program

function name() {
    //code to be executed
    return "John Doe";
};

// Parameters can be passed to functions and used inside the block of code.

function fullname(first, last) {
    return first + " " + last;
};

console.log(name());
console.log(fullname("Agent", "Smith"));

function sum(a, b) {
    return a + b;
};

console.log(sum(1, 2));
