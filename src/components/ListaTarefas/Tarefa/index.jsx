import 'bootstrap-icons/font/bootstrap-icons.css';
import './Tarefa.css';

const Tarefa = ({
  id,
  nome,
  custo,
  dataLimite,
  ordem,
  openDeleteModal,
  onDragStart,
  deleteTask,
  updateTask,
  upOrDown,
}) => {
  const formatarCusto = (custo) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(custo);
  };

  const formatarData = (data) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  return (
    <div
      className="d-flex justify-content-around"
      draggable
      onDragStart={onDragStart}
      style={{ cursor: 'pointer' }}
    >
      <div>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <strong>Nome:</strong> {nome}
        </p>
        <p
          style={{ backgroundColor: custo >= 1000 ? 'yellow' : 'transparent' }}
        >
          <strong>Custo:</strong> {formatarCusto(custo)}
        </p>
        <p>
          <strong>Data limite:</strong> {formatarData(dataLimite)}
        </p>
      </div>
      <div className="d-flex">
        <div>
          <button
            type="button"
            className="btn btn-danger ms-1"
            onClick={() => openDeleteModal(id)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={() => updateTask(id)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
        <div>
          <button
            onClick={() => upOrDown('up', ordem)}
            type="button"
            className="ms-2 btn btn-outline-primary mb-responsive"
          >
            <i className="bi bi-arrow-up"></i>
          </button>
          <button
            onClick={() => upOrDown('down', ordem)}
            type="button"
            className="ms-2 btn btn-outline-primary"
          >
            <i className="bi bi-arrow-down"></i>
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body text-center fs-4 fw-semibold">
              Você deseja deletar
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold"
                data-bs-dismiss="modal"
              >
                Não
              </button>
              <button
                onClick={deleteTask}
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-outline-danger fw-semibold"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tarefa;
