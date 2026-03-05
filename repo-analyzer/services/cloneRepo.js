import simpleGit from "simple-git"

const git = simpleGit()

export async function cloneRepo(repoUrl) {

  const path = "./tempRepo"

  await git.clone(repoUrl, path)

  return path
}