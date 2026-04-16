/**
 * Concise integration examples per framework.
 *
 * Shape of the truth:
 *   - The **framework** determines the wrapper call (which adapter from
 *     @atrib/agent or @atrib/mcp you use). This is what the user writes.
 *   - The **payment protocol** is auto-detected at runtime by @atrib/agent's
 *     transaction detector, so no user code changes per protocol. The
 *     landing-page Matrix pins by row (framework) for this reason.
 */

import type { Framework } from "./data"

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

export interface FrameworkSnippet {
  code: string
  language: string
  framework: Framework
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
