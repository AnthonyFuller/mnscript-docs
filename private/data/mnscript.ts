/**
 * This file gets the current MNScript docs JSON file and modifies it to suit our needs.
 * 
 * Also exposes types for all these for easy usage.
 */

// Recursively sort a MNScriptDocs object alphabetically.
function sortDocs(data: MNScriptDocs): MNScriptDocs {
    const comparitor = (a, b) => a.name.localeCompare(b.name)

    const sorted: MNScriptDocs = {
        events: data.events.sort(comparitor),
        libraries: data.libraries.sort(comparitor)
    }

    sorted.libraries.forEach((value) => {
        value.classes.sort(comparitor)
        value.classes.forEach((value) => {
            value.functions.sort(comparitor)
        })

        value.functions.sort(comparitor)
    })

    return sorted
}

export interface MNScriptFunction {
    name: string
    desc: string
    example?: string
    args: string[]
    argsDesc?: string[]
    returnType?: string
    returnDesc?: string
    argsName?: string[] // Unofficial
}

export interface MNScriptClass {
    name: string
    desc?: string
    functions: MNScriptFunction[]
}

export interface MNScriptLibrary {
    name: string
    desc?: string
    functions: MNScriptFunction[]
    classes: MNScriptClass[]
}

export interface MNScriptDocs {
    events: MNScriptFunction[]
    libraries: MNScriptLibrary[]
}

/**
 * Allows us to look up the page for a given type.
 */
export interface MNScriptTypes {
    [typeName: string]: string
}

export interface MNScriptPage {
    params: {
        title: string
        desc: string
        path: string
        search: string
    }
    content: string
}

/**
 * Contains the libraries' modified docs format.
 */
export interface MNScriptData {
    events: MNScriptPage[]
    libraries: MNScriptPage[]
    types: MNScriptTypes
}

function generateFunctionSignature(data: MNScriptFunction, types: MNScriptTypes, parent?: string, linkFunction = false, isLibrary = true): string {
    let sig = ""

    // Add the return type with link if possible.
    if (data.returnType && data.returnType != "Unknown") {
        const lookup = data.returnType.endsWith("[]") ? data.returnType.slice(0, -2) : data.returnType
        if (lookup in types) {
            sig += `<a href="${types[lookup]}">${data.returnType}</a> `
        } else {
            sig += `${data.returnType} `
        }
    }

    // Add the parent + function name.
    sig += `${parent + "." ?? ""}`
    if (linkFunction) {
        // Link function will only ever be true when it is a class/library page.
        const link = !isLibrary && (parent! in types) ? `${types[parent!]}${data.name}` : `/libraries/${parent}/${data.name}`
        sig += `<a href="${link}">${data.name}</a>`
    } else {
        sig += data.name
    }

    // Time for some arguments.
    sig += "("
    if (data.args) {
        for (let [i, value] of data.args.entries()) {
            if (value in types) {
                const link = value.endsWith("[]") ? types[value.slice(0, -2)] : types[value]
                value = `<a href="${link}">${value}</a>`
            }

            sig += `${value}${i + 1 != data.args.length ? ", " : ""}`
        }
    }
    sig += ")\n"

    return sig
}

function generateFunctionPage(data: MNScriptFunction, types: MNScriptTypes, parent?: string): string {
    let page = ""

    // Generate a "fake" codeblock, that allows us to place links inside.
    page += `::: raw\n<Codeblock>${generateFunctionSignature(data, types, parent)}</Codeblock>\n:::\n`

    page += `## Description\n${data.desc ?? "*No description available*"}\n`

    if (data.args && data.args.length != 0) {
        page +=  `## Arguments\n`
        for (const [i, value] of data.args.entries()) {
            if (value in types) {
                page += `[${value}](${types[value]})`
            } else {
                page += value
            }

            // If the function has args, it may also have descriptions.
            if (data.argsDesc && data.argsDesc[i]) page += ` - ${data.argsDesc[i]}`
            page += `  \n`
        }
    }

    if (data.returnType && data.returnType != "Unknown") {
        page += `## Returns\n`

        if (data.returnType in types) {
            page += `[${data.returnType}](${types[data.returnType]})`
        } else {
            page += data.returnType
        }

        if (data.returnDesc) page += ` - ${data.returnDesc}`
        page += "\n"
    }

    if (data.example) {
        page += `### Example\n\`\`\`msc\n${data.example}\n\`\`\``
    }

    return page
}

