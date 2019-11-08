import program from 'commander'
import ora from 'ora'
import inquirer from 'inquirer'
import fs from 'fs'
import chalk from 'chalk'
import symbol from 'log-symbols'
import { downloadLocal } from './utils/get'

const init = async (projectName) => {
// 项目不存在
  if (!fs.existsSync(projectName)) {
  // 命令行交互
    inquirer.prompt([
      {
        name: 'key',
        message: 'Please enter the salus plugin key '
      }
    ]).then((answer) => {
    // 下载模板 选择模板
    // 通过配置文件，获取模板信息
      const loading = ora('downloading template ...')
      loading.start()
      return downloadLocal(projectName).then(() => {
        loading.succeed()
        const fileName = `${projectName}/package.json`
        if (fs.existsSync(fileName)) {
          const data = fs.readFileSync(fileName).toString()
          const json = JSON.parse(data)
          json.name = projectName
          json.description = answer.key
          // 修改项目文件夹中 package.json 文件
          fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8')
          console.log(symbol.success, chalk.green(`Success! you can check with: cd ./${projectName}`))
        }
        process.exit()
      }, () => {
        loading.fail()
      })
    })
  } else {
  // 项目已经存在
    console.log(symbol.error, chalk.red('The project already exists'))
  }
}

const plugin = async (action, projectName) => {
  console.log(`start gen ${action} ${projectName}`)
  switch (action) {
    case 'init':
      await init(projectName)
      break
    default:
      break
  }
}
module.exports = plugin
