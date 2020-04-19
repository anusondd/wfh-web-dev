import { ParkingBox } from './parkingBox';

export interface ParkingRow {
    empty: number,
    parking: number,
    reserve: number,
    disconnect: number,
    _id?: number,
    parkingID: number|string,
    name: string,
    _v: number,
    parkingBox: ParkingBox[]

}
