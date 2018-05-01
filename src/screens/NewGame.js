import React, { Component } from 'react';
import {
    Button,
    MenuItem,
    Select,
} from 'material-ui';

import PlayerSelector from '../components/PlayerSelector';
import {
    createPlayer, getPlayers, logGameResults, getPlayer
} from '../storage';

export default class NewGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOne: null,
            playerTwo: null,
            started: false,
            players: []
        };
    }

    componentWillMount() {
        this.loadPlayers();
    }

    loadPlayers = async() => {
        const players = await getPlayers();

        this.setState({
            players
        });
    }

    saveResults = async() => {
        let {winner, started, playerOne, playerTwo} = this.state;

        //save winner
        await logGameResults(winner, winner === playerOne ? playerTwo : playerOne);

        const player = await getPlayer(winner);
        window.alert(`${winner} won! (#${player && player.wins})`);

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

    createPlayer = async (player, name) => {
        await createPlayer(name);
        await this.loadPlayers();

        this.setState({
            [player]: name
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
                        this.createPlayer('playerOne', name);
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
                        this.createPlayer('playerTwo', name);
                    }}
                    onSelectionChange={(playerTwo) => {
                        this.setState({playerTwo});
                    }}
                />
                <Button
                    disabled={!(this.state.playerOne && this.state.playerTwo)}
                    onClick={() => {
                        this.setState({
                            started: true
                        });
                    }}
                >Start Game</Button>
            </div>
        );
    }

    _renderWinnerSelectionForm() {
        return (
            <div>
                <Select
                    name={'winner'}
                    label={'Winner'}
                    value={this.state.winner || ''}
                    key={'winner'}
                    style={{minWidth: 250}}
                    onChange={(evt) => {
                        let winner = evt && evt.target && evt.target.value;
                        this.setState({
                            winner
                        });
                    }}
                >
                    {[this.state.playerOne, this.state.playerTwo].map(p => <MenuItem value={p} key={p}>{p}</MenuItem>)}
                </Select>
                <Button
                    disabled={!(this.state.winner)}
                    onClick={() => {
                        this.saveResults();
                    }}
                >Save Results</Button>
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