import DialogContent, { Dialog, DialogTrigger, DialogHeader, DialogFooter, DialogBody, DialogClose } from "../../../components/dialog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Alert from "../../../components/alert";
import ImagePreview from "../../../components/image-preview";
import InputSingleFile from "../../../components/input-single-file";
import Text from "../../../components/text";
import type { Album } from "../../albums/models/album";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";
import useAlbums from "../../albums/hooks/use-album";


interface PhotoNewDialogProps {
    trigger: React.ReactNode; 
} 

export default function PhotoNewDialog({trigger} : PhotoNewDialogProps) { 

    const form = useForm() ; 
    const {albums, isLoadingAlbums} = useAlbums() ; 

    return ( 
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent> 
                <DialogHeader> Adicionar foto </DialogHeader>
                <DialogBody className="flex flex-col gap-5">
                    <InputText
                    placeholder="Adicione um título."
                    maxLength={255}
                    />

                    <Alert>
                        Tamanho mínimo : 50MB.
                        <br />
                        Você pode selecionar um arquivo em PNG, JPG ou JPEG.
                    </Alert>

                    <InputSingleFile
                    form={form}
                    allowedExtensions={['png', 'jpg', 'jpeg']}
                    maxFileSizeInMB={50}
                    replaceBy={
                        <ImagePreview
                        className="w-full h-56"
                        />
                    }
                    />

                    <div className="space-y-3">
                        <Text variant="label-small">Selecionar álbum </Text>
                        <div className="flex flew-wrap gap-3 mt-1">
                        {!isLoadingAlbums && albums.length>0 && albums.map((album) => (
                            <Button
                            key={album.id}
                            variant="ghost" 
                            size="sm" 
                            className="truncate"
                            >
                                {album.title}
                            </Button>
                        ))}

                        {isLoadingAlbums && Array.from({length:5}).map((_,index) => ( 
                            <Skeleton
                            key={`album-loading-${index}`}
                            className="w-20 h-7"
                            />
                        ))}
                        </div>
                    </div>
                </DialogBody>

                <DialogFooter>
                <DialogClose asChild>
                    <Button variant="secondary"> Cancelar </Button>
                </DialogClose>
                <Button>
                    Adicionar
                </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}