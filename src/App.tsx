import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultTheme } from "./styles/defaultTheme";
import { AppRoutes } from "./routes";


export function App() {

  return (
    <BrowserRouter>
      <ChakraProvider theme={defaultTheme}>
        <AppRoutes/>
      </ChakraProvider>

    </BrowserRouter>
  )
}