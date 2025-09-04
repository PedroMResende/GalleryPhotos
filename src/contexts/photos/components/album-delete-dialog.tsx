import { Dialog, DialogTrigger} from "@radix-ui/react-dialog";
import DialogContent, { DialogBody, DialogClose, DialogFooter, DialogHeader } from "../../../components/dialog";
import Alert from "../../../components/alert";
import Button from "../../../components/button";

interface AlbumDeleteDialog { 
    trigger: React.ReactNode ; 
    onConfirm: () => void ; 
    loading?: boolean ; 
}



export default function AlbumDeleteDialog({
    trigger, 
    onConfirm, 
    loading = false
}: AlbumDeleteDialog) {
    return ( 
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Confirmação</DialogHeader>
                <DialogBody>
                    <Alert>Você tem certeza que deseja excluir este álbum?</Alert>
                </DialogBody>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button
                        variant="destructive" 
                        onClick={onConfirm}
                        disabled={loading}
                        handling={loading}
                        >
                            {loading? "Excluindo..." : "Excluir"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ) 
}