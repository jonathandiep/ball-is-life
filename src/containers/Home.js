import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectPlayer, retrievePlayers } from '../redux/actions';

// import * as _ from 'lodash';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      results: [],
    };

    this.onChange = this.onChange.bind(this);

  }

  // the term state should affect what values (names) should appear in the dropdown
  /**
   * TODO: Debounce so app doesn't have to make call every change (but make it 500ms or so)
   */
  onChange(event) {
    this.setState({ term: event.target.value });

    if (event.target.value === '' && this.state.results !== []) {
      this.setState({ results: [] });
    }

    if (event.target.value) {
      this.setState({
        results: this.props.players.filter((player) => {
          if (player.firstName.substring(0, event.target.value.length).toLowerCase() === event.target.value.toLowerCase() ||
          player.lastName.substring(0, event.target.value.length).toLowerCase() === event.target.value.toLowerCase()) {
            return player;
          }
        })
      });
    } else {
      this.setState({ results: [] });
    }
  }

  componentWillMount() {
    if (this.props.players.length === 0) {
      this.props.retrievePlayers();
    }
  }

  render() {
    let playersList = this.state.results.map(player => 
      <div key={player.playerId} onClick={() => this.props.selectPlayer(player)}>
        <Link to={`/player/${player.playerId}`}><li>{player.firstName} {player.lastName}</li></Link>
      </div>
    );

    return (
      <div>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search a player... (Capitalization matters)"
              onChange={this.onChange} />
            <div>
              <ul>
                {playersList}
              </ul>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    players: state.players
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectPlayer,
      retrievePlayers,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);