const llmsContent = `# Rashmi Ranjan | DEV Portfolio
> Building intelligent solutions and crafting digital experiences through code.

## About
Explore Rashmi Ranjan's interactive portfolio, journey, skills, awards, projects, and contact information.

## Skills
45+ languages, tools, and technologies.
`;

export function generateSeoHtml() {
    return {
        name: 'portfolio-seo-plugin',

        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/llms.txt') {
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end(llmsContent);
                } else {
                    next();
                }
            });
        },

        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'llms.txt',
                source: llmsContent,
            });
        },
    };
}
