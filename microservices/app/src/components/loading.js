import React from 'react';
import '../App.css';

const Loading = (props) => {
return (<div className="bot-message">
	<div style={{backgroundColor: 'rgb(0, 212, 175)'}} className="bot-avatar"></div>
	<div className='bot-username-message'> 
		<div className="typing-indicator"> 
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
</div>)
};

export default Loading;