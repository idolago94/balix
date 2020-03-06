import Users from "./users";
import actionsType from "./actions.type";

export default userService = {
    getAllUsers: () => {
        return Users
    },
    getUserById: (id) => {
        return Users.find(user => user.userId == id)
    },
    getUserByUserName: (username) => {
        return Users.find(user => user.userName == username || user.email == username)
    },
    getUser15MostVolunteers: (userId) => {
        let userActions = Users.find(user => user.userId == userId).actions;
        let mostVolunteers = {};
        userActions.map((act) => {
            if(act.type == actionsType.GET_EMOJI) {
                if(!mostVolunteers[act.user]) {
                    mostVolunteers[act.user] = 0;
                }
                mostVolunteers[act.user] = mostVolunteers[act.user]+act.emoji.value;
            }
        });
        let sortVolunteers = [];
        let length = Object.keys(mostVolunteers).length;
        for(let i=0; i<length; i++) {
            let most = findBiggest(mostVolunteers)
            delete mostVolunteers[most.userId];
            most = {
                userDetails: Users.find(user => user.userId == most.userId),
                count: most.count
            };
            sortVolunteers.push(most);
        }
        return sortVolunteers;
    },

}

function findBiggest (obj) {
        let keysArray = Object.keys(obj);
        let biggest = {userId: keysArray[0], count: obj[keysArray[0]]};
        for(let i=1; i<keysArray.length; i++) {
            if(obj[keysArray[i]] > biggest.count) {
                biggest = {userId: keysArray[i], count: obj[keysArray[i]]};
            }
        }
        return biggest;
    }