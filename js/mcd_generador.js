//---Selección de Elementos---//
const serieInicialInput = document.getElementById("serie-inicial");
const serieFinalInput = document.getElementById("serie-final");
const carga = document.getElementById("carga");
const unidad = document.getElementById("unidad");
const botonGenerar = document.querySelector(".btn-generar");
const contenedorQR = document.querySelector(".qrcode");
const botonDescargar = document.querySelector(".btn-descargar");
const contenedor = document.getElementById("table");
const fechaInput = document.getElementById("fecha").value;
const fechaFormateada = formatearFecha(fechaInput);

let QR;

//Función para formatear fecha
function formatearFecha(fechaInput) {
  const partes = fechaInput.split("/");

  if (partes.length !== 3) {
    return fechaInput; // Devuelve la misma fecha si no está bien formateada
  }

  let [dia, mes, anio] = partes;

  // Asegurar que día y mes tengan 2 dígitos
  dia = dia.padStart(2, "0");
  mes = mes.padStart(2, "0");

  // Expandir año si solo tiene 2 dígitos
  if (anio.length === 2) {
    anio = "20" + anio;
  }

  return `${dia}/${mes}/${anio}`;
}

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
  document.getElementById("columna1").innerHTML = "";
  document.getElementById("columna2").innerHTML = "";

  // Obtener los valores de los inputs y convertirlos a números enteros
  const serieInicial = parseInt(serieInicialInput.value);
  const serieFinal = parseInt(serieFinalInput.value);

  // Iterar sobre los datos y generar las tablas con códigos QR
  for (let i = serieInicial; i <= serieFinal; i++) {
    const numeroSerie = i.toString().padStart(2, "0");
    const fechaFormateada = formatearFecha(fecha.value);
    // Crear la tabla
    const tablaHTML = `
            <div class="table-table" >
              <div class="table-qrcode" id="table${numeroSerie}" style="margin: 0.2985cm 0 0.2985cm 0.3cm">
                 <div class="table">
                    <img src="./image/mcd_lab.png" alt="logo" class="logo">
                    <table>
                      <tbody>
                        <tr>
                            <td class="a1">RED DE CARGA:</td>
                            <td class="carga b1">${carga.value}</td>
                        </tr>
                        <tr>
                            <td class="a2">Capacidad de Carga:</td>
                            <td class="b2">4,000 LBS DE RESISTENCIA</td>
                        </tr>
                        <tr>
                            <td class="a3">No. de Serie:</td>
                            <td class="serie-tabla b3"><span>Eco. </span>${numeroSerie}</td>
                        </tr>
                        <tr>
                            <td class="a4">Unidad:</td>
                            <td class="unidad b4">${unidad.value}</td>
                        </tr>
                        <tr>
                            <td class="a5">Fecha de Fabricación:</td>
                            <td class="fecha-tabla b5">${fechaFormateada}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="qrcode" id="qr${numeroSerie}"></div>
                  </div>
            </div>
              
          `;

    // Agregar la tabla a una de las columnas (alternando entre columna1 y columna2)
    const columna = i % 2 === 0 ? "columna2" : "columna1";
    document.getElementById(columna).innerHTML += tablaHTML;

    // Generar el código QR para esta tabla
    const textoQR =
      "|Fecha de Fabricacion:" +
      fechaFormateada +
      " |No. de Serie:" + "Eco. " + 
      numeroSerie +
      " |Sistema de Sujecion: Red de carga " +
      carga.value +
      " M C/ 2 Matracas y 4 Broches tipo E |Capacidad de Carga : 4,000 LBS | Uso preventivo : No exponer a Acidos y Superficies con filo|";

    const contenedorQR = document
      .getElementById(`table${numeroSerie}`)
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
document.getElementById("btnCrearPdf").addEventListener("click", () => {
  // Obtener el contenido HTML que deseas convertir
  const elementoParaConvertir = document.getElementById("columnas");

  // Configurar las opciones de conversión
  const opciones = {
    margin: 1,
    filename: "contenido.pdf",
    image: { type: "jpeg", quality: 0.9 },
    html2canvas: { scale: 3, letterRendering: true },
    jsPDF: { unit: "cm", format: "a4", orientation: "landscape" },
  };

  // Convertir el contenido HTML a PDF y descargarlo
  html2pdf().set(opciones).from(elementoParaConvertir).save();
});
