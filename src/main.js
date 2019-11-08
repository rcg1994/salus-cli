import program from 'commander'
import { VERSION } from './utils/const'
import apply from './index'
import chalk from 'chalk'

/**
 * salus commands
 *    - config
 *    - plugin
 */

const actionMap = {
  plugin: {
    action: 'plugin <action> <projectName>',
    description: 'generate a new project for salus plugin',
    usages: [
      'salus plugin init <projectName>'
    ]
  },
  config: {
    action: 'config',
    alias: 'cfg',
    description: 'config .salusrc',
    usages: [
      'salus config set <k> <v>',
      'salus config get <k>',
      'salus config remove <k>'
    ]

  }
  // other commands
}

// 添加 init / config 命令
Object.keys(actionMap).forEach((action) => {
  program.command(actionMap[action].action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias) // 别名
    .action(() => {
      switch (action) {
        case 'config':
          // 配置
          apply(action, ...process.argv.slice(3))
          break
        case 'plugin':
          apply(action, ...process.argv.slice(3))
          break
        default:
          break
      }
    })
})

function help () {
  console.log('\r\nUsage:')
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].usages.forEach(usage => {
      console.log('  - ' + usage)
    })
  })
  console.log('\r')
}
program.usage('<command> [options]')
// salus -h
program.on('-h', help)
program.on('--help', help)
// salus -V   VERSION 为 package.json 中的版本号
program.version(VERSION, '-V --version').parse(process.argv)

// salus 不带参数时
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green)
}
function make_green (txt) {
  return chalk.green(txt)
}
