import { Product } from "../../../interfaces"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = Product

export const ProductElement = (props: Props) => {
    const { image, id, title, description, price } = props;
    return (
        <Card sx={{ maxWidth: 345 }} key={id}>
            <CardMedia
                component="img"
                height="140"
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
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}
