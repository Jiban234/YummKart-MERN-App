import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// add-item
export const addItem = async (req, res) => {
  try {
    console.log("=== ADD ITEM DEBUG ===");
    console.log("req.userId:", req.userId);
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("======================");

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
    let image = "";
    if (req.file) {
      try {
        console.log("Uploading item image...");
        image = await uploadOnCloudinary(req.file.path);
        console.log("Image uploaded successfully:", image);
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

    // Add item to shop
    shop.items.push(item._id);
    await shop.save();

    // Populate shop with items and owner
    await shop.populate("items owner");

    console.log("Item added successfully!");

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      shop,
      item, // Also return the created item
    });
  } catch (error) {
    console.error("=== ADD ITEM ERROR ===");
    console.error("Error:", error);
    console.error("======================");
    
    return res.status(500).json({
      success: false,
      message: `Add item error: ${error.message}`,
    });
  }
};

// edit-item
export const editItem = async (req, res) => {
  try {
    console.log("=== EDIT ITEM DEBUG ===");
    console.log("itemId:", req.params.itemId);
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("=======================");

    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;

    // Find existing item first
    const existingItem = await Item.findById(itemId);
    if (!existingItem) {
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

    // Prepare update data
    const updateData = {
      name: name || existingItem.name,
      category: category || existingItem.category,
      foodType: foodType || existingItem.foodType,
      price: price ? parseFloat(price) : existingItem.price,
    };

    // Handle image upload
    if (req.file) {
      try {
        console.log("Uploading new item image...");
        const image = await uploadOnCloudinary(req.file.path);
        updateData.image = image;
        console.log("Image uploaded successfully:", image);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
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
    const item = await Item.findByIdAndUpdate(itemId, updateData, {
      new: true,
      runValidators: true,
    });

    console.log("Item updated successfully!");

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    console.error("=== EDIT ITEM ERROR ===");
    console.error("Error:", error);
    console.error("=======================");
    
    return res.status(500).json({
      success: false,
      message: `Item update error: ${error.message}`,
    });
  }
};