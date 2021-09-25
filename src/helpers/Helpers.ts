import ChatSocket from '@/helpers/Socket';
import { Message, User } from '@/type/state';
import { ChatSocketMessages } from '@/type/enums';

export function sendChatJoin(payload: User) {
  ChatSocket.emit(ChatSocketMessages.CHAT_JOIN, payload);
}

export function sendMessage(payload: Message) {
  ChatSocket.emit(ChatSocketMessages.CHAT_MESSAGE, payload);
}

export function createMessage(user: User, value: string): Message {
  return {
    id: Date.now(),
    user: user.username,
    value,
  };
}

export function createNotification(value: string): Message {
  return {
    id: Date.now(),
    user: 'App',
    value,
  };
}

export function kickUser(userId: string) {
  ChatSocket.emit(ChatSocketMessages.USER_KICK, { userId });
}

export function logoffUser() {
  ChatSocket.emit(ChatSocketMessages.USER_LOGOFF);
}
