import api from 'api/api';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function ProdutoDetalhes() {
  
  const { id } = useParams();
  
  const [produto, setproduto] = useState([]);

  useEffect(() => {
    api
      .get(`web_api/products/${id}`)
      .then((response) => setproduto(response.data.Product));
  }, []);


  return (
    <section>
      <div>
       detalhes do produto
      </div>
    </section>
  )
}
