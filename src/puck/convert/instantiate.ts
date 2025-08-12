import { ensurePuckIds, type PuckData } from "@/puck/utils/ensureIds"

// Instantiate components in the visual builder from parsed JSON
export function createInstancesFromJson(config: any, json: PuckData): PuckData {
  // Basic validation: ensure types exist in config (if provided)
  const validTypes = config?.components ? new Set(Object.keys(config.components)) : null

  const filtered = !validTypes
    ? json
    : {
        ...json,
        content: (json.content || []).filter((b) => validTypes.has(b.type)),
      }

  // Ensure props.id for all blocks
  return ensurePuckIds(filtered)
}
