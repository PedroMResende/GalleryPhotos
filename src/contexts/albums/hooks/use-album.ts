import { toast } from "sonner";
import type { AlbumNewFormSchema } from "../schemas";
import { title } from "process";
import type { Album } from "../models/album";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";
import usePhotos from "../../photos/hooks/use-photos";
import usePhotoAlbums from "../../photos/hooks/use-photo-albums";
import { useNavigate } from "react-router";

export default function useAlbum() { 
    const navigate = useNavigate();
    const queryClient = useQueryClient(); 
    const {photos} = usePhotos(); 
    const {managePhotoOnAlbum} = usePhotoAlbums() ; 
    
    async function createAlbum(payload: AlbumNewFormSchema) {         
        try { 
            const{data: album} = await api.post<Album>("/albums", {
                title: payload.title
            }); 

            if(payload.photosIds && payload.photosIds.length > 0) { 
                await Promise.all(payload.photosIds.map(photoId => {
                    const photoAlbumsIds = photos.find(photo => photo.id === photoId)
                    ?.albums?.map(album => album.id) || []

                    return managePhotoOnAlbum(photoId, [...photoAlbumsIds, album.id])
                }))
            }
            queryClient.invalidateQueries({queryKey: ["albums"]}); 
            queryClient.invalidateQueries({queryKey: ["photos"]}); 
            toast.success("Album criado com sucesso!")
        } catch (error) { 
            toast.error("Erro ao criar álbum!"); 
            throw error; 
        }
    }

    async function deleteAlbum(albumId : string) { 
        try { 
            await api.delete(`/albums/${albumId}`); 

            queryClient.invalidateQueries({queryKey: ["albums"]}); 
            queryClient.invalidateQueries({queryKey: ["photos"]}); 
            toast.success("Album excluído com sucesso."); 

            navigate("/"); 

        }  catch (error) { 
            toast.error("Erro ao excluir album"); 
            throw error ; 
        }
    }

    return {
        createAlbum, 
        deleteAlbum
    }
}