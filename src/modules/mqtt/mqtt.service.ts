import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import * as mqtt from 'mqtt'
import { Incident } from '../../schemas/incident.schema'
import { RemoveOptions, Repository, SaveOptions } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Device } from '../../schemas/device.schema'

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient
  private readonly logger = new Logger(MqttService.name)

  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {
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
      password: '9tC4MUEQbsy9',
    }

    this.client = mqtt.connect(options)
    this.logger.log(`Attempting to connect to MQTT broker at ${options.host}:${options.port}`)

    const topics = ['esp/output1', 'esp/1/adxl345', 'esp/sensor', 'esp/1/accident']

    this.client.on('connect', () => {
      this.logger.log('Successfully connected to MQTT broker')
      this.client.subscribe('esp/output1', {}, (error, granted) => {
        if (error) {
          this.logger.error('Subscription error:', error)
        } else {
          granted.forEach(grant => {
            this.logger.log(`Successfully subscribed to topic ${grant.topic} with QoS ${grant.qos}`)
          })
        }
      })
        , this.client.subscribe('esp/1/accident', {}, (error, granted) => {
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
      this.handleMessage('esp/1/accident', message.toString())
      // this.handleMessage('esp/output1', message.toString())
    })

  }

  private async handleMessage(topic: string, message: string) {
    const sensorData = JSON.parse(message)
    console.log(sensorData)
    const incidentData: Partial<Incident> = {
      severity: sensorData.status || 'unknown',
      location: sensorData.latitude ? `${sensorData.latitude},${sensorData.longitude}` : 'unknown',
      device: sensorData.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log(incidentData)
    await this.createIncident(incidentData)

  }

  async createIncident(incidentData: Partial<Incident>) {
    const incident = this.incidentRepository.create(incidentData)
    return await this.incidentRepository.save(incident)
  }


}
