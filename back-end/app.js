const express = require("express");
const { exec } = require("child_process");
const Model1 = require("./collections/models/model1");
const app = express();

app.post("/api/cmd1", (req, res) => {
  /* sur cette partie pour faire en  sorte que si on ajoute rien dans le form le -p n'est pas pris en compte de même pour l'autre
  const tmpP = "";
  if (p) {
    tmpP = ` -p ${req.query.areaStart}-${req.query.areaEnd}`;
  } else {
    tmpP = "";
  }
  */
  const cmdToExecute = `nmap -sS --max-retries ${req.query.maxRetries} --host-timeout ${req.query.hostTimeout}s -p ${req.query.areaStart}-${req.query.areaEnd} ${req.query.target}`;

  exec(cmdToExecute, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.status(500).send("une erreur s'est produite");
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      res.status(500).send("une erreur s'est produite");
      return;
    }
    const model1 = new Model1({
      title: cmdToExecute,
      output: stdout,
    });
    model1
      .save()
      .then(() => {
        console.log("Sortie enregistrée dans la base de données");
        res.send(stdout);
      })
      .catch((error) => {
        console.log(
          "Erreur lors de l'enregistrement dans la base de données :",
          error
        );
        res
          .status(500)
          .send(
            "Une erreur s'est produite lors de l'enregistrement dans la base de données."
          );
      });

    res.header("Access-Control-Allow-Origin", "*");

    res.status(200).send(stdout);
    console.log(`stdout: ${stdout}`);
  });
});

app.get("/find-last-command", async (req, res) => {
  const model = await Model1.findOne().sort({ date: -1 }).exec();

  res.header("Access-Control-Allow-Origin", "*");
  res.send(model);
});

app.get("/find-all-commands", async (req, res) => {
  const model = await Model1.find().sort({ date: -1 }).limit(5).exec();

  res.header("Access-Control-Allow-Origin", "*");
  res.send(model);
});

module.exports = app;
