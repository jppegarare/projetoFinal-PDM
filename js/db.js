import { openDB } from "idb";

let db;

async function createDB() {
    try{
        db = await openDB('banco', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('musicas')) {
                    const store = db.createObjectStore('musicas', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('nome', 'nome');
                }
            }
        });
        console.log("Banco de dados criado.");
    } catch (e) {
        console.error("Erro ao criar banco:", e.message)
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    await createDB();
    if(db){
    document.getElementById("btnSalvar").addEventListener("click", addMusic)
    document.getElementById("btnListar").addEventListener("click", listMusic);
    }else{
        console.error("Banco não carregou")
    }
});

async function addMusic() {
    const nome = document.getElementById("music").value.trim()
    const latitude = document.getElementById("latMusic").value.trim()
    const longitude = document.getElementById("longMusic").value.trim()

    if (!nome || !latitude || !longitude) {
        alert("Por favor, preencha todos os campos.")
        return;
    }

    const tx = db.transaction('musicas', 'readwrite')
    const store = tx.objectStore('musicas')
    await store.add({ nome, latitude, longitude })
    await tx.done

    alert("Música salva com sucesso!")
}

async function listMusic() {
    const tx = db.transaction('musicas', 'readonly')
    const store = tx.objectStore('musicas')
    const musicas = await store.getAll()

    const output = document.querySelector("output")
    if (musicas.length > 0) {
        output.innerHTML = musicas.map(m => `
            <p>Música: ${m.nome}, Latitude: ${m.latitude}, Longitude: ${m.longitude}</p>
        `).join('')
    } else {
        output.innerHTML = "Nenhuma música salva."
    }
}
