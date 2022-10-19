import { ChangeEvent } from "react"
import { MainReducerState } from "../../interfaces"

type Props = Partial<MainReducerState> & { setMainState: (payload: Partial<MainReducerState>) => void }

export const Navbar = (props: Props) => {
    const { setMainState } = props
    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMainState({ searchString: value })
    }
    return (
        <input onChange={onSearch} />
    )
}
