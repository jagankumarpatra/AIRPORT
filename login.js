const email = document.getElementById("email");
const pass = document.getElementById("password");

function findUser(el) {
  fetch("http://localhost:8080/data", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const user = data.find(
        (el) => el.email === email.value && el.password === pass.value
      );
       
      
      if (user) {
        alert("Logged in Successfully");
        localStorage.setItem("token",JSON.stringify(user.id));
        window.location.href = "./description.html";
      } else {
        alert("Fields are missing");        
      }
    });  
}