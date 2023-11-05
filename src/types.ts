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
    id: number;
    type: VehicleType;
    isOccupied: boolean;
    occupy: () => void;
    release: () => void;
}

interface IFloor {
    id: number;
    slots: Array<ISlot>;
    addSlot: (vehicleType: VehicleType) => void;
    // occupySlot: (vehicleType: VehicleType) => boolean | number;
    getAvailableSlots: (vehicleType?: VehicleType) => Array<ISlot>
    getOccupiedSlots: (vehicleType?: VehicleType) => Array<ISlot>
}

interface ITicket {
    id: string;
    vehicle: IVehicle;
}

export { VehicleType, IVehicle, ISlot, IFloor, ITicket };