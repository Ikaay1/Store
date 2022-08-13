import './style.css';

import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

interface ProductInterface {
    id: string;
    displayName: string;
    metadata: {
        blockPricingStrategy: {
            credits: number;
            direction: string;
            name: string;
            unit: string;
        };
        blockThumbnailUrl: string;
        pricingStrategy: {
            type: string;
            credits: number;
        };
        name: string;
        provider: string;
    };
}

const CustomCard = ({
    product,
    cart,
    onAdd,
    onRemove,
}: {
    cart: ProductInterface[];
    onRemove: (arg: ProductInterface) => void;
    onAdd: (arg: ProductInterface) => void;
    product: ProductInterface;
}) => {
    return (
        <Card className='custom-card'>
            <CardActionArea>
                <CardMedia
                    component='img'
                    alt='product'
                    height='260'
                    className='card-image'
                    image={product?.metadata?.blockThumbnailUrl}
                    title='product'
                />
                <CardContent className='content'>
                    <Typography
                        className='title'
                        gutterBottom
                        variant='h5'
                        component='h2'
                    >
                        {product?.displayName}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {cart.filter((item) => item?.id === product?.id).length ? (
                <CardActions>
                    <Typography
                        className='basket-item-price'
                        gutterBottom
                        variant='h5'
                        component='h2'
                    >
                        {product?.metadata?.blockPricingStrategy?.credits > 1
                            ? `${product?.metadata?.blockPricingStrategy?.credits} Credits`
                            : `${product?.metadata?.blockPricingStrategy?.credits} Credit`}
                    </Typography>
                </CardActions>
            ) : null}
            <CardActions className='actions-content'>
                {!cart.filter((item) => item?.id === product?.id).length ? (
                    <>
                        <Typography
                            className='price'
                            gutterBottom
                            variant='h5'
                            component='h2'
                        >
                            {product?.metadata?.blockPricingStrategy?.credits >
                            1
                                ? `${product?.metadata?.blockPricingStrategy?.credits} Credits`
                                : `${product?.metadata?.blockPricingStrategy?.credits} Credit`}
                        </Typography>
                        <Button
                            size='large'
                            className='custom-button'
                            onClick={() => onAdd(product)}
                        >
                            <ShoppingCart /> Add to basket
                        </Button>
                    </>
                ) : null}
                {cart.filter((item) => item?.id === product?.id).length ? (
                    <>
                        <Button
                            size='small'
                            color='secondary'
                            variant='outlined'
                            onClick={() => {
                                onRemove(product);
                            }}
                        >
                            Remove
                        </Button>
                    </>
                ) : null}
            </CardActions>
        </Card>
    );
};

export default CustomCard;
