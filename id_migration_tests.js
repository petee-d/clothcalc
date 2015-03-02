(function() {
    var twdbKeys = [];
    for (var i=0; i<localStorage.length; i++) {
        if (localStorage.key(i).search('twdb_') === 0) {
            twdbKeys.push(localStorage.key(i).substr(localStorage.key(i).lastIndexOf('_')+1));
        }
    }
    console.log(JSON.stringify(twdbKeys));
})()

(function() {
    var skeys = ["betteritems","calcdata","datamanager","marketreminder","notes","settings","statistic"];
    for (var i=0; i < skeys.length; i++) {
        var cont = TWDB.Cache.load(skeys[i]);
        console.log(skeys[i], cont);
    }
})()


var idMigrator = function() {
    //  security check.. we don't want to migrate twice or too early
    if (!TWDB.Util.isNewIDsystem()) { return; }
    var migInf = TWDB.Cache.load("migration") || {};
    migInf.itemid = migInf.itemid || {}; 
    if (migInf.itemid.migcomplete === true) { return; }
    
    // delete an old unused value first
    try { localStorage.removeItem('twdb_' + Character.playerId + '_lastDeath'); } catch (e) {};
    
    var tdc = function(object) {
        // tricky deep copy
        // tricky, because it works only on data types which are specified in JSON;
        // since we have only previously JSONed data, we can use it safely.
        return JSON.parse(JSON.stringify(object));
    };
    var cId = function(id, reverse) {
        if (reverse) { return parseInt(id, 10) / 1000; }        // for testing
        else { return parseInt(id, 10) * 1000; }
    }
    var skeys = 
    

var clbi = TWDB.Cache.load("betteritems");
var arr, obj, key;
for (key in clbi) {
    arr = clbi[key];
    for (var i=0; i<arr.length; i++) {
        console.log(arr[i]);
    }
}


/*
betteritems : Object {38: Array[0], 42: Array[0], ...}
    ...
    11311: Array[5]
        0: Object
            job: 16
            more: 13
            newlp: 1089
        1: Object ....

        
calcdata : Object {skills: Object, items: Object, jobs: Object, custom: Object, ...}
    
    custom: Object
        1: Object
            cloth: Object
                1: Object
                    id: 638
                    lp: 0
                2: Object
                ...
                10: Object
                    id: 11137
                    lp: 0
            
    items: Object
        1: Object
            id: 1
        2: Object
        4: Object       <= non-continous!
        5: Object
        ...
        13: Object
            id: 13
    
    jobs: Object        <= same structure as custom
        1: Object
            cloth: Object
                1: Object
                    id: 638
                    lp: 0
                2: Object
                ...
                10: Object
                    id: 11137
                    lp: 0
    
    used: Object
        50: 1
        188: 1
        253: 1
        369: 1
        429: 1
        ...
        
datamanager : Object {items: Object, skills: Object}
    items: Object
        1: true
        2: true
        4: true       <= non-continous!
        5: true
        ...
        13: true        
        
####   lastDeath : delete!      #####

marketreminder : Object {2337442: Object, 2338397: Object}
    2337442: Object
        ends: 1425666450.8177
        id: 2337442
        item: 11312     <=== migrate this
        reminder: 55
    2338397: Object
        ..
        item: 11311
        ..
        
        
notes : [u]Sattler im BND[/u]
        Iluminatix;Mendelson;swisslady52
        [item=11312]
        [item=11311]    <=== regex
        
settings : Object {..}
        pinnedItems: Array[5]
            0: 2692
            1: 1890
            2: 1937
            3: 2482
            4: 1759
            length: 5
            
statistic : Object {ver: 4, job: Object, duel: Object, chest: Object}
        chest: Object
            1838: Object
                count: 1
                items: Object
                    1839: 7
            1967: Object
            1975: Object
            ...
            17005: Object               <<< KEYS
                count: 9
                items: Object              AND
                    228: 1
                    331: 1              <<< items
                    336: 1
                    401: 1
                    403: 2
                    11021: 1
                    11054: 1
                    41077: 1
                    
        job: Object
            1: Object
            2: Object
            3: Object
            ...
            10: Object                   each job...
                40: Object                   each motivation
                52: Object
                60: Object
                ...
                100: Object
                    bond: 2
                .   count: 38
                .   duration: 115815
                .   ...
                .   extraitems: Object                   each key
                .       10010: 1
                .       11012: 1
                .       11014: 1
                .       ...
                .   items: Object                   each key
                .       210: 4
                .       309: 1
                .       316: 1
                .       ...
                .       killed: 0
                        wage: 11575
                count: 133
                products: Object              AND products:
                    707: Object                   each key {}
                        0: 726
                        1: 113
                        2: 2
                        3: 1
                        4: 1
                        9: 1
                        last: 133
                    789: Object
                        ...
*/


var backupData = function() {
    var twdbKeys = [];
    var key;
    var newkey;
    var uid = 'twdb_' + Character.playerId + '_';
    if (localStorage.getItem(uid + 'embackup') == 'TRUE') { return; }
    var dialog = (new west.gui.Dialog(TWDB.script.name, "The West Beta was updated sooner than our migration function was ready. :( As an emergency solution, your data will be backed up right now so that we can restore them with the next update. Sorry for the inconveniences!", west.gui.Dialog.SYS_WARNING)).setModal(true,false,true).show();
    for (var i=0; i<localStorage.length; i++) {
        key = localStorage.key(i);
        if (key.search(uid) === 0) {
            twdbKeys.push({
                    key: key,
                    newkey: 'backup_' + key,
                    val: localStorage.getItem(key),
            });
        }
    }
    for (var i=0; i<twdbKeys.length; i++) {
        localStorage.setItem(twdbKeys[i].newkey, twdbKeys[i].val);
        console.log('key ' + twdbKeys[i].key.substr(uid.length) + ' saved.');
    }
    localStorage.setItem(uid + 'embackup', 'TRUE');
    dialog.addButton("ok").show();
};
backupData();


var dirtyBetaPatching = function() {
    if (Bag.items === undefined) {
        Bag.items = {};
        for (var type in Bag.items_by_type) {
            Bag.items[type] = {};
            for (var i=0; i < Bag.items_by_type[type].length; i++) {
                Bag.items[type][Bag.items_by_type[type][i]] = Bag.getItemByItemId(Bag.items_by_type[type][i]);
            }
        }
    }
}
