const Agenda = require("agenda");

const mongoConnectionString = `${process.env.MONGO_URI}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

const agenda = new Agenda({
    db: {
        address: mongoConnectionString,
        options: {
            useUnifiedTopology: true,
        },
    },
});

module.exports = agenda;
