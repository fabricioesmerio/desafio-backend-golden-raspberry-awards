export interface ResponseItem {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface ResponseInterval {
    min: Array<ResponseItem>;
    max: Array<ResponseItem>;
}