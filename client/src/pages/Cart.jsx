export default function Cart() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <div className="p-8 text-center bg-white rounded-lg shadow">
                <p className="text-gray-500">Your cart is currently empty.</p>
                <a href="/shop" className="btn btn-primary mt-4 inline-block">Continue Shopping</a>
            </div>
        </div>
    )
}
