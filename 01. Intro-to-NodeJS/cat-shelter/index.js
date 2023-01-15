const http = require("http");
const fs = require("fs/promises");
const fss = require("fs");
const cats = require("./cats.json");

const server = http.createServer(async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  if (req.url == "/") {
    const homePage = await readFile("./views/home.html");
    const catsHtml = cats.map((cat) => catTemplate(cat)).join("");

    const result = homePage.replace("{{cats}}", catsHtml);
    res.write(result);
  } else if (req.url == "/content/styles/site.css") {
    res.writeHead(200, {
      "Content-Type": "text/css",
    });
    const siteCss = await readFile("./content/styles/site.css");
    res.write(siteCss);
  } else if (req.url == "/cats/add-breed") {
    const addBreedPage = await readFile("./views/addBreed.html");
    res.write(addBreedPage);
  } else if (req.url == "/cats/add-cat") {
    const addBreedPage = await readFile("./views/addCat.html");
    res.write(addBreedPage);
  } else if (/cats\/\d+\/edit/.test(req.url)) {
    let catId = req.url.split("/")[2];
    let cat = cats.find((x) => x.id == catId);

    const result = catEditTemplate(cat);

    res.write(result);
  } else {
    res.write(`
            <h1>404</h1>
        `);
  }

  res.end();
});

function readFile(path) {
  return fs.readFile(path, { encoding: "utf-8" });
}

function catTemplate(cat) {
  const html = fss.readFileSync("./views/partials/cat.html", {
    encoding: "utf-8",
  });

  let result = html.replace("{{imageUrl}}", cat.imageUrl);
  result = result.replace("{{name}}", cat.name);
  result = result.replace("{{breed}}", cat.breed);
  result = result.replace("{{description}}", cat.description);
  result = result.replace("{{id}}", cat.id);

  return result;
}

function catEditTemplate(cat) {
  const html = fss.readFileSync("./views/editCat.html", {
    encoding: "utf-8",
  });

  let result = html.replace("{{name}}", cat.name);
  result = result.replace("{{breed}}", cat.breed);
  result = result.replace("{{breedOption}}", cat.breed); // todo: show all breed options
  result = result.replace("{{description}}", cat.description);

  return result;
}

server.listen(5000);
console.log("Server is running on port 5000...");
