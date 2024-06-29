async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    const messageElement = document.getElementById("message");

    if (response.status === 201) {
      messageElement.textContent = result.message;
      messageElement.style.color = "green";
    } else {
      messageElement.textContent = result.message;
      messageElement.style.color = "red";
    }
  } catch (error) {
    console.error("Error during registration:", error);
    const messageElement = document.getElementById("message");
    messageElement.textContent = "An error occurred. Please try again.";
    messageElement.style.color = "red";
  }
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    const messageElement = document.getElementById("message");

    if (response.status === 200) {
      messageElement.textContent = result.message;
      messageElement.style.color = "green";
    } else {
      messageElement.textContent = result.message;
      messageElement.style.color = "red";
    }
  } catch (error) {
    console.error("Error during login:", error);
    const messageElement = document.getElementById("message");
    messageElement.textContent = "An error occurred. Please try again.";
    messageElement.style.color = "red";
  }
}
