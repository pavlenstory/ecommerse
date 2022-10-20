import Box from '@mui/material/Box';
import { ChangeEvent } from "react"
import { MainReducerState } from "../../interfaces"
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
    const { setMainState, sortBy, searchString } = props

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

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Great Shop
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort by price</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortBy}
                            label="Sort by price"
                            onChange={handleChange}
                        >
                            <MenuItem value={'LOW'}>Low to High</MenuItem>
                            <MenuItem value={'HIGH'}>High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <AddShoppingCartIcon />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 2, display: { xs: 'none', sm: 'block' } }}
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
            </Toolbar>
        </AppBar>
    )
}
