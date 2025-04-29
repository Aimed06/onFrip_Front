import { MdClose } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import Modal from "../../../../components/client/Common/Modals";
import * as Yup from "yup";
import { Formik, ErrorMessage, Field, Form, FieldProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setShowRegistration } from "../../../../Redux/ModalSlice/ModalSlice";
import { RootState } from "../../../../Redux/store";
import { useState } from "react";
import { CircularProgress, TextField, Typography, Button as MUIButton } from "@mui/material";
import { Authentification } from "../../../../services/Authentification/Authentification";

const validationSchema = Yup.object().shape({
  nom: Yup.string()
    .min(2, "Le nom doit comporter au moins 2 caractères")
    .required("Le nom est requis"),
  prenom: Yup.string()
    .min(2, "Le prénom doit comporter au moins 2 caractères")
    .required("Le prénom est requis"),
  telephone: Yup.string()
    .matches(/^(0|\+213)[567][0-9]{8}$/, "Numéro de téléphone invalide")
    .required("Le numéro de téléphone est requis"),
});

interface SignUpFormValues {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

const EndSignUp = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { email, firstName, lastName } = useSelector((state: RootState) => state.modal.signUp);
  const { regToken } = useSelector((state: RootState) => state.modal.Otp);

  const handleSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);
    await Authentification.registerUser(values, regToken);
    setIsLoading(false);
  };

  return (
    <Modal>
      <div style={{ position: "relative" }}>
        <div>
          <button 
            onClick={() => dispatch(setShowRegistration(false))}
            style={{
              position: "absolute", top: 0, right: 0, width: "56px", height: "44px",
              backgroundColor: "#F1F1F1", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <MdClose size={24} style={{ color: "#B0B0B0" }} />
          </button>
        </div>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Une dernière étape !
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Vérifiez vos informations
        </Typography>
      </div>
      <div >
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            nom: lastName,
            prenom: firstName,
            email: "",
            telephone: "",
          }}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form style={{ width: 397, position: "relative" }}>
              <Field
              
                name="nom"
                placeholder="Nom"
                render={({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Nom"
                    fullWidth
                    
                    value={formik.values.nom}
                    error={formik.touched.nom && Boolean(formik.errors.nom)}
                    helperText={formik.touched.nom && formik.errors.nom}
                    sx={{
                      borderRadius: "50px",
                      fontSize: "13px",
                    }}
                  />
                )}
              />
              <Field
                name="prenom"
                placeholder="Prénom"
                render={({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Prénom"
                    fullWidth
                    margin="normal"
                    value={formik.values.prenom}
                    error={formik.touched.prenom && Boolean(formik.errors.prenom)}
                    helperText={formik.touched.prenom && formik.errors.prenom}
                    sx={{
                      borderRadius: "50px",
                      fontSize: "14px",
                    }}
                  />
                )}
              />
              <div style={{ position: "relative" }}>
                <TextField
                  type="email"
                  name="email"
                  value={email}
                  disabled
                  label="Email"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                    style: { backgroundColor: "#f5f5f5" },
                  }}
                  sx={{
                    borderRadius: "50px",
                    fontSize: "14px",
                  }}
                />
                <MdOutlineVerified
                  size={25}
                  style={{ position: "absolute", top: "20px", right: "24px", color: "#4CAF50" }}
                />
              </div>
              <Field
                name="telephone"
                placeholder="Numéro de téléphone"
                render={({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Numéro de téléphone"
                    fullWidth
                    margin="normal"
                    value={formik.values.telephone}
                    error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                    helperText={formik.touched.telephone && formik.errors.telephone}
                    sx={{
                      borderRadius: "50px",
                      fontSize: "14px",
                    }}
                  />
                )}
              />
              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "16px" }}>
                En créant un compte, vous acceptez nos{" "}
                <span style={{ color: "#3f51b5", cursor: "pointer" }}>
                  conditions générales d'utilisation
                </span>
                .
              </Typography>
              <MUIButton
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  height: "44px",
                  width: "100%",
                  borderRadius: "50px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textTransform: "none",
                }}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <>Finaliser mon inscription</>
                )}
              </MUIButton>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EndSignUp;
