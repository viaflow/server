import alphabet from 'alphabetjs';
import packageInformation from '../../../package.json';

setTimeout(() => {
    Logger.debug(alphabet(packageInformation.code, 'stereo'));
    Logger.trace(`
    ${packageInformation.code} ${packageInformation.version} - (${NODE_ENV}) on Node ${process.version}`);
}, 500);
