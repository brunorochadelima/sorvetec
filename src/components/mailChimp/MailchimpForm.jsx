import style from "./MailchimpForm.module.scss";
import tema from "theme/Base.module.scss";

const MailchimpForm = () => {
  return (
    <div id="mc_embed_signup" className={style.formContainer}>
      <form
        action="https://sorvetec.us21.list-manage.com/subscribe/post?u=743c7b07f10071bd1f28e9d60&id=3d38de00f2&f_id=0055e4e1f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className={style.formContainer}
        target="_blank"
        noValidate=""
      >
        <div id="mc_embed_signup_scroll" className={style.wrapper}>
          <h2>Cadastre-se para receber nossas ofertas!</h2>
          {/* <div className="indicates-required">
            <span className="asterisk">*</span> indicates required
          </div> */}
          <div className={style.mc_field_group}>
            <input
              type="email"
              defaultValue=""
              name="EMAIL"
              className={style.email}
              id="mce-EMAIL"
              required=""
              placeholder="Email"
            />
            <span id="mce-EMAIL-HELPERTEXT" className="helper_text" />
          </div>
          <div className={style.mc_field_group}>
            <input
              type="text"
              defaultValue=""
              name="NOME"
              className={style.nome}
              id="mce-NOME"
              placeholder="Nome"
            />
            <span id="mce-NOME-HELPERTEXT" className="helper_text" />
          </div>
          <div id="mce-responses" className="clear foot">
            <div
              className="response"
              id="mce-error-response"
              style={{ display: "none" }}
            />
            <div
              className="response"
              id="mce-success-response"
              style={{ display: "none" }}
            />
          </div>{" "}
          {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_743c7b07f10071bd1f28e9d60_3d38de00f2"
              tabIndex={-1}
              defaultValue=""
            />
          </div>
          <div className={style.optionalParent}>
            <div className="clear foot">
              <input
                type="submit"
                defaultValue="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className={style.button__submit}
                value="Cadastrar"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MailchimpForm;
