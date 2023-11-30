import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const loadEnv = (envPath) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    dotenv.config({ path: path.resolve(__dirname, envPath) });
}

export default loadEnv