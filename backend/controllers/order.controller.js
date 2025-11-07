import DeliveryAssignment from "../models/deliveryAssignment.model.js";
import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";

// place order
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;

    // Validate cart
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Validate delivery address
    if (
      !deliveryAddress.text ||
      !deliveryAddress.latitude ||
      !deliveryAddress.longitude
    ) {
      return res.status(400).json({
        success: false,
        message: "Send complete delivery address",
      });
    }

    // Group items by shop
    const groupItemsByShop = {};

    cartItems.forEach((item) => {
      const shopId = item.shop._id;
      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });

    // Create shop orders
    const shopOrders = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");

        if (!shop) {
          throw new Error(`Shop with ID ${shopId} not found`);
        }

        const items = groupItemsByShop[shopId];
        const subtotal = items.reduce(
          (sum, item) => sum + Number(item.price) * Number(item.quantity),
          0
        );

        return {
          shop: shop._id,
          owner: shop.owner._id,
          subtotal,
          shopOrderItems: items.map((i) => ({
            item: i.id,
            price: i.price,
            quantity: i.quantity,
            name: i.name,
          })),
        };
      })
    );

    // Create order
    const newOrder = await Order.create({
      user: req.userId,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrders,
    });

    await newOrder.populate(
      "shopOrders.shopOrderItems.item",
      "name image price"
    );
    await newOrder.populate("shopOrders.shop", "name");

    return res.status(200).json({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (error) {
    console.error("Place order error:", error);
    return res.status(500).json({
      success: false,
      message: `Place order error: ${error.message}`,
    });
  }
};

// getting 'My Orders' for User and 'Pending Orders' for Owner
export const getMyOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.role === "user") {
      const orders = await Order.find({ user: req.userId })
        .sort({
          createdAt: -1,
        })
        .populate("shopOrders.shop", "name")
        .populate("shopOrders.owner", "name email mobile")
        .populate("shopOrders.shopOrderItems.item", "name image price");

      return res.status(200).json({
        success: true,
        message: "Orders Retrieved Successfully",
        orders,
      });
    } else if (user.role === "owner") {
      const orders = await Order.find({ "shopOrders.owner": req.userId })
        .sort({
          createdAt: -1,
        })
        .populate("shopOrders.shop", "name")
        .populate("shopOrders.owner", "name email mobile")
        .populate("user", "fullName email mobile")
        .populate("shopOrders.shopOrderItems.item", "name image price");

      // Filter to only include owner's shop orders in each order
      const filteredOrders = orders.map((order) => ({
        _id: order._id,
        paymentMethod: order.paymentMethod,
        deliveryAddress: order.deliveryAddress,
        user: order.user,
        shopOrders: order.shopOrders.filter(
          (o) => o.owner._id.toString() === req.userId
        ),
        createdAt: order.createdAt,
      }));

      return res.status(200).json({
        success: true,
        message: "Orders Retrieved Successfully",
        orders: filteredOrders,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `get-user-order error: ${error.message}`,
    });
  }
};

// update order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const shopOrder = order.shopOrders.find(
      (o) => o.shop.toString() === shopId.toString()
    );

    if (!shopOrder) {
      return res.status(404).json({
        success: false,
        message: "Shop not found or unauthorized",
      });
    }
    // Update status
    shopOrder.status = status;

    let deliveryBoysPayload = [];

    // Auto-assign delivery boy when status changes to "out of delivery"
    if (status === "out of delivery" && !shopOrder.assignedDeliveryBoy) {
      const { longitude, latitude } = order.deliveryAddress;

      // Validate coordinates
      if (!longitude || !latitude) {
        await order.save();
        return res.status(200).json({
          success: true,
          message:
            "Status updated but delivery address coordinates are missing",
        });
      }

      try {
        // Find nearby delivery boys within 5km radius
        const nearbyDeliveryBoys = await User.find({
          role: "deliveryBoy",
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [Number(longitude), Number(latitude)],
              },
              $maxDistance: 5000, // 5km in meters
            },
          },
        });

        if (nearbyDeliveryBoys.length === 0) {
          console.log("No nearby delivery boys found");
          await order.save();
          return res.status(200).json({
            success: true,
            message: "Status updated but no delivery boys found nearby",
            shopOrder,
          });
        }

        // Get IDs of nearby delivery boys
        const nearByIds = nearbyDeliveryBoys.map((b) => b._id);

        // Find busy delivery boys
        const busyIds = await DeliveryAssignment.find({
          assignedTo: {
            $in: nearByIds,
          },
          status: { $nin: ["broadcasted", "completed"] },
        }).distinct("assignedTo");

        // Filter available delivery boys
        const busyIdSet = new Set(busyIds.map((id) => id.toString()));
        const availableBoys = nearbyDeliveryBoys.filter(
          (b) => !busyIdSet.has(b._id.toString())
        );

        if (availableBoys.length === 0) {
          console.log("All nearby delivery boys are busy");
          await order.save();
          return res.json({
            success: false,
            message:
              "Order status updated but all nearby delivery boys are busy",
            shopOrder,
          });
        }

        const candidates = availableBoys.map((b) => b._id);

        // Create delivery assignment
        const deliveryAssignment = await DeliveryAssignment.create({
          order: order._id,
          shop: shopOrder.shop,
          shopOrderId: shopOrder._id,
          broadcastedTo: candidates,
          status: "broadcasted",
          createdAt: new Date(),
        });

        shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo;
        shopOrder.assignment = deliveryAssignment._id;

        // Prepare delivery boy payload (for real-time notifications)
        deliveryBoysPayload = availableBoys.map((b) => ({
          id: b._id,
          fullName: b.fullName,
          longitude: b.location.coordinates?.[0],
          latitude: b.location.coordinates?.[1],
          mobile: b.mobile,
        }));
        console.log(`Broadcasted to ${availableBoys.length} delivery boys`);
      } catch (error) {
        console.error("Delivery assignment error:", error);
        // Continue without delivery assignment
      }
    }

    // Save the order
    await order.save();
    // Find the updated shop order
    const updatedShopOrder = order.shopOrders.find(
      (o) => o.shop.toString() === shopId.toString()
    );

    // Populate shop details AND assignment field
    await order.populate("shopOrders.shop", "name");
    await order.populate(
      "shopOrders.assignedDeliveryBoy",
      "fullName email mobile"
    );
    await order.populate("shopOrders.assignment"); // ADD THIS LINE

    

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      shopOrder: updatedShopOrder,
      assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy,
      availableBoys: deliveryBoysPayload,
      assignment: updatedShopOrder?.assignment?._id || null, // SAFE ACCESS
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      success: false,
      message: `Update status error: ${error.message}`,
      error: error.stack,
    });
  }
};
