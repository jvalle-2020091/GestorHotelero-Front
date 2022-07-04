export class HotelModel{
    constructor(
        public id: string,
        public name: string,
        public address: string,
        public phone: string,
        public timesRequest: number,
        public adminHotel: string
    ){}
}