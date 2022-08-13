import './style.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import Banner from '../Banner';
import Product from '../Product';
import Spinner from '../Spinner';

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

const Products = ({
    cart,
    onAdd,
    onRemove,
}: {
    cart: ProductInterface[];
    onAdd: (arg: ProductInterface) => void;
    onRemove: (arg: ProductInterface) => void;
}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const testURL =
                'https://stormy-journey-26140.herokuapp.com/https://api.up42.com/marketplace/blocks';
            try {
                let {
                    data: {data},
                } = await axios.get(testURL);

                data = data.map((item: any) => ({
                    id: item.id,
                    metadata: item.metadata,
                    displayName: item.displayName,
                }));
                const filteredData = data.filter(
                    (item: ProductInterface) =>
                        item.metadata.blockPricingStrategy.name === 'simple',
                );
                setProducts(filteredData);
                console.log(filteredData);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);

    if (!products.length) return <Spinner />;

    return (
        <div>
            <Banner />
            <Container id='products'>
                <Grid container spacing={4}>
                    {products.map((product: ProductInterface) => (
                        <Grid key={product.id} item xs={12} sm={6} md={4}>
                            <Product
                                product={product}
                                cart={cart}
                                onAdd={onAdd}
                                onRemove={onRemove}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Products;
