let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.textContent = texto; // Usar textContent para maior segurança
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    const chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').disabled = false; // Alterando diretamente a propriedade
    } else {
        const mensagem = chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior';
        exibirTextoNaTela('p', mensagem);
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 10) + 1;
}

function limparCampo() {
    document.querySelector('input').value = ''; // Limpa o campo de entrada diretamente
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').disabled = true; // Alterando diretamente a propriedade
}
