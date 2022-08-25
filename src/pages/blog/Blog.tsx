import axios from "axios";
import React, { useCallback } from "react";
import { IBlogs } from "interfaces/IBlogs";
import CardBlog from "components/cardBlog/CardBlog";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";

export default function Blog() {
  const [blogs, setBlogs] = React.useState<IBlogs[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getBlogs = useCallback(async () =>  {
    try {
      await axios
        .get("https://api.sorvetec.com.br/api/v1/posts")
        .then((response) => setBlogs(response.data));
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  }, [])

  React.useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <section>
      {loading && <IconLoading />}
      {blogs.map((blog) => (
        <div>
          <CardBlog {...blog} />
        </div>
      ))}
    </section>
  );
}
