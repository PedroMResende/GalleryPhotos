import React from "react";
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
import useAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas";
import {zodResolver} from "@hookform/resolvers/zod"; 
import usePhoto from "../hooks/use-photo";

interface PhotoNewDialogProps {
    trigger: React.ReactNode; 
} 

export default function PhotoNewDialog({trigger} : PhotoNewDialogProps) { 

    const [modalOpen, setModalOpen] = React.useState(false); 

    const form = useForm<PhotoNewFormSchema>({
        resolver: zodResolver(photoNewFormSchema) //vai resolver o formulário com base no schema que a gente passar
    }) ; 

    const {albums, isLoadingAlbums} = useAlbums() ; 

    const {createPhoto} = usePhoto(); 

    const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition()

    const file = form.watch("file"); 

    const albumsIds = form.watch("albumsIds") ; 

    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined; 

    React.useEffect(() => {
        if(!modalOpen) { 
            form.reset(); 
        }
    }, [modalOpen, form]); 

    function handleToggleAlbum(albumId: string) { 
        const albumsIds = form.getValues("albumsIds"); 
        const albumsSet = new Set(albumsIds || []) ; 

        if(albumsSet.has(albumId)) { 
            albumsSet.delete(albumId)
        } else { 
            albumsSet.add(albumId)
        }

        form.setValue("albumsIds", Array.from(albumsSet))

    }

    function handleSumbit(payload: PhotoNewFormSchema) { 
        setIsCreatingPhoto(async () => {
            await createPhoto(payload); 
            setModalOpen(false)
        })
        }

    return ( 
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent> 
                <form onSubmit={form.handleSubmit(handleSumbit)}>
                <DialogHeader> Adicionar foto </DialogHeader>
                <DialogBody className="flex flex-col gap-5">
                    <InputText
                    placeholder="Adicione um título."
                    maxLength={255}
                    error={form.formState.errors.title?.message}
                    {...form.register("title")}
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
                        src={fileSource}
                        className="w-full h-56"
                        />
                    }
                    error={form.formState.errors.file?.message}
                    {...form.register("file")}
                    />

                    <div className="space-y-3">
                        <Text variant="label-small">Selecionar álbum </Text>
                        <div className="flex flew-wrap gap-3 mt-1">
                        {!isLoadingAlbums && albums.length>0 && albums.map((album) => (
                            <Button
                            key={album.id}
                            variant={
                                albumsIds?.includes(album.id) ? "primary" : "ghost"
                            } 
                            size="sm" 
                            className="truncate"
                            onClick={() => handleToggleAlbum(album.id)}
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
                    <Button variant="secondary" disabled={isCreatingPhoto}> Cancelar </Button>
                </DialogClose>
                <Button disabled={isCreatingPhoto} handling ={isCreatingPhoto} type="submit">
                    {isCreatingPhoto ? "Adicionando..." : "Adicionar"}
                </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}