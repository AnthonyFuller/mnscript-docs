import { defineConfig } from "vitepress"
import { SitemapStream } from "sitemap"
import { createWriteStream } from "node:fs"
import { resolve } from "node:path"

const links: any = []

export default defineConfig({
    title: "MNScript",
    description: "An unofficial documentation hub for the MNScript programming language.",
    srcExclude: ["README.md"],
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
    // Sitemap setup
    transformHtml: (_, id, { pageData }) => {
        if (!/[\\/]404\.html$/.test(id))
            links.push({
                url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
                changefreq: pageData.params?.changefreq ?? "weekly",
                priority: pageData.params?.priority ?? 0.5
            })
    },
    buildEnd: async ({ outDir }) => {
        const sitemap = new SitemapStream({
            hostname: "https://mnscript.com"
        })
        const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"))
        sitemap.pipe(writeStream)
        links.forEach((link) => sitemap.write(link))
        sitemap.end()
        await new Promise((r) => writeStream.on("finish", r))
    }
})
