const fs = require("fs");
const path = require("path");

const productosPath = path.join(__dirname, "../tienda/data/productos.json");
const templatePath = path.join(__dirname, "../tienda/templates/producto.html");
const outputDir = path.join(__dirname, "../tienda/producto");

const productos = JSON.parse(fs.readFileSync(productosPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");

productos.forEach(prod => {

let html = template
.replace(/{{NOMBRE}}/g, prod.nombre)
.replace(/{{PRECIO}}/g, prod.precio)
.replace(/{{DESCRIPCION}}/g, prod.descripcion || "")
.replace(/{{IMAGEN}}/g, prod.imagen)
.replace(/{{SLUG}}/g, prod.slug);

const outputFile = path.join(outputDir, `${prod.slug}.html`);

fs.writeFileSync(outputFile, html);

console.log("✔ Producto generado:", prod.slug);

});

console.log("🚀 Todos los productos fueron generados.");