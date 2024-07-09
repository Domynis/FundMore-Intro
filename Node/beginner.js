const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if(err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log(data);
});