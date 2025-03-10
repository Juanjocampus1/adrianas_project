document.addEventListener("DOMContentLoaded", () => {
    let rol = getCookie("session");

    // Si el usuario ya inició sesión, lo redirige a su respectiva página
    if (rol && window.location.pathname === "/index.html") {
        redirigirSegunRol(rol);
    }

    // Bloquear acceso a páginas sin sesión activa
    if (!rol && (window.location.pathname.includes("usuario.html") ||
        window.location.pathname.includes("admin.html") ||
        window.location.pathname.includes("tecnico.html"))) {
        window.location.href = "login.html"; // 🔹 Redirigir al login si no hay sesión
    }
});

// Manejo del formulario de login
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorElement = document.getElementById("error");

    let usuarios = getCookie("usuario");
    if (usuarios) {
        usuarios = JSON.parse(usuarios);
    } else {
        usuarios = {};
    }

    if (usuarios.correo === usuario && usuarios.contrasena === password) {
        setCookie("session", usuarios.rol, 1);
        window.location.href = "index.html";
    } else {
        errorElement.textContent = "Usuario o contraseña incorrectos.";
    }
});

// Función para redirigir al usuario según su rol
function redirigirSegunRol(rol) {
    let paginas = {
        "usuario": "index.html",
        "admin": "admin.html",
        "tech": "tecnico.html"
    };

    if (paginas[rol]) {
        window.location.href = paginas[rol];
    }
}

// Cerrar sesión y redirigir al login
function cerrarSesion() {
    setCookie("session", "", -1);
    window.location.href = "login.html"; // 🔹 Asegurar redirección correcta al login
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}

// Función para establecer una cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}