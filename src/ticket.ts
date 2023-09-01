import { ISlot, ITicket, IVehicle } from "./types";

class Ticket implements ITicket {
    id: string;
    vehicle: IVehicle;
    slot: ISlot

    constructor(id: string, vehicle: IVehicle, slot: ISlot) {
        this.id = id;
        this.vehicle = vehicle;
        this.slot = slot;
    }
}

export default Ticket;