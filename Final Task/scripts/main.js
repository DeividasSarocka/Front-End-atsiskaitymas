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
const type = sessionStorage.getItem("taskType");
const content = sessionStorage.getItem("taskTask");
const endDate = sessionStorage.getItem("taskEndDate");
const id = sessionStorage.getItem("taskID")

var alltasksRawData = tasksRawDataApi();

userLogOut.addEventListener("click", () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userEmail');
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
            const container = document.querySelector('#tasks');
            for (let i=0; i < result.length; i++) {
                if(result[i].userId == userId) {
//TASK CREATE


                    const task = document.createElement("div");

                    sessionStorage.setItem('taskID', result[i].id);
                    sessionStorage.setItem('taskType', result[i].type);     
                    sessionStorage.setItem('taskTask', result[i].content);
                    sessionStorage.setItem('taskEndDate', result[i].endDate);

                    task.innerHTML= `
                   <b> Task ID: ${result[i].id} </b><br>
                    Where to do task: ${result[i].type} <br> 
                    Task: ${result[i].content} <br> 
                    End Date: ${result[i].endDate.slice(0,10)}`
                    container.append(task);
                    task.classList.add("#tasks");
            


//EDIT AND DELETE BUTTONS
                    const taskAction = document.createElement("div");

                    const taskDelete = document.createElement("button");
                    taskDelete.classList.add("delete");
                    taskDelete.innerHTML = "Delete";

                    const taskEdit = document.createElement("button");
                    const todoBtn = document.createElement("button");    //TEST

                    taskEdit.classList.add("edit");
                    taskEdit.innerHTML = "Edit";

                    taskAction.appendChild(taskEdit);
                    taskAction.appendChild(taskDelete);
                    task.appendChild(taskAction);
                    listElement.appendChild(taskAction);
//DELETE
                    taskDelete.addEventListener("click", () => {
                                                fetch(`https://localhost:7171/api/ToDo/${result[i].id}`, {
                                                    method: "DELETE",
                                                });
                                                window.location.href = "../pages/main.html";
                        });
 
//EDIT
                    taskEdit.addEventListener("click", () => {
                        if (taskEdit.innerText.toLocaleLowerCase() == "edit") {
                            task.contentEditable = true;
                            task.style.backgroundColor = "#dddbdb";
                            task.focus();
                            taskEdit.innerHTML = "Save";

                            taskEdit.addEventListener("click", () => {

                                task.innerText
                                fetch(`https://localhost:7171/api/ToDo/${result[i].id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        userId,
                                        type,
                                        content,
                                        endDate,
                                        userId,
                                        id,
                                    }),
                                });
                            });
                        }else {
                            task.setAttribute("readonly", "readonly");
                            taskEdit.innerHTML = "Edit";
                    }
})
                }
            }
        }
    })
}





