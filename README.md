# gg-workspace-mcp 🐶🚀

The **fastest**, most lightweight **Google Workspace MCP Server** powered by [Bun](https://bun.sh/). ⚡️

Manage your entire Google Workspace (Gmail, Calendar, Drive, Docs, Sheets, Slides) directly through natural language with AI assistants like Claude, Cursor, and more.

---

## 🌟 Features

- **⚡ Blazing Fast:** Built with Bun for near-instant execution and low overhead.
- **🔐 1-Click Auth:** Built-in Auth Portal for effortless Google Account connection.
- **📦 Zero-Config:** Use via `npx` or `bunx` with no manual installation needed.
- **🛠️ Comprehensive:** 20+ tools covering the essential Google Workspace ecosystem.
- **🛡️ Secure:** Pure TypeScript implementation with official Google SDKs.

---

## 🚀 Quick Start (via npx / bunx)

You don't even need to clone this repo! Just run it directly:

### 1. Configure Credentials
Set your Google OAuth credentials as environment variables:
```bash
export GOOGLE_CLIENT_ID="your_client_id"
export GOOGLE_CLIENT_SECRET="your_client_secret"
export AUTH_PORT=3838
```

### 2. Launch the Server
```bash
npx gg-workspace-mcp
# or
bunx gg-workspace-mcp
```

### 3. Authorize
Open `http://localhost:3838` in your browser to link your Google account. One click and you're done! ✅

---

## 🤖 MCP Client Integration

### Claude Desktop
Add this to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "gg-workspace": {
      "command": "npx",
      "args": ["-y", "gg-workspace-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "your_id",
        "GOOGLE_CLIENT_SECRET": "your_secret",
        "AUTH_PORT": "3838"
      }
    }
  }
}
```

### Cursor / Cline / Roo Code
Configure the server using the following settings:
- **Command:** `npx`
- **Args:** `-y`, `gg-workspace-mcp`
- **Environment Variables:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

---

## 🧰 Available Tools

| Category | Available Tools |
| :--- | :--- |
| **📧 Gmail** | `get_account_info`, `send_email`, `list_gmail_labels`, `create_gmail_label` |
| **📅 Calendar** | `list_calendar_events`, `create_calendar_event` |
| **📁 Drive** | `list_drive_folders`, `search_drive` |
| **📝 Docs** | `create_document`, `get_document`, `append_to_document` |
| **📊 Sheets** | `create_spreadsheet`, `read_spreadsheet`, `update_spreadsheet`, `append_to_spreadsheet` |
| **🖼️ Slides** | `create_presentation`, `get_presentation`, `add_slide` |

---

## 🛠️ Local Development

If you want to contribute or customize the server:

```bash
git clone https://github.com/tannht/gg-workspace-mcp.git
cd gg-workspace-mcp
bun install
bun src/index.ts
```

---

## 📄 License
MIT © [Hoang Tan](https://github.com/tannht)

Built with 🦴 by **PubPug AI**. Gâu gâu! 🐶🚀
