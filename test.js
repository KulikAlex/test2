const fs = require('fs');
const stylelint = require('stylelint');

const stylelint_opt = ()=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'stylelint.json'), 'utf-8').toString());
}

async function useLint() {
    console.error('in');
    const data = await stylelint.lint({
        files: './**/*.css',
        config: stylelint_opt()
    });
    console.error('out');
    for (let result of data.results) {
        for (let warning of result.warnings) {
            console.error(String(Object.keys(warning)));
        }
    }
}

async function test() {
    try {
        const gitIgn = fs.readFileSync('.gitignore').toString();
    } catch (excep) {
        console.error(`Файл \`${'.gitignore'}\` не создан.`);
    }

    try {
        const rm = fs.readFileSync('README.md').toString();
    } catch (excep) {
        console.error(`Файл \`${'README.md'}\` не создан.`);
    }
    await useLint();
}

test().then(errors=>{}
).catch(x=>{}
);
