/**
 * This file gets the current MNScript docs JSON file and modifies it to suit our needs.
 * 
 * Also exposes types for all these for easy usage.
 */

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
    functions: MNScriptFunction[]
}

export interface MNScriptLibrary {
    name: string
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

async function generateDocsPage(data: MNScriptFunction, library?: string): Promise<string> {
    let page = ""
    // TODO: Generate function signature with custom component?
    page += `\`\`\`\n${(data.returnType && data.returnType != "Unknown") ? data.returnType : ""} ${(library + ".") ?? ""}${data.name}(${data.args ? data.args.join(", ") : ""})\n\`\`\`\n`

    page += `## Description\n${data.desc}\n`

    if (data.args && data.args.length != 0) {
        page +=  `## Arguments\n`
        for (const i in data.args) {
            // If the function has args, it will also have descriptions.
            page += `${data.args[i]}`
            if (data.argsDesc && data.argsDesc[i]) page += ` - ${data.argsDesc[i]}`
            page += `  \n`
        }
    }

    if (data.returnType && data.returnType != "Unknown") {
        page += `## Returns\n${data.returnType} - ${data.returnDesc}\n`
    }

    if (data.example) {
        page += `### Example\n\`\`\`msc\n${data.example}\n\`\`\``
    }

    return page
}

export async function getMNScriptData(): Promise<MNScriptData> {
    const docs: MNScriptDocs = await (await fetch("https://mnscript.civilservers.net/json/mnscript_docs.json")).json()

    const data: MNScriptData = {
        events: [],
        libraries: [],
        types: {}
    }

    for (const event of docs.events) {
        data.events.push({
            params: {
                title: event.name,
                desc: event.desc,
                path: event.name
            },
            content: await generateDocsPage(event)
        })
    }

    for (const library of docs.libraries) {
        for (const f of library.functions) {
            data.libraries.push({
                params: {
                    title: `${library.name}.${f.name}`,
                    desc: f.desc,
                    path: `${library.name}/${f.name}`
                },
                content: await generateDocsPage(f, library.name)
            })
        }

        for (const c of library.classes) {
            // Add to the types map.
            data.types[c.name] = `libraries/${library.name}/${c.name}`

            for (const f of c.functions) {
                data.libraries.push({
                    params: {
                        title: `${f.name}`,
                        desc: f.desc,
                        path: `${library.name}/${c.name}/${f.name}`
                    },
                    content: await generateDocsPage(f, c.name)
                })
            }
        }
    }

    return data
}