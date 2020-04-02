import actionsType from './actions.type';
import { emojis } from '../../utils/emojis';

export default Users = [
    {
        userId: 0,
        userName: 'idolago94',
        password: 'idolago94',
        email: 'idolago94@gmail.com',
        gender: 'male',
        profileImage: require('../../assets/idolago94/profile.jpg'),
        uploads: [0,1,2,3,4,5,48,49,50],
        following: [1,2],
        followers: [1,2],
        cash: 1256,
        hearts: 200,
        conversations: [1],
        keywords: ['man ', 'developer ', 'kiryat ono '],
        live: require('../../assets/idolago94/live.mp4')
    },
    {
        userId: 1,
        userName: 'shlomigamzo',
        password: 'shlomigamzo',
        email: 'shlomigamzo@gmail.com',
        gender: 'male',
        profileImage: require('../../assets/shlomigamzo/2.jpeg'),
        uploads: [6,7,8,9,10,11,51,52,53],
        following: [0,2],
        followers: [0,2],
        cash: 3212,
        hearts: 167,
        conversations: [0],
        keywords: ['man ', 'azor ', 'boxer ', 'dog trainer '],
        actions: [],
        live: require('../../assets/shlomigamzo/live.mp4')
    },
    {
        userId: 2,
        userName: '_eli7adi',
        password: '_eli7adi',
        email: '_eli7adi@gmail.com',
        gender: 'female',
        profileImage: require('../../assets/profile.jpg'),
        uploads: [12,13,14,15,16,17,45,46,47],
        following: [0,1],
        followers: [0,1],
        cash: 12345,
        hearts: 238,
        conversations: [0,1],
        keywords: ['model ', 'fashion ', 'woman ', 'blonde ', 'titz ', 'boobs ', 'model '],
        actions: []
    },
    {
        userId: 3,
        userName: 'megan_massacre',
        password: 'megan_massacre',
        email: 'megan_massacre@gmail.com',
        gender: 'female',
        profileImage: require('../../assets/megan_massacre/9.jpeg'),
        uploads: [18,19,20,21,22,23,42,43,44],
        following: [0,1,2],
        followers: [0,1,2],
        cash: 24965,
        hearts: 1267,
        conversations: [],
        story: [require('../../assets/megan_massacre/9.jpeg'), require('../../assets/megan_massacre/5.jpeg'), require('../../assets/megan_massacre/2.jpeg')],
        keywords: ['tattoo ', 'woman ', 'artist '],
        actions: [
            {
                type: actionsType.SEND_EMOJI,
                user: 1,
                emoji: emojis.KISS
            },
            {
                type: actionsType.START_FOLLOW,
                user: 4
            },
            {
                type: actionsType.GET_EMOJI,
                user: 0,
                emoji: emojis.ANGEL
            },
            {
                type: actionsType.GET_EMOJI,
                user: 1,
                emoji: emojis.CHICKEN
            },
            {
                type: actionsType.GET_EMOJI,
                user: 1,
                emoji: emojis.KISS
            },
            {
                type: actionsType.GET_EMOJI,
                user: 4,
                emoji: emojis.MONEY_BAG
            },
            {
                type: actionsType.GET_EMOJI,
                user: 5,
                emoji: emojis.ANGEL
            },
            {
                type: actionsType.GET_EMOJI,
                user: 0,
                emoji: emojis.CHICKEN
            }
        ]
    },
    {
        userId: 4,
        userName: 'zion_baruch',
        password: 'zion_baruch',
        email: 'zion_baruch@gmail.com',
        gender: 'male',
        profileImage: require('../../assets/zion_baruch/9.jpeg'),
        uploads: [24,25,26,27,28,29,30,31,32],
        following: [0,1,2,3,5],
        followers: [0,1,2,3,5],
        story: [
            require('../../assets/zion_baruch/4.jpeg'),
            require('../../assets/zion_baruch/8.jpeg'),
            require('../../assets/zion_baruch/1.jpeg'),
            require('../../assets/zion_baruch/6.jpeg')
        ],
        cash: 17466,
        hearts: 676,
        conversations: [],
        keywords: ['draw ', 'man ', 'artist '],
        actions: []
    },
    {
        userId: 5,
        userName: 'liron_shamli',
        password: 'liron_shamli',
        email: 'liron_shamli@gmail.com',
        gender: 'male',
        profileImage: require('../../assets/liron_shamli/8.jpeg'),
        uploads: [33,34,35,36,37,38,39,40,41],
        following: [0,1,2,3,4],
        followers: [0,1,2,3,4],
        cash: 63953,
        hearts: 1203,
        conversations: [],
        keywords: ['wood ', 'man ', 'artist '],
        actions: []
    }
]
