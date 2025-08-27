import Text from "./text";
import {tv, type VariantProps} from "tailwind-variants" ; 

export const alertVariants = tv({
    base: `
    rounded-md py-3 px-5
    `, 
    variants : { 
        variant : { 
            info: "bg-accent-brand/10"
        }, 
    }, 
    defaultVariants : { 
        variant: "info"
    }, 
}
) ; 

export interface AlertProps extends VariantProps<typeof alertVariants> , React.ComponentProps<"div"> {}

export default function Alert({
    variant, 
    className, 
    children, 
    ...props
}: AlertProps) { 
    return (
        <div
        role="alert"
        className={alertVariants({variant, className})}
        {...props}
        >
            <Text>{children}</Text>
        </div>
    )
}

