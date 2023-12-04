import io from 'socket.io-client';
import { SOCKET_BASE_URL } from '../constant/apiConstants';

const socket = io.connect(`${SOCKET_BASE_URL}`);

socket.on('connect', () => {
    console.log('Socket connection is open');
});
   
socket.on('disconnect', () => {
    console.log('Socket connection is closed');
});

socket.on('connect_error', (error) => {
    console.log('Connection error: ', error);
});

export default socket;
