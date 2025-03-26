import Navbar from "../home/Navbar";
import PageTitle from "../home/PageTitle";
import { MdPerson, MdSettings } from "react-icons/md";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <>
      <header>
        <Navbar />
        <div className="pt-6">
          <PageTitle
            title={
              <>
                <MdPerson size={26} /> Mon Compte
              </>
            }
            subtitle={
              "Ci-dessous, vous pouvez modifier les informations de votre profil et gérer vos réservations."
            }
            buttons={
              <Button variant="outlined" startIcon={<MdSettings size={24} />}>
                Paramètres
              </Button>
            }
            bottomBorder
          />
        </div>
      </header>
    </>
  );
};

export default Header;
