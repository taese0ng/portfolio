import { css, Global } from '@emotion/react';

function GlobalStyle() {
  return <Global styles={style} />;
}

export default GlobalStyle;

const style = css`
  body {
    margin: 0;
    padding: 0;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }

  :root {
    --red-01: #fdedec;
    --red-02: #fadbd8;
    --red-03: #f5b7b1;
    --red-04: #f1948a;
    --red-05: #ec7063;
    --red-06: #e74c3c;
    --red-07: #cb4335;
    --red-08: #b03a2e;
    --red-09: #943126;
    --red-10: #78281f;

    --purple-01: #f5eef8;
    --purple-02: #ebdef0;
    --purple-03: #d7bde2;
    --purple-04: #c39bd3;
    --purple-05: #af7ac5;
    --purple-06: #9b59b6;
    --purple-07: #884ea0;
    --purple-08: #76448a;
    --purple-09: #633974;
    --purple-10: #512e5f;

    --blue-01: #ebf5fb;
    --blue-02: #d6eaf8;
    --blue-03: #aed6f1;
    --blue-04: #85c1e9;
    --blue-05: #5dade2;
    --blue-06: #3498db;
    --blue-07: #2e86c1;
    --blue-08: #2874a6;
    --blue-09: #21618c;
    --blue-10: #1b4f72;

    --green-01: #eafaf1;
    --green-02: #d5f5e3;
    --green-03: #abebc6;
    --green-04: #82e0aa;
    --green-05: #58d68d;
    --green-06: #2ecc71;
    --green-07: #28b463;
    --green-08: #239b56;
    --green-09: #1d8348;
    --green-10: #186a3b;

    --yellow-01: #fef9e7;
    --yellow-02: #fcf3cf;
    --yellow-03: #f9e79f;
    --yellow-04: #f7dc6f;
    --yellow-05: #f4d03f;
    --yellow-06: #f1c40f;
    --yellow-07: #d4ac0d;
    --yellow-08: #b7950b;
    --yellow-09: #9a7d0a;
    --yellow-10: #7d6608;

    --orange-01: #fef5e7;
    --orange-02: #fdebd0;
    --orange-03: #fad7a0;
    --orange-04: #f8c471;
    --orange-05: #f5b041;
    --orange-06: #f39c12;
    --orange-07: #d68910;
    --orange-08: #b9770e;
    --orange-09: #9c640c;
    --orange-10: #7e5109;

    --white: #ffffff;

    --black: #000000;

    --gray-01: #f2f4f4;
    --gray-02: #e5e8e8;
    --gray-03: #ccd1d1;
    --gray-04: #b2babb;
    --gray-05: #99a3a4;
    --gray-06: #7f8c8d;
    --gray-07: #707b7c;
    --gray-08: #616a6b;
    --gray-09: #515a5a;
    --gray-10: #424949;

    --darkgray-01: #eaecee;
    --darkgray-02: #d5d8dc;
    --darkgray-03: #abb2b9;
    --darkgray-04: #808b96;
    --darkgray-05: #566573;
    --darkgray-06: #2c3e50;
    --darkgray-07: #273746;
    --darkgray-08: #212f3d;
    --darkgray-09: #1c2833;
    --darkgray-10: #17202a;
  }
`;
