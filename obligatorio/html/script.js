const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const list = document.getElementById("task-list");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");
const statusDisplay = document.getElementById("status-display");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");

let tasks = []; 
let currentPage = 0; 
const taskShown = 10; 

taskInput.addEventListener("input", function() 
{
    const taskText = taskInput.value.trim();
    addButton.disabled = taskText === "";
});

taskInput.addEventListener("keypress", function(event) 
{
    if (event.key === 'Enter' && !addButton.disabled) 
    {
        addTask();
    }
});

addButton.addEventListener("click", addTask);

function addTask() 
{
    const taskText = taskInput.value.trim();
    if (taskText !== "") 
    {
        tasks.unshift({ text: taskText, completed: false });
        taskInput.value = ""; 
        addButton.disabled = true; 
        renderTasks(); 
        updateStatus();
    } 
}

prevButton.addEventListener("click", function() 
{
    if (currentPage > 0) 
    {
        currentPage--;
        renderTasks();
        updateStatus();
    }
});

nextButton.addEventListener("click", function() 
{
    if ((currentPage + 1) * taskShown < tasks.length) 
    {
        currentPage++;
        renderTasks();
        updateStatus();
    }
});

function renderTasks() 
{
    list.innerHTML = "";
    const start = currentPage * taskShown;
    const end = start + taskShown;
    const paginatedTasks = tasks.slice(start, end);
    paginatedTasks.forEach((task, index) => 
    {
        const li = document.createElement("li");
        li.innerHTML = `<span>${task.text}</span> <button onclick="deleteTask(${start + index})"><i class="fas fa-trash"></i></button>`;
        if (task.completed) 
        {
            li.classList.add("completed");
        }
        li.addEventListener("click", function() 
        {
            task.completed = !task.completed; 
            renderTasks(); 
            updateStatus();
        });
        list.appendChild(li);
    });
    prevButton.disabled = currentPage === 0; 
    nextButton.disabled = (currentPage + 1) * taskShown >= tasks.length; 
    updateProgress();
}

function deleteTask(index) 
{
    tasks.splice(index, 1);
    renderTasks();
    updateStatus();
}

function updateStatus() 
{
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    statusDisplay.textContent = `Tareas completadas: ${completedTasks} de ${totalTasks}`;
}

function updateProgress() 
{
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.style.width = `${progressPercentage}%`;
    document.getElementById("progress-text").textContent = `${Math.round(progressPercentage)}%`;
}

updateStatus();
renderTasks();


