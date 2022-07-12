export class InvoiceModel{
    constructor(
        public id: String,
        public date: String,
        public serial: String,
        public NIT: String,
        public user: String,
        public name: String,
        public reservations: String
    ){}
}