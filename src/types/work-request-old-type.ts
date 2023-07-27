export interface WorkRequestOldInterface {
    id: string;
    woNo: string;
    ticketNo: string;
    location: string;
    description: string;
    remark: string;
    receivedDate: string;
    completedDate: string;
    ticketType: string;
    ticketStatus: "OPEN" | "COMPLETE";
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export type UpdateWorkRequestOldType = Partial<WorkRequestOldInterface>;