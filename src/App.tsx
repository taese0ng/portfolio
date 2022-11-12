import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '~/router';
import { GlobalStyle } from '~/styles';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
