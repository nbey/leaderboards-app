import React, { Component } from 'react';
import {
    FlatButton,
    MenuItem,
    SelectField,
} from 'material-ui';

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
                <SelectField
                    name={'playerOne'}
                    floatingLabelText={'Player One'}
                    floatingLabelFixed={true}
                    value={this.state.playerOne}
                    key={'playerOne'}
                    onChange={(evt, idx, playerOne) => {
                        this.setState({
                            playerOne
                        });
                    }}
                >
                    {this.state.players.map(p => <MenuItem value={p.name} key={p.name} primaryText={p.name} />)}
                </SelectField>
                <SelectField
                    name={'playerTwo'}
                    floatingLabelText={'Player Two'}
                    floatingLabelFixed={true}
                    value={this.state.playerTwo}
                    key={'playerTwo'}
                    onChange={(evt, idx, playerTwo) => {
                        this.setState({
                            playerTwo
                        });
                    }}
                >
                    {this.state.players.map(p => <MenuItem value={p.name} key={p.name} primaryText={p.name} />)}
                </SelectField>
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