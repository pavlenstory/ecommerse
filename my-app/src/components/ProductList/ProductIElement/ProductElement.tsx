import { CartElement, Product } from "../../../interfaces"
import { memo } from "react";
import { isEqual } from "lodash";
import styled from "@emotion/styled";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const TextWrapper = styled.div`
    height: 470px;
    overflow: hidden;
`

const ProductImageWrapper = styled.div`
    height: 470px;
    object-fit: contain;
    overflow: hidden;
`

const ProductPrice = styled.div`
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
`

type Props = Product & { cart: CartElement[], setMainState: Function }

const ProductElement = (props: Props) => {
    const { image, id, title, description, price, cart, setMainState } = props;

    const addToCart = (): void => {
        const updatedCart = [...cart, { id, quantity: 1 }]
        setMainState({ cart: updatedCart })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    return (
        <Card sx={{ maxWidth: 345, height: 1000 }} key={id}>
            <ProductImageWrapper>
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                />
            </ProductImageWrapper>
            <TextWrapper>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </TextWrapper>
            <CardActions>
                <ProductPrice>{'$' + price}</ProductPrice>
                <Button variant="contained" disabled={cart.some(e => e.id === id)} onClick={addToCart}>Add to cart</Button>
            </CardActions>
        </Card>
    )
}

const comparisonFn = (prevProps: Props, nextProps: Props) => {
    return isEqual(prevProps, nextProps)
};

export default memo(ProductElement, comparisonFn);