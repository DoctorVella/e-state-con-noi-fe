const useTeamActions = () => {

    const buildTeams = (players, teamNames) => {
        let teamMap = new Map();
        teamNames.forEach(name => {
            teamMap.set(name,[]);
        });
        players.sort((a,b) => (a.age - b.age));
        let nameIndex = 0;
        players.forEach(p => {
            teamMap.get(teamNames[nameIndex]).push(p);
            nameIndex ++;
            if(nameIndex === teamNames.length) {
                nameIndex = 0;
            }
        })
        return teamMap;
    };

    return {
        buildTeams
    };
}

export default useTeamActions;