enum VehicleType {
    BIKE = 'BIKE',
    CAR = 'CAR',
    TRUCK = 'TRUCK'
}

interface IVehicle {
    type: VehicleType;
    regNo: string;
    color: string;
}

interface ISlot {
    id: string;
    type: VehicleType;
    isOccupied: boolean;
    occupy: () => void;
    release: () => void;
}

interface IFloor {
    id: string;
    slots: Array<ISlot>;
    addSlot: (vehicleType: VehicleType) => void;
    // occupySlot: (vehicleType: VehicleType) => boolean | number;
    getAvailableSlots: (vehicleType?: VehicleType) => Array<ISlot>
    getOccupiedSlots: (vehicleType?: VehicleType) => Array<ISlot>
}

interface ITicket {
    id: string;
    slot: ISlot;
    vehicle: IVehicle;
}

export { VehicleType, IVehicle, ISlot, IFloor, ITicket };