// ===== FUNCIÓN PARA MOSTRAR EL MENSAJE =====
function mostrarMensaje() {
    let mensaje = document.getElementById("mensajeOculto");
    mensaje.classList.add("mostrar");
    lanzarConfeti();
}

// ===== CONFETI =====
let canvas = document.getElementById("confeti");
let ctx = canvas.getContext("2d");
let confetis = [];

// Ajustar el canvas al tamaño de la ventana
function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

// Colores del confeti
let colores = ["#D9647C", "#8B2942", "#FADADD", "#F8B195", "#FFF5F0", "#A47551"];

// Crear un confeti
function crearConfeti() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        tamaño: Math.random() * 10 + 5,
        velocidadY: Math.random() * 3 + 2,
        velocidadX: Math.random() * 2 - 1,
        color: colores[Math.floor(Math.random() * colores.length)],
        rotacion: Math.random() * 360,
        velocidadRotacion: Math.random() * 5 - 2.5
    };
}

// Lanzar 150 confetis
function lanzarConfeti() {
    confetis = [];
    for (let i = 0; i < 150; i++) {
        confetis.push(crearConfeti());
    }
    animar();
}

// Animar el confeti
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < confetis.length; i++) {
        let c = confetis[i];

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotacion * Math.PI / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.tamaño / 2, -c.tamaño / 2, c.tamaño, c.tamaño);
        ctx.restore();

        c.y += c.velocidadY;
        c.x += c.velocidadX;
        c.rotacion += c.velocidadRotacion;

        // Si sale de la pantalla, vuelve a empezar arriba
        if (c.y > canvas.height) {
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }
    }

    requestAnimationFrame(animar);
}

