// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIycjvQWcV6503RnbRCO7nZN3MCIoXYfA",
  authDomain: "myfirstproject-7c420.firebaseapp.com",
  databaseURL: "https://myfirstproject-7c420-default-rtdb.firebaseio.com",
  projectId: "myfirstproject-7c420",
  storageBucket: "myfirstproject-7c420.appspot.com",
  messagingSenderId: "970113238607",
  appId: "1:970113238607:web:dec1ebd6e02c644ac74c3a"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function profile(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("signed in")
            user = user.uid
          // User is signed in.
    
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('task').orderByChild("userId").equalTo(userId).once("value", function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                var name = childSnapshot.val().name;
                var description = childSnapshot.val().description;
                var status = childSnapshot.val().status;
                var key = childSnapshot.key;
                
                var tbody = document.getElementById("profile");
                var tr = document.createElement("tr");
                var td1 = document.createElement("td") ;
                var td2 = document.createElement("td") ;
                var td3 = document.createElement("td") ;
                tr.setAttribute("id",key)
                
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                
                td1.innerHTML = name;
                td2.innerHTML = description;
                td3. innerHTML = status;
                tbody.appendChild(tr);
        });
        var tbody = document.getElementById("profile");
        tbody.style.cursor = "pointer";
        tbody.addEventListener("click", openModal);
    
        function openModal(e){
            
            var taskfield = document.getElementById("task");
            var desfield = document.getElementById("description");
            var statusfield = document.getElementById("status");
            var td =  e.target.parentNode.childNodes;
            var name = td[0].innerHTML;
            var description = td[1].innerHTML;
            var status = td[2].innerHTML;
            var update = document.getElementById("update");
            var remove = document.getElementById("delete");
            var key = e.target.parentNode.id;

            taskfield.value = name;
            desfield.value = description;
            statusfield.value = status;

            $("#edit").modal();
            update.onclick = function(){
               
                td[0].innerHTML = taskfield.value;
                td[1].innerHTML = desfield.value;
                td[2].innerHTML = statusfield.value;
                $("#edit").modal("hide");
    
                name = td[0].innerHTML;
                description = td[1].innerHTML;
                status = td[2].innerHTML;
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                    // User is signed in.
                    var uid = firebase.auth().currentUser.uid;
                    firebase.database().ref('task/' + key + '/').set({
                        name: name,
                        description: description,
                        status: status,
                        userId: uid
                    })
                    
                    // ...
                
                    } else {
                    // No user is signed in.
                    console.log("not signed in")
                    }
                });
            }
                remove.onclick = function(){
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                    // User is signed in.
                    firebase.database().ref('task/' + key + '/').remove();
                    $("#edit").modal("hide");
                    // ...
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                    console.log("removed");
                
                    } else {
                    // No user is signed in.
                    console.log("not signed in")
                    }
                });
        }
    
        
    }
    
        })
        // ...
       
        
    
        } else {
          // No user is signed in.
          console.log("not signed in")
        }
    });
}


function onSubmit() {
    var inputs = document.getElementsByTagName("input");
    var textarea = document.getElementsByTagName("textarea");
    var x = document.getElementById("email").value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    var y = document.getElementById("fname").value;

    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].value === null || inputs[i].value === ""){
            alert("All fields must be filled out!");
            inputs[i].focus();
            return false;
            break;
        }
    }
    if(textarea[0].value === null || textarea[0].value === ""){
        alert("All fields must be filled out!");
            textarea[0].focus();
            return false;
    }
    if(y[0].toUpperCase() != y[0]){
        alert("First Letter of your name should be capital");
        return false;
    }
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Incorrect Email.\nPlease enter correct email address");
        return false;
    }
    
    
}
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        // Signed in 
        console.log("logged in");
        document.location.href = "home.html"
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "\n" + errorMessage)
        alert("Login Failed\nPlease enter correct email or password");
    });
    
}
function signup(){
    var inputs = document.getElementsByTagName("input");
    var email = document.getElementById("email").value;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    var fname = document.getElementById("fname").value;
    var password = document.getElementById("password").value;
    var pass1 = document.getElementById("password2").value;
    var phone = /^\d{11}$/;
    var contact = document.getElementById("contact").value;
    var address = document.getElementById("address").value;
    
    var requiredpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].value === null || inputs[i].value === ""){
            alert("All fields must be filled out!");
            inputs[i].focus();
            return false;
            break;
        }
    }
    if(fname[0].toUpperCase() != fname[0]){
        alert("First Letter of your name should be capital");
        return false;
    }
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        alert("Incorrect Email.\nPlease enter correct email address");
        return false;
    }
    if(!(contact.match(phone))){
        alert("Incorrect Contact\nYour contact should contain 11 numeric digits")
      return false;
    }
    if(!(password.match(requiredpass))){
        alert("Incorrect Password\nYour password should contain atleast \n \t 8 characters \n \t One uppercase letter \n \t One lowercase letter \n \t One numeric digit \n \t One special character")
        return false;
    }
    if(password !== pass1){
        alert("Passwords do not match");
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log("logged in");
        document.location.href = "home.html"
      // Signed in 
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(errorMessage)
      console.log(errorCode)
    });

    var data = {
        fullName: fname,
        contact: contact,
        address: address,
        email: email
    }

    var database = firebase.database();

    var ref = database.ref("users");

    ref.push(data);
}

function logout(){

    console.log("called")

    firebase.auth().signOut().then(function() {
        console.log("signed out")
        // Sign-out successful.
        document.location.href = "index.html"
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
}

function addTask(){
    var name = document.getElementById("new-task").value;
    var description = document.getElementById("new-description").value;
    var status = document.getElementById("new-status").value;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("signed in")
            user = user.uid
          // User is signed in.
    var data = {
        name: name,
        description: description,
        status: status,
        userId: user
    }
    if(name !== "" || description !== "" || status !== ""){

        var database = firebase.database();

        var ref = database.ref("task");
        var newPostKey = ref.push(data).key;
        
                var tbody = document.getElementById("profile");
                var tr = document.createElement("tr");
                var td1 = document.createElement("td") ;
                var td2 = document.createElement("td") ;
                var td3 = document.createElement("td") ;

                
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                
                td1.innerHTML = data.name;
                td2.innerHTML = data.description;
                td3. innerHTML = data.status;
                tr.setAttribute("id",newPostKey)
                tbody.appendChild(tr);
                $("#exampleModalLong").modal("hide");
        // ...
       
        }
    
        } else {
          // No user is signed in.
          console.log("not signed in")
        }
      });
}

