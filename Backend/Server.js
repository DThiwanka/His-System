const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Worker } = require('worker_threads');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize workers
const worker = new Worker('./worker.js');
const worker2 = new Worker('./worker2.js');
const worker3 = new Worker('./worker3.js');

// Function to handle worker events
function handleWorker(worker, workerName) {
    worker.on('message', (data) => {
        console.log(`Received data from ${workerName}:`, data);
    });

    worker.on('error', (err) => {
        console.error(`${workerName} error:`, err);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`${workerName} exited with code ${code}`);
        }
    });
}

// Attach event handlers to workers
handleWorker(worker, 'worker');
handleWorker(worker2, 'worker2');
handleWorker(worker3, 'worker3');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'dulthiwanka2015@gmail.com',
        pass: 'wtla anbx uhrz wrvz',
    },
});

// Email sending route
app.post('/send-email', (req, res) => {
    const { appointmentName, appointmentRemarks, appointmentDate, appointmentTime } = req.body;

    const mailOptions = {
        from: 'dulthiwanka2015@gmail.com',
        to: 'chooty345@gmail.com',
        subject: 'New Appointment Booked',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="text-align: center; color: #1a73e8;">🎉 New Appointment Booked! 🎉</h2>
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px;">
                <p><strong>Name:</strong> ${appointmentName}</p>
                <p><strong>Date:</strong> ${appointmentDate}</p>
                <p><strong>Time:</strong> ${appointmentTime}</p>
                <p><strong>Remarks:</strong> ${appointmentRemarks}</p>
            </div>
            <p>Thank you for booking with us. We look forward to seeing you!</p>
        </div>`,
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
