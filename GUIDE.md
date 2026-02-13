# Google Workspace MCP - Complete User & Developer Guide

## Table of Contents
1. [For Users - Installation Guide](#for-users---installation-guide)
2. [For Users - Authentication](#for-users---authentication)
3. [For Developers - Setup](#for-developers---setup)
4. [Troubleshooting](#troubleshooting)

---

## For Users - Installation Guide

### Step 1: Get Your Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services > OAuth consent screen**
   - Choose **External** user type
   - Fill in app name and support email
   - Under **Scopes**, click **Add or Remove Scopes** and add:
     ```
     https://www.googleapis.com/auth/gmail.modify
     https://www.googleapis.com/auth/gmail.labels
     https://www.googleapis.com/auth/gmail.settings.basic
     https://www.googleapis.com/auth/drive
     https://www.googleapis.com/auth/calendar
     https://www.googleapis.com/auth/documents
     https://www.googleapis.com/auth/spreadsheets
     https://www.googleapis.com/auth/presentations
     ```
   - Add your email to **Test users** (required while in Development)
4. Enable these APIs in **APIs & Services > Library**:
   - Gmail API
   - Google Calendar API
   - Google Drive API
   - Google Docs API
   - Google Sheets API
   - Google Slides API

5. Go to **APIs & Services > Credentials**
   - Click **Create Credentials > OAuth client ID**
   - Application type: **Desktop app**
   - Copy your **Client ID** and **Client Secret** ✅

### Step 2: Install & Authenticate

**Prerequisite:** Ensure you have [Bun](https://bun.sh) installed (`curl -fsSL https://bun.sh/install | bash`).

**Option A: Install from Source (Recommended)**

```bash
git clone https://github.com/tannht/gg-workspace-mcp.git
cd gg-workspace-mcp
bun install
```

**Set your credentials:**

You can set them as environment variables:
```bash
export GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
export GOOGLE_CLIENT_SECRET="your-client-secret"
```

Or copy `.env.example` to `.env` and fill in the values:
```bash
cp .env.example .env
```

**Run the server:**

```bash
bun run src/index.ts
```

You'll see in the output:
```
============================================================
🔐 GOOGLE ACCOUNT AUTHENTICATION
📱 Open your browser: http://localhost:3838
============================================================
```

**Open `http://localhost:3838` in your browser** → Click **"Authorize with Google"** → Grant permissions ✅

Your token is automatically saved. You're ready to use it!

### Step 3: Configure Your MCP Client

See [MCP_CLIENTS.md](MCP_CLIENTS.md) for detailed configuration for 25+ clients.

**Quick example for Claude Desktop:**

File: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

Restart Claude Desktop and the tools are ready to use! 🎉

### Step 4: Use the Tools

Once authenticated, you can use all available tools. Example:

- **List your Google Drive folders:** `list_drive_folders`
- **Send an email:** `send_email` (to, subject, body)
- **Create a document:** `create_document` (title, body_text)
- **List calendar events:** `list_calendar_events` (max_results, days_back)

See [README.md](README.md#available-tools) for the full list.

---

## For Users - Authentication

### On First Run

The server automatically starts an OAuth portal at **http://localhost:3838**:

1. Open the URL in your browser
2. Click **"Authorize with Google"** button
3. You'll be redirected to Google login
4. Grant the permissions requested
5. After success, you'll see ✅ **"Authenticated!"** message
6. Token is automatically saved to `.token.json`

### Token Refresh

Your token refreshes automatically when needed. If it expires, just delete `.token.json` and re-authenticate via the portal.

### For Development/Testing

Use environment variable `GOOGLE_TOKEN_JSON` to pass token as JSON string instead of file:

```bash
export GOOGLE_TOKEN_JSON='{"token":"...","refresh_token":"...","...":"..."}'
bun run src/index.ts
```

---

## For Developers - Setup

### Setup Development Environment

```bash
git clone https://github.com/tannht/gg-workspace-mcp.git
cd gg-workspace-mcp
bun install
cp .env.example .env
# Edit .env with your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
```

### Run Locally

```bash
bun run src/index.ts
```

### Build (Optional)

We use Bun to run TypeScript directly, but if you want to bundle it:

```bash
bun build src/index.ts --outdir ./dist --target node
node dist/index.js
```

### Project Structure

```
gg-workspace-mcp/
├── src/
│   ├── index.ts             # MCP server entry point + all tools
│   └── auth.ts              # OAuth portal & credential handling
├── bin/
│   └── cli.js               # CLI executable wrapper
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── MCP_CLIENTS.md           # Client configuration (25+ clients)
└── .env.example             # Environment variable template
```

---

## Troubleshooting

| ❌ Problem | ✅ Solution |
|---------|----------|
| `403: access_denied` | Add your email to **Test users** in OAuth consent screen |
| `401: Invalid credentials` | Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct |
| `403: API not enabled` | Enable the API in [API Library](https://console.cloud.google.com/apis/library) |
| `Token expired` | Delete `.token.json` and re-authenticate via http://localhost:3838 |
| Can't access http://localhost:3838 | Check if port 3838 is free. Change with `AUTH_PORT=8080` |
| `redirect_uri_mismatch` | Ensure OAuth app type is **Desktop app**, not Web |

---

## OAuth Scopes Reference

When you authorize, the server requests the following permissions:

| Scope | Purpose |
|-------|---------|
| `gmail.modify` | Read and send emails |
| `gmail.labels` | Manage labels |
| `gmail.settings.basic` | Read Gmail settings |
| `drive` | Search files in Google Drive |
| `calendar` | Read and create calendar events |
| `documents` | Google Docs access |
| `spreadsheets` | Google Sheets access |
| `presentations` | Google Slides access |
