---
outline: deep
---

# Home

This website acts as an unofficial documentation website for CivilNetworks' MNScript programming language.

:::warning WIP
This website is a work in progress!
:::

Here is some MNScript code for now:
```msc
using Application;
using Console;
using System;

// Requests admin privileges from the user.

StringResult result = Application.RequestAdminPrivilege();

if(result.GetResult() == true){
    Console.WriteLine("Admin Privileges granted.");
} else {
    // If the request was denied, the reason will be contained
    // in the result's string.

    string reason = result.GetString();
    Console.WriteLine("Admin Privileges denied: "..reason);
}
```

## Notices

This website is in no way affiliated with CivilNetworks.
