const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json()); //stackabuse.com/get-http-post-body-in-express-js/
// Read static files
const images = path.join(__dirname, '../static/images');
const json = path.join(__dirname,'../static/json');

let rawsiteversion=fs.readFileSync(path.join(json,'/siteversion.json'));
let raweducation = fs.readFileSync(path.join(json,'/education.json'));
let rawexperience= fs.readFileSync(path.join(json,'/employment-history.json'));
let rawskills=fs.readFileSync(path.join(json,'/skills.json'));
let rawprofile=fs.readFileSync(path.join(json,'/profile.json'));
let rawimages=fs.readFileSync(path.join(json,'/show-pictures.json'));
let rawawards = fs.readFileSync(path.join(json,'/awards.json'));
let rawpubs = fs.readFileSync(path.join(json,'/publications.json'));

let siteversion=JSON.parse(rawsiteversion);
let education = JSON.parse(raweducation);
let experience= JSON.parse(rawexperience);
let show_images= JSON.parse(rawimages);
let skills= JSON.parse(rawskills);
let profile=JSON.parse(rawprofile);
let awards=JSON.parse(rawawards);
let pubs=JSON.parse(rawpubs);
console.log(siteversion)
router.get('/', (req, res) => {
	res.render('form', {title: 'B B N', education, experience, skills, profile, show_images, awards, pubs, siteversion});
});

router.post('/contactbright', (req,res) => {
    console.log(req.body);
    sendAnEmailToBright(req.body.email, req.body.name,req.body.message);
    res.sendStatus(200);
});

module.exports = router;

// Supporting functions
function sendAnEmailToBright(senderemail,sendername, message){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'brightbekithemba@gmail.com',
            pass: 'Xanthax@12345'
        }
    });

    let mailOptions = {
        from: 'brightbekithemba@gmail.com',
        to: 'brightndebele@hotmail.com',
        subject: 'You received a message from '+sendername+'. Their address is: '+senderemail,
        text: message
    };
    let mailOptionsResponse = {
        from: 'brightbekithemba@gmail.com',
        to: senderemail,
        subject: 'Message Received',
        text: 'Thank you for your message, I will respond within the next 24hrs. Note that, this email account is not attended. Bright'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            transporter.sendMail(mailOptionsResponse, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}
