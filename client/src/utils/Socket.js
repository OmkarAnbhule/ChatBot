let socket = null;

export const useSocket = () => {
    // Ensure socket connection is only created once
    if (!socket) {
        socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_API_URL);

        // Event listener for socket open event
        socket.onopen = () => {
            console.log('Connected to server');
        };

        // Event listener for socket close event
        socket.onclose = () => {
            console.log('Disconnected from server');
        };

        // Event listener for socket error event
        socket.onerror = (error) => {
            console.error('Socket error:', error);
        };
    }

    return socket;
};
