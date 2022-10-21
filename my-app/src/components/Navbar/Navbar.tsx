import { useState, useMemo } from 'react'
import { ChangeEvent } from "react"
import { cartBodyElement, MainReducerState, Product } from "../../interfaces"
import { Cart } from '../Cart/Cart';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


type Props = Partial<MainReducerState> & { setMainState: (payload: Partial<MainReducerState>) => void }

export const Navbar = (props: Props) => {
    const { setMainState, sortBy, searchString, cart = [], products = [] } = props
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e
        setMainState({ searchString: value })
    }

    const handleChange = (e: SelectChangeEvent) => {
        const { target: { value } } = e
        if (value === 'LOW' || value === 'HIGH') {
            setMainState({ sortBy: value })
        }
    }

    const cartElements: cartBodyElement[] = useMemo(() => {
        return cart.map(e => ({ ...products?.find(p => p.id === e.id), ...e })) as cartBodyElement[]
    }, [cart, products])

    const totalAmount: number = useMemo((): number => {
        const result = cart.reduce((acc: number, e) => {
            const productElement = products.find(p => p.id === e.id)
            return acc + (productElement ? + productElement.price : 0) * e.quantity
        }, 0)
        return Math.floor(result * 100) / 100
    }, [cart, products])

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={onSearch}
                            value={searchString}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    <Box sx={{ width: '100px', padding: '10px' }}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: "#fff" }} id="demo-simple-select-label">Sort by price</InputLabel>
                            <Select
                                variant="outlined"
                                sx={{
                                    width: 100,
                                    height: 40,
                                    marginRight: 15,
                                    border: "1px solid darkgrey",
                                    color: "#fff",
                                    "& .MuiSvgIcon-root": {
                                        color: "white",
                                    },
                                }}
                                value={sortBy}
                                label="Sort by price"
                                onChange={handleChange}
                            >
                                <MenuItem value={'LOW'}>Low to High</MenuItem>
                                <MenuItem value={'HIGH'}>High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Typography>
                <AddShoppingCartIcon onClick={handleOpen} />
                <div>{cart.length}</div>
                <Cart setOpen={setOpen} open={open} cartElements={cartElements} totalAmount={totalAmount} setMainState={setMainState} />
            </Toolbar>
        </AppBar>
    )
}
