import fs from "fs"
import path from "path"

export function scanFiles(dir) {

  let files = []

  const items = fs.readdirSync(dir)

  items.forEach(item => {

    const fullPath = path.join(dir, item)

    if (fs.statSync(fullPath).isDirectory()) {

      files = files.concat(scanFiles(fullPath))

    } else if (fullPath.endsWith(".js")) {

      files.push(fullPath)

    }

  })

  return files
}