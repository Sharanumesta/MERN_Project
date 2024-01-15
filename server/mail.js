const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sharanumesta1201@gmail.com',
        pass: 'pqqt rlwy bpgm fjhz'
    }
})

module.exports = transport;