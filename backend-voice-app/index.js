// const Nexmo = require('nexmo');
const express = require('express');
const env = require('./environment');
const app = express();
const http = require('http');
const cors = require('cors');
const Vonage = require('@vonage/server-sdk');
const { setup, querySql } = require('./utils/mysqlUtils');
setup();
app.use(express.json());

const vonage = new Vonage({
    apiKey: env.app.apiKey,
    apiSecret: env.app.apiSecret,
    applicationId: env.app.applicationId,
    privateKey: './private.key',
});

http.createServer(app)
    .on('error', (err) => {
        console.error('Error occured', err);
    })
    .listen(env.app.port, () => {
        console.log('APP HAS STARTED ON PORT ' + env.app.port);
    });

app.use(
    cors({
        origin: ['http://localhost:3006'],
    })
);
const onInboundCall = async (request, response) => {
    console.log('REQUEST IS', request.query, request.body, request.headers);
    const ncco = [
        {
            action: 'connect',
            from: request.query.from,
            endpoint: [
                {
                    type: 'phone',
                    number: request.query.from,
                },
            ],
        },
    ];

    response.json(ncco);
};
const successfullCall = async (data) => {
    console.log('CALL SUCCESS FULL DATA', data.body);
    if (data.body.status === 'answered') {
        const getQuery = 'SELECT * from call_logs where conversation_id = ?';
        const result = await querySql(getQuery, [data.body.conversation_uuid]);
        if (!result.length) {
            const query = 'INSERT INTO call_logs (from_number,to_number,conversation_id) values (? , ?, ?)';
            await querySql(query, [data.body.from, data.body.to, data.body.conversation_uuid]);
        }
    } else if (data.body.status === 'completed') {
        const query = 'UPDATE call_logs SET call_duration =  ? where conversation_id = ?';
        let minutes = parseInt(data.body.duration);
        await querySql(query, [minutes, data.body.conversation_uuid]);
    }
};
app.post('/webhooks/completed', successfullCall);
app.get('/webhooks/answer', onInboundCall);
app.post('/call', (req, res) => {
    console.log('REQUEST INCOMING', req.body);
    vonage.calls.create(
        {
            to: [
                {
                    type: 'phone',
                    number: req.body.toNumber,
                },
            ],
            from: {
                type: 'phone',
                number: req.body.fromNumber,
            },
            answer_url: [env.app.ngrokUrl + '/webhooks/answer'],
            event_url: [env.app.ngrokUrl + '/webhooks/completed'],
            length_timer: parseInt(req.body.timer) * 60,
        },
        (error, response) => {
            if (error) console.error(error);
            if (response) {
                console.log(response);
                res.status(200).send('Calling');
            }
        }
    );
});
