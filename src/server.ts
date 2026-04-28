#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { LAYER_SPECS, VALID_ENUMS, SPEC_OVERVIEW, ROLEX_EXAMPLE } from "./spec.js";

// ── Search helper ─────────────────────────────────────────────────────────────

function searchSpec(query: string): string {
  const q = query.toLowerCase();
  const allContent: { section: string; content: string }[] = [
    { section: "overview", content: SPEC_OVERVIEW },
    ...Object.entries(LAYER_SPECS).map(([layer, content]) => ({
      section: `layer:${layer}`,
      content,
    })),
    { section: "enums", content: JSON.stringify(VALID_ENUMS, null, 2) },
  ];

  const hits: string[] = [];

  for (const { section, content } of allContent) {
    const lines = content.split("\n");
    const matchingLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes(q)) {
        const start = Math.max(0, i - 1);
        const end = Math.min(lines.length - 1, i + 2);
        matchingLines.push(
          `[${section} line ${i + 1}]\n` + lines.slice(start, end + 1).join("\n"),
        );
      }
    }

    if (matchingLines.length > 0) {
      hits.push(matchingLines.slice(0, 5).join("\n\n"));
    }
  }

  if (hits.length === 0) {
    return `No matches found for "${query}" in the Ramoira spec.`;
  }

  return hits.join("\n\n---\n\n");
}

// ── Server setup ──────────────────────────────────────────────────────────────

const server = new McpServer({
  name: "ramoira",
  version: "0.1.0",
});

// ── Tools ─────────────────────────────────────────────────────────────────────

server.registerTool(
  "get_spec_overview",
  {
    description:
      "Get an overview of the Ramoira brand schema specification: what it is, its five layers, key concepts, and how to use it. Start here if you are unfamiliar with the format.",
    inputSchema: {},
  },
  async () => ({
    content: [{ type: "text", text: SPEC_OVERVIEW }],
  }),
);

server.registerTool(
  "get_layer_spec",
  {
    description:
      "Get the full field specification for one of the five Ramoira schema layers. Use this to understand the exact fields, shapes, and constraints required for each layer before generating or validating a schema.",
    inputSchema: {
      layer: z
        .enum(["identity", "narrative", "voice", "commercial", "governance"])
        .describe("The schema layer to retrieve the specification for."),
    },
  },
  async ({ layer }) => {
    const spec = LAYER_SPECS[layer];
    return {
      content: [{ type: "text", text: spec }],
    };
  },
);

server.registerTool(
  "get_valid_enums",
  {
    description:
      "Get all valid enum values for every constrained field in the Ramoira schema. Use this to verify that the values you are writing for enum fields are valid.",
    inputSchema: {},
  },
  async () => ({
    content: [{ type: "text", text: JSON.stringify(VALID_ENUMS, null, 2) }],
  }),
);

server.registerTool(
  "get_example_schema",
  {
    description:
      "Get a high-quality worked example of a Ramoira brand schema (Rolex). Use this to understand what well-populated fields look like in practice — the quality bar for voice examples, myth construction, governance constraints, and so on.",
    inputSchema: {},
  },
  async () => ({
    content: [{ type: "text", text: JSON.stringify(ROLEX_EXAMPLE, null, 2) }],
  }),
);

server.registerTool(
  "search_spec",
  {
    description:
      "Search across all Ramoira spec documentation for a keyword or field name. Use this when you need to find where a specific concept, field, or term is defined.",
    inputSchema: {
      query: z.string().describe("The keyword or field name to search for."),
    },
  },
  async ({ query }) => {
    const result = searchSpec(query);
    return {
      content: [{ type: "text", text: result }],
    };
  },
);

// ── Resources ─────────────────────────────────────────────────────────────────

server.registerResource(
  "spec-overview",
  "ramoira://spec",
  {
    description: "Overview of the Ramoira brand schema specification.",
    mimeType: "text/plain",
  },
  async () => ({
    contents: [{ uri: "ramoira://spec", text: SPEC_OVERVIEW, mimeType: "text/plain" }],
  }),
);

server.registerResource(
  "valid-enums",
  "ramoira://enums",
  {
    description: "All valid enum values for constrained fields in the Ramoira schema.",
    mimeType: "application/json",
  },
  async () => ({
    contents: [
      {
        uri: "ramoira://enums",
        text: JSON.stringify(VALID_ENUMS, null, 2),
        mimeType: "application/json",
      },
    ],
  }),
);

// ── Transport ─────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
