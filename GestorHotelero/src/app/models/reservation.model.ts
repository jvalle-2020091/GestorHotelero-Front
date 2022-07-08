export class ReservationModel{
    constructor(
        public id: String,
        public startDate: String,
        public endDate: String,
        public totalPrice: Number,
        public user: String,
        public room: String,
        public service: String
    ){}
}