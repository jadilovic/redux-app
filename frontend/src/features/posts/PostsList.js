import { useSelector, useDispatch } from 'react-redux';
import {
	selectAllPosts,
	getPostsError,
	getPostsStatus,
	fetchPosts,
} from './postsSlice';
import { useEffect } from 'react';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
	const dispatch = useDispatch();

	const posts = useSelector(selectAllPosts);
	const postStatus = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);

	// const orderedPosts = posts
	// 	.slice()
	// 	.sort((a, b) => b.date.localeCompare(a.date));

	// const renderedPosts = orderedPosts.map((post) => (
	// 	<PostExcrpt key={post.id} post={post} />
	// ));
	let content;
	if (postStatus === 'loading') {
		content = <p>"Loading..."</p>;
	} else if (postStatus === 'succeeded') {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));
		content = orderedPosts.map((post) => (
			<PostExcerpt key={post.date} post={post} />
		));
	} else if (postStatus === 'failed') {
		content = <p>{error}</p>;
	}
	return (
		<section>
			<h2>Posts</h2>
			{/* {renderedPosts} */}
			{content}
		</section>
	);
};
export default PostsList;
