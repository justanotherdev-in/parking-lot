import { ITicket, IVehicle } from "../types";

class Ticket implements ITicket {
    id: string;
    vehicle: IVehicle;

    constructor(id: string, vehicle: IVehicle) {
        this.id = id;
        this.vehicle = vehicle;
    }
}

export default Ticket;