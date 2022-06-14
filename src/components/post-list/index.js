import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import Post from '../post'
import { posts } from '../../data';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../alert-dialog';

const PostList = () => {

  console.log('postList');

  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const postRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setOnAgree(onDelete)
  }, []);

  const handleMenu = (event, post) => {
    postRef.current = post;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    const post = postRef.current
    navigate(`edit-post/${post.id}`, { state: { post } })
  }

  const onDelete = () => {
    console.log('delete')
  }

  const handleDelete = () => {
    handleClose();
    setAlert(true, 'Delete Post', 'Are you sure you want to delete this post?');
  }

  const renderPost = useCallback((post) => {
    return (
      <Post post={post} key={post.id} handleMenu={(event) => handleMenu(event, post)} />
    )
  }, []);

  return (
    <>
      {posts.map(renderPost)}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  )
}

export default PostList