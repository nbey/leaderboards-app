import React, { Component } from 'react';
import {
    Paper,
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
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
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell
                                numeric={true}
                            >
                                Wins
                            </TableCell>
                            <TableCell
                                numeric={true}
                            >
                                        Losses
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.players.map(n => {
                            return (
                            <TableRow key={n.name}>
                                <TableCell>{n.name}</TableCell>
                                <TableCell numeric>{n.wins}</TableCell>
                                <TableCell numeric>{n.losses}</TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}