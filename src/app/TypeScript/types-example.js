var TypesExample1 = /** @class */ (function () {
    function TypesExample1() {
        this.num = 42; // Number
        this.str = "Hello, World!"; // String
        this.isActive = true; // Boolean
        this.undefVar = undefined; // Undefined
        this.nullVar = null; // Null
        this.sym = Symbol("unique"); // Symbol
        //this.bigInt = 1234567890123456789012345678901234567890n; // BigInt
        this.person = {
            name: "John",
            age: 30,
        }; // Object
        this.numbers = [1, 2, 3, 4, 5]; // Array
    }
    TypesExample1.prototype.greet = function () {
        console.log("Hello!");
    }; // Function
    return TypesExample1;
}());
// Create an instance of the TypesExample class
var example = new TypesExample1();
// Access and print the values
console.log("num:", example.num);
console.log("str:", example.str);
console.log("isActive:", example.isActive);
console.log("undefVar:", example.undefVar);
console.log("nullVar:", example.nullVar);
console.log("sym:", example.sym);
console.log("bigInt:", example.bigInt);
console.log("person:", example.person);
console.log("numbers:", example.numbers);
// Call the greet function
example.greet();
