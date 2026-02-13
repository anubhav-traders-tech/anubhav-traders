import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/mock';

export default function Shop() {
    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
