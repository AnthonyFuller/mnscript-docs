---
title: Language Syntax
description: The basic syntax of MNScript.
next: false
---

:::warning Work in Progress
This page is a work in progress. Please excuse any unfinished sections or errors.
:::

# Language Syntax

MNScript's syntax is a hybrid of C# and Lua. If you know either of these languages, MNScript may look slightly familiar.

We will now go over various basic constructs and how they work in MNScript with provided examples. More advanced constructs will be covered in a future section.

Here are some basic syntax rules:
- All one-line statements (declaring variables, assigning variables, calling functions, etc) must *end* with a semicolon `;`.
- Comments are designated by `//` they are used to document your code. Anything after them on the same line will be ignored by the compiler.
- Pairs of curly braces `{}` are used to define blocks of code, used in if statements, while loops, functions, etc.

## Types

MNScript is a **typed** language, this means that variables and function arguments must have a type associated with them.
Once declared, these types cannot be changed.

Something being typed means that type, and only that type, can be assigned to that variable or function arguments.

MNScript has three "primitive" data types which all other data types work with.

{#primitives}
| Variable Type 	| Description                                 	| Default Value                     	|
|---------------	|---------------------------------------------	|-----------------------------------	|
| `number`      	| Holds a numeric value.                      	| `0`                               	|
| `string`      	| Holds text, or a "string" of characters.    	| An empty block of text (aka `""`) 	|
| `bool`        	| Holds either the value of `true` or `false` 	| `false`                           	|

### Any Type
The `any` type is exactly what it says on the tin, it accepts any type. You cannot use this in user scripts, and it will only be seen used in built-in libraries.

It's a "[bodge](https://en.wiktionary.org/wiki/bodge)" due to MNScript not having generics. It's most notably found in `Util.ToString` and the `Array` library.

All other types are **classes** either exposed through built-in libraries or user-generated files (more on this later).

## Arrays

MNScript supports *static* arrays (meaning their size is defined when they're created). The notation for there are a type and then a `[]`, some examples can be seen in the section below.

Indexing arrays is also done by using `variableName[i]` where `i` is the position of the element you want. **In MNScript, array indexes start from 1.**

## Variables

Variables are in pretty much every programming language, they allow you to store values and are the bread and butter of any non-trivial program you'll ever make (whether that be using MNScript or otherwise). Variables can hold any type of data as previously discussed.

You declare variables with a name, this name can be used later in your program to use the value of the variable.

Variables can also be set to a different value (with the same type) compared to when they were declared. You will see this used later in this page.

Now let's use the primitive data types shown above to declare some variables:
| Variable Type 	| Example                             	|
|---------------	|-------------------------------------	|
| `number`      	| `number half = 0.5;`                	|
| `string`      	| `string myName = "Anthony Fuller";` 	|
| `bool`        	| `bool isCool = true;`               	|

Now for some arrays:
| Variable                                                 	| Description                                                                       	| Indexing                	|
|----------------------------------------------------------	|-----------------------------------------------------------------------------------	|-------------------------	|
| `number[] fibonacci = [0, 1, 1, 2, 3];`                  	| Creates a number array of size 5, filled with the first 5 fibonacci numbers.      	| `fibonacci[1]` is `0`   	|
| `string[] names = ["Ventz", "Hydro", "Anthony Fuller"];` 	| Creates a string array of size 3, filled with 3 random names.                     	| `names[1]` is `"Ventz"` 	|
| `string[] empty = [];`                                   	| Creates a string array of size 0, it is empty, and no elements can be added to it. 	| N/A                     	|
| `number[] scores = new number[10];`                       | Creates a number array of size 10, it is empty, but 10 elements can be entered.      	| `number[1] = 5;`        	|

*Although only primitive types were used here, you can also make arrays of classes.*

## Operators

The table below contains most operators available in MNScript. These operators will be the basis of any large program, so you should learn how to use these properly.

| Operator 	| Description                                                                                            	| Operates On 	| Example                      	| Expected Result        	|
|----------	|--------------------------------------------------------------------------------------------------------	|-------------	|------------------------------	|------------------------	|
| `+`      	| Adds two numbers together.                                                                             	| `number`    	| `10 + 5`                     	| `15`                   	|
| `-`      	| Subtracts the number on the right from the number on the left.                                         	| `number`    	| `15 - 3`                     	| `12`                   	|
| `*`      	| Multiplies two numbers together.                                                                       	| `number`    	| `3 * 4`                      	| `12`                   	|
| `/`      	| Divides the number on the left by the number on the right.                                             	| `number`    	| `15 / 3`                     	| `5`                    	|
| `%`      	| Gets the remainder value when the number on the left is divided by the number on the right.            	| `number`    	| `11 % 3`                     	| `2`                    	|
| `^`      	| Raises the number on the left to the power on the right.                                               	| `number`    	| `3 ^ 4`                      	| `81` (`3 * 3 * 3 * 3`) 	|
| `>`      	| Determines whether the number on the left is greater than the number on the right.                     	| `number`    	| `5 > 3`                      	| `true`                 	|
| `<`      	| Determines whether the number on the left is less than the number on the right.                        	| `number`    	| `3 < 2`                      	| `false`                	|
| `<=`     	| Determines whether the number on the left is greater than or equal to the number on the right.         	| `number`    	| `4 <= 4`                     	| `true`                 	|
| `>=`     	| Determines whether the number on the left is less than or equal to the number on the right.            	| `number`    	| `5 >= 10`                    	| `false`                	|
| `&&`     	| Results in the end value being true if the value on the left and right are both true, false otherwise. 	| `bool`      	| `true && false`              	| `false`                	|
| `\|\|`   	| Results in the end value being true if either value on the left or right is true, false otherwise.     	| `bool`      	| `true \|\| false`            	| `true`                 	|
| `==`     	| Determines whether the value on the left is equal to the value on the right.                           	| anything    	| `"hello" == "hi"`            	| `false`                	|
| `..`     	| Joins two values together, creating a new string from the values.                                      	| anything    	| `5.."Hello World"..true..10` 	| `"5Hello Worldtrue10"` 	|

## If Statements

If statements are a way to manage the control flow of your program using logic, separating your code into different branches. To do this, you can use the comparison operators shown above (`<`, `>`, `<=`, `>=`, `&&`, `\|\|`, and `==`).

If statements require a condition, and an else statement can be used if the condition fails. If statements can also be chained together with if else.

Below are a few code examples of how these work, alongside a brief plain English explanation:

**Example 1**: You are managing a nightclub, and you must be 21 or over to enter.
```mnscript
number age = 20;
if (age < 21) {
    // Person is under 21.
} else {
    // Person is 21 or over.
}
```

**Example 2**: A user has put in a yes or no response, this needs to be checked.
```mnscript
string input = ...; // Assume this has been filled with a user response.
if (input == "yes") {
    // User has responded with yes.
} else if (input == "no") {
    // User has responded with no.
} else {
    // User has provided an invalid response.
}
```

**Example 3**: A user has input a number, you must check that this number is between 1 and 10 (inclusive).
```mnscript
number input = ...; // Assume this has been filled with a user input.
if (1 <= input && input <= 10) {
    // Number is between 1 and 10 (inclusive).
} else {
    // Number is not in the required range.
}
```

## Functions

Functions, like if statements, allow you to manage the control flow of your program. They are very useful for reusing snippets of code or organizing your program.

Functions can take arguments and even return values. Functions can be as complex or as simple as you make them.

They can be called using the name and a pair of brackets (containing arguments if the function has them), but only *after* they have been defined.

Below are a few code examples of how these work:

**Example 1**: A function which takes 2 arguments and multiplies them together.
```mnscript
function<number> multiply(number a, number b) {
    return a * b;
}

multiply(5, 2); // This would return 10.
```

As this is the first example, let's go through the code:
- `function` is a keyword, this lets the compiler know we are defining a function.
- `<number>` is the return type, it must be after the word `function` without a space.
    - This could be any type we want to return, it must be contained within the angle brackets `<>`.
- `multiply` is the name of the function we use to call it.
- `number a` is the first argument, it is defined like a variable without any declaration. We can use `a` in the function block to reference this.
- `number b` is the second argument. We can use `b` in the function block to reference this.
    - Both of these arguments are within brackets, these are required to be after the function name without a space.
- `{` designates that the code following this will be executed when the function is called.
- `return` is a keyword which will stop the code after it from running (if applicable), and will return a value (if supplied). This must be the same type as the return type.
- `a * b` multiplies the two numbers together.
- `}` designates that the function's code has ended.
- We then call the function with `5` and `2` as the arguments.

Return values of functions can also be set as variables, and variables (of the same type) can be used as arguments.

You can see this below, using the same `multiply` function from above.
```mnscript
number result = multiply(2, 2);
// result is now 4.
result = multiply(result, 5);
// We used the current value of result (4) as the first argument.
// result is now 20.
```

You should notice that when we multiply the current result by 5 and set that as the value of the variable, we did not specify the type of result again.
That is because we are *assigning* a value of result instead of declaring the variable.

**Example 2**: Take the range check from above, do nothing if it is out of range, else output it.
```mnscript
function rangeCheck(number input, number min, number max) {
    // We have done the inverse of the range check above
    // to showcase using return without a return type.
    if (max < input || input < min) {
        // It is out of range, stop the function from continuing.
        return;
    }

    // Code to output it would go here.
}

rangeCheck(6, 1, 10); // This would output 6.
rangeCheck(15, 1, 10); // This would do nothing as it is out of range.
```

Note that this function does not have a return type, so we don't actually return anything. We use the `return` keyword, to stop the function from progressing further.

**Example 3**: Take two numbers and subtract the first from the second, return false if it is negative, true if it is positive or 0.
```mnscript
function<bool> isPositive(number a, number b) {
    number result = b - a;
    if (result < 0) {
        return false;
    }

    return true;
}

isPositive(5, 10); // This would return true.
isPositive(10, 5); // This would return false.
```

## Libraries

In MNScript you interact with the game world using libraries. Libraries are composed of functions, classes, and events.

You can think of a library function as a machine in a factory:
- Each machine has certain inputs that it requires in order to properly perform its job.
- Each machine will perform a specific task using the materials that you give it.
- You don't need to understand every last detail about a machine to operate it; you can use them without really understanding how they work internally.
- Different machines do different things, but all the machines in a single factory are for a single purpose (all the machines in a Coca-Cola factory will be there to help manufacture new drinks).

Each of the points listed above regarding machines can be applied to library functions in MNScript; and below is a brief image showing the `ToNumber` function from the `Util` library.

Library functions can be called the same way as normal functions as [shown above](#functions).

In this image, the library function is the black box in the centre, the input is the arrow pointing into the box and the output is the arrow pointing away from the box.
In this example, you can see that we give the function the string `"312.25"` and that it outputs the number `312.25`.

Please note that the input is surrounded by speech marks and that the output isn't; this is intentional, and it's because the input is a string (text) value,
whereas the output is a number value that we can treat like an actual number and perform calculations on.

![Factory showing the string `"312.25"` going in to `Util.ToNumber` and the number `312.25` coming out.](/images/fundamentals/tonumber_factory.png)

You can see how the `Util.ToNumber` function is defined in the docs [here](/libraries/Util/ToNumber).

To use a library in code, you must have a `using` statement before using said library (we call this *importing* the library). For example, to use the `Util.ToNumber` function, you must have `using Util;`
somewhere before that function call. It is recommended that you place all your `using` statements at the top of your program before any code.
This ensures your imports are nicely organized, and you can use those libraries anywhere in the code that follows.

**Example**:  
Your client, VBank, has contacted you and has asked you to develop an application for them. They need an application that will allow their staff to easily calculate compound interest so that
their bank tellers can provide a more streamlined service. You should design an application that will allow the user to enter three numbers: their starting bank balance, yearly interest rate
as well as the number of years that interest needs to be calculated for. This application must allow bank tellers to enter the numbers, and therefore hard-coding values into a program is not an option.

Let's look at this specification, and break down what our program needs to do:
1. We should prompt the bank teller to enter the starting bank balance
2. We should then read the starting bank balance into the application
3. We should then ask the bank teller to enter the account's interest rate, and then read it into the application
4. To retrieve the last of the data that we need to work with, we should prompt the teller to enter the number of years that we should calculate compound interest for
5. Apply the formula `(starting_balance * (interest_rate ^ years))` to calculate the resulting bank balance (^ = to the power of)
6. We should inform the bank teller of the final bank balance

In order to complete this task, we'll need to use two libraries:

- `Console` - The console library will be used to write prompts out to the user, and to read the text that the user enters
- `Util` - The util library will be needed so that we can convert string inputs into numbers so that we can perform maths on the numbers entered
```mnscript
// Let the program know that we will need the Console and Util libraries
using Console;
using Util;

// Get the starting bank balance
Console.WriteLine("Please enter the starting bank balance");
string startingBalanceInput = Console.ReadLine();

// Get the account's interest rate
Console.WriteLine("Please enter the account's interest rate");
string interestRateInput = Console.ReadLine();

// Get the number of years
Console.WriteLine("Please enter the number of years to calculate interest over");
string yearsInput = Console.ReadLine();

// Convert the strings provided into numbers that we can use
number startingBalance = Util.ToNumber(startingBalanceInput);
number interestRate = Util.ToNumber(interestRateInput);
number years = Util.ToNumber(yearsInput);

// Calculate the final balance
number finalBalance = startingBalance * ((1 + interestRate) ^ years);

// Tell the user what the final balance is
Console.WriteLine("The final account balance is: "..finalBalance);
```
