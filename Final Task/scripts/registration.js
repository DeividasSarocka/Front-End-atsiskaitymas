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
            window.location.href = "../pages/login.html";
        return Response.json();
    }
    else{
        toastr.error('Bad input data / or this user is already registered')
        return;
    }
})
.catch(err => {
    console.log("Catched: " + err);
})
})
