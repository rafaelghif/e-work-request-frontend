export interface AssignTicketInterface {
    id: string;
    ticketAssigneeId: string;
    PersonInChargeId: string;
    ticketStatus: "Progress" | "Reject";
    remark: string;
}

export interface PicActionTicketInterface {
    id: string;
    ticketAssigneeId: string;
    timeTaken: string;
    actionTaken: string;
    ticketStatus: "Progress" | "Complete" | "Pending";
    remark: string;
}