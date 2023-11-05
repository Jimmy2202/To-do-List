let div = document.createElement("div")
let todo = document.createElement("textarea")
let buttonadd = document.createElement("button")
let buttonedt = document.createElement("button")

buttonadd.classList.add("btADD")
buttonedt.classList.add("btEDT")

todo.classList.add("inputadd")

let msgerr = document.createElement("div")
msgerr.classList.add("msg")
msgerr.innerHTML = "LISTA VAZIA, IMPOSSÍVEL EXCLUIR"
document.querySelector('.container').appendChild(msgerr)
msgerr.style.display = "none"

let msg = document.createElement("div")
msg.classList.add("msg")
msg.innerHTML = "LISTA VAZIA, IMPOSSÍVEL EDITAR"
document.querySelector('.container').appendChild(msg)
msg.style.display = "none"

let instructions = document.createElement("div")
instructions.classList.add("inst")

let btninstructions = document.createElement("button")
btninstructions.classList.add("btninst")

let lis;
let x = y = 0
let text = []

const verifyEmpty = () => {
    if (document.getElementsByTagName("li").length == 0) {
        let empty = document.createElement("div")
        empty.classList.add("empty")
        empty.innerHTML = "LISTA VAZIA"
        document.querySelector('.list').appendChild(empty)
    }
}

document.querySelector('.btnadd').addEventListener("click", () => {
    text.pop()
    document.querySelector('.container').style.display = "none"
    div.style.display = "flex"
    div.classList.add("divadd")
    div.appendChild(todo)
    div.appendChild(buttonadd)
    buttonadd.textContent = "ADICIONAR"
    todo.placeholder = "Digite aqui"
    document.body.appendChild(div)
    todo.value = ''
})

buttonadd.addEventListener("click", () => {
    text.push(todo.value)
    let li = document.createElement("li")
    li.innerHTML = text[0]
    text.pop()
    document.querySelector('.list').appendChild(li)
    div.style.display = "none"
    document.querySelector('.container').style.display = "flex"
    if (document.querySelector('.empty')) {
        document.querySelector('.empty').remove()
    }
})

function transformCursor() {
    const lista = document.getElementsByTagName("li")
    for (let i = 0; i < lista.length; i++) {
        lista[i].style.cursor = "default"
    }
}

document.querySelector('.btnedt').addEventListener("click", () => {
    const lista = document.getElementsByTagName("li")

    if (document.getElementsByTagName("li").length != 0) {
        for (let i = 0; i < lista.length; i++) {
            lista[i].style.animation = "anmColoredt 4s infinite"
            lista[i].style.cursor = "pointer"
        }
        y = 1
    } else {
        msg.style.display = "block"
        msg.style.animation = "disappear 8s ease-out"
        setTimeout(() => {
            msg.style.display = "none"
        }, 8000)
    }
})

document.querySelector('.list').addEventListener("click", (e) => {
    if (e.target.tagName === "LI" && y == 1) {
        lis = e.target
        document.querySelector('.container').style.display = "none"
        div.style.display = "flex"
        div.classList.add("divadd")
        div.appendChild(todo)
        div.appendChild(buttonedt)
        buttonedt.textContent = "EDITAR"
        todo.value = e.target.textContent
        document.body.appendChild(div)
        transformCursor()
        y = 0
    }
})

buttonedt.addEventListener("click", () => {
    lis.textContent = todo.value
    div.style.display = "none"
    document.querySelector('.container').style.display = "flex"
    const lista = document.getElementsByTagName("li")
    for (let i = 0; i < lista.length; i++) {
        lista[i].style.animation = "none"
    }

    if (document.querySelector('.empty')) {
        document.querySelector('.empty').remove()
    }
})

document.querySelector('.btnexc').addEventListener("click", () => {
    const lista = document.getElementsByTagName("li")
    if (lista.length != 0) {
        x = 1
        for (let i = 0; i < lista.length; i++) {
            lista[i].style.animation = "anmColorexc 4s infinite"
            lista[i].style.cursor = "pointer"
        }
    } else {
        msgerr.style.display = "block"
        msgerr.style.animation = "disappear 8s ease-out"
        setTimeout(() => {
            msgerr.style.display = "none"
        }, 8000)
    }
})

document.querySelector('.list').addEventListener("click", (e) => {
    if (e.target.tagName === "LI" && x == 1) {
        e.target.remove()
        verifyEmpty()
        x = 0
        transformCursor()
        const lista = document.getElementsByTagName("li")
        for (let i = 0; i < lista.length; i++) {
            lista[i].style.animation = "none"
        }
    }
})

const search = frase => {
    const lista = document.getElementsByTagName("li")
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].textContent.toLocaleLowerCase().includes(frase.toLocaleLowerCase())) {
            let aux = lista[0].textContent
            lista[0].textContent = lista[i].textContent
            lista[i].textContent = aux
            lista[0].style.animation = "anmColoredt 6s ease-out"
            return 1
        }
    }
    return 0
}

document.querySelector('.pesquisar').addEventListener("submit", (event) => {
    event.preventDefault()
    if (search(document.querySelector('.search').value)) {
        document.querySelector('.search').value = ''
    }else{
        document.querySelector('.search').value = ''
        document.querySelector('.search').placeholder = 'Não Encontrado'
        document.querySelector('.search').style.animation = 'errorFetch 2s'
        setTimeout(() => {
            document.querySelector('.search').placeholder = 'Digite o que quer pesquisar'
            document.querySelector('.search').style.animation = 'none'
        },2000)
    }
})

const fetchCuriosity = async () => {
    const cat = await fetch("https://catfact.ninja/fact?max_length=100")
    const data = await cat.json()
    return data.fact
}

async function main(){
    let fact = await fetchCuriosity()
    let divfact = document.createElement("div")
    let cat = document.createElement("img")
    divfact.classList.add("dfact")
    cat.classList.add("catimg")
    cat.src = "cat.png"
    document.body.appendChild(divfact)
    document.body.appendChild(cat)
    divfact.innerHTML = fact
    divfact.style.animation = "anmfact 14s linear"
    cat.style.animation = "anmfact 14s linear"
    
    setTimeout(() =>{
        divfact.style.display = "none"
        cat.style.display = "none"
    },14000)
}

function initial() {
    document.querySelector('.container').style.display = "none"
    document.body.appendChild(instructions)
    instructions.innerHTML = "<br><br><br><br><br><br><br><br>Para editar um afazer, clique no botão EDITAR e logo em seguida clique no afazer que deseja editar<br>Para excluir um afazer, clique no botão EXCLUIR e logo em seguida clique no afazer que deseja excluir <br><br> ATENÇÃO: É UMA PÁGINA FEITA PARA SER USADA EM UM DESKTOP, SE ESTIVER EM UM CELULAR, VIRE NA HORIZONTAL"
    instructions.appendChild(btninstructions)
    btninstructions.textContent = "ENTENDI"

    btninstructions.addEventListener("click", ()=>{
        instructions.style.display = "none"
        document.querySelector('.container').style.display = "flex"
    })
}

initial()

setInterval(main,30000)


