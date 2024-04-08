//---Selección de Elementos---//
const serieInicialInput = document.getElementById("serie-inicial");
const serieFinalInput = document.getElementById("serie-final");
const fecha = document.getElementById("fecha");
const region = document.getElementById("region");
const botonGenerar = document.querySelector(".btn-generar");
const contenedorQR = document.querySelector(".qrcode");
const botonDescargar = document.querySelector(".btn-descargar");
const contenedor = document.getElementById("table");

let QR;

// Función para generar el código QR
function generarCodigoQR(texto, contenedorQR) {
  QR = new QRious({
    value: texto,
    size: 228,
  });
  contenedorQR.innerHTML = "";
  contenedorQR.appendChild(QR.image);
}

// Definir la función para generar las tablas con códigos QR
function generarTablasYQR() {
    // Limpiar columnas antes de generar nuevas tablas y códigos QR
    document.getElementById('columna1').innerHTML = '';
    document.getElementById('columna2').innerHTML = '';



    // Obtener los valores de los inputs y convertirlos a números enteros
    const serieInicial = parseInt(serieInicialInput.value);
    const serieFinal = parseInt(serieFinalInput.value);
  
    // Iterar sobre los datos y generar las tablas con códigos QR
    for (let i = serieInicial; i <= serieFinal; i++) {
      // Crear la tabla
      const tablaHTML = `
            <div class="table-table" >
              <div class="table-qrcode" id="table${i}" style="margin: 0.3cm;">
                 <div class="table">
                    <img src="./image/logop.png" alt="logo" class="logo">
                    <table>
                      <tbody>
                        <tr>
                            <td class="a1">Sistema de Sujeción:</td>
                            <td class="b1">2 X 6000 LB X 12 FT C/ Matraca y 2 broches tipo E</td>
                        </tr>
                        <tr>
                            <td class="a2">No. de Serie:</td>
                            <td class="serie-tabla b2">${i}</td>
                        </tr>
                        <tr>
                            <td class="a3">Región:</td>
                            <td class="b3">${region.value}</td>
                        </tr>
                        <tr>
                            <td class="a4">Fecha de Fabricación:</td>
                            <td class="fecha-tabla b4">${fecha.value}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="qrcode" id="qr${i}"></div>
                  </div>
            </div>
              
          `;
  
      // Agregar la tabla a una de las columnas (alternando entre columna1 y columna2)
      const columna = i % 2 === 0 ? 'columna2' : 'columna1';
      document.getElementById(columna).innerHTML += tablaHTML;
  
      // Generar el código QR para esta tabla
      const textoQR =
        "|Fecha de Fabricacion:" +
        fecha.value +
        "|No. de Serie:" +
        i +
        "|Region:"+
        region.value +
        "|Sistema de Sujecion: 2 X 6000 LB X 12 FT C/ Matraca y 2 broches tipo E|Capacidad de Carga : 2,000 LBS|Uso preventivo : No exponer a Acidos y Superficies con filo|";
  
      const contenedorQR = document
        .getElementById(`table${i}`)
        .querySelector(".qrcode");
      generarCodigoQR(textoQR, contenedorQR);
    }
  }
  
  // Llamar a la función para generar las tablas con códigos QR cuando se haga clic 
  botonGenerar.addEventListener("click", (e) => {
    e.preventDefault();
    generarTablasYQR();
  });
  
 // Escuchar el click del botón
 document.getElementById('btnCrearPdf').addEventListener('click', () => {
    // Obtener el contenido HTML que deseas convertir
    const elementoParaConvertir = document.getElementById('columnas');

    // Configurar las opciones de conversión
    const opciones = {
        margin: 1,
        filename: 'contenido.pdf',
        image: { type: 'jpeg', quality: 0.90 },
        html2canvas: { scale: 3, letterRendering: true },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'landscape' }
    };

    // Convertir el contenido HTML a PDF y descargarlo
    html2pdf().set(opciones).from(elementoParaConvertir).save();
});