import ParkingLot from "./parking-lot";
import { ISlot, ITicket, VehicleType } from "./types";
import Vehicle from "./vehicle";

class ParkingLotController {
    parkingLot!: ParkingLot
    tickets: Array<ITicket>

    constructor() {
        this.tickets = [];
    }

    executeCommand(command: string, ...args: Array<string | number>) {
        console.log('\nCOMMAND>>', command, args, '\n');
        switch(command) {
            case 'create_parking_lot':
                this.createParkingLot(...args as [string, number, number]);
                break;
            case 'park_vehicle':
                this.parkVehicle(...args as [string, string, string]);
                break;
            case 'unpark_vehicle':
                this.unparkVehicle(...args as [string]);
                break;
            case 'display':
                this.display(...args as [string, string]);
                break;
        }
    }

    createParkingLot(id: string, totalFloors: number, totalSlots: number) {
        this.parkingLot = new ParkingLot(id);
        this.parkingLot.addFloors(totalFloors);

        const floors = this.parkingLot.floors;
        floors.forEach(floor => {
            for (let ind = 0; ind < totalSlots; ind++) {
                const vehicleType = ind === 0 ? VehicleType.TRUCK : ind <= 2 ? VehicleType.BIKE : VehicleType.CAR;
                floor.addSlot(vehicleType);
            }
        });
        console.log(`Created parking lot with ${totalFloors} floors and ${totalSlots} slots per floor`);
    }

    parkVehicle(vType: string, regNo: string, color: string) {
        const vehicleType = VehicleType[vType as keyof typeof VehicleType];
        const vehicle = new Vehicle(vehicleType, regNo, color);
        const ticket = this.parkingLot.parkVehicle(vehicle);
        if (ticket) {
            this.tickets.push(ticket);
            console.log(`Parked vehicle. Ticket ID: ${ticket.id}`);
            return;
        }
        console.log("Parking Lot Full");
    }

    unparkVehicle(ticketId: string) {
        const ticket = this.tickets.find(ticket => ticket.id === ticketId);
        this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
        if (ticket) {
            this.parkingLot.unparkVehicle(ticket);
            console.log(`Unparked vehicle with Registration Number: ${ticket.vehicle.regNo} and Color: ${ticket.vehicle.color}`);
            return;
        }
        console.log("Invalid Ticket");
    }

    display(displayType: string, vType: string) {
        // console.log(displayType, vType);
        const vehicleType = VehicleType[vType as keyof typeof VehicleType];
        // console.log(vehicleType);
        let data;
        switch(displayType) {
            case 'free_slots':
            case 'free_count':
                data = this.parkingLot.getFreeSlots(vehicleType, displayType === 'free_slots');
                break;
            case 'occupied_slots':
                data = this.parkingLot.getOccupiedSlots(vehicleType);
                break;
        }

        // console.log({ data });
        if (data) {
            Object.entries(data).forEach(d => {
                const [floor, slotsOrCount] = d;
                printSlotsData(displayType, vehicleType, floor, slotsOrCount);
            })
        }
        
    }

}

function printSlotsData(displayType: string, vehicleType: string, floor: string, slotsOrCount?: Array<ISlot> | number) {
    switch(displayType) {
        case 'free_slots' :
            console.log(`No. of free slots for ${vehicleType} on Floor ${floor}: ${(slotsOrCount as Array<ISlot>).map(slot => slot.id)}`);
            break;
        case 'free_count' :
            console.log(`No. of free slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount}`);
            break;
        case 'occupied_slots' :
            console.log(`Occupied slots for ${vehicleType} on Floor ${floor}: ${(slotsOrCount as Array<ISlot>).map(slot => slot.id)}`);
            break;
    }
}

export default ParkingLotController;