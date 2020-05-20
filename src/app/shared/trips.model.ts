export interface Trip{
    start:{
        lat:number,
        lng: number
    },
    stop:{
        name: string,
        place: any
    }
    active?: boolean
}