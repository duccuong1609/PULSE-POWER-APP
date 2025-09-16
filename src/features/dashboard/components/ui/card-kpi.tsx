import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IconChevronRight, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

type CardKPIProps = {
    cardDescription?: string,
    cardTitle?: string,
    cardAction?: string,
    cardFooter?: string,
    cardFooterDescription?: string
    cardType: "up" | "down"
}

const badgeClasses: Record<"up" | "down", string> = {
    up: "bg-[var(--badge-background-up)] text-[var(--badge-foreground-up)]",
    down: "bg-[var(--badge-background-down)] text-[var(--badge-foreground-down)]",
}

/**
 * 
 * @param badgeClases 
 * @description Dynamic classnames for badge component because 
 * tailwind cannot init dynamic class like bg-[var(--badge-background-${cardType})]
 */

const CardKPI = ({ cardDescription, cardTitle, cardAction, cardFooter, cardFooterDescription, cardType }: CardKPIProps) => {
    return (
        <>
            <Card className="@container/card">
                <CardHeader className='text-left'>
                    <CardDescription>{cardDescription}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {cardTitle}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline" className={`${badgeClasses[cardType]} text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md`}>
                            {cardType === "up" && <IconTrendingUp />}
                            {cardType === "down" && <IconTrendingDown />}
                            {cardAction}
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-row justify-between gap-1.5 text-sm">
                    <div className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {cardFooter}
                            {cardType === "up" && <IconTrendingUp className="size-4" />}
                            {cardType === "down" && <IconTrendingDown className="size-4" />}
                        </div>
                        <div className="text-muted-foreground mt-2">
                            {cardFooterDescription}
                        </div>
                    </div>
                    <Button variant='outline' className='cursor-pointer'>
                        <IconChevronRight />
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default CardKPI