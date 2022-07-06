export class RoomModel{
    constructor(
        public idHotel: String,
        public name: String,
        public description: String,
        public price: String,
        public available: boolean,
        public dateAvalable: String,
    ){}
}