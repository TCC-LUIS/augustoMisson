const fs = require('fs')
const Book = require('../models/Livro')
const User = require('../models/usuario')

exports.create = async (req, res) => {
  try {
    const {
      title,
      publisher,
      type,
      indicative_classification,
      language,
      pages,
      synopsis,
      price
    } = req.body

    if (!title || !publisher || !type || !language || !price || !req.file) {
      return res.status(400).json({ message: 'Dados incompletos.' })
    }

    const cover = req.file

    // Ler e validar a capa do livro
    let coverData
    try {
      coverData = fs.readFileSync(cover.path)
      fs.unlinkSync(cover.path) // Remove o arquivo temporário após a leitura
    } catch (fileError) {
      console.error('Erro ao processar o arquivo da capa:', fileError)
      return res
        .status(500)
        .json({ message: 'Erro ao processar o arquivo da capa.' })
    }

    // Pegar o ID do usuário autenticado pelo token decodificado
    const decoded = req.user // Assumindo que o middleware de autenticação já populou `req.user`
    if (!decoded || !decoded.id) {
      console.warn('Usuário não autenticado ou token inválido.')
      return res.status(401).json({ message: 'Usuário não autenticado.' })
    }

    // Buscar o usuário pelo ID decodificado
    const user = await User.findOne({ where: { id: decoded.id } })
    if (!user) {
      console.warn(`Usuário com ID ${decoded.id} não encontrado.`)
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    // Criar o livro com a associação ao usuário
    const book = await Book.create({
      title,
      publisher,
      type,
      indicative_classification: indicative_classification
        ? Number(indicative_classification)
        : null,
      language,
      pages: pages ? Number(pages) : null,
      synopsis,
      price: Number(price),
      cover: coverData, // Armazena o arquivo da capa
      date: Date.now(),
      writer: user.name, // Associa o ID do usuário ao livro
      status: 1 // Definindo o status como 1 (ativo)
    })

    console.info(
      `Livro "${book.title}" criado com sucesso para o usuário ${user.email}.`
    )

    res.status(201).json({
      message: 'Livro criado com sucesso.',
      book: {
        id: book.id,
        title: book.title,
        writer: user.name
      }
    })
  } catch (err) {
    console.error('Erro ao salvar o livro:', err)
    res.status(500).json({ message: 'Erro ao salvar o livro.' })
  }
}

exports.getBooks = async (req, res) => {
  try {
    // Buscar o usuário pelo ID do token
    const user = await User.findByPk(req.userId) // Ajuste para `req.userId`
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    // Buscar todos os livros
    const books = await Book.findAll() // Ajuste conforme o modelo e consulta necessários

    // Formatar os livros com a capa convertida em base64 e outros campos
    const formattedBooks = books.map(book => ({
      id: book.id,
      title: book.title, // Nome do livro
      writer: book.writer, // Autor
      publisher: book.publisher, // Editora
      type: book.type, // Tipo
      language: book.language, // Idioma
      pages: book.pages, // Páginas
      date: book.date, // Data de publicação
      synopsis: book.synopsis, // Sinopse
      price: book.price, // Preço
      cover: book.cover ? book.cover.toString('base64') : null, // Capa convertida para base64
      rating: book.rating, // Avaliação (se existir)
      indicative_classification: book.indicative_classification, // Classificação indicativa (se existir)
      status: book.status // Status do livro (se aplicável)
    }))

    // Retornar a resposta com os livros e informações do usuário
    return res.json({
      auth: true,
      books: formattedBooks, // Livros formatados com a capa e dados necessários
      user: {
        username: user.name, // Nome do usuário
        profilePicture: user.profile_pictures // Foto de perfil do usuário
          ? user.profile_pictures.toString('base64')
          : null
      }
    })
  } catch (error) {
    console.error('Error fetching books:', error)
    res.status(500).json({ message: 'Error loading data.' })
  }
}
