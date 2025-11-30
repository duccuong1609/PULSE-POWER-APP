import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CartItem } from '@/store/useCartStore';

interface ProductCartItemProps {
    item: CartItem;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
}

export const ProductCartItem = ({
    item,
    onIncrease,
    onDecrease,
    onRemove
}: ProductCartItemProps) => {

    const formatPrice = (price: number | string | undefined) => {
        if (typeof price === 'number') {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        }
        return price || "";
    };

    return (
        <div className="flex gap-4 group">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-50">
                <img
                    src={item.imgUrl || "/img/product-template-img.webp"}
                    alt={item.name}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between py-1">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Mã: {item.referanceId}</p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => onRemove(item.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors p-1 h-auto"
                        title="Xóa sản phẩm"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <span className="font-bold text-primary text-base">
                        {formatPrice(item.price)}
                    </span>

                    <div className="flex items-center gap-1 border rounded-lg bg-background shadow-sm h-8">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-full w-8 rounded-l-lg hover:bg-muted"
                            onClick={() => onDecrease(item.id)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium select-none">
                            {item.quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-full w-8 rounded-r-lg hover:bg-muted"
                            onClick={() => onIncrease(item.id)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};