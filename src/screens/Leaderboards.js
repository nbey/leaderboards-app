import React, { Component } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRowColumn,
    TableRow,
} from 'material-ui';
import { getPlayers } from '../storage';

export default class Leaderboards extends Component {

    constructor(props) {
        super(props);

        this.state = {
            players: []
        };
    }

    componentWillMount() {
        getPlayers()
            .then(players => this.setState({players}));
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn numeric>Wins</TableHeaderColumn>
                            <TableHeaderColumn numeric>Losses</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        {this.state.players.sort((p1, p2) => {
                            return p1.wins === p2.wins ? p1.losses - p2.losses : p2.wins - p1.wins;
                        }).map(n => {
                            return (
                            <TableRow key={n.name}>
                                <TableRowColumn>{n.name}</TableRowColumn>
                                <TableRowColumn numeric>{n.wins}</TableRowColumn>
                                <TableRowColumn numeric>{n.losses}</TableRowColumn>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}