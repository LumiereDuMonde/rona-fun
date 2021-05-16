// https://docs.kraken.com/websockets/#message-subscriptionStatus
// since I only need event and subscription the majority of times I can just use a generic event with optional fields rather
// 
export interface GenericEvent {
    event: string,
    connectionID?: number,
    pair?: string[] | string,
    status?: string,
    subscription?: {
        name: string
    }
    errorMessage?: string;
    channelID?: string
}