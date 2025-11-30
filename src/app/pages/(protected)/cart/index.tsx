import { SiteHeader } from '@/components/site-header';
import ProductCart from '@/features/cart/components/ProductCart';
import ProductGrid from '@/features/cart/ProductGrid';

const Cart = () => {
    return (
        <>
            <title>Shop | Pulse</title>
            <meta name="description" content="Shop" />
            <SiteHeader siteName="Shop" filters={<ProductCart />} />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <ProductGrid />
                </div>
            </div>
        </>
    )
}

export default Cart