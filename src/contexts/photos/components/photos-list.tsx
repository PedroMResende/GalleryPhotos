import React from "react" ; 
import type { Photo } from "../models/photo";
import PhotoWidget from "./photo-widget";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import useAlbum from "../../albums/hooks/use-album";
import usePhotos from "../../photos/hooks/use-photos"; 
import useAlbums from "../../albums/hooks/use-albums";
import { toast } from "sonner";
import Button from "../../../components/button" ; 
import AlbumDeleteDialog from "./album-delete-dialog";

interface PhotoListProps { 
    photos: Photo[] ; 
    loading?: boolean
}

export default function PhotosList({
    photos, 
    loading, 
}: PhotoListProps) { 

    const {deleteAlbum} = useAlbum() ; 
    const {albums} = useAlbums();  
    const {filters} = usePhotos(); 
    const activeAlbum = albums.find(album => album.id === filters.albumId) ; 
    const albumId = filters.albumId ; 
    const [isDeletingAlbum, setIsDeletingAlbum] = React.useTransition() ; 
    

    async function handleDeleteAlbum() { 
        if(!activeAlbum) { 
            toast.error("O álbum todos não pode ser excluído."); 
            return ; 
        }
        setIsDeletingAlbum(async () => { 
            await deleteAlbum(activeAlbum.id) ; 
        })
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between ">
                    <AlbumDeleteDialog
                    trigger={
                    <Button variant="destructive">Excluir álbum</Button>
                    }
                    onConfirm={handleDeleteAlbum}
                    loading={isDeletingAlbum}
                    >

                    </AlbumDeleteDialog>
                    <Text
                    as="div" 
                    variant="paragraph-large" 
                    className="flex items-center justify-end text-accent-span gap-1" 
                    >
                        Total:{""}
                        {!loading ? (
                            <div>{photos.length}</div>
                        ): ( 
                            <Skeleton className="w-6 h-6"/>
                        )}          
                    </Text>
            </div>
            {!loading && photos?.length > 0 && (
                <div className="grid grid-cols-4 gap-9">
                    {photos.map((photo) => (
                        <PhotoWidget key={photo.id} photo={photo}/>
                    ))}
                </div>
            )}
            {loading && (
                <div className="grid grid-cols-4 gap-9">
                    {Array.from({length:10}).map((_,index) => (
                        <PhotoWidget
                        key={`photo-loading-${index}`}
                        photo={{} as Photo} 
                        loading
                        />
                    
                    ))}
                </div>
            )}     
            {!loading && photos.length === 0 && (
                <div className="flex justify-center items-center h-full">
                    <Text variant="paragraph-large">Nenhuma foto encontrada</Text>
                </div>
            )};     
        </div>
    ); 
}