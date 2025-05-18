import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import ProductCard from "./ProductCard"
import SellProductModal from "../Modals/SellProduct/SellProduct";
import { Products } from "../../../services/Product/Products";
import { Product } from "../../../services/Product/Products";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../../Redux/ProductSlice/ProductSlice";
import VoirDetail from "../Modals/VoirDetails/VoirDetail";
import { RootState } from "../../../Redux/store";

interface ProductListProps {
  onOpenDetail: (product: Product) => void;
  selectedProduct: any;
}

const ProductList: React.FC<ProductListProps> = ({ onOpenDetail ,selectedProduct}) => {
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const fetchProducts = async () => {
    try {
      const res = await Products.getUserProducts();
      setProducts(res);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => filter === "all" || product.status === filter
  );
    const showDetail = useSelector((state: RootState) => state.modal.detail);


  const handleOpenDetail = (product: Product) => {
    dispatch(setProduct({ choosedProduct: product })); // optionnel si tu utilises Redux ailleurs
    onOpenDetail(product);
  };
  const handleDeleteProduct = async (productId: number) => {
    try {
      await Products.deleteUserProduct(productId); // Assure-toi que cette méthode existe dans ton service
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <>
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filtrer</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="en ligne">Produits en ligne</MenuItem>
          <MenuItem value="vendu">Produits vendus</MenuItem>
        </Select>
      </FormControl>


      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onOpenDetail={handleOpenDetail}
                />
              </Grid>
            ))
          ) : (
            <Typography>Aucun produit trouvé.</Typography>
          )}
        </Grid>
      )}
      
    </Container>
      {showDetail && selectedProduct && (
        <VoirDetail onDelete={handleDeleteProduct} product={selectedProduct} />
      )}
       </>
  );
};

export default ProductList;
