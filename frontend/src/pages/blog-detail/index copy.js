import { useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Container, Paper } from "@mui/material";
import { apiRoutes, ServiceManager } from "../../services";
import { useParams, useLocation } from "react-router-dom";

const fetchBlog = (blogId, setBlog) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.getBlogs}/${blogId}`)
    .then((res) => {
      setBlog(res["data"].body);
      console.log(res["data"]);
    })
    .catch((error) => {
      console.log({ error });
    });
};

const BlogDetail = () => {
  const params = useParams();
  const { state } = useLocation();
  const { blog } = state;
  console.log("Blog Detail", blog);
  // const [blog, setBlog] = useState(state.blog);

  const editor = useMemo(() => withReact(createEditor()), []);

  // useEffect(() => {
  //   fetchBlog(params.id, setBlog);
  // }, []);

  return (
    <Container maxWidth="sm">
      <Paper>
        <Slate editor={editor} value={blog.body}>
          <Editable readOnly placeholder="Enter some plain text..." />
        </Slate>
      </Paper>
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
