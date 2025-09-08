// Arrays are lists of values
const colors = ["red", "yellow", "blue"]

console.log(colors);

// Arrays that are declared as const cannot be changed to a different value/array
// colors = ["purple", "orange", "green"]; //will cause a TypeError: Assignment to constant variable.
// colors = 3;  //will also cause a TypeError
// values in the array list CAN be updated

colors[0] = "purple";
console.log(colors);

//There are multiple built in functions and properties of arrays, such as:
// length a property that holds the total number of elements in the array
console.log(colors.length);

//toString() returns the array in string format
console.log(colors.toString());

//join(separator) returns a string of all elements in the array separated by the given separator
//not: this does not add a separator to the end of the array
console.log(colors.join("; "));

// push(val) add one or more elements to the end of the array
colors.push("orange");
console.log(colors);

// pop() removes last element from the array
colors.pop();
console.log(colors);

// shift() removes the first element in the array
colors.shift();
console.log(colors);

// unshift(var) adds one or more elements to the begining of an array
colors.unshift("green");
console.log(colors);

// sort() sorts the array in place
colors.sort();
console.log(colors);

// reverse() reverses the array in place
colors.reverse();
console.log(colors);

// at(index) returns the value at a given index
console.log(colors);
console.log(colors.at(1));

//indexOf(val) returns the index of the first occurance of the given value
console.log(colors.indexOf("blue"));

// includes(val) returns true/false if given value is in array
console.log(colors.includes("blue"));
console.log(colors.includes("red"));

// splice(start, deleteCount, ...itemsToAdd) modifies the original array and returns an array containing the removed elements.
colors.push("red", "orange", "purple");
console.log(colors);

const removedColors = colors.splice(2, 3, "pink", "white", "black");

console.log(colors);
console.log(removedColors);