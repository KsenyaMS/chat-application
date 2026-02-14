
export type Dialog = {
    id: string,
    userIds: string[],
    lastMessageTime: number,
    lastVisitedTime: number,
}

export type Message = {
    id: string,
    userId: string,
    createdOn: number,
}

export type MessageContent = {
    content: string,
    contentId: string,
}