import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IS_PROD = process.env.NODE_ENV === 'production';
const SHOW_LOGS = process.env.RUN_MODE === 'logs';
const PATH_TO_ENV_FILE = path.join(__dirname, '..', '.env');

const env = dotenv.config({ path: PATH_TO_ENV_FILE }).parsed;

const HOST = IS_PROD ? process.env.DB_HOST : env?.DB_HOST;
const PORT = IS_PROD ? process.env.DB_PORT : env?.DB_PORT;
const USER = IS_PROD ? process.env.DB_USER : env?.DB_USER;
const PASS = IS_PROD ? process.env.DB_PASS : env?.DB_PASS;
const NAME = IS_PROD ? process.env.DB_NAME : env?.DB_NAME;

const DB = {
    HOST: HOST ?? 'localhost',
    PORT: Number(PORT) ?? 3306,
    USER: USER ?? 'root',
    PASS: PASS ?? 'root',
    NAME: NAME ?? 'test',
};

const environment = { IS_PROD, SHOW_LOGS, PATH_TO_ENV_FILE, DB };

export default environment;
