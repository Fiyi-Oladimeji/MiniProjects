// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks events
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to the li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link= document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';;
        // add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        // append the link to the li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

    });
}

// Add Task
function addTask(e){
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link= document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';;
    // add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // append the link to the li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //clear the input
    taskInput.value = ''; 


    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));   
}

// clear tasks
function clearTasks(){
    // taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear from LS
    clearTasksFromLocalStorage();
}

// clear tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}