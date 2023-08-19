/**
 *********************************************************************************************
 * This script is used to manage the various commands needed while developing the mobile app *
 *********************************************************************************************
 **/

import {execSync} from 'node:child_process';
import inquirer from 'inquirer';

let [commandType, ...args] = process.argv.slice(2).map(arg => arg.toLowerCase());

const COMMANDS = ['serve:web', 'build:web', 'build:app', 'sync:app'];
const PLATFORMS = ['android', 'ios'];
const PROMPTS_ARGS_ORDER = ['platform'];

if (commandType && args.length > 0) {
    runCommand(commandType, args);
}
else {
    inquirer.prompt([
        {
            name: 'command',
            type: 'list',
            message: 'Choose command',
            choices: COMMANDS,
            default: 'web'
        },
        {
            name: 'platform',
            type: 'list',
            message: 'Choose platform',
            choices: PLATFORMS,
            default: 'android',
            when: (answers) => answers.command === 'build:app'
        }
    ]).then(answers => {
        const args = PROMPTS_ARGS_ORDER.reduce((acc, key) => acc.concat(answers[key] || []), []);
        runCommand(answers.command, args);
    }).catch(err => console.log(err));
}

async function runCommand(commandType, args) {
    switch (commandType) {
        case 'serve:web':
            await serveWebApp(...args);
            break;
        case 'build:web':
            await buildWebApp();
            break;
        case 'build:app':
            await createPlatformProject(...args);
            break;
        case 'sync:app':
            await syncPlatformProject();
            break;
    }
}

async function serveWebApp() {
    execSync(`npx ng serve`, {stdio: 'inherit'});
}

async function buildWebApp() {
    execSync('npm run angular:build', {stdio: 'inherit'});
}

async function createPlatformProject(platform) {
    const projectCommands = [
        'npm run angular:build',
        `npm run ${platform}:add`,
        `npm run ${platform}:copy`,
        // `npm run ${platform}:icons_and_splash`,
        'npm run app:configure'
    ];
    projectCommands.forEach(command => execSync(command, {stdio: 'inherit'}));
}

async function syncPlatformProject() {
    const syncCommands = [
        'npm run angular:build',
        `npm run ionic:sync`,
        'npm run sync:configure',
        'npm run app:configure'
    ];
    syncCommands.forEach(command => execSync(command, {stdio: 'inherit'}));
}
