import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <AppBar position="fixed" sx={{ width: '100%' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Dailynews
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/past-products">
                    Past Products
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
