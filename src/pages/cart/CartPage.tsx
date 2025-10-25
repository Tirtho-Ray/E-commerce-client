import { useLocalCart } from "../../utils/cart/localCart";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useLocalCart();
    console.log(cart)

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-gray-600">
                <p className="text-lg">🛒 Your cart is empty</p>
            </div>
        );
    }

    // 🧮 Calculate total with discount applied
    const total = cart?.reduce((sum, item) => {
        let discountedPrice = item.price;

        if (item.discount && item.discountType) {
            if (item.discountType === "percentage") {
                discountedPrice = item.price - (item.price * item.discount) / 100;
            } else if (item.discountType === "fixed") {
                discountedPrice = item.price - item.discount;
            }
        }

        // Prevent negative prices
        discountedPrice = Math.max(0, discountedPrice);

        return sum + discountedPrice * (item.quantity || 1);
    }, 0);

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                <h1 className="text-2xl font-bold mb-4">🛍️ Shopping Cart</h1>

                {cart.map(item => {
                    // Handle discount display and math per item
                    let discountDisplay = "";
                    let discountedPrice = item.price;

                    if (item.discount && item.discountType) {
                        if (item.discountType === "percentage") {
                            discountDisplay = `${item.discount}%`;
                            discountedPrice =
                                item.price - (item.price * item.discount) / 100;
                        } else if (item.discountType === "fixed") {
                            discountDisplay = `$${item.discount}`;
                            discountedPrice = item.price - item.discount;
                        }
                    }

                    discountedPrice = Math.max(0, discountedPrice);

                    return (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                        >
                            {/* LEFT SIDE: Product info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div>
                                    <h2 className="font-semibold text-gray-800">
                                        {item.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">{item.brand}</p>

                                    {discountDisplay ? (
                                        <div className="text-sm text-gray-600 font-medium">
                                            <span className="text-green-600 font-semibold">
                                                ${discountedPrice.toFixed(2)}
                                            </span>{" "}
                                            <span className="line-through text-gray-400 text-xs ml-1">
                                                ${item.price.toFixed(2)}
                                            </span>{" "}
                                            <span className=" ml-1">
                                                <span className="text-xs text-red-500">  ({discountDisplay} OFF) </span> <span className="text-xs text-blue-500">type: {item.discountType}</span>
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600 font-medium">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT SIDE: Quantity + total + remove */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border rounded">
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                Math.max(1, (item.quantity || 1) - 1)
                                            )
                                        }
                                        className="px-2 py-1 text-gray-700"
                                    >
                                        −
                                    </button>
                                    <span className="px-3">{item.quantity || 1}</span>
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, (item.quantity || 1) + 1)
                                        }
                                        className="px-2 py-1 text-gray-700"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* ✅ Show total for this item with discount */}
                                <p className="w-20 text-right font-semibold text-gray-800">
                                    ${(discountedPrice * (item.quantity || 1)).toFixed(2)}
                                </p>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* Clear Cart Button */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={clearCart}
                        className="text-red-600 hover:underline font-semibold"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>

            {/* RIGHT: Summary */}
            <div className="bg-white border rounded-lg p-6 shadow-md h-fit">
                <h2 className="text-lg font-bold mb-4">Total</h2>

                <div className="flex justify-between text-gray-700 mb-2">
                    <span>Sub-Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700 mb-4">
                    <span>Delivery</span>
                    <span>Standard Delivery (Free)</span>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition">
                    Check Out
                </button>

                <div className="mt-4 text-center text-gray-500 text-sm">
                    <p>We Accept</p>
                    <div className="flex justify-center items-center gap-3 mt-2">
                        {/* <img src="/icons/paypal.svg" alt="PayPal" className="h-5" />
                        <img src="/icons/stripe.svg" alt="Stripe" className="h-5" />
                        <img src="/icons/applepay.svg" alt="Apple Pay" className="h-5" />
                        <img src="/icons/webmoney.svg" alt="WebMoney" className="h-5" /> */}
                    </div>
                    <p className="mt-3 text-xs">
                        Got a discount code? Add it in the next step.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
