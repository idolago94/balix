import Messages from './Messages';

export default userService = {
    getConversationMessages: (convId) => {
        return Messages.filter(conv => conv.conversationId == convId)
    },
    getConversationMessagesByPeopleTalks: (user1, user2) => {
        return Messages.filter(conv => 
            (conv.senderId == user1.userId && conv.receiverId == user2.userId) ||
            (conv.senderId == user2.userId && conv.receiverId == user1.userId)
        )
    }
}