const fs = require('fs');
const pdfParse = require('pdf-parse');

console.log('pdfParse type:', typeof pdfParse);
console.log('pdfParse value:', pdfParse);

async function test() {
    try {
        const buffer = fs.readFileSync('./examples/Profile.pdf');
        const data = await pdfParse(buffer);
        console.log('Success text length:', data.text.length);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
