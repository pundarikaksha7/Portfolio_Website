const express=require('express');
const app=express();
const port=3000;
const path=require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/send-email', (req, res) => {
    const { Name, Email, Subject, Message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: Email,
        to: process.env.DESTINATION_EMAIL,
        subject: Subject,
        text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
        res.redirect('/'); // Redirect to the home page after sending the email
    });
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
