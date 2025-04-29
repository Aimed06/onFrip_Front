import { Formik, Form } from "formik";
import Modal from "../../Common/Modals";
import {
  MdClose,
  MdFingerprint,
  MdInfo,
  MdUploadFile,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { setIdentite } from "../../../../Redux/ModalSlice/ModalSlice";
import * as Yup from "yup";
import { User } from "../../../../services/User/User";
import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  file: Yup.mixed()
    .nullable()
    .required("Fichier requis")
    .test(
      "FILE_FORMAT",
      "Format de fichier non pris en charge",
      (value: Yup.AnyObject | File) =>
        !value ||
        (value &&
          ["image/png", "image/jpeg", "application/pdf"].includes(value.type))
    )
    .test(
      "FILE_SIZE",
      "Fichier trop volumineux",
      (value: Yup.AnyObject | File) =>
        !value || (value && (value as File).size <= 2500000)
    ),
});

interface FormikStateType {
  file: string | File;
}

const Identite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const initialValues: FormikStateType = {
    file: "",
  };

  return (
    <Modal>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            dispatch(setIdentite(false));
            User.verifyUser(values.file as File);
          }, 2000);
        }}
      >
        {(formik) => (
          <Form>
            <Paper
         
              
            >
              <Box
              >
                <IconButton onClick={() => dispatch(setIdentite(false))}>
                  <MdClose size={24} color="gray" />
                </IconButton>
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Box
               
                >
                  <MdFingerprint size={40} color="#47df42" />
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Verification d’identité
                </Typography>
                <Typography color="text.secondary" textAlign="center">
                  Lorsque votre identité est vérifiée, un badge{" "}
                  <strong>"compte vérifié"</strong> sera attribué à votre nom,
                  garantissant ainsi un processus de réservation plus fluide. Nous
                  ne partagerons aucune autre information avec les hôtels.
                </Typography>
              </Box>

              <Typography variant="subtitle1" fontWeight="medium" display="flex" alignItems="center" gap={1}>
                Pièce d’identité <MdInfo color="gray" />
              </Typography>

              <Box
                mt={2}
                mb={3}
                sx={{
                  border: "2px dashed #c4c4c4",
                  borderRadius: 2,
                  height: 192,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                }}
              >
                <label htmlFor="dropzone-file" style={{ width: "100%", height: "100%" }}>
                  <input
                    id="dropzone-file"
                    type="file"
                    hidden
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        formik.setFieldValue("file", e.target.files[0]);
                      }
                    }}
                  />
                  <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <MdUploadFile size={56} color="gray" />
                    <Typography variant="body2" color="text.primary" mt={1}>
                      <span style={{ fontWeight: 600, color: "#1976d2" }}>
                        Cliquer pour importer
                      </span>{" "}
                      ou glisser un fichier ici
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      PDF, PNG, JPEG (taille maximale : 25MB)
                    </Typography>
                    {formik.values.file instanceof File && (
                      <Typography variant="caption" color="text.secondary" mt={1}>
                        Nom du fichier : {formik.values.file.name}
                      </Typography>
                    )}
                  </Box>
                </label>
              </Box>

              {formik.errors.file && (
                <Typography variant="caption" color="error" mb={2}>
                  {String(formik.errors.file)}
                </Typography>
              )}

              <Button

                sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    borderRadius: "999px", // équivalent à rounded-full
                    "&:hover": {
                      backgroundColor: "primary.dark", // ou ajuste selon ton thème
                    },
                    width: "100%",
                  }}
                
            
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Envoyer la pièce d'identité"
                )}
              </Button>
            </Paper>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default Identite;
