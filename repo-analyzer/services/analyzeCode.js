export function analyzeCode(code) {

  let issues = []

  if (code.includes("console.log")) {
    issues.push("Debug statement found")
  }

  const loopCount = (code.match(/for/g) || []).length

  if (loopCount > 1) {
    issues.push("Possible nested loop")
  }

  if (code.includes("var ")) {
    issues.push("Use let or const instead of var")
  }

  return issues
}