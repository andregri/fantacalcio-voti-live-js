const MatchStatusType = {
    Idle: 0,
    FirstHalf: 1,
    Interval: 2,
    SecondHalf: 3,
    FullTime: 4,
    Suspended: 5,
    Postponed: 6
}

function getCurrentMinute(match, serverDeltaTime) {
    const now = Date.now() - serverDeltaTime;

    const firstHalfTime = Math.ceil((-match.fhDate + now) / 1000 / 60);
    const secondHalfTime = 45 + Math.ceil((-match.shDate + now) / 1000 / 60);            

    switch (match.status) {
        case 0: return 0;
        case 1:                        
            return Math.min(firstHalfTime, 45);
        case 2: return 45;
        case 3:            
            return Math.min(secondHalfTime, 90);
        case 4: return 90;
        case 5: return match.shDate ? Math.min(secondHalfTime, 90) : Math.min(firstHalfTime, 45);
        case 6: return 90;
    }

    return "";
}

module.exports = { MatchStatusType, getCurrentMinute };