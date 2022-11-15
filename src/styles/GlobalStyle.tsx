import { css, Global } from '@emotion/react';

function GlobalStyle() {
  return <Global styles={style} />;
}

export default GlobalStyle;

const style = css`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }

  :root {
    // color
    --gray-10: #faf4f4;
    --gray-20: #f3ecef;
    --gray-30: #f8f8f8;
    --gray-50: #dad3d6;
    --gray-60: #b1b0b1;
    --gray-70: #9d9d9d;
    --gray-80: #787878;
    --gray-90: #656565;
    --gray-90per: rgb(117, 117, 117, 0.9);
    --gray-80per: rgb(117, 117, 117, 0.8);
    --gray-70per: rgb(117, 117, 117, 0.7);
    --gray-60per: rgb(117, 117, 117, 0.6);
    --gray-50per: rgb(117, 117, 117, 0.5);
    --gray-40per: rgb(117, 117, 117, 0.4);
    --gray-30per: rgb(117, 117, 117, 0.3);
    --gray-20per: rgb(117, 117, 117, 0.2);
    --gray-15per: rgb(117, 117, 117, 0.15);
    --gray-10per: rgb(117, 117, 117, 0.1);

    --red-10: #ed6a5e;

    --blue-10: #2955b3;
    --blue-20: #5897f8;

    --darkBlue-10: #00063b;

    --white: white;
    --white-90per: rgba(255, 255, 255, 0.9);
    --white-80per: rgba(255, 255, 255, 0.8);
    --white-70per: rgba(255, 255, 255, 0.7);
    --white-60per: rgba(255, 255, 255, 0.6);
    --white-50per: rgba(255, 255, 255, 0.5);
    --white-40per: rgba(255, 255, 255, 0.4);
    --white-30per: rgba(255, 255, 255, 0.3);
    --white-20per: rgba(255, 255, 255, 0.2);
    --white-10per: rgba(255, 255, 255, 0.1);

    --black: black;
    --black-90per: rgba(0, 0, 0, 0.9);
    --black-80per: rgba(0, 0, 0, 0.8);
    --black-70per: rgba(0, 0, 0, 0.7);
    --black-60per: rgba(0, 0, 0, 0.6);
    --black-50per: rgba(0, 0, 0, 0.5);
    --black-40per: rgba(0, 0, 0, 0.4);
    --black-30per: rgba(0, 0, 0, 0.3);
    --black-20per: rgba(0, 0, 0, 0.2);
    --black-10per: rgba(0, 0, 0, 0.1);

    --transparent: transparent;

    // z-index
    --dialogContent: 90000;
    --dialogBg: 80000;
    --top: 70000;
    --absoluteHeader: 10000;
    --background: -1;
  }
`;
