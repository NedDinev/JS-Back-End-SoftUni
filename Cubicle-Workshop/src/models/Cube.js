const fs = require("fs");
const db = require("../db.json");
const path = require("path");

class Cube {
  constructor(name, description, imgUrl, difficultyLevel) {
    this.id = db.cubes[db.cubes.length - 1].id + 1;
    this.name = name;
    this.description = description;
    this.imgUrl = imgUrl;
    this.difficultyLevel = difficultyLevel;
  }

  static save(cube) {
    db.cubes.push(cube);
    const jsonData = JSON.stringify(db, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../db.json"), jsonData);
  }
}

module.exports = Cube;
