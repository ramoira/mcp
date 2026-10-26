# @ramoira/mcp

> **Archived prototype. Not published to npm, and not maintained.** This server serves the schema format Ramoira used before spec 3.0: layers of facts and voice with scored personality dimensions, and no rule registry. That format has been replaced. The current one is [spec 3.2.0](https://github.com/ramoira/brand-schema-spec), and the [CLI](https://github.com/ramoira/cli) drafts and checks against it. The text this server returns also makes claims Ramoira no longer makes (for example "open standard" and "without hallucination"). Do not build on it. `npm install @ramoira/mcp` and `npx @ramoira/mcp` do not work, because the package was never published.

This repository is kept as a record of an early MCP server that exposed that earlier specification as tools and resources.

## What it exposes

### Tools

| Tool | Description |
|---|---|
| `get_spec_overview` | An overview of the earlier schema format and its layers. |
| `get_layer_spec(layer)` | Field definitions for one layer: `identity`, `narrative`, `voice`, `commercial`, or `governance`. |
| `get_valid_enums()` | The enum values the earlier format allowed, with field paths. |
| `search_spec(query)` | Keyword search across that documentation. |

### Resources

| URI | Description |
|---|---|
| `ramoira://spec` | The overview as a plain text resource. |
| `ramoira://enums` | The enum values as a JSON resource. |

## Run it from source

It uses stdio transport, so it works with local MCP clients.

```bash
npm install
npm run build   # compile to dist/
npm start       # node dist/server.js
npm run dev     # run via tsx, no build step
```

To point a local client at your build, use the path to `dist/server.js`:

```json
{
  "mcpServers": {
    "ramoira-archived": {
      "command": "node",
      "args": ["/path/to/mcp/dist/server.js"]
    }
  }
}
```
