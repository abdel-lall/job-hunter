require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

function sendEmail(emaildes, html, cb) {


    const oauth2Client = new OAuth2(
        process.env.CLIENTID, // ClientID
        process.env.SECRET, // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );



    oauth2Client.setCredentials({
        refresh_token: process.env.REFRECHTOKEN
    });
    const accessToken = oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.USER,
            clientId: process.env.CLIENTID,
            clientSecret: process.env.SECRET,
            refreshToken: process.env.REFRECHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    let mailOptions = {
        from: "",
        to: emaildes,
        subject: "password restoration",
        generateTextFromHTML: true,
        // text: message ,
        html: html
    };
    smtpTransport.sendMail(mailOptions, function(err, res) {
        cb(err, res)
        smtpTransport.close()
    })


    //   function cb (error, response) {
    //     var err;
    //     error ? err = error : err="succes";
    //     smtpTransport.close();
    //     return err
    //   }
}
module.exports = sendEmail;