import { DefaultTheme, defineConfig, resolvePages, UserConfig } from "vitepress"

const CONFIG: UserConfig<DefaultTheme.Config> = {
    title: "MNScript",
    description: "An unofficial documentation hub for the MNScript programming language.",
    srcExclude: ["**/README.md", "private/**/*.*"],
    themeConfig: {
        logo: "/images/logo.png",
        nav: [
            { text: "CivilNetworks", link: "https://civilgamers.com" }
        ],
        sidebar: [],
        socialLinks: [
            { icon: "github", link: "https://github.com/AnthonyFuller/mnscript-docs" }
        ]
    },
    cleanUrls: true,
    markdown: {
        languages: [
            {
                id: "mnscript",
                scopeName: "source.mnscript",
                path: "../../private/syntax/mnscript.tmlanguage.json",
                aliases: ["mnsc", "msc"]
            }
        ]
    },
    sitemap: {
        hostname: "https://mnscript.com"
    },
    async transformPageData(pageData, { siteConfig }) {
        if (pageData.filePath.startsWith("events/") || pageData.filePath.startsWith("libraries/")) {
            if (!pageData.title) {
                pageData.title = pageData.params!.title
                pageData.description = pageData.params!.desc
            }
        }
    }
}

// This should not be changed without changing the code below it!
const reference: DefaultTheme.SidebarItem = {
    text: "Reference",
    items: [
        {
            text: "Libraries",
            collapsed: true,
            items: []
        },
        {
            text: "Events",
            link: "/events/",
            collapsed: true,
            items: []
        }
    ]
}

// Add the generated API docs to the sidebar.
const pages = await resolvePages("./", CONFIG)

let libraries: Record<string, DefaultTheme.SidebarItem> = {}
let classes: Record<string, DefaultTheme.SidebarItem> = {}
for (const rawPath of pages.pages) {
    const path = rawPath.substring(0, rawPath.length - 3).split("/")
    const isClass = path.length === 4

    if (path.at(0) == "libraries" && path.at(-1) != "index") {
        libraries[path.at(1)!] ??= {
            text: path.at(1),
            collapsed: true,
            items: [
                {
                    text: "Classes",
                    collapsed: true,
                    items: []
                },
                {
                    text: "Functions",
                    collapsed: true,
                    items: []
                }
            ]
        }

        if (isClass) {
            classes[`${path.at(1)}/${path.at(2)}`] ??= {
                text: path.at(2),
                collapsed: true,
                items: []
            }

            classes[`${path.at(1)}/${path.at(2)}`].items?.push({
                text: path.at(3),
                link: path.join("/")
            })
        } else {
            libraries[path.at(1)!].items![1].items!.push({
                text: path.at(2),
                link: path.join("/")
            })
        }
    }

    if (path.at(0) == "events" && path.at(-1) != "index") {
        reference.items![1].items!.push({
            text: path.at(-1),
            link: path.join("/")
        })
    }
}

classes = Object.keys(classes).sort().reduce((obj, key) => {
    obj[key] = classes[key]; 
    return obj;
}, {})

for (const [key, contents] of Object.entries(classes)) {
    const [library, _] = key.split("/")
    libraries[library].items![0].items!.push(contents)
}

libraries = Object.keys(libraries).sort().reduce((obj, key) => {
    if (libraries[key].items![0].items?.length == 0) {
        delete libraries[key].items![0]
    }

    obj[key] = libraries[key]; 
    return obj;
}, {})

reference.items![0].items = Object.values(libraries);

((CONFIG.themeConfig?.sidebar) as DefaultTheme.SidebarItem[]).push(reference)

export default defineConfig(CONFIG)
