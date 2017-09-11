const chalk = require('chalk')

const 
    error = chalk.bgRed.bold,
    success = chalk.blue.bold,
    s = mssg => console.log(success(mssg)),
    e = mssg => console.log(error(mssg))

module.exports = {
    error, 
    success,
    s,
    e
}