import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    MenuItem,
    Select,
    TextField,
} from 'material-ui';

export default class PlayerSelector extends Component {
    static propTypes = {
        players: PropTypes.array.isRequired,

        onSelectionChange: PropTypes.func.isRequired,
        selected: PropTypes.string,

        fieldName: PropTypes.string.isRequired,
        fieldLabel: PropTypes.string.isRequired,

        onPlayerCreated: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            players: props.players,
            selected: props.selected,

            createPlayer: false,
            newPlayerName: null,
        };
    }

    _saveNewPlayer = async () => {
        await this.props.onPlayerCreated(this.state.newPlayerName);

        await this.setState({
            createPlayer: false,
            newPlayerName: null,
        });
    }

    render () {
        if (this.state.createPlayer) { // TODO: check if player already exists
            return (
                <div>
                    <TextField name={'newPlayer'} onChange={(evt) => {
                        let newPlayerName = evt && evt.target && evt.target.value;

                        this.setState({newPlayerName});
                    }} />
                    <br/>
                    <Button
                        onClick={() => {
                            this.setState({
                                createPlayer: false,
                                newPlayerName: null
                            });
                        }}
                    >Cancel</Button>
                    <Button
                        onClick={this._saveNewPlayer}
                        disabled={!this.state.newPlayerName}
                    >Save</Button>
                </div>
            );
        } else {
            return (
                <div>
                    <Select
                        name={this.props.fieldName}
                        value={this.props.selected || this.props.fieldLabel}
                        key={this.props.fieldName}
                        placeholder={this.props.fieldLabel}
                        style={{minWidth: 250}}
                        inputProps={{
                            id: this.props.fieldName
                        }}
                        onChange={(evt, idx) => {
                            let player = evt && evt.target && evt.target.value;
                            if (idx === 0 || player === 'create') {
                                this.props.onSelectionChange(null);
                                return this.setState({
                                    createPlayer: true
                                });
                            }
                            this.props.onSelectionChange(player);
                        }}
                    >
                        <MenuItem value={this.props.fieldLabel} disabled>{this.props.fieldLabel}</MenuItem>
                        <MenuItem value={'create'}>Create New Player</MenuItem>
                        {this.props.players.map(p => <MenuItem value={p.name} key={p.name}>{p.name}</MenuItem>)}
                    </Select>
                </div>
            );
        }
    }
}