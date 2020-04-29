import React from 'react';

export default ({ context }) => { //extract context from props
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.name} is authenticated!</h1>
    </div>
  </div>
  );
}