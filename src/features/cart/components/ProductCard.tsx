import { ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_PROPS } from "@/services/dtos";

interface ProductCardProps {
    product: PRODUCT_PROPS;
    category?: string;
    isNew?: boolean;
    size?: "sm" | "md" | "lg";
    onAddToCart?: (product: PRODUCT_PROPS) => void;
    onToggleFavorite?: (product: PRODUCT_PROPS) => void;
}

export function ProductCard({
    product,
    category,
    isNew,
    size = "lg",
    onAddToCart,
}: ProductCardProps) {

    const sizeStyles = {
        sm: {
            imageHeight: "aspect-[4/5]",
            padding: "p-2",
            titleSize: "text-sm",
            catSize: "text-[10px]",
            priceSize: "text-sm",
            iconSize: "h-3 w-3",
            buttonSize: "h-8 text-xs px-2",
            showButtonText: false,
        },
        md: {
            imageHeight: "aspect-square",
            padding: "p-3",
            titleSize: "text-base",
            catSize: "text-xs",
            priceSize: "text-lg",
            iconSize: "h-4 w-4",
            buttonSize: "h-9 text-sm",
            showButtonText: true,
        },
        lg: {
            cardWidth: "max-w-sm",
            imageHeight: "aspect-square",
            padding: "p-4",
            titleSize: "text-lg",
            catSize: "text-xs",
            priceSize: "text-xl",
            iconSize: "h-4 w-4",
            buttonSize: "h-10",
            showButtonText: true,
        },
    };

    const currentStyle = sizeStyles[size];

    return (
        <Card
            className={cn(
                "w-full h-fit overflow-hidden transition-all duration-300 hover:shadow-lg group py-0"
            )}
        >
            <div className={cn("relative overflow-hidden bg-gray-100", currentStyle.imageHeight)}>
                {isNew && (
                    <Badge className={cn(
                        "absolute z-10 bg-red-500 hover:bg-red-600",
                        size === "sm" ? "top-1 right-1 text-[10px] px-1.5 h-5" : "top-2 right-2"
                    )}>
                        Mới
                    </Badge>
                )}
                <img
                    src={product.imgUrl || "/img/product-template-img.webp"}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <CardHeader className={cn("pb-0", currentStyle.padding)}>
                {category && (
                    <CardDescription className={cn("text-muted-foreground uppercase tracking-wider", currentStyle.catSize)}>
                        {category}
                    </CardDescription>
                )}
                <CardTitle
                    className={cn("line-clamp-1 font-bold mt-1", currentStyle.titleSize)}
                    title={product.name}
                >
                    {product.name}
                </CardTitle>
                {product.price && (
                    <div className={cn("font-bold text-primary pt-1", currentStyle.priceSize)}>
                        {product.price}
                    </div>
                )}
            </CardHeader>

            <CardFooter className={cn("flex gap-2 pt-2", currentStyle.padding)}>
                <Button
                    className={cn("flex-1 gap-2", currentStyle.buttonSize)}
                    onClick={() => onAddToCart && onAddToCart(product)}
                >
                    <ShoppingCart className={currentStyle.iconSize} />
                    {currentStyle.showButtonText && "Add to Cart"}
                </Button>

                {/* <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onToggleFavorite && onToggleFavorite(product)}
                    className={cn(
                        "hover:text-red-500 hover:border-red-200 shrink-0",
                        size === 'sm' ? "h-8 w-8" : "h-9 w-9"
                    )}
                >
                    <Heart className={currentStyle.iconSize} />
                </Button> */}
            </CardFooter>
        </Card>
    );
}