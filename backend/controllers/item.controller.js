import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

/* add-item */
export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;

    // Validate required fields
    if (!name || !category || !foodType || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, category, foodType, price) are required",
      });
    }

    // Find shop
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found. Please create a shop first.",
      });
    }

    // Handle image upload
    let image = ""; // Default to empty string
    if (req.file && req.file.path) {
      // Check if file AND path exist
      try {
        image = await uploadOnCloudinary(req.file.path);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return res.status(500).json({
          success: false,
          message: `Image upload failed: ${uploadError.message}`,
        });
      }
    }

    // Create item
    const item = await Item.create({
      name,
      category,
      foodType,
      price: parseFloat(price), // Ensure price is a number
      image,
      shop: shop._id,
    });

    // Add item to the beginning of the array (most recent first) ✅
    shop.items.unshift(item._id); // Changed from push to unshift
    await shop.save();

    // Manually populate items with sorting by createdAt ✅
    const populatedShop = await Shop.findById(shop._id)
      .populate({
        path: "items",
        options: { sort: { createdAt: -1 } }, // Sort by most recently created
      })
      .populate("owner");

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      shop: populatedShop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Add item error: ${error.message}`,
    });
  }
};

/* edit-item */
export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;
    // Validate itemId format
    if (!itemId || !itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID format",
      });
    }

    // Find existing item first
    const existingItem = await Item.findById(itemId);
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Verify ownership (item's shop should belong to this user)
    const shop = await Shop.findOne({
      owner: req.userId,
      items: itemId,
    });
    if (!shop) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: This item doesn't belong to your shop",
      });
    }

    // Prepare update data
    const updateData = {
      name: name || existingItem.name,
      category: category || existingItem.category,
      foodType: foodType || existingItem.foodType,
      price: price ? parseFloat(price) : existingItem.price,
    };

    // Handle image upload
    if (req.file && req.file.path) {
      // Added path check ✅
      try {
        const image = await uploadOnCloudinary(req.file.path);
        updateData.image = image;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: `Image upload failed: ${uploadError.message}`,
        });
      }
    } else {
      // Keep existing image if no new image uploaded
      updateData.image = existingItem.image;
    }

    // Update item
    await Item.findByIdAndUpdate(itemId, updateData, {
      new: true,
      runValidators: true,
    });

    // Populate owner first
    await shop.populate("owner");

    // Manually populate items with sorting by updatedAt ✅
    const populatedShop = await Shop.findById(shop._id)
      .populate({
        path: "items",
        options: { sort: { updatedAt: -1 } }, // Sort by most recently updated
      })
      .populate("owner");

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      shop: populatedShop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Item update error: ${error.message}`,
    });
  }
};

/* get-item-by-id */
export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Validate itemId format
    if (!itemId || !itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID format",
      });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item retrieved successfully",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `get-item error: ${error.message}`,
    });
  }
};

/* delete-item */
export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Validate itemId format
    if (!itemId || !itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID format",
      });
    }

    // Find the item
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Verify ownership (item's shop should belong to this user)
    const shop = await Shop.findOne({ owner: req.userId, items: itemId });
    if (!shop) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: This item doesn't belong to your shop",
      });
    }

    // Remove item from shop's items array
    shop.items = shop.items.filter((id) => id.toString() !== itemId.toString());
    await shop.save();

    // Delete the item
    await Item.findByIdAndDelete(itemId);

    // Populate shop with updated items and owner
    const populatedShop = await Shop.findById(shop._id)
      .populate({
        path: "items",
        options: { sort: { createdAt: -1 } }, // Keep sorting consistent
      })
      .populate("owner");

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      shop: populatedShop,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: `Delete item error: ${error.message}`,
    });
  }
};

/* get-item-by-city */
export const getItemByCity = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    // Find shops in the specified city
    const shops = await Shop.find({
      city: { $regex: city, $options: "i" }, // Case-insensitive and partial search
    }).populate("items") // Populate items details if needed
    // .select("-__v"); // Exclude version key

    // Check if shops found
    if (!shops || shops.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No shops found in ${city}`,
      });
    }

    // Extract shop IDs
    const shopIds = shops.map((shop)=>shop._id)

     // Find all items from these shops
    const items = await Item.find({shop:{$in:shopIds}})

    // Check if items found
    if (!items || items.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No items found in shops from ${city}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      items,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `get item by city error: ${error.message}`,
    });
  }
};
