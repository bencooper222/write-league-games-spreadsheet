exports.season = seasonID => {
  return {
    0: 'PRESEASON 3',
    1: 'SEASON 3',
    2: 'PRESEASON 2014',
    3: 'SEASON 2014',
    4: 'PRESEASON 2015',
    5: 'SEASON 2015',
    6: 'PRESEASON 2016',
    7: 'SEASON 2016',
    8: 'PRESEASON 2017',
    9: 'SEASON 2017',
    10: 'PRESEASON 2018',
    11: 'SEASON 2018',
    12: 'PRESEASON 2019',
    13: 'SEASON 2019',
  }[seasonID];
};

exports.queue = queueID => {
  return {
    '0': {
      Map: 'Custom games',
      Description: '',
      Notes: '',
    },
    '2': {
      Map: "Summoner's Rift",
      Description: '5v5 Blind Pick games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 430',
    },
    '4': {
      Map: "Summoner's Rift",
      Description: '5v5 Ranked Solo games',
      Notes: 'Deprecated in favor of queueId 420',
    },
    '6': {
      Map: "Summoner's Rift",
      Description: '5v5 Ranked Premade games',
      Notes: 'Game mode deprecated',
    },
    '7': {
      Map: "Summoner's Rift",
      Description: 'Co-op vs AI games',
      Notes: 'Deprecated in favor of queueId 32 and 33',
    },
    '8': {
      Map: 'Twisted Treeline',
      Description: '3v3 Normal games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 460',
    },
    '9': {
      Map: 'Twisted Treeline',
      Description: '3v3 Ranked Flex games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 470',
    },
    '14': {
      Map: "Summoner's Rift",
      Description: '5v5 Draft Pick games',
      Notes: 'Deprecated in favor of queueId 400',
    },
    '16': {
      Map: 'Crystal Scar',
      Description: '5v5 Dominion Blind Pick games',
      Notes: 'Game mode deprecated',
    },
    '17': {
      Map: 'Crystal Scar',
      Description: '5v5 Dominion Draft Pick games',
      Notes: 'Game mode deprecated',
    },
    '25': {
      Map: 'Crystal Scar',
      Description: 'Dominion Co-op vs AI games',
      Notes: 'Game mode deprecated',
    },
    '31': {
      Map: "Summoner's Rift",
      Description: 'Co-op vs AI Intro Bot games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 830',
    },
    '32': {
      Map: "Summoner's Rift",
      Description: 'Co-op vs AI Beginner Bot games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 840',
    },
    '33': {
      Map: "Summoner's Rift",
      Description: 'Co-op vs AI Intermediate Bot games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 850',
    },
    '41': {
      Map: 'Twisted Treeline',
      Description: '3v3 Ranked Team games',
      Notes: 'Game mode deprecated',
    },
    '42': {
      Map: "Summoner's Rift",
      Description: '5v5 Ranked Team games',
      Notes: 'Game mode deprecated',
    },
    '52': {
      Map: 'Twisted Treeline',
      Description: 'Co-op vs AI games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 800',
    },
    '61': {
      Map: "Summoner's Rift",
      Description: '5v5 Team Builder games',
      Notes: 'Game mode deprecated',
    },
    '65': {
      Map: 'Howling Abyss',
      Description: '5v5 ARAM games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 450',
    },
    '67': {
      Map: 'Howling Abyss',
      Description: 'ARAM Co-op vs AI games',
      Notes: 'Game mode deprecated',
    },
    '70': {
      Map: "Summoner's Rift",
      Description: 'One for All games',
      Notes: 'Deprecated in patch 8.6 in favor of queueId 1020',
    },
    '72': {
      Map: 'Howling Abyss',
      Description: '1v1 Snowdown Showdown games',
      Notes: '',
    },
    '73': {
      Map: 'Howling Abyss',
      Description: '2v2 Snowdown Showdown games',
      Notes: '',
    },
    '75': {
      Map: "Summoner's Rift",
      Description: '6v6 Hexakill games',
      Notes: '',
    },
    '76': {
      Map: "Summoner's Rift",
      Description: 'Ultra Rapid Fire games',
      Notes: '',
    },
    '78': {
      Map: 'Howling Abyss',
      Description: 'One For All: Mirror Mode games',
      Notes: '',
    },
    '83': {
      Map: "Summoner's Rift",
      Description: 'Co-op vs AI Ultra Rapid Fire games',
      Notes: '',
    },
    '91': {
      Map: "Summoner's Rift",
      Description: 'Doom Bots Rank 1 games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 950',
    },
    '92': {
      Map: "Summoner's Rift",
      Description: 'Doom Bots Rank 2 games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 950',
    },
    '93': {
      Map: "Summoner's Rift",
      Description: 'Doom Bots Rank 5 games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 950',
    },
    '96': {
      Map: 'Crystal Scar',
      Description: 'Ascension games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 910',
    },
    '98': {
      Map: 'Twisted Treeline',
      Description: '6v6 Hexakill games',
      Notes: '',
    },
    '100': {
      Map: "Butcher's Bridge",
      Description: '5v5 ARAM games',
      Notes: '',
    },
    '300': {
      Map: 'Howling Abyss',
      Description: 'Legend of the Poro King games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 920',
    },
    '310': {
      Map: "Summoner's Rift",
      Description: 'Nemesis games',
      Notes: '',
    },
    '313': {
      Map: "Summoner's Rift",
      Description: 'Black Market Brawlers games',
      Notes: '',
    },
    '315': {
      Map: "Summoner's Rift",
      Description: 'Nexus Siege games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 940',
    },
    '317': {
      Map: 'Crystal Scar',
      Description: 'Definitely Not Dominion games',
      Notes: '',
    },
    '318': {
      Map: "Summoner's Rift",
      Description: 'ARURF games',
      Notes: 'Deprecated in patch 7.19 in favor of queueId 900',
    },
    '325': {
      Map: "Summoner's Rift",
      Description: 'All Random games',
      Notes: '',
    },
    '400': {
      Map: "Summoner's Rift",
      Description: '5v5 Draft Pick games',
      Notes: '',
    },
    '410': {
      Map: "Summoner's Rift",
      Description: '5v5 Ranked Dynamic games',
      Notes: 'Game mode deprecated in patch 6.22',
    },
    '420': {
      Map: "Summoner's Rift",
      Description: '5v5 Ranked Solo games',
      Notes: '',
    },
    '430': {
      Map: "Summoner's Rift",
      Description: '5v5 Blind Pick games',
      Notes: '',
    },
    '440': {
      Map: "Summoner's Rift",
      Description: '5v5 Ranked Flex games',
      Notes: '',
    },
    '450': {
      Map: 'Howling Abyss',
      Description: '5v5 ARAM games',
      Notes: '',
    },
    '460': {
      Map: 'Twisted Treeline',
      Description: '3v3 Blind Pick games',
      Notes: '',
    },
    '470': {
      Map: 'Twisted Treeline',
      Description: '3v3 Ranked Flex games',
      Notes: '',
    },
    '600': {
      Map: "Summoner's Rift",
      Description: 'Blood Hunt Assassin games',
      Notes: '',
    },
    '610': {
      Map: 'Cosmic Ruins',
      Description: 'Dark Star: Singularity games',
      Notes: '',
    },
    '700': {
      Map: "Summoner's Rift",
      Description: 'Clash games',
      Notes: '',
    },
    '800': {
      Map: 'Twisted Treeline',
      Description: 'Co-op vs. AI Intermediate Bot games',
      Notes: '',
    },
    '810': {
      Map: 'Twisted Treeline',
      Description: 'Co-op vs. AI Intro Bot games',
      Notes: '',
    },
    '820': {
      Map: 'Twisted Treeline',
      Description: 'Co-op vs. AI Beginner Bot games',
      Notes: '',
    },
    '830': {
      Map: "Summoner's Rift",
      Description: 'Co-op vs. AI Intro Bot games',
      Notes: '',
    },
    '840': {
      Map: "Summoner's Rift",
      Description: 'Co-op vs. AI Beginner Bot games',
      Notes: '',
    },
    '850': {
      Map: "Summoner's Rift",
      Description: 'Co-op vs. AI Intermediate Bot games',
      Notes: '',
    },
    '900': {
      Map: "Summoner's Rift",
      Description: 'ARURF games',
      Notes: '',
    },
    '910': {
      Map: 'Crystal Scar',
      Description: 'Ascension games',
      Notes: '',
    },
    '920': {
      Map: 'Howling Abyss',
      Description: 'Legend of the Poro King games',
      Notes: '',
    },
    '940': {
      Map: "Summoner's Rift",
      Description: 'Nexus Siege games',
      Notes: '',
    },
    '950': {
      Map: "Summoner's Rift",
      Description: 'Doom Bots Voting games',
      Notes: '',
    },
    '960': {
      Map: "Summoner's Rift",
      Description: 'Doom Bots Standard games',
      Notes: '',
    },
    '980': {
      Map: 'Valoran City Park',
      Description: 'Star Guardian Invasion: Normal games',
      Notes: '',
    },
    '990': {
      Map: 'Valoran City Park',
      Description: 'Star Guardian Invasion: Onslaught games',
      Notes: '',
    },
    '1000': {
      Map: 'Overcharge',
      Description: 'PROJECT: Hunters games',
      Notes: '',
    },
    '1010': {
      Map: "Summoner's Rift",
      Description: 'Snow ARURF games',
      Notes: '',
    },
    '1020': {
      Map: "Summoner's Rift",
      Description: 'One for All games',
      Notes: '',
    },
    '1030': {
      Map: 'Crash Site',
      Description: 'Odyssey Extraction: Intro games',
      Notes: '',
    },
    '1040': {
      Map: 'Crash Site',
      Description: 'Odyssey Extraction: Cadet games',
      Notes: '',
    },
    '1050': {
      Map: 'Crash Site',
      Description: 'Odyssey Extraction: Crewmember games',
      Notes: '',
    },
    '1060': {
      Map: 'Crash Site',
      Description: 'Odyssey Extraction: Captain games',
      Notes: '',
    },
    '1070': {
      Map: 'Crash Site',
      Description: 'Odyssey Extraction: Onslaught games',
      Notes: '',
    },
    '1200': {
      Map: 'Nexus Blitz',
      Description: 'Nexus Blitz games',
      Notes: '',
    },
    '1300': {
      Map: 'Lillia Map',
      Description: 'Nexus Blitz But With Lillia Shit',
    },

    '1400': {
      map: "Summoner's Rift",

      description: 'Ultimate Spellbook games',

      notes: null,
    },

    '2000': {
      map: "Summoner's Rift",

      description: 'Tutorial 1',

      notes: null,
    },

    '2010': {
      map: "Summoner's Rift",

      description: 'Tutorial 2',

      notes: null,
    },

    '2020': {
      map: "Summoner's Rift",

      description: 'Tutorial 3',

      notes: null,
    },
  }[queueID].Description;
};

