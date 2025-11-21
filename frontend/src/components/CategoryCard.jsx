import React from "react";



// const CategoryCard = ({ name, image, onClick, isActive }) => {
//   return (
//     <div 
//       className={`w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl border-2 shrink-0 overflow-hidden bg-white shadow-xl hover:shadow-lg cursor-pointer relative transition-all duration-300 ${
//         isActive ? 'border-[#ff4d2d] border-4 ring-4 ring-[#ff4d2d]/30' : 'border-[#ff4d2d]'
//       }`}
//       onClick={onClick}
//     >
//       <img
//         src={image}
//         alt={name}
//         className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
//       />
//       <div className={`absolute bottom-0 w-full left-0 bg-opacity-95 px-3 py-1 rounded-t-2xl text-center shadow text-sm font-medium backdrop-blur ${
//         isActive ? 'bg-[#ff4d2d] text-white' : 'bg-[#ffffff96] text-gray-800'
//       }`}>
//         {name}
//       </div>
//       {isActive && name !== "All" && (
//         <div className="absolute top-2 right-2 bg-[#ff4d2d] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
//           ✓
//         </div>
//       )}
//     </div>
//   );
// };

const CategoryCard = ({ name, image, onClick, isActive, showMenuButton, onMenuClick }) => {
  return (
    <div 
      className={`w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl border-2 shrink-0 overflow-hidden bg-white shadow-xl hover:shadow-lg relative transition-all duration-300 ${
        isActive ? 'border-[#ff4d2d] border-4 ring-4 ring-[#ff4d2d]/30' : 'border-[#ff4d2d]'
      }`}
    >
      {/* Clickable Image Area */}
      <div 
        onClick={onClick}
        className="w-full h-full cursor-pointer"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <div className={`absolute bottom-0 w-full left-0 bg-opacity-95 px-3 py-1 rounded-t-2xl text-center shadow text-sm font-medium backdrop-blur ${
          isActive ? 'bg-[#ff4d2d] text-white' : 'bg-[#ffffff96] text-gray-800'
        }`}>
          {name}
        </div>
      </div>

      {/* Active Checkmark */}
      {isActive && name !== "All" && (
        <div className="absolute top-2 right-2 bg-[#ff4d2d] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
          ✓
        </div>
      )}

      {/* Menu Button for Shops */}
      {showMenuButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick();
          }}
          className="absolute top-2 left-2 bg-[#ff4d2d] hover:bg-[#e63e1f] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg transition-all duration-200 hover:scale-105 z-20"
        >
          Menu
        </button>
      )}
    </div>
  );
};

export default CategoryCard;
