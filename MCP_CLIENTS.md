# MCP Client Configuration Guide

Complete configuration guide for **gg-workspace-mcp** across all major MCP-compatible clients.

**Prerequisite:** Ensure you have [Bun](https://bun.sh) installed (`curl -fsSL https://bun.sh/install | bash`).

> Replace `/path/to/gg-workspace-mcp` with the actual absolute path to your cloned repository.

---

## Claude Desktop

**File:** `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows)

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Cursor

**File:** `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project)

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## VS Code (Copilot)

**File:** `.vscode/mcp.json` in your workspace

```json
{
  "servers": {
    "gg-workspace-mcp": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Visual Studio 2022

**Path:** Tools > Options > GitHub Copilot > MCP Servers

```json
{
  "servers": {
    "gg-workspace-mcp": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Copilot Coding Agent

**Path:** Repository > Settings > Copilot > Coding agent > MCP configuration

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Copilot CLI

**File:** `~/.copilot/mcp-config.json`

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "type": "local",
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Windsurf

**File:** `~/.codeium/windsurf/mcp_config.json`

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Kiro

**File:** `.kiro/settings/mcp.json` in your project

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

---

## Roo Code / Cline

**Path:** MCP Server panel > Edit MCP Settings

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## JetBrains AI Assistant

**Path:** Settings > Tools > AI Assistant > Model Context Protocol (MCP) > Add > As JSON

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Gemini CLI

**File:** `~/.gemini/settings.json`

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## OpenAI Codex

**File:** `codex.toml` or `~/.codex/config.toml`

```toml
[mcp_servers.gg-workspace-mcp]
command = "bun"
args = ["run", "/path/to/gg-workspace-mcp/src/index.ts"]

[mcp_servers.gg-workspace-mcp.env]
GOOGLE_CLIENT_ID = "your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "your-client-secret"
```

---

## Augment Code

**File:** VS Code `settings.json`

```json
{
  "augment.advanced": {
    "mcpServers": [
      {
        "name": "gg-workspace-mcp",
        "command": "bun",
        "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
        "env": {
          "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
          "GOOGLE_CLIENT_SECRET": "your-client-secret"
        }
      }
    ]
  }
}
```

---

## Zed

**File:** `~/.config/zed/settings.json`

```json
{
  "context_servers": {
    "gg-workspace-mcp": {
      "command": {
        "path": "bun",
        "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
        "env": {
          "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
          "GOOGLE_CLIENT_SECRET": "your-client-secret"
        }
      }
    }
  }
}
```

---

## Trae

**Path:** Settings > MCP > Add manually

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Opencode

```json
{
  "mcp": {
    "gg-workspace-mcp": {
      "type": "local",
      "command": ["bun", "run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      },
      "enabled": true
    }
  }
}
```

---

## Qwen Code

**File:** `~/.qwen/settings.json` (global) or `.qwen/settings.json` (project)

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Amazon Q Developer CLI

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Warp

**Path:** Settings > AI > Manage MCP servers

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Amp

```bash
amp mcp add gg-workspace-mcp -- bun run /path/to/gg-workspace-mcp/src/index.ts
```

---

## LM Studio

**Path:** Program > Install > Edit mcp.json

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Perplexity Desktop

**Path:** Perplexity > Settings > Connectors > Add MCP

```json
{
  "mcpServers": {
    "gg-workspace-mcp": {
      "command": "bun",
      "args": ["run", "/path/to/gg-workspace-mcp/src/index.ts"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

---

## Docker

*Coming soon.*
