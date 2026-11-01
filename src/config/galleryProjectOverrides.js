const STAFF_PROJECT_LINKS = [
    { title: 'PDF READER', url: 'https://pdf-desk.onrender.com/' },
    { title: 'AIRSCOPE', url: 'https://lnkd.in/p/dD6ZGEnn' },
    { title: 'N8N', url: 'https://lnkd.in/p/dD6ZGEnn' },
    { title: 'ML', url: 'https://lnkd.in/p/dK4QbxYd' },
];

const MONETUNE_PROJECT_LINKS = [
    { title: 'OPEN PROJECT 1', url: 'https://lnkd.in/p/dDs-iiUg' },
    { title: 'OPEN PROJECT 2', url: 'https://lnkd.in/p/dD6ZGEnn' },
    { title: 'OPEN PROJECT 3', url: 'https://two026-jal-suraksha-kavach-disease-o76n.onrender.com/#/' },
    { title: 'OPEN PROJECT 4', url: 'https://lnkd.in/p/dN7dYAZJ' },
];

const TECH_STACK_LOGOS = [
    '/textures/gallery/javalogo.webp',
    '/textures/gallery/htmllogo.webp',
    '/textures/gallery/csslogo.webp',
    '/textures/gallery/pythonlogo.webp',
    '/textures/gallery/dockerlogo.webp',
];

const normalizeProjectName = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const matchesProject = (project, aliases) => {
    const identity = normalizeProjectName(`${project.id || ''} ${project.title || ''}`);
    return aliases.some(alias => identity.includes(normalizeProjectName(alias)));
};

const getStableHash = value => {
    let hash = 0;
    for (let index = 0; index < value.length; index++) {
        hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
    }
    return hash;
};

export function applyGalleryProjectOverrides(projects) {
    const overriddenProjects = projects.map(project => {
        if (matchesProject(project, ['bio'])) {
            return {
                ...project,
                url: 'https://github.com/rashmiranjanaiet?tab=repositories',
                front: '/textures/gallery/bio-rashmi.webp',
                painted: '/textures/gallery/bio-rashmi.webp',
            };
        }

        if (matchesProject(project, ['timberkitty'])) {
            return {
                ...project,
                url: 'https://free-game-x.onrender.com/',
            };
        }

        if (matchesProject(project, ['monetune'])) {
            return {
                ...project,
                quickLinks: MONETUNE_PROJECT_LINKS,
            };
        }

        if (matchesProject(project, ['67game', 'game67'])) {
            return {
                ...project,
                url: 'https://free-game-x.onrender.com/',
                description: 'A relaxing open-world online game where real players explore one shared world together.',
            };
        }

        if (matchesProject(project, ['youngmulti'])) {
            return {
                ...project,
                url: 'https://snapvideohub.com/',
                description: 'Find video and media downloader tools for public links from Instagram, YouTube, Facebook, Snapchat, TikTok, and more.',
            };
        }

        if (matchesProject(project, ['adamewa', 'adameve'])) {
            return {
                ...project,
                url: 'https://lnkd.in/p/dN7dYAZJ',
                description: 'I just slowed my college server for 2 hours.',
            };
        }

        if (matchesProject(project, ['cybersecurityatnight', 'cybersecuritynight'])) {
            return {
                ...project,
                title: 'WHEN I TRY CYBERSECURITY AT NIGHT',
                description: 'Educational purposes only🗿🤫😁',
                techStack: Array(4).fill('/textures/gallery/k6logo.webp'),
            };
        }

        if (matchesProject(project, ['uicomp', 'uicomponent', 'staff'])) {
            return {
                ...project,
                title: 'STAFF',
                description: '',
                techStack: [],
                quickLinks: STAFF_PROJECT_LINKS,
            };
        }

        return project;
    });

    return overriddenProjects.map(project => {
        if (project.quickLinks?.length) return project;

        const projectKey = normalizeProjectName(`${project.id || ''}-${project.title || ''}`);
        const techStack = [...TECH_STACK_LOGOS]
            .sort((left, right) => {
                const leftHash = getStableHash(`${projectKey}-${left}`);
                const rightHash = getStableHash(`${projectKey}-${right}`);
                return leftHash - rightHash || left.localeCompare(right);
            })
            .slice(0, 4);

        return { ...project, techStack };
    });
}
