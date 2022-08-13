import CustomCard from '../CustomCard';

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

const Product = ({
    product,
    cart,
    onAdd,
    onRemove,
}: {
    cart: ProductInterface[];
    onRemove: (arg: ProductInterface) => void;
    onAdd: (arg: ProductInterface) => void;
    product: ProductInterface;
}) => (
    <CustomCard
        product={product}
        cart={cart}
        onAdd={onAdd}
        onRemove={onRemove}
    />
);

export default Product;
