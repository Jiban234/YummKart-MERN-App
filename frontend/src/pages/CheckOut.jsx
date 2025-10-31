import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { TbCurrentLocation } from "react-icons/tb";
import { MdPhoneIphone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
import { useEffect, useState } from "react";

function RecenterMap({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location?.lat && location?.lon) {
      map.setView([location.lat, location.lon], 16, { animate: true });
    }
  }, [location, map]);

  return null;
}

const CheckOut = () => {
  const { location, address } = useSelector((state) => state.map);
  const { cartItems } = useSelector((state) => state.user);
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryFee] = useState(40);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_GEOAPI_KEY;

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();

  // handlers
  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(response?.data?.results[0]?.address_line2));
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(setLocation({ lat: latitude, lon: longitude }));
        getAddressByLatLng(latitude, longitude);
      },
      (error) => {
        console.log("Error getting location:", error);
      }
    );
  };

  const getLatLngByAddress = async () => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${apiKey}`
      );
      const { lat, lon } = response?.data?.features[0]?.properties;
      dispatch(setLocation({ lat, lon }));
      dispatch(setAddress(addressInput));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
    // Add your place order logic here
    console.log("Order placed");
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-6">
      {/* Header + Content wrapper */}
      <div className="w-full max-w-[900px] mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        {/* Header with Back Arrow */}
        <div className="flex items-center gap-4 mb-2">
          <div
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/cart")}
          >
            <IoIosArrowRoundBack size={40} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Checkout
          </h1>
        </div>

        {/* MAP Section*/}
        <section className="pb-6">
          <h2 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <FaLocationDot size={18} className="text-[#ff4d2d]" />
            Delivery Location
          </h2>

          {/* location search bar */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] focus:border-transparent"
              placeholder="Enter your delivery address"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            {/* search button */}
            <button
              className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors"
              onClick={getLatLngByAddress}
            >
              <FaSearch size={16} />
            </button>
            {/* recenter button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors"
              onClick={getCurrentLocation}
            >
              <TbCurrentLocation size={18} />
            </button>
          </div>

          {/* map */}
          <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
            <div className="h-56 md:h-64 w-full">
              <MapContainer
                center={[location?.lat || 20.2961, location?.lon || 85.8245]}
                zoom={16}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                {location?.lat && location?.lon && (
                  <Marker
                    position={[location.lat, location.lon]}
                    draggable
                    eventHandlers={{ dragend: onDragEnd }}
                  />
                )}
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Payment Method Section */}
        <section className="pb-6">
          <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-800">
            Payment Method
          </h2>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {/* Cash on Delivery */}
            <div
              className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                paymentMethod === "cod"
                  ? "border-[#ff4d2d] bg-orange-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaMoneyBillWave className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">
                  Cash on Delivery
                </h3>
                <p className="text-xs text-gray-500">
                  Pay when your food arrives
                </p>
              </div>
            </div>

            {/* UPI / Card */}
            <div
              className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                paymentMethod === "online"
                  ? "border-[#ff4d2d] bg-orange-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setPaymentMethod("online")}
            >
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MdPhoneIphone className="text-purple-600 text-lg" />
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaCreditCard className="text-blue-600 text-base" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">
                  UPI / Credit / Debit Card
                </h3>
                <p className="text-xs text-gray-500">
                  Pay securely online
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary Section */}
        <section>
          <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="border-2 border-gray-300 rounded-xl p-5 space-y-3">
            {/* Cart Items */}
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-700 text-sm">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-800 font-medium text-sm">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-2">
                No items in cart
              </div>
            )}

            {/* Divider */}
            <div className="border-t-2 border-gray-200 pt-3 space-y-2.5">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-semibold text-sm">Subtotal</span>
                <span className="text-gray-800 font-semibold text-sm">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Delivery Fee</span>
                <span className="text-gray-800 text-sm">₹{deliveryFee}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-[#ff4d2d] font-bold text-lg">Total</span>
                <span className="text-[#ff4d2d] font-bold text-lg">
                  ₹{(subtotal + deliveryFee).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white font-semibold py-4 rounded-xl transition-colors text-xl shadow-md hover:shadow-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;