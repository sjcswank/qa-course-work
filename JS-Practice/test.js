// let variables are block-scoped variables and can only be accessed within the block they are declared in
let x = 3;

{
    let x = 2;
    console.log(x);
}

console.log(x);

// var variables are globally-scoped, accessable anywhere in the finction or program in which they were declared.
{
    var y = 1;
    console.log(y);
}

console.log(y);

// const variables are immutable, cannot be changed, and are also block-scoped
const z = 10;

{
    const z = 5;
    console.log(z);
    //z = 7; // this line will create a TypeError: Assignment to constant variable.
}

console.log(z);