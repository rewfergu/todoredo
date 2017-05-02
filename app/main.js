import React from 'react'
import ReactDOM from 'react-dom'
import TodoRedo from './components/TodoRedo'

import '../scss/style.scss'
//require('../scss/style.scss');


var FastClick = require('fastclick');
FastClick.attach(document.body);

ReactDOM.render(<TodoRedo />, document.getElementById('todoRedo'));