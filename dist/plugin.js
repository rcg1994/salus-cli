'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _get = require('./utils/get');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = async projectName => {
  // 项目不存在
  if (!_fs2.default.existsSync(projectName)) {
    // 命令行交互
    _inquirer2.default.prompt([{
      name: 'key',
      message: 'Please enter the salus plugin key '
    }]).then(answer => {
      // 下载模板 选择模板
      // 通过配置文件，获取模板信息
      const loading = (0, _ora2.default)('downloading template ...');
      loading.start();
      return (0, _get.downloadLocal)(projectName).then(() => {
        loading.succeed();
        const fileName = `${projectName}/package.json`;
        if (_fs2.default.existsSync(fileName)) {
          const data = _fs2.default.readFileSync(fileName).toString();
          const json = JSON.parse(data);
          json.name = projectName;
          json.description = answer.key;
          // 修改项目文件夹中 package.json 文件
          _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
          console.log(_logSymbols2.default.success, _chalk2.default.green(`Success! you can check with: cd ./${projectName}`));
        }
        process.exit();
      }, () => {
        loading.fail();
      });
    });
  } else {
    // 项目已经存在
    console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
  }
};

const plugin = async (action, projectName) => {
  console.log(`start gen ${action} ${projectName}`);
  switch (action) {
    case 'init':
      await init(projectName);
      break;
    default:
      break;
  }
};
module.exports = plugin;