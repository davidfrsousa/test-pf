import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../../axios.js";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyCarousel from "../Editar/EditarCarousel.jsx";

function EditarForm(props) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      id: props.item._id,
      nome: props.item.nome,
      descricao: props.item.descricao,
      categoria: props.item.categoria,
      preco: props.item.preco,
    };
    const header = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    console.log(body);
    const res = await axios.post(
      `http://localhost:3000/editar/${props.item._id}`,
      body,header
    );
    if(res.data === "success") navigate("/produtos");
    else alert("Não foi possível atualizar o produto!");
  };

  return (
    <>
    <Container>

      <Form onSubmit={handleSubmit}>

      <Row>
        <Col xs={6} className="mx-auto my-5">
        <Form.Group className="mb-3" controlId="formDesc">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              props.setItem((prevState) => ({
                ...prevState,
                nome: e.target.value,
              }))
            }
            value={props.item.nome}
          />
        </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={5}>
            <MyCarousel imagem={props.item.imagens}/>
        </Col>
        <Col xs={7} className="px-5">
        <Form.Group className="mb-3" controlId="formDesc">
          <Form.Label>Descrição:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              props.setItem((prevState) => ({
                ...prevState,
                descricao: e.target.value,
              }))
            }
            value={props.item.descricao}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCat">
          <Form.Label>Categoria: </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              props.setItem((prevState) => ({
                ...prevState,
                categoria: e.target.value,
              }))
            }
            value={props.item.categoria}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPreco">
          <Form.Label>Preço: </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              props.setItem((prevState) => ({
                ...prevState,
                preco: e.target.value,
              }))
            }
            value={props.item.preco}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Enviar
        </Button>
        </Col>
      </Row>
      

        
      </Form>
      </Container>
    </>
  );
}

export default EditarForm;
