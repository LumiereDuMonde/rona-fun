export interface BookLevelItem {
    price: number,
    volume: number,
    timestamp: number,
    updateType?: string
}

export interface BookLevel {
    as?: [][],
    bs?: [][],
    a?: [][],
    b?: [][],
    c?: number
}

export interface BookLevelMessage {
    channelID: number,
    book: BookLevel,
    channelName: string,
    pair: string
}

export interface BookItems {
    [K: number]: number[];
}
