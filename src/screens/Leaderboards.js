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
            players: [],
            order: 'desc',
            orderBy: 'wins'
        };
    }

    componentWillMount() {
        getPlayers()
            .then(unsortedPlayers => this.sortPlayers(unsortedPlayers, this.state.orderBy, this.state.order))
            .then((players) => {
                this.setState({
                    players
                });
            });
    }

    onSortClick(orderBy, order = 'desc') {
        if (this.state.orderBy === orderBy && this.state.order === 'desc') {
            order = 'asc';
        }

        const players = this.sortPlayers(this.state.players, orderBy, order);

        this.setState({
            players,
            order,
            orderBy
        });
    }

    sortPlayers(players, orderBy, order) {
        return order === 'desc'
            ? players.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            : players.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
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
                                sortDirection={this.state.orderBy === 'wins' ? this.state.order : false}
                            >
                                Wins
                                <Tooltip
                                    title="Sort"
                                    placement={'bottom-end'}
                                    enterDelay={150}
                                    >
                                    <TableSortLabel
                                        active={this.state.orderBy === 'wins'}
                                        direction={this.state.order}
                                        onClick={() => this.onSortClick('wins', ...arguments)}
                                    >
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell
                                numeric={true}
                                sortDirection={this.state.orderBy === 'losses' ? this.state.order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={'bottom-end'}
                                    enterDelay={150}
                                    >
                                    <TableSortLabel
                                        active={this.state.orderBy === 'losses'}
                                        direction={this.state.order}
                                        onClick={() => this.onSortClick('losses', ...arguments)}
                                    >
                                        Losses
                                    </TableSortLabel>
                                </Tooltip>
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