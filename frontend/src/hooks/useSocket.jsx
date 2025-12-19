// import { useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";

// /**
//  * Custom hook to listen to socket events with proper cleanup
//  * @param {string} event - Socket event name
//  * @param {function} handler - Callback function to execute
//  */
// export const useSocket = (event, handler) => {
//   const { socket } = useSelector((state) => state.user);

//   // Memoize the handler to prevent unnecessary re-subscriptions
//   const memoizedHandler = useCallback(handler, [handler]);

//   useEffect(() => {
//     if (!socket) {
//       console.log(`⚠️ Socket not available for event: ${event}`);
//       return;
//     }

//     console.log(`✅ Listening to socket event: ${event}`);
//     socket.on(event, memoizedHandler);

//     // Cleanup on unmount or when dependencies change
//     return () => {
//       console.log(`🧹 Cleaning up socket event: ${event}`);
//       socket.off(event, memoizedHandler);
//     };
//   }, [socket, event, memoizedHandler]);
// };

// /**
//  * Hook to emit socket events safely
//  * @returns {function} emit function
//  */
// export const useSocketEmit = () => {
//   const { socket } = useSelector((state) => state.user);

//   const emit = useCallback(
//     (event, data) => {
//       if (socket && socket.connected) {
//         socket.emit(event, data);
//         console.log(`📤 Emitted socket event: ${event}`, data);
//       } else {
//         console.warn(`⚠️ Socket not connected. Cannot emit event: ${event}`);
//       }
//     },
//     [socket]
//   );

//   return emit;
// };





import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

/**
 * Custom hook to listen to socket events with proper cleanup
 * @param {string} event - Socket event name
 * @param {function} handler - Callback function to execute
 */
export const useSocket = (event, handler) => {
  const { socket } = useSelector((state) => state.user);

  // ✅ Memoize the handler to prevent unnecessary re-subscriptions
  const memoizedHandler = useCallback(handler, [handler]);

  useEffect(() => {
    if (!socket) {
      console.log(`⚠️ Socket not available for event: ${event}`);
      return;
    }

    console.log(`✅ Listening to socket event: ${event}`);
    socket.on(event, memoizedHandler);

    // Cleanup on unmount or when dependencies change
    return () => {
      console.log(`🧹 Cleaning up socket event: ${event}`);
      socket.off(event, memoizedHandler);
    };
  }, [socket, event, memoizedHandler]);
};











