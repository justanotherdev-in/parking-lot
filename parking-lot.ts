import Floor from "./floor";
import Ticket from "./ticket";
import { IFloor, ISlot, ITicket, IVehicle, VehicleType } from "./types";

class ParkingLot {
    id: string;
    floors: Array<IFloor>
    tickets: Array<ITicket>

    constructor(id: string) {
        this.id = id;
        this.floors = [];
        this.tickets = [];
    }

    addFloors(floorsToAdd: number) {
        for (let i = 1; i <= floorsToAdd; i++) {
            this.floors.push(new Floor(`${i}`));
        }
    }

    parkVehicle(vehicle: IVehicle) {
        for (let i = 0; i < this.floors.length; i++) {
            const floor = this.floors[i];
            const [slotToBook] = floor.getAvailableSlots(vehicle.type);
            if (slotToBook) {
                slotToBook.occupy();
                const ticket = new Ticket(`${this.id}_${floor.id}_${slotToBook.id}`, vehicle, slotToBook);
                this.tickets.push(ticket);
                return ticket;
            }
        }
    }

    getFreeSlots(vehicleType: VehicleType, showSlots: boolean = false) {
        const floors = this.floors;
        const freeSlots: { [x: string]: ISlot[] | number } = {};
        
        floors.forEach(floor => {
            const availableSlots = floor.getAvailableSlots(vehicleType);
            // console.log({ availableSlots });
            freeSlots[floor.id] = showSlots ? availableSlots : availableSlots.length;
        });
        // console.log({ freeSlots });
        return freeSlots;
    }

    getOccupiedSlots(vehicleType: VehicleType) {
        const floors = this.floors;
        const occupiedSlots: { [x: string]: ISlot[] | number } = {};
        
        floors.forEach(floor => {
            occupiedSlots[floor.id] = floor.getOccupiedSlots(vehicleType);
        });
        return occupiedSlots;
    }

    unparkVehicle(ticket: ITicket) {
        ticket.slot.release();
    }
}

export default ParkingLot;