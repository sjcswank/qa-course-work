// Variables
let a;
a = 5;

a = 5; b = 6; c = 7;

/* Keywords
var d;                  //define a variable
let e;                  //block variable
const word = "word";    //constant
if (c == b) {};         //Conditional Statement
switch ;                //Conditional Statement
for i in word: ;        //initiate a loop
function() {};          //define a repeatable block of code
return;                 //exit a block of code
*/


//Litterals (fixed values) vs Variables (changable values)
//Variables are declared plainly:
g = 10;
h = 10.5;
//Literrals are declared with quotes
j = "a string";

//var let const declare a variable, = assigns a value **note: var should only be used in older codebases, use let instead
let x = 5;
let y = 0;
let z = x + 5;

//Boolean values (true/false)
const isTrue = true;
const isFalse = false;

//Objects encapsulates related property:value pairs
var car = {
    car_type: "Yaris",
    car_model: "2020",
    wheels: 4
}

//Arrays- lists
let colors = ["red", "yellow", "green", "blue"]

//Operators
let sum = 10 + 5; prod = a * b; diff = a - b; quot = b / a; //Arithmetic
let k = 7;
k =+ 5; //k = k + 5;
let isEqual = (sum == 15); isGreater = ( sum >= diff); //Comparison
age = 20;
isStudent = true;
let isAdult = (age > 18) && (isStudent == false); //Logical 