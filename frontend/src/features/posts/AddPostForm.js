import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { postAdded } from './postsSlice';

const AddPostForm = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [userId, setUserId] = useState('');
	const dispatch = useDispatch();

	const users = useSelector(selectAllUsers);
	const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

	const handleTitleChange = (e) => setTitle(e.target.value);
	const handleContentChange = (e) => setContent(e.target.value);
	const handleUserChanged = (e) => setUserId(e.target.value);

	const onSavePostClicked = () => {
		if (title && content) {
			dispatch(postAdded(title, content, userId));
			setTitle('');
			setContent('');
		}
	};

	const userOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	return (
		<section>
			<h2>Add New Post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					name="postTitle"
					id="postTitle"
					value={title}
					onChange={handleTitleChange}
				/>
				<label htmlFor="postUser">Select User:</label>
				<select
					name="postUser"
					id="postUser"
					value={userId}
					onChange={handleUserChanged}
				>
					<option value=""></option>
					{userOptions}
				</select>
				<label htmlFor="postContent">Post Content:</label>
				<textarea
					name="postContent"
					id="postContent"
					value={content}
					onChange={handleContentChange}
				></textarea>
				<button type="button" onClick={onSavePostClicked} disabled={!canSave}>
					Save Post
				</button>
			</form>
		</section>
	);
};
export default AddPostForm;
