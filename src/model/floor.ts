import Slot from "./slot";
import { IFloor, ISlot, VehicleType } from "../types";

class Floor implements IFloor {
    id: number;
    slots: Array<ISlot>

    constructor(id: number) {
        this.id = id;
        this.slots = [];
    }

    addSlot(vehicleType: VehicleType) {
        this.slots.push(new Slot(this.slots.length + 1, vehicleType));
    }

    // occupySlot(vehicleType: VehicleType) {
    //     for (const slot of this.slots) {
    //         if (slot.type === vehicleType && !slot.isOccupied) {
    //             slot.park();
    //             return slot.id;
    //         }
    //     }
    //     throw new Error('Slot not found');
    // }

    // releaseSlot(slotId: number) {
    //     for (const slot of this.slots) {
    //         if (slot.id === slotId) {
    //             return slot.unpark();
    //         }
    //     }
    //     throw new Error('Slot not found');
    // }

    getAvailableSlots(vehicleType?: VehicleType) {
        let availableSlots = [];
        for (const slot of this.slots) {
            if (slot.isOccupied) {
                continue;
            }

            if (!vehicleType) {
                availableSlots.push(slot)
            } else if (slot.type === vehicleType) {
                availableSlots.push(slot);
            }
        }
        // console.log(availableSlots);
        return availableSlots;
    }

    getOccupiedSlots(vehicleType?: VehicleType) {
        let occupiedSlots = [];
        for (const slot of this.slots) {
            if (!slot.isOccupied) {
                continue;
            }

            if (!vehicleType) {
                occupiedSlots.push(slot)
            } else if (slot.type === vehicleType) {
                occupiedSlots.push(slot);
            }
        }
        return occupiedSlots;
    }
}

export default Floor;