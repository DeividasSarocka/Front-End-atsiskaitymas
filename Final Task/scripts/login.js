const logIn = document.getElementById("logIn");
const name = document.getElementById("name");
const password = document.getElementById("password");
const error = document.getElementById("error");

    logIn.addEventListener('submit', (event) => {
        event.preventDefault();

        fetch(`https://localhost:7171/api/Auth?username=${event.target.name.value}&password=${event.target.password.value}`,)
        .then(Response => {
            if(Response.ok){
                return Response.json();
            }
            else{
                toastr.error('That user does not exist!');
                return;
            }
        })
        .then(data => {
            if (data == undefined) {
                return;
            } 
            else{
                logIn.reset();
                sessionStorage.setItem('userId', data.id);
                sessionStorage.setItem('userName', data.userName);     
                sessionStorage.setItem('userEmail', data.email);
                sessionStorage.setItem('toastr', 'Success');
                window.location.href = "main.html";
            }
        })
        .catch(err => {
            console.log("Catched: " + err);
        })
    })
