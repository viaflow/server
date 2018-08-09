import fs from 'fs';
import { join } from 'path';

const pluginDirPath = join(process.cwd(), './plugins');

if (fs.existsSync(pluginDirPath) && fs.statSync(pluginDirPath).isDirectory()) {
    Logger.log('Plugin folder mission completed.');
} else {
    // create folder
    fs.mkdirSync(pluginDirPath);
}
