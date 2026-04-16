/**
 * Concise integration examples for each framework × payment-protocol cell.
 *
 * Shape of the truth:
 *   - The **framework** determines the wrapper call (which adapter from
 *     @atrib/agent or @atrib/mcp you use).
 *   - The **payment protocol** is auto-detected at runtime by @atrib/agent's
 *     transaction detector, so no user code changes per protocol. We still
 *     annotate the snippet with a short comment that names what's being
 *     recognized on the response, because that's the "aha" moment:
 *     you didn't write the protocol code, atrib picks it up.
 */

import type { Framework, Protocol } from "./data"

/** Per-framework integration snippet. The variable parts users would edit
 *  are kept obvious. Each snippet fits in 8 lines or fewer. */
const FRAMEWORK_SNIPPETS: Record<Framework, string> = {
  MCP: `import { atrib } from "@atrib/mcp"

const server = new McpServer({ name: "my-tool" })
server.use(atrib())`,

  "Claude Agent SDK": `import { atrib, wrapMcpClient } from "@atrib/agent"

const interceptor = atrib({
  creatorKey: process.env.ATRIB_PRIVATE_KEY,
})
const client = wrapMcpClient(rawClient, interceptor)`,

  "Cloudflare Agents": `import { atrib, attributeCloudflareAgentMcp } from "@atrib/agent"

class WeatherAgent extends Agent<Env> {
  interceptor = atrib({ creatorKey: this.env.ATRIB_PRIVATE_KEY })
  async onStart() {
    await this.addMcpServer("weather", "https://weather.example/mcp")
    attributeCloudflareAgentMcp(this, { interceptor: this.interceptor })
  }
}`,

  "Vercel AI SDK": `import { atrib, attributeVercelAiSdkMcp } from "@atrib/agent"

const interceptor = atrib({ creatorKey: process.env.ATRIB_PRIVATE_KEY })
const client = await experimental_createMCPClient({ transport })
attributeVercelAiSdkMcp(client, { interceptor })`,

  LangChain: `import { atrib, attributeLangchainMcp } from "@atrib/agent"

const interceptor = atrib({ creatorKey: process.env.ATRIB_PRIVATE_KEY })
const multi = new MultiServerMCPClient(config)
await attributeLangchainMcp(multi, { interceptor })`,

  Mastra: `import { atrib, wrapMcpClient } from "@atrib/agent"

const interceptor = atrib({ creatorKey: process.env.ATRIB_PRIVATE_KEY })
// Mastra's MCP client is @modelcontextprotocol/sdk-compatible
const client = wrapMcpClient(mastraClient, interceptor)`,
}

/** Per-protocol auto-detection note. Appended as a trailing comment line. */
const PROTOCOL_NOTES: Record<Protocol, string> = {
  ACP: "ACP charge responses auto-detected on tool returns.",
  UCP: "UCP settlement receipts auto-detected on tool returns.",
  x402: "x402 HTTP 402 responses auto-detected on tool returns.",
  MPP: "MPP tool-call receipts auto-detected on tool returns.",
  AP2: "AP2 agent-payment envelopes auto-detected on tool returns.",
  "a2a-x402": "A2A-x402 hybrid payments auto-detected on tool returns.",
}

export interface ExampleSnippet {
  code: string
  language: string
  framework: Framework
  protocol: Protocol
}

export interface FrameworkSnippet {
  code: string
  language: string
  framework: Framework
}

/**
 * Build the integration snippet for a given framework × protocol cell.
 * Returns the framework's setup code with a protocol-specific comment
 * line appended so the user sees what's recognized for free.
 *
 * Kept for any caller that still wants the per-cell rendering. The
 * landing-page Matrix component pins by framework only and uses
 * frameworkExample() instead.
 */
export function exampleFor(framework: Framework, protocol: Protocol): ExampleSnippet {
  const base = FRAMEWORK_SNIPPETS[framework]
  const note = PROTOCOL_NOTES[protocol]
  return {
    code: `${base}\n\n// ${note}`,
    language: "ts",
    framework,
    protocol,
  }
}

/**
 * Build the framework-only integration snippet. Used by the Matrix
 * when a row is pinned. No protocol comment is appended because the
 * point of pinning the row is to show that the protocol axis is
 * auto-detected at runtime, not configured per-cell.
 */
export function frameworkExample(framework: Framework): FrameworkSnippet {
  return {
    code: FRAMEWORK_SNIPPETS[framework],
    language: "ts",
    framework,
  }
}
