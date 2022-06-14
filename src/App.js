import Tasks from "./components/task/Task";

import './app.scss';
import './style/style.scss';

function App() {
  return (
    <div className="app">
      <h1>todos</h1>
      <main>
        <Tasks tasks={['Тестовое задание', 'Прекрасный код', 'Покрытие тестами']}/>
      </main>
    </div>
  );
}

export default App;
