import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import * as mqtt from 'mqtt'

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient
  private readonly logger = new Logger(MqttService.name)

  constructor() {
    this.logger.log('MqttService instantiated')
  }

  onModuleInit() {
    this.logger.log('Initializing module and connecting to broker')
    this.connectToBroker()
  }

  private connectToBroker() {
    const options: mqtt.IClientOptions = {
      host: '15.235.192.41',
      port: 1883,
      username: 'sadee',
      password: 'qwerty',
    }

    this.client = mqtt.connect(options)
    this.logger.log(`Attempting to connect to MQTT broker at ${options.host}:${options.port}`)

    const topics = ['esp/1/mpu6050', 'esp/1/adxl345', 'esp/sensor', 'esp/1/accident']

    this.client.on('connect', () => {
      this.logger.log('Successfully connected to MQTT broker')
      this.client.subscribe(topics, {}, (error, granted) => {
        if (error) {
          this.logger.error('Subscription error:', error)
        } else {
          granted.forEach(grant => {
            this.logger.log(`Successfully subscribed to topic ${grant.topic} with QoS ${grant.qos}`)
          })
        }
      })
    })

    this.client.on('message', (topic, message) => {
      this.handleMessage('esp/1/mpu6050', message.toString())
    })
    this.client.on('message', (topic, message) => {
      this.handleMessage('esp/1/adxl345', message.toString())
    })
    this.client.on('message', (topic, message) => {
      this.handleMessage('esp/1/accident', message.toString())
    })

    this.client.on('error', (error) => {
      this.logger.error('MQTT connection error:', error)
    })
  }

  private handleMessage(topic: string, message: string) {
    const sensorData = JSON.parse(message)
    console.log(sensorData,topic
    )
  }
}
