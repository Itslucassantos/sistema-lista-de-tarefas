import { Form, Formik } from 'formik';
import Input from './Input';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';

const FormSistema = ({
  tarefas,
  setTarefas,
  task,
  setTask,
  updateTaskOrder,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const taskToUpdate = location.state?.taskToUpdate;

  const taskExists = (nome) =>
    tarefas.some((tarefa) => tarefa.nome.toLowerCase() === nome.toLowerCase());

  const taskIdExists = (idTask) =>
    tarefas.some((tarefa) => tarefa.id === idTask);

  useEffect(() => {
    if (task.id && !taskExists(task.nome)) {
      if (taskIdExists(taskToUpdate?.id)) {
        const updatedTasks = tarefas.filter(
          (tarefa) => tarefa.id !== taskToUpdate.id,
        );
        const newTask = { ...task };
        const updatedTarefas = [...updatedTasks, newTask];

        const tasksWithUpdatedOrder = updateTaskOrder(updatedTarefas);

        localStorage.setItem('tarefas', JSON.stringify(tasksWithUpdatedOrder));
        setTarefas(tasksWithUpdatedOrder);
        navigate('/');
      } else {
        const storedTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        const updatedTarefas = [...storedTarefas, task];
        localStorage.setItem('tarefas', JSON.stringify(updatedTarefas));
        setTarefas(updatedTarefas);
        navigate('/');
      }
    }
  }, [
    task,
    setTarefas,
    navigate,
    tarefas,
    taskIdExists,
    taskExists,
    taskToUpdate,
  ]);

  const schema = Yup.object().shape({
    nomeDaTarefa: Yup.string()
      .required('Campo obrigatório')
      .test(
        'nome-existente',
        'Este nome já existe. Por favor, escolha outro.',
        function (value) {
          return !tarefas.some(
            (tarefa) => tarefa.nome.toLowerCase() === value?.toLowerCase(),
          );
        },
      ),
    custo: Yup.number().required('Campo obrigatório'),
    dataLimite: Yup.date().required('Campo obrigatório'),
  });

  return (
    <div className="container border border-2 rounded-3 mx-auto mt-5 w-75 shadow bg-body-tertiary">
      <h1 className="mb-5 text-center mt-3">Cadastrar Tarefa</h1>
      <Formik
        initialValues={{
          nomeDaTarefa: taskToUpdate?.nome || '',
          custo: taskToUpdate?.custo || '',
          dataLimite: taskToUpdate?.dataLimite || '',
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          if (!taskExists(values.nomeDaTarefa)) {
            setTask({
              id: taskToUpdate?.id || uuidv4(),
              nome: values.nomeDaTarefa,
              custo: values.custo,
              dataLimite: values.dataLimite,
              ordem: tarefas.length,
            });
          }
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Input name="nomeDaTarefa" type="text" label="Nome da tarefa" />
            <Input
              name="custo"
              type="number"
              label="Custo"
              placeholder="Digite o custo"
            />
            <Input name="dataLimite" type="date" label="Data limite" />
            <div className="d-flex flex-row-reverse">
              <button type="submit" className="btn btn-primary m-5">
                Incluir
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormSistema;
