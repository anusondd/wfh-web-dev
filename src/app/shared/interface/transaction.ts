export interface Transaction {
    docTotal: number
    docResultTotal: number,
    pageTotal: number,
    data: TransactionData[]
}

export interface TransactionData {
    timestamp: string,
    _id: string,
    sensorID: number,
    parkingBoxName: string,
    status: string,
    __v: number
}

