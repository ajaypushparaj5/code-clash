import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import axios from "axios"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000


// Test route
app.get("/", (req, res) => {
  res.send("Repo Analyzer Server Running 🚀")
})


// Repo Analyzer API
app.post("/analyze-repo", async (req, res) => {

  try {

    const { repoUrl } = req.body

    if (!repoUrl) {
      return res.status(400).json({ error: "Repository URL required" })
    }

    // Extract owner and repo
    const repoPath = repoUrl.replace("https://github.com/", "")
    let [owner, repo] = repoPath.split("/")

    repo = repo.replace(".git", "").trim()

    // Get all repo files recursively
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`

    const response = await axios.get(apiUrl)

    const files = response.data.tree

    console.log("Files found:", files.length)

    let filesScanned = 0
    let issues = []

    for (const file of files) {

      if (
        file.path.endsWith(".js") ||
        file.path.endsWith(".ts") ||
        file.path.endsWith(".py") ||
        file.path.endsWith(".ipynb") ||
        file.path.endsWith(".java") ||
        file.path.endsWith(".cpp")
      ) {

        filesScanned++

        const fileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${file.path}`

        try {

          const fileContent = await axios.get(fileUrl)

          const code = fileContent.data

          // Debug logs
          if (code.includes("console.log")) {
            issues.push(`Debug log found in ${file.path}`)
          }

          if (code.includes("print(")) {
            issues.push(`Debug print found in ${file.path}`)
          }

          if (code.includes("var ")) {
            issues.push(`Use let/const instead of var in ${file.path}`)
          }

          if (code.includes("eval(")) {
            issues.push(`Security risk: eval() used in ${file.path}`)
          }

        } catch (err) {
          console.log("Could not read:", file.path)
        }

      }

    }

    const score = Math.max(100 - issues.length * 5, 0)

    res.json({
      repository: `${owner}/${repo}`,
      files_scanned: filesScanned,
      issues_found: issues.length,
      issues,
      score
    })

  } catch (error) {

    console.error(error.message)

    res.status(500).json({
      error: "Failed to analyze repository"
    })

  }

})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})