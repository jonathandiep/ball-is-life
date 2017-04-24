import React from 'react';
import PropTypes from 'prop-types';
import '../styles/loading.css';

export default function Loading(props) {
  return (
    <div className="col-xs-12 col-md-6 offset-md-3">
      <div>
        <h6>Data takes a while to load. Here&apos;s a fun fact while you wait! 😀</h6>
        <p>{props.fact}</p>
      </div>
      <p className="link">Facts sourced from: <a target="_blank" rel="noopener noreferrer" href="https://www.factretriever.com/basketball-facts">Fact Retriever</a></p>
    </div>
  );
}

Loading.propTypes = {
  fact: PropTypes.string,
};
