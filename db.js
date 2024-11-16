const { Sequelize } = require('sequelize')

require('dotenv').config()

const url = process.env.URL || 'postgres://postgres:12345@localhost:5432/addimg'

const sequelize = new Sequelize(url, {
  dialect: 'postgres'
})

async function connect() {
  try {
    await sequelize.authenticate()
    console.log('conectado!')
  } catch (err) {
    console.log('erro', err)
  }
}
connect()

module.exports = sequelize
