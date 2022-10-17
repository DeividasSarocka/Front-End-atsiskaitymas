const Reg = document.getElementById('Reg')
const name = document.getElementById('name')
const password = document.getElementById('password')
const email = document.getElementById('email')
const errorElement = document.getElementById('error')


Reg.addEventListener('submit', (event) => {
    event.preventDefault();

    fetch(`https://localhost:7171/api/Auth`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "userName":event.target.name.value,
        "password": event.target.password.value,
        "email":event.target.email.value
    })
})
.then(Response => {
    if(Response.ok){
        toastr.success('Successfully registered new user!');
        setTimeout(function(){
            window.location.href = "../pages/login.html";
        },1500)
        return Response.json();
    }
    else{
        toastr.options.timeOut = 1500;
        toastr.error('Bad input data / or this user is already registered')
        return;
    }
    return Response.json();
})
.catch(err => {
    console.log("Catched: " + err);
})
//    window.location.href = "../pages/login.html";
})
