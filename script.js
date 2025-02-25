document.addEventListener("DOMContentLoaded", () => {
    let rol = localStorage.getItem("rol");

    // Si ya inició sesión, redirigir automáticamente
    if (rol && window.location.pathname === "/index.html") {
        redirigirSegunRol(rol);
    }

    // Si no hay sesión, bloquear el acceso a usuario.html o admin.html
    if (!rol && (window.location.pathname.includes("usuario.html") || window.location.pathname.includes("admin.html"))) {
        window.location.href = "index.html";
    }
});

document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarios = {
        "user1": { password: "password1", rol: "usuario" },
        "admin1": { password: "adminpass", rol: "admin" }
    };

    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorElement = document.getElementById("error");

    if (usuarios[usuario] && usuarios[usuario].password === password) {
        localStorage.setItem("rol", usuarios[usuario].rol);
        redirigirSegunRol(usuarios[usuario].rol);
    } else {
        errorElement.textContent = "Usuario o contraseña incorrectos.";
    }
});

function redirigirSegunRol(rol) {
    let paginas = {
        "usuario": "usuario.html",
        "admin": "admin.html"
    };

    if (paginas[rol]) {
        window.location.href = paginas[rol];
    }
}

function cerrarSesion() {
    localStorage.removeItem("rol");
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("rol") !== "usuario" && window.location.pathname.includes("usuario.html")) {
        window.location.href = "index.html";
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            let lat = pos.coords.latitude;
            let lng = pos.coords.longitude;
            let map = L.map('map').setView([lat, lng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            L.marker([lat, lng])
                .addTo(map)
                .bindPopup("Tu ubicación")
                .openPopup();

            fetch("cargadores.json")
                .then(response => response.json())
                .then(data => {
                    data.forEach(cargador => {
                        let color = cargador.estado === "libre" ? "green" :
                            cargador.estado === "ocupado" ? "red" : "orange";

                        let marker = L.circleMarker([cargador.ubicacion[0], cargador.ubicacion[1]], {
                            color: color,
                            radius: 8
                        })
                            .addTo(map)
                            .on('click', () => abrirModal(cargador));
                    });
                });
        });
    }
});

function abrirModal(cargador) {
    let modal = document.getElementById("modal");
    let infoCargador = document.getElementById("infoCargador");
    let reservarBtn = document.getElementById("reservarBtn");

    infoCargador.innerHTML = `
        <b>Tipo:</b> ${cargador.tipo}<br>
        <b>Estado:</b> ${cargador.estado}<br>
        <b>Nivel de batería:</b> ${cargador.nivel_bateria}%<br>
        <b>Tiempo estimado:</b> ${cargador.tiempo_estimado} min
    `;

    if (cargador.estado === "libre") {
        reservarBtn.style.display = "block";
        reservarBtn.onclick = () => reservarCargador(cargador.id, cargador.tipo);
    } else {
        reservarBtn.style.display = "none";
    }

    modal.style.display = "block";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

function reservarCargador(id, tipo) {
    alert(`Has reservado el cargador ${tipo} con éxito.`);
    cerrarModal();
}
