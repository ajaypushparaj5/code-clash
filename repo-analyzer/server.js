import express from "express"
import dotenv from "dotenv"

dotenv.config({ path: "../.env" })

console.log("URL:", process.env.VITE_SUPABASE_URL)
console.log("KEY:", process.env.VITE_SUPABASE_ANON_KEY)

const app = express()  

const PORT = 3000

// test route
app.get("/", (req, res) => {
  res.send("Repo Analyzer Server Running 🚀")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})