export interface IProbeReading {
    id: string,
    probe: number,
    createdAt: string
}

export interface IBatchProbeReading extends IProbeReading {
    batchId: number
}
export interface IDailyProbeReading extends IProbeReading {
    expireAt: string
}

export interface IBatch {
    id: string,
    name:string,
    weight: number,
    origin: string
}