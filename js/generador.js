//---Selección de Elementos---//
const serieInicialInput = document.getElementById("serie-inicial")
const serieFinalInput = document.getElementById("serie-final")
const fecha = document.getElementById("fecha")
const botonGenerar = document.querySelector(".btn-generar");
const contenedorQR = document.querySelector(".qrcode");
const botonDescargar = document.querySelector(".btn-descargar");
const aviso = document.querySelector(".text-aviso");
const contenedor = document.getElementById("table");

let QR;

// Función para generar el código QR
function generarCodigoQR(texto, contenedorQR) {
    QR = new QRious({
        value: texto,
        size: 228
    });
    contenedorQR.innerHTML = "";
    contenedorQR.appendChild(QR.image);
}

//---Principal---//
botonGenerar.addEventListener("click", e => {
    e.preventDefault();
    // Obtener los valores de los inputs y convertirlos a números enteros
    const serieInicial = parseInt(serieInicialInput.value);
    const serieFinal = parseInt(serieFinalInput.value);

    // Iterar sobre los datos y generar las tablas con códigos QR
    for (let i = serieInicial; i <= serieFinal; i++) {

        // Crear la tabla
        const tablaHTML = `
            <div class="table-qrcode" id="table${i}" style="margin-bottom: 1cm;">
                <div class="table">
                    <img src="./image/logo.png" alt="logo" class="logo">
                    <div class="name">PAQUETEXPRESS</div>
                    <table>
                        <tbody>
                            <tr>
                                <td class="a1">Capacidad de Carga:</td>
                                <td class="b1">2,000 LBS DE RESISTENCIA</td>
                            </tr>
                            <tr>
                                <td class="a2">No. de Serie:</td>
                                <td class="serie-tabla b2">${i}</td>
                            </tr>
                            <tr>
                                <td class="a3">Fecha de Fabricación:</td>
                                <td class="fecha-tabla b3">${fecha.value}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="qrcode" id="qr${i}"></div>
            </div>
        `;
        
        // Agregar la tabla al contenedor
        contenedor.innerHTML += tablaHTML;

        // Generar el código QR para esta tabla
        const textoQR = "|Fecha de Fabricacion:" + fecha.value + "|No. de Serie:" + i + "|Sistema de Sujecion: 2 X 6000 LBS X 12 FT C/ Matraca y 2 broches tipo E |Capacidad de Carga : 2,000 LBS DE RESISTENCIA|Uso preventivo : No exponer a Acidos y Superficies con filo|"; 

        const contenedorQR = document.getElementById(`table${i}`).querySelector(".qrcode");
        generarCodigoQR(textoQR, contenedorQR);
        botonDescargar.style.display = "block";
    }
    
});

/*botonDescargar.addEventListener("click", () => {
    descargarCodigoQR();
});*/

/*function generarCodigoQR(texto) {
    if (QR) {
        QR.clear();
    }

    QR = new QRious({
        value: texto,
        size: 228
    });
    contenedorQR.innerHTML = "";
    contenedorQR.appendChild(QR.image);
}*/

/*function descargarCodigoQR() {
    if (QR) {
        const qrImageData = QR.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = qrImageData;
        link.download = "codigo_qr.png";
        link.click();
    }
}*/