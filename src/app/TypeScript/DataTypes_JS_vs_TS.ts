// What is JavaScript ?

// JavaScript (also known as ECMAScript) started its life as a simple scripting language for browsers. 

// You can’t learn TypeScript without learning JavaScript! TypeScript shares syntax and runtime behavior with JavaScript, so anything you learn about JavaScript is helping you learn TypeScript at the same time.

// JavaScript is a dynamically typed language, which means you don't need to declare the data type of a variable explicitly. Instead, JavaScript determines the data type dynamically at runtime. Here are the fundamental data types in JavaScript:
// Primitive Data Types: These are the basic building blocks of data in JavaScript.
// Number: Represents both integer and floating-point numbers.
// String: Represents a sequence of characters enclosed in single or double quotes.
// Boolean: Represents a true or false value.
// Undefined: Represents a variable that has been declared but not assigned a value.
// Null: Represents an intentional absence of any object value.
// Symbol (ES6): Represents a unique and immutable value used as object property keys.
// BigInt (ES11): Represents arbitrary precision integers.
// Composite Data Types: These are more complex data types that can hold multiple values or references to other values.
// Object: Represents a collection of key-value pairs, where keys are strings (or Symbols) and values can be of any data type, including other objects, functions, and primitive types.
// Array: A special type of object used to store a list of values. Arrays are ordered and indexed using non-negative integers.
// Function: A first-class object that can be assigned to variables, passed as arguments, and returned from other functions. Functions can have properties and methods.
// Special Data Types: These data types are used for special purposes in JavaScript.
// NaN (Not-a-Number): Represents a value that is not a valid number.
// Infinity: Represents positive and negative infinity values, typically resulting from mathematical operations.
// -Infinity: Represents negative infinity.
// Primitive Wrappers: JavaScript provides wrapper objects (e.g., Number, String, Boolean) that allow you to work with primitive values as objects when necessary. These wrappers provide methods and properties for manipulating primitive values.
// Here are some examples of these data types:


// TypeScript, a statically typed superset of JavaScript, introduces type annotations to JavaScript, allowing you to specify data types for variables, function parameters, and return values. TypeScript includes various data types, and these type annotations provide a way to define the expected data type for variables and functions. Here are some common data types in TypeScript:
// Basic Data Types: TypeScript provides several basic data types similar to JavaScript, including:
// number: Represents numeric values, including integers and floating-point numbers.
// string: Represents a sequence of characters.
// boolean: Represents true or false values.
// null: Represents an intentional absence of any object value.
// undefined: Represents a variable that has been declared but not assigned a value.
// symbol: Represents unique and immutable values (introduced in ES6).
// bigint: Represents arbitrary precision integers (introduced in TypeScript 4.0).
// Array Types: TypeScript allows you to specify arrays with a specific element type.
// Array<T>: Represents an array of elements of type T. For example, number[] represents an array of numbers.
// TypeScript, a statically typed superset of JavaScript, introduces type annotations to JavaScript, allowing you to specify data types for variables, function parameters, and return values. TypeScript includes various data types, and these type annotations provide a way to define the expected data type for variables and functions. Here are some common data types in TypeScript:
// Basic Data Types: TypeScript provides several basic data types similar to JavaScript, including:
// number: Represents numeric values, including integers and floating-point numbers.
// string: Represents a sequence of characters.
// boolean: Represents true or false values.
// null: Represents an intentional absence of any object value.
// undefined: Represents a variable that has been declared but not assigned a value.
// symbol: Represents unique and immutable values (introduced in ES6).
// bigint: Represents arbitrary precision integers (introduced in TypeScript 4.0).
// Array Types: TypeScript allows you to specify arrays with a specific element type.
// Array<T>: Represents an array of elements of type T. For example, number[] represents an array of numbers.
// Object Type: TypeScript allows you to specify the shape or structure of an object using an object type.
// typescript



// Function Types: TypeScript allows you to specify function types, including parameter types and return types.
// typescript
// let add: (x: number, y: number) => number = (x, y) => x + y;

// Tuple Types: A tuple is an ordered list of elements with fixed-length, and TypeScript allows you to specify tuple types.
// typescript
// let coordinates: [number, number] = [10, 20];

// Enum Type: Enums allow you to define a set of named numeric constants.
// typescript


// Union and Intersection Types: TypeScript supports union types (|) and intersection types (&) to work with multiple data types.
// typescript
// let mixedValue: number | string = 42; // mixedValue can be a number or a string
// let combined: number & string; // combined must be both a number and a string

// Type Aliases and Interfaces: You can define your own custom data types using type aliases and interfaces.
// typescript


// Introduction to TypeScript

// TypeScript offers all of JavaScript’s features, and an additional layer on top of these: TypeScript’s type system.
// For example, JavaScript provides language primitives like string and number, but it doesn’t check that you’ve consistently assigned these. TypeScript does.
// This means that your existing working JavaScript code is also TypeScript code. The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.


// In TypeScript, primitive types are the most basic data types that represent simple values. TypeScript has several primitive types, and type inference is a feature that allows TypeScript to automatically infer the data type of a variable based on its initial value. Here are some common primitive types in TypeScript and how type inference works:

// let num: number = 42; // Explicit type annotation
// let inferredNum = 42; // Type inference, num is also of type number

// Type inference allows TypeScript to determine the most appropriate data type for a variable based on its initialization. 
// You don't always need to explicitly specify types when TypeScript can infer them correctly. 
// This improves code readability and reduces the potential for type-related errors.

// Type Inference for Object Types: TypeScript can infer object types based on the initial values assigned to objects.

// let personInferred = {
//     name: "Charlie",
//     age: 35,
// };
// TypeScript infers the type { name: string; age: number }

// let point = { x: 10, y: 20 }; 
// TypeScript infers the type { x: number; y: number }

// In TypeScript, intersection types allow you to combine multiple types into a single type. 
// This means that a value of an intersection type must satisfy all the types it combines. Intersection types are denoted by the & operator.


// In TypeScript, you can use type guards to differentiate between different types of values at runtime. 
// Type guards are functions or expressions that help TypeScript narrow down the type of a variable within a specific block of code. 
// They are particularly useful when working with union types or when you want to perform type-specific operations on a variable.
// Here are some common ways to create type guards and differentiate types in TypeScript:
// typeof Type Guards: You can use the typeof operator to check the type of a variable at runtime. 

// For example:
// instanceof Type Guards: When dealing with classes and objects, you can use the instanceof operator to check if an object is an instance of a specific class 
// or constructor function:

// Custom Type Guards: You can create custom type guards as functions that return a type predicate. 
// A type predicate is a function that narrows down the type of a variable using the is keyword:

// Type Assertion: You can use type assertion (also known as type casting) to tell TypeScript the type of a variable when you are confident about it.
// However, be cautious when using type assertion, as it may lead to runtime errors if the assertion is incorrect:
// let someValue: any = "Hello, TypeScript!";
// let strLength: number = (someValue as string).length;