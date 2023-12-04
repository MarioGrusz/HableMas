import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000/');

socket.on('connect', () => {
    console.log('Socket connection is open');
});
   
socket.on('disconnect', () => {
    console.log('Socket connection is closed');
});

export default socket;
