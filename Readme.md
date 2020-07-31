
# ipm package: azure-iot-mqtt-client

## Overview

This package is a template system to connect with Azure Cloud using MQTT to publish data. It involves authenticating and then publishing data as a device.

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

1. Setup on Azure:
	Following steps are assuming user already has an account and has access to Azure IoT Portal.
    1. First create an IoT Hub: [Iot Hub creation docs](https://docs.microsoft.com/en-us/azure/iot-hub/quickstart-send-telemetry-node#create-an-iot-hub)
    2. Register a Device: [Docs for registering a device](https://docs.microsoft.com/en-us/azure/iot-hub/quickstart-send-telemetry-node#register-a-device)
2. Get the Desired Credentials and update the [Azure Configuration Library](code/libraries/AzureConfiguration/AzureConfiguration.js):
   1. The [using the mqtt protocol directly (as a device)](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-mqtt-support#using-the-mqtt-protocol-directly-as-a-device) will help you get the `clientID`, `username`, `password` for connecting the device.
   2. `device_name` is same as deviceID, one can find on the Azure IoT Portal, in the `IoT Devices` section of the IoT Hub Page.
   3. `broker_addres` is the same as the hostname for the IoT Hub.
   4. `device_key` can be found the devices page under the IoT Hub Page, it is the same as `Primary Key`. 

3. Local Setup for Monitoring Messages:
   Click the link to [Monitor Device to Cloud messages](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-vscode-iot-toolkit-cloud-device-messaging#monitor-device-to-cloud-messages) - this has a setup, one can have in their local environment to make sure they received the messages.

4. Setup on ClearBlade:
	1. Make sure to update the [Azure Configuration Library](code/libraries/AzureConfiguration/AzureConfiguration.js) with the relevant credentials.
	2. As a developer, browse to the [mqtt client publish service](code/services/mqttDeviceClient/mqttDeviceClient.js):
    	1. Pass in params, by clicking the `edit params` section on the code page of the ClearBlade console. The data to be published should be in the `data` key of the params object. Ex: `{ "data":"my device temperature is 90F"}`.
	    2. Save and Test the service (This service only needs to be executed once).
	    3. Check your local environment (in vs-code) to see if the message was published.


## Usage

After setting up the system, the user can use to publish data to Azure IoT Hub using `mqttDeviceClient` service. Once the data is available at IoT Hub, further processing can be done.

## Assets

### Code Services

* `mqttDeviceClient` -- a service which publishes data to Azure IoT Hub, the data can be passed as params when invoking the service.

### Code Libraries

`AzureConfiguration` -- a configuration library, which holds constants specific to Azure IoT Hub.
