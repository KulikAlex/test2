const fs = require('fs');
const path = require('path');
const stylelint = require('stylelint');
const puppeteer = require('puppeteer');

const stylelint_opt = ()=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'stylelint.json'), 'utf-8').toString());
}

async function useLint() {
    const data = await stylelint.lint({
        files: './**/*.css',
        config: stylelint_opt()
    });
    for (let result of data.results) {
        for (let warning of result.warnings) {
            if (path.relative(process.cwd(), result.source).startsWith('build/')) {
                continue;
            }
            console.error(`${path.relative(process.cwd(), result.source)} ${warning.line}:${warning.column} ${warning.text}`);
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

console.error('puppeteer.launch');
    const browser = await puppeteer.launch({
        headless: true
    });
console.error('browser.newPage');
    const page = await browser.newPage();
console.error('page.setViewport');
    await page.setViewport({ width: 1920, height: 1080 });
console.error('page.goto');
    await page.goto('http://localhost:3000');
console.error('page.screenshot');
    await page.screenshot({ path: 'output/example.png' });
console.error('browser.close');
    await browser.close();
}

test().then(errors=>{}
).catch(x=>{}
);
