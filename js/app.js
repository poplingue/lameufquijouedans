import request from './request';
import React from 'react';
import ReactDOM from 'react-dom';

import Form from './Form';

ReactDOM.render(<Form />, document.getElementById('form'));
request.init();