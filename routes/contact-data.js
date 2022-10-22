var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/contact-data.json";

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const persons = getPersons();
  res.json(persons);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const promotion = req.body.promotion;
  const members = req.body.members;
  const name = req.body.name;
  const url = req.body.url;

  const persons = getPersons();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  persons.push({
    id,
    promotion,
    members,
    name,
    url
  });

  setPersons(persons);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const persons = getPersons().filter(person => person.id != id);

  setPersons(persons);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const promotion = req.body.promotion;
  const members = req.body.members;
  const name = req.body.name;
  const url = req.body.url;

  const persons = getPersons();

  const person = persons.find(person => person.id == id);
  if (person) {
    person.promotion = promotion;
    person.members = members;
    person.name = name;
    person.url = url;
  }

  setPersons(persons);

  res.json({ success: true });
});

function getPersons() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setPersons(persons) {
  const content = JSON.stringify(persons, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
