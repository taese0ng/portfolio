import { AppRouter } from '~/router';
import { GlobalStyle } from '~/styles';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AppRouter />
    </RecoilRoot>
  );
}

export default App;
