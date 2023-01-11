const http = require("http");
const request = require("request");

const cats = require("./cats.json");
const homePage = require("./views");
const editCat = require("./views/editCat");
const addBreed = require("./views/addBreed");
const addCat = require("./views/addCat");
const siteCss = require("./css/site.css");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  if (req.url == "/") {
    res.write(homePage);
  } else if (/cats\/\d+\/edit/.test(req.url)) {
    let catId = req.url.split("/")[2];
    let cat = cats.find((x) => x.id == catId);
    res.write(editCat(cat));
  } else if (/name=([^&]*)/.test(req.url)) {
    const name = req.url.match(/name=([^&]*)/);
    const description = req.url.match(/description=([^&]*)/);
    const upload = req.url.match(/upload=([^&]*)/);
    const breed = req.url.match(/breed=([^&]*)/);

    cats.push({
      id: cats.length + 1,
      name,
      imageUrl: `${upload}`,
      breed,
      description: `${description}`,
    });
    res.write(homePage);
  } else if (req.url == "/css/site.css") {
    res.writeHead(200, {
      "Content-Type": "text/css",
    });

    res.write(siteCss);
  } else if (req.url == "/cats/add-breed") {
    res.write(addBreed);
  } else if (req.url == "/cats/add-cat") {
    res.write(addCat);
  } else {
    res.write(`
            <h1>404</h1>
        `);
  }

  res.end();
});

server.listen(5000);
console.log("Server is running on port 5000...");
