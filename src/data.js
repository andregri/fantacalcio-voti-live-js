/**
 * Copyright 2023 Andrea Grillo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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