import React from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/posts/${props.post.id}`, { replace: true });
	}

	const removeThisPost = () => {
		props.remove(props.post)
	}

	return (
		<div className='post'>
			<div className='post__content'>
				<strong>{props.post.id}. {props.post.title}</strong>
				<p>{props.post.body}</p>
			</div>
			<div className='post_btns'>
				<MyButton onClick={handleClick}>
					Open
				</MyButton>
				<MyButton id='delete' onClick={removeThisPost}>
					Delete
				</MyButton>
			</div>
		</div >
	);

}

export default PostItem;