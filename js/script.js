document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Aquí debes agregar tu lógica de autenticación, por ejemplo, comparando el username y password con una base de datos o valores predefinidos
    if (username === "Veronica" && password === "veroAdmon") {
      // Si las credenciales son válidas, redirige al usuario a una página de bienvenida
      window.location.href = "generadorQR.html";
    } else {
      // Si las credenciales son inválidas, muestra un mensaje de error
      document.getElementById("error-message").innerText = "Credenciales incorrectas. Por favor, intenta nuevamente.";
    }
  });
  