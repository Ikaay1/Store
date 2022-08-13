import './style.css';

import {
	AppBar,
	Badge,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

const NavBar = ({
    basketItems,
    totalAmount,
}: {
    basketItems: number;
    totalAmount: number;
}) => {
    return (
        <>
            <AppBar position='fixed' className='custom-navbar'>
                <Container>
                    <Toolbar>
                        <Typography
                            variant='h6'
                            className='custom-title'
                            color='inherit'
                        >
                            <img
                                src='data:image/png;base64,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'
                                alt='DwinaTech logo'
                                height='25px'
                                className='logo'
                            />
                        </Typography>
                        <div className='basket-wrapper'>
                            <h2>
                                Total Credits: <strong>{totalAmount}</strong>
                            </h2>
                        </div>
                        <div className='basket-wrapper'>
                            <IconButton
                                aria-label='Show basket contents'
                                color='inherit'
                            >
                                <Badge
                                    badgeContent={basketItems}
                                    color='secondary'
                                >
                                    <ShoppingCart className='custom-basket' />
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default NavBar;
