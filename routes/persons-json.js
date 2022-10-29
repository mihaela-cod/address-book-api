var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/persons.json";

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
  const photo = req.body.photo;
  const name = req.body.name;
  const company = req.body.company;
  const branches = req.body.branches;
  const address = req.body.address;
  const department = req.body.department;
  const compartment = req.body.compartment;
  const position = req.body.position;
  const floorNumber = req.body.floorNumber;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const birthday = req.body.birthday;
  const iban = req.body.iban;

  const persons = getPersons();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  persons.push({
    id,
    photo,
    name,
    company,
    branches,
    address,
    department,
    compartment,
    position,
    floorNumber,
    phoneNumber,
    email,
    birthday,
    iban
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
  const photo = req.body.photo;
  const name = req.body.name;
  const company = req.body.company;
  const branches = req.body.branches;
  const address = req.body.address;
  const department = req.body.department;
  const compartment = req.body.compartment;
  const position = req.body.position;
  const floorNumber = req.body.floorNumber;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const birthday = req.body.birthday;
  const iban = req.body.iban;

  const persons = getPersons();

  const person = persons.find(person => person.id == id);
  if (person) {
    person.photo = photo;
    person.name = name;
    person.company = company;
    person.branches = branches;
    person.address = address;
    person.department = department;
    person.compartment = compartment;
    person.position = position;
    person.floorNumber = floorNumber;
    person.phoneNumber = phoneNumber;
    person.email = email;
    person.birthday = birthday;
    person.iban = iban;
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
