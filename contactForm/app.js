const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

// set up view engine
app.use(express.static(__dirname +'views'));
app.set('view engine', 'hbs');

// set body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.render('contactForm')
});

// send email to the user
app.post('/sendEmailByGmail', (req, res)=> {
    //console.log(req.body);
    // set the email transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'test.purpose.mai@gmail.com',
            pass: '@r1ful2018' // @r1ful
        }
    });
    const mailOptions = {
        from: req.body.email, // sender
        to: 'mac.fira@gmail.com', // receiver
        subject: req.body.email_subject,
        html: '<h1>Hi, ' + req.body.username + ' </h1><br><p>' + req.body.email_message + '</p> thanks By: Ariful'
    }
    console.log(mailOptions)
    // now send email
    transporter.sendMail(mailOptions, (err, info)=> {
        if(err) throw err;
        console.log(info);
        res.send('You successfully contacted us');
    });
});

app.post('/sendEmailByEthereal', (req, res)=> {
    //console.log(req.body);
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        // Message object
        let message = {
            from: req.body.email,
            to: 'test.purpose.mai@gmail.com',
            subject: req.body.email_subject,
            html: '<p><b>Hello</b> ' + req.body.username + '!</p><p>' + req.body.email_message + '</p>'
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.redirect(nodemailer.getTestMessageUrl(info)); // for check your emails
        });
    });

});

app.listen(5000);