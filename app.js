const argv = require('./config/yargs').argv;
var colors = require('colors');

const { crearArchivo, listarTable } = require('./multiplicar/multiplicar');

comando = argv._[0];

switch (comando) {
    case 'listar':
        listarTable(argv.base, argv.limite).then(archivo => console.log(archivo))
            .catch(e => console.log(e));
        break;
    case 'crear':
        crearArchivo(argv.base, argv.limite).then(archivo => console.log(archivo))
            .catch(e => console.log(e));
        break;
    default:
        console.log('Comando no reconocido');
}
/* valor = argv[2].split('=')[1];
crearArchivo(valor).then(archivo => console.log(archivo))
    .catch(e => console.log(e)); */