# 🚀 CodeQuest AI

CodeQuest AI is a **gamified AI-powered coding assistant** that helps developers improve their programming skills through **real-time code analysis, concise feedback, and interactive challenges**.

The platform analyzes user code using AI and provides short actionable insights while rewarding users with **XP, achievements, and coding challenges**.

---

# 📌 Features

* Real-time AI code analysis
* Syntax and logic error detection
* Time & space complexity analysis
* Optimization suggestions
* Gamified learning with XP and achievements
* Interactive coding challenges

---

# 🛠 Tech Stack

**Frontend**

* React
* Monaco Editor
* Tailwind CSS

**Backend / AI**

* Node.js
* Gemini API

---

# ⚙️ Prerequisites

Make sure you have the following installed:

* Node.js (v18 or later)
* npm or yarn
* Gemini API key

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

You can obtain the API key from **Google AI Studio**.

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/codequest-ai.git
```

Navigate to the project directory:

```bash
cd codequest-ai
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

The application will start at:

```
http://localhost:5173
```

---

# 🧑‍💻 How to Use

1. Open the application in your browser.
2. Write or paste your code into the editor.
3. The AI analyzes the code automatically.
4. Fix errors and optimize the code based on suggestions.
5. Earn XP and unlock achievements by improving code quality.

---

# 📁 Project Structure

```
src/
 ├── components
 ├── services
 │    └── aiAnalysis.js
 ├── pages
 ├── App.jsx
 └── main.jsx
```

Key modules:

* **AI Analysis Service** – handles interaction with the Gemini API
* **Editor Component** – Monaco editor integration
* **Gamification System** – XP, achievements, and challenge tracking

---

# 🧪 Example AI Output

```json
{
  "issues": [
    {
      "title": "Missing Semicolon",
      "type": "error",
      "message": "Add ';' after console.log"
    }
  ]
}
```

---

# 🚧 Future Improvements

* Multiplayer coding challenges
* personlized Ai learning
* VS Code extension And github intergration

---

