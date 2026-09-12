// Node-only sync wrapper around loadPEFromBytes. Browser code should import
// loadPEFromBytes directly and pass bytes from fetch().
import { readFileSync } from "node:fs";
import { loadPEFromBytes } from "./loader.js";

export function loadPE(path) {
  return loadPEFromBytes(readFileSync(path));
}

// Re-export the pure entry point for callers that want both.
export { loadPEFromBytes };
