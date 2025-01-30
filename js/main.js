if ('serviceWorker' in navigator) {
    window.addEventListener('load', async() =>{
        try{
            let reg;
            reg = await navigator.serviceWorker.register('/sw.js', {type: "module"})
            console.log('Service Worker Registrada! 👌', reg)
        }catch (err) {
            console,log('Registro de Service Worker falhou 🤣', err)
        }
    })
}

let posicaoInicial;
const capturarLocalizacao = document.getElementById('localizacao')
const latitude = document.getElementById('latitude')
const longitude =document.getElementById('longiude')

const sucesso = (posicao) => {
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude
    longitude.innerHTML = posicaoInicial.coords.longitude
}

const erro = (error) => {
    let errorMessage;
    switch(error.code){
        case 0:
            errorMessage = "Erro desconhecido"
        break;
        case 1:
            errorMessage = "Permissão Negada"
        break;
        case 2:
            errorMessage = "Captura de posição indisponível"
        break;
        case 3:
            errorMessage = "Tempo de solicitação exedido"
        break;
    }
    console.log("Ocorreu um erro: " + errorMessage)
}

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro)
})
// window.onload = () => {
//     "use strict";
//     if("serviceWorker" in navigator){
//         navigator.serviceWorker.register("./sw.js");
//     }
// };
