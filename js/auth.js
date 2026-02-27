// Dentro do seu fetch de login, quando o status for 200:
.then(resposta => {
    if (resposta.status === 200) {
        localStorage.setItem("token", "autenticado"); // Cria o "passe" de entrada
        window.location.href = "pages/gestao.html"; // Vai para a gestão
    } else {
        alert("Utilizador ou senha incorretos");
    }
})