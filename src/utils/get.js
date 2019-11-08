// import { getAll } from './rc'
import downloadGit from 'download-git-repo'

export const downloadLocal = async (projectName) => {
  // const config = await getAll()
  // const api = `${config.registry}/${templateName}`
  const api = 'rcg1994/salus-plugin-template'
  return new Promise((resolve, reject) => {
    // projectName 为下载到的本地目录
    downloadGit(api, projectName, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}
