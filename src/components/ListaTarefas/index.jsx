import { useEffect, useState } from 'react';
import Tarefa from './Tarefa';
import { useNavigate } from 'react-router-dom';
import './ListaTarefas.css'

const ListaTarefas = ({ tarefas, setTarefas, updateTaskOrder }) => {
  const navigate = useNavigate();
  const [idToDelete, setIdToDelete] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const onDragStart = (ordem) => {
    setDraggedTask(ordem);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (targetOrdem) => {
    const newOrder = [...tarefas];
    const [movedTask] = newOrder.splice(draggedTask, 1);
    newOrder.splice(targetOrdem, 0, movedTask);

    const tasksWithUpdatedOrder = updateTaskOrder(newOrder);
    setTarefas(tasksWithUpdatedOrder);
    localStorage.setItem('tarefas', JSON.stringify(tasksWithUpdatedOrder));
    setDraggedTask(null);
  };

  const openDeleteModal = (id) => {
    setIdToDelete(id);
  };

  const deleteTask = () => {
    const updatedTasks = tarefas.filter((tarefa) => tarefa.id !== idToDelete);
    const tasksWithUpdatedOrder = updateTaskOrder(updatedTasks);
    setTarefas(tasksWithUpdatedOrder);
    localStorage.setItem('tarefas', JSON.stringify(tasksWithUpdatedOrder));
  };

  const updateTask = (idTarefa) => {
    const taskToUpdate = tarefas.find((tarefa) => tarefa.id === idTarefa);
    navigate('/cadastrar', { state: { taskToUpdate } });
  };

  const upOrDown = (upOrDown, ordemIndex) => {
    const updatedTarefas = [...tarefas];

    if (upOrDown === 'up') {
      if (ordemIndex > 0) {
        [updatedTarefas[ordemIndex], updatedTarefas[ordemIndex - 1]] = [
          updatedTarefas[ordemIndex - 1],
          updatedTarefas[ordemIndex],
        ];
      }
    } else if (upOrDown === 'down') {
      if (ordemIndex < updatedTarefas.length - 1) {
        [updatedTarefas[ordemIndex], updatedTarefas[ordemIndex + 1]] = [
          updatedTarefas[ordemIndex + 1],
          updatedTarefas[ordemIndex],
        ];
      }
    }

    const tasksWithUpdatedOrder = updateTaskOrder(updatedTarefas);

    localStorage.setItem('tarefas', JSON.stringify(tasksWithUpdatedOrder));
    setTarefas(tasksWithUpdatedOrder);
  };

  useEffect(() => {
    const listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    setTarefas(listaTarefas);
  }, [setTarefas]);

  if (!tarefas) return null;
  return (
    <div className="container border border-2 rounded-3 mx-auto mt-5 responsive-width shadow bg-body-tertiary">
      <h1 className="text-center">Lista de Tarefas</h1>
      <ul className="list-unstyled mt-4">
        {tarefas.map((tarefa, index) => (
          <li
            onDragOver={onDragOver}
            onDrop={() => onDrop(index)}
            key={tarefa.id}
            className="mt-2"
          >
            <Tarefa
              id={tarefa.id}
              nome={tarefa.nome}
              custo={tarefa.custo}
              dataLimite={tarefa.dataLimite}
              ordem={tarefa.ordem}
              openDeleteModal={openDeleteModal}
              deleteTask={deleteTask}
              updateTask={updateTask}
              upOrDown={upOrDown}
              onDragStart={() => onDragStart(index)}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-primary m-5"
        onClick={() => navigate('/cadastrar')}
      >
        Incluir
      </button>
    </div>
  );
};

export default ListaTarefas;
