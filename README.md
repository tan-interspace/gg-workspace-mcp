# gg-workspace-mcp 🐶🚀

The **fastest**, most lightweight **Google Workspace MCP Server** powered by [Bun](https://bun.sh/). ⚡️

Manage your entire Google Workspace (Gmail, Calendar, Drive, Docs, Sheets, Slides) directly through natural language with AI assistants like Claude, Cursor, and more.

> **📚 Documentation**
> - **[Installation & User Guide](GUIDE.md)** - Full setup instructions, authentication, and troubleshooting.
> - **[Client Configuration](MCP_CLIENTS.md)** - Ready-to-use configs for Claude, Cursor, VS Code, JetBrains, and 20+ other clients.

---

## 🌟 Features

- **⚡ Blazing Fast:** Built with Bun for near-instant execution and low overhead.
- **🔐 1-Click Auth:** Built-in Auth Portal for effortless Google Account connection.
- **🛠️ Comprehensive:** 20+ tools covering the essential Google Workspace ecosystem.
- **🛡️ Secure:** Pure TypeScript implementation with official Google SDKs.

---

## 🚀 Quick Start

**Prerequisite:** [Bun](https://bun.sh) installed.

1. **Clone & Install**
   ```bash
   git clone https://github.com/tannht/gg-workspace-mcp.git
   cd gg-workspace-mcp
   bun install
   ```

2. **Set Credentials**
   ```bash
   cp .env.example .env
   # Edit .env and update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
   ```
   *(See [GUIDE.md](GUIDE.md) for how to get these credentials)*

3. **Run Server**
   ```bash
   bun run src/index.ts
   ```

---

## 🤖 MCP Client Integration

We support **25+ clients** including Claude Desktop, Cursor, VS Code, JetBrains, and more.

👉 **[Click here to view the full Client Configuration Guide (MCP_CLIENTS.md)](MCP_CLIENTS.md)**

**Quick Example (Claude Desktop):**
```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "...",
        "GOOGLE_CLIENT_SECRET": "..."
      }
    }
  }
}
```

---

## 🧰 Available Tools

| Category | Available Tools |
| :--- | :--- |
| **📧 Gmail** | `get_account_info`, `send_email` |
| **📅 Calendar** | `list_calendar_events`, `create_calendar_event` |
| **📁 Drive** | `list_drive_folders`, `search_drive` |
| **📝 Docs** | `create_document`, `get_document`, `append_to_document` |
| **📊 Sheets** | `create_spreadsheet`, `read_spreadsheet`, `update_spreadsheet`, `append_to_spreadsheet` |
| **🖼️ Slides** | `create_presentation`, `get_presentation`, `add_slide` |

---

## 🛠️ Local Development

```bash
# Run locally
bun run src/index.ts

# Run tests (if added)
bun test
```

For detailed troubleshooting and development setup, see [GUIDE.md](GUIDE.md).

---

## 📄 License
MIT © [Hoang Tan](https://github.com/tannht)

Built with 🦴 by **PubPug AI**. Gâu gâu! 🐶🚀
