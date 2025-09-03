import { Dialog, DialogClose, DialogTrigger } from "@radix-ui/react-dialog"
import DialogContent, { DialogBody, DialogFooter, DialogHeader } from "../../../components/dialog";
import Alert from "../../../components/alert";
import Button from "../../../components/button";



interface PhotoDeleteDialog { 
    trigger: React.ReactNode ; 
    onConfirm: () => void ; 
    loading?: boolean ; 
}

export default function photoDeleteDialog({
    trigger, 
    onConfirm, 
    loading = false,
}: PhotoDeleteDialog) { 

    return ( 
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="bg-accent-red">
                <DialogHeader>Confirmação</DialogHeader>
                <DialogBody
                className="bg-accent-red"
                
                >
                    <Alert> Você tem certeza que deseja exluir a foto? </Alert>
                </DialogBody>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading}
                        >
                            {loading? "Excluindo..." : "Excluir"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}