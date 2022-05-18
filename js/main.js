class Connection
{
    static create(DATA){
        return fetch('https://trello-like-app-ea76b-default-rtdb.europe-west1.firebasedatabase.app/questions.json',
        {
            method : 'POST',
            body:  JSON.stringify(DATA),
            headers:
            {
                'Content-Type': 'application/json'
            }
        })
        .then(response=> response.json())
        .then(response =>
            {
                DATA.id = response.name
                return DATA
                // console.log(response)
            })
            // .then(addToLocalStorage)
            // .then(Connection.renderApp)
    }

    static delete(){
        return fetch('https://trello-like-app-ea76b-default-rtdb.europe-west1.firebasedatabase.app/questions.json',
        {
            method : 'DELETE',
            headers:
            {
                'Content-Type': 'application/json'
            }
        })
        // .then(response=> response.json())
        // .then(response =>
        //     {
        //         question.id = response.name
        //         return question
        //         // console.log(response)
        //     })
            // .then(addToLocalStorage)
            // .then(Connection.renderApp)
    }

    static renderApp(){
        const html = getDataFromLocalStorage()
        const app = document.getElementById('boardmain')
        if(html)
        {
            app.innerHTML = html
            
            const startcarddeleteBtn = document.querySelectorAll('.delete_item')
            for(let i=0;i<startcarddeleteBtn.length;i++)
            {
                startcarddeleteBtn[i].addEventListener('click',()=>delete_card_item(startcarddeleteBtn[i]))
            }
            lists = document.querySelectorAll('.list')
            dragNdrop()
            addTask()
            const listItems = document.querySelectorAll('.list_item')
            listItems.forEach(item =>  item.style.display = 'block')
            const deleteBtns= document.querySelectorAll('.delete_bord_item')
             deleteBtns.forEach(item=>item.addEventListener('click',()=>
            {
                delete_board_item(item);
            }))
            // const daskAddBtn = document.querySelector('.button')
            // daskAddBtn.addEventListener('click',addDask)    
        }
        
        // console.log('ready')
        // const html = question.length
        // console.log(html)
    }
}

window.addEventListener('load',Connection.renderApp)

function addToLocalStorage(html)
{
    // const all = qetQuestionFromLocalStorage()
    // all.push(question)
    localStorage.setItem('innerboards',html)
}

function saveData()
{
        const bordsinner = document.getElementById('boardmain')
        const html = bordsinner.innerHTML
        // console.log(html)
        addToLocalStorage(html)
        // Connection.delete()
        // .then(submit())
}

function getDataFromLocalStorage()
{
    return localStorage.getItem('innerboards')
}


let counts = {
    boards: 1,
    cards:1
}


// function submit()
// {
    
//     const question = {
//         text: getDataFromLocalStorage(),
//         // date: new Date().toJSON()
//     }
//     Connection.create(question).then(()=>
//     {

//     })
// }

const loginBtn = document.querySelector('.login')
loginBtn.addEventListener('click',()=>
{
    // openModal()
    // submit();
    // auth('ksasha754@gmail.com','1304Miko');
    // console.log('loginned')
})

// let cardsArray = [[],[]]

// function refreshBoards()
// {
//     counts.boards++;
//     console.log(counts.boards)
// }

// function refreshAddCards()
// {
//     counts.cards++;
//     console.log(counts.cards)
// }
// function refreshDeleteCards()
// {
//     counts.cards--;
//     console.log(counts.cards)
// }


// function fetch(token){
//     return fetch('https://trello-like-app-ea76b-default-rtdb.europe-west1.firebasedatabase.app/')
//         .then(response => response.json())
// }

