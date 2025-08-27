import ImagePreview from "../../../components/image-preview"; 
import {tv} from "tailwind-variants"; 
import React from "react";
import InputCheckBox from "../../../components/input-checkbox";

interface PhotoImageSelectableProps extends React.ComponentProps<typeof ImagePreview>{
    selected?: boolean
    onSelectImage?: (selected: boolean) => void ; 
}

export const photoImageSelectableVariants = tv ({
    base: "cursor-pointer relative rounded-lg", 
    variants: { 
        select : { 
            true: "outline-2 outline-accent-brand"
        }
    }
})


export default function PhotoImageSelectable({
    className, 
    selected, 
    onSelectImage,
    ...props
}: PhotoImageSelectableProps) { 

    const [isSelected, setIsSelected] = React.useState(selected); 

    function handleSelect() {
        const newValue = !isSelected ;

        setIsSelected(newValue); 
        onSelectImage?.(newValue) ; 
    }
    return ( 
        <label
        className={photoImageSelectableVariants({
            className,
            select: isSelected
        })}
        >
            <InputCheckBox
            size="sm"
            checked={isSelected}
            onChange={handleSelect}
            className="absolute top-1 left-1"
            />
            <ImagePreview {...props}/>
        </label>
    )
}