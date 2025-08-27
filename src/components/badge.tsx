import React from "react";
import {tv, type VariantProps} from "tailwind-variants" ; 
import Text from "./text";
import Skeleton from "./skeleton";
import cx from "classnames"

export const badgeVariants = tv({
    base: "inline-flex justify-center items-center rounded", 
    variants : { 
        variant: { 
            none: " ", 
            ghost: "bg-transparent border border-solid border-border-primary text-accent-paragraph", 
        }, 
        size: { 
            xs: "py-0.5 px-2", 
            sm: "py-1 px-3", 
        }, 
    }, 
    defaultVariants: { 
        variant: "ghost", 
        size: "sm"
    }
})

export const badgeTextVariants = tv ({
    base:"text-xs", 
    variants: { 
        size: { 
            xs: "w-12 h-[1.375rem]", 
            sm: "w-16 h-[1.875rem]", 
        }
    }, 
    defaultVariants : { 
        size: "sm", 
    }
})

export const badgeSkeletonVariants = tv ({
    variants: { 
        size: { 
            xs: "w-12 h-[1.375rem]", 
            sm: "w-16 h-[1.875rem]", 
        }, 
    }, 
    defaultVariants: { 
        size: "sm", 
    }, 
})

interface BadgeProps extends React.ComponentProps<"div">, VariantProps<typeof badgeVariants> { 
    loading?: boolean, 
}

export default function Badge({
    variant, 
    size, 
    loading, 
    children, 
    className, 
    ...props
}:BadgeProps) { 
    if(loading) {
        return ( 
            <Skeleton
            rounded="full" 
            className={cx(
                badgeVariants({variant,size}), 
                badgeSkeletonVariants({size}), 
                className,
            )}/>
        ) 
    } 
    return ( 
        <div className = {badgeVariants({variant,size,className})} {...props}>
            <Text className = {badgeTextVariants({size})}>{children}</Text>
        </div>
    )
} 



