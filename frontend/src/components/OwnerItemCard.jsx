import React from "react";
import { FaUtensils, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const OwnerItemCard = ({ item }) => {
  const navigate = useNavigate();
  const handleDelete = ()=>{
    
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Item Image */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUtensils className="text-4xl text-gray-400" />
        )}
      </div>

      {/* Item Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1">
          {item.name}
        </h3>
        
        {item.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Category and Food Type */}
        <div className="flex gap-2 mb-3">
          {item.category && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
              {item.category}
            </span>
          )}
          {item.foodType && (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              {item.foodType}
            </span>
          )}
        </div>

        {/* Price and Edit Button */}
        {/* Price and Edit/Delete Buttons */}
<div className="flex justify-between items-center mt-3">
  <p className="text-orange-500 font-bold text-xl">₹{item.price}</p>

  <div className="flex gap-2">
    {/* Edit Button */}
    <button
      onClick={() => navigate(`/edit-item/${item._id}`)}
      className="flex items-center text-gray-600 hover:text-orange-500 transition-colors p-2 hover:bg-orange-50 rounded-lg cursor-pointer"
      title="Edit Item"
    >
      <FaEdit size={20} />
    </button>

    {/* Delete Button */}
    <button
      onClick={() => handleDelete(item._id)} // <-- call your delete handler
      className="flex items-center text-gray-600 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg cursor-pointer"
      title="Delete Item"
    >
      <MdDelete size={20} />
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default OwnerItemCard;