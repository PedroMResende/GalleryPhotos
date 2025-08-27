import Container from "../components/container";
import Text from "../components/text" ; 
import {useParams} from "react-router" ; 
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotoNavigator from "../contexts/photos/components/photo-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/photos/components/albums-list-selectable";


export default function PagePhotoDetails() { 
    const {id} = useParams() ; 
    // apenas para testar o mock 
    const isLoadingPhoto = false ; 
    const photo = {
         
                    id: "123", 
                    title: "olá mundo", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}
                    ]
                
    } as Photo ; 
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

                <PhotoNavigator loading={isLoadingPhoto}/>
            </header>

            <div className="grid grid-cols-[21rem_1fr] gap-24">
                <div className="space-y-3">
                    {!isLoadingPhoto ? ( 
                        <ImagePreview
                        src={`/images/${photo?.imageId}`}
                        title={photo?.title}
                        imageClassName="h-[21rem]"
                        />
                    ) : ( 
                        <Skeleton
                        className="h-[21rem]"
                        />
                    )}
                    {!isLoadingPhoto ? (
                        <Button variant="destructive"> Excluir </Button>
                    ) : (
                        <Skeleton className="w-20 h-10"/>
                    )}
                </div>
                <div className="py-3">
                    <Text as="h3" variant="heading-medium" className="mb-6">
                        Álbuns 
                    </Text>
                    <AlbumsListSelectable
                    photo={photo}
                    albums={[
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"},
                    ]}
                    loading={isLoadingPhoto}
                    
                    />      
                </div>
            </div>
        </Container>
        )
}