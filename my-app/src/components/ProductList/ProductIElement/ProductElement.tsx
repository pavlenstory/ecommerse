import { CartElement, Product } from "../../../interfaces"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { memo } from "react";
import { isEqual } from "lodash";


type Props = Product & { cart: CartElement[] }

const ProductElement = (props: Props) => {
    const { image, id, title, description, price, cart } = props;

    const addToCart = (): void => {
        const updatedCart = [...cart, { id, quantity: 1 }]
    }
    return (
        <Card sx={{ maxWidth: 345 }} key={id}>
            <CardMedia
                component="img"
                height="400"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">{'$' + price}</Button>
                <Button variant="contained" onClick={addToCart}>Add to cart</Button>
            </CardActions>
        </Card>
    )
}

const comparisonFn = (prevProps: Props, nextProps: Props) => {
    return isEqual(prevProps, nextProps)
};

export default memo(ProductElement, comparisonFn);