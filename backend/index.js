const path = require('path');
const dotenvAbsolutePath = path.join(__dirname, '.env');

  const dotenv = require('dotenv').config({
    path: dotenvAbsolutePath
  });
  if (dotenv.error) {
    throw dotenv.error;
  }
//REST API
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
app.use(helmet());
const db = require("./config/db");
const { errorHandler, sequelizeErrorHandler } = require("./middlewares/errorHandlers");

const { server, httpServer, ws,aedes } = require("./mqtt/mqttServer");
const mqttClient = require("./mqtt/mqttClient");
const port = 1883;
const wsPort = 8888;

db.sync();
// db.sync({ force: true })


var corsOptions = {
  origin: ["http://localhost:3000", "http://brights1.ddns.net:3000"],
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

const authRoutes = require('./routes/authRoutes');
const thingRoutes = require('./routes/thingRoutes');
const channelRoutes = require('./routes/channelRoutes');
const accessKeyRoutes = require('./routes/accessKeyRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/thing', thingRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/accessKey',accessKeyRoutes)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Nothing here :(" });
});
// Middleware to handle errors
app.use(sequelizeErrorHandler);
// app.use(errorHandler);

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