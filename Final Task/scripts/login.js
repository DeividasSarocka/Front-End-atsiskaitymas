
const logIn = document.getElementById("logIn");
const name = document.getElementById("name");
const password = document.getElementById("password");
const error = document.getElementById("error");



LogIn()
function LogIn()
{
    logIn.addEventListener('submit', (event) => {
        event.preventDefault();

        fetch(`https://localhost:7171/api/Auth?username=${event.target.name.value}&password=${event.target.password.value}`,)
        .then(Response => {
            return Response.json();
        })
        .then(data => {
            if (data.title == 'Not Found') {
                toastr.options.timeOut = 1500;
                toastr.error('That user does not exist!');
                return;
            } else  {
                logIn.reset();
                user = data;
                let userString = JSON.stringify(user);
                sessionStorage.setItem('userId', data.id);
                sessionStorage.setItem('userName', data.userName);     //login saugom i localStorage?
                sessionStorage.setItem('userEmail', data.email);
                toastr.options.timeOut = 1500;
                toastr.success('Successfully LoggedIn!')
                setTimeout(function(){
                    window.location.href = "main.html";
                },1500)
            }
        })
        .catch(err => {
            console.log("Catched: " + err);
        })
    })
}