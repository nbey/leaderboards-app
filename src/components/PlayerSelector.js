import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatButton,
    MenuItem,
    SelectField,
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
                    <FlatButton
                        label={'Cancel'}
                        onClick={() => {
                            this.setState({
                                createPlayer: false,
                                newPlayerName: null
                            });
                        }}
                    />
                    <FlatButton
                        label={'Save'}
                        onClick={this._saveNewPlayer}
                        disabled={!this.state.newPlayerName}
                    />
                </div>
            );
        } else {
            return (
                <SelectField
                    name={this.props.fieldName}
                    floatingLabelText={this.props.fieldLabel}
                    floatingLabelFixed={true}
                    value={this.props.selected}
                    key={this.props.fieldName}
                    onChange={(evt, idx, player) => {
                        if (idx === 0) {
                            this.props.onSelectionChange(null);
                            return this.setState({
                                createPlayer: true
                            });
                        }
                        this.props.onSelectionChange(player);
                    }}
                >
                    <MenuItem value={'create'} primaryText={'Create New Player'}/>
                    {this.props.players.map(p => <MenuItem value={p.name} key={p.name} primaryText={p.name} />)}
                </SelectField>
            );
        }
    }
}