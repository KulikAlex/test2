const fs = require('fs');

try {
    const gitIgn = fs.readFileSync('.gitignore').toString();
} catch (excep) {
    console.error(`Файл \`${'.gitignore'}\` не создан.`);
}
