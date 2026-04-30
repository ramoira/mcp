# @ramoira/mcp

MCP server exposing the Ramoira brand schema specification as tools and resources.

Any MCP-compatible client (Claude Desktop, Cursor, Windsurf, etc.) can connect to this server and use it to generate, validate, or reason about Ramoira brand schemas — without needing the CLI installed.

## What it exposes

### Tools

| Tool | Description |
|---|---|
| `get_spec_overview` | High-level explanation of the schema format, its five layers, and key concepts. Start here. |
| `get_layer_spec(layer)` | Full field definitions for one layer: `identity`, `narrative`, `voice`, `commercial`, or `governance`. |
| `get_valid_enums()` | All valid enum values for every constrained field, with field paths. |
| `get_example_schema()` | A high-quality worked example (Rolex) showing what well-populated fields look like. |
| `search_spec(query)` | Keyword search across all spec documentation. |

### Resources

| URI | Description |
|---|---|
| `ramoira://spec` | Spec overview as a plain text resource. |
| `ramoira://enums` | Valid enum values as a JSON resource. |

## How it fits into Ramoira

```
ramoira/brand-schema-spec   ← the spec (source of truth)
        │
        ▼
ramoira/mcp                 ← this package
  serves the spec as MCP tools so any LLM can consume it
        │
        ├─► Claude Desktop / Cursor / any MCP client
        │     Any LLM session can look up the spec on demand
        │
        └─► ramoira/cli (internally)
              ramoira init uses the same tool set locally
              to give Claude spec access during schema generation
```

The CLI's generator mirrors this tool set locally (no network dependency) so `ramoira init` works offline. This server is for external LLM workflows — any agent that needs to generate or validate a schema can connect here instead of inlining the spec in its prompt.

## Install

```bash
npm install -g @ramoira/mcp
```

Or run directly without installing:

```bash
npx @ramoira/mcp
```

## Configure in Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "ramoira": {
      "command": "npx",
      "args": ["@ramoira/mcp"]
    }
  }
}
```

## Configure in Cursor / VS Code

Add to your MCP settings:

```json
{
  "ramoira": {
    "command": "npx",
    "args": ["@ramoira/mcp"]
  }
}
```

## Public HTTP hosting

The server currently uses stdio transport, which works for local clients. To serve it publicly over HTTP, replace the transport in `src/server.ts`:

```ts
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const transport = new StreamableHTTPServerTransport({ port: 3000 });
await server.connect(transport);
```

Then deploy to any Node.js host. Clients connect to `https://mcp.ramoira.com` (or wherever it's hosted) via the MCP HTTP client.

## Development

```bash
npm install
npm run dev     # run via tsx (no build step)
npm run build   # compile to dist/
```
