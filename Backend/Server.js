const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "dulthiwanka2015@gmail.com",
      pass: "wtla anbx uhrz wrvz",
    },
  });


app.post('/send-email', (req, res) => {
    const { appointmentName, appointmentRemarks, appointmentDate, appointmentTime } = req.body;

    const mailOptions = {
        from: 'dulthiwanka2015@gmail.com',
        to: 'chooty345@gmail.com', 

        subject: 'New Appointment Booked',
        html: `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #1a73e8;
            text-align: center;
            margin-bottom: 20px;
        }

        .details {
            background-color: #f1f5f9;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .details p {
            margin: 10px 0;
            line-height: 1.6;
            font-size: 16px;
        }

        .details p span {
            font-weight: bold;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 20px;
            border-top: 1px solid #e0e0e0;
            padding-top: 15px;
        }

        .footer a {
            color: #1a73e8;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>🎉 New Appointment Booked! 🎉</h2>

        <div class="details">
            <p><span>Name:</span> ${appointmentName}</p>
            <p><span>Date:</span> ${appointmentDate}</p>
            <p><span>Time:</span> ${appointmentTime}</p>
            <p><span>Remarks:</span> ${appointmentRemarks}</p>
        </div>

        <p>Thank you for booking with us. We look forward to seeing you!</p>

        <div class="footer">
            &copy; 2024 Your Company Name. All rights reserved.
            <br>
            <a href="https://yourwebsite.com">Visit our website</a> | 
            <a href="mailto:support@yourcompany.com">Contact Support</a>
        </div>
    </div>
</body>

</html>

        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
