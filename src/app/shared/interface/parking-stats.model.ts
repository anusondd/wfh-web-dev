export interface ParkStats {
    _id?:string
    code:string,
    status?:boolean,
    name:string,
    proviceCode?:string,
    empty: number
    parking: number
    reserve: number
    disconnect: number,
    timeUpdateData:string|any,
}