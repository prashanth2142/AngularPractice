var TypesExample = /** @class */ (function () {
    function TypesExample() {
        this.num = 42; // Number
        this.str = "Hello, World!"; // String
        this.isActive = true; // Boolean
        this.nullVar = null; // Null
        this.sym = Symbol("unique"); // Symbol
        //bigInt: bigint = 1234567890123456789012345678901234567890n; // BigInt
        this.person = {
            name: "John",
            age: 30,
        }; // Object
        this.numbers = [1, 2, 3, 4, 5]; // Array
    }
    TypesExample.prototype.greet = function () {
        console.log("Hello!");
    }; // Function
    return TypesExample;
}());
var myPet = {
    name: "Buddy",
    breed: "Golden Retriever",
    wingspan: 30,
};
var Dog1 = /** @class */ (function () {
    function Dog1() {
    }
    Dog1.prototype.bark = function () {
        console.log("Woof!");
    };
    return Dog1;
}());
var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat.prototype.meow = function () {
        console.log("Meow!");
    };
    return Cat;
}());
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var myColor = Color.Red;
var person = { name: "Alice", age: 30 };
function logValue(input) {
    if (typeof input === "string") {
        console.log("Input is a string:", input.toUpperCase());
    }
    else {
        console.log("Input is a number:", input.toFixed(2));
    }
}
function animalSound(animal) {
    if (animal instanceof Dog1) {
        animal.bark();
    }
    else {
        //animal.meow();
    }
}
function isString(value) {
    return typeof value === "string";
}
function processValue(input) {
    if (isString(input)) {
        console.log("Input is a string:", input.toUpperCase());
    }
    else {
        console.log("Input is a number:", input.toFixed(2));
    }
}
