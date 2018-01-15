import * as React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Description</h2>
    <p>
      Simple read only web UI for Udaru. Version one should allow users to view
      the following:
    </p>
    <ul>
      <li>All Organizations</li>
      <li>Single Organization</li>
      <li>Users</li>
      <li>Teams</li>
      <li>Policies</li>
    </ul>
    <p>
      The intent here is that this won't be used directly as a real world user
      facing admin tool, but rather act as a starting point for building one (or
      integrating with an existing one). It should also be a useful tool in
      itself for a developer/architect working on Udaru to easily see all the
      information in Udaru.
    </p>
    <p>
      To get started please, configure udaru url and udaru root user{' '}
      <Link to="/" className="pure-button button-success">
        here
      </Link>
    </p>

    <p>
      Press on the user button on the left menu to switch between root and user
      mode. remember to configure the proper root, root org, user and user org
      on the settings page
    </p>
  </div>
);

export default Home;
