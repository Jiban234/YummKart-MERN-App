import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// New shop creation
export const createAndEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    // check if shop is already exist
    // if already exists then update shop otherwise create new shop
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
      const image = await uploadOnCloudinary(req.file.path);
      updateData.image = image;
    }
    if (!shop) {
      shop = await Shop.create(updateData);
    } else {
      shop = await Shop.findByIdAndUpdate(shop._id, updateData, { new: true });
    }

    await shop.populate("owner");
    return res.status(201).json({
      success: true,
      message: shop ? "Shop Updated Successfully" : "Shop Created Successfully",
      shop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in shop creation/edit: ${error.message}`,
    });
  }
};

//get-my-shop
export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate(
      "owner items"
    );
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Shop Returned Successfully",
      shop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `get-my-shop error : ${error.message}`,
    });
  }
};
