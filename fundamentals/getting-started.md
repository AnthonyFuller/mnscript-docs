---
title: Getting Started
description: Getting started with MNScript.
---

# Getting Started

Getting started with MNScript is easy. The fundamentals series assumes you have decent knowledge about Maxnet.

In MNScript there are two types of files, their names and differences can be seen in the table below:

{#filetype-table}
| Maxnet Script (**.msc**)                                                                                           	| Maxnet Script eXecutable (**.mscx**)                                               	|
|--------------------------------------------------------------------------------------------------------------------	|------------------------------------------------------------------------------------	|
| Contains the program's source code.                                                                                	| Contains a compiled version of the program, but does not contain it's source code. 	|
| You can make edits to the program by editing the source code.                                                      	| You can't edit the program at all.                                                 	|
| You need to compile the program before it can be run, increasing the amount of time required to start the program. 	| The program is already compiled, meaning that it can be started faster.            	|
| Can not have a desktop icon.                                                                                       	| Can have desktop icons so the program can be more easily launched.                 	|
| Requires use of the command `mnscript cexec <file name>.msc` to run.                                              	| Requires use of the command `mnscript exec <file name>.mscx` to run.              	|
| Suitable for developers.                                                                                           	| Suitable for non-developers who just want to run the program.                      	|

There exact differences aren't required at this point of the fundamentals' series.

All you need to know right now is for making programs you need to create a `.msc` file.

To create a `.msc` file go to any directory you want and run `file create <name>.msc`. 
After that, open it by running `file open <name>.msc` which will open the MNScript editor with some default code (shown below):

```mnscript
using System;
using Console;

// New console Application

Console.WriteLine("Hello World!");
```
Don't worry if you're not sure what any of this means, you'll learn more about that in [the next section](/fundamentals/syntax).
