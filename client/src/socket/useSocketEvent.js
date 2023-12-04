import socket from "./socket";

const useSocketEvent = (eventName, handler) => {

  useEffect(() => {
    socket.on(eventName, handler);
    return () => {
      socket.off(eventName);
    };
  }, [eventName, handler]);

};

export default useSocketEvent

