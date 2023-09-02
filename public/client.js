const socket = io()

let name
let textarea = document.querySelector('#text_area')
let chatarea = document.querySelector('.chat_area')

function appendMessage(message, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${message.user}</h4>
        <p>${message.message}</p>
    `

    mainDiv.innerHTML = markup
    chatarea.appendChild(mainDiv)
}

function sendMessage(msg){
    let message = {
        user : name,
        message : msg.trim()
    }

    appendMessage(message, 'outgoing')
    chatarea.scrollTop = chatarea.scrollHeight
    textarea.value = ''
    socket.emit('message', message)
}

do{
    name = prompt('Please enter your name :')
}while(!name)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
         sendMessage(e.target.value)
    }
})

socket.on('message', (message)=>{
    appendMessage(message, 'incoming')
    chatarea.scrollTop = chatarea.scrollHeight
})