function generateClassPage(data: MNScriptClass, types: MNScriptTypes): string {
    let page = `# ${data.name}\n`
    page += `${data.desc ?? "*No description available*"}\n`
    
    page += `## Functions\n`
    data.functions.forEach((f) => {
        // Generate a "fake" codeblock, that allows us to place links inside.
        page += `::: raw\n<Codeblock>${generateFunctionSignature(f, types, data.name, true)}</Codeblock>\n:::\n`

        page += `- ${f.desc ?? "\t*No description available*"}  \n`
    })

    return page
}

function generateLibraryPage(data: MNScriptLibrary, types: MNScriptTypes): string {
    let page = `# ${data.name}\n`
    page += `${data.desc ?? "*No description available*"}\n`

    if (data.classes.length) {
        page += `## Classes\n`
        data.classes.forEach((c) => {
            const desc = c.desc ? ` - ${c.desc}` : ""
            page += `- [${c.name}](/libraries/${data.name}/${c.name}/)${desc}\n`
        })
    }

    if (data.functions.length) {
        page += `## Functions\n`
        data.functions.forEach((f) => {
            // Generate a "fake" codeblock, that allows us to place links inside.
            page += `::: raw\n<Codeblock>${generateFunctionSignature(f, types, data.name, true, true)}</Codeblock>\n:::\n`

            page += `- ${f.desc ?? "\t*No description available*"}  \n`
        })
    }

    return page
}

export async function getMNScriptData(): Promise<MNScriptData> {
    const docs: MNScriptDocs = sortDocs(await (await fetch("https://mnscript.civilservers.net/json/mnscript_docs.json")).json())

    const data: MNScriptData = {
        events: [],
        libraries: [],
        // Prefill the types LUT with primitives.
        types: {
            "number": "/fundamentals/syntax#primitives",
            "string": "/fundamentals/syntax#primitives",
            "bool": "/fundamentals/syntax#primitives"
        }
    }

    // Initialise the types LUT first before generating any pages.
    for (const library of docs.libraries) {
        for (const c of library.classes) {
            // Add to the types map.
            data.types[c.name] = `/libraries/${library.name}/${c.name}/`
        }
    }

    for (const event of docs.events) {
        data.events.push({
            params: {
                title: event.name,
                desc: event.desc,
                path: event.name,
                search: event.name
            },
            content: generateFunctionPage(event, data.types)
        })
    }

    for (const library of docs.libraries) {
        for (const f of library.functions) {
            data.libraries.push({
                params: {
                    title: `${f.name}`,
                    desc: f.desc,
                    path: `${library.name}/${f.name}`,
                    search: `${library.name}.${f.name}`
                },
                content: generateFunctionPage(f, data.types, library.name)
            })
        }

        for (const c of library.classes) {
            for (const f of c.functions) {
                data.libraries.push({
                    params: {
                        title: `${f.name}`,
                        desc: f.desc,
                        path: `${library.name}/${c.name}/${f.name}`,
                        search: `${c.name}.${f.name}`
                    },
                    content: generateFunctionPage(f, data.types, c.name)
                })
            }

            data.libraries.push({
                params: {
                    title: c.name,
                    desc: c.desc!,
                    path: `${library.name}/${c.name}/index`,
                    search: c.name
                },
                content: generateClassPage(c, data.types)
            })
        }

        data.libraries.push({
            params: {
                title: library.name,
                desc: library.desc!,
                path: `${library.name}/index`,
                search: library.name
            },
            content: generateLibraryPage(library, data.types)
        })
    }

    return data
}