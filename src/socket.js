import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_WS_BASE_URL;
const socket = io(URL);

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export default socket;
