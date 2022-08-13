import './style.css';

import {
	Button,
	CardActions,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';

import CustomCard from '../CustomCard';
import Banner from './Banner';

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

const Basket = ({
    cartItems,
    totalPrice,
    onRemove,
    onBuy,
    onAdd,
}: {
    cartItems: ProductInterface[];
    totalPrice: number;
    onRemove: (arg: ProductInterface) => void;
    onAdd: (arg: ProductInterface) => void;
    onBuy: () => void;
}) => {
    if (!cartItems.length) return <Banner />;
    return (
        <Container id='basket'>
            <Grid justify='center' spacing={4}>
                {cartItems.map((item) => (
                    <Grid
                        key={item.id}
                        style={{marginBottom: '2rem'}}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                    >
                        <CustomCard
                            product={item}
                            cart={cartItems}
                            onRemove={onRemove}
                            onAdd={onAdd}
                        />
                    </Grid>
                ))}
            </Grid>
            <CardActions className='actions-content'>
                <>
                    <Typography
                        className='price'
                        gutterBottom
                        variant='h5'
                        component='h2'
                    >
                        Total
                    </Typography>
                    <Button
                        size='large'
                        className='custom-button'
                        style={{color: 'black', fontSize: '24px'}}
                    >
                        {totalPrice > 1
                            ? `${totalPrice} Credits`
                            : `${totalPrice} Credit`}
                    </Button>
                </>
            </CardActions>
            <div className='actions'>
                <Button size='large' variant='contained' onClick={onBuy}>
                    Buy Now
                </Button>
            </div>
        </Container>
    );
};

export default Basket;
