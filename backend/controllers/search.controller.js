// controllers/search.controller.js
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";

// Search for shops and items based on query
export const search = async (req, res) => {
  try {
    const { query, city } = req.query;

    // Return empty results if no query provided
    if (!query || query.trim() === "") {
      return res.status(200).json({
        success: true,
        message: "No search query provided",
        shops: [],
        items: [],
      });
    }

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required for search",
      });
    }

    const searchRegex = new RegExp(query, "i"); // Case-insensitive search

    // Find shops in the specified city that match the search query
    const shops = await Shop.find({
      city: { $regex: city, $options: "i" },
      name: { $regex: searchRegex },
    })
      .select("name image city state")
      .lean();

    // Get all shop IDs in the city
    const allShopsInCity = await Shop.find({
      city: { $regex: city, $options: "i" },
    }).select("_id");

    const shopIds = allShopsInCity.map((s) => s._id);

    // Find items that match the search query (by name or category)
    // AND belong to shops in the specified city
    const items = await Item.find({
      shop: { $in: shopIds },
      $or: [
        { name: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
      ],
    })
      .populate("shop", "name image city state")
      .lean();

    // Also include all items from shops that matched the search
    const shopMatchIds = shops.map((s) => s._id);
    const itemsFromMatchingShops = await Item.find({
      shop: { $in: shopMatchIds },
    })
      .populate("shop", "name image city state")
      .lean();

    // Combine items and remove duplicates
    const allItems = [...items];
    itemsFromMatchingShops.forEach((item) => {
      if (!allItems.find((i) => i._id.toString() === item._id.toString())) {
        allItems.push(item);
      }
    });

    return res.status(200).json({
      success: true,
      message: `Found ${shops.length} shops and ${allItems.length} items`,
      shops,
      items: allItems,
      query,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Search error: ${error.message}`,
    });
  }
};