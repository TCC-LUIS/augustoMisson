const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define(
  'Whriter',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    sumary: {
      type: Sequelize.STRING(150),
      allowNull: true
    },
    favorite_book: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ratings: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    writed_books: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    profile_pictures: {
      type: Sequelize.BLOB,
      allowNull: true
    }
  },
  {
    tableName: 'whriter', // Força o nome da tabela como 'whriter'
    freezeTableName: true // Impede pluralização automática
  }
)
db.sync()
  .then(() => {
    console.log('Tabelas sincronizadas')
  })
  .catch(error => {
    console.error('Erro ao sincronizar tabelas:', error)
  })

module.exports = User
