import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import  DialogContent, { Dialog,DialogBody, DialogFooter, DialogHeader } from "../../../components/dialog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import { type Photo } from "../../photos/models/photo";
import SelectCheckBox from "../../../assets/images/select-checkbox.svg?react" ; 
import Skeleton from "../../../components/skeleton";
import ImagePreview from "../../../components/image-preview";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";



interface AlbumNewDialogProps { 
    trigger: React.ReactNode; 
}

export default function AlbumNewDialog({trigger} : AlbumNewDialogProps) { 

    const isLoadingPhotos = false ; 
    const photos: Photo[] = [
                        {
                    id: "123", 
                    title: "olá mundo", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}
                    ]
                }, 
                {
                    id:"12324", 
                    title: "ola mundo2", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}                        
                    ]
                },
    ]


    function handleTogglePhoto(selected: boolean, photoId: string) { 
        console.log(selected, photoId)
    }
    return ( 
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader> Criar álbum </DialogHeader>
                <DialogBody className="flex flex-col gap-5">
                    <InputText
                    placeholder="Adicione um título"
                    />
                    <div className="space-y-3">
                        <Text as = "h1" className="mb-3" variant="label-small">Fotos Cadastradas</Text>

                        {!isLoadingPhotos && photos.length > 0  && (
                            <div className="flex flex-wrap gap-3">
                                {
                                    photos.map((photo) => (
                                        <PhotoImageSelectable
                                        key={photo.id}
                                        src={`/images/${photo.imageId}`}
                                        title={photo.title}
                                        imageClassName="w-20 h-20"
                                        onSelectImage={(selected) => handleTogglePhoto(selected, photo.id)}
                                        
                                        />
                                    ))
                                }
                            </div>
                        )}
                        
                        {isLoadingPhotos && (
                            <div className="flex flex-wrap gap-3">
                                {
                            Array.from({length:5}).map((_,index) => (
                            <Skeleton key={`photos-album-loading-${index}`} className="w-20 h-20 rounded-lg"/>
                        ))
                                }
                            </div>
                        )
                        }
                        {!isLoadingPhotos && photos.length === 0 && (
                            <div className="w-full flex flex-col justify-center items-center gap-3">
                                <SelectCheckBox/>
                                <Text className="text-center" variant="paragraph-medium">Nenhuma foto disponível para seleção</Text>
                            </div>
                            )}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <Button>Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}