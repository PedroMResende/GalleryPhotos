import type {Photo} from "../../photos/models/photo"; 
import type { Album } from "../../albums/models/album";
import React from "react";
import Text from "../../../components/text";
import InputCheckBox from "../../../components/input-checkbox";
import Divider from "../../../components/divider";
import Skeleton from "../../../components/skeleton";


interface AlbumsListSelectableProps { 
    loading?: boolean; 
    albums: Album[] ; 
    photo: Photo; 
}




export default function AlbumsListSelectable({
    albums, 
    loading, 
    photo
}: AlbumsListSelectableProps) { 

    function isChecked(albumId: string) { 
    return (
    photo?.albums?.some(album => album.id === albumId)
    )
}

    function handlePhotoOnAlbuns(albumId: string) { 
        let albumsIds = [] ; 

        if (isChecked(albumId)) { 
            albumsIds = photo.albums 
            .filter((album) => album.id !== albumId)
            .map((album) => album.id)
        } else { 
            albumsIds = [...photo.albums.map(album => album.id), albumId]
        }

        console.log('Enviados para o Back', albumsIds)
    }


    return (
        <ul className="flex flex-col gap-4">
            {!loading && albums?.length > 0 && albums.map((album, index) => (
                <li key={album.id}>
                    <div className="flex items-center justify-between gap-1">
                        <Text variant="paragraph-large" className="truncate">{album.title}</Text>
                        <InputCheckBox
                        defaultChecked={isChecked(album.id)}
                        onClick={() => handlePhotoOnAlbuns(album.id)}
                        />
                    </div>
                    {index !== albums.length - 1 && <Divider className="mt-4"/>}
                </li>
            ))}
            {loading && 
            Array.from({length:5}).map((_,index) => (
                <li key={`loading-albums-${index}`}>
                    <Skeleton className="h-[2.5rem]"/>
                </li>
            ))}
        </ul>
    )

}

