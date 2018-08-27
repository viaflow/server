import { join } from 'path';
import { spawnSync } from 'child_process';

export const clone = (repo, rename, cwd) => {
    const params = ['clone', '--depth', '1', repo];
    if (rename) params.push(rename);
    const child = spawnSync('git', params, { cwd: cwd || join(process.cwd(), './plugins') });
    // Logger.log(child);
    Logger.log(child);
};

export const checkout = (cwd, branch = 'master') => {
    const params = ['checkout', branch];
    const child = spawnSync('git', params, { cwd: cwd || join(process.cwd(), './plugins') });
    Logger.log(child);
    Logger.log(child.stdout);
    Logger.log(child.stderr);
};
