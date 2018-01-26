import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './App';
import UserMessage from './components/usermessage.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chat/>, document.getElementById('root'));
registerServiceWorker();
