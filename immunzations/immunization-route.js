const router = require("express").Router();
const restricted = require("../auth/restricted-middleware.js");
const Immuization = require("./immunization-model.js");

//Get all records for a child
router.get("/:childid/immunization", restricted, (req, res) => {
  const { childid } = req.params;

  Immuization.get(childid)
    .then(immunzations => {
      res.status(200).json(immunzations);
    })
    .catch(err => {
      res.status(500).json({ message: "Error accessing database." });
    });
});

//Get a record for a child
router.get("/immunization/:immunizationid", restricted, (req, res) => {
  const { immunizationid } = req.params;

  Immuization.getBy(immunizationid)
    .first()
    .then(immuization => {
      res.status(200).json(immuization);
    })
    .catch(err => {
      res.status(500).json({ message: "Error accessing the database." });
    });
});

//Add a child's record
router.post("/:childid/immunization/:providerid", restricted, (req, res) => {
  const { childid, providerid } = req.params;
  const immuization = req.body;

  Immuization.add(childid, providerid, immuization)
    .then(added => {
      res.status(200).json({ message: "Immunization has been added." });
    })
    .catch(err => {
      res.status(500).json({ message: "Error accessing database." });
    });
});

//Update a child's record
router.put("/immunization/:immunizationid", restricted, (req, res) => {
  const { immunizationid } = req.params;

  const changes = req.body;

  Immuization.update(immunizationid, changes)
    .then(updated => {
      res.status(200).json({ message: "Immunization has been updated." });
    })
    .catch(err => {
      res.status(500).json({ message: "Error accessing database." });
    });
});

module.exports = router;
