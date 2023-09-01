import { VehicleType, ISlot } from "./types";

class Slot implements ISlot {
    id: string;
    type: VehicleType;
    isOccupied: boolean;

    constructor(id: string, type: VehicleType) {
        this.id = id;
        this.type = type;
        this.isOccupied = false;
    }

    occupy() {
        if (this.isOccupied) {
            throw new Error('Already Occupied');
        }
        this.isOccupied = true;
    }

    release() {
        if (!this.isOccupied) {
            throw new Error('Already free');
        }
        this.isOccupied = false;
    }
}

export default Slot;