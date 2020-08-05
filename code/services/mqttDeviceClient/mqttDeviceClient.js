/**
 * Type: Micro Service
 * Description: A short-lived service which is expected to complete within a fixed period of time.
 * @param {CbServer.BasicReq} req
 * @param {string} req.systemKey
 * @param {string} req.systemSecret
 * @param {string} req.userEmail
 * @param {string} req.userid
 * @param {string} req.userToken
 * @param {boolean} req.isLogging
 * @param {[id: string]} req.params
 * @param {CbServer.Resp} resp
 */

function mqttDeviceClient(req, resp) {
  // These are parameters passed into the code service

  const params = req.params;
  const endpoint = AzureConfiguration.ENDPOINT;
  const deviceKey = AzureConfiguration.DEVICE_KEY;
  const token = generateSasToken(endpoint, deviceKey, null, 60);
  const options = {
    address: AzureConfiguration.ADDRESS,
    port: 8883,
    client_id: AzureConfiguration.CLIENT_ID,
    use_tls: true,
    username: AzureConfiguration.USERNAME,
    password: AzureConfiguration.PASSWORD || token,
  };
  const deviceData = params.data || {
    data: 91,
    deviceID: "myDevice",
  };
  const stringifiedData =
    typeof deviceData !== "string" ? JSON.stringify(deviceData) : deviceData;
  const info = "Data on device: " + stringifiedData;
  const client = new MQTT.Client(options);
  client.publish(AzureConfiguration.PUBLISH_TOPIC, info).then(
    function (resolve) {
      log(resolve);
      resp.success("success");
    },
    function (reason) {
      log(
        "failed to publish device data " + deviceData + ": " + reason.message
      );
      resp.error("failure");
    }
  );
}
