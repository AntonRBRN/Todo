const newTask = document.getElementById('inputNewTask')
const addButton = document.getElementById('pushTask')
const tasksList = document.getElementById('tasksList')

window.onload = newTask.focus()

let tasksArray = []

if (localStorage.getItem('tasks')){
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
    
    tasksArray.forEach(function (task) {
        renderTask(task)
    });
}

addButton.addEventListener('click', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)
tasksList.addEventListener('click', editTask)

function pushAddButton(e) {
    if (e.keyCode == 13) { 
        document.getElementById('pushTask').click();
    }
}

function addTask() {
    if (newTask.value !== '') {
        addTaskText = newTask.value

        const taskData = {
            id: Math.random(),
            text: addTaskText,
            done: false,
            doneButton: false,
        }

        tasksArray.push(taskData)

        renderTask(taskData)
    } else {
        newTask.style.backgroundColor = '#ff8484'
        newTask.placeholder = 'Введите текст!!!'
        newTask.classList.add('red')
        addButton.disabled = true

        setTimeout( () => {
            newTask.style.backgroundColor = ''
            newTask.placeholder = "Ваше дело"
            newTask.classList.remove('red')
            newTask.focus()
            addButton.disabled = false
        }, 1000);
    }

    saveToLocalStorage()
}

function deleteTask(e) {
    if (e.target.dataset.action !== 'delete') return

    const parentTask = e.target.closest('.task')

    const id = Number(parentTask.id)
    const index = tasksArray.findIndex(function (task) {
        if (task.id === id) {
            return true
        }
    })

    tasksArray.splice(index, 1)

    setTimeout( function() {
        parentTask.remove()
        }, 500)
    parentTask.classList.add('hide')

    saveToLocalStorage()
}

function doneTask(e) {
    if (e.target.dataset.action !== 'done') return

    const parentTask = e.target.closest('.task')

    const id = Number(parentTask.id)

    const done = tasksArray.find(function (task) {
        if (task.id === id) {
            return true
        }
    })

    done.done = !done.done
    done.doneButton = !done.doneButton


    parentTask.classList.toggle('done')
    e.target.innerHTML = 'Отменить'

    if (!parentTask.classList.contains('done')) {
        e.target.innerHTML = 'Сделано'
    }

    saveToLocalStorage()
}

function editTask(e) {
    if (e.target.dataset.action !== 'edit') return
    
    const parentTask = e.target.closest('.task')
    parentTask.classList.toggle('editing')
    e.target.innerHTML = 'Сохранить'

    if (parentTask.classList.contains('editing')) {
        let taskText = parentTask.querySelector('.taskText')
        let editingTask = document.createElement('input')

        editingTask.value = taskText.innerHTML
        editingTask.classList.add('editingTask')
        parentTask.prepend(editingTask)
        taskText.remove(this)
        editingTask.focus()
    } else {
        e.target.innerHTML = 'Редактировать'
        
        let updatedText = parentTask.querySelector('.editingTask')
        let newTaskText = document.createElement('div')
        newTaskText.innerHTML = updatedText.value
        newTaskText.classList.add('taskText')
        parentTask.prepend(newTaskText)
        updatedText.remove(this)

        const id = Number(parentTask.id)

        const edit = tasksArray.find(function (task) {
            if (task.id === id) {
                return true
            }
        })

        edit.text = updatedText.value
    }

    saveToLocalStorage()
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

function renderTask(task) {
    const cssClass = task.done ? "task done" : 'task'
    const buttonInput = task.doneButton ? 'Отменить' : 'Сделано'

    const taskHTML =
        `<div class="${cssClass}"id='${task.id}'>
            <div class="taskText">${task.text}</div>
            <div class="buttons">
                <button class="doneButton" data-action="done">${buttonInput}</button>
                <button class="deleteButton" data-action="delete">Удалить</button>
                <button class="editButton" data-action="edit">Редактировать</button>
        </div>`

    tasksList.insertAdjacentHTML('beforeend', taskHTML)
    newTask.value = ''
    newTask.focus()
}