interface User {
    id: string;
    badgeId: string;
    name: string;
}

export interface CommentInterface {
    id: string;
    title: string;
    text: string;
    inActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    TicketId: string;
    UserId: string;
    User: User;
}