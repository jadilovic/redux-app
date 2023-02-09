import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import './counter.css';

const Counter = () => {
	const count = useSelector((state) => state.counter.count);
	const dispatch = useDispatch();
	const [amount, setAmount] = useState(0);
	const addValue = Number(amount) || 0;
	const resetAll = () => {
		setAmount(0);
		dispatch(reset());
	};

	return (
		<section>
			<h5>Redux Counter</h5>
			<h5>{count}</h5>
			<div>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
			</div>
			<div>
				<input
					type="number"
					name="amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
			</div>
			<div>
				<button onClick={() => dispatch(incrementByAmount(addValue))}>
					Increment By
				</button>
				<button onClick={() => resetAll()}>Reset</button>
			</div>
		</section>
	);
};
export default Counter;
