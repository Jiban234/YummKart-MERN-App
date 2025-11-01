import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";

// place order
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;
    if (cartItems.length == 0 || !cartItems) {
      return res.status(404).json({
        success: false,
        message: "cart is empty",
      });
    }

    if (
      !deliveryAddress.text ||
      !deliveryAddress.latitude ||
      !deliveryAddress.longitude
    ) {
      return res.status(404).json({
        success: false,
        message: "Send complete delivery address",
      });
    }

    const groupItemsByShop = {};

    cartItems.forEach((item) => {
      const shopId = item.shop;
      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });

    const shopOrders = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");

        if (!shop) {
          return res.status(404).json({
            success: false,
            message: "No shop found for this user",
          });
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

    const newOrder = await Order.create({
      user: req.userId,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrders,
    });

    return res.status(200).json({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `place order error: ${error.message}`,
    });
  }
};

// user-orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({
      createdAt: -1,
    }).populate("shopOrders.shop","name")
    .populate("shopOrders.owner","name email mobile")
    .populate("shopOrders.shopOrderItems.item","name image price")

    return res.status(200).json({
      success: true,
      message: "Shop Retrieved Successfully",
      orders,
    }); 

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `get-user-order error: ${error.message}`,
    });
  }
};

// owner-orders
export const getOwnerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "shopOrders.owner": req.userId }).sort({
      createdAt: -1,
    }).populate("shopOrders.shop","name")
    .populate("user")
    .populate("shopOrders.shopOrderItems.item","name image price")

    return res.status(200).json({
      success: true,
      message: "Shop Retrieved Successfully",
      orders,
    }); 

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `get-user-order error: ${error.message}`,
    });
  }
};
