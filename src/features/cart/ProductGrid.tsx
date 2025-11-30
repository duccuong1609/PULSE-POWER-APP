import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';

import productQueries from '@/app/queries/product.queries';
import { ProductCard } from './components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { Input } from '@/components/ui/input';
import { IconFileSad } from '@tabler/icons-react';
import { useCartStore } from '@/store/useCartStore';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const ProductGrid = () => {
    const { data, isLoading } = useQuery(productQueries.getProductListQuery());
    const [query, setQuery] = useState<string>("");
    const debouncedQuery = useDebounce(query, 500);
    const addToCart = useCartStore((state) => state.addToCart);

    const fuse = useMemo(() => {
        if (!data) return null;

        return new Fuse(data, {
            keys: ['name', 'referanceId', 'description'],
            threshold: 0.3,
            includeScore: true,
        });
    }, [data]);

    const filteredData = useMemo(() => {
        if (!debouncedQuery || !data) return data;

        if (fuse) {
            const results = fuse.search(debouncedQuery);
            return results.map((result) => result.item);
        }

        return data;
    }, [debouncedQuery, data, fuse]);

    return (
        <>
            <div className='w-full px-4 mt-4'>
                <Input
                    type="search"
                    placeholder="Hotdog (etc)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 md:gap-6 md:py-4 md:pt-2 px-4"
            >
                <AnimatePresence mode='popLayout'>
                    {isLoading ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <motion.div
                                key={`skeleton-${index}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ProductCardSkeleton />
                            </motion.div>
                        ))
                    ) : (
                        filteredData && filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ProductCard
                                        product={item}
                                        size='md'
                                        onAddToCart={addToCart}
                                        onToggleFavorite={() => console.log("Đã thích!")}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full flex flex-col gap-4 justify-center items-center text-center py-10 text-gray-500"
                            >
                                <IconFileSad size={100} />
                                <span>No product found with "{debouncedQuery}"</span>
                            </motion.div>
                        )
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    )
}

export default ProductGrid