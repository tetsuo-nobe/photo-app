import React from 'react';
import MyPhotos from './MyPhotos';
import Amplify from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
import { amplify_config } from './config'

Amplify.configure(amplify_config);

function App() {
  return (
    <div className="container">
        <MyPhotos />
    </div>
  );
}

export default App;
