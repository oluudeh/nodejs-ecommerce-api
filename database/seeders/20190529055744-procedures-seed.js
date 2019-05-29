const fs = require('fs')
const path = require('path')

'use strict';

const formatBlocks = (content) => {
  //return new Promise((resolve, reject) => {
    const blocks = content.split("$$").filter(b => b.trim().length > 0)
    console.log('procuders blocks length ', blocks.length)
    return blocks.map(b => b.trim().concat('$$'))
    //resolve(blocks)
  //})
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, 'sql/procedures.sql')
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        const blocks = formatBlocks(data)
        blocks.forEach(block => {
          queryInterface.sequelize.query(block).then(([result, metadata]) => {
            console.log('results  ', result)
            console.log('metadata  ', metadata)
          }).catch(err => {
            console.log(block)
            console.log('error   ', err)
            reject(err)
          })  
        })
      })
    })
  },

  down: (queryInterface, Sequelize) => {
  }
};
