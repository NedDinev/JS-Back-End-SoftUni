const http = require("http");
const fs = require("fs/promises");
const fss = require("fs");
const cats = require("./cats.json");
const breeds = require("./breeds.json");

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
  } else if (req.url == "/cats/add-breed" && req.method == "GET") {
    const addBreedPage = await readFile("./views/addBreed.html");
    res.write(addBreedPage);
  } else if (req.url == "/cats/add-breed" && req.method == "POST") {
    let breedInput = `, { "id": breedId, "name": "breedName" }`;
    req.on("data", function (data) {
      breedInput = breedInput.replace("breedId", breeds.length + 1);
      breedInput = breedInput.replace("breedName", data.slice(6, data.length));
    });

    req.on("end", async function () {
      let allBreeds = await readFile("breeds.json");
      breedInput += "]";
      const result = allBreeds.replace("]", breedInput.replace(/\+/g, " ")); //replaces all "+" with " " in input string

      fs.writeFile("breeds.json", result, (err) => {
        if (err) throw new Error(err);
        console.log("Breed added successfully");
      });
    });
    res
      .writeHead(301, {
        Location: `/`,
      })
      .end();
  } else if (req.url == "/cats/add-cat" && req.method == "GET") {
    const addBreedPage = await readFile("./views/addCat.html");
    let breedOptions = "";
    breeds.map((breed) => {
      breedOptions += `\n<option value="${breed.name}">${breed.name}</option>`;
    });
    const result = addBreedPage.replace("{{breedOptions}}", breedOptions);
    res.write(result);
  } else if (req.url == "/cats/add-cat" && req.method == "POST") {
    //todo
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
  let displayBreeds = `\n<option value="${cat.breed}">${cat.breed}</option>`;
  let breedOption = breeds.map((breed) => {
    if (breed.name != cat.breed) {
      displayBreeds += `\n<option value="${breed.name}">${breed.name}</option>`;
    }
  });

  let result = html.replace("{{name}}", cat.name);

  result = result.replace("{{breedOption}}", displayBreeds); // todo: show all breed options
  result = result.replace("{{description}}", cat.description);

  return result;
}

server.listen(5000);
console.log("Server is running on port 5000...");
