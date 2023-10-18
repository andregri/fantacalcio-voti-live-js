const matchTime = require('./match')

function appendLiveData(liveDataVotesArray, newLiveData, serverDeltaTime) {
    liveDataVotesArray.protoData.forEach((match, matchIndex, dataArray) => {
        if (match.status >= 1 && match.status <= 4) {
            minute = matchTime.getCurrentMinute(match, serverDeltaTime)
            appendPlayerVote(minute, match.playersHome, newLiveData.protoData[matchIndex].playersHome, dataArray[matchIndex].playersHome)
            appendPlayerVote(minute, match.playersAway, newLiveData.protoData[matchIndex].playersAway, dataArray[matchIndex].playersAway)
        }
    })
}

// appendPlayerVote appends the vote to the key "vote" and the minute
// to the key "minute"
function appendPlayerVote(minute, players, newPlayers, outputPlayers) {
    players.forEach((player, playerIndex) => {
        var newMinutes = []
        const newMinute = minute
        if (!player.hasOwnProperty("minute")) {
            newMinutes = [minute]
        } else if (!(newMinute in player.minute)) {
            newMinutes = [...player.minute, newMinute]
        } else {
            newMinutes = [...player.minute]
        }

        var newVotes = []
        const newVote = sanitizeVote(newPlayers[playerIndex].vote)
        if (!Array.isArray(player.vote)) {
            newVotes = [newVote]
        } else {
            newVotes = [...player.vote, newVote]
        }

        outputPlayers[playerIndex].minute = newMinutes
        outputPlayers[playerIndex].vote = newVotes
    })
}

function sanitizeVote(vote) {
    if (vote > 30) {
        return vote / 10
    } else {
        return vote
    }
}

module.exports = { appendLiveData };