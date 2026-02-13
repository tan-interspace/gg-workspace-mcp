import { google } from 'googleapis';
import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const SCOPES = [
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.labels',
    'https://www.googleapis.com/auth/gmail.settings.basic',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/presentations'
];

const TOKEN_PATH = process.env.GOOGLE_TOKEN_PATH || '.token.json';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CRED_FILE_PATH = process.env.GOOGLE_CREDENTIALS_PATH || 'credentials.json';
const AUTH_PORT = parseInt(process.env.AUTH_PORT || '3838');

let oauth2Client: OAuth2Client;

function loadCredentials() {
    if (CLIENT_ID && CLIENT_SECRET) {
        return { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, redirect_uri: `http://localhost:${AUTH_PORT}/callback` };
    }
    if (fs.existsSync(CRED_FILE_PATH)) {
        const content = fs.readFileSync(CRED_FILE_PATH, 'utf8');
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        return { client_id: key.client_id, client_secret: key.client_secret, redirect_uri: key.redirect_uris[0] };
    }
    throw new Error('Google Credentials not found. Set GOOGLE_CLIENT_ID/SECRET or GOOGLE_CREDENTIALS_PATH.');
}

export async function getAuthClient(): Promise<OAuth2Client> {
    const { client_id, client_secret, redirect_uri } = loadCredentials();
    if (!oauth2Client) {
        oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    }

    const tokenJson = process.env.GOOGLE_TOKEN_JSON;
    if (tokenJson) {
        oauth2Client.setCredentials(JSON.parse(tokenJson));
    } else if (fs.existsSync(TOKEN_PATH)) {
        const token = fs.readFileSync(TOKEN_PATH, 'utf8');
        oauth2Client.setCredentials(JSON.parse(token));
    }

    if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
        console.error(`\n🔐 NOT AUTHENTICATED. Please open http://localhost:${AUTH_PORT} to login.\n`);
    }

    return oauth2Client;
}

export function startAuthPortal() {
    const app = express();

    app.get('/', async (req, res) => {
        let authenticated = false;
        try {
            const client = await getAuthClient();
            authenticated = !!(client.credentials && client.credentials.access_token);
        } catch (e) {}

        res.send(`
            <html><head><title>Google Workspace Portal</title></head>
            <body style='font-family:sans-serif;padding:50px;background:#f0f2f5;display:flex;justify-content:center'>
            <div style='max-width:500px;background:#fff;padding:40px;border-radius:15px;box-shadow:0 4px 20px rgba(0,0,0,.1);text-align:center'>
            <h1 style='color:#1a73e8'>Google Workspace Portal</h1>
            <p style='font-size:18px;color:${authenticated ? "#4CAF50" : "#f44336"};font-weight:bold'>
                ${authenticated ? "Authenticated ✅" : "Not Authenticated ❌"}
            </p>
            <hr style='border:0;border-top:1px solid #eee;margin:20px 0'>
            <a href='/login' style='display:inline-block;padding:15px 30px;background:#1a73e8;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold'>Authorize with Google</a>
            </div></body></html>
        `);
    });

    app.get('/login', async (req, res) => {
        const client = await getAuthClient();
        const authUrl = client.generateAuthUrl({ access_type: 'offline', scope: SCOPES, prompt: 'consent' });
        res.redirect(authUrl);
    });

    app.get('/callback', async (req, res) => {
        const code = req.query.code as string;
        try {
            const client = await getAuthClient();
            const { tokens } = await client.getToken(code);
            client.setCredentials(tokens);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
            res.send("<h1>Authenticated! ✅</h1><p>Token saved. You can close this tab.</p><a href='/'>Back to Portal</a>");
        } catch (e) {
            res.status(500).send(`<h1>Error ❌</h1><p>${e}</p><a href='/login'>Try Again</a>`);
        }
    });

    app.listen(AUTH_PORT, '0.0.0.0', () => {
        console.error(`\n🌐 Auth Portal running at http://localhost:${AUTH_PORT}\n`);
    });
}
