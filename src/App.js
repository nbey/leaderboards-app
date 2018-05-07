import React, { Component } from 'react';
import {
    HashRouter,
    NavLink,
    Route,
} from 'react-router-dom';
import './App.css';
import NewGame from './screens/NewGame';
import Leaderboards from './screens/Leaderboards';
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    ListItem,
    Toolbar,
    Typography,
} from 'material-ui';

import {
    Menu as MenuIcon,
} from '@material-ui/icons';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme();

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            drawerOpen: false
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler () {
        this.setState({drawerOpen: false});
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <HashRouter>
                    <div className="App">
                        <header className="appHeader">
                            <AppBar
                                position={'static'}
                            >
                                <Toolbar>
                                    <IconButton color={'inherit'} aria-label={'Menu'} onClick={() => this.setState({drawerOpen: !this.state.drawerOpen})}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant={'title'} className={'App-title'} style={{color: 'white'}}>Pool Leaderboards</Typography>
                                </Toolbar>
                            </AppBar>

                        </header>
                        <Drawer
                            variant="persistent"
                            anchor={'left'}
                            open={this.state.drawerOpen}

                            PaperProps={{
                                style:{
                                    marginTop: 64 // TODO: replace w/ header height
                                }
                            }}
                            >
                            <ListItem>
                                <NavLink className="nav-link" to="/new-game"><div onClick={this.onClickHandler}>New Game</div></NavLink>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <NavLink className="nav-link" to="/leaderboards"><div onClick={this.onClickHandler}>Leaderboards</div></NavLink>
                            </ListItem>
                        </Drawer>
                        <div className="App-content">
                            <Route path="/new-game" component={NewGame}/>
                            <Route path="/leaderboards" component={Leaderboards}/>
                        </div>
                    </div>
                </HashRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
