---
title: Language Syntax
desc: The syntax of MNScript.
next: false
---

:::warning Work in Progress
This page is a work in progress. Please excuse any unfinished sections or errors.
:::

# Language Syntax

MNScript's syntax is a hybrid of C# and Lua. If you know either of these languages, MNScript may look slightly familiar.

We will now go over various constructs and how they work in MNScript with provided examples.

Here are some basic syntax rules:
- All one-line statements (declaring variables, assigning variables, calling functions) must *end* with a semicolon `;`.

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

All other types are **classes** either exposed through built-in libraries or user-generated files (more on this later).

## Arrays

MNScript supports *static* arrays (meaning their size is defined when they're created). The notation for there are a type and then a `[]`, some examples can be seen in the section below.

Indexing arrays is also done by using `variableName[i]` where `i` is the position of the element you want. **In MNScript, array indexes start from 1.**

## Variables

Variables are in pretty much every programming language, they allow you to store values and are the bread and butter of any non-trivial program you'll ever make (whether that be using MNScript or otherwise). Variables can hold any type of data as previously discussed.

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
