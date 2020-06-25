const addTaskbtn=document.querySelector(".btn");
const taskList=document.querySelector(".collection");
const clearTasks=document.querySelector(".clear-tasks")
const filter=document.querySelector("#filter");











addTaskbtn.addEventListener("click",addTask);
function addTask(e){
    const newTask=document.querySelector("#task");
    let task=newTask.value;

    //creating the element and adding the task
    const listItem=document.createElement("li");
    listItem.className="collection-item"; 
    listItem.appendChild(document.createTextNode(task));
    
    //create the link 
    const link=document.createElement("a");
    link.className="delete-item secondary-content"
    link.innerHTML=`<i class="fas fa-trash"></i>`
    listItem.appendChild(link)
    const taskList=document.querySelector(".collection");
    taskList.appendChild(listItem);
    e.preventDefault();

    let localTasks;
    if(localStorage.getItem("localTasks")===null){
        localTasks=[];
    }else{
        localTasks=JSON.parse(localStorage.getItem("localTasks"));
    }
    localTasks.push(task)

    localStorage.setItem("localTasks",JSON.stringify(localTasks))








}
//removing the task by trash icon

taskList.addEventListener("click",removeItem)
function removeItem(e){
    if(e.target.parentElement.classList.contains("delete-item")){
       const item= e.target.parentElement.parentElement;
       item.remove();
    }

    removeTaskFromLS(e.target.parentElement.parentElement)





}

//remove task from local storage

function removeTaskFromLS(task){
    let localTasks;
    if(localStorage.getItem("localTasks")===null){
        localTasks=[];
    }else{
        localTasks=JSON.parse(localStorage.getItem("localTasks"));
    }

    localTasks.forEach(function(localTask, index){
        if(localTask===task.textContent){
            localTasks.splice(index,1);

        }
    })
    localStorage.setItem("localTasks",JSON.stringify(localTasks))


}

clearTasks.addEventListener("click",clearAllTasks)
function clearAllTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    clearTasksFromLS();
}

function clearTasksFromLS(){
    localStorage.clear();
}

filter.addEventListener("keyup",filterTasks)
function filterTasks(e){
    const letter=e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(letter) !=-1){
            task.style.display="block";
        }else{
            task.style.display="none";
        }
    

    })

 
}
 
document.addEventListener("DOMContentLoaded",loadTasks);
function loadTasks(){
    let localTasks;
    if(localStorage.getItem("localTasks")===null){
        localTasks=[];
    }else{
        localTasks=JSON.parse(localStorage.getItem("localTasks"));
    }
    localTasks.forEach(function(localTask){
        const listItem=document.createElement("li");
        listItem.className="collection-item"; 
        listItem.appendChild(document.createTextNode(localTask));
        
        //create the link 
        const link=document.createElement("a");
        link.className="delete-item secondary-content"
        link.innerHTML=`<i class="fas fa-trash"></i>`
        listItem.appendChild(link)
        const taskList=document.querySelector(".collection");
        taskList.appendChild(listItem);
    })


}










