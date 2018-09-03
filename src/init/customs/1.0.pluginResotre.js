// restore plug-ins
import { restore } from '../../services/plugin.service';

restore().then((plugins) => {
    Logger.log(`${plugins.length} plug-ins restored...`);
});
