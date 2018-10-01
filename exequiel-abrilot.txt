// No realizar la prueba en repl.it al hacerlo su respuesta queda disponible para otros postulantes
// No editar
const clients = [
    { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS' },
    { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ' },
    { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA' },
    { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ' },
    { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS' },
    { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' }
];
const accounts = [
    { clientId: 6, bankId: 1, balance: 15000 },
    { clientId: 1, bankId: 3, balance: 18000 },
    { clientId: 5, bankId: 3, balance: 135000 },
    { clientId: 2, bankId: 2, balance: 5600 },
    { clientId: 3, bankId: 1, balance: 23000 },
    { clientId: 5, bankId: 2, balance: 15000 },
    { clientId: 3, bankId: 3, balance: 45900 },
    { clientId: 2, bankId: 3, balance: 19000 },
    { clientId: 4, bankId: 3, balance: 51000 },
    { clientId: 5, bankId: 1, balance: 89000 },
    { clientId: 1, bankId: 2, balance: 1600 },
    { clientId: 5, bankId: 3, balance: 37500 },
    { clientId: 6, bankId: 1, balance: 19200 },
    { clientId: 2, bankId: 3, balance: 10000 },
    { clientId: 3, bankId: 2, balance: 5400 },
    { clientId: 3, bankId: 1, balance: 9000 },
    { clientId: 4, bankId: 3, balance: 13500 },
    { clientId: 2, bankId: 1, balance: 38200 },
    { clientId: 5, bankId: 2, balance: 17000 },
    { clientId: 1, bankId: 3, balance: 1000 },
    { clientId: 5, bankId: 2, balance: 600 },
    { clientId: 6, bankId: 1, balance: 16200 },
    { clientId: 2, bankId: 2, balance: 10000 }
]
const banks = [
    { id: 1, name: 'SANTANDER' },
    { id: 2, name: 'CHILE' },
    { id: 3, name: 'ESTADO' }
];

const unionClientsAccountsBanks = juntarClientsAccountsBanks();

/*
  SECCIÓN PROBLEMAS
    - No promover la copia:
      - No preguntar en StackOverflow, foros, o similares ya que estas preguntas/respuestas quedan disponibles a otros candidatos
      - No subir a repositorios públicos (github, o similares)
      - Otros sitios como codepen o editores de texto on-line (codepen, repl, o similares), dejan guardado el código, por lo que les pedimos tampoco usar editores on-line, la mejor forma de debuggear su código es usando un interprete de javascript como node y ejecutarlo de manera local
      - Para nosotros es fácil detectar pruebas con copia, no pierda su tiempo intentando hacerlo
      - Posteriormente, se evaluará conocimiento en es6 en entrevistas presenciales
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
    - Los resultados son evaluados con un test automatizado, revise que sus retornos sean con la estructura de datos solicitada en cada pregunta.
    - Métodos menos verbosos, DRY, y buenas prácticas en el código mejoran el puntaje final de su prueba
    - Si necesita hacer supuestos que afecten las respuestas entregadas, por favor déjelos escritos en el cuerpo del correo cuando envíe su prueba (No en este archivo). Supuestos que contradigan lo solicitado, no serán considerados como válidos.
    - Su prueba debe ejecutarse sin errores con: node nombre-apellido.js
*/

function juntarClientsAccountsBanks() {
    var banksNewName = banks.map(bank => {
        return { bankId: bank.id, nameBank: bank.name };
    });
    var clientsNewName = clients.map(client => {
        return { clientId: client.id, taxNumber: client.taxNumber, name: client.name };
    });

    const mergeByClientId = (a1, a2) =>
        a1.map(itm =>
            ({...a2.find((item) =>
                    (item.clientId === itm.clientId) && item),
                ...itm
            }));
    const mergeByBankId = (a1, a2) =>
        a1.map(itm =>
            ({...a2.find((item) =>
                    (item.bankId === itm.bankId) && item),
                ...itm
            }));

    let mergeClientsAccounts = mergeByClientId(accounts, clientsNewName);
    let mergeClientsAccountsBanks = mergeByBankId(mergeClientsAccounts, banksNewName);

    return mergeClientsAccountsBanks;
}

// 0 Arreglo con los ids de clientes
function listClientsIds() {
    return clients.map((client) => client.id);
};

// 1 Arreglo con los ids de clientes ordenados por rut
function listClientsIdsSortByTaxNumber(ascendente = true) {
    let clientsAux_ = clients.slice(0, clients.length);
    let clientsOrderByRut = clientsAux_.sort(function(a, b) {
        let aSinDigitoVerificador = a.taxNumber.slice(0, a.taxNumber.length - 1);
        let bSinDigitoVerificador = b.taxNumber.slice(0, b.taxNumber.length - 1);
        if (ascendente) {
            return aSinDigitoVerificador - bSinDigitoVerificador;
        } else {
            return bSinDigitoVerificador - aSinDigitoVerificador;
        }
    });
    return clientsOrderByRut.map((clientsOrderByRut) => clientsOrderByRut.id);
};

// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
function sortClientsTotalBalances(cuentas = accounts, clientes = clients) {
    let balancesTotalesPorCliente = cuentas.reduce((contadorTotales, cadaElemento) => {
        contadorTotales[cadaElemento.clientId] = (contadorTotales[cadaElemento.clientId] || 0) + cadaElemento.balance;
        return contadorTotales;
    }, {});

    let balanceTotalPorClienteOrdenados = Object.keys(balancesTotalesPorCliente).sort(
        function(a, b) {
            return balancesTotalesPorCliente[b] - balancesTotalesPorCliente[a]
        });
    // Obtener nombres por id
    for (let x in balanceTotalPorClienteOrdenados) {
        for (let y in clientes) {
            if (clientes[y].id == balanceTotalPorClienteOrdenados[x]) {
                balanceTotalPorClienteOrdenados[x] = clientes[y].name;
            }
        }
    }
    return balanceTotalPorClienteOrdenados;
}

// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
function banksClientsTaxNumbers() {
    var objectBankClient = {};
    for (let bank in banks) {
        let nombreClientesPorBanco = unionClientsAccountsBanks.filter((client) => {
            return client.nameBank === banks[bank].name
        }).map(client => client.name).sort()

        let valorUnicoNombreClientesPorBanco = Array.from(new Set(nombreClientesPorBanco));
        let contenedorDeClientes = [];
        for (let index in valorUnicoNombreClientesPorBanco) {
            existeCliente = clients.filter(client => {
                return client.name === valorUnicoNombreClientesPorBanco[index]
            });
            if (existeCliente.length > 0) {
                contenedorDeClientes.push(existeCliente[0]);
            }
        }
        objectBankClient[banks[bank].name] = contenedorDeClientes.map(client => client.taxNumber);

    }
    return objectBankClient;
}

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
function richClientsBalances() {
    return unionClientsAccountsBanks.filter(client => client.nameBank === 'SANTANDER' && client.balance > 25000)
        .map((client) => client.balance).sort((a, b) => b - a);
}

// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
function banksRankingByTotalBalance() {
    let bankEstruct = accounts.reduce((contadorTotales, cadaElemento) => {
        contadorTotales[cadaElemento.bankId] = (contadorTotales[cadaElemento.bankId] || 0) + cadaElemento.balance;
        return contadorTotales;
    }, {});
    return Object.keys(bankEstruct).sort(function(a, b) { return bankEstruct[a] - bankEstruct[b] })
}

// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
function banksFidelity() {
    let bankList = [];
    for (let indexClient in clients) {
        let userCountBank = Array.from(new Set(unionClientsAccountsBanks.filter(client => {
            return client.clientId === clients[indexClient].id;
        }).map(client => {
            return client.nameBank;
        })));
        if (userCountBank.length === 1) {
            bankList.push(userCountBank);
        }
    }
    bankList = bankList.reduce((contadorTotales, cadaElemento) => {
        contadorTotales[cadaElemento] = (contadorTotales[cadaElemento] || 0) + 1;
        return contadorTotales;
    }, {});
    // Llena de 0 los bancos que no obtuvieron clientes unicos
    for (let indexBank in banks) {
        if (!Object.keys(bankList).find(a => {
                return banks[indexBank].name === a
            })) {
            bankList[banks[indexBank].name] = 0;
        }
    }
    return bankList;
}

// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
function banksPoorClients() {
    let banco = {};
    for (let indexBank in banks) {
        let totalBalanceByClient = (unionClientsAccountsBanks.filter(a => a.nameBank === banks[indexBank].name)
            .reduce((contadorTotales, cadaElemento) => {
                contadorTotales[cadaElemento.clientId] = (contadorTotales[cadaElemento.clientId] || 0) + cadaElemento.balance;
                return contadorTotales
            }, {}));
        // Se recorren los clientes y se deja el menor con su respectivo banco
        for (let index in totalBalanceByClient) {
            if (totalBalanceByClient[index] === Math.min(...Object.values(totalBalanceByClient))) {
                banco[banks[indexBank].name] = index;
            }
        }
    }
    return banco;
}


// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newClientRanking() {
    const clientes = clients.slice(0, clients.length);
    const cuentas = accounts.slice(0, accounts.length);

    let saldoEmpleadoNuevo = 9000;

    let clienteNuevo = {
        id: Math.max(...clientes.map(a => a.id)) + 1,
        taxNumber: '128358897',
        name: 'ALEJANDRA RODRIGUEZ RODRIGUEZ'
    }
    let cuentaNueva = {
        clientId: clienteNuevo.id,
        bankId: 3,
        balance: saldoEmpleadoNuevo
    }
    clientes.push(clienteNuevo);
    cuentas.push(cuentaNueva);

    posicion = sortClientsTotalBalances(cuentas, clientes).findIndex(a => a === clienteNuevo.name) + 1;
    return (`El lugar que ocupa ${clienteNuevo.name} en el ranking es del lugar ${posicion}`)
}


// Impresión de soluciones. No modificar.
console.log('Pregunta 0');
console.log(listClientsIds());
console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log(sortClientsTotalBalances());
console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log(richClientsBalances());
console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log(banksFidelity());
console.log('Pregunta 7');
console.log(banksPoorClients());
console.log('Pregunta 8');
console.log(newClientRanking());