import { AppRouter } from '~/router';
import { GlobalStyle } from '~/styles';
import { RecoilRoot } from 'recoil';

import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AppRouter />
    </RecoilRoot>
  );
}

export default App;
