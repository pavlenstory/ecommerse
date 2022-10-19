import { useEffect, useState } from 'react'
import { MainReducerState } from '../../interfaces'

type Props = Partial<MainReducerState> & { fetchProductList: Function }

export const ProductList = (props: Props) => {
    const { fetchProductList, products, searchString } = props;
    const [sortedProducts, setSortedProducts] = useState(products)

    useEffect(() => {
        fetchProductList()
    }, [fetchProductList])

    useEffect(() => {
        if (searchString) {
            setSortedProducts(products?.filter(e => (e.description + e.price + e.title).includes(searchString)))
        } else {
            setSortedProducts(products)
        }
    }, [searchString, products])

    return (
        <div>
            {sortedProducts?.map(p => (
                <div key={p.id}>{p.title} - {p.description} - {p.price}</div>
            ))}
        </div>
    )
}