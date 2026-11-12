import { existsSync } from "node:fs";
import path from "node:path";

/** True when a file exists in /public (checked on the server). */
export function publicFileExists(publicPath: string) {
  return existsSync(path.join(process.cwd(), "public", publicPath));
}
