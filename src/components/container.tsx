import {tv, type VariantProps} from "tailwind-variants" ; 
import React from "react";

export const containerVariants = tv({
    base: "mx-auto", 
    variants: { 
        size: { 
            md: "max-w-[62rem] px-2"
        }
    }, 
    defaultVariants: { 
        size: "md"
    }, 
}) ; 

	// •	Aqui a gente permite que o componente Container seja renderizado como qualquer elemento HTML, não apenas <div>.
	// •	Por padrão, ele será uma <div>, mas você pode passar as="section", as="main", as="header", etc.
	// •	Isso dá flexibilidade sem precisar criar vários componentes para cada tag.

interface ContainerProps extends VariantProps<typeof containerVariants>, React.ComponentProps<"div"> { 
    as?: keyof React.JSX.IntrinsicElements 
}


export default function Container({
    as = "div", 
    children,  
    className, 
    ...props
}: ContainerProps) { 
    return React.createElement(
        as, 
        {
            className: containerVariants({size:"md", className}), 
            ...props
        }, 
        children
    )
}