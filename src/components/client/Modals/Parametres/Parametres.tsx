import Modal from "../../Common/Modals";
import { MdClose } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import * as Yup from "yup";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setShowParametres } from "../../../../Redux/ModalSlice/ModalSlice";
import { RootState } from "../../../../Redux/store";
import { useState } from "react";
import { Box, Typography, TextField, IconButton, CircularProgress, Button as MuiButton } from "@mui/material";
import { User } from "../../../../services/User/User";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Le nom doit comporter au moins 2 caractères")
    .required("Le nom est requis"),
  lastName: Yup.string()
    .min(2, "Le prénom doit comporter au moins 2 caractères")
    .required("Le prénom est requis"),
  phone: Yup.string()
    .matches(/^(0|\+213)[567][0-9]{8}$/, "Numéro de téléphone invalide")
    .required("Le numéro de téléphone est requis"),
});

interface ParametresFormikTypes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const Parametres = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: ParametresFormikTypes) => {
    try {
      setIsLoading(true);
      await User.updateUser(user.id, {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      });
      setIsLoading(false);
      dispatch(setShowParametres(false));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <Box sx={{ width: 410, mb: 6 }}>
        <Box sx={{ height: 44, mb: 2, position: "relative" }}>
          <IconButton
            onClick={() => dispatch(setShowParametres(false))}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              backgroundColor: "#F1F1F1",
              width: 48,
              height: 44,
              borderRadius: 2,
            }}
          >
            <MdClose size={24} style={{ color: "#6B7280" }} />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
          Paramètres du compte
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#111827" }}>
          Modifier vos informations
        </Typography>
      </Box>

      <Box >
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: "",
            phone: user.phone,
          }}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Field name="firstName">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Nom"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    error={!!formik.errors.firstName && formik.touched.firstName}
                    helperText={<ErrorMessage name="firstName" />}
                    sx={{ borderRadius: 50 }}
                  />
                )}
              </Field>

              <Field name="lastName">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Prénom"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    error={!!formik.errors.lastName && formik.touched.lastName}
                    helperText={<ErrorMessage name="lastName" />}
                  />
                )}
              </Field>

              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                margin="dense"
                value={user.email}
                disabled
                InputProps={{
                  endAdornment: (
                    <MdOutlineVerified size={25} style={{ color: "green" }} />
                  ),
                }}
                sx={{ bgcolor: "#f3f4f6", mt: 1 }}
              />
              <ErrorMessage
                name="email"
                component="div"
               
              />

              <Field name="phone">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Numéro de téléphone"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    error={!!formik.errors.phone && formik.touched.phone}
                    helperText={<ErrorMessage name="phone" />}
                  />
                )}
              </Field>

              <MuiButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={!formik.isValid || formik.isSubmitting}
                sx={{
                  mt: 2,
                  height: "44px",
                  backgroundColor: "#3ac453",
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Finaliser mon inscription"
                )}
              </MuiButton>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default Parametres;
