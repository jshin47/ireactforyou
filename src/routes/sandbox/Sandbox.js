
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sandbox.scss';

function Sandbox({ title }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
      </div>
    </div>
  );
}

Sandbox.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Sandbox, s);
