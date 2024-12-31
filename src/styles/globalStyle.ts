import { pxToRem } from "@/utils";
import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "styled-components";


//No arquivo de estilos globais, podemos acessar as propriedades do tema:

export const GlobalStyle = createGlobalStyle<{ theme?: DefaultTheme}>`
body, html {
background: ${(props) =>props.theme.appBackground};
color: ${(props) =>props.theme.appColor};
margin:0;
padding: 0;
font-family: "Inter", serif;
}

h1,h2,p,ul,li, figure {
margin: 0;
padding:0;
}

    .mb-1{
        margin-bottom: ${pxToRem(16)};

        .mb-2{
        margin-bottom: ${pxToRem(32)};

`