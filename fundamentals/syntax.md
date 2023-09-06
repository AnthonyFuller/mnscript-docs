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

Arrays are also supported in MNScript, the type for these can be `any[]` where `any` is any type, primitive or class.

All other types are **classes** either exposed through built-in libraries or user-generated files (more on this later).

## Variables

Variables are in pretty much every programming language, they allow you to store values and are the bread and butter of any non-trivial program you'll ever make (whether that be using MNScript or otherwise). Variables can hold any type of data as previously discussed.

Now let's use the primitive data types shown above to declare some variables:
| Variable Type 	| Example                             	|
|---------------	|-------------------------------------	|
| `number`      	| `number half = 0.5;`                	|
| `string`      	| `string myName = "Anthony Fuller";` 	|
| `bool`        	| `bool isCool = true;`               	|
