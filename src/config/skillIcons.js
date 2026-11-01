const TECHNOLOGIES = [
    { label: 'Java', symbol: 'J' },
    { label: 'OOP', symbol: 'OOP' },
    { label: 'HTML', symbol: '</>' },
    { label: 'Code', symbol: '<>' },
    { label: 'Git', symbol: 'git' },
    { label: 'GitHub', symbol: 'GH' },
    { label: 'Linux', symbol: 'LINUX' },
    { label: 'Windows', symbol: 'WIN' },
    { label: 'Networking', symbol: 'NET' },
    { label: 'SQL', symbol: 'SQL' },
    { label: 'MySQL', symbol: 'MYSQL' },
    { label: 'PostgreSQL', symbol: 'PG' },
    { label: 'MongoDB', symbol: 'MONGO' },
    { label: 'Redis', symbol: 'REDIS' },
    { label: 'REST API', symbol: 'API' },
    { label: 'Authentication', symbol: 'AUTH' },
    { label: 'Security', symbol: 'SEC' },
    { label: 'Cybersecurity', symbol: 'SAFE' },
    { label: 'Spring', symbol: 'SPRING' },
    { label: 'Gradle', symbol: 'G' },
    { label: 'Postman', symbol: 'POST' },
    { label: 'Docker', symbol: 'DOCKER' },
    { label: 'Spring Boot', symbol: 'SB' },
    { label: 'Spring Cloud', symbol: 'SC' },
    { label: 'GraphQL', symbol: 'GQL' },
    { label: 'Microservices', symbol: 'MS' },
    { label: 'Kafka', symbol: 'KAFKA' },
    { label: 'Kubernetes', symbol: 'K8S' },
    { label: 'AWS', symbol: 'AWS' },
    { label: 'Google Cloud', symbol: 'GCP' },
    { label: 'Azure', symbol: 'AZURE' },
    { label: 'Jenkins', symbol: 'J' },
    { label: 'Grafana', symbol: 'G' },
    { label: 'Prometheus', symbol: 'P' },
    { label: 'Terraform', symbol: 'TF' },
    { label: 'CI/CD', symbol: 'CI/CD' },
    { label: 'VS Code', symbol: 'VS' },
    { label: 'IntelliJ IDEA', symbol: 'IJ' },
    { label: 'Eclipse', symbol: 'E' },
    { label: 'Node.js', symbol: 'JS' },
    { label: 'Python', symbol: 'PY' },
    { label: 'React', symbol: 'R' },
    { label: 'HTML5', symbol: '5' },
    { label: 'CSS3', symbol: '3' },
    { label: 'JavaScript', symbol: 'JS' },
    { label: 'TypeScript', symbol: 'TS' },
];

const createPencilBalloonTexture = (symbol) => {
    const fontSize = symbol.length > 4 ? 34 : symbol.length > 2 ? 46 : 76;
    const safeSymbol = symbol
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="280" height="420" viewBox="0 0 280 420">
            <path d="M140 14 C205 13 249 70 250 157 C251 225 214 277 160 306 L140 321 L120 306 C66 277 29 225 30 157 C31 70 75 13 140 14 Z"
                fill="#fff" stroke="#262626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M137 19 C199 17 244 73 245 156 C246 220 210 272 157 301 M143 23 C83 20 38 75 36 156 C34 219 69 267 123 300"
                fill="none" stroke="#555" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M123 307 Q140 319 157 307 L147 328 Q140 333 133 328 Z"
                fill="#fff" stroke="#262626" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M140 330 C128 344 153 353 139 367 C126 381 148 390 137 405"
                fill="none" stroke="#262626" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M144 332 C133 346 158 355 144 370"
                fill="none" stroke="#777" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M47 98 Q53 79 66 66 M214 76 Q228 88 232 105 M42 212 Q48 229 58 239 M220 228 Q229 216 234 198"
                fill="none" stroke="#777" stroke-width="1.5" stroke-linecap="round"/>
            <text x="140" y="185" text-anchor="middle" dominant-baseline="middle"
                font-family="cursive" font-size="${fontSize}" font-weight="700" letter-spacing="1"
                fill="#292929" stroke="#292929" stroke-width="0.7" paint-order="stroke">${safeSymbol}</text>
            <path d="M105 221 Q140 226 175 221" fill="none" stroke="#888" stroke-width="1.3" stroke-linecap="round"/>
        </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const SKILL_BALLOONS = TECHNOLOGIES.map(({ label, symbol }, index) => {
    const column = index % 8;
    const row = Math.floor(index / 8);
    const x = (column - 3.5) * 2.15;
    const y = 4.3 - row * 1.65;
    const texture = createPencilBalloonTexture(symbol);

    return {
        texture,
        paintedTexture: texture,
        label,
        size: 'small',
        aspect: 2 / 3,
        x,
        y,
        z: -0.85 + (column % 3) * 0.25,
        phase: index * 0.37,
    };
});
