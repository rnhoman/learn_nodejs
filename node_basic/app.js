// module filesync
// const fs = require("fs");

// fs.copyFileSync("text.txt", "text2.txt");
// console.log("success copy file text.txt to text2.txt");

// const hero = require("superheroes");
const op = require("./module");

const moduleTitle = op.title;
const moduleTambah = op.tambah(5, 10);
const modulePerkalian = op.perkalian(10, 5);
const modulePengurangan = op.perkurangan(50, 10);
const modulePembagian = op.pembagian(20, 5);

console.log(moduleTitle);
console.log(moduleTambah, modulePerkalian, modulePengurangan, modulePembagian);

// for (let i = 0; i < 10; i++) {
//   console.log(hero.random());
// }
