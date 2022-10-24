const form = document.querySelector("#new-task-form");
const inputTask = document.querySelector("#new-task-input");
const taskType = document.querySelector("#task-type");
const taskDate = document.querySelector("#task-date");
const userNamePost = document.querySelector("#user-name");
const userEmailPost = document.querySelector("#user-email");
const userLogOut = document.querySelector("#logout");
const listElement = document.querySelector("#tasks");

userNamePost.innerHTML = sessionStorage.getItem("userName");
userEmailPost.innerHTML = sessionStorage.getItem("userEmail");
const userId = sessionStorage.getItem("userId");

var alltasksRawData = tasksRawDataApi();

if(sessionStorage.getItem("toastr") == "Success")
{
    toastr.success('LoggedIn!');
}

userLogOut.addEventListener("click", () => {
    sessionStorage.clear();
    alert("Good bye!")
    window.location.href ="../pages/login.html";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (inputTask.value == "" || taskType.value == "" || taskDate.value =="") {
        alert("Please fill the task fully");
        return;
    } else {
        fetch(`https://localhost:7171/api/ToDo`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userId: sessionStorage.getItem("userId"),
                type: taskType.value,
                content: inputTask.value,
                endDate: taskDate.value,
            }),
        });
        alert("Successfylly added task to database");
        window.location.href = "main.html";
        return;
    }
});

function tasksRawDataApi(){
    fetch(`https://localhost:7171/api/ToDo`)
    .then((response) => response.json())
    .then((result) => {
        if (result.error) {
        }
        else{
            var container = document.querySelector('#tasks');
            for (let i=0; i < result.length; i++) {
                if(result[i].userId == userId) {
//TASK CREATE
                    const taskId = document.createElement("div");
                    const taskType = document.createElement("div");
                    const taskContent = document.createElement("div");
                    const taskEndDate = document.createElement("div");

                    taskId.innerHTML =`${result[i].id}`;
                    taskType.innerHTML =`${result[i].type}`;
                    taskContent.innerHTML = `${result[i].content}`;
                    taskEndDate.innerHTML = `${result[i].endDate.slice(0,10)}`;

                    container.insertAdjacentText('beforeEnd', 'Task ID: ') + container.append(taskId);
                    container.insertAdjacentText('beforeEnd', 'Where to do task:') + container.append(taskType);
                    container.insertAdjacentText('beforeEnd', 'Task:') + container.append(taskContent);
                    container.insertAdjacentText('beforeEnd', 'End Date:') + container.append(taskEndDate);

//EDIT AND DELETE BUTTONS
                    const taskAction = document.createElement("div");
                    const taskDelete = document.createElement("button");
                    taskDelete.classList.add("delete");
                    taskDelete.innerHTML = "Delete";

                    const taskEdit = document.createElement("button");

                    taskEdit.classList.add("edit");
                    taskEdit.innerHTML = "Edit";

                    taskAction.appendChild(taskEdit);
                    taskAction.appendChild(taskDelete);
                    taskId.appendChild(taskAction);
                    taskType.appendChild(taskAction);
                    taskContent.appendChild(taskAction);
                    taskEndDate.appendChild(taskAction);
                    listElement.appendChild(taskAction);
//DELETE
                    taskDelete.addEventListener("click", () => {
                                                fetch(`https://localhost:7171/api/ToDo/${result[i].id}`, {
                                                    method: "DELETE",
                                                });
                                                window.location.href = "../pages/main.html";
                        });
//EDIT

                    taskEdit.addEventListener("click", editAndSave);
            
                    let doAction = editAction;
                    
                            function editAndSave() {
                                doAction();
                            }
                            function editAction() {
                                taskId.contentEditable = false; 
                                taskType.contentEditable = true; 
                                taskType.style.backgroundColor = "#dddbdb";
                                taskContent.contentEditable = true; 
                                taskContent.style.backgroundColor = "#dddbdb";
                                taskEndDate.contentEditable = true; 
                                taskEndDate.style.backgroundColor = "#dddbdb"; 
                                taskEdit.innerHTML = "Save";
                                doAction = saveAction;
                            }
                            function saveAction(){
                                
                                    fetch(`https://localhost:7171/api/ToDo/${result[i].id}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            userId,
                                            type : taskType.innerText,
                                            content : taskContent.innerText,
                                            endDate : taskEndDate.innerText,
                                            id : taskId.innerText
                                        }),
                                    });
                                    window.location.href = "../pages/main.html";
                            }
                }
            }
        }
    })
}





