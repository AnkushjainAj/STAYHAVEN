import React, { useState, useEffect } from "react";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBook } from "../context/Booking";
import { useAuth } from "../context/UserContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useBook();
  const [auth] = useAuth();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (location?.state) {
      const { totalPrice, products, price, product, postId } = location.state;

      if (products && products.length > 0) {
        setProducts(products);
        setAmount(totalPrice);
        setTitle(products.map((p) => p.title).join(", "));
      } else {
        setProducts([{ title: product, postId, price }]);
        setAmount(price);
        setTitle(product);
      }
    }
  }, [location]);

  const handleCountryCodeConversion = (country) => {
    const countryMapping = {
      India: "IN",
    };
    return countryMapping[country] || country;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded.");
      return;
    }

    if (!customerName || !customerAddress.line1 || !customerAddress.city || !customerAddress.country) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const convertedCountry = handleCountryCodeConversion(customerAddress.country);
    setLoading(true);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/booking/create-payment-intent`, {
        amount: amount * 100,
        currency: "usd",
        description: `Payment for ${title}`,
        customerName,
        customerAddress: { ...customerAddress, country: convertedCountry },
      });

      const clientSecret = data.clientSecret;
      if (!clientSecret.includes("_secret_")) {
        toast.error("Stripe client secret is invalid.");
        return;
      }

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: customerName,
            address: {
              line1: customerAddress.line1,
              city: customerAddress.city,
              state: customerAddress.state,
              postal_code: customerAddress.postalCode,
              country: convertedCountry,
            },
          },
        },
      });

      if (error) {
        toast.error(`Payment failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        for (const product of products) {
          const bookingData = {
            token: auth?.token,
            postId: product.postId,
            bookingDate: new Date(),
            transactionId: paymentIntent.id,
          };

          await axios.post(`${import.meta.env.VITE_BASE_URL}/api/booking/create-booking`, bookingData);

          await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/booking/update-availability`, {
            postId: product.postId,
            isAvailable: false,
          });
        }

        const updatedBooking = [
          ...book,
          ...products.map((p) => ({
            title: p.title,
            amount: p.price,
            customerName,
            postId: p.postId,
          })),
        ];
        setBook(updatedBooking);
        localStorage.setItem("booking", JSON.stringify(updatedBooking));

        toast.success("Payment & booking successful!");
        navigate("/user/your-order");
      }
    } catch (err) {
      toast.error("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>

      {/* Display title and amount */}
      <div className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
        <h2 className="text-xl font-medium text-gray-800">{title}</h2>
        <p className="text-lg text-gray-600">
          Total Price:{" "}
          <span className="text-green-600 font-semibold">
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>
      </div>

      <form
        onSubmit={handlePayment}
        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Payment Information
        </h2>

        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={auth.user?.name || "Your full name"}
            required
          />
        </div>

        {/* Address Line */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 font-medium mb-1">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            value={customerAddress.line1}
            onChange={(e) =>
              setCustomerAddress({ ...customerAddress, line1: e.target.value })
            }
            className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="123 Street Name"
            required
          />
        </div>

        {/* City + State */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex flex-col flex-1 mb-4 sm:mb-0">
            <label htmlFor="city" className="text-gray-700 font-medium mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              value={customerAddress.city}
              onChange={(e) =>
                setCustomerAddress({ ...customerAddress, city: e.target.value })
              }
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. New Delhi"
              required
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="state" className="text-gray-700 font-medium mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              value={customerAddress.state}
              onChange={(e) =>
                setCustomerAddress({ ...customerAddress, state: e.target.value })
              }
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Maharashtra"
            />
          </div>
        </div>

        {/* Postal + Country */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex flex-col flex-1 mb-4 sm:mb-0">
            <label htmlFor="postalCode" className="text-gray-700 font-medium mb-1">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={customerAddress.postalCode}
              onChange={(e) =>
                setCustomerAddress({
                  ...customerAddress,
                  postalCode: e.target.value,
                })
              }
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 110011"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="country" className="text-gray-700 font-medium mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="country"
              value={customerAddress.country}
              onChange={(e) =>
                setCustomerAddress({
                  ...customerAddress,
                  country: e.target.value,
                })
              }
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. India"
              required
            />
          </div>
        </div>

        {/* Card Element */}
        <div className="flex flex-col">
          <label htmlFor="card" className="text-gray-700 font-medium mb-1">
            Card Details <span className="text-red-500">*</span>
          </label>
          <div className="px-4 py-3 border border-gray-300 rounded-md bg-white">
            <CardElement
              id="card"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": { color: "#a0aec0" },
                  },
                  invalid: { color: "#e53e3e" },
                },
              }}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full px-6 py-3 text-white text-lg font-medium rounded-md transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};
const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);


export default Payment;
