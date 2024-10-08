const chalk = require('chalk');
const boxen = require("boxen");
function log(data) {
  console.log(chalk.bold.blue('[ MUICHIRO ] » ') + chalk.bold.hex("#9DD0CC").bold(data))
}
function err(data) {
  console.log(chalk.bold.red("[ ERROR ] » ") + chalk.bold.hex("#E08282")(JSON.stringify(data)));
}
function gban(data) {
  console.log(chalk.bold.hex("#99edc3").bold('[ GBAN ] » ', (chalk.bold.hex("#21349E").bold(data))))
}
function loaded(data) {
  console.log(chalk.bold.blue('[ MUICHIRO ] » ') + chalk.bold.hex("#9DD0CC").bold(data));
}
function cmdloaded(data) {
  console.log(chalk.bold.hex("#5A9786")("[ BOT ]") + " " + chalk.bold.hex("#9DD0CC")(data))
}
function message(data) {
  console.log(chalk.bold.blue(boxen(data, { padding: 1, margin: 1, borderStyle: 'double', title: 'MESSAGES', titleAlignment: 'center', align: 'center' })))
}
module.exports = { log, err, gban, loaded, cmdloaded, message };
