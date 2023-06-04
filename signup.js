const takenemail = document.getElementById("email");
const takenpassword = document.getElementById("password");

function submitData() {
  if (takenemail.value !== "" && takenpassword.value !== "") {
    const obj = {
      id: Date.now(),
      email: takenemail.value,
      password: takenpassword.value,
    };

    fetch("http://localhost:8080/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Created Account");
        console.log("Redirecting to login.html");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        window.location.href = "./login.html"; // Redirect after processing
      });
  } else {
    alert("Fill in all the fields");
  }
  window.location.href = "./login.html"; 
}
