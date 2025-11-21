console.log("connected")
const acounts_div = document.querySelector("#acounts")
const logged_h2 = document.querySelector("#logged")
const url = "http://144.38.201.55:80";
loggedIn = true
let loggedNum = -1;
let loggedName = "";
let loggedPassword = "";
let editing = false;
function logout(){
    if (!loggedIn) {
        alert("Already logged out, log into an acount first")
    } else {
        logged_h2.innerHTML = "Logged Out"
        loggedIn = false
    }
}

function login(username,password,id){
    logged_h2.innerHTML = "Logged into: " + username
    loggedIn = true
    loggedNum = id
    loggedName = username
    loggedPassword = password
}
function load() {
    acounts_div.innerHTML = ""

    fetch(url + "/messages").then(function(response){
        response.json()
            .then(function(data){
                for (i = 0; i<data.length;i++){
                    let p = document.createElement("p")
                    
                    let p1 = document.createElement("p")
                    
                    let p2 = document.createElement("p")

                    acounts_div.prepend(p2)
                    acounts_div.prepend(p1)
                    acounts_div.prepend(p)

                    p.innerHTML = "Username: " + data[i].username
                    p1.innerHTML= "Password: " + data[i].password
                    p2.innerHTML = "---------"
                }

            })
        })
        document.querySelector("#login_username").value = ""
        document.querySelector("#login_password").value = ""
    }


function tryLogin(){
    if (editing) {
        doEdit()
        return
    }
    let username = document.querySelector("#login_username").value
    let password = document.querySelector("#login_password").value
    fetch(url+"/messages").then(function(response){
        response.json()
            
            .then(function(data){
                console.log(data)
                found = false;
                for (i = 0; i<data.length;i++){
                    if (username == data[i].username && password == data[i].password){
                        console.log("login")
                        login(data[i].username,data[i].password,data[i].id)
                        found = true;
                        break;
                    }
                }
                if (!found){
                    alert("username and password combination not found")
                }
        })
    })
    document.querySelector("#login_username").value = ""
    document.querySelector("#login_password").value = ""
}


function tryCreate(){
    let username = document.querySelector("#login_username").value
    let password = document.querySelector("#login_password").value
    fetch(url+"/messages").then(function(response){
        response.json()
            .then(function(data){
                console.log(data)
                found = false;
                for (i = 0; i<data.length;i++){
                    if (username == data[i].username){
                        found = true;
                        break;
                    }
                }
                if (found){
                    alert("username already exists")
                } else {
                    console.log("POSTing")
                    //querry the server via querry string
                    let data = "username="+encodeURIComponent(username)
                    data += "&password="+encodeURIComponent(password)


                    //ship it off
                    fetch(url+"/messages", {
                        method: "POST",
                        body: data,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                        })
                        
                        .then(function(response){
                                load()
                        })

                }
        })
    })
}

function tryDelete(){
    if (!loggedIn) {
        alert("Log into acount you want to remove first")
    } else {
        let foo = confirm("are you sure you want to delete acount named: " + loggedName + "?")
        if (foo) {
            let acount = loggedNum
            loggedNum = -1
            logged_h2.innerHTML = "Logged Out"
            console.log(acount)
            loggedIn = false

            fetch(url+"/messages/"+acount, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                            
            .then(function(response){
                console.log("Deleted")
                load()
            })  
        }
    }
}
function doEdit(){
    console.log("TryEdit")
    document.querySelector("#login_submit_button").innerHTML = "Login"
    editing = false
    let username = document.querySelector("#login_username").value
    let password = document.querySelector("#login_password").value
    fetch(url+"/messages").then(function(response){
        response.json()
            .then(function(data){
                console.log(data)
                found = false;
                for (i = 0; i<data.length;i++){
                    if (username == data[i].username){
                        found = true;
                        break;
                    }
                }
                if (found){
                    alert("username already exists")
                } else {
                    //querry the server via querry string
                    let data = "username="+encodeURIComponent(username)
                    data += "&password="+encodeURIComponent(password)


                    //ship it off
                    fetch(url+ "/messages/"+loggedNum, {
                        method: "PUT",
                        body: data,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                        })
                        
                        .then(function(response){
                                load()
                        })

                }
        })
    })    
}
function tryEdit(){
    
    if (!loggedIn) {
        alert("Log into the acount you want to edit first")
    } else {
        document.querySelector("#login_username").value = loggedName
        document.querySelector("#login_password").value = loggedPassword
        editing = true
        document.querySelector("#login_submit_button").innerHTML = "Update"
    }
}

let logButton = document.querySelector("#login_submit_button")
logButton.onclick = tryLogin

let makeButton = document.querySelector("#create_submit_button")
makeButton.onclick = tryCreate

let logoutButton = document.querySelector("#logout_submit_button")
logoutButton.onclick = logout

let deleteButton = document.querySelector("#delete_submit_button")
deleteButton.onclick = tryDelete

let editButton = document.querySelector("#edit_submit_button")
editButton.onclick = tryEdit

load()
logout()