// const loginBtn = document.querySelector('.login')
// loginBtn.addEventListener('click',()=>
// {
//     auth('ksasha754@gmail.com','1304Miko');
//     console.log('loginned')
// })
// const db = getFirestore(app);
// console.log(db);
let draggedItem = null
function dragNdrop(){
    const listItems = document.querySelectorAll('.list_item')
    const lists = document.querySelectorAll('.list')
    for(let i=0; i < listItems.length;i++){
        const item = listItems[i]
        item.addEventListener('dragstart', ()=>
        {
            draggedItem = item
            setTimeout(()=>
            {
                item.style.display = 'none'
            },0)
        })
        item.addEventListener('dragend',()=>
        {
            setTimeout(()=>
            {
                item.style.display = 'block'
                draggedItem = null
            },0)
            saveData()
           
        })
        for(let j=0;j<lists.length;j++)
        {
            const list = lists[j];
            list.addEventListener('dragover', e=>
            {
                e.preventDefault()
                saveData()
            })
            list.addEventListener('dragenter', function(e)
            {
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0,0.3)'
                // saveData()
            })
            list.addEventListener('dragleave',function(e)
            {
                this.style.backgroundColor = 'rgba(0,0,0,0)'
                // saveData()
            })
            list.addEventListener('drop',function(e)
            {
                this.style.backgroundColor = 'rgba(0,0,0,0)'
                this.append(draggedItem)
                saveData()
            })

        }
    }
}
dragNdrop()

function auto_grow(element) {
    element.style.height = "30px";
    element.style.height = (element.scrollHeight)+"px";
}

function changeColor()
{
    console.log('settings')
}

const settingBtn = document.querySelector('.settings')
settingBtn.addEventListener('click',changeColor)

let lists = document.querySelectorAll('.list')
const daskAddBtn = document.querySelector('.button')
// console.log(lists)

function delete_card_item(e){
    console.log(e)
    e.parentElement.remove()
    // DeleteCarrefreshds()
    saveData()
}

function delete_board_item(e){
    console.log(e)
    e.parentElement.parentElement.remove()
    // DeleteCarrefreshds()
    saveData()
}



const startcarddeleteBtn = document.querySelector('.delete_item')
startcarddeleteBtn.addEventListener('click',()=>delete_card_item(startcarddeleteBtn))

// const deleteBtn = document.querySelector('.delete_bord_item')
//     deleteBtn.addEventListener('click',()=>
//     {
//         delete_board_item(deleteBtn);
//     })

function addDask(){
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards_item')
    board.innerHTML = `
    <span contenteditable="true" class="title">Введите название доски
    <button class="delete_bord_item">
                                <img src="./img/trash.png">
                            </button>
    </span>
    <div class="list"></div>`
    const deleteBtn = board.querySelector('.delete_bord_item')
    deleteBtn.addEventListener('click',()=>
    {
        delete_board_item(deleteBtn);
    })
    boards.append(board)
    changeDaskName()
    dragNdrop()
    saveData()
}
daskAddBtn.addEventListener('click',addDask)
// daskAddBtn.addEventListener('click',refreshBoards)

function changeDaskName(){
    const titles = document.querySelectorAll('.title')
    titles.forEach(title => 
        {
            title.addEventListener('click', e => 
            {
                e.target.textContent = ''
        //         title.innerHTML = `<button class="delete_bord_item">
        //     <img src="./img/trash.png">
        // </button>`
            })
            

        })
}



