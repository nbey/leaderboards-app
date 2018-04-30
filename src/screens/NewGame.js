import React, { Component } from 'react';
import {
    FlatButton,
    MenuItem,
    SelectField,
} from 'material-ui';

import PlayerSelector from '../components/PlayerSelector';

export default class NewGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOne: null,
            playerTwo: null,
            started: false,
            players: [{
                name: 'Lebron James',
                wins: 0,
                losses: 0
            }, {
                name: 'Joel Embiid',
                wins: 0,
                losses: 0
            }, {
                name: 'Ben Simmons',
                wins: 0,
                losses: 0
            }, {
                name: 'James Harden',
                wins: 0,
                losses: 0
            }]
        };
    }

    saveResults = async() => {
        let {winner, started, playerOne, playerTwo} = this.state;

        // TODO: save results
        window.alert(`${winner} won!`);

        // reset state
        winner = playerOne = playerTwo = null;
        started = false;
        await this.setState({
            playerOne,
            playerTwo,
            winner,
            started
        });
    }

    _renderPlayerSelectionForm() {
        return (
            <div>
                <PlayerSelector
                    fieldName={'playerOne'}
                    fieldLabel={'Player One'}
                    players={this.state.players.filter(p => this.state.playerTwo !== p.name)}
                    selected={this.state.playerOne}
                    onPlayerCreated={(name) => {
                        let {players} = this.state;

                        players.push({
                            name,
                            wins: 0,
                            losses: 0
                        });

                        this.setState({
                            players,
                            playerOne: name
                        });
                    }}
                    onSelectionChange={(playerOne) => {
                        this.setState({playerOne});
                    }}
                />
                <PlayerSelector
                    fieldName={'playerTwo'}
                    fieldLabel={'Player Two'}
                    players={this.state.players.filter(p => this.state.playerOne !== p.name)}
                    selected={this.state.playerTwo}
                    onPlayerCreated={(name) => {
                        let {players} = this.state;

                        players.push({
                            name,
                            wins: 0,
                            losses: 0
                        });

                        this.setState({
                            players,
                            playerTwo: name
                        });
                    }}
                    onSelectionChange={(playerTwo) => {
                        this.setState({playerTwo});
                    }}
                />
                <FlatButton
                    label={'Start Game'}
                    disabled={!(this.state.playerOne && this.state.playerTwo)}
                    onClick={() => {
                        this.setState({
                            started: true
                        });
                    }}
                />
            </div>
        );
    }

    _renderWinnerSelectionForm() {
        return (
            <div>
                <SelectField
                    name={'winner'}
                    floatingLabelText={'Winner'}
                    floatingLabelFixed={true}
                    value={this.state.winner}
                    key={'winner'}
                    onChange={(evt, idx, winner) => {
                        this.setState({
                            winner
                        });
                    }}
                >
                    {[this.state.playerOne, this.state.playerTwo].map(p => <MenuItem value={p} key={p} primaryText={p} />)}
                </SelectField>
                <FlatButton
                    label={'Save Results'}
                    disabled={!(this.state.winner)}
                    onClick={() => {
                        this.saveResults();
                    }}
                />
            </div>
        );
    }

    render() {
        if (this.state.started) {
            return this._renderWinnerSelectionForm();
        } else {
            return this._renderPlayerSelectionForm();
        }
    }
}