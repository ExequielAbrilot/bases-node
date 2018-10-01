const fs = require('fs');
var colors = require('colors');

//const data = new Uint8Array(Buffer.from('Hello Node.js'));
let listarTable = (base, limite = 10) => {
    console.log("===".blue);
    return new Promise((resolve, reject) => {
        fs.readFile(`tabla/tabla-${base}.txt`, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

let crearArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {
        let str = '';
        if (!Number(base)) { reject('No es un numero'); return; }
        for (let i = 0; i <= limite; i++) {
            str += `${i} * ${base} = ${i*base}\n`;
        }

        fs.writeFile(`tabla/tabla-${base}.txt`, str, (err) => {
            if (err) reject(err);
            else resolve(`tabla-${base}.txt`);
        });
    });
}

module.exports = {
    crearArchivo,
    listarTable

};