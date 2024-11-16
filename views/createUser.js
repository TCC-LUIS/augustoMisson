const pub = document.getElementById('pub')
pub.addEventListener('submit', async function (event) {
  event.preventDefault()

  const formData = new FormData()
  formData.append('name', document.getElementById('nome').value)
  formData.append('email', document.getElementById('email').value)
  formData.append('password', document.getElementById('senha').value)
  formData.append('sumary', document.getElementById('descricao').value)
  formData.append('favorite_book', document.getElementById('livrof').value)
  formData.append('file', document.getElementById('file').files[0])

  try {
    const response = await fetch('http://localhost:4000/createUser', {
      method: 'POST',
      body: formData
    })
    if (response.ok) {
      const data = await response.json()
      alert('Formulário enviado com sucesso!')
      console.log(data)
    } else {
      alert('Erro ao enviar o formulário.')
      console.error('Erro:', response.statusText)
    }
  } catch (error) {
    console.error('erro ao criar usuario', error)
  }
})
