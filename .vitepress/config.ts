import { DefaultTheme, defineConfig, HeadConfig, resolvePages, UserConfig } from "vitepress"

const CONFIG: UserConfig<DefaultTheme.Config> = {
    title: "MNScript",
    description: "An unofficial documentation hub for the MNScript programming language.",
    srcExclude: ["**/README.md", "private/**/*.*"],
    themeConfig: {
        logo: "/images/logo.png",
        nav: [
            { text: "CivilNetworks", link: "https://civilgamers.com" }
        ],
        sidebar: [
            {
                text: "Fundamentals",
                items: [
                    {
                        text: "Language Syntax",
                        link: "/fundamentals/syntax"
                    }
                ]
            }
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/AnthonyFuller/mnscript-docs" }
        ],
        search: {
            provider: "algolia",
            options: {
                appId: "JDJEERR1J6",
                apiKey: "b8fd5ccb04669bf361dc5059cfc668dd",
                indexName: "mnscript"
            }
        }
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
        if ((pageData.filePath.startsWith("events/") || pageData.filePath.startsWith("libraries/")) && !pageData.filePath.endsWith("index.md")) {
            // Add missing titles and descriptions.
            if (!pageData.title) {
                pageData.title = pageData.params!.title
            }

            if (!pageData.description && pageData.params!.desc) {
                pageData.description = pageData.params!.desc
            }

            // Add custom tag for Algolia search.
            pageData.frontmatter.head ??= []
            pageData.frontmatter.head.push([
                "searchpath",
                {},
                pageData.params!.search
            ])
        }
    }
}

// This should not be changed without changing the code below it!
const reference: DefaultTheme.SidebarItem = {
    text: "Reference",
    items: [
        {
            text: "Libraries",
            link: "/libraries/",
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

    // Add libraries.
    if (path.at(0) == "libraries" && path.at(-1) != "index") {
        libraries[path.at(1)!] ??= {
            text: path.at(1),
            link: `/libraries/${path.at(1)}/`, // Must add trailing slash to avoid 301/2
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
            // This is a class, so add a new entry if it doesn't exist.
            classes[`${path.at(1)}/${path.at(2)}`] ??= {
                text: path.at(2),
                link:  `/${path.slice(0, 3).join("/")}/`, // Must add trailing slash to avoid 301/2
                collapsed: true,
                items: []
            }

            // Add function to class.
            classes[`${path.at(1)}/${path.at(2)}`].items?.push({
                text: path.at(3),
                link: path.join("/")
            })
        } else {
            // Add function to library.
            libraries[path.at(1)!].items![1].items!.push({
                text: path.at(2),
                link: path.join("/")
            })
        }
    }

    // Add events.
    if (path.at(0) == "events" && path.at(-1) != "index") {
        reference.items![1].items!.push({
            text: path.at(-1),
            link: path.join("/")
        })
    }
}

// Add classes to libraries.
for (const [key, contents] of Object.entries(classes)) {
    const [library, _] = key.split("/")
    libraries[library].items![0].items!.push(contents)
}

// Remove empty class and function entries.
Object.values(libraries).forEach((value) => {
    if (value.items![0].items?.length == 0) delete value.items![0]
    if (value.items![1].items?.length == 0) delete value.items![1]
})

// Add libraries to sidebar.
reference.items![0].items = Object.values(libraries);

((CONFIG.themeConfig?.sidebar) as DefaultTheme.SidebarItem[]).push(reference)

export default defineConfig(CONFIG)
