//REST API
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
app.use(helmet());
// const db = require("./app/models");

// const errorMiddleware = require("./middlewares/error");

const { server, httpServer, ws,aedes } = require("./mqtt/mqttServer");
const mqttClient = require("./mqtt/mqttClient");
const port = 1883;
const wsPort = 8888;

// db.sequelize.sync();


var corsOptions = {
  origin: ["http://localhost:3000", "http://itdev.cmtc.ac.th:2004"],
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

async function mqttServer() {
  server.listen(port, function () {
    console.log(`MQTT Broker running on port: ${port}`);
  });
  ws.createServer(
    {
      server: httpServer,
    },
    aedes.handle
  );
  httpServer.listen(wsPort, function () {
    console.log("websocket server listening on port ", wsPort);
  });
}

// const auth = require("./app/routes/auth.routes");
// const sensorData = require("./app/routes/sensorData.routes");
// const userData = require("./app/routes/userData.routes");

// app.use("/api/v1", auth);
// app.use("/api/v1", sensorData);
// app.use("/api/v1", userData);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Nothing here :(" });
});
// app.use(errorMiddleware);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
mqttServer()
  .then(() => {
    mqttClient;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });