import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// New shop creation
export const createAndEditShop = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. req.userId is missing.",
      });
    }

    const { name, city, state, address } = req.body;

    // Validate required fields
    if (!name || !city || !state || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, city, state, address) are required",
      });
    }

    // Check if shop already exists
    let shop = await Shop.findOne({ owner: req.userId });

    // Prepare update object
    const updateData = {
      name,
      city,
      state,
      address,
      owner: req.userId,
    };

    // Only update image if a new one was uploaded
    if (req.file) {
      try {
        const imageUrl = await uploadOnCloudinary(req.file.path);
        updateData.image = imageUrl;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: `Image upload failed: ${uploadError.message}`,
        });
      }
    } else if (shop && shop.image) {
      // Keep existing image if no new image was uploaded
      updateData.image = shop.image;
    }

    let isNewShop = false;

    if (!shop) {
      shop = await Shop.create(updateData);
      isNewShop = true;
    } else {
      shop = await Shop.findByIdAndUpdate(shop._id, updateData, {
        new: true,
        runValidators: true,
      });
    }

    // Populate owner and items
    shop = await shop.populate("owner items");

    return res.status(201).json({
      success: true,
      message: isNewShop
        ? "Shop Created Successfully"
        : "Shop Updated Successfully",
      shop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in shop creation/edit: ${error.message}`,
    });
  }
};

// Get my shop
export const getMyShop = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const shop = await Shop.findOne({ owner: req.userId })
      .populate({
        path: "items",
        options: { sort: { createdAt: -1 } }, // Sort by newest first ✅
      })
      .populate("owner");

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "No shop found for this user",
        shop: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Shop Retrieved Successfully",
      shop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `get-my-shop error: ${error.message}`,
    });
  }
};

// get-shop-by-city
export const getShopByCity = async (req, res) => {
  try {
     
    const { city } = req.params; // or req.query depending on your route setup

    // Validate city parameter
    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City parameter is required",
      });
    }

    // Find shops in the specified city

    const shops = await Shop.find({
      city: { $regex: city, $options: "i" }, // Case-insensitive and partial search
    })
    .populate("items"); // Populate items details if needed
    // .select("-__v"); // Exclude version key

    // Check if shops found
    if (!shops || shops.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No shops found in ${city}`,
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      count: shops.length,
      shops,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Error fetching shops",
      error: error.message,
    });
  }
};
