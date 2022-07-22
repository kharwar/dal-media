/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
import { useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Container, Paper, Typography } from "@mui/material";
import { apiRoutes, ServiceManager } from "../../services";
import { useParams, useLocation } from "react-router-dom";
import { RichTextInput } from "../../components";
import { alignProperty } from "@mui/material/styles/cssUtils";

const fetchBlog = (blogId, setBlog) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.getBlogs}/${blogId}`)
    .then((res) => {
      setBlog(res["data"].body);
    })
    .catch((error) => {});
};

const BlogDetail = () => {
  const params = useParams();
  const { state } = useLocation();
  const { blog } = state;
  // const [blog, setBlog] = useState(state.blog);

  const editor = useMemo(() => withReact(createEditor()), []);

  const setValue = () => {};

  // useEffect(() => {
  //   fetchBlog(params.id, setBlog);
  // }, []);

  return (
    <Container maxWidth="lg">
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundImage: `url(${blog.image})`,
          marginTop: "10px",
          borderRadius: "10px",
          display: "table",
        }}
      >
        <Typography
          variant="h4"
          color={"#FFF"}
          sx={{
            padding: "40px",
            display: "table-cell",
            verticalAlign: "bottom",
          }}
        >
          {blog.title}
        </Typography>
      </div>
      <RichTextInput value={blog.body} setValue={setValue} readOnly={true} />
    </Container>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows what happens when the Editor is set to readOnly, it is not editable",
      },
    ],
  },
];

export default BlogDetail;
