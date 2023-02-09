import Counter from './features/counter/Counter';
import AddPostForm from './features/posts/AddPostForm';
import PostsList from './features/posts/PostsList';

function App() {
	return (
		<main className="App">
			<AddPostForm />
			<PostsList />
			<Counter />
		</main>
	);
}

export default App;
