import { ParkingBox } from './parkingBox';

export interface ParkingReport {
    _id?: string,
    sensorID: number,
    name: string,
    status: string,
    count: number,
    lastData:ParkingBox | any
    // timestamp: string
}