import { useEffect, useState, useMemo } from 'react'
import { MainReducerState } from '../../interfaces'
import ProductElement from './ProductIElement/ProductElement';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styled from "@emotion/styled";

const CardWrapper = styled.div`
    display: inline-block;
    padding: 10px;
`

const ProductListWrapper = styled.div`
    text-align: center;
    padding: 10px;
`

const ProductsError = styled.h2`
    text-align: center;
`

const PAGE_LIMIT: number = 4

type Props = Partial<MainReducerState> & { fetchProductList: Function, setMainState: Function }

export const ProductList = (props: Props) => {
    const { fetchProductList, products = [], searchString, sortBy, cart = [], setMainState } = props;
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
    }, [products, searchString, sortBy])

    useEffect(() => {
        setCurrentPage(1)
    }, [setCurrentPage, searchString, sortBy])

    const { pageLimit, pageStart, pageEnd } = useMemo(() => {
        const pageLimit = Math.ceil(sortedProducts?.length / PAGE_LIMIT)
        const pageStart = (currentPage - 1) * PAGE_LIMIT
        const pageEnd = pageStart + PAGE_LIMIT
        return { pageLimit, pageStart, pageEnd }
    }, [currentPage, sortedProducts?.length])

    return (
        <>
            {sortedProducts.length ?
                <>
                    <ProductListWrapper>
                        {sortedProducts?.slice(pageStart, pageEnd).map(p => (
                            <CardWrapper key={p.id}>
                                <ProductElement {...p} cart={cart} setMainState={setMainState} />
                            </CardWrapper>
                        ))}
                    </ProductListWrapper>
                    <Stack alignItems="center" padding="10px">
                        <Pagination count={pageLimit} page={currentPage} onChange={(_, num) => setCurrentPage(num)} />
                    </Stack>
                </>
                : <ProductsError>Poducts were not found</ProductsError>}
        </>
    )
}