if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg = await navigator.serviceWorker.register('/sw.js', { type: "module" })
            console.log('Service Worker registrado!👌', reg)
        } catch (err) {
            console.log('Registro do Service Worker falhou 🤣', err)
        }
    });
}

let posicaoInicial;
const capturarLocalizacao = document.getElementById('localizacao')
const latitude = document.getElementById('latitude')
const longitude = document.getElementById('longitude')

const sucesso = (posicao) => {
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;


    //document.getElementById("latMusic").value = posicaoInicial.coords.latitude;
    //document.getElementById("longMusic").value = posicaoInicial.coords.longitude;
};

const erro = (error) => {
    let errorMessage;
    switch (error.code) {
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
    console.log("Erro ao capturar localização:", errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
});
