import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// New shop creation
export const createShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.create({
      name,
      city,
      state,
      address,
      image,
      owner: req.userId,
    });
    await shop.populate("owner")
    return res.status(201).json({
        success:true,
        message:"Shop Created Successfully",
        shop
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:`Error in shop creation : ${error.message}`,
    })
  }
};

// edit shop
export const editShop = async (req,res) => {
    
}


