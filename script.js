        // Impede o envio do formulário para validar os campos
document.getElementById('concat-form').addEventListener('submit', function(event){
    event.preventDefault();

         // Limpa mensagens de erro
document.getElementById('nameError').textContent = '';
document.getElementById('emailError').textContent = '';
document.getElementById('mensageError').textContent= '';

         // Pega os valores dos campos
const name = document.getElementById('name').value;
const email = document.getElementById("email").value;
const message = document.getElementById('message').value;

let valid = true;

        // Validação do nome
if (name === '') {
    document.getElementById('nameError').textContent = 'Por favor, insira seu nome.';
    valid = false;
}

        // Validação do email
if (email === '') {
    document.getElementById('emailError').textContent = 'Por favor, inisra seu email.';
    valid=false;
}else if(!validateEmail(email)){
    document.getElementById('emailError').textContent = 'Email inválido.';
    valid = false;
}

        // Validação da mensagem
if(message === '') {
    document.getElementById('messageError').textContent = 'Por favor, insira uma mensagem.';
    valid = false;
}

        // Se todos os campos estiverem válidos, envie o formulário
if(valid){
    alert('Formulário enviado com sucesso!');
    
}
});

        // Função para validar o formato do email
function validarEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLocaleLowerCase());
}