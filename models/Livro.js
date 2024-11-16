const { DataTypes } = require('sequelize') // Use DataTypes em vez de Sequelize diretamente
const db = require('../db')
const User = require('./usuario') // Certifique-se de que o modelo 'User' está correto

// Definição do modelo Livro
const Book = db.define('book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pages: {
    type: DataTypes.INTEGER, // Troquei para INTEGER para melhor refletir número de páginas
    allowNull: false
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false
  },
  writer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT, // Use TEXT para sinopses longas
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT, // Use FLOAT para decimais menores, caso necessário
    allowNull: true
  },
  indicative_classification: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER, // Pode ser mapeado para valores numéricos ou enums
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cover: {
    type: DataTypes.BLOB('long'), // Adicione 'long' para suportar arquivos maiores
    allowNull: true
  }
})

// Configuração de relacionamento Livro -> User
Book.belongsTo(User, {
  foreignKey: 'idUser', // Define a chave estrangeira
  as: 'user', // Nome do relacionamento no código
  onDelete: 'CASCADE', // Remove livros se o usuário for excluído
  onUpdate: 'CASCADE' // Atualiza a chave estrangeira se o ID do usuário mudar
})

// Configuração de relacionamento User -> Livros
User.hasMany(Book, {
  foreignKey: 'idUser', // Define a chave estrangeira
  as: 'livros' // Nome do relacionamento no código
})

// Sincronizar o modelo com o banco de dados
module.exports = Book
