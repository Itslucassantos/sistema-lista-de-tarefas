import { useState } from 'react';
import FormSistema from './components/FormSistema';
import ListaTarefas from './components/ListaTarefas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [task, setTask] = useState({
    id: '',
    nome: '',
    custo: '',
    dataLimite: '',
    ordem: '',
  });

  const updateTaskOrder = (tasks) => {
    return tasks.map((task, index) => ({
      ...task,
      ordem: index,
    }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ListaTarefas
              tarefas={tarefas}
              setTarefas={setTarefas}
              task={task}
              setTask={setTask}
              updateTaskOrder={updateTaskOrder}
            />
          }
        />
        <Route
          path="cadastrar"
          element={
            <FormSistema
              tarefas={tarefas}
              setTarefas={setTarefas}
              task={task}
              setTask={setTask}
              updateTaskOrder={updateTaskOrder}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
