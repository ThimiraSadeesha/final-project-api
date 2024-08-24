import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import * as mqtt from "mqtt";

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttService.name);

  constructor() {
    this.logger.log("MqttService instantiated");
  }

  onModuleInit() {
    this.logger.log("Initializing module and connecting to broker");
    this.connectToBroker();
  }

  private connectToBroker() {
    const options: mqtt.IClientOptions = {
      host: "15.235.192.41",
      port: 1883,
      username: "sadee",
      password: "qwerty"
    };

    this.client = mqtt.connect(options);
    this.logger.log(`Attempting to connect to MQTT broker at ${options.host}:${options.port}`);

    const topics = ["esp/1", "esp/output1status", "esp/sensor", "esp/adxl345", "esp/mpu6050"];

    this.client.on("connect", () => {
      this.logger.log("Successfully connected to MQTT broker");
      this.client.subscribe(topics, {}, (error, granted) => {
        if (error) {
          this.logger.error("Subscription error:", error);
        } else {
          granted.forEach(grant => {
            this.logger.log(`Successfully subscribed to topic ${grant.topic} with QoS ${grant.qos}`);
          });
        }
      });
    });

    this.client.on("message", (topic, message) => {
      this.handleMessage('esp/1', message.toString());
    });

    this.client.on("error", (error) => {
      this.logger.error("MQTT connection error:", error);
    });
  }

  private handleMessage(topic: string, message: string) {
    const sensorData = JSON.parse(message);
    console.log(sensorData
    )


    // if (topic === "esp/adxl345") {
    //   this.logger.log(`ADXL345 sensor message: ${message}`);
    //
    // } else if (topic === "esp/mpu6050") {
    //   this.logger.log(`MPU6050 sensor message: ${message}`);
    //
    //   if (sensorData.temperature) {
    //     this.logger.log(`MPU6050 temperature: ${sensorData.temperature} degC`);
    //   }
    // } else if (topic === "esp/vibration") {
    //   this.logger.log(`Vibration sensor message: ${message}`);
    //
    // } else if (topic === "esp/output1status") {
    //   this.logger.log(`Output 1 status message: ${message}`);
    //
    // } else if (topic === "esp/sensor") {
    //   this.logger.log(`Sensor message: ${message}`);
    //
    // }
  }
}
