import { useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../components/userOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";

const MyOrders = () => {
  const navigate = useNavigate();
  const { userData, myOrders } = useSelector((state) => state.user);
  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex justify-center px-4">
      <div className="w-full max-w-[900px] p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/")}
          >
            <IoIosArrowRoundBack size={40} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {/* mapping orders */}
        <div className="space-y-6">
          {myOrders?.map((order, index) =>
            userData.role === "user" ? (
              <UserOrderCard data={order} key={index}/>
            ) : userData.role === "owner" ? (
              <OwnerOrderCard data={order} key={index}/>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
