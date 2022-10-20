import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent, useState } from "react"
import { MainReducerState } from "../../interfaces"

type Props = Partial<MainReducerState> & { setMainState: (payload: Partial<MainReducerState>) => void }

export const Navbar = (props: Props) => {
    const { setMainState, sortBy } = props

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
        <div>
            <div>Shop</div>
            <input onChange={onSearch} />
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
        </div>
    )
}
