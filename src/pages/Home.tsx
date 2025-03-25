import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import { List, ListItem, Typography } from '@mui/material';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.products.products);

    useEffect(() => {
        const fetchedProducts = [
            { title: "123", systemDocId: "123" },
            { title: "456", systemDocId: "456" },
        ];
        dispatch(setProducts(fetchedProducts));
    }, [dispatch]);

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Home Page
            </Typography>
            <List>
                {products.map((product: any) => (
                    <ListItem key={product.systemDocId}>
                        <Typography>{product.title}</Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Home;
