import { useEffect, useState, useMemo } from 'react'
import { MainReducerState } from '../../interfaces'
import Pagination from '@mui/material/Pagination';

const PAGE_LIMIT: number = 4

type Props = Partial<MainReducerState> & { fetchProductList: Function }

export const ProductList = (props: Props) => {
    const { fetchProductList, products = [], searchString, currency = 'USD' } = props;
    const [sortedProducts, setSortedProducts] = useState(products)
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        fetchProductList()
    }, [fetchProductList])

    useEffect(() => {
        if (searchString) {
            setSortedProducts(products?.filter(e => (
                e.description + e.title).toLowerCase().includes(searchString.toLowerCase()
                )))
        } else {
            setSortedProducts(products)
        }
    }, [searchString, products])

    const { pageLimit, pageStart, pageEnd } = useMemo(() => {
        const pageLimit = Math.ceil(sortedProducts?.length / PAGE_LIMIT)
        const pageStart = (currentPage - 1) * PAGE_LIMIT
        const pageEnd = pageStart + PAGE_LIMIT
        return { pageLimit, pageStart, pageEnd }
    }, [currentPage, sortedProducts?.length])

    return (
        <>
            {sortedProducts?.slice(pageStart, pageEnd).map(p => (
                <div>
                    <img src={p.image} />
                    <div key={p.id}>{p.title} - {p.description} - {p.price}</div>
                </div>
            ))}
            <Pagination count={pageLimit} page={currentPage} onChange={(_, num) => setCurrentPage(num)} />
        </>
    )
}