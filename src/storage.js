

const _getPlayers = async () => {
    return await JSON.parse(await localStorage.getItem('players')) || [];
};

const _setPlayers = async(players) => {
    return await localStorage.setItem('players', await JSON.stringify(players));
};

const _getPlayer = async (name, returnIdx) => {
    let players = await _getPlayers(),
        player,
        i = 0;

    for (; i < players.length; i++) {
        if (players[i].name === name) {
            player = players[i];
            return returnIdx === true ? i : player;
        }
    }

    return player;

};

const _createPlayer = async(playerName) => {
    let players = await _getPlayers();
    players.push({
        name: playerName,
        wins: 0,
        losses: 0
    });

    await _setPlayers(players);

    return await _getPlayer(playerName);
};

const _logGameResults = async (winner, loser) => {
    let winningPlayerIdx = await _getPlayer(winner, true),
        losingPlayerIdx = await _getPlayer(loser, true),
        players = await _getPlayers();

    players[winningPlayerIdx].wins++;
    players[losingPlayerIdx].losses++;

    await _setPlayers(players);
}

export const createPlayer = _createPlayer;
export const getPlayer = _getPlayer;
export const getPlayers = _getPlayers;
export const logGameResults = _logGameResults;