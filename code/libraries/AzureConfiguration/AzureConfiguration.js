/**
 * Type: Configuration
 * Description: A library that contains a key-value object to be used as constants.
 */

const broker_address = "<iot-hub-hostname>"; // example "mqtt-testing-hub.azure-devices.net"
const device_name = "<device-name>"; // example "mqtt-testing-device"

const username = [broker_address, device_name, "?api-version=2018-06-30"].join(
  "/"
);

const endpoint = [broker_address, "/devices/", device_name].join("/");
const device_key = "<primary-key>";

const default_publish_topic = "devices/" + device_name + "/messages/events/";

const AzureConfiguration = {
  ADDRESS: broker_address,
  CLIENT_ID: device_name,
  USERNAME: username,
  PASSWORD: "",
  ENDPOINT: endpoint,
  DEVICE_KEY: device_key,
  PUBLISH_TOPIC: default_publish_topic,
};
