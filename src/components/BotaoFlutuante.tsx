import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { IoMdAdd } from "react-icons/io";
import { BsInstagram, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import style from "./BotaoFlutuante.module.scss";

export default function BotaoFlutuante() {

  function openWhatsapp() {
    window.open('https://api.whatsapp.com/send?phone=553432570800&text=Ol%C3%A1%20Multivisi', '_blank');
  }

  function openFacebook() {
    window.open('https://www.facebook.com/sorvetecoficial/', '_blank');
  }

  function openInstagram() {
    window.open('https://www.instagram.com/sorvetecoficial/', '_blank');
  }

  function openYoutube() {
    window.open('https://www.youtube.com/c/CanalMultivisi/videos', '_blank');
  }

  return (
    <Fab
      // mainButtonStyles={mainButtonStyles}
      //  actionButtonStyles={actionButtonStyles}

      mainButtonStyles={{ backgroundColor: "#F280AA" }}
      icon={<IoMdAdd />}
      alwaysShowTitle={true}
    >
      <Action text="Whatsapp" onClick={openWhatsapp} style={{ backgroundColor: "#128C7E" }}>
        <BsWhatsapp />
      </Action>
      <Action text="Facebook"  onClick={openFacebook} style={{ backgroundColor: "#1877f2" }}>
        <ImFacebook />
      </Action>
      <Action text="Instagram" onClick={openInstagram} style={{ backgroundColor: "#E1306C" }}>
        <BsInstagram />
      </Action>
      <Action text="Youtube" onClick={openYoutube} style={{ backgroundColor: "#FF0000" }}>
        <BsYoutube/>
      </Action>
    </Fab>
  );
}
