import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Typography,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {Products, Category} from "../../../../services/Product/Products" ;// Assurez-vous que le chemin est correct



interface SellProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product?: any) => void;
}

const SellProductModal = ({ open, onClose, onSubmit }: SellProductModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCategories([
      { id: "T-shirt", name: "T-shirt" },
      { id: "Pantalon et jeans", name: "Pantalon et jeans" },
      { id: "Chaussures", name: "Chaussures" },
      { id: "Accessoires", name: "Accessoires" },
      { id: "lunettes", name: "Lunettes" },
      { id: "Hauts et chemisiers", name: "Hauts et chemisiers" },
      { id: "Vêtements extérieurs", name: "Vêtements extérieurs" },
    ]);
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Nom requis"),
    price: Yup.number().positive("Prix invalide").required("Prix requis"),
    categoryId: Yup.string().required("Catégorie requise"),
    image: Yup.mixed().required("Image requise"),

  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Vendre un produit</DialogTitle>
      <Formik
        initialValues={{ name: "", price: "", image: null, categoryId: ""}}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("price", values.price.toString());
          formData.append("category", values.categoryId);
          if (values.image) {
            formData.append("image", values.image);
          }

          try {
            setError(null);
            const data = await Products.addProduct(formData);

            console.log("Produit créé :", data);

            onSubmit(data); // envoie le produit au parent
            resetForm();
            setPreviewImage(null);
            onClose();
          } catch (err) {
            console.error("Erreur lors de la mise à jour :", err);
            setError("Erreur lors de la mise en ligne du produit.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, handleChange, touched, errors, isSubmitting, isValid }) => (
          <Form>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="Nom du produit"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                fullWidth
              />

              <TextField
                label="Prix"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                error={touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                fullWidth
              />

             

              <input
                key={previewImage || "initial"} // force re-render to reset input
                accept="image/*"
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    setFieldValue("image", file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
              {touched.image && errors.image && (
                <FormHelperText error>{errors.image as string}</FormHelperText>
              )}

              {previewImage && (
                <>
                  <Typography variant="subtitle2">Aperçu de l’image :</Typography>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 200,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </>
              )}

              <FormControl fullWidth error={touched.categoryId && !!errors.categoryId}>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  name="categoryId"
                  value={values.categoryId}
                  label="Catégorie"
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.categoryId && errors.categoryId && (
                  <FormHelperText>{errors.categoryId}</FormHelperText>
                )}
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Annuler</Button>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting || !isValid}>
                {isSubmitting ? "En cours..." : "Vendre"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default SellProductModal;
