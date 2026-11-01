import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream, createWriteStream } from 'node:fs';
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gameSource = path.join(root, 'Game', 'Rashmipp');
const gameBuild = path.join(gameSource, 'Build');
const gameData = path.join(gameBuild, 'Rashmipp.data');
const publicRoot = path.join(root, 'public');

await mkdir(publicRoot, { recursive: true });
const publicGame = path.join(publicRoot, 'Game', 'Rashmipp');
await rm(path.join(publicRoot, 'Game'), { recursive: true, force: true });
await cp(gameSource, publicGame, {
  recursive: true,
  filter: (source) => !path.basename(source).endsWith('.DS_Store') && !/^Rashmipp\.data(?:\.part-\d{3})?$/.test(path.basename(source)),
});

const ppmakeSource = path.join(root, 'PPMake');
const publicPpmake = path.join(publicRoot, 'PPMake');
await rm(publicPpmake, { recursive: true, force: true });
await cp(ppmakeSource, publicPpmake, {
  recursive: true,
  filter: (source) => path.basename(source) !== '.DS_Store',
});
await cp(path.join(ppmakeSource, 'assets', 'favicon.png'), path.join(publicRoot, 'favicon-avatar.png'));

console.log('Prepared the Game and PPMake pages in public/.');
