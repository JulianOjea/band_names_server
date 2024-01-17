const { io } = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands')

const bands = new Bands();

bands.addBand( new Band('Istasha'));
bands.addBand( new Band('Troikadedra'));
bands.addBand( new Band('Children of Bodom'));
bands.addBand( new Band('Kamaara'));

console.log(bands)

//Mensajes de sockets
io.on('connection', client => { // client: cliente que se acaba de conectar al socket server
    console.log('Cliente conectado');
    
    //envia mensaje al cliente que se acaba de conectar
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    }); //se lanzará cuando el cliente se desconecte

    client.on('mensaje', (payload) => {
        console.log('esto es un mensajee!', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    })

    // client.on('emitir-mensaje', (payload) => {
    //     //io.emit('nuevo-mensaje', payload); //emite a todos
    //     //client.broadcast.emit('nuevo-mensaje', {'nombre': payload['nombre'], 'mensaje': payload['mensaje']}); // emite a todos menos al que lo emitió
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // })

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        //io es el servidor y manda a todos los servidores
        io.emit('active-bands', bands.getBands());
    })

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    })

    //delete-band

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })
});

