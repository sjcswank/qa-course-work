const { expect } = require('chai');
const { add, multiply, subtract, devide } = require('../calc');

describe('The add function', () => {
    it('should add two numbers together', () => {
        expect(add(2, 3)).to.equal(5);
    });

    it('should return a negative number when the larger number is negative', () => {
        expect(add(3,-5)).to.equal(-2);
    });
});

describe('The multiply function', () => {
    it('should multiply two numbers', () => {
        expect(multiply(2, 3)).to.equal(6);
    });
    it('should return a negative number when one number is negative', () => {
        expect(multiply(-2, 3)).to.equal(-6);
    });
    it('should return a positive number when both numbers are negative', () => {
        expect(multiply(-2, -3)).to.equal(6);
    });
});

describe('The subtract function', () => {
    it('should subtract two numbers', () => {
        expect(subtract(3, 2)).to.equal(1);
    });
    it('should return a negative number when the second number is larger', () => {
        expect(subtract(2, 3)).to.equal(-1);
    });
});

describe('The devide function', () => {
    it('should devide two numbers', () => {
        expect(devide(4, 2)).to.equal(2);
    });
    it('should return infinity when the second number is 0', () => {
        expect(devide(5, 0)).to.equal(Number.POSITIVE_INFINITY);
    });
});