
const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const Channel = require("../models/channel");

const getChannelNames = async () => {
  try {
    const channels = await Channel.findAll({ attributes: ['channelName'] });
    // console.log(channels)
    return channels.map(channel => channel.channelName);
  } catch (error) {
    console.error("Error fetching channel names from the database:", error);
    return [];
  }
};

  // authenticate the connecting client
  aedes.authenticate = (client, username, password, callback) => {
    const error = new Error("Authentication Failed!! Invalid user credentials.");
    if (!password || password == undefined) {
      return callback(error, false);
    }
    password = Buffer.from(password, "base64").toString();
    if (username === "admin" && password === "admin") {
      return callback(null, true);
    }
  
    console.log("Error ! Authentication failed.");
    return callback(error, false);
  };
  
  // authorizing client to publish on a message topic
  aedes.authorizePublish = async (client, packet, callback) => {
  // Get the allowed topics from the Channel models
  const allowedTopics = await getChannelNames();
  allowedTopics.push("testTopic");

  // Check if the packet's topic is in the allowed topics
  if (allowedTopics.includes(packet.topic)) {
    return callback(null);
  }
    console.log("Error ! Unauthorized publish to a topic.");
    return callback(
      new Error("You are not authorized to publish on this message topic.")
    );
  };
  
  // emitted when a client connects to the broker
  aedes.on("client", function (client) {
    console.log(
      `[CLIENT_CONNECTED] Client ${
        client ? client.id : client
      } connected to broker ${aedes.id}`
    );
  });
  
  // emitted when a client disconnects from the broker
  aedes.on("clientDisconnect", function (client) {
    console.log(
      `[CLIENT_DISCONNECTED] Client ${
        client ? client.id : client
      } disconnected from the broker ${aedes.id}`
    );
  });
  
  // emitted when a client subscribes to a message topic
  aedes.on("subscribe", function (subscriptions, client) {
    console.log(
      `[TOPIC_SUBSCRIBED] Client ${
        client ? client.id : client
      } subscribed to topics: ${subscriptions
        .map((s) => s.topic)
        .join(",")} on broker ${aedes.id}`
    );
  });
  
  // emitted when a client unsubscribes from a message topic
  aedes.on("unsubscribe", function (subscriptions, client) {
    console.log(
      `[TOPIC_UNSUBSCRIBED] Client ${
        client ? client.id : client
      } unsubscribed to topics: ${subscriptions.join(",")} from broker ${
        aedes.id
      }`
    );
  });
  
  // emitted when a client publishes a message packet on the topic
  aedes.on("publish", async function (packet, client, message) {
    if (client) {
      console.log(
        `[MESSAGE_PUBLISHED] Client ${
          client ? client.id : "BROKER_" + aedes.id
        } has published message on ${packet.payload} to broker ${aedes.id}`
      );
    }
  });
  
  aedes.on("message", async function (topic, message) {
    console.log(`[MESSAGE_RECEIVED] Message received on topic ${topic}`);
  });



module.exports = {server,httpServer,ws,aedes};