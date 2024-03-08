//---Selección de Elementos---//
const textInput = document.querySelector(".text-input");
const numberInput = document.querySelector(".number-input")
const botonGenerar = document.querySelector(".btn-generar");
const contenedorQR = document.querySelector(".qrcode");
const botonDescargar = document.querySelector(".btn-descargar");
const aviso = document.querySelector(".text-aviso");

let QR;
//---Principal---//
botonGenerar.addEventListener("click", e => {
    e.preventDefault();
    const texto = textInput.value;
    const textqr = "|Fecha de Fabricacion:" + textInput.value + "|No. de Serie:" + numberInput.value + "|Sistema de Sujeción: 2 X 6000 LBS X 12 FT C/ Matraca y 2 broches tipo E |Capacidad de Carga : 2,000 LBS DE RESISTENCIA|Uso preventivo : No exponer a Acidos y Superficies con filo|"; 
    
    if(!texto) {
        mostrarAviso("No has ingresado ningun texto.");
    } else {
        generarCodigoQR(textqr);
        botonDescargar.style.display = "block";
    }
});

botonDescargar.addEventListener("click", () => {
    descargarCodigoQR();
});

function generarCodigoQR(texto) {
    if (QR) {
        QR.clear();
    }

    QR = new QRious({
        value: texto,
        size: 228
    });
    contenedorQR.innerHTML = "";
    contenedorQR.appendChild(QR.image);
}

function descargarCodigoQR() {
    if (QR) {
        const qrImageData = QR.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = qrImageData;
        link.download = "codigo_qr.png";
        link.click();
    }
}

function mostrarAviso(mensaje) {
    aviso.style.color = "#ffbe98";
    aviso.style.background = "none";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;
    aviso.style.visibility = "visible";

    setTimeout(() => {
        aviso.style.display = "none";
    }, 3000);
}