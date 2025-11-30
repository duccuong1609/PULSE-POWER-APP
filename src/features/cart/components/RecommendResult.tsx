import { ArrowLeft, CheckCircle2, Star, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { RECOMMEND_PRODUCT_V2_PROPS } from "@/services/dtos";
import { cn } from "@/lib/utils";

interface RecommendResultProps {
    data: RECOMMEND_PRODUCT_V2_PROPS | null;
    onBack: () => void;
}

export const RecommendResult = ({ data, onBack }: RecommendResultProps) => {
    if (!data) return null;

    const getMedalColor = (index: number) => {
        switch (index) {
            case 0: return "text-yellow-500 fill-yellow-500";
            case 1: return "text-slate-400 fill-slate-400";
            case 2: return "text-amber-600 fill-amber-600";
            default: return "";
        }
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden animate-in slide-in-from-right duration-300">
            <DrawerHeader className="flex items-center gap-2 px-4 py-4 border-b shrink-0">
                <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                    <DrawerTitle className="text-xl font-bold">Recommended for customer</DrawerTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                        Based on {data.model_used.toUpperCase()} model
                    </p>
                </div>
            </DrawerHeader>
            <div className="
                flex-1 overflow-y-auto px-4 py-4 min-h-0
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40
                transition-colors
            ">
                <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-green-800 font-medium">
                            Found {data.recommendations.length} items matching customer taste!
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-4">
                        {data.recommendations.map((item, index) => (
                            <div
                                key={item.product_id}
                                className="flex flex-col p-3 border rounded-lg hover:bg-accent transition-colors bg-card gap-3 cursor-pointer group"
                            >
                                <div className="aspect-square w-full rounded-md bg-muted overflow-hidden relative">
                                    {index < 3 && (
                                        <div className="absolute top-2 left-2 z-10 bg-background/90 backdrop-blur-[2px] p-1.5 rounded-full shadow-sm border">
                                            <Medal className={cn("h-4 w-4", getMedalColor(index))} />
                                        </div>
                                    )}

                                    <img
                                        src="/img/product-template-img.webp"
                                        alt={`Product ${item.product_id}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <p className="font-medium text-sm truncate" title={`Product ${item.product_id}`}>
                                        Product {item.product_id}
                                    </p>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400 shrink-0" />
                                        <span>{item.score.toFixed(4)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DrawerFooter className="p-4 border-t shrink-0">
                <Button className="w-full" onClick={onBack}>Back to Cart</Button>
            </DrawerFooter>
        </div>
    );
};