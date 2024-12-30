const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const expressWs = require('express-ws');
const WebSocket = require('ws');

const app = express();
const port = 5050;


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
expressWs(app);

// Serve the main page (simple frontend)
app.get('/', async (req, res) => {
    if (!req.cookies.minehut_id || !req.cookies.token || !req.cookies.sessionId || !req.cookies.profile_id) {
        return res.send('Please log in first.');
    }

    const minehutId = req.cookies.minehut_id;
    const token = req.cookies.token;
    const sessionId = req.cookies.sessionId;
    const profileId = req.cookies.profile_id;
    
    try {
        const response = await axios.get(`https://api.dev.minehut.com/servers/${minehutId}/all_data`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'x-profile-id': profileId,  // Corrected to use profileId
                'x-session-id': sessionId
            }
        });
        res.render('server-list', { servers: response.data });
    } catch (error) {
        res.send('Error fetching servers');
    }
});

// API endpoint to fetch all data from Minehut
app.get('/getData', async (req, res) => {
    const minehutId = req.cookies.minehut_id;
    const token = req.cookies.token;
    const sessionId = req.cookies.sessionId;
    const profileId = req.cookies.profile_id;

    if (!minehutId || !token || !sessionId || !profileId) {
        return res.status(400).send({ expired: true, message: "Session expired. Please login." });
    }

    try {
        const response = await axios.get(`https://api.dev.minehut.com/servers/${minehutId}/all_data`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'x-profile-id': profileId,  // Corrected to use profileId
                'x-session-id': sessionId
            }
        });

        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.data && error.response.data.expired) {
            // Clear cookies and respond to the frontend
            res.clearCookie('minehut_id');
            res.clearCookie('token');
            res.clearCookie('sessionId');
            res.clearCookie('profile_id');
            res.status(401).send({ expired: true, message: "Session expired. Please login." });
        } else {
            res.status(500).send('Error fetching data from Minehut API.');
        }
    }
});

// Endpoint to handle session token and redirect
app.get('/auth/session/:token', async (req, res) => {
    const token = req.params.token;

    try {
        // Make request to the external Minehut API to get session data
        const response = await axios.get(`https://api.dev.minehut.com/auth/session/${token}`);

        const sessionData = response.data;

        // Extract necessary fields and store them in cookies
        const minehutId = sessionData.minehut_id;
        const sessionId = sessionData.sessionId;
        const tokenValue = sessionData.token.value;
        const profileId = sessionData.id;  // Corrected to use id for profile_id

        res.cookie('minehut_id', minehutId, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 }); // 1 day expiry
        res.cookie('token', tokenValue, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 }); // 1 day expiry
        res.cookie('sessionId', sessionId, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 }); // 1 day expiry
        res.cookie('profile_id', profileId, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 }); // 1 day expiry

        // Redirect to the main page after saving cookies
        res.redirect('/');
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Failed to authenticate. Please try again.');
    }
});

app.ws('/proxy/server/:id/console', function (ws, req) {
    const token = req.cookies.token;
    const profileId = req.cookies.profile_id;
    const sessionId = req.cookies.sessionId;

    const clientWs = new WebSocket(`https://${req.params.id}.manager.dev.minehut.com/socket`, [
        token,
        sessionId,
        profileId
    ]);

    let messageQueue = []; // Queue to store messages until WebSocket is open
    let isClientWsOpen = false;

    // When clientWs opens, send all queued messages
    clientWs.on('open', () => {
        isClientWsOpen = true;

        // Send all queued messages
        while (messageQueue.length > 0) {
            const message = messageQueue.shift();
            clientWs.send(message);
        }
    });

    // Forward messages from clientWs to ws
    clientWs.on('message', (data) => ws.send(data));

    // Handle messages from ws to clientWs
    ws.on('message', (data) => {
        if (isClientWsOpen) {
            clientWs.send(data);
        } else {
            messageQueue.push(data);
        }
    });

    // Close connections on either side
    ws.on('close', () => {
        clientWs.close();
    });
    clientWs.on('close', () => {
        ws.close();
    });

    // Handle WebSocket errors
    clientWs.on('error', (err) => {
        console.error('Error in client WebSocket:', err.message);
    });
    ws.on('error', (err) => {
        console.error('Error in server WebSocket:', err.message);
    });
});

app.use('/proxy/*', async (req, res) => {
    const minehutId = req.cookies.minehut_id;
    const token = req.cookies.token;
    const sessionId = req.cookies.sessionId;
    const profileId = req.cookies.profile_id;

    if (!minehutId || !token || !sessionId || !profileId) {
        return res.status(401).send('Session expired. Please log in.');
    }

    try {
        const response = await axios({
            method: req.method,
            url: `https://api.dev.minehut.com${req.originalUrl.replace('/proxy', '')}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'x-profile-id': profileId,
                'x-session-id': sessionId 
            },
            data: req.body // Forward the request body if it's a POST request
        });

        // Send back the data from the external API if the request is successful
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // Handle session expired error by clearing cookies
            if (error.response.data && error.response.data.expired) {
                res.clearCookie('minehut_id');
                res.clearCookie('token');
                res.clearCookie('sessionId');
                res.clearCookie('profile_id');
                return res.status(401).send('Session expired. Please log in again.');
            }

            // For all other non-OK responses, send back the response data or error
            return res.status(error.response.status).json(error.response.data);
        } else {
            // Handle cases where the error doesn't have a response (e.g., network issues)
            return res.status(500).send(error.message || 'An unknown error occurred.');
        }
    }
});

app.use('/manager/:id*', async (req, res) => {
    const minehutId = req.cookies.minehut_id;
    const token = req.cookies.token;
    const sessionId = req.cookies.sessionId;
    const profileId = req.cookies.profile_id;

    if (!minehutId || !token || !sessionId || !profileId) {
        return res.status(401).send('Session expired. Please log in.');
    }

    try {
        const response = await axios({
            method: req.method,
            url: `https://${req.params.id}.manager.dev.minehut.com${req.originalUrl.replace(`/manager/${req.params.id}`, '')}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'x-profile-id': profileId,
                'x-session-id': sessionId 
            },
            data: req.body // Forward the request body if it's a POST request
        });

        // Send back the data from the external API if the request is successful
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // Handle session expired error by clearing cookies
            if (error.response.data && error.response.data.expired) {
                res.clearCookie('minehut_id');
                res.clearCookie('token');
                res.clearCookie('sessionId');
                res.clearCookie('profile_id');
                return res.status(401).send('Session expired. Please log in again.');
            }

            // For all other non-OK responses, send back the response data or error
            return res.status(error.response.status).json(error.response.data);
        } else {
            // Handle cases where the error doesn't have a response (e.g., network issues)
            return res.status(500).send(error.message || 'An unknown error occurred.');
        }
    }
});

app.get('/server/:id', (req, res) => {
    if (!req.cookies.minehut_id || !req.cookies.token || !req.cookies.sessionId || !req.cookies.profile_id) {
        return res.send('Please log in first.');
    }
    res.render('server-panel');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
