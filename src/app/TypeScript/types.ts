class TypesExample {
    num: number = 42; // Number
    str: string = "Hello, World!"; // String
    isActive: boolean = true; // Boolean
    undefVar: undefined; // Undefined
    nullVar: null = null; // Null
    sym: symbol = Symbol("unique"); // Symbol
    bigInt: bigint = 1234567890123456789012345678901234567890n; // BigInt

    person: { name: string; age: number } = {
        name: "John",
        age: 30,
    }; // Object

    numbers: number[] = [1, 2, 3, 4, 5]; // Array

    greet(): void {
        console.log("Hello!");
    } // Function



}


type Point = { x: number; y: number };
interface Person {
    name: string;
    age: number;
}


type Dog = {
    name: string;
    breed: string;
};

type Bird = {
    name: string;
    wingspan: number;
};

// Intersection type combining properties from both Dog and Bird types
type Pet = Dog & Bird;

const myPet: Pet = {
    name: "Buddy",
    breed: "Golden Retriever",
    wingspan: 30,
};

class Dog1 {
    bark() {
        console.log("Woof!");
    }
}

class Cat {
    meow() {
        console.log("Meow!");
    }
}



enum Color {
    Red,
    Green,
    Blue
}
let myColor: Color = Color.Red;

let person: { name: string; age: number } = { name: "Alice", age: 30 };

function logValue(input: string | number): void {
    if (typeof input === "string") {
        console.log("Input is a string:", input.toUpperCase());
    } else {
        console.log("Input is a number:", input.toFixed(2));
    }
}



function animalSound(animal: Dog | Cat) {
    if (animal instanceof Dog1) {
        animal.bark();
    } else {
        //animal.meow();
    }
}


function isString(value: any): value is string {
    return typeof value === "string";
}

function processValue(input: string | number) {
    if (isString(input)) {
        console.log("Input is a string:", input.toUpperCase());
    } else {
        console.log("Input is a number:", input.toFixed(2));
    }
}


