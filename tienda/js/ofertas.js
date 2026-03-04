// ===============================
// ESTADO GLOBAL OFERTAS
// ===============================
let primerClickOferta = false;


// ===============================
// FUNCIÓN WHATSAPP INTELIGENTE
// ===============================
function comprarOferta(nombre, precio, url){

  let mensaje = "";

  if(!primerClickOferta){
    mensaje = `${CONFIG.mensajes.oferta.primero} ${nombre} - $${precio}\n${url}`;
    primerClickOferta = true;
  } else {
    mensaje = `${CONFIG.mensajes.oferta.extra} ${nombre} - $${precio}\n${url}`;
  }

  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;

  window.open(wa, "_blank");
}

window.comprarOferta = comprarOferta;


// ===============================
// CARGAR OFERTAS DESDE JSON
// ===============================
fetch("data/productos.json")
  .then(res => res.json())
  .then(data => {

    const ofertas = data.filter(p => p.oferta === true);
    mostrarOfertas(ofertas);

  })
  .catch(err => console.error("Error cargando ofertas:", err));


// ===============================
// MOSTRAR OFERTAS
// ===============================
function mostrarOfertas(lista){

  const container = document.getElementById("ofertas-container");
  if(!container) return;

  container.innerHTML = "";

  lista.forEach(prod => {

    const productoURL = window.location.origin + "/" + prod.imagen;

    // 👉 calcular ahorro automático
    const precioAntes = prod.precioAntes || null;

    const ahorro = precioAntes
      ? precioAntes - prod.precio
      : 0;

    const porcentaje = precioAntes
      ? Math.round((ahorro / precioAntes) * 100)
      : prod.descuento || 0;

    container.innerHTML += `
      <div class="oferta-card">

        <!-- IMAGEN CLICKABLE -->
        <img src="${prod.imagen}" 
             alt="${prod.nombre}"
             class="oferta-img"
             onclick="comprarOferta('${prod.nombre.replace(/'/g,"\\'")}', ${prod.precio}, '${productoURL}')">

        <div class="oferta-info">

          ${porcentaje ? `<div class="producto-descuento">${porcentaje}% OFF</div>` : ""}

          <h4>${prod.nombre}</h4>
          <p>${prod.descripcion ?? ""}</p>

          <span>$${prod.precio}</span>

          ${precioAntes ? `
            <div class="precio-antes">$${precioAntes}</div>
            <div class="ahorro">Ahorras $${ahorro}</div>
          ` : ""}

        </div>
      </div>
    `;
  });
}