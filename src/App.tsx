import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import Basket from './components/Basket';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Products from './components/Products';

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

const App = () => {
    const [cartItems, setCartItems] = useState<ProductInterface[] | []>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const totalStr =
        localStorage.getItem('total') && localStorage.getItem('total');
    const getTotal = totalStr ? JSON.parse(totalStr) : 0;
    const [totalAmount, setTotalAmount] = useState<number>(
        JSON.parse(getTotal) ? getTotal : getTotal === 0 ? 0 : 10000,
    );
    const str = localStorage.getItem('cart') && localStorage.getItem('cart');
    const getCart = str ? JSON.parse(str) : [];

    const priceStr =
        localStorage.getItem('price') && localStorage.getItem('price');
    const getPrice = priceStr ? JSON.parse(priceStr) : 0;

    useEffect(() => {
        if (getCart && getCart?.length >= 1) {
            setCartItems(getCart);
        }
        if (getPrice) {
            setTotalPrice(getPrice);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('price', JSON.stringify(totalPrice));
        localStorage.setItem('total', JSON.stringify(totalAmount));
    }, [cartItems, totalPrice, totalAmount]);

    const onAdd = (product: ProductInterface) => {
        if (totalAmount >= product.metadata.blockPricingStrategy.credits) {
            setTotalPrice(
                (prevTotalPrice: number) =>
                    prevTotalPrice +
                    product.metadata.blockPricingStrategy.credits,
            );
            setCartItems((prev) => [...prev, {...product}]);
        } else {
            alert('Your credits is not enough to add this to your cart!');
        }
    };

    const onRemove = (product: ProductInterface) => {
        setTotalPrice(
            (prevTotalPrice: number) =>
                prevTotalPrice - product.metadata.blockPricingStrategy.credits,
        );
        setCartItems((prev) =>
            prev.filter((item: ProductInterface) => item.id !== product.id),
        );
    };

    const onBuy = () => {
        setCartItems([]);
        setTotalAmount((prev: number) => prev - totalPrice);
        setTotalPrice(0);
    };

    return (
        <Router>
            <div>
                <CssBaseline />
                <NavBar
                    basketItems={cartItems.length}
                    totalAmount={totalAmount}
                />
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Products
                                cart={cartItems}
                                onAdd={onAdd}
                                onRemove={onRemove}
                            />
                        }
                    />

                    <Route
                        path='/basket'
                        element={
                            <Basket
                                cartItems={cartItems}
                                totalPrice={totalPrice}
                                onRemove={onRemove}
                                onAdd={onAdd}
                                onBuy={onBuy}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
