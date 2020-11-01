import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';

import { EntryProvider } from './context/EntryContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<BrowserRouter>
		<EntryProvider>
			<App />
		</EntryProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
