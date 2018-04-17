import readline from 'readline';

if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}
process.on('SIGINT', () => {
    process.exit(0);
});

process.on('exit', (code) => {
    Logger.error(`Process exit with code ${code}`);
});
