import { cartBodyElement, CartElement, MainReducerState } from '../../interfaces'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    setOpen: Function,
    open: boolean,
    cartElements: cartBodyElement[],
    totalAmount: number,
    setMainState: (payload: Partial<MainReducerState>) => void
}

export const Cart = (props: Props) => {
    const { setOpen, open, cartElements, totalAmount, setMainState } = props
    const handleClose = () => setOpen(false);

    const changeCartState = (newCart: CartElement[]): void => {
        localStorage.setItem('cart', JSON.stringify(newCart))
        console.log(newCart)
        setMainState({ cart: newCart })
    }
    const setQuantity = (id: number, value: number) => (): void => {
        const itemIndex = cartElements.findIndex(e => e.id === id)
        if (itemIndex < 0) return
        let newCart = [...cartElements]
        newCart[itemIndex].quantity += value
        changeCartState(newCart)
    }

    const deleteCartItem = (id: number) => (): void => {
        const newCart = cartElements.filter(e => e.id !== id)
        changeCartState(newCart)
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cart
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, overflowY: 'scroll', height: '200px' }}>
                        {cartElements.length ?
                            cartElements.map(p => (
                                <div key={p.id}>
                                    <img src={p.image} width="70px" />
                                    <div>{p.title}</div>
                                    <div>${p.price}</div>
                                    <div>
                                        <Button disabled={!(p.quantity > 1)} onClick={setQuantity(p.id, -1)}><RemoveIcon /></Button>
                                        <span>{p.quantity}</span>
                                        < Button onClick={setQuantity(p.id, 1)}><AddIcon /></Button>
                                        <Button onClick={deleteCartItem(p.id)}><DeleteIcon /></Button>
                                    </div>
                                </div>
                            )) : <div>Cart is empty</div>
                        }
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Total: ${totalAmount}
                        <Button sx={{ margin: '10px' }} variant="contained">Pay</Button>
                    </Typography>
                </Box>
            </Modal >
        </>
    )
}