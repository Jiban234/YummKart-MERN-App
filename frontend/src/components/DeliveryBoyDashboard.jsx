import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { MdDeliveryDining, MdLocationOn, MdShoppingBag } from "react-icons/md";
import { serverUrl } from "../App";
import axios from "axios";
import DeliveryBoyTracking from "./DeliveryBoyTracking";
import OTPInput from "../utils/otpInput";

const DeliveryBoyDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getAssignments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${serverUrl}/api/order/get-assignments`,
        { withCredentials: true }
      );
      setAvailableAssignments(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        { withCredentials: true }
      );
      console.log(response.data);
      setCurrentOrder(response.data);
    } catch (error) {
      console.log(error);
      setCurrentOrder(null);
    }
  };

  const handleAcceptOrder = async (assignmentId) => {
    console.log("Accepting order:", assignmentId);
    try {
      const response = await axios.get(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        { withCredentials: true }
      );

      console.log(response.data);
      await getCurrentOrder();
      await getAssignments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendOtp = async () => {
    if (!currentOrder?.data?._id || !currentOrder?.data?.shopOrder?._id) {
      setError("Invalid order data");
      return;
    }

    try {
      setOtpSending(true);
      setError("");
      setSuccessMessage("");

      const response = await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder.data._id,
          shopOrderId: currentOrder.data.shopOrder._id,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      setSuccessMessage(response.data.message);
      setShowOtpBox(true);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async (otpValue) => {
    if (!otpValue || otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setOtpVerifying(true);
      setError("");

      const response = await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder.data._id,
          shopOrderId: currentOrder.data.shopOrder._id,
          otp: otpValue,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      setSuccessMessage(response.data.message);

      // Refresh current order and assignments after successful delivery
      setTimeout(async () => {
        await getCurrentOrder();
        await getAssignments();
        setShowOtpBox(false);
        setOtp("");
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Invalid or expired OTP. Please try again."
      );
      setOtp("");
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleOtpReset = () => {
    setOtp("");
    setError("");
  };

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
  }, [userData]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] p-4 overflow-y-auto">
      <Navbar />

      {/* Header */}
      <div className="w-full max-w-[800px] flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {userData.role === "deliveryBoy" && (
          <div className="flex items-center gap-2 cursor-pointer relative px-4 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">
            <MdDeliveryDining size={22} />
            <span className="hidden md:block">Deliveries</span>
            <span className="absolute -right-2 -top-2 text-xs font-bold text-white rounded-full bg-[#ff4d2d] px-2 py-0.5">
              {availableAssignments?.data?.length || 0}
            </span>
          </div>
        )}
      </div>

      {/* Welcome Card */}
      <div className="w-full max-w-[800px]">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 flex flex-col items-center justify-start">
          <h2 className="text-2xl font-bold text-[#ff4d2d] mb-3">
            Welcome, {userData.fullName}! {"\u{1F44B}"}
          </h2>

          <div className="flex items-center gap-2 text-gray-600">
            <MdLocationOn className="text-[#ff4d2d]" size={20} />
            <p className="text-sm">
              <span className="font-semibold">Lat:</span>{" "}
              {userData.location.coordinates[1]} |
              <span className="font-semibold ml-2">Long:</span>{" "}
              {userData.location.coordinates[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Available Orders Section */}
      {!currentOrder && (
        <div className="w-full max-w-[800px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Orders
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff4d2d]"></div>
            </div>
          ) : availableAssignments?.data?.length > 0 ? (
            <div className="space-y-4">
              {availableAssignments.data.map((assignment) => (
                <div
                  key={assignment.assignmentId}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-orange-100"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {assignment.shopName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Order ID: {assignment.orderId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#ff4d2d]">
                        ₹{assignment.subtotal}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MdLocationOn
                        className="text-[#ff4d2d] mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold mb-1">Delivery Address:</p>
                        <p>{assignment.deliveryAddress.text}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleAcceptOrder(assignment.assignmentId)}
                    className="w-full bg-[#ff4d2d] hover:bg-[#e63e1e] text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <MdDeliveryDining size={22} />
                    Accept Delivery
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-orange-100">
              <MdDeliveryDining
                className="mx-auto mb-4 text-gray-300"
                size={64}
              />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Available Orders
              </h3>
              <p className="text-gray-500">
                Check back later for new delivery assignments
              </p>
            </div>
          )}
        </div>
      )}

      {/* Current Order Section */}
      {currentOrder && (
        <div className="w-full max-w-[800px] space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              📦 Current Delivery
            </h2>
            <div
              className={`px-4 py-2 rounded-full font-semibold text-sm ${
                currentOrder.data.shopOrder.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : currentOrder.data.shopOrder.status === "preparing"
                  ? "bg-blue-100 text-blue-800"
                  : currentOrder.data.shopOrder.status === "out of delivery"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {currentOrder.data.shopOrder.status.toUpperCase()}
            </div>
          </div>

          {/* Order Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Order #{currentOrder.data._id.slice(-8)}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Subtotal: ₹{currentOrder.data.shopOrder.subtotal}
                </p>
              </div>
              <div className="text-2xl font-bold text-[#ff4d2d]">
                ₹{currentOrder.data.shopOrder.subtotal}
              </div>
            </div>

            {/* Items List */}
            <div className="mb-4 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <MdShoppingBag className="text-[#ff4d2d]" size={20} />
                <h4 className="font-semibold text-gray-700">Order Items</h4>
              </div>
              <div className="space-y-2">
                {currentOrder.data.shopOrder.shopOrderItems.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-700">
                        {item.name}{" "}
                        <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span className="font-medium text-gray-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Map Tracking */}
            <DeliveryBoyTracking data={currentOrder.data} />
          </div>

          {/* Customer Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Customer Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-[#ff4d2d] font-semibold">
                    {currentOrder.data.user.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {currentOrder.data.user.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {currentOrder.data.user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-green-600 text-xl">📞</span>
                <a
                  href={`tel:${currentOrder.data.user.mobile}`}
                  className="font-medium text-green-700 hover:underline"
                >
                  {currentOrder.data.user.mobile}
                </a>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <MdLocationOn
                    className="text-blue-600 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">
                      Delivery Address:
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentOrder.data.deliveryAddress.text}
                    </p>
                    {currentOrder.data.customerLocation.lat &&
                      currentOrder.data.customerLocation.lon && (
                        <a
                          href={`https://www.google.com/maps?q=${currentOrder.data.customerLocation.lat},${currentOrder.data.customerLocation.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm font-medium hover:underline mt-2 inline-block"
                        >
                          Open in Maps →
                        </a>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Update Actions */}
          {!showOtpBox ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Update Delivery Status
              </h3>

              <div className="space-y-3">
                {currentOrder.data.shopOrder.status === "out of delivery" && (
                  <button
                    onClick={handleSendOtp}
                    disabled={otpSending}
                    className={`w-full ${
                      otpSending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2`}
                  >
                    {otpSending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <span className="text-xl">✅</span>
                        Mark as Delivered
                      </>
                    )}
                  </button>
                )}

                {currentOrder.data.shopOrder.status === "delivered" && (
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <span className="text-5xl mb-2 block">✅</span>
                    <p className="text-green-700 font-semibold">
                      Order Delivered Successfully!
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm text-center">{error}</p>
                  </div>
                )}

                {successMessage && !showOtpBox && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm text-center">
                      {successMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                Verify Delivery OTP
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                OTP has been sent to{" "}
                <span className="font-semibold text-[#ff4d2d]">
                  {currentOrder.data.user.fullName}
                </span>
              </p>

              <OTPInput
                length={6}
                onComplete={handleVerifyOtp}
                onReset={handleOtpReset}
              />

              {successMessage && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm text-center flex items-center justify-center gap-2">
                    <span className="text-xl">✅</span>
                    {successMessage}
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm text-center">{error}</p>
                </div>
              )}

              {otpVerifying && (
                <div className="mt-4 flex justify-center items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#ff4d2d]"></div>
                  <p className="text-sm text-gray-600">Verifying OTP...</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSendOtp}
                  disabled={otpSending}
                  className="flex-1 bg-orange-100 hover:bg-orange-200 text-[#ff4d2d] font-semibold py-2 rounded-lg transition-colors duration-200 text-sm disabled:opacity-50"
                >
                  {otpSending ? "Sending..." : "Resend OTP"}
                </button>
                <button
                  onClick={() => {
                    setShowOtpBox(false);
                    setError("");
                    setSuccessMessage("");
                    setOtp("");
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-colors duration-200 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryBoyDashboard;
