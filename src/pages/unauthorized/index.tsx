import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <main>
      <h1>Não está autorizado a entrar nessa pagina</h1>
      <button onClick={goBack}>Voltar</button>
    </main>
  );
};

export default Unauthorized;
