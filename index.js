let todos = [];

if(localStorage.getItem("todos") != null) {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
}

let addBtn = document.getElementById("add-btn");
let list = document.getElementsByTagName("ul")[0];
let count = document.getElementById("count");

count.innerText = `${todos.length}`

function renderTodos() {
    list.innerHTML = "";
    count.innerText = `${todos.length}`;
    todos.forEach((todo,i) => {

        let li = document.createElement('li');
    
        li.innerHTML = `
            <input type="checkbox" class="text" id="todo-text" data-id=${todo.id} ${todo.done ? 'checked' : ''}></input>
            <label>${todo.text}</label>
            <i class="fa-solid fa-xmark" id="delete" style="color: #ffffff;" data-id=${todo.id}></i>
        `;

        list.append(li);

    })
}

function addTodo(todo) {
    todos.push(todo);
    renderTodos();

    localStorage.setItem("todos", JSON.stringify(todos));

    return;
}

function deleteTodo(todoId) {
    let newTodos = todos.filter((curr) => {
        return curr.id !== todoId;
    })
    
    todos = newTodos;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

function toggleTodo(todoId) {
    for(let i=0;i<todos.length;i++){
        if(todos[i].id === todoId){
            todos[i].done = true;
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function takeInput() {
    let input = document.getElementById("input-box");

    if(!input.value.trim()) {
        return;
    }

    let todo = {
        text: input.value,
        id: Date.now().toString(),
        done: false
    }

    input.value = '';
    input.focus();

    addTodo(todo);
}

addBtn.addEventListener("click", () => {
    takeInput();
});

document.addEventListener('click', (e) => {
    console.log(e.target);
    if(e.target.id === "delete"){
        deleteTodo(e.target.dataset.id);
    }

    if(e.target.id === "todo-text"){
        toggleTodo(e.target.dataset.id);
    }
})

document.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        takeInput();
    }
});

renderTodos();