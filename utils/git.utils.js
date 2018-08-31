import { join } from 'path';
import { spawnSync } from 'child_process';

export const clone = (repo, rename, cwd) => {
    const params = ['clone', '--depth', '1', repo];
    if (rename) params.push(rename);
    spawnSync('git', params, { cwd: cwd || join(process.cwd(), './plugins') });
};

export const checkout = (cwd, branch = 'master') => {
    const params = ['checkout', branch];
    spawnSync('git', params, { cwd: cwd || join(process.cwd(), './plugins') });
};
