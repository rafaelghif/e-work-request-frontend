interface User {
    id: string;
    badgeId: string;
    name: string;
}

interface Line {
    id: string;
    name: string;
}

interface Department {
    id: string;
    name: string;
}

interface RegistrationNumber {
    id: string;
    name: string;
    format: string;
    lastNumber: number;
}

interface TicketAssignee {
    id: string;
    AssigneeId: string;
    PersonInChargeId: string;
    AssigneeDepartmentId: string;
    status: "Open" | "Pending" | "Progress" | "Complete" | "Reject";
    assigneeDate: string;
    timeTaken: string;
    actionTaken: string;
    inActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    TicketId: string;
    Approver: User;
    ApproverDepartment: Department;
    Assignee: User;
    PersonInCharge: User;
    AssigneeDepartment: Department;
}

export interface WorkRequestInterface {
    id: string;
    ticketNumber: string;
    workNumber: string;
    description: string;
    jigToolNo: string;
    qty: number;
    expectDueDate: string;
    RequesterId: string;
    ReceiverId: string;
    RequesterDepartmentId: string;
    RequesterLineId: string;
    ReceiverDepartmentId: string;
    ticketStatus: "Waiting Approve" | "Request" | "Progress" | "Send to the Requestor" | "Complete" | "Reject";
    sendToRequestorDate: string;
    completeDate: string;
    attachmentFile: string;
    inActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    RegistrationNumberId: string;
    RegistrationNumber: RegistrationNumber;
    Requester: User;
    Receiver: User;
    RequesterDepartment: Department;
    ReceiverDepartment: Department;
    TicketAssignees: TicketAssignee[];
    RequesterLine?: Line;
}

export interface TicketInterface {
    id: string;
    ticketNumber: string;
    description: string;
    jigToolNo: string;
    qty: number;
    expectDueDate: string;
    attachmentFile: string;
}

export interface TicketDetailInterface {
    ticketId: string;
    registrationNumberId: string;
    registrationNumberFormat: string;
    assigneeDepartmentId: string;
    ticketNumber: string;
    workNumber: string;
    description: string;
    jigToolNo: string;
    qty: number;
    expectDueDate: string;
    requesterDepartment: string;
    ticketStatus: "Waiting Approve" | "Request" | "Progress" | "Send to the Requestor" | "Complete" | "Reject";
    assigneeStatus: "Open" | "Pending" | "Progress" | "Complete" | "Reject";
}

export type SendBackToAssignee = {
    ticketId: string;
    ticketAssigneeIds: string[];
    remark: string;
};