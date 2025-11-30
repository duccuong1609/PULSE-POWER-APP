import { useEffect, useState } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCartStore } from '@/store/useCartStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductCartItem } from './ProductCartItem';
import { ProductCartAction } from './ProductCartAction';
import { RecommendResult } from './RecommendResult';
import cartService, { type ModelType } from '@/services/cartService';
import type { RECOMMEND_PRODUCT_V2_PROPS } from '@/services/dtos';

const ProductCart = () => {
    const {
        items,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isOpen,
        setIsOpen
    } = useCartStore();

    const [isMounted, setIsMounted] = useState(false);
    const [selectedModel, setSelectedModel] = useState<ModelType>('hybrid');
    const [view, setView] = useState<'cart' | 'recommend'>('cart');
    const [recommendData, setRecommendData] = useState<RECOMMEND_PRODUCT_V2_PROPS | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [topK, setTopK] = useState<string>("5");

    useEffect(() => setIsMounted(true), []);

    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setView('cart');
                setRecommendData(null);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    if (!isMounted) return null;

    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    const handleRecommend = async () => {
        if (items.length === 0) return;

        setIsLoading(true);
        try {
            const payload = {
                cart_items: items.map(i => i.referanceId),
                top_k: parseInt(topK)
            };

            const response = await cartService.getRecommendFromCart(selectedModel, payload);

            if (response && response.recommendations) {
                setRecommendData(response);
                setView('recommend');
            }
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="relative shrink-0">
                    <ShoppingCart className="h-5 w-5" />
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-in zoom-in">
                            {totalQuantity}
                        </span>
                    )}
                </Button>
            </DrawerTrigger>

            <DrawerContent className="h-[85vh] flex flex-col rounded-t-[10px]">
                <div className="mx-auto w-full max-w-2xl flex-1 flex flex-col h-full overflow-hidden relative">

                    {view === 'cart' && (
                        <div className="flex flex-col h-full animate-in fade-in duration-300 relative">

                            {isLoading && (
                                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center rounded-t-[10px]">
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <span className="text-sm font-medium text-muted-foreground">Analyzing cart...</span>
                                    </div>
                                </div>
                            )}

                            <DrawerHeader className="flex justify-between items-center px-4 py-4 border-b">
                                <DrawerTitle className="text-xl font-bold">Cart ({items.length})</DrawerTitle>
                            </DrawerHeader>

                            <ScrollArea className="flex-1 px-4 py-4 overflow-y-auto">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-60 text-muted-foreground gap-4">
                                        <div className='bg-muted p-6 rounded-full'>
                                            <ShoppingCart className="h-10 w-10 opacity-50" />
                                        </div>
                                        <p>Your cart is empty</p>
                                        <DrawerClose asChild>
                                            <Button variant="outline">Continue Shopping</Button>
                                        </DrawerClose>
                                    </div>
                                ) : (
                                    <div className="space-y-6 pb-4">
                                        {items.map((item) => (
                                            <ProductCartItem
                                                key={item.id}
                                                item={item}
                                                onIncrease={increaseQuantity}
                                                onDecrease={decreaseQuantity}
                                                onRemove={removeFromCart}
                                            />
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>

                            {items.length > 0 && (
                                <ProductCartAction
                                    selectedModel={selectedModel}
                                    onModelChange={setSelectedModel}
                                    topK={topK}
                                    onTopKChange={setTopK}
                                    onRecommend={handleRecommend}
                                />
                            )}
                        </div>
                    )}

                    {view === 'recommend' && (
                        <RecommendResult
                            data={recommendData}
                            onBack={() => setView('cart')}
                        />
                    )}

                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default ProductCart;