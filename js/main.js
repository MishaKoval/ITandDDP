// fetch('https://trello-like-app-ea76b-default-rtdb.europe-west1.firebasedatabase.app/')
// import {initializeApp} from 'firebase/app'
//import '../css/main.css'
// var firebaseConfig = {
//     apiKey: "API_KEY",
//     authDomain: "PROJECT_ID.firebaseapp.com",
//     // The value of `databaseURL` depends on the location of the database
//     databaseURL: "https://DATABASE_NAME.firebaseio.com",
//     projectId: "trello-like-app-98598",
//     storageBucket: "PROJECT_ID.appspot.com",
//     messagingSenderId: "SENDER_ID",
//     appId: "APP_ID",
//     // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
//     measurementId: "G-MEASUREMENT_ID",
//   };

// const { response } = require("express");

// import { auth } from "./data";

// const app = initializeApp(firebaseConfig)
// window.addEventListener('load')
// function getDataFromDb(){
//     var boardsCount = 0;
//     var cardsCount = 0;

// }

let counts = {
    boards: 1,
    cards:1
}

let cardsArray = [[],[]]

function refreshBoards()
{
    counts.boards++;
    console.log(counts.boards)
}

function refreshAddCards()
{
    counts.cards++;
    console.log(counts.cards)
}
function refreshDeleteCards()
{
    counts.cards--;
    console.log(counts.cards)
}


function fetch(token){
    return fetch('https://trello-like-app-ea76b-default-rtdb.europe-west1.firebasedatabase.app/')
        .then(response => response.json())
}

const loginBtn = document.querySelector('.login')
loginBtn.addEventListener('click',()=>
{
    auth('ksasha754@gmail.com','1304Miko');
    console.log('loginned')
})
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
        })
        for(let j=0;j<lists.length;j++)
        {
            const list = lists[j];
            list.addEventListener('dragover', e=>e.preventDefault())
            list.addEventListener('dragenter', function(e)
            {
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0,0.3)'

            })
            list.addEventListener('dragleave',function(e)
            {
                this.style.backgroundColor = 'rgba(0,0,0,0)'
            })
            list.addEventListener('drop',function(e)
            {
                this.style.backgroundColor = 'rgba(0,0,0,0)'
                this.append(draggedItem)
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

const lists = document.querySelectorAll('.list')
const daskAddBtn = document.querySelector('.button')
// console.log(lists)

function delete_card_item(e){
    console.log(e)
    e.parentElement.remove()
    refreshDeleteCards()
}

const startcarddeleteBtn = document.querySelector('.delete_item')
startcarddeleteBtn.addEventListener('click',()=>delete_card_item(startcarddeleteBtn))

function addDask(){
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards_item')
    board.innerHTML = `
    <span contenteditable="true" class="title">Введите название</span>
    <div class="list"></div>`
    boards.append(board)
    changeDaskName()
    dragNdrop()
}
daskAddBtn.addEventListener('click',addDask)
daskAddBtn.addEventListener('click',refreshBoards)

function changeDaskName(){
    const titles = document.querySelectorAll('.title')
    titles.forEach(title => 
        {
            title.addEventListener('click', e => e.target.textContent = '')
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
        newItem.innerHTML = value + `<button class="delete_item">
        <img src="./img/trash.png"></button>`
        const deleteBtn = newItem.querySelector('.delete_item')
        deleteBtn.addEventListener('click',()=>
        {
            delete_card_item(deleteBtn);
        })
        lists[0].append(newItem)

        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'
        dragNdrop()
        refreshAddCards()
    })
   
}
changeDaskName()
addTask()