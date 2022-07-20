import { createContext, useState } from "react";
export const BuscaContext = createContext();
BuscaContext.displayName = "Busca";

export const BuscaProvider = ({children}) => {
const [query, setQuery] = useState("")

return(
  <BuscaContext.Provider value={{query, setQuery}}>
    {children}
  </BuscaContext.Provider>
)

}