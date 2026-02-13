import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { google } from 'googleapis';
import { getAuthClient, startAuthPortal } from './auth.js';

const server = new Server(
  {
    name: "gg-workspace-mcp",
    version: "2.1.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// --- GMAIL TOOLS ---

async function getGmailService() {
    const auth = await getAuthClient();
    return google.gmail({ version: 'v1', auth });
}

async function getCalendarService() {
    const auth = await getAuthClient();
    return google.calendar({ version: 'v3', auth });
}

async function getDriveService() {
    const auth = await getAuthClient();
    return google.drive({ version: 'v3', auth });
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_account_info",
        description: "Get the email address of the currently authenticated Google account.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "send_email",
        description: "Send a simple email via Gmail.",
        inputSchema: {
          type: "object",
          properties: {
            to: { type: "string" },
            subject: { type: "string" },
            body: { type: "string" },
          },
          required: ["to", "subject", "body"],
        },
      },
      {
        name: "list_calendar_events",
        description: "List events from Google Calendar. Timezone: Asia/Ho_Chi_Minh.",
        inputSchema: {
          type: "object",
          properties: {
            max_results: { type: "number", default: 10 },
            days_back: { type: "number", default: 0 },
          },
        },
      },
      {
        name: "create_calendar_event",
        description: "Create a calendar event. Format: YYYY-MM-DDTHH:MM (VN Time).",
        inputSchema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            start_time: { type: "string" },
            end_time: { type: "string" },
            description: { type: "string" },
          },
          required: ["summary", "start_time", "end_time"],
        },
      },
      {
        name: "list_drive_folders",
        description: "List all folders in Google Drive.",
        inputSchema: {
          type: "object",
          properties: {
            parent_id: { type: "string", default: "root" },
          },
        },
      },
      {
        name: "search_drive",
        description: "Search for files in Google Drive.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "get_account_info") {
      const gmail = await getGmailService();
      const res = await gmail.users.getProfile({ userId: 'me' });
      return {
        content: [{ type: "text", text: `🐶 Authenticated as: ${res.data.emailAddress} (TS Gâu!)` }],
      };
    }

    if (name === "send_email") {
        const { to, subject, body } = args as { to: string; subject: string; body: string };
        const gmail = await getGmailService();
        
        const str = [
            `To: ${to}`,
            `Subject: ${subject}`,
            'Content-Type: text/plain; charset="utf-8"',
            '',
            body
        ].join('\n');

        const encodedMessage = Buffer.from(str)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw: encodedMessage }
        });

        return {
            content: [{ type: "text", text: `✅ Email sent! ID: ${res.data.id}` }],
        };
    }

    if (name === "list_calendar_events") {
        const { max_results = 10, days_back = 0 } = args as { max_results?: number; days_back?: number };
        const calendar = await getCalendarService();
        const timeMin = new Date(Date.now() - days_back * 24 * 60 * 60 * 1000).toISOString();
        
        const res = await calendar.events.list({
            calendarId: 'primary',
            timeMin,
            maxResults: max_results,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = res.data.items || [];
        if (events.length === 0) return { content: [{ type: "text", text: "No events found." }] };

        const text = events.map(e => `- ${e.start?.dateTime || e.start?.date}: ${e.summary} (ID: ${e.id})`).join('\n');
        return { content: [{ type: "text", text }] };
    }

    if (name === "create_calendar_event") {
        const { summary, start_time, end_time, description = "" } = args as { summary: string; start_time: string; end_time: string; description?: string };
        const calendar = await getCalendarService();
        
        const res = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: {
                summary,
                description,
                start: { dateTime: `${start_time}:00`, timeZone: 'Asia/Ho_Chi_Minh' },
                end: { dateTime: `${end_time}:00`, timeZone: 'Asia/Ho_Chi_Minh' },
            },
        });

        return { content: [{ type: "text", text: `✅ Event created: ${res.data.htmlLink}` }] };
    }

    if (name === "list_drive_folders") {
        const { parent_id = "root" } = args as { parent_id?: string };
        const drive = await getDriveService();
        const query = `'${parent_id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
        
        const res = await drive.files.list({
            q: query,
            fields: 'files(id, name, webViewLink)',
            pageSize: 100,
        });

        const items = res.data.files || [];
        if (items.length === 0) return { content: [{ type: "text", text: "No folders found." }] };

        const text = items.map(item => `📁 ${item.name}\n   ID: ${item.id}\n   Link: ${item.webViewLink || 'N/A'}\n`).join('\n');
        return { content: [{ type: "text", text }] };
    }

    if (name === "search_drive") {
        const { query } = args as { query: string };
        const drive = await getDriveService();
        
        const res = await drive.files.list({
            q: query,
            fields: 'files(id, name, mimeType)',
        });

        const items = res.data.files || [];
        if (items.length === 0) return { content: [{ type: "text", text: "No files found." }] };

        const text = items.map(item => `- ${item.name} (${item.id})`).join('\n');
        return { content: [{ type: "text", text }] };
    }

    throw new Error(`Tool not found: ${name}`);
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `❌ Error: ${error.message}` }],
      isError: true,
    };
  }
});

async function main() {
  startAuthPortal();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🚀 Google Cloud MCP (TypeScript) running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
