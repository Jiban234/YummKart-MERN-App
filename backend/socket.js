// import User from "./models/user.model.js";

// export const socketHandler = (io) => {
//   io.on("connection", (socket) => {
//     socket.on("identity", async ({ userId }) => {
//       try {
//         const user = await User.findByIdAndUpdate(
//           userId,
//           {
//             socketId: socket.id,
//             isOnline: true,
//           },
//           { new: true }
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     });


//     socket.on("disconnect",async()=>{
//         try {
//             await User.findOneAndUpdate({socketId:socket.id},{
//             socketId:null,
//             isOnline:false
//         })
//         } catch (error) {
//             console.log(error)
//         }
//     })
//   });
// };




// backend/socket.js
import User from "./models/user.model.js";

export const socketHandler = (io) => {
  console.log("🔌 Socket.IO handler initialized");

  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Handle user identity
    socket.on("identity", async ({ userId }) => {
      try {
        if (!userId) {
          console.log("⚠️ No userId provided");
          return;
        }

        const user = await User.findByIdAndUpdate(
          userId,
          {
            socketId: socket.id,
            isOnline: true,
          },
          { new: true }
        );

        if (user) {
          console.log(`👤 User ${user.fullName} (${userId}) is now online`);
          
          // ✅ CRITICAL FIX: Make user join their personal room
          socket.join(`user_${userId}`);
          console.log(`🏠 User joined room: user_${userId}`);
          
          // Notify others if needed
          socket.broadcast.emit("userOnline", {
            userId: user._id,
            role: user.role,
          });
        }
      } catch (error) {
        console.error("❌ Error in identity handler:", error);
      }
    });

    // Handle location updates (for delivery boys)
    socket.on("updateLocation", async ({ userId, coordinates }) => {
      try {
        await User.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: coordinates, // [longitude, latitude]
          },
        });

        console.log(`📍 Location updated for user: ${userId}`);

        // Broadcast location to relevant users (customers tracking their orders)
        socket.broadcast.emit("deliveryLocationUpdated", {
          userId,
          coordinates,
        });
      } catch (error) {
        console.error("❌ Error updating location:", error);
      }
    });

    // Handle order status updates
    socket.on("orderStatusUpdate", ({ orderId, shopId, status, customerId }) => {
      console.log(`📊 Order status update: ${orderId} -> ${status}`);
      
      // Emit to specific customer
      io.to(`user_${customerId}`).emit("orderStatusChanged", {
        orderId,
        shopId,
        status,
      });
    });

    // Handle disconnect
    socket.on("disconnect", async () => {
      console.log(`❌ User disconnected: ${socket.id}`);
      
      try {
        const user = await User.findOneAndUpdate(
          { socketId: socket.id },
          {
            socketId: null,
            isOnline: false,
          },
          { new: true }
        );

        if (user) {
          console.log(`👤 User ${user.fullName} is now offline`);
          
          // Notify others
          socket.broadcast.emit("userOffline", {
            userId: user._id,
            role: user.role,
          });
        }
      } catch (error) {
        console.error("❌ Error in disconnect handler:", error);
      }
    });
  });
};