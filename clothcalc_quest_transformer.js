/* SELECT CONCAT(quest,':',data,',') x FROM west_beta.imported_quests WHERE number = 1 ORDER BY quest */
TWDB = window['TWDB'] || {};
TWDB.Q_oldQ_set = {};

(function () {
  for (var i in TWDB.Q_oldQ_set) {
    TWDB.Q_oldQ = TWDB.Q_oldQ_set;
    break;
  }
})();
TWDB.Q = {
  parent: TWDB,
  knownUnprocessed: {
    /* SELECT CONCAT('\t\t"',SUBSTR(q.quest_serie,4),'":[',GROUP_CONCAT(q.quest_id ORDER BY q.quest_id SEPARATOR ','),'],') FROM quest_serie_id q GROUP BY q.quest_serie */
    "01": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "02": [23, 24, 25, 26],
    "03": [120, 121, 122, 123],
    "04": [155],
    "05": [27, 28, 29, 30, 31, 32, 180],
    "06": [10, 11, 12, 13, 14, 15],
    "07": [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044],
    "08": [1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135],
    "09": [1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1240],
    "10": [1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1324, 1326, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1377, 1397, 1398, 1399],
    "11": [360, 361, 362, 363],
    "12": [460, 461, 462, 463, 464, 465, 500],
    "13": [140, 141, 142, 143],
    "14": [87, 88, 89, 90, 91],
    "15": [16, 17, 18, 19, 20, 21, 22],
    "16": [275, 276, 277, 278, 279],
    "17": [302, 303, 304],
    "18": [170, 171],
    "19": [190, 191],
    "20": [33, 34, 35, 36],
    "21": [370, 371, 372, 373],
    "22": [37, 38, 39, 40, 42, 43],
    "23": [150, 151, 152, 153],
    "24": [48, 49, 50, 51, 52, 53],
    "25": [80, 81, 82, 83],
    "26": [280, 281, 282, 283, 284],
    "27": [44, 45, 46, 47],
    "28": [291, 292, 293, 294, 295, 296],
    "29": [297, 298, 299, 300, 301],
    "30": [54, 55, 56, 57, 58],
    "31": [225, 226, 227],
    "32": [59, 60, 61, 62, 63, 64, 65],
    "33": [320, 321, 322, 323, 330, 331, 340, 341, 342, 343, 344, 345, 346, 347, 350, 351],
    "34": [380, 381, 387],
    "35": [70, 71, 72],
    "36": [99, 100, 101, 103, 104, 105],
    "37": [310, 311, 312, 313, 314, 315],
    "38": [203, 204, 205, 206],
    "39": [110, 111, 112, 113, 114, 115],
    "40": [210, 211, 212, 213, 214, 215],
    "41": [129, 130],
    "42": [285, 286, 287, 288, 289, 290],
    "43": [230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251],
    "44": [220, 221, 222, 223, 224],
    "45": [156, 157],
    "46": [159, 160, 161, 162, 163, 164, 165],
    "47": [200, 201],
    "48": [261, 262, 263],
    "49": [264, 265, 266, 267, 268, 269, 271, 272, 273, 274],
    "50": [390, 391, 392, 393, 400, 401, 402, 403, 404, 410, 420, 430],
    "51": [440, 441, 442, 443, 444, 445],
    "52": [480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494],
    "53": [470, 471],
    "54_a": [133565],
    "54_b": [139565],
    "55": [510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521],
    "56": [600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612],
    "57": [123480],
    "58": [620, 621, 622],
    "59": [43342, 43343, 43344, 43345],
    "60": [530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544],
    "61": [630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 660, 662, 663, 664, 665, 666],
    "62": [648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659],
    "63": [670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685],
    "64": [690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719],
    "65": [800, 801, 802, 803, 804, 805, 806, 807, 808],
    "66": [730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793],
    "67": [809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836],
    "68": [199070, 199071],
    "69": [837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849],
    "70": [43360, 43361, 43362, 43363],
    "71": [850],
    "72": [860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876],
    "73": [880, 881, 882, 883, 884, 885, 886],
    "74": [887, 888, 889, 890, 891, 892, 893, 894],
    "75": [895, 896, 897, 898, 899, 900, 901, 902],
    "76": [910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932],
    "77": [11020, 11021, 11022, 11023, 11024, 11025, 11026, 11027, 11028, 11029, 11030, 11031, 11032, 11033],
    "78": [960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971],
    "79": [1510, 1511, 1512, 1513, 1514, 1515, 1516, 1517, 1518, 1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1527, 1528, 1529, 1530, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1544, 1545, 1546, 1547, 1548],
    "80": [1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1647, 1648, 1649, 1650],
    "86": [20360, 20361, 20362, 20363],
    "87": [20460, 20461, 20462, 20463, 20464, 20465, 20500],
    "88": [2043360, 2043361, 2043362, 2043363],
    "89": [10050, 10051, 10052, 10053, 10054, 10055, 10056, 10057, 10058, 10059, 10060, 10061, 10062, 10063, 10064, 10065, 10066, 10067, 10068, 10069, 10070, 10071, 10072, 10073, 10074, 10075, 10076, 10077, 10078, 10079, 10080, 10081, 10082, 10083, 10084, 10085, 10086, 10087, 10088, 10089, 10090, 10091, 10092, 10093, 10094, 10095, 10096, 10097, 10098, 10099, 10100, 10101, 10102, 10103, 10104, 10105, 10106, 10107, 10108, 10109, 10110, 10111, 10112, 10113, 10114, 10115, 10116, 10117, 10118, 10119, 10120, 10121, 10122, 10123, 10124, 10125, 10126, 10127, 10128, 10129, 10130, 10131, 10132, 10133, 10150, 10151, 10152, 10153],
    "90": [2043364, 2043365, 2043366, 2043367, 2043368, 2043369, 2043370, 2043371, 2043372, 2043373, 2043374, 2043375],
    "91": [10020, 10021, 10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029, 10030, 10031, 10032, 10033, 10034, 10035, 10036, 10037, 10038, 10039],
    "92": [2043342],
    "93": [20620, 20621, 20622],
    "94": [20005, 20006, 20007, 20008, 20268, 20269, 20271, 20272, 20273, 20274],
    "95": [20000, 20001, 20002],
    "96": [20600, 20601, 20602, 20603, 20604, 20605, 20606, 20607, 20608],
    "97": [11000, 11001, 11002],
    "98": [10000, 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 10009, 10010, 10011, 10012, 10013, 10014, 10015, 10016]

  },
  itemOverrideReqRaw: [{
      "quest": "693",
      "name": "Bow",
      "item": "1953"
    }, {
      "quest": "647",
      "name": "Sheriff's star",
      "item": "1849"
    }, {
      "quest": "660",
      "name": "Elephant",
      "item": "1841"
    }, {
      "quest": "1318",
      "name": "Uniform",
      "item": "362"
    }, {
      "quest": "1333",
      "name": "Uniform",
      "item": "362"
    }, {
      "quest": "665",
      "name": "Elephant",
      "item": "1841"
    }, {
      "quest": "10032",
      "name": "Sheriff's star",
      "item": "1817"
    }
  ],
  employerOverrideReqRaw: [{
      "quest": "666",
      "name": "The travelling circus",
      "employer": "circus2"
    }, {
      "quest": "1311",
      "name": "Thomas Herson",
      "employer": "thomas3"
    }, {
      "quest": "20402",
      "name": "East Point",
      "employer": "east2_repeat"
    }, {
      "quest": "20403",
      "name": "West Point",
      "employer": "west2_repeat"
    }
  ],
  questOverrideReqRaw: [
  ],
  hiddenRewards: {
    483: ['#item# 1772', '#item# 1711'],
    239: ['#item# 1715'],
    1122: ['#item# 366'],
    1216: ['#item# 367']
  },
  requirementProcessors: [/* ran in (this) context */

    [/^#(?:inventory|wear)_changed (\d+) (\d+)# (Equip )?[a-zA-Z0-9 \.\*\-'"\(\),]+ \d+\/\d+$/, function (m, quest) { /* single item */
        //                           1     2        3
        return m[1] * 1 > 0 /* I don't want fists here */ && m[2] * 1 > 0
         ? this.requirement({
          stage: 'finish',
          type: 'item_' + (m[3] ? 'eqp' : 'inv'),
          s: 'item_' + m[1] * 1,
          n: m[2] * 1
        }) : false;
      }
    ],

    [/^#task-finish-job (\d+) (\d+)# ([a-zA-Z \*\-']+) \(\d+ ?\/ ?(\d+)\)$/, function (m, quest) { /* job - tasks */
        //                1     2            3                      4
        var job = this.getJobByName(m[3]);
        return job && m[4] * 1 > 0 && m[1] == job.id && m[2] == m[4] ? this.requirement({
          stage: 'finish',
          type: 'job_tasks',
          s: 'job_' + job.id,
          n: m[4] * 1
        }) : false;
      }
    ],

    [/^#task-finish-job (\d+) 0# ([a-zA-Z \*\-']+) \((?:(\d+) hours?)? ?(?:(\d+) minutes?)? ?(?:(\d+) seconds?)?\)$/, function (m, quest) { /* job - tasks */
        //                1             2                 3                  4                    5
        var job = this.getJobByName(m[2]);
        return job && m[1] == job.id && (m[3] * 1 || m[4] * 1 || m[5] * 1) ? this.requirement({
          stage: 'finish',
          type: 'job_time',
          s: 'job_' + job.id,
          n: (m[3] * 3600 || 0) + (m[4] * 60 || 0) + (m[5] * 1 || 0)
        }) : false;
      }
    ],

    [/^(Defeat|Shoot|Lose against) ([a-zA-Z \-'\.]+)$/, function (m, quest) { /* npc duel */
        var npc = this.getMappedNPC(quest);
        if (!npc || npc.name != m[2])
          this.admin.append('log', 'Error mapping NPC requirement in quest id ' + quest + ': ' + m[2] + ' vs ' + (npc && npc.name) + '\n');
        return npc && npc.name == m[2] ? this.requirement({
          stage: 'finish',
          type: 'duel_' + {
            "Defeat": "win",
            "Shoot": "koma",
            "Lose against": "lose"
          }
          [m[1]],
          s: 'npc_' + npc.id,
          n: null
        }) : false;
      }
    ],

    [/^Reached level ([0-9]+)$/, function (m, quest) { /* min. level */
        return m[1] * 1 > 0 ? this.requirement({
          stage: 'finish',
          type: 'level',
          s: '',
          n: m[1] * 1
        }) : false;
      }
    ],

    [/^#char_skills_changed ([a-z_]+) (\d+)# ([a-zA-Z ]+) at (\d+) \(with bonus\)$/, function (m, quest) { /* skill */
        //                     1       2          3           4
        var skill = this.getSkillByName(m[3]);
        return skill && m[4] * 1 > 0 && m[1] == skill && m[2] == m[4] ? this.requirement({
          stage: 'finish',
          type: 'skill',
          s: skill,
          n: m[4] * 1
        }) : false;
      }
    ],

    [/^\$ ([0-9]+)$/, function (m, quest) { /* money $ */
        return m[1] * 1 > 0 ? this.requirement({
          stage: 'finish',
          type: 'dollar',
          s: '',
          n: m[1] * 1
        }) : false;
      }
    ],

    [/^(After accepting the|You have to finish) quest ([a-zA-Z ':\(\)\.,!\?]+) (?:you must wait|in) (\d+) hours\.$/, function (m, quest) { /* employer */
        var thatQuest = this.getQuestByName(m[2]);
        if (this.questOverrideReq[quest] && this.questOverrideReq[quest][m[1]] && $.inArray(this.questOverrideReq[quest][m[1]], thatQuest))
          if (this.quests[this.questOverrideReq[quest][m[1]]])
            thatQuest = [{
                id: this.questOverrideReq[quest][m[1]],
                link: this.quests[this.questOverrideReq[quest][m[1]]]
              }
            ];
          else
            this.admin.append('log', 'Invalid quest requirement override id ' + this.employerOverrideReq[quest][m[1]] + ' in quest ' + quest + '\n');
        if (2043364 <= quest && quest <= 2043375) {
          var CType = m[2].match(/(Apprentice)?(Journeyman)?(Master)? \(.+\)/);
          CType = CType[1] ? 0 : (CType[2] ? 4 : (CType[3] ? 8 : NaN));
          var CId = 2043364 + (quest - 2043364) % 4 + CType;
          thatQuest = [{
              id: CId,
              link: this.quests[CId]
            }
          ];
        }
        if (thatQuest && thatQuest.length != 1) {
          var suitable = null;
          for (var i = 0; i < thatQuest.length; i++)
            if (thatQuest[i].id == quest)
              suitable = thatQuest[i];
          if (suitable)
            thatQuest = [suitable];
          else
            this.admin.append('log', 'Quest name requirement conflict in ' + this.quests[quest].t + ': '
              +JSON.stringify({
                quest: quest,
                name: m[2],
                thatQuest: $.map(thatQuest, function (e) {
                  return e.id;
                }).join('/')
              })
               + '\n');
        }
        return thatQuest && thatQuest.length == 1 && m[3] * 1 > 0 ? this.requirement({
          stage: 'access',
          type: 'wait' + (m[1] == 'After accepting' ? '' : '_timed_do' + (quest == 923 ? 'nt' : '')),
          s: 'questid_' + thatQuest[0].id,
          n: m[3] * 1
        }) : false;
      }
    ],

    [/^#task-finish-walk undefined (\d+)# Go to ([a-zA-Z '\.]+)$/, function (m, quest) { /* employer */
        //                           1                 2
        var employer = this.getEmployerByName(m[2]);
        if (this.employerOverrideReq[quest] && this.employerOverrideReq[quest][m[2]] && $.inArray(this.employerOverrideReq[quest][m[2]], employer))
          if (this.employers[this.employerOverrideReq[quest][m[2]]])
            employer = [this.employers[this.employerOverrideReq[quest][m[2]]]];
          else
            this.admin.append('log', 'Invalid employer requirement override key ' + this.employerOverrideReq[quest][m[2]] + ' in quest ' + quest + '\n');
        if (employer && employer.length != 1) {
          var suitable = null;
          for (var i = 0; i < employer.length; i++)
            if ((employer[i].activate || -1) < quest && quest <= (employer[i].deactivate || 1e12))
              if (!suitable)
                suitable = employer[i];
              else {
                suitable = null;
                break;
              }
          if (suitable)
            employer = [suitable];
          else
            this.admin.append('log', 'Employer name requirement conflict in ' + this.quests[quest].t + ': '
              +JSON.stringify({
                quest: quest,
                name: m[2],
                employer: employer
              })
               + '\n');
        }
        return employer && employer.length == 1 ? this.requirement({
          stage: 'finish',
          type: 'place',
          s: 'employer_' + employer[0].key,
          n: null
        }) : false;
      }
    ],

    [/^(Equip )?([a-zA-Z0-9 \.\*\-'"\(\),]+) \d+\/(\d+)(?: or (?:Equip )?([a-zA-Z0-9 \.\*\-'"\(\),]+) \d+\/(\d+))?$/, function (m, quest) { /* item */
        var that = this;
        function findItem(name) {
          if (!name || name == "Fist")
            return false;
          var item = that.getItemByName(name);
          if (that.itemOverrideReq[quest] && that.itemOverrideReq[quest][name] && $.inArray(that.itemOverrideReq[quest][name], item))
            if (ItemManager.get(that.itemOverrideReq[quest][name]))
              item = [ItemManager.get(that.itemOverrideReq[quest][name])];
            else
              that.admin.append('log', 'Invalid item requirement override id ' + that.itemOverrideReq[quest][name] + ' in quest ' + quest + '\n');
          if (item && item.length != 1)
            that.admin.append('log', 'Item name conflict in ' + that.quests[quest].t + ': '
              +JSON.stringify({
                quest: quest,
                name: name,
                item: $.map(item, function (e) {
                  return e.item_id;
                }).join('/')
              })
               + '\n');
          return item ? $.map(item, function (e) {
            return {
              item_id: e.item_id,
              'short': (e.item_id != 1706 ? e['short'] : 'letter1')
            };
          }) : item;
        }
        var item = findItem(m[2]),
        item2 = findItem(m[4]);
        return item && item.length == 1 && m[3] * 1 > 0 &&
        (!m[4] || (item2 && item2.length == 1 && m[5] * 1 > 0))
         ? this.requirement({
          stage: 'finish',
          type: 'item_' + (m[1] ? 'eqp' : 'inv'),
          s: 'item_' + item[0].item_id,
          n: m[3] * 1,
          option: (m[4] ? 1 : false)
        }, (item2 ? {
            stage: 'finish',
            type: 'item_' + (m[1] ? 'eqp' : 'inv'),
            s: 'item_' + item2[0].item_id,
            n: m[5] * 1,
            option: 2
          }
             : null)) : false;
      }
    ],

    [/^(?:(Resolve|Accept): ([a-zA-Z ':\(\)\.,!\?-]+)(?: or )?)+$/, function (m, quest) { /* quest */
        return {}; /* ## to disable it ## */
        var thatQuest = this.getQuestByName(m[1]);
        if (thatQuest && thatQuest.length != 1)
          this.admin.append('log', 'Quest name requirement conflict in ' + this.quests[quest].t + ': '
            +JSON.stringify({
              quest: quest,
              name: m[1],
              thatQuest: thatQuest.id
            })
             + '\n');
        return thatQuest && thatQuest.length == 1 ? this.requirement({
          stage: 'decise',
          type: 'quest_fin_to_fin',
          s: 'questid_' + thatQuest[0].id,
          n: this.findSerie(this.quests[thatQuest[0].id], thatQuest[0].id) * 1
        }) : false;
      }
    ],

    [/^#wear_changed 0 1# Equip Fist 1\/1$/, function (m, quest) { /* no weapon */
        return true ? this.requirement({
          stage: 'access',
          type: 'special',
          s: 'no_weapon',
          n: null
        }) : false;
      }
    ],

    [/^Confirm E-Mail address$/, function (m, quest) { /* confirm email $ */
        return true ? this.requirement({
          stage: 'finish',
          type: 'special',
          s: 'confirm_email',
          n: null
        }) : false;
      }
    ],

    [/^Gone to pray: 1\/1$/, function (m, quest) { /* pray $ */
        return true ? this.requirement({
          stage: 'finish',
          type: 'special',
          s: 'pray',
          n: null
        }) : false;
      }
    ],

    [/^This quest can only be accepted between (\d\d:\d\d) and (\d\d:\d\d) o'clock\.$/, function (m, quest) { /* time $ */
        return true ?
        this.requirement({
          stage: 'accept',
          type: 'time',
          s: m[1] + ' - ' + m[2],
          n: null
        })
         : false;
      }
    ],

    [/^Amount deposited into a foreign bank: 25\/(25)$/, function (m, quest) { /* quest_foreign_deposits $ */
        return m[1] * 1 > 0 ? this.requirement({
          stage: 'finish',
          type: 'special',
          s: 'quest_foreign_deposits',
          n: m[2] * 1
        }) : false;
      }
    ],

    [/^Invite friends via email: \d+\/(\d+)$/, function (m, quest) { /* quest_foreign_deposits $ */
        return m[1] * 1 > 0 ? this.requirement({
          stage: 'finish',
          type: 'special',
          s: 'invite_friends_via_email',
          n: m[2] * 1
        }) : false;
      }
    ],

    [/^You can complete this quest on a ([a-zA-Z]+)\.$/, function (m, quest) { /* day */
        var day = {
          'Monday': 'monday',
          'Tuesday': 'tuesday',
          'Wednessday': 'wednessday',
          'Thursday': 'thursday',
          'Friday': 'friday',
          'Saturday': 'saturday',
          'Sunday': 'sunday'
        }
        [m[1]];
        return day ? this.requirement({
          stage: 'finish',
          type: 'day',
          s: day,
          n: null
        }) : false;
      }
    ],

    [/^Selling "Dust rag"!$/, function (m, quest) { /* merchant_trade_greenhorn_neck $ */
        return true ? this.requirement({
          stage: 'finish',
          type: 'special',
          s: 'merchant_trade_greenhorn_neck',
          n: null
        }) : false;
      }
    ],

    [/Listen to Maya's story\./, function (m, quest) { /* listen to a story - nothing */
        return {};
      }
    ]
  ],

  rewardProcessors: [/* ran in (this) context */
    [/^#reward_dollar# (\d+) Dollars?/, function (m, quest) { /* dollar (money) */
        return m[1] * 1 > 0 || m[1] === "0" ? this.requirement({
          stage: 'reward',
          type: 'dollar',
          s: '',
          n: m[1] * 1
        }) : false;
      }
    ],

    [/^#item# (\d+)$/, function (m, quest) { /* ONE piece of an item */
        return (m[1] * 1 > 0 || m[1] === "0") && ItemManager.get(m[1] * 1) ? this.requirement({
          stage: 'reward',
          type: 'item',
          s: 'item_' + m[1] * 1,
          n: 1
        }) : false;
      }
    ],

    [/^#reward_skillpoint# (\d+)(?: Skill points?)?$/, function (m, quest) { /* free skill */
        return m[1] * 1 > 0 ? this.requirement({
          stage: 'reward',
          type: 'freeskill',
          s: 'skill',
          n: m[1] * 1
        }) : false;
      }
    ],

    [/^#reward_(?:skill|attribute)# (\d+) \d+ (skill|attribute) points? towards ([a-zA-Z ]+)$/, function (m, quest) { /* skill */
        var skill = this.getSkillByName(m[3]);
        return skill && m[1] * 1 > 0 ? this.requirement({
          stage: 'reward',
          type: 'skill',
          s: skill,
          n: m[1] * 1
        }) : false;
      }
    ],

    [/^#reward_exp# (\d+) Experience points?$/, function (m, quest) { /* experience */
        return m[1] * 1 > 0 || m[1] === "0" ? this.requirement({
          stage: 'reward',
          type: 'exp',
          s: '',
          n: m[1] * 1
        }) : false;
      }
    ],

    [/^#reward_bond# (\d+) Bonds?$/, function (m, quest) { /* bonds */
        return m[1] * 1 > 0 ? this.requirement({
          stage: 'reward',
          type: 'bonds',
          s: '',
          n: m[1] * 1
        }) : false;
      }
    ],

    [/^#reward_pabonus# (\d+) days? \d+ days? premium "([a-zA-Z ]+)"$/, function (m, quest) { /* premium */
        var premium = {
          "Automation": 'automatisation',
          "Character bonus": 'character_bonus',
          "Higher income": 'higher_income',
          "More energy": 'more_energy'
        }
        [m[2]];
        return premium && m[1] * 1 > 0 ? this.requirement({
          stage: 'reward',
          type: 'premium',
          s: premium,
          n: m[1] * 1
        }) : false;
      }
    ],

    [/^#reward_title# ([a-zA-Z ]+) $/, function (m, quest) { /* title */
        var title = {
          "Rodeo Champion": 'rodeochampion',
          "Marshall": 'marshall'
        }
        [m[1]];
        return title ? this.requirement({
          stage: 'reward',
          type: 'special',
          s: 'title_' + title,
          n: null
        }) : false;
      }
    ],

    [/^#reward_reskill# aim,dodge,shot,appearance,tactic,tough,punch,reflex The following skill points will be reimbursed to you: Aiming, Dodging, Shooting, Appearance, Tactics, Toughness, Vigor, Reflex$/, function (m, quest) { /* reimbursement */
        return true ? this.requirement({
          stage: 'reward',
          type: 'special',
          s: 'quest_reward_reimburse',
          n: null
        }) : false;
      }
    ]
  ],

  lang: null,
  quests: {},
  processed: {},
  duelNPCs: {},
  employers: {},

  config: {
    useOldQuestBookData: true,
    useOldEmployersData: true,
    useOldItemsData: true,
    displayPreparationConflictWarnings: false,
    overrideLanguage: 'eng',

    exportedRequirements: "job_tasks,job_time,dollar,employer,duel_win,duel_lose,duel_koma,level",
    exportedRewards: "dollar,exp,bonds,freeskill,skill,premium,special"
  },

  /* temporary data/cache */
  known: {},
  newSeriesByName: {},
  jobsByName: {},
  skillsByName: {},
  itemsByName: {},
  itemOverrideReq: {},
  employersByName: {},
  employerOverrideReq: {},
  questsByName: {},
  questOverrideReq: {},
  mappedNPC: {},
  tasks: {},
  alreadyUsedHiddenRewards: {},

  start: function () {
    this.admin.parent = this;
    this.lang = this.config.overrideLanguage || prompt('Language key?');
    this.admin.add('log', 'Log');
    this.admin.append('log', 'Quest processing script starts \n\n');

    this.queueTasks([
        'KnownSeries',
        'Jobs',
        'Skills',
        'Items',
        'Employers',
        'QuestData'
      ], this.process);
  },

  process: function () {
    this.admin.append('log', 'Preparation complete.\n\nProcessing quests (' + this.getPropertyList(this.quests).length + ')... \n');

    for (var id in this.quests)
      this.processed[id] = this.processQuest(this.quests[id], id);

    this.admin.append('log', 'Quests processing finished!\nIf you have no warning, you may click one of the tabs to get the output.');
    this.admin.add('employers', "Employers", this.outputEmployers);
    this.admin.add('npcs', "NPCs", this.outputNPCs);
    this.admin.add('requirements', "Job requirements", this.outputRequirements);
    this.admin.add('rewards', "Job rewards", this.outputRewards);
    this.saveOldData();
  },
  processQuest: function (q, id) {
    return {
      quest_serie: this.findSerie(q, id),
      quest_id: id,
      icon: q.e,
      requirements: this.getRequirements(q, id),
      rewards: this.getRewards(q, id)
    };
  },

  outputEmployers: function () {
    this.admin.clear('employers');
    var that = this;
    this.admin.append('employers', '/* Employers SQL data */\n\n');

    this.admin.append('employers', this.admin.buildInsertSQL(
        'employers', {
        key: 3,
        activate: 0,
        deactivate: 0,
        x: 0,
        y: 0
      },
        $.map(this.employers, function (e) {
          return $.extend(e, {
            x: e.pos.x,
            y: e.pos.y
          });
        })));

    this.admin.append('employers', '\n\n\n' + this.admin.buildInsertUpdateSQL(
        'west.translate', {
        text_id: 3,
        type: 1,
        eng: 1
      },
        $.map(this.employers, function (e) {
          var t = {
            text_id: 'employer_' + e.key,
            type: 'employer'
          };
          t[that.lang] = e.name;
          return t;
        })));
  },

  outputNPCs: function () {
    this.admin.clear('npcs');
    var that = this;
    this.admin.append('npcs', '/* NPCs SQL data */\n\n');

    this.admin.append('npcs', '\n\n\n' + this.admin.buildInsertUpdateSQL(
        'west.translate', {
        text_id: 3,
        type: 1,
        eng: 1
      },
        $.map(this.duelNPCs, function (e) {
          var t = {
            text_id: 'npc_' + e.id,
            type: 'npc'
          };
          t[that.lang] = e.name;
          return t;
        })));
  },

  outputRequirements: function () {
    this.admin.clear('requirements');
    var that = this;
    var set = this.config.exportedRequirements.split(',');
    this.admin.append('requirements', '/* Requirements SQL data */\n\n');

    function goodOne(r) {
      return !!(set.indexOf(r.type) + 1);
    }

    this.admin.append('requirements', this.admin.buildDeleteSQL(
        'quest_data', {
        id: 2,
        stage: 1
      },
        that.collect(that.processed, function (q) {
          return $.map(q.requirements,
            function (r) {
            return goodOne(r) ? r : null;
          });
        }), null,
        function () {
        return "type IN ('" + set.join("','") + "')";
      }));
    this.admin.append('requirements', '\n\n\n' + this.admin.buildInsertSQL(
        'quest_data', {
        id: 2,
        stage: 1,
        option: 0,
        type: 1,
        s: 1,
        n: 0
      },
        that.collect(that.processed, function (q) {
          return $.map(q.requirements,
            function (r) {
            return goodOne(r) ? r : null;
          });
        })));
  },

  outputRewards: function () {
    this.admin.clear('rewards');
    var that = this;
    var set = this.config.exportedRewards.split(',');
    this.admin.append('rewards', '/* Rewards SQL data */\n\n');

    function goodOne(r) {
      return !!(set.indexOf(r.type) + 1);
    }

    //this.admin.append('rewards',"DELETE FROM quest_data WHERE stage = 'reward' AND (type = 'medal' OR type = 'item_opt' OR type = 'skill_opt');");
    this.admin.append('rewards', '\n\n' + this.admin.buildDeleteSQL(
        'quest_data', {
        id: 0,
        stage: 1
      },
        that.collect(that.processed, function (q) {
          return $.map(q.rewards,
            function (r) {
            return goodOne(r) ? r : null;
          });
        }), null,
        function () {
        return "type IN ('" + set.join("','") + "')";
      }));
    this.admin.append('rewards', '\n\n\n' + this.admin.buildInsertSQL(
        'quest_data', {
        id: 0,
        stage: 1,
        option: 0,
        type: 1,
        s: 1,
        n: 0
      },
        that.collect(that.processed, function (q) {
          return $.map(q.rewards,
            function (r) {
            return goodOne(r) ? r : null;
          });
        })));

  },

  getRequirements: function (q, id) {
    var r = [];
    this.addDuelNPC(q.d, id);
    for (var i = 0; i < q.r.length; i++)
      for (var j = 0, res = this.processRequirement(q.r[i], id) || []; j < res.length; j++)
        r.push($.extend(res[j], {
            id: id * 1
          }));
    return r;
  },
  getRewards: function (q, id) {
    var w = [],
    option = 1;
    for (var i = 0; i < q.w.length; i++)
      for (var j = 0, res = this.processReward(q.w[i], id) || []; j < res.length; j++)
        w.push($.extend(res[j], {
            id: id
          }));
    for (var o in q.o) {
      for (var i = 0; i < q.o[o].length; i++)
        for (var j = 0, res = this.processReward(q.o[o][i], id) || []; j < res.length; j++)
          if (res[j].option == 0)
            w.push($.extend(res[j], {
                option: option,
                id: id * 1
              }));
          else
            this.admin.append('log', 'Unexpected reward option at quest id ' + id + '\n');
      option++;
    }
    return w;
  },

  processRequirement: function (r, id) {
    var info =
      (r.jsInfo ? "#" + r.jsInfo.type + " " + r.jsInfo.id + " " + (r.jsInfo.count || r.jsInfo.value || 0) + "# " : '') +
    r.info;
    var matches = 0,
    lastProcessed = null;
    for (var i = 0; i < this.requirementProcessors.length; i++) {
      var rp = this.requirementProcessors[i],
      m = null,
      p = null;
      if ((m = info.match(rp[0])) && (p = rp[1].call(this, m, id))) {
        matches++;
        lastProcessed = p;
      }
    }
    if (matches < 1)
      this.admin.append('log', 'Unmatched requirement in quest id ' + id + ': ' + info + '\n');
    else if (matches > 1)
      this.admin.append('log', 'Multiple matches on requirement in quest id ' + id + ': ' + info + '\n');
    else
      return lastProcessed;
  },
  requirement: function () {
    var ret = [];
    for (var i = 0; i < arguments.length; i++)
      if (arguments[i]) {
        if (!arguments[i].option)
          arguments[i].option = 0;
        ret.push(arguments[i]);
      }
    return ret;
  },

  processReward: function (w, id) {
    if (w.hidden) {
      var hw = this.hiddenReward(id);
      if (!hw) {
        this.admin.append('log', 'Non-listed hidden reward in quest id ' + id + '\n');
        return [];
      } else
        w.info = hw;
    }
    var info = (typeof(w.info) == "string" ? w.info :
      (w.isItem ? "#item# " + w.info : "#" + w.info.css + "# " + (w.info.text || w.info.val || 0) + ' ' + (w.info.popup_text || '')))
     + (w.jsInfo ? " #" + w.jsInfo.type + " " + w.jsInfo.id + " " + w.jsInfo.count + "#" : '');
    var matches = 0,
    lastProcessed = null;
    for (var i = 0; i < this.rewardProcessors.length; i++) {
      var wp = this.rewardProcessors[i],
      m = null,
      p = null;
      if ((m = info.match(wp[0])) && (p = wp[1].call(this, m, id))) {
        matches++;
        lastProcessed = p;
      }
    }
    if (matches < 1)
      this.admin.append('log', 'Unmatched reward in quest id ' + id + ': ' + info + '\n');
    else if (matches > 1)
      this.admin.append('log', 'Multiple matches on reward in quest id ' + id + ': ' + info + '\n');
    else
      return lastProcessed;
  },
  reward: function () {
    var ret = [];
    for (var i = 0; i < arguments.length; i++)
      if (arguments[i]) {
        if (!arguments[i].option)
          arguments[i].option = 0;
        ret.push(arguments[i]);
      }
    return ret;
  },
  hiddenReward: function (id) {
    var u = this.alreadyUsedHiddenRewards,
    i = (u[id] = (u[id] + 1 || 0));
    return (this.hiddenRewards[id] || false) && (this.hiddenRewards[id][i] || false);
  },

  queueTasks: function (names, callback) {
    this.tasks = {};
    var that = this;
    for (var i = 0; i < names.length; i++)
      this.tasks[names[i]] = false;
    this.admin.append('log', 'Starting preparation tasks... \n');
    for (var task in this.tasks)
      (function (thisTask) {
        that['prepare' + thisTask](function () {
          that.tasks[thisTask] = true;
          that.admin.append('log', 'Task prepare' + thisTask + ' has finished. \n');
          var allDone = true;
          for (var task in that.tasks)
            allDone &= that.tasks[task];
          if (allDone)
            callback.call(that);
        });
      })(task);
  },

  prepareKnownSeries: function (callback) {
    var that = this;
    $.each(this.knownUnprocessed, function (qs, l) {
      for (var i = 0; i < l.length; i++)
        that.known[l[i]] = qs;
    });
    callback();
  },

  prepareJobs: function (callback) {
    for (var id = 0, job; id < 200; id++)
      if (job = JobList.getJobById(id))
        this.jobsByName[job.name] = job;
    callback();
  },
  getJobByName: function (name) {
    return this.jobsByName[name] || false;
  },

  prepareSkills: function (callback) {
    for (var key in CharacterSkills.skills)
      this.skillsByName[CharacterSkills.skills[key].name] = key;
    for (var key in CharacterSkills.attributes)
      this.skillsByName[CharacterSkills.attributes[key].name] = key;
    callback();
  },
  getSkillByName: function (name) {
    return this.skillsByName[name] || false;
  },

  prepareItems: function (callback) {
    var that = this;
    function processItems(resp) {
      that.parent.Q_oldI = resp;

      $.each(resp, function (i, item) {
        (that.itemsByName[item.name] = that.itemsByName[item.name] || []).push(item);
      });

      if (that.config.displayPreparationConflictWarnings)
        for (var name in that.itemsByName)
          if (that.itemsByName[name].length > 1)
            that.admin.append('log', '# Item name conflict: ' + name + ', ids: '
              +JSON.stringify($.map(that.itemsByName[name], function (e) {
                  return e.item_id
                })) + '\n');
      that.makeItemOverrideReq(callback);
    }
    if (this.config.useOldItemsData && this.parent && this.parent.Q_oldI && !this.isEmpty(this.parent.Q_oldI)) {
      this.admin.append('log', '> Old item data was found and will be used. \n');
      processItems(this.parent.Q_oldI);
      return;
    } else
      Ajax.gameServiceRequest('storage', '',
        JSON.stringify({
          identifier: 'item',
          method: 'all',
          packet: {}
        }), processItems);
  },
  getItemByName: function (name) {
    return this.itemsByName[name] || false;
  },
  makeItemOverrideReq: function (callback) {
    for (var i = 0; i < this.itemOverrideReqRaw.length; i++) {
      var over = this.itemOverrideReqRaw[i],
      t_over = this.itemOverrideReq;
      t_over[over.quest * 1] = t_over[over.quest * 1] || {};
      t_over[over.quest * 1][over.name] = over.item * 1;
    }
    callback();
  },

  prepareEmployers: function (callback) {
    var that = this;
    function makeByName() {
      for (var key in that.employers) {
        var employer = that.employers[key];
        (that.employersByName[employer.name] = that.employersByName[employer.name] || []).push(employer);
      }
      if (that.config.displayPreparationConflictWarnings)
        for (var name in that.employersByName)
          if (that.employersByName[name].length > 1)
            that.admin.append('log', '# Employer name conflict: ' + name + ', keys: '
              +JSON.stringify($.map(that.employersByName[name], function (e) {
                  return e.key
                })) + ' \n');
      that.makeEmployerOverrideReq(callback);
    }

    if (this.config.useOldEmployersData && this.parent && this.parent.Q_oldE && !this.isEmpty(this.parent.Q_oldE)) {
      this.admin.append('log', '> Old employer data was found and will be used. \n');
      this.employers = this.parent.Q_oldE;
      makeByName();
      return;
    } else
      this.getEmployerData(makeByName);
  },
  getEmployerByName: function (name) {
    return this.employersByName[name] || false;
  },
  getEmployerData: function (callback) {
    var req = 0,
    com = 0,
    that = this;
    this.employers = {};
    this.admin.append('log', '> Getting employer data (ASYNC)... \n');

    for (var x = 0; x <= 181; x += 10)
      for (var y = 0; y <= 79; y += 10)
        req++;
    for (var x = 0; x <= 181; x += 10)
      for (var y = 0; y <= 79; y += 10) {
        var a = [];
        for (var ix = x; ix <= 181 && ix < x + 10; ix++)
          for (var iy = y; iy <= 79 && iy < y + 10; iy++)
            a.push([ix, iy]);
        (function doRequest(thisData) {
          $.post('game.php?window=map&ajax=get_complete_data', thisData, function (r) {
            if (!r) {
              console.log("repeating map data request, response was null");
              doRequest(thisData);
              return;
            }
            if (r.quests) {
              for (var jx in r.quests)
                if (jx == 0 || jx > 0)
                  for (var jy in r.quests[jx])
                    if (jy == 0 || jy > 0)
                      for (var kx in r.quests[jx][jy])
                        if (kx == 0 || kx > 0)
                          for (var ky in r.quests[jx][jy][kx])
                            if (ky == 0 || ky > 0)
                              if (r.quests[jx][jy][kx][ky].employer)
                                for (var i in r.quests[jx][jy][kx][ky].employer)
                                  if (i == 0 || i > 0) {
                                    var e = r.quests[jx][jy][kx][ky].employer[i];
                                    (that.employers[e.key] = that.employers[e.key] || {
                                        activate: e.activate,
                                        deactivate: e.deactivate,
                                        key: e.key,
                                        name: e.name,
                                        pos: null
                                      }).pos = {
                                      x: r.quests[jx][jy][kx][ky].x,
                                      y: r.quests[jx][jy][kx][ky].y
                                    };
                                  }
            }
            com++;
            if (com == req) {
              that.admin.append('log', '> Employer data received; Processing... \n');
              callback();
            }
          }, 'json');
        })({
          tiles: JSON.stringify(a)
        });
      }
  },
  makeEmployerOverrideReq: function (callback) {
    for (var i = 0; i < this.employerOverrideReqRaw.length; i++) {
      var over = this.employerOverrideReqRaw[i],
      t_over = this.employerOverrideReq;
      t_over[over.quest * 1] = t_over[over.quest * 1] || {};
      t_over[over.quest * 1][over.name] = over.employer;
    }
    callback();
  },

  prepareQuestData: function (callback) {
    var that = this;
    function makeByName() {
      for (var id in that.quests) {
        var quest = that.quests[id];
        (that.questsByName[quest.t] = that.questsByName[quest.t] || []).push({
          id: id,
          link: quest
        });
      }
      if (that.config.displayPreparationConflictWarnings)
        for (var name in that.questsByName)
          if (that.questsByName[name].length > 1)
            that.admin.append('log', '# Quest name conflict: ' + name + ', keys: '
              +JSON.stringify($.map(that.questsByName[name], function (e) {
                  return e.id
                })) + ' \n');
      that.makeQuestOverrideReq(callback);
    }

    if (this.config.useOldQuestBookData && this.parent && this.parent.Q_oldQ && !this.isEmpty(this.parent.Q_oldQ)) {
      this.admin.append('log', '> Old quest data was found and will be used. \n');
      this.quests = this.parent.Q_oldQ;
      makeByName();
    } else
      this.transformQuestBookData(makeByName);
  },
  getQuestByName: function (name) {
    return this.questsByName[name] || false;
  },
  makeQuestOverrideReq: function (callback) {
    for (var i = 0; i < this.questOverrideReqRaw.length; i++) {
      var over = this.questOverrideReqRaw[i],
      t_over = this.questOverrideReq;
      t_over[over.quest * 1] = t_over[over.quest * 1] || {};
      t_over[over.quest * 1][over.name] = over.target * 1;
    }
    callback();
  },
  transformQuestBookData: function (callback) {
    var that = this;
    this.admin.append('log', '> Getting quest book data (ASYNC)... \n');
    $.post('game.php?window=building_quest&mode=get_solved_quests', {}, function (r) {
      that.admin.append('log', '> Quest data received; Processing... \n');
      for (var i = 0; i < r.solved.length; i++) {
        var q = r.solved[i],
        w = q.questRewards || [],
        o = q.questRewardsOptions || {};
        for (var k = 0; k < w.length; k++)
          if (w[k].isItem)
            w[k].info = w[k].info.text;
        for (var k in o)
          for (var j = 0; j < o[k].length; j++)
            if (o[k][j].isItem)
              o[k][j].info = o[k][j].info.text;
        that.quests[q.id] = {
          d: q.duel,
          e: q.employer,
          en: q.employer_name,
          t: q.title,
          f: q.description,
          g: q.questCompletionText,
          w: w,
          o: o,
          r: q.requirements
        };
      }
      callback();
    }, 'json');
  },

  findSerie: function (q, id) {
    if (this.known[id])
      return this.known[id];
    var serie = this.getSerie(q, id);
    if (this.newSeriesByName[serie]) {
      this.newSeriesByName[serie].quests.push(id);
      return this.newSeriesByName[serie].id;
    }
    return this.newSeriesByName[serie] = {
      id: 'x' + this.getPropertyList(this.newSeriesByName).length,
      quests: [id]
    };
  },
  getName: function (q, id) {
    return this.getNameAndSerie(q)[0];
  },
  getSerie: function (q, id) {
    return this.getNameAndSerie(q)[1];
  },
  getNameAndSerie: function (q, id) {
    var m = q.t.match(/([^\(]+) \(([^\)]+)\)/);
    return [(m || [0, q.t])[2], (m || [false])[1]];
  },

  addDuelNPC: function (d, id) {
    if (d.isNPCDuel) {
      var img = d.npc_img.match(/src='\/?images\/([a-z_\/]+)\.png'/);
      if (!img)
        return this.admin.append('log', 'Invalid duel NPC on id ' + id + ': ' + JSON.stringify(d) + '\n');
      if (this.duelNPCs[d.npc_id] && this.duelNPCs[d.npc_id].name != d.npc_name)
        return this.admin.append('log', 'Conflicting names of duel NPCs on id ' + id + ': '
          +JSON.stringify(d) + ' vs ' + JSON.stringify(this.duelNPCs[d.npc_id]) + '\n');
      this.duelNPCs[d.npc_id] = $.extend({
          icon: img[1],
          last_quest: id
        },
          this.mappedNPC[id] = {
            id: d.npc_id,
            name: d.npc_name
          });
    }
  },
  getMappedNPC: function (id) {
    return this.mappedNPC[id] || false;
  },

  saveOldData: function () {
    if (!this.isEmpty(TWDB.Q.quests))
      TWDB.Q_oldQ = TWDB.Q.quests;
    if (!this.isEmpty(TWDB.Q.employers))
      TWDB.Q_oldE = TWDB.Q.employers;
  },

  admin: {
    window: null,
    parent: null,
    tabs: {},
    toBeWritten: false,
    add: function (id, name, call) {
      var first = this.window ? false : true;
      this.window = this.window || wman.open('TWDB_admin', 'Quest processing');

      this.tabs[id] = {
        content: '',
        call: call || $.noop
      };
      var that = this;
      this.window.addTab(name, id, function () {
        that.activate(id);
      });
      if (first) {
        this.window.appendToContentPane(
          $('<textarea style="width:99%;height:97%;font-size:11px;margin: 9px 0 0 1px;"></textarea>').val(''));
        this.activate(id, true);
      }
    },
    clear: function (id) {
      this.tabs[id].content = '';
      this.append(id, '');
    },
    activate: function (id, nocall) {
      this.window.activateTab(id);
      if (!nocall)
        this.tabs[id].call.call(this.parent);
      $('textarea', this.window.divMain).val(this.tabs[id].content);
    },
    append: function (id, text) {
      this.tabs[id].content += text;
      var that = this;
      if (!this.toBeWritten) {
        this.toBeWritten = true;
        setTimeout(function () {
          that.toBeWritten = false;
          that.activate(id, true);
        }, 50);
      }
    },

    prepareString: function (val) {
      return val !== null ? "'" + val.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/, '\\n') + "'" : 'NULL';
    },
    prepareNumber: function (val) {
      return val !== null ? val * 1 : 'NULL';
    },

    buildDeleteSQL: function (table, columns, data, foot, custom) {
      var that = this,
      d = $.map(data, function (row) {
          return '(' + $.map(columns, function (type, key) {
            return '`' + key + '` = ' + (type & 1 ? that.prepareString(row[key]) : that.prepareNumber(row[key]));
          }).join(' AND ') + (custom ? ' AND ' + custom(row) : '') + ')';
        }).join(' OR ');
      return 'DELETE FROM ' + table + ' WHERE  \n' + d + (foot || '') + '; /**/\n';
    },
    buildInsertSQL: function (table, columns, data, foot) {
      var that = this,
      h = $.map(columns, function (type, key) {
          return '`' + key + '`';
        }).join(', '),
      d = $.map(data, function (row) {
          return '('
           + $.map(columns, function (type, key) {
            return type & 1 ? that.prepareString(row[key]) : that.prepareNumber(row[key]);
          }).join(', ')
           + ')';
        }).join(', \n');
      return 'INSERT INTO ' + table + ' (' + h + ') VALUES \n' + d + (foot || '') + '; /**/\n';
    },
    buildInsertUpdateSQL: function (table, columns, data, foot) {
      var that = this,
      h = $.map(columns, function (type, key) {
          return '`' + key + '`';
        }).join(', '),
      d = $.map(data, function (row) {
          return 'INSERT INTO ' + table + ' (' + h + ') VALUE ('
           + $.map(columns, function (type, key) {
            return type & 1 ? that.prepareString(row[key]) : that.prepareNumber(row[key]);
          }).join(', ')
           + ') ON DUPLICATE KEY UPDATE '
           + $.map(columns, function (type, key) {
            if (type & 2)
              return null;
            return '`' + key + '` = ' + (type & 1 ? that.prepareString(row[key]) : that.prepareNumber(row[key]));
          }).join(', ')
           + '; /**/\n';
        }).join('');
      return d;
    }
  },

  getPropertyList: function (o) {
    var l = [];
    for (var j in o)
      l.push(j);
    return l;
  },
  collect: function (list, handler) {
    var c = [];
    $.each(list, function (i, e) {
      var x = handler(e, i);
      if (x)
        $.each(x, function (i, y) {
          c.push(y);
        });
    });
    return c;
  },
  isEmpty: function (o) {
    var empty = true;
    for (var i in o) {
      empty = false;
      break;
    }
    return empty;
  }
};

try {
  TWDB.Q.start();
} catch (e) {
  LastError = e;
}

/* SELECT * FROM
(SELECT i.quest, GROUP_CONCAT(IF(i.number = 1, i.data, '') SEPARATOR '') data1, GROUP_CONCAT(IF(i.number = 2, i.data, '') SEPARATOR '') data2
FROM (SELECT quest, number,
REPLACE(REPLACE(data,author,'#player#'),"Petee",'#player#') data
FROM imported_quests) i GROUP BY i.quest) x
WHERE x.data1 != x.data2 */
