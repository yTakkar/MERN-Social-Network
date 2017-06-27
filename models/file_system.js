const fs = require('fs')
const util = require('util')

const dlt_all_of_folder = folder => {
    return new Promise((resolve, reject) => {

        let read = util.promisify(fs.readdir)
        read(folder)
            .then(items => {
                items.map(item => {
                    fs.unlink(folder+item, err => {
                        err ? reject(err) : resolve('Deleted!')
                    })
                })
            })
        
    })
}

module.exports = {
    dlt_all_of_folder
}