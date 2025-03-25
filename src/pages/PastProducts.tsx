import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, Typography } from '@mui/material';

const PastProducts: React.FC = () => {
    const products = useSelector((state: any) => state.products.products);

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Past Products
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

export default PastProducts;
