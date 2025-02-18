let listaDeNumerosSorteados = []
let numeroLimite = 200;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function exibirTextoNaTela(tag, Texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = Texto;
    responsiveVoice.speak(Texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}:`)
}

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'ACERTOU!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior')
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let tamanhoLista = listaDeNumerosSorteados.length;

    if(tamanhoLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