exports.champMap = {
  '1': 'Annie',
  '2': 'Olaf',
  '3': 'Galio',
  '4': 'Twisted Fate',
  '5': 'Xin Zhao',
  '6': 'Urgot',
  '7': 'LeBlanc',
  '8': 'Vladimir',
  '9': 'Fiddlesticks',
  '10': 'Kayle',
  '11': 'Master Yi',
  '12': 'Alistar',
  '13': 'Ryze',
  '14': 'Sion',
  '15': 'Sivir',
  '16': 'Soraka',
  '17': 'Teemo',
  '18': 'Tristana',
  '19': 'Warwick',
  '20': 'Nunu & Willump',
  '21': 'Miss Fortune',
  '22': 'Ashe',
  '23': 'Tryndamere',
  '24': 'Jax',
  '25': 'Morgana',
  '26': 'Zilean',
  '27': 'Singed',
  '28': 'Evelynn',
  '29': 'Twitch',
  '30': 'Karthus',
  '31': "Cho'Gath",
  '32': 'Amumu',
  '33': 'Rammus',
  '34': 'Anivia',
  '35': 'Shaco',
  '36': 'Dr. Mundo',
  '37': 'Sona',
  '38': 'Kassadin',
  '39': 'Irelia',
  '40': 'Janna',
  '41': 'Gangplank',
  '42': 'Corki',
  '43': 'Karma',
  '44': 'Taric',
  '45': 'Veigar',
  '48': 'Trundle',
  '50': 'Swain',
  '51': 'Caitlyn',
  '53': 'Blitzcrank',
  '54': 'Malphite',
  '55': 'Katarina',
  '56': 'Nocturne',
  '57': 'Maokai',
  '58': 'Renekton',
  '59': 'Jarvan IV',
  '60': 'Elise',
  '61': 'Orianna',
  '62': 'Wukong',
  '63': 'Brand',
  '64': 'Lee Sin',
  '67': 'Vayne',
  '68': 'Rumble',
  '69': 'Cassiopeia',
  '72': 'Skarner',
  '74': 'Heimerdinger',
  '75': 'Nasus',
  '76': 'Nidalee',
  '77': 'Udyr',
  '78': 'Poppy',
  '79': 'Gragas',
  '80': 'Pantheon',
  '81': 'Ezreal',
  '82': 'Mordekaiser',
  '83': 'Yorick',
  '84': 'Akali',
  '85': 'Kennen',
  '86': 'Garen',
  '89': 'Leona',
  '90': 'Malzahar',
  '91': 'Talon',
  '92': 'Riven',
  '96': "Kog'Maw",
  '98': 'Shen',
  '99': 'Lux',
  '101': 'Xerath',
  '102': 'Shyvana',
  '103': 'Ahri',
  '104': 'Graves',
  '105': 'Fizz',
  '106': 'Volibear',
  '107': 'Rengar',
  '110': 'Varus',
  '111': 'Nautilus',
  '112': 'Viktor',
  '113': 'Sejuani',
  '114': 'Fiora',
  '115': 'Ziggs',
  '117': 'Lulu',
  '119': 'Draven',
  '120': 'Hecarim',
  '121': "Kha'Zix",
  '122': 'Darius',
  '126': 'Jayce',
  '127': 'Lissandra',
  '131': 'Diana',
  '133': 'Quinn',
  '134': 'Syndra',
  '136': 'Aurelion Sol',
  '141': 'Kayn',
  '142': 'Zoe',
  '143': 'Zyra',
  '145': "Kai'Sa",
  '150': 'Gnar',
  '154': 'Zac',
  '157': 'Yasuo',
  '161': "Vel'Koz",
  '163': 'Taliyah',
  '164': 'Camille',
  '201': 'Braum',
  '202': 'Jhin',
  '203': 'Kindred',
  '222': 'Jinx',
  '223': 'Tahm Kench',
  '236': 'Lucian',
  '238': 'Zed',
  '240': 'Kled',
  '245': 'Ekko',
  '254': 'Vi',
  '266': 'Aatrox',
  '267': 'Nami',
  '268': 'Azir',
  '412': 'Thresh',
  '420': 'Illaoi',
  '421': "Rek'Sai",
  '427': 'Ivern',
  '429': 'Kalista',
  '432': 'Bard',
  '497': 'Rakan',
  '498': 'Xayah',
  '516': 'Ornn',
  '517': 'Sylas',
  '518': 'Neeko',
  '555': 'Pyke',
  '523': 'Aphelios',
  '246': 'Qiyana',
  '235': 'Senna',
  '876': 'Lillia',
};

exports.champion = champID => {
  return exports.champMap[champID];
};

exports.summSpell = spellID => {
  return {
    '1': 'Cleanse',
    '3': 'Exhaust',
    '4': 'Flash',
    '5': 'Backtrack',
    '6': 'Ghost',
    '7': 'Heal',
    '11': 'Smite',
    '12': 'Teleport',
    '13': 'Clarity',
    '14': 'Ignite',
    '21': 'Barrier',
    '30': 'To the King!',
    '31': 'Poro Toss',
    '32': 'Mark',
    '33': 'Nexus Siege: Siege Weapon Slot',
    '34': 'Nexus Siege: Siege Weapon Slot',
    '35': 'Disabled Summoner Spells',
    '36': 'Disabled Summoner Spells',
    '39': 'Ultra (Rapidly Flung) Mark',
    '50': 'Resuscitate',
    '51': 'Ghost',
    '52': 'Warp',
  }[spellID];
};
