import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const IMAGE = path.join(__dirname, 'test-image.jpg');
export const DOCUMENT = path.join(__dirname, 'test-document.txt');
