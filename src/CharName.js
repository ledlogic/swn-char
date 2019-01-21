import React from 'react';

const CharName = ({
  name,
  onNewClassicName,
  onNewName
}) => (
  <div className='col-sm-12 char-name'>
    <span className="clearfix">
    	<h4>Name</h4>
    	<p>{name}</p>
    	<span className="swn-actions">
			<button onClick={onNewClassicName}>Classic WE Name</button>
			<button onClick={onNewName}>New WE 2 Name</button>
    	</span>
    </span>
  </div>
);

export default CharName;