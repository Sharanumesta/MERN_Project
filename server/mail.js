const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sharanumesta1201@gmail.com',
        pass: 'qpjq lfub aeny dybl'
    }
})

module.exports = transport;