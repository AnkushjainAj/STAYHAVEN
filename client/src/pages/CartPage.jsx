import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../context/UserContext";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // ✅ Calculate Total Price (formatted string for display)
  const displayTotalPrice = () => {
    try {
      return cart
        .reduce((total, item) => total + item.price, 0)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  // ✅ Raw total price (number) for backend or navigation
  const rawTotalPrice = () => {
    try {
      return cart.reduce((total, item) => total + item.price, 0);
    } catch (error) {
      return 0;
    }
  };

  // ✅ Remove item from cart
  const handleRemove = (id) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== id);
      setCart(updatedCart);
      // No need to manually update localStorage if useCart handles it
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Proceed to payment
  const handleCheckIn = () => {
    if (!auth?.token) {
      toast.error("Authentication required to proceed!");
      return navigate("/login");
    }

    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }

    // Navigate to payment with clean data
    navigate("/payment", {
      state: {
        totalPrice: rawTotalPrice(),
        products: cart.map((product) => ({
          title: product.title,
          postId: product._id,
          price: product.price,
        })),
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full p-6 gap-8 bg-gray-50">
      {/* Left Side - Cart Items */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-6 p-4 border-b border-gray-200 last:border-none"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleRemove(product._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrashAlt size={20} />
              </button>

              {/* Image */}
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-28 h-28 object-cover rounded-lg"
              />

              {/* Info */}
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-700">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.description?.substring(0, 50)}
                </p>
              </div>

              {/* Price */}
              <div className="ml-auto text-lg font-semibold text-gray-800">
                ${product.price}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">Your cart is empty.</p>
        )}
      </div>

      {/* Right Side - Price Summary */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Price Details</h2>

        {cart.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between items-center text-gray-700"
                >
                  <span>{product.title}</span>
                  <span className="font-semibold">${product.price}</span>
                </div>
              ))}
            </div>

            <hr className="my-6 border-gray-300" />

            <div className="flex justify-between items-center font-bold text-xl text-gray-800">
              <span>Total:</span>
              <span>{displayTotalPrice()}</span>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
              onClick={handleCheckIn}
            >
              {auth?.token ? "Proceed to Checkout" : "Please Login"}
            </button>
          </>
        ) : (
          <p className="text-gray-500">No items to display.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
