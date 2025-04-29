import { MdClose, MdAccountCircle, MdNavigateNext } from "react-icons/md";
import Modal from "../../Common/Modals";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import { Authentification } from "../../../../services/Authentification/Authentification";
import { useDispatch } from "react-redux";
import { setShowSignUp } from "../../../../Redux/ModalSlice/ModalSlice";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email invalide")
    .required("L'email est requis"),
});

interface SignUpFormValues {
  email: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const GoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      HandleGoogleSubmit(tokenResponse.access_token);
    },
  });

  const handleSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);
    await Authentification.sendSecretCode(values.email, dispatch);
    setIsLoading(false);
  };

  const HandleGoogleSubmit = async (access_token: string) => {
    setIsLoading(true);
    await Authentification.googleAuth(access_token, dispatch);
    setIsLoading(false);
  };

  return (
    <Modal>
      <Box sx={{ width: 397, mb: 6, position: "relative" }}>
        <Box sx={{ height: 44 }}>
          <IconButton
            onClick={() => dispatch(setShowSignUp(false))}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#F1F1F1",
              borderRadius: 2,
              width: 56,
              height: 44,
            }}
          >
            <MdClose size={24} color="#6B7280" />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            fontWeight: 500,
            color: "text.secondary",
          }}
        >
          login / register
        </Typography>
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Bienvenue sur <span style={{ color: "#439e49" }}>OnFrip</span>
        </Typography>
      </Box>

      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "" }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form style={{ width: 397, position: "relative" }}>
            <Field name="email">
              {({ field }: any) => (
                <TextField
                  {...field}
                  type="email"
                  placeholder="Adresse email"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdAccountCircle size={25} color="#6B7280" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 1 }}
                />
              )}
            </Field>
            <ErrorMessage name="email">
              {(msg) => (
                <Typography
                  sx={{ color: "#F44336", fontSize: "0.875rem", mb: 1 }}
                >
                  {msg}
                </Typography>
              )}
            </ErrorMessage>

            <Button
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <>
                  Continuer avec l'adresse email&nbsp;
                  <MdNavigateNext size={24} />
                </>
              )}
            </Button>
          </Form>
        )}
      </Formik>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ width: 397, my: 4, position: "relative" }}
      >
        <Divider sx={{ width: "100%" }} />
        <Typography
          sx={{
            px: 1.5,
            position: "absolute",
            backgroundColor: "white",
            fontSize: "0.875rem",
            color: "text.secondary",
          }}
        >
          Ou bien
        </Typography>
      </Stack>

      <Button
        onClick={(e) => {
          e.preventDefault(); // Prevent the default behavior (like navigation)
          GoogleLogin(); // Call the GoogleLogin function
        }}
        variant="outlined"
        fullWidth
        size="large"
        startIcon={
          <Avatar
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            sx={{ width: 20, height: 20 }}
          />
        }
        sx={{
          borderRadius: "999px",
          textTransform: "none",
        }}
      >
        <span style={{ fontSize: "0.875rem", color: "#6B7280" }}>
          Continuer avec Google
        </span>
      </Button>
    </Modal>
  );
};

export default SignUp;
