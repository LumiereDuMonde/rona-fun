export interface ITrade {
    price: number,
    volume: number,
    time: number,
    side: "b" | "s",
    orderType: "m" | "l",
    misc: string
}