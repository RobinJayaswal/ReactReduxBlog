import React from 'react';
import { Route, IndexRoute } from 'react-router';
import New from './containers/new-post';
import Show from './containers/show';
import SignUp from './containers/signup';
import SignIn from './containers/signin';
import RequireAuth from './containers/require-auth';

import Index from './containers/home';
import App from './components/app';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="posts/new" component={RequireAuth(New)} />
    <Route path="posts/:id" component={Show} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
  </Route>
);
