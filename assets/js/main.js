const input = document.querySelector(".input-nova-tarefa");
const botaoEnviar = document.querySelector(".btn-add-tarefa");
const tarefas = document.querySelector(".tarefas");

function criaLi(){
    const li = document.createElement("li");
    return li;
}

input.addEventListener("keypress", function(e){
    if(e.keyCode === 13){
        if (!input.value) return null;
        criaTarefa(input.value);
        limpaInput();
    }
})

function criaBotaoApagar(li){
    li.innerText += " ";
    const botaoApagar = document.createElement("button");
    botaoApagar.innerText = "Apagar";
    botaoApagar.setAttribute("class", "apagar"); //seta um atributo no elemento html
    li.appendChild(botaoApagar);

}

function limpaInput(){
    input.value = "";
    input.focus();
}

function criaTarefa(tarefa){
    const li = criaLi();
    li.innerText = tarefa;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvaTarefas();
}

botaoEnviar.addEventListener("click", function (e) {
    if (!input.value) return null;
    criaTarefa(input.value);
})

document.addEventListener("click", function(e){
    const el = e.target;
    if(el.classList.contains("apagar")){
        el.parentElement.remove();
        salvaTarefas();
    }
})

function salvaTarefas(){
    const liTarefas = tarefas.querySelectorAll("li");
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem("tarefas", tarefasJson);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem("tarefas");
    const tarefasArray = JSON.parse(tarefas);
    for(tarefa of tarefasArray){
        criaTarefa(tarefa);
    }
    console.log(tarefas);
}
adicionaTarefasSalvas();