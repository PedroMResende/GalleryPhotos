import ImagePreview from "../../../components/image-preview";
import type { Photo } from "../models/photo";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import Badge from "../../../components/badge" ; 
import Button, { buttonTextVariants, buttonVariants } from "../../../components/button";
import { Link } from "react-router";
import cx from "classnames"; 

interface PhotoWidgetProps { 
    photo : Photo ; 
    loading? : boolean ; 
}

export default function PhotoWidget({
    photo, 
    loading, 
}: PhotoWidgetProps) { 
    return ( 
        <div className="flex flex-col gap-4">
            {!loading ? (
                <ImagePreview
                src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                title={photo.title} 
                imageClassName="w-[13.5625rem] h-[13.5625rem] rounded-lg justify-center"
                />
            ) : (
                <Skeleton 

                className="w-[13.5625rem] h-[13.5625rem] rounded-lg"
                />
            )}

            <div className=" truncate flex flex-col gap-2">
                {!loading ? ( 
                    <Text variant="paragraph-large" className="truncate">{photo.title}</Text>
                ) : (
                    <Skeleton className="w-full h-6"/>
                )}
                <div className="flex gap-1 min-h-[1.375rem]">
                    {!loading ? ( 
                        <>
                        {photo.albums.slice(0,2).map(album => (
                            <Badge className= "truncate" size="xs" key={album.id}>
                                {album.title} 
                            </Badge>
                        ))}
                        {photo.albums.length > 2 && <Badge className="truncate" size="xs">+{photo.albums.length - 2}</Badge>}
                        </>
                    ): ( 
                        Array.from({length: 2}).map((_, index) => 
                        <Skeleton key={`album-loading-${index}`} className=" truncate w-full h-4 rounded-sm"/>
                    ) 
                    )}
                </div>
            </div>
            <div>
                {!loading ? ( 
                    <Link
                    to={`/fotos/${photo.id}`}
                    className={buttonVariants({
                        variant: "secondary", 
                        className: "px-2 py-2"
                    })}
                    >
                    <Text className={buttonTextVariants({variant:"secondary",size:"sm"})}>
                        Detalhes da Imagem
                    </Text>
                    </Link>
                ) : ( 
                    <Skeleton className="w-full h-10"></Skeleton>
                )}
            </div>
        </div>
    )
}