import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const generateFilePath = (relativePath) => {
 return path.join(__dirname, relativePath);
}

export default generateFilePath;