function addTask(){
    const btn = document.querySelector('.add_btn')
    // console.log(btn)
    const addBtn = document.querySelector('.button_add_item') 
    const cancelBtn = document.querySelector('.button_cancel_item')
    const textarea = document.querySelector('.textarea')
    const form = document.querySelector('.form')
    let value
    btn.addEventListener('click', ()=>
    {
        form.style.display = 'block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'
        
        textarea.addEventListener('input', e=>
        {
            /*auto_grow(textarea)*/
            value = e.target.value
            if(value){
                addBtn.style.display = 'flex'
            } else 
            {
                addBtn.style.display = 'none'
            }
        })
    })

    cancelBtn.addEventListener('click', ()=>
    {
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'
    })

    addBtn.addEventListener('click', ()=>
    {
        const newItem = document.createElement('div')
        newItem.classList.add('list_item')
        newItem.textContent = value
        newItem.draggable = true
        // console.log(newItem)
        newItem.innerHTML = value + `<button class="delete_item">
        <img src="./img/trash.png"></button>`
        const deleteBtn = newItem.querySelector('.delete_item')
        deleteBtn.addEventListener('click',()=>
        {
            delete_card_item(deleteBtn);
        })
        console.log(lists)
        lists[0].append(newItem)

        // cardsArray[counts.boards][counts.cards] = value
        // console.log('added')

        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'
        dragNdrop()
        saveData()
    })
   
}
changeDaskName()
addTask()

function createModal(title, content){
    const modal =  document.createElement('div')
    modal.classList.add('modal')
    mui.overlay('on',modal)

    const html = `
        <h1>${title}</h1>
        <div class="modal-content">${content}</div>
    `
    modal.innerHTML =html
}

function getAuthForm(){
    return `<form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
        <input type="email" id="email" required>
        <label for="email">Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password" required>
        <label for="password">Password</label>
    </div>
    <button
    type="submit"
    class="mui-btn mui-btn--raised mui-btn--primary"
    >Войти</button>
</form>`
}

function openModal(){
    createModal('Авторизация',getAuthForm())
    document.getElementById('auth-form').addEventListener('submit',authFormHandler,{once:true})
}

function authFormHandler(event){
    event.preventDefault()
    const email = event.target.querySelector('#email').value
    const pass = event.target.querySelector('#password').value
    authWithEmailPass(email,pass)
    .then(fetchHtml)
    .then(renderModal)

}

function renderModal(content)
{
    // var obj = content.json()
    // console.log(content)
    // console.log(obj['PromiseResult'])
    console.log(content)
    addToLocalStorage(content)
    Connection.renderApp()

    // console.log('Content',content.json())
}

// function fetchHtml(token)
// {
//     if(!token){
//         return Promise.resolve('<p class= "error">У вас нет токена!</p>')
//     }
//     return fetch(`https://trello-like-app-ea76b-default-rtdb.europe-west1.firebasedatabase.app/?auth=${token}`)
//         .then(response=>response.json())
//         .then(questions=>
//             {
//                 console.log('Data',questions)
//             })
// }

function fetchHtml(token)
{
    if(!token){
        return Promise.resolve('<p class= "error">У вас нет токена!</p>')
    }
    return fetch('https://trello-like-app-ea76b-default-rtdb.europe-west1.firebasedatabase.app/questions.json',
    {
       
    })
    .then(response=>
        {
           return response.json()
        })
    .then(function (data)
    {
        var a = Object.values(data)
       return a[Object.values(data).length-1]['text']
    })
        // .then(response =>{return Object.keys(response)})
    // .then(response => 
    //     {
    //         return response.json()
    //         // return response ? Object.keys(response).map(key=>(
    //         //     {
    //         //         ...response[key],
    //         //         id: key
    //         //     }))
    //     })
        // .then(responce=>
        // {
        //     // if(responce.error)
        //     // {
        //     //     return `<p class= "error">${responce.error}</p>`
        //     // }
        //     // console.log('Data',responce)
            

        //     return responce ? Object.keys(responce).map(key=>(
        //         {
        //             ...responce[key],
        //             id: key
        //         })) : []
        // })
}






function authWithEmailPass(email,password){
    const apikey = 'AIzaSyCOyKfSERCdHzS1CCh4CzH3B0Tdl14iQI4'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`,
    {
        method: 'POST',
        body: JSON.stringify(
            {
                email,password,returnSecureToken: true
            }),
            headers: 
            {
                'Content-Type':'application/json'
            }
    })
    .then(response => response.json())
    // .then(data => alert(data.idToken))
}