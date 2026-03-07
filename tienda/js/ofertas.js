// ===============================
// ESTADO GLOBAL OFERTAS
// ===============================
let primerClickOferta = false;
let ofertasGlobal = [];


// ===============================
// CARGAR OFERTAS
// ===============================
fetch("data/productos.json")
  .then(res => res.json())
  .then(data => {

    ofertasGlobal = data.filter(p => p.oferta === true);

    mostrarOfertas(ofertasGlobal);

  })
  .catch(err => console.error("Error cargando ofertas:", err));



// ===============================
// WHATSAPP OFERTA
// ===============================
// ===============================
// WHATSAPP OFERTA
// ===============================
function comprarOfertaProducto(id){

  const prod = ofertasGlobal.find(p => p.id === id);
  if(!prod) return;

  const productoURL = window.location.origin + "/tienda/producto/" + prod.slug + ".html";

let mensaje = "";

if(!primerClickOferta){

mensaje =
`🔥 Oferta recomendada
⭐⭐⭐⭐⭐

Hola, quiero comprar esta oferta:

${prod.nombre} - $${prod.precio}

${productoURL}`;



    primerClickOferta = true;

  } else {

    mensaje =
`🔥 También quiero agregar esta oferta:

${prod.nombre} - $${prod.precio}

${productoURL}`;

  }

  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;

  window.open(wa, "_blank");
}

window.comprarOfertaProducto = comprarOfertaProducto;


// ===============================
// MOSTRAR OFERTAS
// ===============================
function mostrarOfertas(lista){

  const container = document.getElementById("ofertas-container");
  if(!container) return;

  container.innerHTML = "";

  lista.forEach(prod => {

    const precioAntes = prod.precioAntes || null;

    const ahorro = precioAntes
      ? precioAntes - prod.precio
      : 0;

    const porcentaje = precioAntes
      ? Math.round((ahorro / precioAntes) * 100)
      : prod.descuento || 0;

    container.innerHTML += `

      <div class="oferta-card">

        <img src="${prod.imagen}"
             alt="${prod.nombre}"
             class="oferta-img"
             onclick="comprarOfertaProducto(${prod.id})">

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