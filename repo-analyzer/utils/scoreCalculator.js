export function calculateScore(issueCount) {

  let score = 100 - issueCount * 5

  if (score < 0) score = 0

  return score
}