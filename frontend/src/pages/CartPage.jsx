import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import { BsCart3 } from "react-icons/bs";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalQuantity } = useSelector((state) => state.user);

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center p-4 md:p-6">
      <div className="w-full max-w-[900px]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/")}
          >
            <IoIosArrowRoundBack size={40} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        </div>

        {cartItems?.length === 0 ? (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-orange-50 rounded-full p-8 mb-6">
              <BsCart3 className="text-[#ff4d2d] text-6xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add some delicious items to get started!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#ff4d2d] hover:bg-[#e63e1f] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-md"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems?.map((item) => (
                <CartItemCard data={item} key={item.id} />
              ))}
            </div>

            {/* Total Amount Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">
                    Total Items: {totalQuantity}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Total Amount
                  </h2>
                </div>
                <p className="text-3xl font-bold text-[#ff4d2d]">
                  ₹{totalAmount}
                </p>
              </div>

              {/* Proceed to Checkout Button */}
              <button className="w-full bg-[#ff4d2d] hover:bg-[#e63e1f] text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-md cursor-pointer"
              onClick={()=>navigate("/checkout")}>
                Proceed to CheckOut
              </button>
            </div>

            {/* Optional: Delivery Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <p className="font-semibold text-green-800">
                  Free Delivery Available
                </p>
                <p className="text-sm text-green-600">
                  Your order qualifies for free delivery!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;