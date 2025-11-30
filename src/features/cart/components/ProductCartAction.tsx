import { Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { MODEL_NAME, ModelType } from '@/services/cartService';

interface ProductCartActionProps {
    selectedModel: ModelType;
    onModelChange: (model: ModelType) => void;
    topK: string;
    onTopKChange: (k: string) => void;
    onRecommend: () => void;
}

export const ProductCartAction = ({
    selectedModel,
    onModelChange,
    topK,
    onTopKChange,
    onRecommend
}: ProductCartActionProps) => {
    return (
        <div className="mt-auto p-4 bg-background border-t space-y-4 shadow-[0_-5px_10px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm font-medium">
                    Get ready to start recommend?
                </span>

                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Choose model & limit</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Select
                        value={selectedModel}
                        onValueChange={onModelChange}
                    >
                        <SelectTrigger className="w-[130px] h-9">
                            <SelectValue placeholder="Model" />
                        </SelectTrigger>
                        <SelectContent>
                            {MODEL_NAME.map((model) => (
                                <SelectItem key={model} value={model}>
                                    {model.toUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={topK}
                        onValueChange={onTopKChange}
                    >
                        <SelectTrigger className="w-[70px] h-9">
                            <div className="flex items-center gap-1 truncate">
                                <SelectValue />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 15, 20].map((k) => (
                                <SelectItem key={k} value={String(k)}>
                                    {k}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <DrawerFooter className="p-0 grid gap-3">
                <Button
                    className="w-full h-12 font-bold shadow-lg"
                    onClick={onRecommend}
                >
                    Continue
                </Button>
            </DrawerFooter>
        </div>
    );
};