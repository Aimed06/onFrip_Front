import { MdClose, MdNavigateNext, MdOutlineVerified } from "react-icons/md";
import Modal from "../../../Common/Modals";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../Redux/store";
import { setShowOTP } from "../../../../../Redux/ModalSlice/ModalSlice";
import { CircularProgress } from "@mui/material";
import { Authentification } from "../../../../../services/Authentification/Authentification";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  TextField,
  Divider,
  Avatar,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  digit1: Yup.string().required("Champ requis"),
  digit2: Yup.string().required("Champ requis"),
  digit3: Yup.string().required("Champ requis"),
  digit4: Yup.string().required("Champ requis"),
});

interface formikValues {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
}

let currentOTPIndex: number = 0;

const OTP = () => {
  const [errorOtp, setErrorOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCodeLoading, setResendCodeLoading] = useState(false);
  const email = useSelector((state: RootState) => state.modal.signUp.email);
  const dispatch = useDispatch();
  const values = {
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  };
  const [activeOTPIndex, setActiveOTPIndex] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    formik: FormikHelpers<formikValues>
  ) => {
    const { value } = target;
    formik.setFieldValue(
      `digit${currentOTPIndex}`,
      value.substring(value.length - 1)
    );
    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  const handleSubmit = async (values: { [keys: string]: string }) => {
    const otpCode = parseInt(
      values.digit1 + values.digit2 + values.digit3 + values.digit4
    );
    setIsLoading(true);
    const error = await Authentification.verifySecretCode(email, otpCode, dispatch);
    setErrorOtp(error?.message || "");
    setIsLoading(false);
  };

  const ResendCode = async () => {
    setResendCodeLoading(true);
    await Authentification.sendSecretCode(email, dispatch);
    setResendCodeLoading(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <Modal>
      <Formik
        validationSchema={validationSchema}
        initialValues={values}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Box sx={{ width: 419, height: 232, mb: 6, position: "relative" }}>
              <Box sx={{ height: 44 }}>
                <IconButton
                  onClick={() => dispatch(setShowOTP(false))}
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
              <Box sx={{ height: 180 }}>
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    mb: 6,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    backgroundColor: "#E4F9F4", // Custom success background color
                  }}
                >
                  <MdOutlineVerified size={40} color="#4CAF50" />
                </Box>
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>
                  Vérifions que c'est bien vous
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Veuillez saisir le code OTP que nous venons d'envoyer
                  <br /> vers l'adresse e-mail
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              {[1, 2, 3, 4].map((index) => (
                <Field
                  key={index}
                  type="number"
                  name={`digit${index}`}
                  innerRef={activeOTPIndex === index ? inputRef : null}
                  maxLength={1}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleOnKeyDown(e, index)
                  }
                  component={TextField}
                  sx={{
                    width: 88,
                    height: 44,
                    borderRadius: 1,
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    "& .MuiInputBase-root": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                    },
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    {
                      setErrorOtp(""),
                    handleOnChange(e, formik)
                    }
                  }
                  value={formik.values[`digit${index}` as keyof typeof formik.values]}
                />
              ))}
            </Stack>

            {formik.isValid ? null : (
              <Typography sx={{ color: "#F44336", fontSize: "0.875rem" }}>
                Veuillez remplir tous les champs
              </Typography>
            )}

            {errorOtp && (
              <Typography sx={{ color: "#F44336", fontSize: "0.875rem" }}>
                {errorOtp}
              </Typography>
            )}

            <Typography variant="body2" sx={{ mt: 2, mb: 4 }} color="text.secondary">
              Vous n'avez rien reçu ?&nbsp;
              <Button onClick={ResendCode} sx={{ textTransform: "none" }}>
                Renvoyer le code
                {resendCodeLoading && (
                  <CircularProgress size={15} color="inherit" sx={{ ml: 1 }} />
                )}
              </Button>
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <>
                  Vérifier <MdNavigateNext size={24} />
                </>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default OTP;
