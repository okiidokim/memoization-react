import { QueryClientProvider } from '@tanstack/react-query';
import List from './components/List';
import qc from './apis/queryClient';

function App() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-md w-full h-[100vh] flex flex-col shadow-box">
        <header className="w-full bg-main-color py-7 font-bold text-[1.5rem] flex justify-center">
          메인 페이지
        </header>
        <div className="flex flex-grow justify-center w-full p-4 md:p-6 overflow-y-auto">
          <QueryClientProvider client={qc()}>
            <List />
          </QueryClientProvider>
        </div>
        <footer className="font-4 flex flex-col bg-main-color text-text-gray p-3 text-[0.75rem]">
          <span>Made by 도현</span>
          <span>Memoization 공부용 프로젝트</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
