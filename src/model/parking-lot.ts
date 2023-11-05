import Floor from "./floor";
import { IFloor, ISlot, IVehicle, VehicleType } from "../types";
import TicketController from "../controller/ticket-controller";

class ParkingLot {
    id: string;
    floors: Array<IFloor>

    constructor(id: string) {
        this.id = id;
        this.floors = [];
    }

    addFloors(floorsToAdd: number) {
        for (let i = 1; i <= floorsToAdd; i++) {
            this.floors.push(new Floor(i));
        }
    }

    addSlot(floorNumber: number, vehicleType: VehicleType) {
        const floor = this.floors[floorNumber];
        floor.addSlot(vehicleType);
    }

    parkVehicle(vehicle: IVehicle) {
        for (let i = 0; i < this.floors.length; i++) {
            const floor = this.floors[i];
            const [slotToBook] = floor.getAvailableSlots(vehicle.type);
            if (slotToBook) {
                slotToBook.occupy();
                const ticket = TicketController.generateTicket(this.id, slotToBook.id, floor.id, vehicle);
                return ticket;
            }
        }
        throw new Error('Parking Lot Full');
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

    unparkVehicle(ticketId: string) {
        const ticket = TicketController.getTicketWithId(ticketId);

        if (ticket) {            
            const [_parkingLotId, floorId, slotId] = ticketId.split('_');        

            const floor = this.floors[Number(floorId) - 1];
            const slot = floor.slots[Number(slotId) - 1];
            slot.release();
            TicketController.deleteTicket(ticketId);
            return `Unparked vehicle with Registration Number: ${ticket.vehicle.regNo} and Color: ${ticket.vehicle.color}`;
        }

        throw new Error('Invalid Ticket');
    }
}

export default ParkingLot;