// import React, { Component, useEffect } from "react";

import { useEffect, useLayoutEffect } from "react";

// class IntegratedForm extends Component {
//   componentDidMount() {
//     if (window.RDStationForms) {
//       // Essa linha cria o elemento do formulário e faz o append do conteúdo na div abaixo.
//       // Substitua os parâmetros com os dados do seu formulário.
//       // new window.RDStationForms('my-form-aeiou6de172d1e9c5b6', 'UA-36276574-1').createForm();
//       new window.RDStationForms(
//         "cadastro-newsletter-site-2-0-0d2827c4c8d409ccfbd1",
//         "UA-81053231-1"
//       ).createForm();
//     }
//   }

//   render() {
//     return (
//       <div
//         role="main"
//         id="cadastro-newsletter-site-2-0-0d2827c4c8d409ccfbd1"
//       ></div>
//     );
//   }
// }

// export default IntegratedForm;

export default function FormRdStation() {
  useEffect(() => {
    if (window.RDStationForms) {
      new window.RDStationForms(
        "cadastro-newsletter-site-2-0-0d2827c4c8d409ccfbd1",
        "UA-81053231-1"
      ).createForm();
    }
  }, []);

  return (
       <div
      role="main"
      id="cadastro-newsletter-site-2-0-0d2827c4c8d409ccfbd1"
    ></div>
  );
}
