const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: false,
            // useFindAndModify: false
        });

        console.log('Base de datos online');

    } catch (err) {
        console.log(err);
        throw new Error('Error al iniciar DB')
    }
};

module.exports = {
    dbConnection
}