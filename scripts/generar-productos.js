const fs = require("fs");
const path = require("path");

const productosPath = path.join(__dirname, "../tienda/data/productos.json");
const templatePath = path.join(__dirname, "../tienda/templates/producto.html");
const outputDir = path.join(__dirname, "../tienda/producto");

const productos = JSON.parse(fs.readFileSync(productosPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");

if (!fs.existsSync(outputDir)) {
fs.mkdirSync(outputDir, { recursive: true });
}

productos.forEach(producto => {

let html = template
.replace(/{{nombre}}/g, producto.nombre)
.replace(/{{descripcion}}/g, producto.descripcion)
.replace(/{{precio}}/g, producto.precio)
.replace(/{{imagen}}/g, producto.imagen)
.replace(/{{url}}/g, `https://revistalogo.netlify.app/tienda/producto/${producto.slug}.html`);

const outputPath = path.join(outputDir, `${producto.slug}.html`);

fs.writeFileSync(outputPath, html);

console.log("Producto generado:", producto.slug);

});

console.log("✔ Todos los productos generados");