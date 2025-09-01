import Container from "../components/container";
import Text from "../components/text" ; 
import {Link, useParams} from "react-router" ; 
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotoNavigator from "../contexts/photos/components/photo-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-album";
import usePhoto from "../contexts/photos/hooks/use-photo";


export default function PagePhotoDetails() { 
    const {id} = useParams() ; 
    const {albums, isLoadingAlbums} = useAlbums(); 
    const{photo, isLoadingPhoto, previousPhotoId, nextPhotoId} = usePhoto(id) ; 
    
    // apenas para testar o mock 

    if(!isLoadingPhoto && !photo) { 
        return (
            <div>
                Foto não encontrada.
            </div>
        )
    }

    return ( 
        <Container>
            <header className="flex items-center justify-between gap-8 mb-8">
                {!isLoadingPhoto ? ( 
                    <Text variant="heading-large">
                        {photo?.title}
                    </Text>
                ): (
                    <Skeleton className="w-48 h-8"/>
                )}

                <PhotoNavigator previousPhotoId={previousPhotoId} nextPhotoId={nextPhotoId} loading={isLoadingPhoto}/>
            </header>

            <div className="grid grid-cols-[21rem_1fr] gap-24">
                <div className="space-y-3">
                    {!isLoadingPhoto ? ( 
                        <ImagePreview
                        src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
                        title={photo?.title}
                        imageClassName="h-[21rem]"
                        />
                    ) : ( 
                        <Skeleton
                        className="h-[21rem]"
                        />
                    )}
                    {!isLoadingPhoto ? (
                        <div className="flex justify-between">
                        <Button variant="destructive"> Excluir </Button>
                        <Link to="/">
                        <Button variant="secondary"> Voltar </Button>
                        </Link>
                        </div>
                    ) : (
                        <Skeleton className="w-20 h-10"/>
                    )}
                </div>
                <div className="py-3">
                    <Text as="h3" variant="heading-medium" className="mb-6">
                        Álbuns 
                    </Text>
                    <AlbumsListSelectable
                    photo={photo as Photo}
                    albums={albums}
                    loading={isLoadingAlbums}
                    
                    />      
                </div>
            </div>
        </Container>
        )
}