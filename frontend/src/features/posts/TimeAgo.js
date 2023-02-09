import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
	let timeAgo = '';
	if (timestamp) {
		const date = parseISO(timestamp);
		const timeFrom = formatDistanceToNow(date);
		timeAgo = `${timeFrom} ago`;
	}
	return (
		<span title={timestamp}>
			&nbsp; <i>{timeAgo}</i>
		</span>
	);
};
export default TimeAgo;
