const loginForm = document.getElementById('log')
loginForm.addEventListener('submit', async event => {
  event.preventDefault()

  // Coletar os dados do formulário
  const email = document.getElementById('email').value
  const password = document.getElementById('senha').value

  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Login bem-sucedido:', data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', email)
      console.log('Email armazenado:', localStorage.getItem('email'))
      alert('Você entrou!')
      window.location.href = 'main.html'
    } else {
      console.error('Erro no login:', response.statusText)
      alert('Erro ao enviar o formulário.')
    }
  } catch (error) {
    console.error('Erro ao logar:', error)
  }
})
