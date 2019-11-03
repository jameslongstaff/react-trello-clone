import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800|Roboto+Slab:400,700');

  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: "Open Sans", sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-bottom: 0;
    font-family: "Roboto Slab", serif;
  }
  
  h1 {
    color: #fff;
    font-size: 1.5rem;
    padding: 0.5rem 0;
  }

  input {
    &:focus {
      outline: none;
    }
  }
`;
