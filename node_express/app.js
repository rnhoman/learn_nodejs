const express = require("express");
const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const buah = [{ name: "apel" }, { name: "melon" }, { name: "manggah" }];
  res.render("index", {
    name: "Rohman Nur Haqiqi",
    umur: 25,
    buah: buah,
  });
});

app.get("/", (req, res) => res.send("Belajar node express dengan nodemon"));
app.get("/:name", (req, res) => res.send(`Nama saya : ${req.params.name}`));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
