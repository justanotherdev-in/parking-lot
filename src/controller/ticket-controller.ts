import Ticket from "../model/ticket";
import { ITicket, IVehicle } from "../types";

class TicketController {
    static tickets = new Map();

    static getTicketWithId(ticketId: string): ITicket | undefined {
        return TicketController.tickets.get(ticketId);
    }

    static deleteTicket(ticketId: string) {
        return TicketController.tickets.delete(ticketId);
    }

    static generateTicket(lotId: string, slotId: string | number, floorId: string | number, vehicle: IVehicle) {
        const ticketId = `${lotId}_${floorId}_${slotId}`;
        const ticket = new Ticket(ticketId, vehicle);
        TicketController.tickets.set(ticketId, ticket);
        // console.log('Tickets>>>', TicketController.tickets);
        return ticket;
    }
}

export default TicketController;
