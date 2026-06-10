import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDt0_1C9EgeUfyauuwLb-mm_C_BfCBcTiw",
  authDomain: "app-aula-bdiii.firebaseapp.com",
  projectId: "app-aula-bdiii",
  storageBucket: "app-aula-bdiii.firebasestorage.app",
  messagingSenderId: "6441839259",
  appId: "1:6441839259:web:fde9edbff8d5610f26743e",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase conectado!");

// Cadastrar aluno
window.salvarAluno = async () => {
  try {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const rg = document.getElementById("rg").value;
    const telefoneAluno = document.getElementById("telefoneAluno").value;
    const telefoneResponsavel = document.getElementById("telefoneResponsavel").value;
    const idade = Number(document.getElementById("idade").value);
    const data = document.getElementById("dataNascimento").value;

    await addDoc(collection(db, "BD3-NoSQL-Firestore"), {
      nome,
      email,
      cpf,
      rg,
      telefoneAluno,
      telefoneResponsavel,
      idade,
      dataNascimento: Timestamp.fromDate(new Date(data)),
    });

    alert("Aluno cadastrado com sucesso!");

    // Limpa os campos
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("rg").value = "";
    document.getElementById("telefoneAluno").value = "";
    document.getElementById("telefoneResponsavel").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("dataNascimento").value = "";

    listarAlunos();
  } catch (erro) {
    console.error(erro);
    alert("Erro ao cadastrar aluno.");
  }
};

// Listar alunos
async function listarAlunos() {
  try {
    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "BD3-NoSQL-Firestore"));

    querySnapshot.forEach((documento) => {
      const aluno = documento.data();

      lista.innerHTML += `
        <div class="aluno">
          <p>
            <strong>Nome:</strong> ${aluno.nome}<br>
            <strong>Email:</strong> ${aluno.email}<br>
            <strong>Idade:</strong> ${aluno.idade} anos
          </p>

          <button onclick="excluirAluno('${documento.id}')">
            Excluir
          </button>

          <hr>
        </div>
      `;
    });
  } catch (erro) {
    console.error(erro);
  }
}

// Excluir aluno
window.excluirAluno = async (id) => {
  try {
    await deleteDoc(doc(db, "BD3-NoSQL-Firestore", id));

    listarAlunos();
  } catch (erro) {
    console.error(erro);
  }
};

// Carrega os alunos ao abrir a página
listarAlunos();
