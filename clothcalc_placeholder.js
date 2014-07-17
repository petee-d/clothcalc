// ==UserScript==
// @name dev The West - tw-db.info Cloth Calc
// @version 0.37 Rev. 5
// @description The West Script: Cloth Calculation for game version 1.34 or higher
// @author scoobydoo, Dun, Bluep, stewue, Petee [tw-db.info]
// @namespace http://tw-db.info
// @grant none
// @website http://tw-db.info
// @include http://*.the-west.*/game.php*
// @include http://*.tw.innogames.*/game.php*
// @downloadURL http://tw-db.info/cache/userscripts/clothcalc/dev_clothcalc_de.user.js
// @updateURL http://tw-db.info/cache/userscripts/clothcalc/dev_clothcalc_de.meta.js
// ==/UserScript==
/**
 * News on this update :
 * - fix for buy tip in the new shop
 * - option to save your preferences in the market sell dialog
 * - duel motivation bar is replaced by a K.O. timer when you died
 * - reminder for the level 600 crafting recipe waiting periods
 * - added option to avoid nuggets as default payment in event games [must be explicitely enabled] 
 * - added option to skip the Premium dialog when using fetch all in the market [must be explicitely enabled] 
 * - tiny improvements to the TW-DB settings dialog
 * */
(function (f) {
    var d = document,
        s = d.createElement('script');
    s.setAttribute('type', 'application/javascript');
    s.textContent = '(' + f.toString() + ')()';
    (d.body || d.head || d.documentElement).appendChild(s);
    s.parentNode.removeChild(s)
})(function () {

    // Dun : Just test if there is already a TWDB object in the DOM ,
    // if it exists, there is another cc/lang installed, so do not
    // start this one

    if (isDefined(window.TWDB)) {
        (new west.gui.Dialog(TWDB.script.name,
            '<div class="txcenter"><b><br>' + "#CC_INSTALLED_TWICE#" + '</br></b></div>',
            west.gui.Dialog.SYS_WARNING)).addButton("Ok").show();
    } else {

        TWDB = {};
        TWDB.script = new Object({
            version: 37,
            revision: 5,
            name: "The West - tw-db.info Cloth Calc",
            update: "tw-db.info/cache/userscripts/clothcalc/dev_clothcalc_eng.user.js",
            check: "tw-db.info/cache/userscripts/clothcalc/dev_version",
            url: "tw-db.info",
            gameversion: 2.11,
            lang: "eng"
        });
        try {
            TWDB.script.notes = jQuery
                .parseJSON('[{\"version\":\"31\",\"notes\":\"hotfix for game version 2.05\"},{\"version\":\"30\",\"notes\":\"script is now ready for gameversion 2.04\\r\\nthere are still some fields to fix, but the most parts should work \"},{\"version\":\"25\",\"notes\":\"[bonusjobs] security query before reset<br \\\/>\\r\\n[bonusjobs] sorting of the export<br \\\/>\\r\\n[chestanalyser] some stats for future drops of chests, bags & collector cards<br \\\/>\\r\\n[marketreminder] add reminder for market offers<br \\\/>\\r\\n[other] button for deposit money<br \\\/>\"},{\"version\":\"24\",\"notes\":\"[ClothCalc] Bugfix, Motivation was not included at Wages<br \\\/>\\r\\nFeatures listed below comes from an other Userscript \\\"stewues The West Tools\\\"<br \\\/>\\r\\nAs he decided to stop Offering his tool, he has asked me to include this Features into our Script.<br \\\/>\\r\\nFirst at this Point <b>Thanks a lot!<\\\/b> Stewue for your hard Work and your Decision to Offer this Features now through this Script.<br \\\/>\\r\\n- button for sleeping into best hotel room or fort barrack<br \\\/>\\r\\n- confirmation prompt before quest cancel<br \\\/>\\r\\n- hint to deposit cash<br \\\/>\\r\\n- button for last post on ingameforum threads<br \\\/>\\r\\n- moved button for new post on ingameforum to upper menu<br \\\/>\\r\\n- add duelmotivation into userinterface<br \\\/>\\r\\n- remove automation pa hints, like the nugget picture on work queue<br \\\/>\\r\\n- activate Fortrecruitment also for non generals and captains<br \\\/>\\r\\n- enhance the Fortrecruitment through some more Features<br \\\/>\\r\\n- the market map<br \\\/>\"},{\"version\":\"23\",\"notes\":\"[general] script is ready for version 2.03, all features should be working<br \\\/>\\r\\n[clothcalc] added the wages values, honour to petee for his great work to find out the wage formula<br \\\/>\"},{\"version\":\"22\",\"notes\":\"[clothcalc] fixed Bug with faulty Detection of corrupted Cache<br \\\/>\\r\\n[questwiki] Show tw-db Link on Questwindow<br \\\/>\\r\\n[questswiki] Show total Amount of Items at Inventory<br \\\/>\\r\\n[questswiki] Button for Open the ClothCalc Window<br \\\/>\\r\\n[buytip] added new sets<br \\\/>\\r\\n[buytip] fort boni of natty where wrong<br \\\/>\"},{\"version\":\"21\",\"notes\":\"[general] fixed failed script start at gameversion 2.02<br \\\/>\\r\\n[errorlog] fixed Error through new Notification-Bar Object at gameversion 2.02<br \\\/>\\r\\n[settings] added Group for the SellTip Settings<br \\\/>\\r\\n[SellTip] add Option for never sell Set-Items<br \\\/>\\r\\n[bonusjobs] discovered Bonus Jobs are now cached<br \\\/>\\r\\n[bonusjobs] add Export and Import for discovered Bonus Jobs<br \\\/>\\r\\n[other] Option to remove the Game-Hints on Notification Bar, which could not be disabled through Game-Settings<br \\\/>\\r\\n[other] Option for a Scroll-To Inpute Field on Minimap<br \\\/>\\r\\n[ClothCalc] fixed the Bug, that Joblist is sometime not clickable<br \\\/>\\r\\n[ClothCalc] fixed the Bug, missing fastes animal on bestwears without animal<br \\\/>\\r\\n[chat] fixed bug for missing smiley and color inject on chat windows, which are already opend on gameloading<br \\\/>\\r\\n[general] removed script parts for gameversion 1.36\"},{\"version\":\"20\",\"notes\":\"[general] reworked the Script for the-west Version 2.0 <br \\\/>\\r\\n[general] Release Notes for Script is added ingame <br \\\/>\\r\\n[Importer] the Import Userscript is now included in ClothCalc Userscript (for Gameversion 1.36 you will still need it) <br \\\/>\\r\\n[Importer] the Alliance Import Script is now directly available through the script <br \\\/>\\r\\n[ClothCalc] Basic Function is working (showing best cloth) <br \\\/>\\r\\n[ClothCalc] <b>Values for Wages and Danger when sorting the Joblist are wrong!<\\\/b> , so temporarly this feature this sorting is removed until our date is up2date<br \\\/>\\r\\n[ClothCalc] preselecting the selected Job on Minimap is ready for Version 2.0 <br \\\/>\\r\\n[ClothCalc] the sorted job List (experience, wages) could be changed from normal mode to value per minute to value per energy point <br \\\/>\\r\\n[ClothCalc] Joblist is reworked, jobs could now be searched and jobs have little popup with complete job data <br \\\/>\\r\\n[FavoriteJob] this Feature has been removed because it now emulates a premium feature <br \\\/>\\r\\n[SearchJob]the jobsearch is Version 2.0 ready, the direct start of one of the four shown job is a pa automation only feature (innos decision]<br \\\/>\\r\\n[ReportAnalyser] the basic function is reworked for game version 2.0 <br \\\/>\\r\\n[ReportAnalyser] detailed job report and detailed item report will be added later <br \\\/>\\r\\n[Chat] is ready for Version 2.0 <br \\\/>\\r\\n[BuyTip] is ready for Version 2.0<br \\\/>\\r\\n[BuyTip] set bonus is now also included here<br \\\/>\\r\\n[BuyTip] also shown on market now<br \\\/>\\r\\n[Collector] is ready for Version 2.0<br \\\/>\\r\\n[Collector] also shown on market now<br \\\/>\\r\\n[SellTip] is ready for Version 2.0<br \\\/>\\r\\n[BonusJobs]Bonus Jobs you\\u2019ve found are now shown on minimap<br \\\/>\"},{\"version\":\"10\",\"notes\":\"[ClothCalc] added Favorite Job Feature (petee)<br \\\/>disabled script for TW2.0\"},{\"version\":\"9\",\"notes\":\"[Chat] added popup on permanent whisper icon<br \\\/>\\r\\n[Chat] history ist now saved on localStorage (color, whisper)<br \\\/>\\r\\n[Chat] added permanent whisper to player menu<br \\\/>\\r\\n[Chat] added inputfield to direct input color number<br \\\/>\\r\\n[Chat] added bold and captialize options<br \\\/>\\r\\n[analyser] added table footer with overall values<br \\\/>\\r\\n[analyser] added statistics reset function<br \\\/>\\r\\n[analyser] exclude questitems from item statistic<br \\\/>\\r\\n[analyser] granular report for items (Item-Report), click on items at new table footer<br \\\/>\\r\\n[calc] added option to switch position of cloth calc window between left and right<br \\\/>\\r\\n[enhancements] added feature so you can hold the +\\\/- buttons in the skills window to change the value faster<br \\\/>\\r\\n\"},{\"version\":\"8\",\"notes\":\"added settings window<br \\\/>\\r\\nadded chat features (permanent wisper, color, smilies)<br \\\/>\\r\\nadded Report Analyser<br \\\/>\\r\\nadded second Buytip Icon if item gives bonus for current selected job<br \\\/>\\r\\nfixed with * marker for new items on market<br \\\/>\\r\\nfixed several small bugs on job search feature<br \\\/>\\r\\nfixed buyTip was not shown without calcdata update<br \\\/>\"},{\"version\":\"7\",\"notes\":\"add new feature jobsearch (petee)<br \\\/>\\r\\n\\\"new\\\" Icon will now also look at Wear Items (thx Inno optimizing your Wear Object)<br \\\/>\\r\\nchanged max gameversion to 1.36 for coming new gameversion (no problems found with new gameversion)<br \\\/>\\r\\nadded new Script Loader with Info on footer (next to servertime)<br \\\/>\"},{\"version\":\"6\",\"notes\":\"code cleaning and optimising<br \\\/>\\r\\nupdate minimap on jobchange if minimap is opend<br \\\/>\\r\\nset limit for custom jobs from 10 to 15<br \\\/>\\r\\nfixed several problems with attributes on customs<br \\\/>\\r\\nadded images for fort-customs and for attributes on customs<br \\\/>\\r\\nadded icon on Traders with tooltip for which jobs this item would give a better bonus<br \\\/>\\r\\nadded icon on Inventory with tooltip of bonus on selected job<br \\\/>\\r\\non rev. 59 added colored tooltip for better visibility<br \\\/>\\r\\non rev. 59 added icon for unused items on inventory<br \\\/>\"},{\"version\":\"5\",\"notes\":\"eleminating browser freezes<br \\\/>\\r\\nmaking custom section customisable<br \\\/>\\r\\nshowing best and current \\\"job\\\" values on custom section<br \\\/>\\r\\nchanges on cache system<br \\\/>\\r\\ncorrected code verification on rev. 34<br \\\/>\"},{\"version\":\"4\",\"notes\":\"fixed removed indexedDB.setVersion on Mozilla<br \\\/>\\r\\nbetter error handling of indexedDB, click on \\\"cache error\\\" icon will initiate a reset of indexedDB<br \\\/>\\r\\nsolution for Cache Problem on Scriptupdate with Chrome (not working on this update :( )<br \\\/>\\r\\nearlier button add, opacity to 50% until initializing isn\\u0027t finished<br \\\/>\\r\\nten second sleeper on initializing to handle chrome freezes<br \\\/>\\r\\nadded marker for items on traders which are not at own inventory<br \\\/>\\r\\nadded \\\"*\\\" prefix on market for all items which are not at own inveontory<br \\\/>\\r\\nfixed wrong levelbonus for soldiers<br \\\/>\\r\\nprevent script from be active in more than one language<br \\\/>\"},{\"version\":\"3\",\"notes\":\"fixed problem with need of cache update<br \\\/>\\r\\nfixed problem that inventory window was closed<br \\\/>\\r\\nadded best animal to every job<br \\\/>\\r\\nadded mark of weared items\"},{\"version\":\"2\",\"notes\":\"recreate the script as whole userscript without reloading javascript code (in combine with indexedDB the script will working also if tw-db is temporary down)<br \\\/>\\r\\nimplementation of an update system (user get a new Window with update link if new script version is available)<br \\\/>\\r\\ncustom section with static custom activities (is prepared for making it user adjustable later)<br \\\/>\\r\\ndisplay skill images for selected jobs<br \\\/>\\r\\nsome important internal management parts\"}]');
        } catch (e) {};

        // START OF SCRIPT CODE THAT CAN BE EDITED IN A RELEASE
        TheWestApi.version = Game.version = (parseInt(Game.version) ? Game.version : TWDB.script.gameversion);
        Number.prototype.round = function (e) {
            var t = Math.pow(10, e);
            return Math.round(this * t) / t
        };
		/**TODO: get rid of this **/
		String.prototype.twdb_twiceHTMLUnescape = function () {
			return $($.parseHTML($($.parseHTML(this+"")).text())).text();
		}
        if (!console) {
            console = {}
        }
        if (!console.log) {
            console.log = function (e) {}
        }
        TWDB.images = new Object({
            ClothCalcButton: "data:image/png;base64,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",
            iconName: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqBJREFUeNqslEtvElEUxy90gOHRDhQpDBIEaysKNQZpYpqiLroxaUjUrV/Bpd/BD6IrdySGmK5cVzf1sSgNgrzDAB0QBpgZxnPonYZSSLvwJj/unXMP/3vOfRyDpmnkfzUGf1Kp1Lw5A7BEwTYGVNpfaul0+kxsQbMAHOCmi/aBFtAF5IWRLbC7gLtPGOalPBpZG7J8cmKxHIDtN3AKaNcVw6gCYZNp/4XV+kaRJNKs16V3wSBG9pdyKTrjgr1aBsK7LPtqPBwStdsl1mbTGiuX98HuB6zzIpgnZgJuAHfWNc2ndjpEabcn3KtUtnERupfG64jZAH7XbN5bHg5ZVRTJT0Kq416PhATBsyJJUZj3AOarxPB7BQhuGo2Rcb9PTiVpcMDzuOnErCjMVqmUpKnarxLD1TxOgyF2X1F4TPHQbC4KNtug4HY30CFSrW5AFwKcswc4K4ar3YwbjU8xLQVSPOK4iUjW5xOw94miixfFBAy9s6kyc+5WOCHLG0qrRfqtlhLv93mcZGX53PdBsZisclwGhjlA0u8cM3O3vAFNiztrNccwlyOGdpvZPju9Cw1S9X+OxdZh+IO+itG0mH63go+bzWeD4+PJ3apxXPvChiqKabXXczgGAzaRz+99DYUOwVyeFdNTDNzK5dZQCDf8/c4OPp/vgAisAY/eZjLP8VTDjUYExHALHHRe08WwMrDJQuEhW6+zaMh7PFnoPgFH9Pngg69mvd5otFy+vVmr8RClq2W3W+hBqtNpDj2CsCQ4HGX40H75/R/A9g11cQ7A0xyD2EevKL4GH3WrWFz5Eoko9P/EgMUR6hk+oVVMkz4lrFsVSofWMIberQBNGX1qug/Us/PIVFpWMII/9Kgl+j2e8hGpraRnAwx0n38CDAD3lwpCS51YdAAAAABJRU5ErkJggg==",
            iconExperience: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz9JREFUeNqsVNlPE0Ecntltt3u00FqK2KIQQCKERAQxKqCJB8YjMdEXH1Bjor6YoNEYH/wDJP4HJvpkYkxMCB7REOIRPDAicgkVa1sKEtqypff22u06g9Nkg6I+OMmXmZ3j+32/a6GqquB/DfiXfUqzxlbzmvUvQ/cHMhpBT2Y8FASZ4Ldk1CpEeN+AICAUjzy6cn/iyYUXaM0SAfBfyQBRwyGYL3edbeMpsSUbm9t07+7tM9VVFcxqZLrfqILEPR7BEgp4LTxtsohL0/RSdr7U7fHpiQitq6o2wBQh1hNXjNg9BKvXOytAOUwp0ncgBn3lgsCbyTlWzhAvlnloTaDZqxdPrp+ccjFbN9dsSKeltWYTV9F97dgph8HlUJLfYUK2Whw1LQEIQbSlqU64fulE9dGDbUzv0zcxnGlIFGE1wp2bnR121tdiNfNNlmJzA6QZvUFdZNW4k1LisyANLUqGqQrTFOXPpqJyOBoxS2XnHwTStlvnznfN6IgyPAvxDGeji8ytptzHLVwsA1XaCPJyFuRzyDBFIb+idD4+WuILyCWukDGt2I442SgvSlIIZx5CTQmUINgPHti78/j+2tP1hsdV63hRB/KoTtUcwJ0STQIw6gFgLGDPxbltz98PT9+YnHS60DvsZqYQPJqQmr65vfTgyIzY0NpZazfFjBwMA0XOAQVxRhIAfAmaQJDZtzAwON7tdE4jahDHRLiYKdIiuKrTCMg2SC0uivGXAyPjRpNZTUpZMBsEIJz4mfciTgZqPjPn8czMkfuZQlcUyLKYhBzGjAIvHd5dWaYkpuHQVxkMeO3qRNC2rM7KpcAaQ0TP8xy+KxEyBWiKD3/kiDppe3MN214jNnx2LoDRcGNiItLkGhLbfe7kRglnysr4K/fu2WUhbwq9qupWVDE+SDXWOdhXrz+8D4JDtm9LYKyvv38C+Sj7O3Y7jjSXH2czn6311W2NPQAMr9ZOeWIp6ZuPON8Nmzwy9DOfRsZEWVaW26z3Ud9UKLT97UZHLbo4617594CaudCPxuIioYjneXbBv5gjRqCmbXJrS22p1h1blZ6HzxZIvNWVZIXiNZC5kBx1BZmqiW+WxHuZ7IcAAwAW9VeYOecN4AAAAABJRU5ErkJggg==",
            iconDollar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwZJREFUeNqsk91P01AYxk+3buyj6+gGZXOTrwCSiRB0gkYiGXilYDSAqHjh56XXmhAT77nUS+/8AwhqTIQQE8CIfGNAkskE5thGYWPr1lk6unpqTkkz4M6T/HJOz2mfvu/7nBeTJAn8r6EB/3Fgxzxr0Fr5WQ4ioRmg9cFQssPzhDRoT4/QojMRIiBExKH64HlCsoAJQnTc7D11rulCcwZ3dWd4PkdpY2+jkfD4m1cDyypR6ai0MCRkhthaWttO17Y+HIiksOqNaBpsxdKgxKYHbgpnLpWxj148fzYK39tT0s5PU06nAGKB0Fr6bMfgxEZ5NS2BzTD8RkiCXUEHlqZztL9U6CMI83g6zWVVNTxUaFmMdLrLSn8mSJ8JY3UV0swsZRT5YkICd8/nQOWJFMCz8Wqv12s9wryDyJR6GWs89TWTnOTOpgGImq2UjSrUJpNaMD05/BqPbE12XL1CbEYKTapApPx7plGcDK4u7XR79WmDRgCfwxWVfgbThaAYV+zrLCAd5Ip/PfDu/afEUZFhCCPEDnFBqnq6rrfZikoaAoxo/7btLuM4DuA6A9AYrMDjEMNdDXtP+/tfjsB3M7KrigHqDpB3xJ7e2+U8ZsUX5ueXSi1ssMppEFykAO43ZQBN5MDcIkMvBFKPnzy4U4KMw45rJ2nZH0xsW3x9VOO9Gziul2zG7I7OVAgiv76P1jrxFBB5PBTeavZ4atpUl/pQB/yLlbJaDD/Wfmd241nyVnvLZc0fPchpdwBrbPTMrCSNesCAKgfJr60FI/l1w9UpQrJfx0ZWO7uKhhb3yWuDE1krhpswgYuDkJhyOghBavcVCzQBJoY+DK8cZ4B8LQiVCa4mb2O93eGqm2OKmrk0a+25SO1RZm0gFot/HPsyNRiJMus8z8uuChJyQBGTczegDpAF5eLaDYYCm6fuTAVlp08CgV2fnl2cYtlUCJ4xkITKTSm/N3HUBXKEJIJAUefQh0lECsLLZZHPlKuB5aUsR6hDokY040hMQAI8Wu+jWiuBgb8CDAAXATNfWNNYlgAAAABJRU5ErkJggg==",
            iconLuck: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39JREFUeNqsVEtvG1UUPvO2x+OxnTp+xY7T2iRUlEcKqFCVV1cVEiD1HxQWSLACJCSoxAL27Nixh58AGxYQlJaXILIT0zhOnNiJY8f2vD32vLhj3UHTUnXFSJ/uvZp7vvude893CM/z4P/6iIesyRCo0D8XwcGjD+9RZAQOZhA4hAieUzhwhjBFMPHceZCQfoDcD4wKQiz5yecfvOWsMLeHxkgo8ZnpzrBFuDOLfnXhuU+/uP3l183WwQQT3hdMhFT5ahI0Q2effW39zSOif2V3sE/vjg+41qDN1RrbTJZOly8VV7/buPOLhNO9T1lwT35qMUSUtGb2ufqv26PpOmht5TBOovPlgQLE0IPR0SguHUminwFO8987pLCiOdG7H9164fK1p68uV4sXO80OJZA8p4pGUZIVxObBWuQ8PJZdcQaG9LvlWvKNN67zU9WcjUbSnIzEl8wjpP6o1fhplfxMfnz63oXXqzflfUkpTwtj/9yVWB5Wl6ugZx1Cyc5eghuRTbvgfv/xh++/EmRI40kMIZ09n7nalY+jh0oX9l07VngmHWU5OrpKlEGgYqBmTDA5LalljHcGWwPo0SmRWCLeFuPChqJqFh1WtryYv7BHnqA3csFQdGhYSrpMLkE5XgCdmsCutgcz2YGJoUOc4kEgYkT/9Ey3bIcJlJFYHXdGSNnjcQ/GPRkIA6AiLMECswB9QoKcmwJ34sC21gLbtkFVVejTQ+9sNNqaTCbz1yRDL2IPm/2meaJ63JByn2Ar3pO5iyDmU6DSBrT1Y6iwJXiRfwp4mXM5jXFFMq799POdzaBEaFx4flUrSlP5czEimizDVMq5pWqkFM8MiB4Jkgcd8xQ4k4G/v218lStk7UuVy7lERDz8Zmvz2BfiE1JY3dxWiqSY3U5P3mu2z1DRuLDGlA9GR4ykyOCYLpyeDLwSm7/712/1Hxv15g/bO/c2LMuWUejcDb4yC0H3CTXdALx2FFlJ1Xd3JqfDfjRJiWBODL/WPJ6PGa7rttGeISJS0WgEtgqnGe4EZK/TZ192rrXWxHKC0qA7sMfDc8WF1TQpmndZtj+bzWRsfDswPRHqHIGlEgiLCPliqVC2pxaXTCZoZDO5Vm/Urjy/rtd37nU1TdcxEQQiHtaCfM8JCEkE34MsPtlPxze3gufTR7WgoESCTRYOpEJrM5Taf75/BBgAw3Si4MpJ570AAAAASUVORK5CYII=",
            iconDanger: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuNJREFUeNqsVE1rE1EUvfMy08xUbc0kU6U2H6WYSWwpRQgU6cZFV9KV4E/wBwiCP8Cf4dJuRARXVZCqYDbagk1tYwshhKZpmkzitJOkaZKZ8b72ThkL7vrgwPu65553z3tPWFpagqtqDK6wib6+QOQBAh+7CIfgJReo783btO+CTKC+jLhGEGnzKaJPRJIvpovoIE4QPU7qLQSIIIy4jbiFUChrmwIYzck0byKqiDrimCcVSVUQEUIkRiTp/tN0+smUZU2Wt7YarxnLlmSZBwUWJybSDxQlJRWLsFKvf86GQqs4/xsx4BBJ1TBiTGLs3suFhecJ29Zgbw/uVKth3bJiz+bmfjxOJiceRaOTgETQbIKezU51Z2dH1mOxZYy1uHrRJ19b1LSHiU5Hg40NgLU1AMOAm5Ikv7Dt6buuG4L1dYBcDniiouuyYLG4CLHYF4wtIwyPjB/zhu44OhQKAJubAKUSlh/rL8uQzOdV2N8/I4fDQ3D6fWhyBstSBccJu4xxMaLfTUFqNETooEGmeU7E2ymaWcbEAm4ZYGls+8wNpObqBNFGExkTvHvjkvXtg3p9H3Z30Zvji4sFLi73emekLhLxu7CN4Gc7UZS2K0kGXRObkc18j/F2dPRj3jBaJVTXoAwucfJN/GjfEbzi24LgBFOpD9it0NXoB3Rd944JA8YgF4mYjmnq3W5X8Zzh7RDxlYgKktSTZ2ZWpWj0PQ53EDUuiJO5vufRaweDVj4eL6HUMcU0VRFdO8KFT0RkqWpDmZ9/J0YiKzjcovJZfmXeG+vTkdu1SKRSCYdttVaL5rDIb/iRx8crw5nMsjA09I2I+JU4oifneGQeYZ+KyZ9Qu6UoRjUUqh8fHEzXNG1HyWReoas/cS1Pii6ILv8anqsOPQ/eb1VUtZxMJJrX4/Ff9rkS7z22Lnn0Dxn4jOPq/lDWxm46XaD5EyLpUEL3f/+Zv3lfz4ACAz7Ftv8P87e/AgwA2Gk+sVBbJGIAAAAASUVORK5CYII=",
            iconLaborpoints: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeVJREFUeNqclM1OwkAUhVtaKMViA2K7cOfOV/JF2LLyFVjwEkRehK0rUxISBUUrP/2xP95LzjRjaSNxki80LXPmzLl3RlVOhwoahCa9T4mMyMGvkee5oteINYkWYUCQRSKQQPiswQt0iRvizvf92W63mwVBMJtMJrdYSD3XGTsxiT7hRlGk6LquaJqmLBaLCyyW1LmoEjPgbhCGodJsNo+Cq9WqVcrxRKwhhc1YxCXRI65YLE1TIWbhey5lVxRFl8I24YiFHBZiQSHG7ubzuYVv/P+QCIiY+GYxFdthgf50On3gSX/BLsWv4zj3LEoFSHTJjUsVU5IkqYTdiWcWElvHfHZ3FNOw1TZvqU5IbFU8S2KaXIAMYcaj0egxy7Ie/dEm21167o7H44FwNRwOn9Y0DMP4sCzr3XXdF8wvxLirt8Ta87xIVJG45rDJbSG2XC496rUlvd8QPvGG+aks9gV3n2CPFVtyjrZts5NnCHElD5ifKVI3HxCihpKr6Kc+nwCRkWma7GgNsQSIPjuKpVJu4qCb2PqOi8JBs1in0wnwfi/dHHn5OOWlq+Ybbv04jgtnJLzH98prSK04Ytw3NvcdaCOCFfGKTMOyWN2tkSLcDRy2EMEWbpO6g17lrPGfy5Gd/QgwADbFOC1FlFuVAAAAAElFTkSuQmCC",
            iconData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACJlJREFUeNqkVglsFOcV/mZ2dse7HnvXBzG2sQ3hcDli48XYFiGCmDgQERqiFgoJilqFRG0KdasoNKEKJYQ4kRqgqpJItGpLW0UE0RCFoyDAhHAWAgaXI8Ze3/jatfec3dmZnaNvds2VgKKqs/v2147+/3vf+9/33v8zeMAz9qFsLP/Bk1PW/mxFHcOyFbpuONs8LX3t7Tcat32w72hnt0/C//CYeCuWPjnlly+vqGMNtkIzDKfHc6PP09nS+Lvt+4529Nwfj7nfy9d+scq97IcL16Rrel3U0zlWGfJyCSmCfr/fUDI5SckSrl1obd9x5Mi1v3b1Rr6T6Lq1q9wrn1m4Bna9rkfsHBtUvJysRTDYO2LYdavkUIRrV5vbdxw8Tng378W7h2BJUR5+u/7FdXWPVm3s/fyAPdZ0AlZxBKyqQVWjsNldUK0cJBr7c1zoy9bPHT05svrchb6r8XjsW8RMvLfWvbiudn7Vxsae/fYe6TR0xguO02EYcWiwAwYPXc6CZTALXJ9+rvH08OqzTXfwbhMsHpeHv//xzYYCp/BG2wcfwtl/HdaoCjWkQIsb0AyaxAIWhwWsyw7ZzqPTkQF1bmlv41fqkt17jjWTt9vkioncxx+92ZCdJ7zxScuHYDKugk/TEU8oUAgsoQP0hZW1wM47kJB5hNsEPKKV9n5xXl2y67MUnuUW4JZ36ldVV0zf2ry5Ac4bTeBGEkhENDDGqFtLCjBBZGW/grhXRoYqQ4rGnJVLa+b0eZmdvb398i28rW/Xr6p0T9/6l0vvQk1vgs6qkGnPVBOMTDMJUsAxehGUCE+VoDniCIqS8/vlNXN6hwnvZr/MmmDzHp2ZM39+5XtX/vEJ7JeaYfgARSEQDUQgBaQTaILci+EUuCLriHTEIFwfgtbSWvZUbVE9z9uS5Gofc+cumFv53t4ruyA7Lid3i1SSXJ8cTSwzWPqJkyVUICwZ8EpxDGQOoFdpLXv6saJ6m80G1mKx4LlldcvDXm9h+MAB8HFaQCAKSSDgzEVs8UIE6Z1B0g1QKtRnFyHEcLSQ3pFAxE4Z4pkulJbYX5o5vSCbYRi88KOFK31hb2FzaD8sfEpIijwaNJEl+KTFzF2M8oiLDFSaY9qwmkBzogtTSuyrZ04vzGbz83KY8ROKn/acugyjLZSMSjMjigCFP/0xnvhoG9KeW4luw4HJm36DJX/6PVyLaxEIkgOaO0KewpcGwMvcuAnjs+cKgoCJJeOfudB+GSMIwU+BRmmeRGbWZ4yCjdEYImOiDtSXbcHq0tcRj3AIBAiLrHl4AGqapah0Qs5c7nuTivJZjpvqu9KGPIpSpiypZkqIZOBvuyFWzUTVr9Yi8OwS5E+djL49n2L44DkkLKl0mVWmkOdIfwyVs2bM6B9QD7MMO619sI2aX4qM+USJmD2WAZGPQCIfgibg1ap34R6/ACc6PkM0aiGfKgzyHVUkDEoSamaVlbOc1VqkKIoz6g+Co4UG6Y2xAlw64L/YjQub3gdPFVtUNh3iYD8O//wteAdDiBKQRGZWBckU4ZCGTEHIKx6XWxCLxl3BSBAMBWGaQpor4AvQsGA7np/2CgTFhdeq34N78lNobN+FXx/ZiGGRCo6CiEupoAJUoE4hI5+NiDGrruls1MIkxaskRoVMY0iwIW/5MnCmk/AI7LnZyFu5FFQnkGiObKS0pJpmpX6mWhP+gMjqhs7qMSbpzMQyR52j1mKVsLj0BWxb+GdUTngcx1s/xoajm6lyqZVRpJKY8m9mxZKwUS1YVLatvccrRqKitbgQAfKkJVKAEasds7dvQPmKxejauxeHn38F4XYPFjXUo/LVFVBS3SIJZnXwMFwCmq92tJ8+f21YkqXIGGsh4sFUcZhRtAwNYNOp19EfaUGBayKOe3ZjQ+M7CMdUWEdbD0ZbmpPhIdDn4hVPG+sdDvb8+1xTm61kLDoFW3I7zN2z0lQhEYNn96c4uaYBHSdacOQn6xH8TzPS9USSWLLRmuPDhSRqXvuq6fqZUDgaPHn+YttDjrGQumyQ5RRJk0S7z4cNx9ZjZ9Mf8PaxzQhFlOR6syhN7elkFpJYgVoIzuC1s03XTpmNWg0EwkVVs0tru6MSMnuGwJkplFV0/us0OvafRCymmYcIwiMiWv95BD1fXk2SsxNLJp1DrK4Gg8HwF0ePX9qSUDXDHwwXVc8qne/rkhDkh5K7EieSOm37TX8ExzsuQY7rYPRUxgwjRdBGbDINDjO1GviGQ41Hvry8JXmSkG5CrgxhUfHMSa5rg8PI8osgvSJIR1KcOr12VzplRUtqzmxvOul2YE45wtnp0uf7z7zkD4pdJt5IIBJyZgoLZ4yf5Gr9ehiiVaQTiPD8RJR0ZupNo/+6miLHkAMbgXMag4dD5bDL6dKeQ2dfDhDeraMu6unow5gsZ0VhzVRHj0qhekPUboxklSZGyVnuSAVGVga8890Qx+XEGxubNvT2j+y8655g4hk5Oc4Kd/FUh79fgS8agkynRTyKJFlzN01SyT5ODtKMDJQqbmQncuIHT9zBu0VQ1zR95Ou2nqiD53OnzSvLypw90WJ30WWAytCM0k6lzGY6wE7Ih7PWDTxRiW4l4Tl06Pz7BLbDPBjuIngbz+7gc+fNKMualjvRIvApPJIweOo/OQ4HctPyUTHGjSqhktpYwrPv2L14zF3XrgyySWRuV6bDXV5WMq2ifEpRdnqai9c1nqH6VzmbFlA0seOmb+DS5dbmjq6hRpp/huzmaLfBg/DcM0qmzXpkSpGQmebSWI1XiSXL2DRF1MSebt/AhautzZ7ub+PdfR+0jIKOISsctTyyLJqVTlXCkBjNjJOSMEBm6q2DzGceJve5pz4QjwounWXAqMZ34zHV1dV3R82O6j/dBKfUphsw0ijHXKpIGJXuAlG6ENBJDdPEb+zcNy/D/zfefwUYAPuVg89/pxfTAAAAAElFTkSuQmCC",
            iconCache: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABTFJREFUeNqslslvHEUUxr+qrtk8i3Hs2M5GnDhOEBI4JBISiYBIIJYTBxBSDkjkHwAJceCfgAvc4Q4SBzhEQRFiEZdI2EoQkE1JnEw8GXuWnp6t1+KrnklwPDPxZSK9dLu76tev3vK9ES+/9gZWLl7Ae2fff3O6MPEcolBLpQCNHf+ZJVJa4n65cnvmj++/+3P6CPTs4bHyVP/dsZe8G1+LlVu5e5UQ6ZSC1k8mCpoXAQuzCrvqtagEbPDRL+PmGQfV68uHPl9yruf+ueXgaLu/Wux8YhDoO8DxpyF/cvAFn7xK646Tp/zN4kcfLu99pV7WOP7iNKYtjTCK4hPHp35o/SRsDYSktQhd58dPqs7ShWvlz7IyVR0nT6nqvTPphVNYPPMWEkELrlNHaNcQNGntBoJOG5HfhQ4C6CjsfYgQIfQj6EQ3gjN3BItBcHqzeNsZJ09luo1UuHIe316aR6ftQvkdJNFGx+nAbbmwIg+uG0BGPYCVZE2wMFrtXlH7Bl7I49wn5/D7jz+r1s0deNpD1/BCHWd9J57SiVSuIDz8fWkV65s+9nPx0gLQLAN2A5jMAGsdnoqbc7SpOSDPP4p3gMACyj6QndqNvVNZ+J6XJU9u5x0lz34A1FhfM1mg0uKeflnm5nn/BJ5S6YzMHFhC4anr8DcfYI4O7efudJpGB+dOCCy+K2KY/Y1GvqQxxXc1ftgjMDTHjgJ4TJ2OIjmMt5cO5LIplFs+I6rhM1aT3BZIgYytkdEpzCmPPD3IUxN55BeeRSpbouY8QIqeZPhhczUtPrcHOHFWxPH/7bxGcJ+O832yrw0Jmh8G8Jt11panh/GSLKzZXBKn/QJkZQMrUuIma+9tMgtBGvauKVy0S8N5KpNFemYPZCI1oEvGNNPrNnsO6rYR0m2KIcyBfbj1DYReB8N4invWGw6kyuFoJoNnul0sCEaPTob7dqGerUKYGpeDPCksBZlMj5Qmb5MbPB2buYc1ZAIYYLWM0O1iFM9su1GvwkkqJHifp4UygVK6ycbojuRJ0+Om3Uepu1/TsGQ6NnMv5LY1/RN79iYiAkfxWG6ouS7qThNGUSJqY8RU3t1oxAwxgqeMl55dgQ7Dx4dif3FQB/76chEJkw77CsTstuFpgKZmHFMzLobx4jHG/ygAmDepLBSg8nlYxSLmq+zcqV7pDOMpv+WgtXaNAtp8zLlHPjA39xJXwMwhSvXG0UCK6UzQbvLkBA/hmWmRlEm8UJjAhCWxls+hygguz89jodlBvcp9uvUojFt5yoCctasEN3pNscWML4K5OXF4GcmEhUtyJU5NPK22Osi0Rh6nA+VhGM8Ec2Z6N2oH9sGj7FxeuYrItpE7/jwKs2kcopDf+fVfyk8wwFNsZXiVEnx2FjUSLr3qhL2rSUu7pfHDx6uxSKeYBpXtvWfPxGb2RGZchb7RLZ56kOfyunG/iHKliN0EbTR7TbK6ehmTFGr63mNagzxlijpkOBuksBw4Pzk1KCd1rrQJ74Yi/t3TYjwsWsM859oSC9Sc1+zhRKVMhA/DOZzH17ZZKwxPwDGdzey0eciWN5qntB+JWuEgPvj0HQjmQjCxSrAGXAacXcdQUNU70C6HvOcazWEXBjh4LIpToVnddr2GYmPdSILQvh4rT1WsPNylU5js1OP2NmENeA1ZA2G3zWJtsa6cuLbCbofP3VinHv4SMRFL8/S3ugp32yFca2KsPJFQ6qukJU+GYWQJIf7Xjy2NsP3XsMD2JjHpgvYifVlK6Y6T958AAwBjoD0Kglj//QAAAABJRU5ErkJggg==",
            iconCount: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAv1JREFUeNqElMtPE1EUxs9MH0zfL2iAlkCLQkkBRR4hBk1oYkiMduUCNi5cuPZvcGPiyhjXGHGlMTFBXBAlEQUkkUBTWmyaYm1REAq0A9On045nmlszYIs3+WUyc+795rvnnHspQRBAHF6vFySDRuQEJSKDk6OI/CbwSAnI5GpDXKxGNIgWYRCKxMSFeeQYSRNqilHEjQGxeocsw+pCvGExqohvscrMxIipQ8UFuEmf7R2ZnyfuTohRxJEoVI84kLbb11ofKgMvmZXvQ1P97WblxGXteGBu/RDAFiLbFB3mKrmRbk2FWEQRxH2uWTuqLOwxvliBj6R09haL7AKkQjCzoWExbkP05Of0WWKiq662ZlNfOR11hqQ4oa1JrwU+Bxxdn8FXM5kvr+jIq4jVT98feQqAVc7jbnYW4KKVbZi+k/CADusR84Od5tw5OjMWLvWvkHVUrZypYO0BGsJ08GmYWQfYTgF4XMugUS7Ds88AsxtYZhOUaGs5Z6WKgFRMIAHB+/rKI3z2To2+8azGAXww9jEeOdSNt37p8+1qOF2n5wPG50kli9LmhCru5O4Wldboug5XXUyOByXf02HXdrvd0N+uOyYCvNRVtT4TxRX3brmHNXW0DRSb0Is1u6tPOrpcbiPIEjBg/8FoVP7zaUEb+7TrXDxLrHx8PM6jgXLyIy8glgDmhtPnAD4JP8JBCG+BKcWxpjRt3QRwFv/nTPZ+Kbg2Ygn1TM6DPHzcuBNg5fywNdjyBDMVSjuiQrHwy2zQrOKBy5EtC6dzViIdnX28oJ9j6Jw8ug/wjRr8Gs007RcxGkkZknXW7lmm6dLzjLpTPE5i8xZqiYkB9qY7yxwmWTjIlzudG2w8UO9h2gUZE8V3PxJGtpEjsuafgy5+yCIJOxVmX/lV4SPBLC5a2ktm1dEdtUyhNr5FC0H89hNB35CptFO5FST3GU2uHfG2MBIYSQ8WyKFOke1xlduiVtMWJNbZU3GeNGn+dLPWEuMluaOq5LTC3wpKxx8BBgAeuiDOQ7ICHgAAAABJRU5ErkJggg==",
            iconKilled: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAx9JREFUeNpslE1v20YQhmeXXxIlUYodObArNDXSHoIgSJt7Pg4OmpOBBOhP6M/rsafeCvTcOBc7iBPHlmQ7shSJkknxY7nsu8IoUBUTeEACu/vOvDOzFGVZ0v7+PvEjgAVc4DE2KEEOEpACBQpae+yVbyPkAB80wSZogSrQYAa+MFOQseg3YkuhOmiDu67r3tvd3X2wvb39gxBCHh0eHgyurt4WRfER6z0w5iB6XUyCCrgNfoLAk70Xe791Ot930jS2puGUajX/Wb/X/+fNwcEfKI1k62O2rVfFzLsBdhqN+uPXr1/97lUqt05PP9JoNCLHtmg8GftRFD2/s3XHu/x8qdiiYiFjuVwVC8B3v758+cr17FunZyd0dHREURRTM/CpWvFpOLpyRsPJz41G7SSezyOt9TVnZpqhlmLLem1tbGw87Pa69OnkA2XpHMWUlKaKhJxTI6jjOwmCVrDn16rzwWB4gTMT7rKSLGbxGNTDcFoOh0OK4xlJKVEYSddRZGyS40ra7mzR8fH7rX/fHLzgGtf4/P9GwwjbUXydqyy3pbCpUvUJ5aJZnCwyJNS93+9R96ynSxNlZ+HG5WkguSJmuqPTNFOW5VLFDRb7HBsV0JrMcDuOC+uKlCoKjI7ijMS6mOYi5lKKXFjIqlKlqushsxLfNUIMkFKWK0QttW3bOZ8pma9iy+uSCRK5DyEhrUXnVZGRDa/Skovs8jRHGkJblhVxJ/N1sYJnZWbELAgJKSjJMjTBeNAQtEljV5amRhSlsML1e2qviM3BKJyEkziad5I0hkVBzUawyKzQkpIkhdWMcL0Uajbkkfia2aqYGcDL4w/Hf+V5XptOZzvI0Gvf3qTNjRY5lkNJmUF0cU5jbEZ4xyymbxK7GAwGf8JCVyn1NC3SR59Or9v98/O679cIQWgynlBRqATZfeYz2U2ZGf8mmsafIcLmM9j7G93/BSL3Ly7P7w4GV+0wnFCr1Tr0PO8d9oY3ZVZyBM2LJqKpSRe8cxyn3Ww2A4B2/GjWznltKfbNz3E5HoqzjPhHeMH3tspDmvFayG+1tPmfAAMAqEx/WbBWiOIAAAAASUVORK5CYII=",
            miniMap: "data:image/png;base64,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",
            iconNew: "data:image/png;base64,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",
            iconSetting: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABGNJREFUeNqsVFtsFFUY/s7MbGfvpfcWSyvVUKhFtFHCEzZNVR54IJKIjRhr1BjjOwmP+oBv+m5MDDGSGKMPQpoYBRM1Sg2JQCllWwqUtnbb7rK7szv3c/GfAY0EjS+eZCaTOef/zv9dzmFKKfyfw/i3iZuXziV13RiRgg97XrhdQTUnmvQKFBYD35vx/PDiyOgL4X8Czv38NQLfedazipMa054JPbe9atmmVALpTBLEyLWtWsmqN76tbix/0tbd+9Oe/Yf/qmd/p7wwfbpp9caVN5hmvJvN59qhJALXRb3ugEuBVMaECAN4tgPH9VQQ+qtJM3l8YHjfZyNjL6n7Orw+fZqVb1973dCN9xVjeR74UIIj8ByEgQtBG/uuAAhYSgkhJAP0XqaxD+YufCe5VKf2jk/cBRQ8QOg1xkmn96RQeUH0mPRRuDaP6V8vYmB7H3q2duHKbAGSgIeHHgVjGjQjAT9gHa4XnLDrlRs89M/HgMtXfzBrm7cmdd1s83wbIdFSuoLjuKhZFq7OL2Jp+XeUShVsaW1GEHAkEgnomkGqSEAz+y6dP3s0leu88CflEUCNKUgW7Xx98SZR4qjUqkiYBjzXhl23wDkDDwVK5SoEAWWyGbS0tsFyXFatOQds1995F1DJ3aRLC6GQXh4uz8yiSp0Zmh5Pd3V2IplMYn39DoHVaKNZmlP0vwM7d2dh2x4xsXsCLge1u3gYUFKZkQmhZ2NgoB9t7S0EHqCtdQv2PL4Le596AruHB2EmDHI+RP+2bdhO61LEQNc06l6kyea+GFBKkY86k4rHHbW2tCCdTENFPhoGfSeRSplEMQVylbItkW/OIpvLwNB1elgsAWUwe09DVYnjQICRxjMzc9golalMYWOzjMvkbj6Xx/LKGnwvoPUaCoXrqFRrGBwaQt3x0aCHQK17GqpFenlEMcnDEBrt2tPdAS5CFIubWFhYopgYsVHptInm5hyVSGha9E8gSnTIRcMPxVIMaLvOTLlqlcxEslfTtVizXD6D4loR5c07oNRSMaO4CNK2EyN7HkME0yAzihSltY0qbMdbIR8KsYac46LjeN84rq/8IESa9GqinAku4iM3uKMfo/ufRisZFFIGSSx4Psd6pY7VYgTmk4DaGU3TCnGHT44eDjdWbp5cXrj8fMBZLzM0tFMeo6h0d1FkMlmYqSS29naBTgXK1QZWNmpYXa/Epjl2fX7swKFTh45MyhgwCrOeav6x1nCPU1MfKl1rJ2+QNtPYtXMoooM60Wvr6oBlOQTo4E61HjtLZi4bhnGsq3vrb9Th/bfNua8+ZmfPfDFRshonUplcv9lkIGs2UY2AR7o0qLuaFd00PoKQS7tRn89kMseOvPrW6Zdfe+fB6ysaU59/hBu3lvb98v3UK6bZNM4D/lDDcTMRGDMYDKbXBecrARdTzx08/Gn/w49cmph8+5/vw/uAvzypkxRDruvvoEj0UaCzlIAaZf02HdOCApt78eibD9T9IcAAnaJ+kwOqUbEAAAAASUVORK5CYII=",
            iconSupport: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAtJREFUeNpMlFtPG0cUx89eWN921/h+aWyC4wUbohQRKTSqqjQoUtMH2j7x1Le+5CXqQ16jfId8ikSqlLa0apWH5KFUgMsllUkxYDA1dsAG1tjGFxbvpWfQuGKkn3ZnZ+a/M+f8zzAzMzNwpTEIj9gRB+KizwE63kO6SIdyQb+ZQBf2G0sXiYgXCVIGqaCFnCMN5IRSQ5pUVOev7IgIyUgYSbhEcezu1NR01GYbaWSznB6NmlYweP6hVCrm8/mlTqeTw3kF5AA5JTvmrwhJSBRJXR8amv4snZ4ZLZUi9o0N4Ox2iDx7BpzPB/VaTVlaWrr9x+JiZndz8zfTNLN0QyY3OjrK0diEiFBiaOjhN4oym1xY8PtKJWBPTqDudoPtwQOQ8ClJEqRSKUc0Hk+UstlgvdOpWpZFjtomYjYao4TH4/n06xs3vk2urw+KrRasVKvwFsUWj497mcLuRXG/yIqyzIqNBggvXzLs6mq4KIrOjmFs4fp6P3NejuOG7yYSD9PlstdlWTC3uQWL7ZauDroPwCWewn6pV6ydOg42NmJfnahyaGUFrmHSor3e5InHQ+Jc4Gmm/NjGbodCaefeHizMz8Of3e6FGovtMOHwWxwvktjiDuL/7O9/MlEu34rHYsKlf1otETwecjIXT+PlSyrKrdTsrL3jdMLS/Lyl+v0lFPodx5aREiIQW+j8gE9NKjG90wnxF+gIyyKWcpJxlh5T/igajUteL3Tu34fqxETbDIe38Tshj+whh8RbPMu2BJ9P5xwOYFgWTJ7vW4shYiSbNomkibhP04ARBjS0wxF2W9SQ//+U4TifgnN17JzpOmgsGQLSNVjqEUvTNOJw8IgSBDxeFn/lJ3ZBH8UNw1DwPY2MhSOR1MePH8uOp0+hevMmqKapEVsgGt+vt0qlctrI5cLw4gVMZrNSRdeHa37/JIoFWZbVGYYJBYLBqe+fPEnah4fBDIWgoiigvn9Pykolgjwt3EZha2t389WrdKxchnuyzNt0PflTs+loyXLdYbPB+MSE57tHj64FAoHLIK2urUEml9O7LtdfeIoKqVGeVv/x4dHRu2VVnXapqtMtivB5ICDcczqHa2637nI4WFlRWGcgcBmTTCYDv8zNQbFY3BIGBt7Q+jzrix11Ne3vlZGRX7vV6pdKPi+F63Vw+/3gbjZ5Bk1c2MbERiKwc3YGb16/hu3t7YIgCD/gWuL+KtHhabbIVVKo9Xo/ro2Pn+7kcl+4K5XrfLcLPPqOwfRrhgFnz5/DIcu2W83mut1u/xnXvEP+JaVEdPoJaFEfGW1Jqrfv3FnGToDeJAL1kQG6TuJbRyEy9wM9Xo3G3eDpLan11enl94EK2a7csiYd79ILsUEtcU59Zv0nwACopqbnHDzSLQAAAABJRU5ErkJggg==",
            attacker: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeJJREFUeNrsVk1LAlEUfTM6qYy6TVcG7lwIEghBiC3bRJt+gbs2Cq37F9p/CNE2irgJkhZGLUQGMYNa6IC6MciJdNDXufEEVzUjQQRz4TCX+3HO9c6bhxLnnP2FyeyPzBF2hB3hXzO3lSJJkq7xMIEj8VRw8cxEbjW8AtQBpPjBj6R0c/0EmEalbrf7zuVy6fC313Iq4jrlqAZ4sMIpW/i1e36/f+j1elk8Hk96PB4VjaO1wY3FYhFOp9OUY6h9pZ6N3zGaM8Fg8CkcDtdzudxBrVZjqVSKQURFLrpWF4XgMpFIsEqlwqg2FArVqZc4bK8ak7+AhPd6Pd5sNnm1WuXJZNJcrRPYEiCfRyKRebFY5I1Gg3e7XZ7NZjlx2F71dDo9LZVKxnA4ZKPRiI3HY6Zp2hypZ2AXuBAg/1HX9Y92u80GgwHr9/usXC4bxGF71ZiqNplMtHw+vyThTqfDTNP8QOqY5gIyAuSfyLJ802q1voQLhcKSeoljo1MN2/H5fPeqqhqBQGCqKMolvVbgSqycC1+CcB61BgEH8Z56v+W2+DnFADqpEbFeCr4LcBGLipqYJU4rRWsDnAmhN2Bf4E3Ezu1wyRvcdAPgEM23BPJFbGaHSHL+cznCjrAj/O+EPwUYAEvcy6pPo+pUAAAAAElFTkSuQmCC",
            defender: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYhJREFUeNrslr9rwlAQx9+LVpNMnfsnCOLSWQjZnPoHFNo/wL+hf4OjLl0zWulS2qFuLk4WyVCok5RUESEm5Mcz6fekllIpGEkQSg6OvFwe97l7dzkej+OYHUMkdiTJwTn4/4GL+25UVfWlVCoVbNu+jaLoHib/65MsSdJFuVy+FkKsgiA438cf33eAcM7jbrfLDMNw+/1+tF6vGQIgO6tWq4VKpaJ0Oh0B+0mqGRNY0zSu67pK74vFgs3n82+1LIshCZ56jQlMGZJQtmEY7ihtyxT8E4aabhT1zSZjNJY9nU53wASkp+u6DE0mUgfD6V2v14t+g7c6m80ouPfUwY7joKGN1V/1NU1ToBQPWQyQ58lkUoTu1JeOeTgcYhm0UgejcUIcd6vZbDq+72+A2wBQAh/fH6FmJiMTmd2MRqPXdrstttDBYMDG4/ESwVwlmpk0uZIo5ExRlLdGo+HV63UPDfUBWy2pH37InQv/9Kksy09YWp7nXcLHMrGP/LKXg3NwDj5UPgUYAFHjaDUOHPhzAAAAAElFTkSuQmCC",
            iconStar: "data:image/png;base64,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",
            iconStar2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABohJREFUeNqEVmlsVFUUPm+ZmTcz7bS0lbZQCq20tFClZTVUWauiQDQIqfDDhEjqgoa4rxE1cYsJMYqouEsialCDokVQVklAhNJakS5K7QpdhpnOvJm33uc5r7dY6g9vcua+e++bs33fOffBR08vhq9fWQHfb7kDcAgjZc/WdbB3213D+0GU7G3Pr92Icw5KCt8fHsIouTRkScS1IIAoSrQWaQ+FFs7Sez80cbb5OliQd0V+yeSCl66ZXlB3rP5cM+5pI85l/n9aW3x2h4hW0IAMqJCsy7ffNCP3kfVL5+DzFShjUBQUH0randVLVnkVv3/ljbOrac3PSNLp/ZrbZlWsvbE0jxu8FI3okUUQRBF+fH+DQx59VnuKLV04871tL9Y8hutClFyULFJSNqVwmSh5oKhwfBV3IoufF2x+Ys3GG+ZO2v7pD3+Yw5n4NxKvHySPApLsBX4gd/XGfp1xdcm9tZ8893HVdRWLca94alF+2bjczKnk4NisMUVzpl85g/YXzS1dvOvdxz+sKMl5qKOnv45HcdmQPb4ADAnh6ubRrD1Yd6CstKg6Nzd7ystPrn/zq+8O7XaYrTi2KTgOA8Fhwg2VZSvmTZ+4YEXVzOUpqSFvbKATjjV0HR2ByWWM8HDABD5noEw5uPPVz9NDwUzHccAykqAlYkxwbDoHxmywTJNZWtTNhNcfgvOdf0ZWPbxjNR43oQzQazwzTObUDHAAZU7NYH1jS2PlrJIFtqmBqSfA0lWR2dxBNMyYJerJGFBkoiRDY3Pn71wXYeXn0egoqvzGkytvQXcm67Y3xWKiYtrMl9SMoKHrAVJu6nEwEoM4q+AwTBVSnRQ7FA3uEfUl2QeWZQTXLStZG1BkFRmre2VRD/o9KhKrTVg0u3Dq3dWVb+WOy5vv86cCsccFx9JRcRJMLQaaehHnuJsmovtQMAx0LQGKPwW8gRDEw90QHtSBUXptitSBpG4f33O8/R6prfsi27m34XB+dqqZl5tZIWAKmW1iznXEAiPR1EtiWSZGYA0JGtF0E2RxqJDj8ThEVQPUpAXxhGnWtfS/+9oXDZvaemLdEgfIPnSitaWlreeP0sKsckV2QgS2SUYwJSSGacLZ9iT83Bh18cxMlXHPBqozokw0loBIzIAL4WT3N0f/fvbAqa4v8cUelNiwERKxoyfMvj/Y0LZgxoRZPokFCHQyZtGM4R87EwNVs9FjG0rz/aCbDDD3Lj59kSR09qqRD747u7mrTz2N+rpRIgS+xFkVIlbMK580c9PdSx5FL7Nt20BcTGAolkXpIYcFiCXIQAAyQh7MuYWpEsC0bIqAsFAKx4VKE7rVOhDVLnB2WQJvDTlP1yyqmTNtfI0Its9GPJibewZEW1JiWgyomUrSUEsicC/GdFC8knv2V/cgJDQLbEal4Zi94eRHXx8+t4VSJqyYX1yxqqrktTRFmE/sIUDJc8tmbnVSBEhrV5FbuZge0kOGB6I6+BXExrChtSsKmjHUeMmZFL8HZFk83vjnwEZ5YXlOeUfnhSP1g1odKvIh9XwYbtDvkwumT86cTZ6RQfIcbwRXARnWEfRwTIOA6UGnGDS1R07Hk2azRxKpNvSg4tEz0xS1ZNKYcoG36dEVn3ffqrIHiyekL0CuuywyTDbU7GTBTYmOXvdeTEIo6AW6kk6c7Tv6c33Pq/hKB0r8soqnH5TkqN41ZsLY1DLiPOU5aVjIf5OJgiBiClzPcY8hJiIhEPDJkBb0TuO6+v7Tu7Y/s8R0c4zern/5IPV7YfHM8ZMxRZkRBDaetIyG1v7dxJzi/LSbiU0URXNHdH88YQxOLchYjt55kRDp+Hz1mXPhFh6FcdmlpXgkUHxuuyBKe+ZOy15EEZwPJ5pqj/294ehv599u6YzswpQ5GqZP1S2n/XzsWzT0zi9nejdohvW74pVhUk5q5YireMR94vHwpm8Nt34rNyMw62RT39bte5o/4eHb2JdUZE+j3yddhWxq6Y9qJ3G/q7tfbd2xr7V+2byJ1XljgytH3yWu57dXFbtFtvqpPS4mt84vCIVjxuGPa5t2cwNhjpk0ITsllJGmVGIN7Gi/ED+Ae1Rwg4RFS0f0ZHqqd//EnFAS+1WUYzLk/84XlroPxPs1m/ZJI79WaHvE10hGVrqSv+b6op92HT63HI00c4D/92tFZljVLgUc995nIwF7/YFrHQGL4/7NR+gPan9Ea9d1+3FuQOWKnNFKR49/BBgA16N6CG73mTMAAAAASUVORK5CYII=",
            iconStar3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABU5JREFUeNqkln1oVWUcx3/3nHPPfd29e3HTvTpn6lzldFPDfInECJXMVCLTESYEGmkgqQX+U1BhFkUJkWFYRkiynCGIomtixdJMU7fMl23KdXN3d9vd3X09L7fvc/Yb3K0JUgc+PPfc53l+v9/ze3sO0cjHNorM/10gF6wFecAt/k+n0yQYvXf4f54b8UhABU7gADJvkllBFfgZ1LCizPnhfWKUMpVIo6xVwDjwMMgBPt4k8IIlr9Y9LZQ/xe8Onsvi9dNAgZBjw5Np+fCT5ncT7AIvgWJWms0sWDhX6KfHWGg2zxexG98BOp/k337ix8GC392xafV5jM3gCrjA4+01S+d1sqA00wbOb3phkVi/m/c7M92ljFJisoDzzRevr5w2uXT6tldW0e0LF0k309SeMMnrcdCJAzsp8EcrpZNxMosKy480Xi4/2ngphH2DLMOgMeIgZbhPxKEcfD67euqsfbu3kp6KUyIWQcoM7TVNgwxNIy0RJkV1kery0fc/nKRPDjUfw/RGEGZl1nKFU3M4K2ROTfEeSJvmrFQsTFoyRnoySqahc/TSUKRTMh7BT5MkWaEZ+W6alONe3tYXm8fuFRZpIC6UPAFKWZmIiZ1/q2lYnIwPUCo2AEVRglJqaLpGRxpb6NPty7AwTpIkk6w4KKFrZFeFjbQCTAcpoQB0CiUtYuK1uiU1bo+HHKqDXE6VPC67/NYH39GWtw/iBJrlou7eGBXkemhxbSmpUoqSiSROAUWKnQpK4ACHjLni+fk5rhmaZlJ90y2RLO+JmPg5DVeC1Qc/3KxWlBWQActCoZB8ubXN/f7+01M3LKuk2sp8ynKrZJUAiMWTMMaJmGRRX2+Qtn58lp5dOOnyV8f+ikFWAzgMemROQxGkO6C9/sS5qU/OqfC41TQCpKVP/dqaXZjn9C9/vIwUWSKJSyyNbEtpBtkVyUqf+sbrFEsYwZPn7lzD9BfgFBAZF1U4OFGOhcj5b9dv3//yod1r/V6njVwqGYFYkkzRHmC9zSZBmE7NLV10/U6YAsEotXdGaEqpL9jS3iv2HwI3QQSIE+kKC/dw6k4C6/btesbvVk3SNZ2qH8qLNDTdGNEYPjv8p3BXaEKeK7Z0Xlm8osgXC/bHjTlV4+V9DS3PY9E3oB8khZdk7jui+T0HNuzducxXmOtATFJWynqdknEjELZ3dA0KQ6i7P06BnihNLvZ3L5pZ1DMh150yccx7vShMuLCi2Oe5eqt3LtefOJlu46a2beOKR2sUqFRkG9kx5vmcEOQTJUF766+UhcKJfKt6ue9le9Uggnzb5VQolTLgvnsU7E+QbpjWHjvknLnUKbJrj43zumS4NjLqpPjNupqq0vFe2rznTO1HW+aLhCIZkRdCRCa9sW7m726nnQLdg/Tlj61/Y08H14aWUSdd4kiNY1S8aNfrowmNIjHNsrxvIGmNimIjwxxqsD2w3OcxsUbIswQeB/c44CMqPs4Byuxdgsl+NMPwoCWAQuG45SoFKavrQ23palsvVU7MIa9b2EcVLKtvrN6lZ6SOnZtmydyqAn9HV4S+Pn7NOopjQKceO9IY7kqmhhrlby3dp8HCFQvK7Yhf1s3AwBSuNwMtXhsWqoxx/Yr/Zuci8FDQwelYd7Wjb9Vdc8gezbCMPAnqwS9Hz7a/WD1lnDhJNfiJ3a7d79ISsZkAjoAd4BG+hCbyhXSlvDDrLsZWsJhvxGK++18HR3m/834fEjYOvthYy4tzuDOLbCsDW2ZX5osbcDu/u3leXMPj+SQlLMf2f75WmsAsfn+grxX6D99da3h84O+ufwQYALcjQ3kgubxiAAAAAElFTkSuQmCC",
            iconInfo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA15JREFUeNpEU8luXFUQPXd4t9/oHtLEWLax7AQJYwcnREAIIITMhp9AWSOxYM2GNTsW/AML9izZgBALghPSESSx20Ns2na3HSd2D2/k3Neic1uv71hV55yqEp/dXi6CPIMSOex4JoDzYcG9RJEX4B+U5joFEuSoOBKuVrCvJQ8zvtPz0zVEniodVBxdzhtPOqiJFPEwhuBP0jDXOXzPwQvp4OUYr/VCIygXko92Nzu4fW0OuPoq/t7r0qtb3vl5jiEdfv7V1xgOznHc2cVPP/yIxB/f6wtTm/h9czXAb60tvL8yy10Trd0ulASjyzLm9999C6c/LN/+78AO1QjNN8fdE9iv+UodjbqLB/8c4MZCHcJU0O6ckaaCSlLc+eJLzC3NI6hHOPj3cOJELi3OiOalKqYCH3+RTup4uPrGPBHtY7lhsH59YRK9d/QUp91DHPXOXiJKEkhDpWuRL8LAhSH2h+0eBtB4e+0Kft7YRsEELb4+i9j38eTxY7T3DnHy7HwsKx2NkgKyTCGNw9AVYehBMRuPdk7RFw4+/OgtbG8dwCQxlucaeNrpYWf/CJs7nVIT+zlKQSqlIaWAYXprYSiqES/THPfaJ4ilwbs3F9HtPUfVKMz4BTGmuFzVEyRSEIljHDjGQDtOWQ+1aiTqUwGSOMbv93eROS5Wr72GjdYOTBrj49UZhIEzyVDGgpSCFWqMphOiqRjEFCrwKiIKPIqW4e6jHmJdwa13rmBvv4uaTHFz4RK0LDAbuiwByRojnYLqCaGR08h1XXiei2ajKmpRgP4gRqt9Ch1F+GT9Ov6430aDbbB+YxHHo2Rc/kqxsAmnoMA5xr2SsUJj0vE9VwSewWiUorV9Smoebn2wgodbHUx7Ep+usWYqiqiorks9cjahZrqzLIdIU4ptBS9QDQPGEEX/+QC//rmH91amsbq2hLsPNuFEdeRC2RSDhhknisNPyfFMMHQiy3VIjQwDDQcj/HJvHxeygu6LnDSYpcI2KEV1mN7SltrY4hKlkzGlLE+QEp12lLA0kzgrM5Pz4eXmFDNrkdiDMqqw1qzAhGgUbOotPUW61kDyjMhExchxC5wNcRLLsl1kUVhhC1IqyugFo8ZpMiYn7J0s1xnPCBW+b+yWFDVCDNEfXuA/AQYASbZY3VIWOLoAAAAASUVORK5CYII=",
            iconSell: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8JJREFUeNq8VltIVEEY3nO2E6adNdM0DArWaqtVW0MizSS6vEQFXcQeBCPouTITJCLCegmLpLeIoKjoQhFLV7rIqll0MbK7Ursdz+66tnn0uBfXPbunb7bZWgK3zhYNfMzMmTnzz/z/938zjKqquv9RJow3wDBMrMZGOFTTACOQDbBAAOgHREAGFMxX6XxthhKKHjAEg06jIJxdbzAU2WX59agsvwmLovvMxo13R/7qRHR3DDWkE4TzpkBAyPJ6H5bjvM7WVmezoqhlGHoADALhZGsxSWJEjEwGZgHzgKkul3Wm3X5yWzSqPq6svL4D34apGxWyKeK+8dZLZigDmA+Ujo0NFvT0HCkdHn5l+hlD1pWePqvZYmm5ju4YEIGhSCqGyEkqJelZWW/vsVXhsExOpxNFfx/Pc3Jm5kQz6bvdgX1VVfevoTlEjI23HpvErVkA19NzdEXcyL17TseWLQ+eNDd3n8R6hG26nJy0vajK6fxxSzJDitt9g1MUnyH+4flzbxeqW0uW5Epgf+z7p08jxG1mGs+UWPfF7/9oT/xQXV3gs1o/t5G82rp17m5B8G9qbXX50XcBwVRZxyK4+ra2tY9Ylsn/4c+sRcd5fn40GBSfmUz1X+lJBJrAY5rJACPktDk1NbNXYfcNaWn6nF9mjFRUWBfg/yiJJcmjlOhNToOKBwrKy/MW7txZuDk/P91CR2Wa0reWLrXuQSONUpwkraqJDOr3EgLed3Z6Lp048f5UwqjhO3TVNtvao9gUMRChSa6ZDJmUTXNhTCHsxoK7UBfv378ob/XqGWtiC0xgN7e0lPVh7By6nlRENZdID2RnudN5tVBVI5XoHwLeHjjQJa1cme8HSarIRLh0A6puKkdDWvOIkaQuFtq2AhKUGw4Pr2loKF6OHQ8ABQbDnGh8otc7OpFeI5NTSViX19v2ON7x+cKOw4e7b6JJFHsZMCc+ZrO5AzQ+Ec15ROk9vampdHtFRV4Nx7GTOG7KBZ43TQ+FPDP8fkfMUHt7/0Bj49OXaF4EOrCerNUQR29Us8WSXVJXV1RmNPJmqDYbRSESdPu26D548AVRjzsULkocTYYYmog89f1oR8e6EtSnBgdDntpaW68khUjgOwEiS30kj1JRb5VKig+IiOKVeRkZxphCBwJKCK58h+ZlIrJxI6mqd7wQdskOx2mTx/OhFveRoNczmfX1RYspleXfGfmjxwk8qFA2EReNAiYqOZ8p0/R/8jhJFqPEtwOJFZGcKQm5Qq4Hib4bwgnSpfma+KflmwADAByiwbZmDJRuAAAAAElFTkSuQmCC",
            iconSearch: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAKXRFWHRDcmVhdGlvbiBUaW1lAG5lIDIyIDQgMjAxMiAxMjo0Nzo0OCArMDEwMJeg7h0AAAAHdElNRQfcBBcTBzGRmTTGAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAABAVJREFUeNodVMmLHUUcrq27q/e3zJKX5b1JJpPBN4oxBGMCCYp4CMaDIEJOHgQV/D/8GxQ8efDmzYgKXkRMJgQMQozzYiaTyThvmbf1+nqp6vI39qmpqq/6+31L4++/+PhoNJpEC9fUwzSnhHCdIYSm0QIWzyx54zAN0ryz4seLAs7AgZrDHa7JSrE7vz3sz2JYZZTABkYIXqJFgTGaxdlgFu8O5oWQo3mSlXIeZ62GY2gUkARj+vm7l4WssOH1D2NrnLizopwLMcv0Qj9RsZVY1CW1LCdUWqS0pKKRoIOoZFX5ytoKg88CyXAYnE6LHaQdKtw91W56fi6KP4ZD7PNGGHRFGUj8hJrEXx7PR8E82bpQh+kY8BwFyZrEjyz3jc3uB9evGZZFKEUYA7Egju7cu//dvbvvNVavcn3XdinDWRobGlNK0U9uXsIIN4dR0Vn/6MZ1zTSxYWCNYYYJY9wwLnU618+f//L+gy7XBK0SpJVFYlNRd0xyCJoWwqjU8vIKXGZwQ/dc6rqlxlOEMoUjIXzHvX319QDhs43m5rmOZWjgAohPDqcxwHOCp4v82+1tIQVRqihEKQWirKiE0jXiWJrrrfk+Ysz2fRAcIL3DKWvVHYKTmFerT3vfBNHdvf03t17a6qw1GzXXr/V2epPp7J/hYBzM33adF4gYhg4+ZYU4drdSKs3LEJNWkty2zR+zxdc//Qz6X7t6LY/jJI0PhqNzvv++Zx9ZNq4tCYQmYdq2yammy2BguEa6zj5WW4bxmZTPfXcnyz0lK8v0G/Xdvee41dIc1wEXLLMyTZvrOlMwM4OEUIhUhXPLfO55qVJtzjfKMovntmnKKNVfffmr7QfswsY7GFmuKzwnyYpKV9328rFdjOBSKGTxhedNGAuEEFKuntsYI6UrsSXllY3133d6ttZ9azoJRUGVcrgOdNlxqCnRNRoLSXVDaJrVtHWFwwoeSWVehMGtzum/B6NfHj02Mbm81l5i9H8QJgmoleYYY4UMnbs653bNsZomNTW3WVsQFliu4OatC+tSyh/+erw3mbRUBVZBi+il9RMI4VEiCXdNiBdSnBtFnmlML/I8y3IbhMjy5SIvOX/WHzydh2sa5XXdMw3WcE1Qu59VSRpJmSeLrOznpmW5Ng3DkFKtqKpS12snWx82G4M0f22pqQ6eEGxAfRl4DSHzTPvRzt501Pfs47bABgh5bAQhMJSlkQOdLmX5RYXy8f4uwjd962AcMqj+cdGL4NMbnY32if3++Mxqw7C9aHY0CRcaI3WbE6YRyo6m0HUJvxGD0aMw7f07ZXkpAd9tL0E/HvZeeJbx65+7ICY48Ww4v3h2teFa/fF8GmcgL1TixVEIpCChVzZP/geRJSzu2YducgAAAABJRU5ErkJggg==",
            iconChat: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAPCAYAAAC4EqxxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA41JREFUeNrkl39oTWEYx7/n3t1rY8yw0a6xe8eda1lMkqaw/OF3mZQUkT/Ijz9WU6SU7A9lbMUf8o+lKBSh/NhClmnNlmVk0YhZ2MXYZjP33h3f9+6913GcO+eMojz16bzvOe/znPO87/M+73MUVVUxWJnpdg1auf55q4K/IHGRxt5CBfNHAa+q4MjuwYjWOmSO70ViCBnNCcjyn0GguxEBCA8vqlWx7J0nV0g1aSaZJI8sIQX4ByRO21FUpA5NwFaPig0zRmCizW9HD5xfnsFxKxmOYgUfa0Lo6zOw85aUkFKuXEhzv0nASCjntZAUkbExvsVOFhEXmUYaiZ9Ukq5f+GFaN+pwIIDRLheOLRiFlajhjaf9dhKQFJ8N32IvfHM6ULXxAVov8oE+lEvoaMkA4SsmoYSOi+5BgyHbyR4yzuDZJ3Kc7Cah39W1RZ5keFHoXU5n3eykk0Rx1yHtpLOVO3IzdpR5MdtrEMalJiOqVI7XyiFyJMYHC0kiOw30BqcrkpagqQv+z6LZRq6RZQTjyH7yUA2gUw3y1mGU74ro5GakqWRTpG8GMV7oyb5blSKjxhCN5GtsuVVrEtaNhvSTYRjdwmtKCpA2D4hvQZtakfPB/nXtlPfwhDdpNxmDhbm6Way2mDeqdSsQnXgTkmika1ISf9jD3LahIPsBtj/HA+2r0joDFdvaUs95smhZiZeDQ0gaojPUbPHF2vENYouLEy6cNJWfTyrNRLyUSchQ9xcS1Y06XMf9/IHXN+Q1UhFK3pSBrUvTmWeVMY392zqNfEXLO8CnNZYps7FZydT1l5ETIssOsMrCsTWkJ5buQEe+Vjfq8L3HqO/2OWf1ht0SR+c8u+K229UVAD1EO9flVbdY4VOXgWKtwTyLDufp+mKOF5PpZB2ZQETqbJUrc4bciWHLsm7U4fYyxz4cnXweDp9TQU54t0IE7yQyi44m8GB7fPWso/P+Dd1Ll4hzVnf+xqrM7LII0UuWzLhTyQWy2sIEWtK1fd9Z6nUcCG5ROlz+/kkaDjhlHHtEt/YsbA07bYjr1NkokEWFGSmMUXGJfZgvjxfGVPjNpitcK7rfK604JYjmnpNq+dO7ylzPekwOTkFfwIn2F+/QVH0JHcFKKA5WLYYlcJEsKkqNVlqubKTSMpLTpFZWSbfDqcK8WNJV/vDPg+laWvPzIMLpkUxANy1+gmVd5X/7W/omwACxMr4C5yIs3wAAAABJRU5ErkJggg==",
            iconClock: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+1JREFUeNpclFlvG1UUx/+zeWa8xGOPndiJE9dxGxcUtWoKJA2q8sDSp4DYHgAhBHwUPggfgCdeKlQWARISBVpSitIqOHGSxvFuT7zMvnDH3EhRLf00M9Y9//s/5557mO3tbTz3YwgyIUXIE+YJMYJN6BDqhC5hQnAvBvLPiXCECEElFAkvfP7pR1/KIjtzWv3Tvf+4/tVpZ/QtXdci6FQwuCgWCgkXHIVCq4SbHBNkWs0WV3vWxWSib1ARlsaEDscEh+Dz9E+eppIlXOJ5/vpiYeHNzfW1im2MrH7zUOr1B57MuyU+Kb+tja2o5wVhBlVCkzAiWDy1HKVCKyklufH+u299XJjPLTKBx83EJaSTCSxfrrDpVCL78MHD7OHxSXEw8XO9M+N76jKso89VKhWJvGQI5WhU3vjskw+/uFxaWJREjjVNA8WFHPr9DmLxGF5ZW0ViRkFU4uPHRwcVlouYluP1aaoGS9ObE0Xx2tbtzfcKC/n5CC9geSkP1tJxclRDPjuDQjaJk9o+VCWOrVfXUS4txXy9/Y4sCi+R+BwhHqaZCFtgc/3m66tXl0uOZcCcGHhWfYxcjqxhWDBE3LQtmFYAhhh5Wm8ik8mA5zjFMEevgZH+JhqNc2fZUrFwnQ08WYxwyGUUyJKM+nGVCHdBdgdDNhFggYtEsHKljDtbt5BOpzDotsq0TLHQWVizuOfayb6mMdrZGfjAnaYpSCKe7u7g0e/3UVoso3h1BYLAo9ft45+9AwwnJrThOJ7ITg9QZM87tt9t+6NBFwLHQE3NwHFcyHIUi8UyLEaElJ0j58bCs02wpJksQ8doNIFlOz6VCEJnZnga7W5HU6JCdHYuz+zuHyEtEtHZWXgshxev3YBuOzg5rUP2A2g+CzWTxmisgxciY3q1bJ6+tHXdfGIO20qz2Yr5nIQ3bt9Cr91DXFXAMwIC0iaDoQY2peLrb+6i3uygdlxHUs0dnN9VlnZv4+i0d6+t2VVdnwQbL6+hfTZEXxvAtSw0221Y5Dk2bLI9h5XlJfxbPUTACloqnfkxjA91zp21hiN9x+C5aMcZKewvPy05iDAZNYVYyiCl4jDQHTQGI/z61z389scOTNOc5AuXvouI0gN6X8c8HS0a4dBxPfIteY92ax/IIndlPMzKjUYDju3CdYlYq4O96qEvilKXCP2gpNS7JG6fpjm9mx4dJZ3pKGFYW0qofdMYbz3ZO7hhmFbG0HWJ1N0ThMhISWdrqpr5WZKjoaMDmuJ0cvB0Frk0Xf9/p4wmyokjQji7FDrjfBrUo5MiTK1Pa26fjyBcENQvCHfoVZPpiApoG02oaPi06Pppr/0nwABCMa7R/XpFcQAAAABJRU5ErkJggg==",
            iconUpb: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6BJREFUeNpcVN9v22QUPbEdx47TplnSNnaSdm1hDMZDN2CAoLww9oBE33jiCal/0SZN/BlIqHvhAU0CJgQriA5o0q5DbZw0bRonTWI7/sn9oi+Sh6WjOPp0j++553w3Fccxtre3QU+KIBIEgsSRJmQ5FH7uE4YcI4JHiMELwAlYoUrQEsgR8oQF9v7J1sc3Hcee/Prb3vf03+QkISFIkkm8sEAwCMuERULx7t333lIUVbftcW5r66MN3/Oig/phMBwOn9C5y8EI4xkZ62qesLqzs/N1GIa1ZrNZWlmp5u7c3tQLhVLasizsPt7FarUKvbz8peM4rSAIulRjccJXyJiU6+9/eOcrMSWiVNJxdtbE/v5zeu/iuHGEBw8f4YvPP4OmaWue590SBOGAz5LNLhL+J3OpfvgcPz19gmG3B9sewXXGEMmaSlXHu7ffhigJiONQIpk1PpYsNwYzMuakzAg9P8ThcR394SUWcvlpsWM7UFUFN99cB8lDLqch8H0jQSYlycCdEfxggotBG/3RFfLaPDIZGa47gSCIWNINpOi3eK0EURSKURSVuCLWSGpGFvH8uKlICsh9mDQvKAqMcgVKVsXloIe12nXcv/fp9Ls3brxejqKwzCPEyIQZWcjDZ4dh0F1cLKBlniIKQ3hhgPNuhySIoDNsbt5iEjHxvAyZoPPOMsnOQm7vqN8bDUvzRnR+1oXvezS3HDySyRwWRCL0KJ9SBJEqSb7BI8XCLs3IAk52dd7ptjY2NsJYdtBuNVFYKGJ9dQ2yLIFdvZ41wPJSmdyt0NzEWdCn3SVn5jCyWm0llFVRPG2/RP3oH6jaHMI4gmX16dMSHOp2xahgXsuxiCxGcbTEu1OSMhlZ73d6mqedztgdx/XG39OxRnTsxyFSpM267CEtp6ed1iqGQXNb5TIzUqIzJtPap2fi2X+uV98oXlp9mVKOuayGg4sGWhMPbbNDOVPQeHEM23Xjq751f6Jkd/P5vCglMjYhDAjto8OXz+699sE7Deuv0mBwBbN9gb29P/CCCFqtNtJpyRal9MCduGoUxo8L17JnLA1JMmbCmNChMB5l0rmTbFYtfvPoYernp7/ANE0/Lcvd+Xy+oWW1OjlrjsdjT1XVZ9R9mymTEjcg4t2xLXBSXNAvDvYb5rc/flfy/OBc140fyL1/qfCEztm2GNCFZwuyz4xjM08lNu3sws8R2DWp8r2mcYP6nMTiW9blQfe4qvA/AQYA7z2lEDB0G6EAAAAASUVORK5CYII=",
            iconMoti: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0VJREFUeNqUlMtvG0Ucx+e16117/U5ixzhxQo1MGypHFBOCOJJjkLj0VAmhihy5cOKf6aVHOHBqORYpAqHSoBYk0kei5qEm2LHX3oe9j9mZztCxFIkghZU+0mpW+53vfH+/38DNzU0CANAVGnjzRIJQEAsScMlHCqUFBUFekFE/jwS2wBUwAb+MGFJCDcH1rz7sfHMT42/F+zuCObUR/j/Oyhih5pcbG7c/YMnHDx498lKr7d0QQOnQF0wuOCr/L2f5rfWPbnUK+fXe74/h2Pet1KD/mVi/IpgVZJVDU6ErE/AiZ6Tre4H74CfA9/cAiyLIu90GKpXfZwD2lCtHuZHvY+VWQs+L4VarVTsZjczGycmq5TpG1OsDD2PNrczmKcRSLCVzbVTmlq7krCV7PAkp51RV+l9i+YjSLEqnF5quVw8nYwiDEIZWhgS5nEEZLzTn51e21ta2Mvd+bD/W9WcUIU85C8/nJzOzRe2PHibJ9kDXfZzJgCJjoLV/kF3p9iorpdK1rzc+/dza258/2N1diTlvi3/mBZZyTRSIqF46pYy9+M0w/moC0HmBETDDAF6fjJdri3UEn/yBD+/dB39HEeGusw5K5X2VI1AZyuNG8phTh/oAIUDH7o1BLqs9zVpgZ/Et/CuNEN3eBumXh2DIORho2IzKM6dKSE6MgRHUxScmxbgqM0owBua7zeJe2lx6bo/8oeM6vuOduSnj7O04tnJhiEPGDLtajRmEZqdeb31SLq2VxuPyQZIcEzUuMsyzhPOnXS+4Syg/qs5VhYbhQAjTIu3KcZyg9nC0vO64eNZ1Fmbaq/VOsVg5/v675OeUfh/UF38hyi6d9pLrjUUG8LlhmpoaJTmvtYeF/JDo2hcsDHLpnZ1GE2HU73bBDzS2XyLMhZA5FWOqzEwF2lU5AtX1PV/T/CdXW5W+Pbj5iiawFk3c5aGtnTLOWdX6p0XIuVmjqsNDleE0S02tRT0rN4GWdVAI42JMSHpQi696h0cLXNf6co7JBQPML1iT7SMKBgIOUC+VSs3ImdaXG7Zp2zcCQp7JfiWXuFmmESSqUPKeeyWH/zSgf4Jr793R3mzmkEteVYkSjZSgc+5mRmpO49cCDABebWpp4n76+wAAAABJRU5ErkJggg==",
            iconYield: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABBJJREFUeNpclFtv22QYxx87tuP4kJOTdG0X2qrQoiE2DlpXJgaTAAk0VdoNF1z1km/AFR8IkJC4Aa4QIHUCVrYO2q1dD2mbpkmd2Ens+GzH5nH1RqqI9JPt2O//fQ7/96HW1tbKAJBHZERAMkiIuMgIcchzSoyMCel9Ald+DFJF6sgsoiBZxEMGiEauqaBPNkixyXN4VTAVq99/f+XLaim/kqHGlRwTU549gu2d59Zf+/pPoijtkQgtxER0pEuu6X8BifRS7Pp8febTLJuRXFPFHCOwbAu8KMn5rvWRLOcX1r94+HpXVcfNk4a2fdj5BtccIQ2kTTZIox2nYqXE7oBSysKfh1uwf6xCo6VDGIVQlQvlxbnpzNAY1Xq9LsSxrwhsvJ7juTN14P3AMMwOrm+ScripWPa8a8YyjXX3R8AmPmSoBJwgBNuPhPN2R5AEDox+F16rK9zy/NRSs6XOn7b1RJILPK7nSMm0zPLy8qpS4O+ZTsg/edmB064F3aEDxsgDrT8E1zJA5sZwoRvw/c+PYDTswddfrdOfP7w/t/ficKk3cC5omk5r56Zit0QuXl2eyuQ9U4fYt0AbWuA4Lry1UIaP356FBYWDeonDesZQnyrCTE2mJEGi77zzZun3R5v1KMm8RLFhmubguD1sLFaYWZqigErGsDRbhLuf3IBaUQDXD2EOBWqFHDy4vQAjN4TG3i609hsQixW4++7Sq9/+uPlepVo9ScV6jj/e/Hu3teqYfdbBjx/cngY2mwVJFOHezWuX/ozRotE4dUAElaIMh+c6bD09gESq0a5j3UC7SqlYl+Oyz3ZPOk9FMO/YXgR72NGYosGq1yCJQ1icLkM5L0EYJxBQLJz0NOhbATzeV6FQDMB2HM73fTatWSqYZHOS3tEdxfGj7HSBybGYc+B50LrQ4aCpQlsfAsuwYGDkLJr+u99ewGlnEHcH9iDLi08kSdpkiOla6JnMK/MLsW3bH/Ssi88UKZJ4LgMCy2CKMewed2D76AJoloMgZuFcM8ENktHM9WvPZFn+g+f5NkPOYT8tDLY4xhfuhWrx7YH2YUX0pPmqQOdz2En0oRuOod3tg+7EoBvuOF8oa/l8/jHyz8Rnk0kwmRSWIEptP2Z0zQHqrGfxYRDwNDbaxBRNx4f2wMc2cF3s4EaxWPwVgzhIzypD3DsmEaYTIKIoylMURSuVSjuO49xsDvSVpmEslrKRMrR8GNrxqDpV2yoUChtYniNy6F3myjiKyViJSZQm7tjDwp6JorhjmuYbak+9ZbnRHC+IDUztF0EQ/sXvVDKSoqtiE8Hg0kwk5bSeGGkHozjCxRuGYShBEIS4yXN8d04aeDk4/y8GJNXJJI2uTFyNZVm+UqkwZLFDIvIm8+w/AQYAA2L5OdadVygAAAAASUVORK5CYII=",
            iconRate: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA85JREFUeNpsVNtOG1cUPXOzPeMxvoHHJnY8JnZtrECISKpQVEVFPKSRaB/6nk+I+pLP6BdEkapGVaVWEelD27QPBSyVqA1CDUGQggW48f0CnvHYnrHHnu6DjiuKamlJs/eeWd5n7bUPtbKyQiOEOIAdIABsAJzrA3RAFzAAUOQ9DETqI+A6YklRBPgA44AxQoaJTgEN8oxzDgBPyDRAmxD9S+YETACuirw/PSXdXW6dWUKperSv219nIJ8DtEhnYnz803u7mWHUCmw+5scbx6RzNCLDnUxGgzeXUqFPPn/zUrF3NOi8I31ULoiLwYXfvoD6GWAoOgKS1Zx6lC+9OImnG4/JqajLZFLEt/DZ8yc5e2n4Xckn2ert/aXpttm/IZT5xbFgdw9rI4nzH659dSzw7+18Dzz42EOANSKjiejuTt0TPyltocisduiJnNUCqWoJl8+qw/ehHgWEjYr8scavH12Jc7sQGwSDi2T4RzXKOmJAW85GmTgxdZ03GYpHFH0u+ETEc3fh5c91j1euviAaqmQw/yHD7FohX67xlIzUg5kIRwusw4yHdCuPRDeDJyb0SsnbCruuhGK23QskI7sw+Jkl/1JrGNs/9VDwQT0rJZRsMrFjbSBTeKv6IkzeNbgtv1qri2NTReiKwz50ERvR5HtsEwOTKYCiO/F21eSK7fK71nJz0BBEL1VJp/wHoLFFK9enu9xGO5nissSPFrFUEzcCqOCJs8R4VTwZv6y2/DJag/c9EPsh5QvYF++82TYEX6zxCnKeoHsmLksfpNQ6YnO5k6zKbD5jhNbOyBoGEbNPWnYTE+OYc/RuzKnWRjsRVwp+x9z0pP3+/No3RdQzhkhwXQmXazfTkaXMI2xemgjZJcetkS5x+91rE/dmN39ouFyxLBadCjrvJJ9/uYfq4pND562vM7VqRe90O4HyIb8Mde/IGlgDk3SDyNLz5ml4XuEyajBunE+wp4qiZv2FIknmHWsbmPItpcTAumotTcYajsgQGbONLP0YbMTc9q96TAzn1iGu465bzT6yUwE06LFYHhS95mctWAITtfEmDC+TceRm4JjWzP2qvnkanbb9AvHfeOHzpeMjGwogdW8h4bXNTtQOgiEV/Yl8QWYL24O9RHZO7tQX0xs/FhOWf38VTpyHVA8f2xC2nnVp6aFW6IUqq1yojZ4iynvwOjAZ/gN3f5EMkcXVc3t9q+/+/enVJPctxAUycc45WdRkd62Yz/aWDbMpSD5qPxwL42vqBJNRcNNeXC0H0cxJnnFHHTIYmtjm/y5QrKn6jwADAOdNghDsOz2+AAAAAElFTkSuQmCC",
            iconItem: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1BJREFUeNp0VE1vGzcUJJek90O25A9JVpQYdZLC7sUoArTJJe2tKBrAKJD+xl576KE99VQ0xwBBkIuLtqitRLEcWdZqP8TdJbfzNlRhuCmBAUjucjjz3uPjx8fH7MbggHcDtYMBrMN/hryxpoMKCIAICN2aiDSQAbmbV27/g2QC8IENYAfoA9uOlJTEwDtgAlwBKVBcJ5TOlnQqtoBhXdf3ksXi8yxLHuZLva2kLDbbG6cbnc4zW/NX+OfUkcbXVFpxeHhIJG1gANwHPr2cTr+dXl48TdL0bpZlO4sk7Z9PLj5eD+WDqNXSdc2Fc8KdMrsi62JyGzjUevl4djX75u3b88+MsWSXC+FxKSW3kBQneRD6qg+yrrGmjX3jyEhZSfZ6wMFsdnl8cT752jDbLcuKpUnCOOdM+YqtKcU8z2MCzKPxZH86nX3Uaa9/cXs4/HVre+cH+o8IpTFm982b10/iOP6urExgqopZaxn3OKswL9KSZbg7jELWaoVMreH+2vLJZLq+iNOvDg5q2+31KBmpt1gsekk8fwzJgbWGlWXBqqJkNQjoRo97731A7VLrJkxRFBAh07qQo9HoS8T1AWXfA0nOhTwBiY7CoElxrvNGFbLagMKMWUNYFBVTEraFADi7mi823k2nj3CsK46OjtphGFVZlt8CwXYURbIsS7bMQWgMex8O3sSMUJaaFVBIhKR8hX6//xtlcw2jBEmWptluVRaddrst4Y9ZY6GkwLPgzFiaa2xzqOXMD/wmBEQUBH7c6/V+oWxeUs2EYejt7e3Zs7PTp1rrTzY3O0EYhGy5zBt7FjGig3JNMSlkU2BKSawlYhj9QQUs3bOgUQdBYO7c2dPj8fgJSuNISrHVarU42aYMX28FpIpsS6n+HAwGP2P3nGz+W3TAUil1BZuvhZQpsufDpkIOpIfTFJ4mftyzyIfGa3i5v7//ve/7z3H2TJycnDBHaNzDzXHjHIpGIP3L94MLrDMoq5sqF2IOW78Pbg1/Gg6HP6KQX2D/bwoXv95C0NuEazmr90pdowebu2maDpHtCMqXuGiMkhqTNddJ5uSK/09zXJFSS2o5hK67WNfTKNaJm1OIrPxAw1zFcGWbGuLMXeDd+F458qan/SPAADZkjTT769JCAAAAAElFTkSuQmCC",
            tableBorder: "data:image/png;base64,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",
            iconReset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABB5JREFUeNpMlM9vG0UUx2dm1/Z6vY7txE5cE5yQQOymMSERJGmjSFBVSqUgAVJVoR44IA4cOJdzVfE3IBAnJISK4FQOICSKhNS0KCQqpGnaJnZ+NI7t+Nfau17vr1nelHGVkT7aGdnzfW++8+bhvwhBRBTRjeVljBDyAUEgDEQBBQgAFNCBFofNTcAFPMSHeHNl5cUckIE4MAy8DAwNG0byWTBYhXkTqABF/m0AHcDmwZ4LsEEACRgAxmVKZ6+Uyx+NVasTgmUR2u2iI0KO1lKp39dHRu7woOwULIgGWCxDIZPJ9EQjQFr0vJlPi8Xr6Wo17bXb2G21kK3riBhG30ilMg0BXqmGw0VNkjSeld07LhMTuTdJYHJJVT/MFYuTLghQTUNFUdS3EolqJRyuEUq9uKaNnj0+nq9EIhtNWa7Dnm5PkAn5gT4gBbyaabdzHgULXBcVIpHqdwsLmxTjPULIMfxujJbL0fM7Owvvra/fuD0z80k+kWCCArOKnBJjmaXPqGrUsyzkQlY/53JPPEIOBEHYBrE89pHKYSq1fWtp6cut0dGvLm1tXePmk55Xvvf3999+yTA+LoliBJ+cCFang6qC4E7t7qZlx4k8ymTyx7EY+XdOvTL2UP5NafuMP86du+8gtNlnmrQVCDDPEPMstB2NGgbG4oVCYZnoutj+v5iIIwjm3fn575uK0mor9sTBlHFVlbrJocPArud57b14PG+KoooxZjXnCNlsVoZF6ESWcSMQQK+VSmfBUdxQFO3O4uItOxhsOIQmd8+b18wgDdX8+iDuUhRt+gu8NFQQZpfgsrMSEHPAE/VRKnV3I51epWDlxuTkT6YkFVzBE/YW7Q86MRq3XBsZrokfjtUuFVLqmyAiAYS/Ao/AAuenO1mWKhhd+TOX++FocHAVjF41BjzhYMF5FxRErDuG4UICDkWDZamyn2gu/Z0tvQMimF8AZhcQKMX0i+asq09tRB9Yomj8Ojf3Lbslf4XaqRLdgLS1wxXrgmGBGBwx9zR+T7LEX+A/a7z66fPM2C1MrUV+rA9ZV+9drH1eTHVetzwv4bruKKV0AjIf355ujVXtpg8ZFIVUQQOhJ/yNNnnRur3SsJSW2MzeV24+mmt98c8b9c+CWbHZr0kqcbGvJneUE7HVh3QIblKUaCg7sOcpF1N596CnnxMO6oLdf+TfbMidwWbEHNdDTrQeMsIt3AkgC/x1PSR1RW12N/mNSMkD2HPAM7N7bYiJeXzh+m1iDh8pj8OqeNzx2zETOZJLXR+LO1CX9t7aPvN10PIxn/aBGs/KO93DLN5G2Lkd1qOSJbkJrMM8pslWv9Lx13lNPQMO+bzb62O9IRxcj6DxxwrlQl3e8FQeuey3hTx8Czwb5lO91xRvX97zMjvRF2L/CTAAXkAASAqjjOQAAAAASUVORK5CYII=",
            iconFavorite: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAB3RJTUUH3AgMEgAGJU9QpgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAACBUExURYxiRFhBL29ONoFXO1A4Kap5U5RpSIlaQrCAW7WHZZ5wTTMkGRENCigaEx0eIi8yLj9AQjRJMTZ3LkxNSmlIRLZRSslPUUCJOcdaYEuSSTyDNXGudbVHO4a8iXzCiXu9hEwZGs0uMITGk4wwKcYaHLIWF7YsLc4eIpocHGYaGHEjIsd0iqMAAAEaSURBVHjaPZCLkoMgDEVDQLACorhFXWu3yqOP///Aje3OXmbCcAh3LoFTAxJASoWSo+Igm6oCFIwhLSaY1kJoOjJoUBiSNf9VcFBoze1R4tPY1+sDAYBpm0nhElIJsTWGAVRcx5xSSNuU8yM8388l1yXdSemyr7EUZxEBUZft0P2875hLpxmZ8j+4hes15iIsRQK0kQDB87rElDvDKBLTt7CFdV/XZZnn+dsyBE45LyGs15+DjaO3TL6hCGH5tHnvDcrD07Rqmqag5lE43VuCnGnTOklUzd/OOYokKSd1tt3XOajR924YLAIoTlNoW9e53vt+GLoDAurP0OjO2mNTCFIIqGV9qmjkdd1QbehHDDkH5Ch4JZU6/OQv63MYCIpCoiUAAAAASUVORK5CYII=",
            jobBG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAB3RJTUUH3AgMEhYndb71LwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAAtUExURQAAADIhGS4hGTgoJEU2MTsyKyoeF09COxwXFzEdGyomI01EQi8vMRALCDo2NSmSYl8AAAABdFJOUwBA5thmAAABG0lEQVR42oWT23LDIAxEWd0A4/r/P7cCMw51gOohMwknuysJQhgqmRnBP1KYlxmeMpsBhMwsXsrMM8gy/LwUUSkxCnPGiwFYSzn7t+MqUTPyGNOJGM/xP1dRZPrEJnDht3URzo+XOTHp4PowRizHbAoXg6zbiMwnJdQje9SfOXIocCdZiYSgYJdJnmRFhMPHnFrYJVLTkPvoBlFi1LHtEN9+RXSNsB87sjM60ZCdkaugdhQ3WcDekf2D2H50iZFTXYCWjUjbI5ZOLnLfEkDiSgT3ZSTvacqwZqLQZaZWLBnPjfYJR/0mcF+obuU6f1tPUgkafnEvGSERHjVaWd2VU6qsUh8s8PVufF9oz16lPfu3RjcbazHNdkZv4BdMigWtQvNdCwAAAABJRU5ErkJggg==",
            button: "data:image/png;base64,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",
            jobMode: "data:image/png;base64,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",
            arrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzxJREFUeNrsV9tOE0EY/vfQA1CsUqCcJAZDQkzAoARNiFdKNCbeeqEXmpgYE1/AK9/ASx7AV+AFNF6YoKGAjYC1FLFVeqTtbts9zoz/lilsGk2qCCTK33yZ7s50vu8/zL9bgTEGx2EiHJP9f8QndmQmcIgcznfKwTgOxWRO5kG0I/z82kKYfLQ56N8U0iD2Ppq9+kTwePuyFePz/JuFD3hPQ1T5qHEhbjHkIEIaYQ6M9ofG7lyZmA8PDoWDoV5SVCubmXxh/ev3dHRxNba4tZ3d5kJqXIjhEmK5hLDfybET4t7Jc+FbN6cvznX3D0ltHR04g1PYUimloFaquXSusL6dL0Q3UulI5FMixkU0oqJzMS2lR+CjhOhEDM+OjzydHh973NF5CmSPF0RJRn4BiG2BjaCEgIT3mCSrZbWWyJXKa5vJ1MqrpbUFLqKl9AguAU6+TyNG7l2bfDHc3zPj9flBkmUQRRFMXQdD19B7Ah6vD5w5x5xoVJUyBLt7iE5hcyMej6XSuZV4priYVbVvuERFKHzUuAgqNHnvQwz4PfLkg+tTcwG/L8woA9syoVZRECoQy8IoSPVoMCSlDInLJegKD4C/vR0yya36esctg7B0zabLJmFvqxZ9/XHHXObkRG4KvbOe6Jatl9RahmmVsFLcgYqigIkCcAMgmHPB+XDJzlPVwjklmQQZbyLRflIZ9GGSJ3G1GPCIZDzky0cLRrxxnMCV5zZE1+3LY3fPeIWJTDIFqmGCZjPQyS6xTXe35XVXJ0EuaJMFkEUBVJN8wWUxFLqimvS9YtIELinxcFd5we0Ri43Knjo/eGMo4LlfymehYliAP4SqxZyw1b0mCLYfHg2vE7hkHTdYKZv0HUakxKu9xitdbyqweqXvNRCnsM6GghdGg55nmdSWZFgECSlUEDV711tEAT2OY2lG0cuIZtNV19muNR2pxtn+aaPZa5k+Weq81Ot/XsznuhwiJ29FgyTQixgSRDHcEfQ6+YsmYrrObktNpEEszvT5HiqKqud18rKgk/WsRpbQu1LTuTRcJA2P4E9ap+DKbweHxDc2Wg3bQR6LkguME9iH/Wg8sX/8nevkL8xR2Q8BBgA2hPFRtbbr5wAAAABJRU5ErkJggg==",
            iconChatSM: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AoMDB4YZ3mPAAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABeklEQVQoz3WTvW4TURCFv2+DiFIipXbWCgqiySP4Idy6oEJyCV1eIR1FXoDCUqrU1JFQHiEikrVri9KioOAnEhwK3zU3KNxm9/6cM2fOzEi1ulW3Bxyr0yQz4AS4AxbAlbpsR+2v4b0V8FB9V0DbS7fXSYb/BfCmHbWbHbgAr4GXBZeaeIuPKklugcn4aLyxW3V76ntgNoCqSI/ugUWSVw1wXEk1yQo4B26SCNyo50lWZU+SmXrcqNNKGsDl+Gh8lmRezuftqD0DLofo5TttCkvxR9RJv+5P1XnJcd6v+1NgUsj/Ru9W3U/1aW3UkGOS32rzmAfAfVPqOOi2IkFteGh5XcK7pjg3AL4m+QD8GB4nuVc74GORnMK1sFt1J+qnQvBdvQA+D3Utaz/Ja/V5JeTFE2AJLNRZkgPgLfAF+Fbs31efAQd1nYGlAP26P0xyrf63wyqXb9VJO2o3DUDp1UmVv7VBFdFiAPIP+26qgGlp191UqVfAg6n6A0q42/cMWcqjAAAAAElFTkSuQmCC",
            iconChatNoColor: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWFJREFUeNqMUz1LA0EU3N1gY2OQs7HwI8L9gUAqG5VYWqS1EIOQIv4OtUxjKwS8NoWI+APyG0RCzrtLaWKwVPFYZ46nRLmNtzDs2903c7v35mmrslEC0jiJOG9prRvW2kPEPjAAAqCH/XB9bSNVMgywBDy+V6v7OOwi7oA4xFzHehGoIx5i7mDuJqPY+yYrfvmjsnmUlsufk4uzcyt7eYhHcStKogfAy26MoITN69fT9iU2noHafwLMJ49kH7iTw4MiAsyHgG/4c7C+klfcACfALVBTjgEO8xuGfxWL/sxZEYE+eUbKMf5zOFcAROb7Ruq4kqPuFMBNmT8gOYDStuN6LgHmB0ac01TukSfQBKdHcghM4ZxWEYEXGIn5GU8K79E5NMC8+tJIdOIbrMy1lsZQaAqP/sX7l6WOLMdYfg7fyKdNV3d27xfCp2PEez9kEci6igYAfnUV38irznbVlwADABPWyIVOu15aAAAAAElFTkSuQmCC",
            iconSave: "data:image/png;base64,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",
            iconPlus: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOJJREFUeNpckTsKwkAQhvPYaFTUQhAEQbAVcyM7L+E5rLyF5BamMpAiRQKCVSBNECRqkvWfOCurAx/7w7xnTeNjJmNprwSN9v4ECWBrkNWgYmrBweTsMF3gcLUXeDBStRUcOAAjKeUljuMd9BD02Wdbf5V7nGCUZamSVad2NBJjMC+KIpB/liTJHr4ZJQpehDaWaH10XTf0PG+b5/k5y7IgTdOTdpV2Xmo3BUuwpopRFB2gV2ABJsAVnEEneoI7ad/3N2EYXqFvND77GlNb0NFQd674fESlgg0OsDTUz315CzAAWshhdQv5QQQAAAAASUVORK5CYII=",
            iconExport: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAr5JREFUeNqkU0tME1EUve/Np62hUyhBIfYTFI2u3Bj5LIplw8KthhgTTDRgDCvZoMQgbghrNkSWagyEhW4kAg3GaIsKwbYKjYQmiggBOrTQMv1M5413akoCRGPiTc7kZd57555z731E13X4n+CNz9DQEPj9/v07SMzxPEmnMzpjGvA8DxzHASHkMMGrqSl4PjKyb8PldDZ3dNzuWt/YCGK8DoXCn2R5a+WgAvLR4YB4IgFpRQGKP9YZgzaTaO+9e+9Re/uty/JWjOU1TUklkzuyLEcXFxcDszMz06Hw5/DS0tIyeYuXOJRlSONw/YMxa2dNTd3I8PBoqc1m293dBYp2jFLxPAcmkwnQkpZXVW1wcPA+TygF9lsNh2c8ZoDOFrc7elSSbPLaGmj5PFBRBBAEyGYZJFMpMJtMnNls1rfi8Q2jBkZVTiKuY0e6SyilntXVlURPD6hoC5AA6uuBNDUBRRJd0woq5ue/hH0+34RBYEf0Iq7paINHrfZIxJGKRArMxZrzXi8wSkAoGGVaIBCYjMXkNYMgh3iMKEWhl1S0RE9UA2XGfCByKhCXG1ekQMajis3N2Lpv0ves2MYkYgI35yKM3XCVVzys6OszZwWxcEFTc8CsEp7EGcAOEYFCKBh6P7+wEN6bAyMsjMVenKoOdff3U3b2HCZnwHQjL6rIKAXvhgY1m1HGxl4+KU4wNSpsQe8dnFDecPNqV6VLES3ZFShhChzRksDlYiByBETRVCje9+/LX9/5/ePFxLRuexsGWlpgWtedyk5K870JRj7MzkV/RoMJgeaY1XYMJMkONkmCsrIywOxPFSWd3htlggp0nHNg+W8P+gbasOEWHElLVVXlGW+jx1tbe+G82+2schx3WDOZTHx8fGL0wJvRobW19U8PzYY4LUlSc0ND/Z2LjZ4rh079heCf4pcAAwAOSzJPzSWG8AAAAABJRU5ErkJggg==",
            iconImport: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtBJREFUeNqkU1tIFGEU/uayt2xm3UxX000RLKVeBFES0awHKYIgKn1p8cWwNYqeRCiJXnoUwhDsoQdFkehJErxgEO4WKOqaGq4KZWFednZWV2fHnVv/iAYqRdA/fPMwZ853zne+81OGYeB/Dmu+2tvb4ff7D0YIMcOyVDwuG7qugWVZMAwDiqKOEgwPDKPnbc+BwGmPp6qh4V7j6traJDnvg8GpCUGI/DjcAZXZkglRFCFJEkCTLxuA/ZXN1dTc1F5Xd/emEAnrqqZJW7HYpiAIi6FQKDA2OvoxOPV5amFhYYnCU5LEmFR7WARyPuRc7e7o7kpLSXNGY1HQpG1zUqYMm80GIklTFUVra2t7TJOqNhI9Bh3HsYMkaojKSNxIPOyN9DpXoitgdRaaqkFVFWxvbyMsCKTbOEMzLB0RxTUKz1BPyPMIUgg02kIn2eP2KxIl8WXpZajNrcW55POwUAw0Q4OmG+A5DrOzM+M+n++aOcTrBJcIrOZQdFWHxEi7ckaWRjAuTuBlUSsKUwqhKRosjKlX1wKBwGA4LPw0Cab3kk8RISobZVI5nnOLm1GkJ7tRnVONVHsqEloCFE2BtViwvh5eHRoc6tq3sYXAQQZpRSf4+94Hrcvu7+5o8gbqC+qRz+WTZAWyIoMmBBRNIzgZ/DQzOzu1T7C8ayjprEDNvewtvn02Yldg0SictKUirkpQVJlIondtUnZkqa/vXcf+BrNWxkr6VoHXTIrvTs0TNzPNJbN5MBwuyOoGqSoT65KIUQwYUn0+FJob8fv79xeJjjXGUDNTA2PO8IhbW8qAf/pLYHR08dv8WNRKJ3TO6QbPn4CT5+FyuUCqdxIb479X2eyAJY9hqF+bn7+oAywOshuOjIz0/MqK8sqSkuKi7GxPRlZmFifLstjfP/Dm0J0x4PV6/3TRnARneJ6vKi298OhiRfmtI3/9heCfzi8BBgASRjBF6Hz+5AAAAABJRU5ErkJggg==",
            iconReset2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtFJREFUeNqsVEtME1EUvfPrtCVRoNQfJEXjgoQJxJDACuOPhdEFRRYkJqzcGAILE3ThJ2FpIolujGyMIoSFWlQGIcYVIMVgEVrAFtLaUiJ105IWOh3m550pEJBqMPEmb8578947c++59w6haRr8F/sbka2w8Kjdbj+4Hx5CJyIIYs+G1Wp1dD15/A5RjSwtjU1Ofhnxer3T0Wj0ezKZkvdLRDmd9bc7H3R2JFMpYFkT6H5viKKQSCSCaOMTbvfo3Py8b3p65psgCBs5iUiSdPT19fGVlZXc+npaF0DXAFQEk4kBi8ViSCJLkhoMLvra22856VzhOhyOUxzHlWUyGZBlKfvSeBCQTqdhHQeJcwybZBiTthKL/SBzEJlqa2vPmM0sLcuy7p3hDYGoqWp2vWk0TUFPb+/TZDIp5iAiDl+oqzstiqLhviShR0T2mEGmqbqwGKIJlpejP4eGhl8ZpFvXq6uq6hH68XKooqKsWEjHoftZL3yemISz58+Bs6ERKIo09CQRGYYGt9v9Mh6Pr+wiQnuDJN14sPmti4fikhKDpASx4UqjQaAoCnpFoFcEiBlRdL12Pd8Oc2dQ4UjkPlfONQ3yvAmF1MWEltZWwwNVUbPZxbBYloWvU55x3+ycZzvTO4lOlBbXtLVcY/S5np2Lly7DgfxCQ2TQFKOWUCKgUCtXv6tLVVVtD5HPHzh+43rzTd/E8HZRhYMBYKk1oKkMsOY81IVBZCEWWwmPjX76sKv2trAgv+Dk3ELYzI/44VBRgXTsSJHqmZoBfyAIFqsdi9AMeRiqzWaDAX6gJ7G6mshFRMiiEB36OG7TF975xZbZQKgDNdl49LBL8fv9KK1gtMpaKpkZ5N+/+L1otsRWSh2OJkSPnrmlaEQ/aLGWl6/RDHP13p27IbPVMlNTXc1h5haDodDCvrt/ZwPj0BNg2fzwKg7pn/5HufrwTxu/BBgArZRH3O1yru8AAAAASUVORK5CYII=",
            questwiki: "data:image/png;base64,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",
            iconLight: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVlJREFUeNqMUj1LxEAQ3WyC4SBVKrsQm/sBBwdWtv4Df4UgVtZWVvZWdsJVNhbiP7CzFUKKoCBKCEnM98f6Bowsl128gZfJ7s68nXmzhhCCKWwBrIHl7zoF7oF2FkkEEkzgHPgUc6O9C2BPztkmuKHIcRxF27ZCYw86ghWdhmFIjhGJysqyFGmaHk95XOpmRR/f9w3yhmGotGFd1zGQHE5rSzp7n2RhGkNVlMyapommPS4dPsK99H2vy2d5nhMBXbSZEXDOB5Cc4pf8LBmisizL2DAMZ57nfevGSLhFFTPx4jgWQRA8bcdzRaVXpmky+YFRRVVVkbCX/z2kCc/yGCGaiKLoTRVrafQKiqJYT4LWdU3je1UF6giuHcf5EypJEhJvo4zUtLCUBUT/JOLRzi3gtgFlf+DJ7tPLgwZftm1Xruvu1gKmEIDgADefYP4Ly7LuMPtUFfsjwABKB8AI2XbIaQAAAABJRU5ErkJggg==",
            point: {
                red: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALBAMAAABbgmoVAAAAElBMVEVjb2zpHgdiDgWfGQpOCwT///8DM/q7AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcCgsHLALm6fVTAAAAKElEQVQI12NggALW0FAQFeriGgDkBBkbAbmszoLCrhgURA6qEqYPDAAyFQfwOzTDqQAAAABJRU5ErkJggg==",
                blue: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALBAMAAABbgmoVAAAAElBMVEVjb2wH0ekFWWIKj58ER07///8P2J0kAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcCgsHNw3fYCNYAAAAKElEQVQI12NggALW0FAQFeriGgDkBBkbAbmszoLCrhgURA6qEqYPDAAyFQfwOzTDqQAAAABJRU5ErkJggg=="
            },
            buttonSleep: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAYAAABzVH1EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFRkU1NkIxNzg1N0VFMjExQTJEQUMwQTIxNTUxREQyOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RTMwNEJCRTdFOEMxMUUyQjBDRURFM0I5NkY5QkY5NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RTMwNEJCRDdFOEMxMUUyQjBDRURFM0I5NkY5QkY5NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY0RTU2QjE3ODU3RUUyMTFBMkRBQzBBMjE1NTFERDI5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRTU2QjE3ODU3RUUyMTFBMkRBQzBBMjE1NTFERDI5Ii8+IDwvcmRmOkRlc2NyaXB0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",
            buttonBank: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAIAAAD8NuoTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFRkU1NkIxNzg1N0VFMjExQTJEQUMwQTIxNTUxREQyOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEZCQUJBMDg5QkUxMUUyODZDMkNGRjA0OThCNDIwNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEZCQUI5Rjg5QkUxMUUyODZDMkNGRjA0OThCNDIwNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBGMDUxMUFGQkQ4OUUyMTE5MTMyRjkyRDBERDlFNjRDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRTU2QjE3ODU3RUUyMTFBMkRBQzBBMjE1NTFERDI5Ii8+IDwvcmRmOkRlc2NyaXB0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",
            iconAlarm: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5Q0JGRTU5MDhBOEFFMjExQkM0RkRGRTM4QUMzODJBMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMjVGQjlCMDhBOEExMUUyODFBMTg4RUE2RTEwNTY4QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMjVGQjlBRjhBOEExMUUyODFBMTg4RUE2RTEwNTY4QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlEQkZFNTkwOEE4QUUyMTFCQzRGREZFMzhBQzM4MkEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlDQkZFNTkwOEE4QUUyMTFCQzRGREZFMzhBQzM4MkEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bLqFjQAAA3tJREFUeNqsVVlIm0EQ3kRr1UgVTY23tR5oQKFFBKGKBwoKSl+qb0JREEQJ0vqgqFh8yYOFgDRajQ+tF6KgjXhGqxRCFashFCvxQoxgDPFITRRzTWd/+H+iEfriwPLvZme+neObCQ8AyEMKnzyweN/9YWhoqGJpaSk7KirKWF5e/iU5OVnnfq9Wq1+OjIxU2Gw2QWlp6WRxcbHyFgANmV39/f3SlJQUiIuLg/DwcOjs7FSwd5eXl8RkMpH29vYfERERkJCQAOnp6TA7O1vnjsFjc7i1tfW8trZ2b39/n+Tk5OgrKyvfnZ6eRi0sLBQg0AtUcQqFwl9FRUVKLy8vS1dXl3x1dTUkKyvLOjAwIPLx8bHe8hANX8XGxgICaYxGo7ijo0MRFhYGYrEYJBKJq6amxpWUlASYCujp6fmAD+cVFBQYMjIy4Pr6OoTF4QBdLpdfU1PT8tra2puGhobFgIAAmJ6ehpubG1hfXwetVgsWiwW6u7sBvQGFQvENPZQ0Nzer0J7nAcguzNsEhgQajQZYqa+vh8bGRu48NTUFAoEAlErlR2pjNpvJvYB2u12YmpoKUqmUMRweHobx8XEOyGAwwMXFBbPPz8+HkpISx8nJCf/8/NwTcHd3lwwODlZFR0fDwcEBIC0AQwJ61ul0cHV1xVSfeudwOGBsbAwSExNhY2Mj290pjtiYWIJVfRoaGkrQgFaaiEQisrOzQ5BvJD4+nszNzZGYmBhSVlZGsDjE29ubhht8dnbmSWyqEBkZacKwCJ/PJzMzM8TX15dgAcj8/DxNBwNKv729vZTgjB6uc+rMvcRGujyj1Ghra4P/CfIRCgsLAdnxxB3DnTbMt6+v709gYCCsrKxwxq2trdDS0sKdVSoV+Pv7w/Ly8ve7LOE2TqeT3T9G4ytqMDo6yvBwcXGRAaGFwQdZHpqprrszt1qPFazwI71e/xYHhEwul/vRIiBFmKLRXFKKYANYc3Nz32NP9wUHB9vvHQ57e3uMMoanplQ5PDx8jUuB57/Yjq7q6mqXTCa7QJ1Pm5ubdTQt+OBXaosU43C4KqMxsVqtBDtAhfyKRgL/RpJPYGWrsI+ZiiMQCQoKItvb23lpaWl6nEw/maHK53vSho4nmkfs4UkEwkdt+uPjY4YmOGUItiPjydHREfVEm5mZ+RnTsURt6R0rvIf+C/gnwABBPec5UzOlgQAAAABJRU5ErkJggg==",
            notiBell: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMjhFNDI0QzYyOURFMjExOEQwMUUwQkVBMzJBREI2MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4N0EzMEJDMDlENjIxMUUyODhFNUM1MTdFQzA2NTAwQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4N0EzMEJCRjlENjIxMUUyODhFNUM1MTdFQzA2NTAwQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMzOEU0MjRDNjI5REUyMTE4RDAxRTBCRUEzMkFEQjYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMyOEU0MjRDNjI5REUyMTE4RDAxRTBCRUEzMkFEQjYyIi8+IDwvcmRmOkRlc2NyaXB0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",
            jobTime: "data:image/png;base64,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"
        });
        TWDB.Util = function($) {
            var _public = {};
            var _addCss = function(cssString) {
		$('head').append($('<style type="text/css">').text(cssString));
	    };
	    _public.addCss = _addCss;
	    return _public;
        }(jQuery);
            
        TWDB.ClothCalc = new Object({
            uid: "twdb_clothcalc",
            _sk4attr: {
                'strength': [5, 6, 7, 8, 9],
                'flexibility': [10, 11, 12, 13, 14],
                'dexterity': [15, 16, 17, 18, 19],
                'charisma': [20, 21, 22, 23, 24, 25]
            },
            _type2id: {
                animal: 1,
                body: 2,
                foot: 3,
                head: 4,
                left_arm: 5,
                neck: 6,
                right_arm: 7,
                yield: 8,
                pants: 9,
                belt: 10
            },
            _id2type: {
                1: "animal",
                2: "body",
                3: "foot",
                4: "head",
                5: "left_arm",
                6: "neck",
                7: "right_arm",
                8: "yield",
                9: "pants",
                10: "belt"
            },
            _skill2id: {
                strength: 1,
                flexibility: 2,
                dexterity: 3,
                charisma: 4,
                build: 5,
                punch: 6,
                tough: 7,
                endurance: 8,
                health: 9,
                ride: 10,
                reflex: 11,
                dodge: 12,
                hide: 13,
                swim: 14,
                aim: 15,
                shot: 16,
                pitfall: 17,
                finger_dexterity: 18,
                repair: 19,
                leadership: 20,
                tactic: 21,
                trade: 22,
                animal: 23,
                appearance: 24
            },
            _id2skill: {
                1: "strength",
                2: "flexibility",
                3: "dexterity",
                4: "charisma",
                5: "build",
                6: "punch",
                7: "tough",
                8: "endurance",
                9: "health",
                10: "ride",
                11: "reflex",
                12: "dodge",
                13: "hide",
                14: "swim",
                15: "aim",
                16: "shot",
                17: "pitfall",
                18: "finger_dexterity",
                19: "repair",
                20: "leadership",
                21: "tactic",
                22: "trade",
                23: "animal",
                24: "appearance"
            },
            _class2id: {
                greenhorn: 1,
                adventurer: 2,
                duelist: 3,
                worker: 4,
                soldier: 5
            },
            ready: false,
            data: {
                skills: {},
                items: {},
                jobs: {},
                custom: {}
            },
            calcdata: {
                skills: {},
                items: {},
                jobs: {},
                custom: {},
                animals: [],
                buyTip: {},
                jobBoni: {},
                used: {},
                loaded: false
            },
            loaded: false,
            up2date: true,
            gui: {
                job: {},
                custom: {}
            },
            init: function () {
                if (this.ready) {
                    return

                }
                var e = this;
                this.jobs.setParent(this);
                this.joblist.parent = this;
                this.customs.setParent(this);
                this.bag.setParent(this);
                TWDB.Eventer.set("TWDBdataLoaded", function () {
                    e.handleTWDBData()
                });
                this.gui.copyright = jQuery('<div style="position:absolute;bottom:0px;left:0px;height:15px;display:block;font-size:10px;color:#000000;">.:powered by tw-db team:. | <a href="http://tw-db.info" style="font-weight:normal;color:#000000;" target="_blank">.:tw-db.info:.</a> | ' + (TWDB.script.version / 100 / 1 + " rev. " + TWDB.script.revision) + "</div>");
                this.gui.cache = jQuery('<div style="position:absolute;top:10px;right:8px;width:20px;height:20px;cursor:pointer;" />');
                this.gui.bag = jQuery('<div style="position:absolute;top:95px;left:1px;width:252px;height:186px;" />');
                if (!Bag.loaded) {
                    Bag.loadItems()
                }
                this.BagInt = window.setInterval(function () {
                    e.finishInit()
                }, 100);
                this.data.custom = TWDB.Settings
                    .get(
                        "custom", {
                            1: {
                                id: 1,
                                type: "speed",
                                para: {},
                                name: "Speed"
                            },
                            2: {
                                id: 2,
                                type: "custom",
                                para: {
                                    9: 1
                                },
                                name: "max Health"
                            },
                            3: {
                                id: 3,
                                type: "regen",
                                para: {},
                                name: "Health Regeneration"
                            },
                            4: {
                                id: 4,
                                type: "fort",
                                para: {
                                    att: 200,
                                    def: 20,
                                    health: 100,
                                    type: 0
                                },
                                name: "Fortbattle Attacker (Att)"
                            },
                            5: {
                                id: 5,
                                type: "fort",
                                para: {
                                    att: 20,
                                    def: 200,
                                    health: 100,
                                    type: 0
                                },
                                name: "Fortbattle Attacker (Def)"
                            },
                            6: {
                                id: 6,
                                type: "fort",
                                para: {
                                    att: 200,
                                    def: 20,
                                    health: 100,
                                    type: 1
                                },
                                name: "Fortbattle Defender (Att)"
                            },
                            7: {
                                id: 7,
                                type: "fort",
                                para: {
                                    att: 20,
                                    def: 200,
                                    health: 100,
                                    type: 1
                                },
                                name: "Fortbattle Defender (Def)"
                            },
                            8: {
                                id: 8,
                                type: "duel",
                                para: {
                                    12: 1,
                                    15: 1,
                                    16: 1,
                                    24: 1
                                },
                                name: "Range Dueler (Att)"
                            },
                            9: {
                                id: 9,
                                type: "duel",
                                para: {
                                    12: 1,
                                    15: 1,
                                    16: 1,
                                    21: 1
                                },
                                name: "Range Dueler (Def)"
                            },
                            10: {
                                id: 10,
                                type: "duel",
                                para: {
                                    6: 1,
                                    7: 1,
                                    11: 1,
                                    15: 1
                                },
                                name: "Melee Dueler"
                            }
                        });
                if (!TWDB.Updater.wasUpdated()) {
                    var t = TWDB.Cache.load("calcdata");
                    if (typeof t == "object" && t != null && isDefined(t.loaded)) {
                        this.calcdata = t
                    }
                }
            },
            finishInit: function () {
                if (typeof this.BagInt == "undefined") {
                    return

                }
                if (Bag.loaded) {
                    window.clearInterval(this.BagInt);
                    delete this.BagInt;
                    this.loaded = true;
                    this.ready = true;
                    this.addButton()
                }
            },
            addButton: function () {
                if (this.ready === false) {
                    return

                }
                var e = this;
                var t = jQuery(
                        '<div title="tw-db.info ClothCalc " class="menulink" />')
                    .css(
                        "background-image",
                        "url(" + TWDB.images.button + ")")
                    .css("background-position", "0px -25px")
                    .mouseenter(
                        function () {
                            jQuery(this)
                                .css(
                                    "background-position",
                                    "-25px -25px")
                        })
                    .mouseleave(
                        function () {
                            jQuery(this)
                                .css(
                                    "background-position",
                                    "0px -25px")
                        }).click(function () {
                        e.open()
                    });
                jQuery(
                        "#TWDB_ClothCalc_menubuttons .menucontainer_bottom")
                    .before(t);
                // jQuery("#ui_menubar").append(jQuery('<div
                // class="ui_menucontainer"
                // id="TWDB_ClothCalc_menubuttons"
                // />').append(t).append('<div
                // class="menucontainer_bottom" />'))
            },
            isBetterItem: function (e) {
                // Dun verify if item can improve job lp or is
                // set part

                var t = ItemManager.get(e);
                if (isDefined(t) && isDefined(t.set)) {
                    return true; // item better is set parts,
                    // don't calculate and
                    // update
                }

                var n = this.calcdata.jobs;

                for (var iU in n) {
                    var jobid = iU;

                    var o = this.getClothForJob(jobid);

                    if (!isDefined(o)) {

                        continue
                    }

                    var total = 0;

                    var bonusItem = TWDB.Calc
                        .getItemBonusForJob(e, jobid);

                    if (isDefined(o[this._type2id[t.type]])) {

                        var f = ItemManager
                            .get(o[this._type2id[t.type]].id);
                        if (isDefined(f) && isDefined(f.set)) {

                            continue; // item from betters is
                            // set part, don't
                            // calculate
                        }
                        total += TWDB.Calc.getItemBonusForJob(
                            f.item_id, jobid)

                    }

                    if (bonusItem > total) {

                        return true; // Found a job where
                        // item is better
                    }
                }
                return false;
            },
            checkSkill: function () {
                for (var e in this.data.skills) {
                    if (typeof this.calcdata.skills[e] == "undefined") {
                        return true
                    }
                    if (this.data.skills[e].val != this.calcdata.skills[e].val) {
                        return true
                    }
                }
                return false
            },
            checkItems: function () {
                for (var e in this.data.items) {
                    if (typeof this.calcdata.items[e] == "undefined") {
                        if (this
                            .isBetterItem(this.data.items[e].id)) {
                            return true;
                        }

                    }
                }
                for (var e in this.calcdata.items) {
                    if (typeof this.data.items[e] == "undefined") {
                        if (this
                            .isBetterItem(this.calcdata.items[e].id)) {
                            return true
                        }
                    }
                }
                return false
            },
            checkCustom: function () {
                var e = 0;
                for (var e in this.data.custom) {
                    if (typeof this.calcdata.custom[e] == "undefined") {
                        return true
                    }
                    if (this.calcdata.custom[e].name != this.data.custom[e].name) {
                        return true
                    }
                    for (var t in this.data.custom[e].para) {
                        if (typeof this.calcdata.custom[e].para[t] == "undefined") {
                            return true
                        }
                        if (this.calcdata.custom[e].para[t] != this.data.custom[e].para[t]) {
                            return true
                        }
                    }
                }
                if (typeof this.calcdata.custom[Number(e) + 1] != "undefined") {
                    return true
                }
                return false
            },
            checkCache: function () {
                var e = this.checkItems();
                var t = false; // this.checkSkill(); Dun
                // disable skills change test
                var n = this.checkCustom();
                this.gui.cache.children().remove();
                if (e || t || n) {
                    var r = "#DATA_OLD#";
                    if (e) {
                        r += " [#INVENTORY#]"
                    }
                    if (t) {
                        r += " [#SKILL#]"
                    }
                    if (n) {
                        r += " [#CUSTOM#]"
                    }
                    var i = jQuery('<div title="' + r + '" style="position:absolute;top:0px;right:0px;width:20px;height:20px;background: url(' + TWDB.images.iconData + ')no-repeat 0px 0px;" />');
                    this.up2date = false
                } else {
                    var i = jQuery('<div title="#DATA_OK#" style="position:absolute;top:0px;right:0px;width:20px;height:20px;background: url(' + TWDB.images.iconData + ')no-repeat -20px 0px;" /></div>');
                    this.up2date = true
                }
                this.gui.cache.append(i);
                var s = this;
                i.click(function () {
                    TWDB.DataManager.loadData(true)
                })
            },
            open: function (e, t) {
                var n = this;
                if (this.ready == false) {
                    return;
                }
                if (TWDB.GameAPI.wman.getById(this.uid)) {
                    if (isDefined(e) && isDefined(t)) {
                        switch (t) {
                        case "job":
                            var r = TWDB.Jobs.getJobById(e);
                            if (isDefined(r)) { var r = r.name; } else { var r = ""; };
                            break;
                        case "item":
                            var r = e;
                            break;
                        case "default":
                            var r = null;
                            break
                        }
                        if (isDefined(r)) { n.joblist.open(r); }
                    };
                    return;
                };
                if (typeof this.eventOpen != "undefined") { TWDB.Eventer.remove("getGameData", this.eventOpen); };
                var i = 0;
                for (var s in this.calcdata.jobs) { i++; break; };
                if (i == 0) {
                    this.eventOpen = TWDB.Eventer.set("getGameData", function() { TWDB.DataManager.loadData(true); }, 1);
                    this.up2date = false;
                    this.getGameData();
                } else {
                    this.eventOpen = TWDB.Eventer.set( "getGameData", function() { n.finishOpening(); }, 1);
                    this.getGameData();
                };
                var o = TWDB.GameAPI.wman.getById(Inventory.uid);
                Wear.open();
                var u = TWDB.GameAPI.wman.getById(Inventory.uid);
                if (typeof o == "undefined" && typeof u != "undefined") { u.fireEvent(TWE("WINDOW_CLOSE"), u); };
                this.jobs.selected = 0;
                // Dun - adding the danger sorting
                this.gui.job.sort = jQuery('<div style="position:absolute;top:10px;left:0px;height:20px;" />')
                    .append('<img src="' + TWDB.images.iconName + '" title=" #ORDER_NAME# " alt=" #ORDER_NAME# " onclick="javascript:TWDB.ClothCalc.joblist.order(\'name\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />')
                    .append('<img src="' + TWDB.images.iconExperience + '" title=" #ORDER_EXP# " alt=" #ORDER_EXP# " onclick="javascript:TWDB.ClothCalc.joblist.order(\'experience\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />')
                    .append('<img src="' + TWDB.images.iconDollar + '" title=" #ORDER_WAGES# " alt=" #ORDER_WAGES# " onclick="javascript:TWDB.ClothCalc.joblist.order(\'wages\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />')
                    .append('<img src="' + TWDB.images.iconLuck + '" title=" #ORDER_LUCK# " alt=" #ORDER_LUCK# " onclick="javascript:TWDB.ClothCalc.joblist.order(\'luck1\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />')
                    .append('<img src="' + TWDB.images.iconLaborpoints + '" title=" #ORDER_LP# " alt=" #ORDER_LP# " onclick="javascript:TWDB.ClothCalc.joblist.order(\'laborpoints\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />')
                    .append('<img src="' + TWDB.images.iconMoti + '" title=" #ORDER_MOTIVATION# " alt=" #ORDER_MOTIVATION# " onclick="javascript:TWDB.ClothCalc.joblist.order(\'motivation\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />')
                    .append('<img src="' + TWDB.images.iconDanger + '" title=" #ORDER_DANGER# " alt=" #ORDER_DANGER# " onclick="javascript:TWDB.ClothCalc.joblist.order(\'danger\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />');;
                this.gui.job.title = jQuery('<div style="position:absolute;top:36px;left:0px;width:190px;height:19px;font-weight:bold;text-align:center;">#SELECTJOB# >></div>');
                this.gui.job.mode = jQuery("<div style=\"position:absolute;top:10px;right:30px;width:20px;height:20px;background:url('" + TWDB.images.jobTime + '\') no-repeat scroll 0 0 transparent;cursor:pointer;display:block;" title=" #JOB_TIME# " />');
                this.gui.job.search = jQuery("<div style=\"position:absolute;top:35px;right:50px;width:20px;height:20px;background:url('" + TWDB.images.iconSearch + '\') no-repeat scroll 0 0 transparent;cursor:pointer;display:none;" title=" #SEARCHJOB# " />');
                this.gui.job.checkbox = new TWDB.GameAPI.gui.checkbox("", this.joblist.all ? "" : "tw2gui_checkbox_checked",
                    function() {
                        if (this.isSelected()) {
                            n.joblist.all = false;
                            n.joblist.update();
                        } else {
                            n.joblist.all = true;
                            n.joblist.update();
                        }
                    });
                this.gui.job.checkbox.setTooltip("#HIDEJOBS#");
                this.gui.job.checkbox.getMainDiv().css({position: "absolute", top: "35px", right: "30px"});
                this.gui.job.button = jQuery('<div style="position:absolute;top:35px;right:4px;width:26px;height:20px;background:url(\'/images/window/character/title_editbtn.jpg\') no-repeat scroll 0 0 transparent;cursor:pointer;" title=" #SELECTJOB# " />');
                this.gui.job.skills = jQuery('<div style="position:absolute;top:60px;left:1px;width:170px;height:30px;display:block;" />');
                this.gui.job.mainDiv = jQuery('<div style="position:absolute;top:0px;left:0px;height:100%;width:100%;" />');
                this.gui.job.mainDiv.append(this.gui.job.sort);
                this.gui.job.mainDiv.append(this.gui.job.title);
                this.gui.job.mainDiv.append(this.gui.job.mode);
                this.gui.job.mainDiv.append(this.gui.job.search);
                this.gui.job.mainDiv.append(this.gui.job.checkbox.getMainDiv());
                this.gui.job.mainDiv.append(this.gui.job.button);
                this.gui.job.mainDiv.append(this.joblist.getMainDiv());
                this.gui.job.mainDiv.append(this.gui.job.skills);
                // Dun - add a zone for showing the rewards with
                // current clothes
                this.gui.job.calc = $('<div title=" #CURRENT_REWARDS# " style="position:absolute;top:60px;width:100px;right:1px;height:30px;display:block;;font-weight:bold;text-align:center;" />');
                this.gui.job.mainDiv.append(this.gui.job.calc);

                this.gui.job.button.click(function() {
                    if (n.joblist.getMainDiv().is(":visible")) {
                        n.joblist.close();
                    } else {
                        n.joblist.open();
                    };
                }.bind(this));
                this.gui.job.search.click(function() { n.jobSearch(); }.bind(this));
                this.gui.job.searchDiv = jQuery("<div />");
                if (n.joblist.getMainDiv().is(":visible")) {
                    n.joblist.close();
                };

                n.joblist.name = null;
                if (isDefined(e) && isDefined(t)) {
                    switch (t) {
                    case "job":
                        var r = TWDB.Jobs.getJobById(e);
                        if (isDefined(r)) { var r = r.name; } else { var r = ""; };
                        break;
                    case "item":
                        var r = e;
                        break;
                    case "default":
                        var r = null;
                        break;
                    };
                    if (isDefined(r)) { n.joblist.name = r; };
                };
                this.customs.selected = 0;
                this.gui.custom.title = jQuery('<div style="position:absolute;top:36px;left:0px;width:210px;height:19px;font-weight:bold;text-align:center;">#SELECTJOB# >></div>');
                this.gui.custom.settings = jQuery('<div title="#SETTINGS#" style="position:absolute;top:35px;right:30px;width:20px;height:20px;background:url(' + TWDB.images.iconSetting + ');cursor:pointer;" />');
                this.gui.custom.settings.click(function() { n.customs.showConfig(); });
                this.gui.custom.button = jQuery('<div style="position:absolute;top:35px;right:4px;width:26px;height:20px;background:url(\'/images/window/character/title_editbtn.jpg\') no-repeat scroll 0 0 transparent;cursor:pointer;" title=" #SELECTJOB# " />');
                this.gui.custom.selectbox = new TWDB.GameAPI.gui.selectbox;
                this.gui.custom.selectbox.elContent.css("max-height", "660px");
                this.gui.custom.selectbox.setWidth(300).addListener(function (e) { n.customs.switchCustomJob(e); });
                this.gui.custom.skills = jQuery('<div style="position:absolute;top:60px;left:1px;width:252px;height:30px;display:block;" />');
                this.gui.custom.mainDiv = jQuery('<div style="position:absolute;top:0px;left:0px;height:100%;width:100%;" />').hide();
                this.gui.custom.mainDiv.append(this.gui.custom.title);
                this.gui.custom.mainDiv.append(this.gui.custom.settings);
                this.gui.custom.mainDiv.append(this.gui.custom.button);
                this.gui.custom.mainDiv.append(this.gui.custom.skills);
                this.gui.custom.mainDiv.append(this.gui.custom.calc);
                this.gui.custom.button.click(function (e) { n.gui.custom.selectbox.show(e); });
                this.gui.bag.children().remove();
                var a = function(e, t) { n.showTab(e, t); };
                this.gui.window = TWDB.GameAPI.wman.open(this.uid, null, "noreload").setMiniTitle("TWDB Cloth Calc").setTitle("tw-db.info Cloth Calc")
                    .addTab("#JOB#", "Jobs", a).addTab("#CUSTOM#", "Custom", a)
                    .appendToContentPane(this.gui.job.mainDiv).appendToContentPane(this.gui.custom.mainDiv)
                    .appendToContentPane(this.gui.cache).appendToContentPane(this.gui.bag).appendToContentPane(this.gui.copyright);
                this.gui.window.showLoader();
                var f = $('<div title="#SAVE_POSITION#" style="width:20px;height:20px;position:absolute;left:0px;top:0px;background:url(\'' + TWDB.images.iconSave + "') no-repeat scroll 0px -20px transparent;cursor:pointer;display:block;\" />")
                    .hover(function() { $(this).css("background-position", "0px 0px"); },
                           function() { $(this).css("background-position","0px -20px"); })
                    .click(function() {
                            TWDB.Settings.set("clothPos", "custom");
                            var e = n.gui.window.saveAppearance();
                            TWDB.Settings.set("clothPosition", {x: e.x, y: e.y });
                            (new UserMessage("#SAVE_SUCCESSFUL#", UserMessage.TYPE_SUCCESS)).show(); });
                $(this.gui.window.divMain).find(".tw2gui_window_buttons").append(f);
                $(this.gui.window.divMain).children(".tw2gui_window_tabbar").css("right", "22px");
                var l = this.gui.window.saveAppearance();
                switch (TWDB.Settings.get("clothPos", "left")) {
                case "right":
                    l.x = Wear.window.divMain.offsetLeft + Wear.window.divMain.offsetWidth - 15;
                    break;
                case "left":
                    l.x = Wear.window.divMain.offsetLeft - 295;
                    break;
                case "custom":
                    var l = TWDB.Settings.get("clothPosition", {x: 0, y: 0});
                    break;
                }
                this.gui.window.restoreAppearance({h: 410, w: 310, x: l.x, y: l.y});
                return;
            },
            finishOpening: function() {
                this.jobs.mode(2);
                this.joblist.init(this);
                this.customs.createSelectbox();
                if (typeof this.gui.window != "undefined") {
                    this.checkCache();
                    delete this.eventOpen;
                    var carryEventHandler = function(e) { TWDB.ClothCalc.jobs.update(); };
                    EventHandler.unlisten('wear_changed', carryEventHandler);
                    EventHandler.listen('wear_changed', carryEventHandler);
                    this.gui.window.hideLoader();
                };
            },
            showTab: function(e, t) {
                this.gui.window.activateTab(t);
                this.gui.window.showLoader();
                this.gui.bag.children().remove();
                switch (t) {
                case "Jobs":
                    this.gui.custom.mainDiv.hide();
                    if (this.jobs.selected != 0) { this.jobs.switchJob(this.jobs.selected); };
                    this.gui.job.mainDiv.show();
                    break;
                case "Custom":
                    this.gui.job.mainDiv.hide();
                    if (this.customs.selected != 0) { this.customs.switchCustomJob(this.customs.selected); };
                    this.gui.custom.mainDiv.show();
                    break;
                };
                this.gui.window.hideLoader();
            },
            getGameData: function(e) {
                var t = this;
                if (typeof e == "undefined") {
                    this.getState = {skill: false, items: false, jobs: false};
                    TWDB.Eventer.set("getSkill", function() { t.getGameData("skill"); }, 1);
                    TWDB.Eventer.set("getItems", function() { t.getGameData("items"); }, 1);
                    TWDB.Eventer.set("getJobs",  function() { t.getGameData("jobs");  }, 1);
                    TWDB.DataManager.loadData();
                    this.getSkill();
                    this.getJobs();
                    this.getItems();
                } else {
                    this.getState[e] = true;
                    var n = true;
                    for (var r in this.getState) {
                        if (!this.getState[r]) { n = false; break; };
                    };
                    if (n) {
                        delete this.getState;
                        TWDB.Eventer.trigger("getGameData");
                    };
                };
            },
            getSkill: function(e) {
                if (typeof e == "undefined") {
                    var t = this;
                    setTimeout(function() { t.getSkill(CharacterSkills.skills); }, 10);
                    return;
                } else {
                    this.data.skills = {};
                    for (var n in e) {
                        var r = this._skill2id[n];
                        this.data.skills[r] = {id: r, val: e[n].points};
                    };
                    TWDB.Eventer.trigger("getSkill");
                };
            },
            getItems: function(e) {
                if (typeof e == "undefined") {
                    var t = this;
                    jQuery.post("game.php?window=inventory", {}, function(e) { t.getItems(e) }, "json");
                    return;
                } else {
                    this.data.items = {};
                    for (var n = 0; n < e.wear.length; n++) {
                        var r = ItemManager.get(e.wear[n]);
                        if (!this.isItemUsable(r.item_id)) {
                            continue
                        }

                        this.data.items[r.item_id] = {
                            id: r.item_id
                        }
                    }
                    for (var i in Bag.items) {
                        for (var n in Bag.items[i]) {
                            var r = ItemManager.get(Number(n));
                            if (!this.isItemUsable(r.item_id)) {
                                continue
                            }

                            this.data.items[r.item_id] = {
                                id: r.item_id
                            }
                        }
                    }
                    TWDB.Eventer.trigger("getItems")
                }
            },
            getJobs: function (e) {
                if (typeof e == "undefined") {
                    var t = this;
                    jQuery.post(
                        "game.php?window=work&mode=index", {}, function (e) {
                            t.getJobs(e)
                        }, "json");
                    return

                } else {
                    this.data.jobs = e;
                    TWDB.Eventer.trigger("getJobs")
                }
            },
            isItemUsable: function (e, t) {
                var n = ItemManager.get(e);
                if (typeof n == "undefined") {
                    return false
                }
                var r = false;
                if (!this.itemHasBonus(n)) {
                    return false
                }
                if (n.characterClass !== null && n.characterClass !== Character.charClass) {
                    return false
                }
                if (n.characterSex !== null && n.characterSex !== Character.charSex) {
                    return false
                }
                if (n.level !== null && n.level > Character.level + Character.itemLevelRequirementDecrease["all"] + (typeof Character.itemLevelRequirementDecrease[n.type] != "undefined" ? Character.itemLevelRequirementDecrease[n.type] : 0)) {
                    if (isDefined(t) && t) {
                        return true
                    } else {
                        return false
                    }
                }
                return true
            },
            itemHasBonus: function (e) {
                if (e.type == "left_arm" || e.type == "right_arm") {
                    return true
                }
                if (typeof e.set != "undefined" && e.set != null) {
                    return true
                }
                if (typeof e.speed != "undefined" && e.speed != null) {
                    return true
                }
                if (typeof e.bonus == "undefined") {
                    return false
                }
                if (typeof e.bonus.skills != "undefined") {
                    for (var t in e.bonus.skills) {
                        if (!jQuery
                            .isFunction(e.bonus.skills[t])) {
                            return true
                        }
                    }
                }
                if (typeof e.bonus.attributes != "undefined") {
                    for (var t in e.bonus.attributes) {
                        if (!jQuery
                            .isFunction(e.bonus.attributes[t])) {
                            return true
                        }
                    }
                }
                if (typeof e.bonus.item != "undefined") {
                    for (var t in e.bonus.item) {
                        if (!jQuery.isFunction(e.bonus.item[t])) {
                            return true
                        }
                    }
                }

                if (typeof e.bonus.fortbattle != "undefined") {
                    for (var t in e.bonus.fortbattle) {
                        if (e.bonus.fortbattle[t] > 0) {
                            return true
                        }
                    }
                }
                if (typeof e.bonus.fortbattlesector != "undefined") {
                    for (var t in e.bonus.fortbattlesector) {
                        if (e.bonus.fortbattle[t] > 0) {
                            return true
                        }
                    }
                }
                return false
            },
            handleTWDBData: function () {
                var e = TWDB.DataManager.getData("twdb");
                var t = this;
                this.calcdata.items = jQuery.extend(true, {},
                    t.data.items);
                this.calcdata.skills = jQuery.extend(true, {},
                    t.data.skills);
                this.calcdata.time = e.time;
                this.calcdata.jobs = e.jobs;
                this.calcdata.custom = e.custom;
                this.calcdata.loaded = true;
                this.calcdata.used = {};
                try {
                    this.jobs.init()
                } catch (n) {
                    TWDB.Error.report(n,
                        "GENERICERROR#; handle Jobs")
                }
                try {
                    this.joblist.reset()
                } catch (n) {
                    TWDB.Error.report(n,
                        "GENERICERROR#; handle Jobslist")
                }
                try {
                    this.customs.init()
                } catch (n) {
                    TWDB.Error.report(n,
                        "GENERICERROR#; handle Customs")
                }
                try {
                    this.setUsedItems()
                } catch (n) {
                    TWDB.Error.report(n,
                        "GENERICERROR#; setUsedItems")
                }
                TWDB.Cache.save("calcdata", this.calcdata);
                this.finishOpening()
            },
            jobs: new Object({
                selected: 0,
                base: 1,
                basetime: 1,
                sort: {
                    list: [],
                    type: "name",
                    order: 1
                },
                setParent: function (e) {
                    this.parent = e
                },
                init: function () {
                    var e = [];
                    var t = 0;
                    var n = 0;
                    while (true) {
                        t++;
                        var r = JobList.getJobById(t);
                        if (!r) {
                            n++;
                            if (n > 5) {
                                break
                            }
                            continue
                        }
                        n = 0;
                        e[r.shortname] = r.id
                    }
                    for (var i in this.parent.calcdata.jobs) {
                        var r = this.parent.calcdata.jobs[i];
                        if (typeof e[r.short_name] == "undefined") {
                            if (r.short_name == "construction") {
                                r.name = "#CONSTRUCTION#";
                                r.skills = {};
                                r.gameid = 0;
                                r.laborpoints.current = 0;
                                r.duration = 7200 * Number(this.parent.data.jobs.workspeed);
                                r.energy = 24
                            } else {
                                r.name = "!!".job.short_name;
                                r.skills = {};
                                r.gameid = 0;
                                r.laborpoints.current = 0;
                                r.duration = 0;
                                r.energy = 0
                            }
                            continue
                        }
                        var s = JobList
                            .getJobById(e[r.short_name]);
                        r.name = s.name;
                        r.skills = s.skills;
                        r.gameid = s.id;
                        r.difficulty = s.malus;
                        r.duration = 0;
                        r.energy = s.energy;
                        r.laborpoints.current = 0
                    }
                },
                update: function () {

                    if (isDefined(this.parent.calcdata.jobs[this.selected])) { // Dun
                        // -
                        // change
                        // defined
                        var e = this
                            .calcJob(this.selected);
                        var t = e.name.substring(0, 18) + " [" + e.laborpoints.current + "/" + e.laborpoints.sum + "]";
                        this.parent.gui.job.title
                            .html(t)
                            // Dun - for update current
                            // rewards
                        this.parent.jobs.showCur();

                    }
                },
                showCur: function () {

                    if (isDefined(this.selected)) {

                        var job = this.parent.calcdata.jobs[this.selected];
                        if (isDefined(job)) {
                            var current = "";

                            switch (this.parent.joblist.sort.type) {

                            case "luck1":
                                current += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconLuck + '"/> ';
                                current += " $" + job.values.cur_luck1 + "-" + "$" + job.values.cur_luck2;

                                break;
                            case "laborpoints":
                                current += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconLaborpoints + '"/> ';
                                current += job.laborpoints.current;
                                break;
                            case "experience":
                                current += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconExperience + '"/> ';
                                current += job.values.cur_experience + "exp";
                                break;
                            case "wages":

                                current += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconDollar + '"/> ';
                                current += " $" + job.values.cur_wages;
                                break;
                            case "danger":

                                current += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconDanger + '"/> ';
                                current += job.values.cur_danger + "%";
                                break;
                            case "motivation":
                                current += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconMoti + '"/> ';
                                current += job.values.resmotivation * 100 + " (" + Math
                                    .round(job.values.motivation * 100) + ")%";
                                break
                            }

                            this.parent.gui.job.calc
                                .html(current);
                        }
                    }

                },
                switchJob: function (e) {

                    if (typeof this.parent.calcdata.jobs[e] == "undefined" || typeof this.parent.calcdata.jobs[e].cloth == "undefined") {
                        return

                    }

                    var t = this.parent;
                    var n = t.calcdata.jobs[e];
                    if (n.gameid != 0) {
                        TWDB.Map.setMinimapJob(n.name);
                        t.gui.job.search.show()
                    } else {
                        t.gui.job.search.hide()
                    }
                    this.selected = e;
                    var r = n.name.substring(0, 18) + " [" + n.laborpoints.current + "/" + n.laborpoints.sum + "]";
                    t.gui.job.title.html(r);
                    t.bag.showItems(n.cloth, "jobs");

                    t.gui.job.skills.children()
                        .remove();

                    for (var i in n.skills) {
                        for (var s = 0; s < n.skills[i]; s++) {
                            var o = jQuery('<div style="float:left;width;30px;height:30px;" />');
                            t.gui.job.skills
                                .append(o
                                    .append(t
                                        .getSkillImg(
                                            i,
                                            30)))
                        }
                    }

                    this.showCur();

                },
                mode: function (e) {
                    var t = this;
                    // check the minimal allowed duration
                    var minDur = 2, J = t.parent.data.jobs.jobs;
                    for (var i in this.parent.data.jobs.jobs) { minDur = Math.min(J[i].durations.length - 1,minDur); };
                    if (minDur < e) { return this.mode(0); }; // Dun - correcting for level < 20
                    

                    this.parent.gui.job.mode.unbind("click");
                    switch (e) {
                    case 0:
                        this.base = 0;
                        this.basetime = 15;
                        this.parent.gui.job.mode.css("background-position", "0px 0px")
			    .click(function() { t.mode(1); t.parent.joblist.update(); });
                        break;
                    case 1:
                        this.base = 1;
                        this.basetime = 600;
                        this.parent.gui.job.mode.css("background-position", "-20px 0px")
			    .click(function() { t.mode(2); t.parent.joblist.update(); });
                        break;
                    case 2:
                        this.base = 2;
                        this.basetime = 3600;
                        this.parent.gui.job.mode.css("background-position", "-40px 0px")
			    .click(function() { t.mode(0); t.parent.joblist.update(); });
                        break;
                    };
                },
                _calcStepFormula: function(r1, r2, formula, points, malus, magic, mot, factor, freezeBronze) {
                    /*
                     * by steps until silver, then formula
                     * r1, r2 - what type of rounding is used on the calculated value
                     * formula - function(lp, stars) for calcing silver and gold (5 <= stars <= 15)
                     * pts - skill points towards job
                     * malus - difficulty-1
                     * mot - motivation in [0 - 100], if NOT affected by motivation, put 100
                     * factor - other stuff to multiply by before rounding
                     * freezeBronze - if set, bronze is constant magic
                     */
                    var step = Math.ceil((malus + 1) / 5),
                        stars = Math.min(Math.floor(points / step), 15),
                        dmot = Math.ceil(mot / 25) * 0.25;
                    return points < 5 * step || points <= malus ?
			Math[r1](({0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6.25})[freezeBronze ? 0 : stars] * magic * dmot * factor) :
			Math[r2](formula(points - malus, stars) * magic * dmot * factor);
                },
                calcWage: function(pts, mal, magic, mot, fac) {
                    return this._calcStepFormula('ceil', 'round', function(lp) { return 6.25 * Math.pow(lp, 0.05) }, pts, mal, magic, mot, fac);
                },
                calcExp: function (pts, mal, magic, mot, fac) {
                    return this._calcStepFormula('ceil', 'ceil', function (lp) { return 6.25 }, pts, mal, magic, mot, fac);
                },
                calcLuck: function (pts, mal, magic, mot, fac) {
                    return this._calcStepFormula('floor', 'floor', function (lp) { return 6.25 * Math.pow(lp, 0.2) }, pts, mal, (0.9 * magic + 5) / 1.25, 100, fac);
                },
                calcProductRate: function (pts, mal, magic, mot, fac) {
                    return this._calcStepFormula('round', 'round', function (lp, stars) { return stars < 15 ? 6.25 : 9.375 }, pts, mal, magic, 100, fac);
                },
                calcDanger: function (pts, mal, magic, mot, fac) {	// Dun change ceil by floor
                    return this._calcStepFormula('floor', 'floor', function (lp) { return Math.pow(lp, -0.2) }, pts, mal, magic, 100, fac, true);
                },
                addPremium: function (job) {	// Dun - adding premium bonus
                    var premiumChar = Number(Premium.hasBonus("character"));
                    var premium = Number(Premium.hasBonus("money"));
                    var premWages = 1;
                    if (premium) { premWages *= 1.5; };	// Add premium $ increase bonus
                    var premWorker = 1;
                    if (Character.charClass === 'worker') { premWorker = (premiumChar) ? 1.1 : 1.05; };	// Add worker increase bonus
                    var premAv = 1;
                    if (Character.charClass === 'adventurer') { premAv = (premiumChar) ? 0.8 : 0.9; };	// Add adventurer decrease bonus

                    job.values.cur_wages = Math.round(job.values.cur_wages * premWages);
                    job.values.cur_experience = Math.round(job.values.cur_experience * premWorker);
                    job.values.cur_luck2 = Math.floor(job.values.cur_luck2 * premWages);
                    job.values.cur_danger = Math.round(job.values.cur_danger * premAv);
                    job.values.wages = Math.round(job.values.wages * premWages);
                    job.values.experience = Math.round(job.values.experience * premWorker);
                    job.values.luck2 = Math.floor(job.values.luck2 * premWages);
                    job.values.danger = Math.round(job.values.danger * premAv);
                    return job;

                },
                calcJob: function(e) {
                    var job = this.parent.calcdata.jobs[e];
                    job.values = {};
                    job.sp = 0;
                    job.max_sp = 0;
                    job.laborpoints.skills = 0;
                    var difficulty = job.difficulty;
                    var realjob = JobList.getJobById(job.gameid);
                    for (var r in job.skills) {
                        job.laborpoints.skills += Number(job.skills[r]) * Number(CharacterSkills.skills[r].points);
                    };
                    job.laborpoints.sum = job.laborpoints.cloth;
                    job.laborpoints.sum += job.laborpoints.skills;
                    job.laborpoints.sum -= job.difficulty + 1;
                    if (isDefined(realjob)) {
                        job.laborpoints.current = realjob.calcJobPoints() - (realjob.malus + 1);
                        job.sp = realjob.calcJobPoints();
                        job.max_sp = job.laborpoints.skills + job.laborpoints.cloth;
                    } else {
                        job.laborpoints.current = 0;
                    };
                    if (job.gameid != 0) {
                        job.values.motivation = this.parent.data.jobs.jobs[job.gameid].motivation;
                        job.values.resmotivation = Math.ceil(this.parent.data.jobs.jobs[job.gameid].motivation * 4) / 4;
                    } else {
                        job.values.motivation = 0;
                        job.values.resmotivation = 0;
                    };
                    job.values.name = job.name;
                    job.values.laborpoints = Number(job.laborpoints.sum);
                    job.values.duration = Number(this.basetime);

                    // Dun - not found the real factor for 15sec / 10mn jobs, so used 0.1, 0.47 given by Petee
                    // perhaps make sense to find the real because the results rounded varies sometime with the result
                    // of TW calculs
                    var ponderation = 1;
                    switch (this.base) {
                    case 0:
                        ponderation = 0.1;
                        break;
                    case 1:
                        ponderation = 0.47;
                    default:
                        break;
                    };

                    // for formulas calcul the motivation need to be *100
                    var tmpMotiv = job.values.motivation * 100;

                    // Dun adding max rewards on priority
                    job.values.cur_wages = this.calcWage(job.sp, difficulty, job.wages, tmpMotiv, ponderation);
                    job.values.cur_experience = this.calcExp(job.sp, difficulty, job.experience, tmpMotiv, ponderation);
                    job.values.cur_luck1 = this.calcLuck(job.sp, difficulty, job.luck, tmpMotiv, 1);
                    job.values.cur_luck2 = this.calcLuck(job.sp, difficulty, job.luck, tmpMotiv, 3);
                    job.values.cur_danger = this.calcDanger(job.sp, difficulty, job.danger, tmpMotiv, 1);
                    job.values.wages = this.calcWage(job.max_sp, difficulty, job.wages, job.values.resmotivation * 100, ponderation);
                    job.values.experience = this.calcExp(job.max_sp, difficulty, job.experience, job.values.resmotivation * 100, ponderation);
                    job.values.luck1 = this.calcLuck(job.max_sp, difficulty, job.luck, job.values.resmotivation * 100, 1);
                    job.values.luck2 = this.calcLuck(job.max_sp, difficulty, job.luck, job.values.resmotivation * 100, 3);
                    job.values.danger = this.calcDanger(job.max_sp, difficulty, job.danger, job.values.resmotivation * 100, 1);
                    return this.addPremium(job);
                },
                getJobPopup: function(e) {
                    var t = this.parent.calcdata.jobs[e].values;
                    t.laborpoints = this.parent.calcdata.jobs[e].laborpoints.sum;
                    var n = "<table>" + '<tr><td colspan="4" style="font-weight:bold;text-align:center;font-size:11px;">' + this.parent.calcdata.jobs[e].name + "</td></tr>"
			+ '<tr><td><img src="' + TWDB.images.iconExperience + '" title=" #EXPERIENCE# " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.experience + "</td>"
			    + '<td><img src="' + TWDB.images.iconDollar + '" title=" #WAGES# " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.wages + "</td></tr>"
			+ '<tr><td><img src="' + TWDB.images.iconLuck + '" title=" #LUCK# " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.luck1 + "-" + t.luck2 + "</td>"
			    + '<td><img src="' + TWDB.images.iconDanger + '" title=" #DANGER# " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.danger + "</td></tr>"
			+ '<tr><td><img src="' + TWDB.images.iconLaborpoints + '" title=" #LABORPOINTS# " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.laborpoints + "</td>"
			    + '<td><img src="' + TWDB.images.iconClock + '" title=" #DURATION# " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.duration + "</td></tr>"
			+ '<tr><td><img src="' + TWDB.images.iconMoti + '" title=" #MOTIVATION# "  height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.resmotivation * 100 + ' (' + Math.round(t.motivation * 100) + ")%</td><td></td><td></td></tr>" + "</table>";
                    return n;
                }
            }),
            joblist: {
                ready: false,
                gui: {},
                elements: [],
                focused: 0,
                sort: {
                    type: "name",
                    order: 1
                },
                all: false,
                name: null,
                reset: function () {
                    this.ready = false;
                    delete this.elements;
                    this.elements = [];
                    this.getMainDiv().children().remove();
                    this
                        .getMainDiv()
                        .append(
                            '<style type="text/css">.TWDB_hide{display:none;}.TWDB_filter{display:none;}</style>');
                    this.init(this.parent)
                },
                init: function (e) {
                    if (this.ready) {
                        return

                    }
                    this.ready = true;
                    this.parent = e;
                    if (!this.gui.main) {
                        this.gui.main = this.getMainDiv()
                    }
                    this.gui.result = jQuery('<div class="tw2gui_jobsearchbar_allresults" style="width:285px;" />');
                    this.gui.input = (new TWDB.GameAPI.gui.textfield)
                        .maxlength(12).setClass4Input(
                            "tw2gui_jobsearch_string")
                        .setWidth(265);
                    this.gui.button = jQuery('<div class="tw2gui_jobsearch_showall" style="display:block;cursor:pointer;"></div>');
                    this.gui.scrollpane = new TWDB.GameAPI.gui.scrollpane;
                    jQuery(this.gui.scrollpane.getMainDiv())
                        .css("width", "285px").css(
                            "height", "250px");
                    for (var t in e.calcdata.jobs) {
                        var n = e.calcdata.jobs[t];
                        var r = jQuery("<p>" + n.name + "</p>");
                        var i = {};
                        i.dom = r;
                        i.id = t;
                        i.str = n.name.toUpperCase() + " ";
                        if (n.gameid != 0) {
                            var s = JobList
                                .getJobById(n.gameid);
                            for (var o in s.yields) {
                                if (isNaN(o))
                                    continue;
                                var u = ItemManager.get(o);
                                i.str += u.name.toUpperCase() + " "
                            }
                        }
                        this.elements.push(i)
                    }
                    this.gui.main
                        .append(
                            jQuery(
                                '<div style="position:relative;top:0;left:0;width:305px" />')
                            .append(
                                this.gui.input
                                .getMainDiv())
                            .append(
                                this.gui.button))
                        .append(this.gui.result);
                    this.update();
                    if (this.name) {
                        this.open(this.name)
                    }
                },
                open: function (e) {
                    var t = this;
                    this.gui.result.show();
                    jQuery(this.gui.input.getMainDiv()).keyup(
                        function (e) {
                            t.keyHandler(e)
                        });
                    jQuery(this.gui.input.getMainDiv()).find(
                        "input").focus(function () {
                        t.gui.result.show()
                    });
                    delete this.gui.scrollpane;
                    this.gui.scrollpane = new TWDB.GameAPI.gui.scrollpane;
                    jQuery(this.gui.scrollpane.getMainDiv())
                        .css({
                            "width": "285px",
                            "height": "250px"
                        });
                    var n = true;
                    jQuery.each(this.elements, function (e, r) {
                        r.dom.unbind(); // Dun - remove clic
                        // listener
                        t.updateJob(e);
                        if (n && r.dom.is(":visible")) {
                            this.focused = e;
                            r.dom.addClass("focused");
                            n = false
                        } else {
                            r.dom.removeClass("focused")
                        }
                        r.dom.addMousePopup(TWDB.ClothCalc.jobs
                            .getJobPopup(r.id));
                        r.dom.click(function (e) {
                            return function () {

                                t.close();
                                TWDB.ClothCalc.jobs
                                    .switchJob(e)
                            }
                        }(r.id));
                        t.gui.scrollpane.appendContent(r.dom)
                    });
                    this.gui.result.children().remove();
                    this.gui.result.append(this.gui.scrollpane
                        .getMainDiv());
                    this.gui.button.click(function () {
                        if (t.gui.result.is(":visible")) {
                            t.gui.result.hide()
                        } else {
                            jQuery(t.gui.input.getMainDiv())
                                .find("input").focus()
                        }
                    });
                    this.gui.main.show();
                    if (isDefined(e)) {
                        jQuery(this.gui.input.getMainDiv())
                            .find("input").attr("value", e);
                        jQuery(this.gui.input.getMainDiv())
                            .keyup()
                    }
                },
                search: function (e) {
                    var t = new RegExp(e.toUpperCase(), "i");
                    var n = true;
                    var r = this;
                    jQuery.each(this.elements, function (e, i) {
                        i.dom.removeClass("focused");
                        if (t.test(i.str)) {
                            i.dom.removeClass("TWDB_filter");
                            if (n && i.dom.is(":visible")) {
                                r.focused = e;
                                i.dom.addClass("focused");
                                n = false
                            }
                        } else {
                            i.dom.addClass("TWDB_filter")
                        }
                    })
                },
                keyHandler: function (e) {
                    var t = e.keyCode ? e.keyCode : e.which;
                    if (t == 38 || t == 40) {
                        if (t == 38) {
                            this.elements[this.focused].dom
                                .removeClass("focused");
                            for (var n = 0; n < this.elements.length; n++) {
                                this.focused--;
                                if (this.focused < 0) {
                                    this.focused = this.elements.length - 1
                                }
                                if (this.elements[this.focused].dom
                                    .is(":visible")) {
                                    this.elements[this.focused].dom
                                        .addClass("focused");
                                    break
                                }
                            }
                        } else {
                            this.elements[this.focused].dom
                                .removeClass("focused");
                            for (var n = 0; n < this.elements.length; n++) {
                                this.focused++;
                                if (this.focused >= this.elements.length) {
                                    this.focused = 0
                                }
                                if (this.elements[this.focused].dom
                                    .is(":visible")) {
                                    this.elements[this.focused].dom
                                        .addClass("focused");
                                    break
                                }
                            }
                        }
                        var r = this.elements[this.focused].dom
                            .offset().top;
                        var i = jQuery(
                                this.gui.scrollpane.clipPane)
                            .offset().top;
                        if (r - i > 180) {
                            var s = (r - i - 90) / 16;
                            this.gui.scrollpane.scrollTo(0, s)
                        } else if (i - r > 0) {
                            var s = (r - i - 90) / 16;
                            this.gui.scrollpane.scrollTo(0, s)
                        }
                    } else if (t == 13) {
                        this.elements[this.focused].dom.click()
                    } else {
                        this.search(this.gui.input.getValue())
                    }
                },
                order: function (e) {
                    function r(t, r) {
                        var i = TWDB.ClothCalc.calcdata.jobs[t.id].values[e];
                        var s = TWDB.ClothCalc.calcdata.jobs[r.id].values[e];
                        return i > s ? n : -n
                    }

                    function i(t, r) {
                        var i = TWDB.ClothCalc.calcdata.jobs[t.id].values[e];
                        var s = TWDB.ClothCalc.calcdata.jobs[r.id].values[e];
                        return i * 1 > s * 1 ? n : -n
                    }
                    var t = true;
                    if (e) {
                        if (e == this.sort.type) {
                            this.sort.order *= -1
                        } else {
                            t = false;
                            if (e == "danger" || e == "name") {
                                this.sort.order = 1
                            } else {
                                this.sort.order = -1
                            }
                            this.sort.type = e
                        }
                    }
                    var n = this.sort.order;
                    var e = this.sort.type;
                    if (e == "name") {
                        this.elements.sort(r)
                    } else {
                        this.elements.sort(i)
                    }
                    var s = this;
                    var o = true;
                    jQuery.each(this.elements, function (e, n) {
                        if (!t) {
                            s.updateJob(e)
                        }
                        if (o && n.dom.is(":visible")) {
                            this.focused = e;
                            n.dom.addClass("focused");
                            o = false
                        } else {
                            n.dom.removeClass("focused")
                        }
                        s.gui.scrollpane.appendContent(n.dom)
                    });
                    // Dun - switch on current rewards when clic
                    // on sorting button
                    this.parent.jobs.showCur();

                },
                updateJob: function (e) { // Dun - Add
                    // max/current
                    // values
                    var t = this.elements[e];
                    var n = TWDB.ClothCalc.jobs.calcJob(t.id);
                    t.dom.removeClass("TWDB_hide");
                    var r = n.name;
                    r += " [" + n.laborpoints.current + "/" + n.laborpoints.sum + "] ";
                    switch (this.sort.type) {
                    case "luck1":
                        r += " $" + n.values.luck1 + "-" + "$" + n.values.luck2;
                        break;
                    case "laborpoints":

                        break;
                    case "experience":
                        r += n.values.experience + "exp";

                        break;
                    case "wages":
                        r += "$" + n.values.wages;

                        break;
                    case "danger":
                        r += n.values.danger + "%";

                        break;
                    case "duration":
                        r += n.values.duration + " sec";
                        break;
                    case "motivation":
                        r += n.values.resmotivation * 100 + " (" + Math
                            .round(n.values.motivation * 100) + ")%";
                        break
                    }
                    t.dom.html(r);
                    if (n.laborpoints.current < 0) {
                        if (n.laborpoints.sum < 0) {
                            if (JobList.getJobById(t.id).level <= Character.level) {
                                t.dom.css("color", "blue")
                            } else {
                                t.dom.css("color", "red");
                                if (!this.all) {
                                    t.dom.addClass("TWDB_hide")
                                }
                            }
                        } else {
                            t.dom.css("color", "orange")
                        }
                    } else {
                        t.dom.css("color", "#333333")
                    }
                    return n
                },
                update: function () {
                    var e = this;
                    jQuery.each(this.elements, function (t, n) {
                        e.updateJob(t)
                    });
                    this.order()
                },
                getMainDiv: function () {
                    if (!this.gui.main) {
                        this.gui.main = jQuery(
                                '<div style="position:absolute;left: 255px; top: 30px; display: none;" />')
                            .append(
                                '<style type="text/css">.TWDB_hide{display:none;}.TWDB_filter{display:none;}</style>')
                    }
                    return this.gui.main
                },
                close: function () {
                    this.gui.main.hide()
                }
            },
            customs: new Object({
                selected: 0,
                setParent: function (e) {
                    this.parent = e
                },
                init: function () {
                    for (var e in this.parent.calcdata.custom) {
                        try {
                            var t = this.parent.calcdata.custom[e];
                            switch (t.type) {
                            case "speed":
                                t.skills = ["ride"];
                                if (!t.laborpoints) {
                                    var n = (t.cloth && t.cloth[1] && t.cloth[1]["other"] && t.cloth[1]["other"][1]) || 0;
                                    var r = (t.boni && t.boni.other && t.boni.other[1]) || 0;
                                    r -= n;
                                    n += (t.boni && t.boni.skill && t.boni.skill[2]) || 0;
                                    n += (t.boni && t.boni.skill && t.boni.skill[10]) || 0;
                                    n += CharacterSkills.skills.ride.points;
                                    t.laborpoints = Math.round((100 + n) * (1 + r / 100));
                                }
                                t.laborpoints += "%";
                                break;
                            case "regen":
                                t.skills = ["health"];
                                t.laborpoints = "";
                                break;
                            case "fort":
                                if (t.para.type == 0) {
                                    var i = {};
                                    i.aim = CharacterSkills.skills.aim.points + (typeof t.boni.skill[3] != "undefined" ? t.boni.skill[3] : 0) + (typeof t.boni.skill[15] != "undefined" ? t.boni.skill[15] : 0);
                                    i.endurance = CharacterSkills.skills.endurance.points + (typeof t.boni.skill[1] != "undefined" ? t.boni.skill[1] : 0) + (typeof t.boni.skill[8] != "undefined" ? t.boni.skill[8] : 0);
                                    i.dodge = CharacterSkills.skills.dodge.points + (typeof t.boni.skill[2] != "undefined" ? t.boni.skill[2] : 0) + (typeof t.boni.skill[12] != "undefined" ? t.boni.skill[12] : 0);
                                    i.leadership = CharacterSkills.skills.leadership.points + (typeof t.boni.skill[4] != "undefined" ? t.boni.skill[4] : 0) + (typeof t.boni.skill[20] != "undefined" ? t.boni.skill[20] : 0);
                                    i.health = CharacterSkills.skills.health.points + (typeof t.boni.skill[1] != "undefined" ? t.boni.skill[1] : 0) + (typeof t.boni.skill[9] != "undefined" ? t.boni.skill[9] : 0);
                                    var s = 100 + (Character.level - 1) * Character.lifePointPerHealthSkill + i.health * (Character.lifePointPerHealthSkill + Character.lifePointPerHealthSkillBonus) + " | ";
                                    s += Math
                                        .round((25 + Math
                                            .pow(
                                                i.leadership * 1 + (Character.charClass == "soldier" ? Premium
                                                    .hasBonus("character") ? .5 : .25 : 0),
                                                .4) + Math
                                            .pow(
                                                i.aim,
                                                .4) + Math
                                            .pow(
                                                i.endurance,
                                                .4)) * 100) / 100 + " | ";
                                    s += Math
                                        .round((10 + Math
                                            .pow(
                                                i.leadership * 1 + (Character.charClass == "soldier" ? Premium
                                                    .hasBonus("character") ? .5 : .25 : 0),
                                                .4) + Math
                                            .pow(
                                                i.dodge,
                                                .4) + Math
                                            .pow(
                                                i.endurance,
                                                .4)) * 100) / 100
                                } else {
                                    var i = {};
                                    i.aim = CharacterSkills.skills.aim.points + (typeof t.boni.skill[3] != "undefined" ? t.boni.skill[3] : 0) + (typeof t.boni.skill[15] != "undefined" ? t.boni.skill[15] : 0);
                                    i.hide = CharacterSkills.skills.hide.points + (typeof t.boni.skill[2] != "undefined" ? t.boni.skill[2] : 0) + (typeof t.boni.skill[13] != "undefined" ? t.boni.skill[13] : 0);
                                    i.dodge = CharacterSkills.skills.dodge.points + (typeof t.boni.skill[2] != "undefined" ? t.boni.skill[2] : 0) + (typeof t.boni.skill[12] != "undefined" ? t.boni.skill[12] : 0);
                                    i.leadership = CharacterSkills.skills.leadership.points + (typeof t.boni.skill[4] != "undefined" ? t.boni.skill[4] : 0) + (typeof t.boni.skill[20] != "undefined" ? t.boni.skill[20] : 0);
                                    i.health = CharacterSkills.skills.health.points + (typeof t.boni.skill[1] != "undefined" ? t.boni.skill[1] : 0) + (typeof t.boni.skill[9] != "undefined" ? t.boni.skill[9] : 0);
                                    var s = 100 + (Character.level - 1) * Character.lifePointPerHealthSkill + i.health * (Character.lifePointPerHealthSkill + Character.lifePointPerHealthSkillBonus) + " | ";
                                    s += Math
                                        .round((25 + Math
                                            .pow(
                                                i.leadership * 1 + (Character.charClass == "soldier" ? Premium
                                                    .hasBonus("character") ? .5 : .25 : 0),
                                                .4) + Math
                                            .pow(
                                                i.aim,
                                                .4) + Math
                                            .pow(
                                                i.hide,
                                                .4)) * 100) / 100 + " | ";
                                    s += Math
                                        .round((10 + Math
                                            .pow(
                                                i.leadership * 1 + (Character.charClass == "soldier" ? Premium
                                                    .hasBonus("character") ? .5 : .25 : 0),
                                                .4) + Math
                                            .pow(
                                                i.dodge,
                                                .4) + Math
                                            .pow(
                                                i.hide,
                                                .4)) * 100) / 100
                                }
                                t.skills = ["health", "attacker", "defender"];
                                t.laborpoints = s;
                                break;
                            case "duel":
                                t.skills = [];
                                var s = 0;
                                for (var o in t.para) {
                                    var u = Math
                                        .floor(o / 5);
                                    if (typeof t.boni.skill[o] != "undefined") {
                                        s += t.boni.skill[o]
                                    }
                                    if (typeof t.boni.skill[u] != "undefined") {
                                        s += t.boni.skill[u]
                                    }
                                    if (typeof this.parent._id2skill[o] != "undefined") {
                                        t.skills
                                            .push(this.parent._id2skill[o]);
                                        if (typeof CharacterSkills.skills[this.parent._id2skill[o]] != "undefined") {
                                            s += CharacterSkills.skills[this.parent._id2skill[o]].points
                                        } else if (typeof CharacterSkills.attributes[this.parent._id2skill[o]] != "undefined") {
                                            s += CharacterSkills.attributes[this.parent._id2skill[o]].points
                                        }
                                    }
                                }
                                t.laborpoints = s;
                                break;
                            case "custom":
                                t.skills = [];
                                var s = 0;
                                for (var o in t.para) {

                                    var u = Math
                                        .floor(o / 5);
                                    if (typeof t.boni.skill[o] != "undefined") {
                                        s += t.boni.skill[o]
                                    }
                                    if (typeof t.boni.skill[u] != "undefined") {
                                        s += t.boni.skill[u]
                                    }
                                    if (typeof this.parent._id2skill[o] != "undefined") {
                                        t.skills
                                            .push(this.parent._id2skill[o]);
                                        if (typeof CharacterSkills.skills[this.parent._id2skill[o]] != "undefined") {
                                            s += CharacterSkills.skills[this.parent._id2skill[o]].points
                                        } else if (typeof CharacterSkills.attributes[this.parent._id2skill[o]] != "undefined") {
                                            s += CharacterSkills.attributes[this.parent._id2skill[o]].points
                                        }
                                    }
                                }
                                t.laborpoints = s;
                                break;
                            default:
                                return;
                                break
                            }
                        } catch (a) {
                            TWDB.Error
                                .report(a,
                                    "GENERICERROR#; handle Customs")
                        }
                    }
                },
                calc: function () {
                    // Dun - clarify condition and
                    // remove the 0 which appeared
                    var e = this.parent.calcdata.custom[this.selected];
                    if (isDefined(e) && e.type == "fort") {
                        return "0|0|0"

                    } else {
                        return "";

                    }

                },
                createSelectbox: function () {
                    if (!this.parent.gui.custom.selectbox) {
                        return

                    }
                    this.parent.gui.custom.selectbox.elContent
                        .empty();
                    this.parent.gui.custom.selectbox.value = null;
                    this.parent.gui.custom.selectbox.items = [];
                    for (var e in this.parent.calcdata.custom) {
                        var t = this.parent.calcdata.custom[e].name + " [" + this.parent.calcdata.custom[e].laborpoints + "]";
                        this.parent.gui.custom.selectbox
                            .addItem(e, t)
                    }
                    this.switchCustomJob(this.selected)
                },
                switchCustomJob: function (e) {
                    // if (typeof
                    // this.parent.calcdata.custom[e] ==
                    // "undefined"
                    // || typeof
                    // this.parent.calcdata.custom[e].cloth
                    // == "undefined") {
                    // return
                    // }
                    // Dun - change for isDefined func
                    // and simplify condition
                    if (isDefined(this.parent.calcdata.custom[e]) && isDefined(this.parent.calcdata.custom[e].cloth)) {

                        var t = this.parent;
                        this.parent.customs.selected = e;
                        var n = " [" + this.parent.calcdata.custom[e].laborpoints + "]";
                        n = this.parent.calcdata.custom[e].name
                            .substring(0,
                                35 - n.length) + n;
                        this.parent.gui.custom.title
                            .html(n);
                        this.parent.bag
                            .showItems(
                                this.parent.calcdata.custom[e].cloth,
                                "custom");
                        this.showSkill()
                    } else {
                        return;
                    }
                },
                showSkill: function () {
                    this.parent.gui.custom.skills
                        .children().remove();
                    // Dun - change for isDefined func
                    if (!isDefined(this.parent.calcdata.custom[this.parent.customs.selected])) {
                        return

                    }
                    if (this.parent.calcdata.custom[this.parent.customs.selected].type == "fort") {
                        return

                    }
                    var e = this.calc();
                    var t = String(e).split("|");
                    for (var n = 0; n < this.parent.calcdata.custom[this.selected].skills.length; n++) {
                        var r = jQuery('<div style="float:left;width:30px;height:30px;" />');
                        r
                            .append(this.parent
                                .getSkillImg(
                                    this.parent.calcdata.custom[this.selected].skills[n],
                                    30));
                        this.parent.gui.custom.skills
                            .append(r);

                        if (this.parent.calcdata.custom[this.parent.customs.selected].type == "fort" && typeof t[n] != "undefined") {
                            var i = jQuery('<div style="float:left;height:25px;padding:5px 10px 0px 5px ;font-weight:bold;">' + t[n] + "</div>");
                            this.parent.gui.custom.skills
                                .append(i)
                        }
                    }
                    if (this.parent.calcdata.custom[this.parent.customs.selected].type != "fort") {
                        var i = jQuery('<div style="float:left;height:25px;padding:5px 0px 0px 5px ;font-weight:bold;">' + e + "</div>");
                        this.parent.gui.custom.skills
                            .append(i)
                    }
                },
                showConfig: function () {
                    var e = this;
                    var t = jQuery('<div title="#EDIT#" style="display:inline-block;vertical-align:top;height:16px;width:16px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/window/messages/head-icons.png') repeat scroll 0 16px transparent;\" />");
                    var n = jQuery('<div title="#DELETE#" style="display:inline-block;vertical-align:top;height:16px;width:16px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/icons/delete.png') repeat scroll 0px 0px transparent;\" />");
                    var r = jQuery('<div title="#ADD#" style="display:block;margin-top:2px;vertical-align:top;height:20px;width:25px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/window/messages/icons.png') repeat scroll 72px -5px transparent;\" />");
                    var i = jQuery("<div />");
                    for (var s in this.parent.data.custom) {
                        var o = this.parent.data.custom[s];
                        var u = jQuery(
                                '<div style="display:inline-block;vertical-align:top;height:16px;width:300px;overflow:hidden;" />')
                            .html(o.name);
                        var a = t.clone(false);
                        var f = n.clone(false);
                        var l = jQuery(
                                '<div style="display:block;height:18px;padding: 3px 0px 0px 0px;border-bottom: 1px solid #666" />')
                            .append(u).append(a)
                            .append(f);
                        i.append(l);
                        var c = function (t) {
                            return function () {
                                e.editConfig(t)
                            }
                        }(s);
                        a.click(c);
                        var c = function (t) {
                            return function () {
                                e.deleteConfig(t)
                            }
                        }(s);
                        f.click(c)
                    }
                    var h = 0;
                    for (var s in this.parent.data.custom) {
                        h++
                    }
                    if (h < 15) {
                        i.append(r);
                        r.click(function () {
                            e.addConfig()
                        })
                    }
                    this.parent.gui.custom.config = new TWDB.GameAPI.gui.dialog(
                        "#CUSTOM#", i);
                    this.parent.gui.custom.config
                        .addButton(
                            "ok",
                            function () {
                                e.parent
                                    .checkCache()
                            });
                    this.parent.gui.custom.config
                        .show()
                },
                addConfig: function () {
                    var e = 0;
                    for (var t in this.parent.data.custom) {
                        e++
                    }
                    if (e >= 15) {
                        (new UserMessage(
                            "#CLOTHCALC_TOOMUCH#",
                            UserMessage.TYPE_ERROR))
                        .show()
                    } else {
                        e++;
                        this.editConfig(e)
                    }
                },
                htmlUnEscape: function (str) {
                    return String(str).replace(
                        /&amp;/g, '&').replace(
                        /&quot/g, '"').replace(
                        /&#39;/g, "'").replace(
                        /&lt;/g, '<').replace(
                        /&gt;/g, '>');
                },
                htmlEscape: function (str) {
                    return String(str).replace(/&/g,
                        '&amp;').replace(/"/g,
                        '&quot;').replace(/'/g,
                        '&#39;').replace(/</g,
                        '&lt;').replace(/>/g,
                        '&gt;');
                },
                editConfig: function (e, t) {
                    if (typeof t == "undefined") {
                        var n = this;
                        var r = "";
                        var i = "";
                        var s = "#ADD# - ";
                        if (typeof this.parent.data.custom[e] != "undefined") {
                            s = "#EDIT# - ";
                            var r = this.parent.data.custom[e].name;
                            var i = JSON
                                .stringify({
                                    type: this.parent.data.custom[e].type,
                                    para: this.parent.data.custom[e].para
                                })
                        }
                        this.tmp = {
                            name: r,
                            code: i
                        };
                        this.parent.gui.custom.name = (new TWDB.GameAPI.gui.textfield(
                                "twdb_cc_custom_name"))
                            .setSize(30)
                            .setValue(
                                this
                                .htmlUnEscape(r));
                        this.parent.gui.custom.code = (new TWDB.GameAPI.gui.textfield(
                                "twdb_cc_custom_code"))
                            .setSize(30)
                            .setValue(i);
                        var o = jQuery('<table width="400px" />');
                        o
                            .append(jQuery("<tr />")
                                .append(
                                    '<td style="vertical-align:middle">#NAME#:</td>')
                                .append(
                                    jQuery(
                                        "<td />")
                                    .append(
                                        this.parent.gui.custom.name
                                        .getMainDiv())));
                        o
                            .append(jQuery("<tr />")
                                .append(
                                    '<td style="vertical-align:middle">#CODE#:</td>')
                                .append(
                                    jQuery(
                                        "<td />")
                                    .append(
                                        this.parent.gui.custom.code
                                        .getMainDiv())));
                        o
                            .append('<tr><td colspan="2">#CLOTHCALC_CUSTOMHELP# <a href="http://tw-db.info/?strana=calc" target="_blank">tw-db.info #CALCULATOR#</a></td></tr>');
                        var o = new TWDB.GameAPI.gui.dialog(
                            s + "#CUSTOM#", o);
                        o
                            .addButton(
                                "ok",
                                function () {
                                    return n
                                        .editConfig(
                                            e,
                                            true)
                                });
                        o.addButton("cancel");
                        o.show()
                    } else {
                        var u = function (e) {
                            (new UserMessage(
                                "#WRONG_INSERTS#: " + e,
                                UserMessage.TYPE_ERROR))
                            .show();
                            return false
                        };
                        if (this.parent.gui.custom.name
                            .getValue() == "") {
                            return u("#EMPTY# #NAME#")
                        }
                        if (this.parent.gui.custom.code
                            .getValue() == "") {
                            return u("#EMPTY# #CODE# [1]")
                        }
                        if (this.parent.gui.custom.name
                            .getValue() == this.tmp.name && this.parent.gui.custom.code
                            .getValue() == this.tmp.code) {
                            return true
                        }
                        try {
                            var i = jQuery
                                .parseJSON(this.parent.gui.custom.code
                                    .getValue())
                        } catch (a) {
                            return u("#WRONG# #CODE# [2]")
                        }
                        if (typeof i.type == "undefined" || typeof i.para == "undefined") {
                            return u("#WRONG# #CODE# [3]")
                        }
                        var f = 0;
                        for (var l in i.para) {
                            f++
                        }
                        switch (i.type) {
                        case "speed":
                        case "regen":
                            if (f != 0) {
                                return u("#WRONG# #CODE# [4]")
                            }
                            break;
                        case "fort":
                            if (typeof i.para.type == "undefined" || typeof i.para.att == "undefined" || typeof i.para.def == "undefined" || typeof i.para.health == "undefined") {
                                return u("#WRONG# #CODE# [5]")
                            }
                            if (i.para.type != 1 && i.para.type != 0) {
                                return u("#WRONG# #CODE# [6]")
                            }
                            if (!jQuery
                                .isNumeric(i.para.att) || i.para.att < 0) {
                                return u("#WRONG# #CODE# [7]")
                            }
                            if (!jQuery
                                .isNumeric(i.para.def) || i.para.def < 0) {
                                return u("#WRONG# #CODE# [8]")
                            }
                            if (!jQuery
                                .isNumeric(i.para.health) || i.para.health < 0) {
                                return u("#WRONG# #CODE# [9]")
                            }
                            break;
                        case "duel":
                        case "custom":
                            if (f <= 0) {
                                return u("#WRONG# #CODE# [10]")
                            }
                            break;
                        default:
                            return u("#WRONG# #CODE# [11]")
                        }
                        delete this.tmp;
                        this.parent.data.custom[e] = {
                            id: Number(e),
                            type: i.type,
                            para: i.para,
                            name: this
                                .htmlEscape(this.parent.gui.custom.name
                                    .getValue())
                        };
                        this.parent.gui.custom.config
                            .hide();
                        this.showConfig();
                        TWDB.Settings
                            .set(
                                "custom",
                                this.parent.data.custom)
                    }
                },
                deleteConfig: function (e, t) {
                    if (typeof t == "undefined") {
                        var n = this;
                        var r = new TWDB.GameAPI.gui.dialog(
                            "#DELETE# - #CUSTOM#",
                            "#DELETE#: " + this.parent.data.custom[e].name + "?");
                        r.addButton("ok", function () {
                            n.deleteConfig(e, true)
                        });
                        r.addButton("cancel");
                        r.show()
                    } else {
                        var i = this.parent.data.custom;
                        delete i[e];
                        this.parent.data.custom = {};
                        var s = 0;
                        for (var e in i) {
                            s++;
                            this.parent.data.custom[s] = i[e];
                            this.parent.data.custom[s].id = s
                        }
                        this.parent.gui.custom.config
                            .hide();
                        this.showConfig();
                        TWDB.Settings
                            .set(
                                "custom",
                                this.parent.data.custom)
                    }
                }
            }),
            getSkillImg: function (e, t) {
                var n = 1;
                var r = 1;
                var i = 0;
                switch (e) {
                case "build":
                    var s = Game.cdnURL + "/images/skill/skills_strength.png";
                    r = 2;
                    break;
                case "punch":
                    var s = Game.cdnURL + "/images/skill/skills_strength.png";
                    i = 1;
                    r = 2;
                    break;
                case "tough":
                    var s = Game.cdnURL + "/images/skill/skills_strength.png";
                    i = 2;
                    r = 2;
                    break;
                case "endurance":
                    var s = Game.cdnURL + "/images/skill/skills_strength.png";
                    i = 3;
                    r = 2;
                    break;
                case "health":
                    var s = Game.cdnURL + "/images/skill/skills_strength.png";
                    i = 4;
                    r = 2;
                    break;
                case "ride":
                    var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                    r = 2;
                    break;
                case "reflex":
                    var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                    i = 1;
                    r = 2;
                    break;
                case "dodge":
                    var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                    i = 2;
                    r = 2;
                    break;
                case "hide":
                    var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                    i = 3;
                    r = 2;
                    break;
                case "swim":
                    var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                    i = 4;
                    r = 2;
                    break;
                case "aim":
                    var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                    r = 2;
                    break;
                case "shot":
                    var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                    i = 1;
                    r = 2;
                    break;
                case "pitfall":
                    var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                    i = 2;
                    r = 2;
                    break;
                case "finger_dexterity":
                    var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                    i = 3;
                    r = 2;
                    break;
                case "repair":
                    var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                    i = 4;
                    r = 2;
                    break;
                case "leadership":
                    var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                    r = 2;
                    break;
                case "tactic":
                    var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                    i = 1;
                    r = 2;
                    break;
                case "trade":
                    var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                    i = 2;
                    r = 2;
                    break;
                case "animal":
                    var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                    i = 3;
                    r = 2;
                    break;
                case "appearance":
                    var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                    i = 4;
                    r = 2;
                    break;
                case "strength":
                    var s = Game.cdnURL + "/images/window/skills/circle_strength.png"; //Dun correct url
                    break;
                case "flexibility":
                    var s = Game.cdnURL + "/images/window/skills/circle_flexibility.png"; //Dun correct url
                    break;
                case "dexterity":
                    var s = Game.cdnURL + "/images/window/skills/circle_dexterity.png"; //Dun correct url
                    break;
                case "charisma":
                    var s = Game.cdnURL + "/images/window/skills/circle_charisma.png"; //Dun correct url
                    break;
                case "attacker":
                    var s = TWDB.images.attacker;
                    break;
                case "defender":
                    var s = TWDB.images.defender;
                    break;
                default:
                    return jQuery("<div />")
                }
                var o = "";
                if (typeof CharacterSkills.skills[e] != "undefined") {
                    var o = CharacterSkills.skills[e].name
                } else if (typeof CharacterSkills.attributes[e] != "undefined") {
                    var o = CharacterSkills.attributes[e].name
                }
                s = '<img src="' + s + '" height="' + t * r + '" title="' + o + '" style="margin-left:-' + i * t + 'px" />';
                s = jQuery(s);
                var u = '<div style="display:block;overflow:hidden;width:' + t * n + "px;height:" + t + 'px;"/>';
                u = jQuery(u);
                return u.append(s)
            },
            bag: new Object({
                stack: {},
                interval: false,
                setParent: function (e) {
                    this.parent = e
                },
                showItems: function (e, t) {
                    this.parent.gui.bag.children()
                        .remove();
                    this.items = {};
                    var n = this;
                    var r = false;
                    addItem = function (e) {
                        var r = ItemManager.get(e);
                        var i = new tw2widget.InventoryItem(
                            r);
                        i.setCharacter(Character); //Dun correct bonus values
                        var s = i.getMainDiv();
                        var o = function (e) {
                            return function () {
                                n.click(i, e, t)
                            }
                        }(e);
                        /*
                         * TODO perhaps add the avg for weapons
                         */
                        jQuery(s).removeAttr("id");
                        jQuery(s).children(
                            ".TWDBbuyTip").remove();
                        jQuery(s).children(
                                ".TWDBsellTip")
                            .remove();
                        jQuery(s).children(
                                ".TWDBcollector")
                            .remove();
                        jQuery(s).children(
                                "img:first-child")
                            .removeAttr("id")
                            .click(o);
                        jQuery(s).appendTo(
                            n.parent.gui.bag);
                        n.items[e] = jQuery(s)
                    };
                    for (var i in e) {
                        if (typeof i == "function") {
                            break
                        }
                        var s = e[i].id;
                        var o = ItemManager.get(s);
                        addItem(s);
                        if (o.type == "animal") {
                            r = true
                        }
                    }
                    var u = TWDB.DataManager
                        .getAnimals();
                    if (!r && u.length > 0) {
                        addItem(u[0]["id"])
                    }
                    this.wear()
                },
                click: function (e, t, n) {
                    var r = Bag.getItemByItemId(t);
                    if (r === undefined) {
                        return false
                    }
                    Wear.carry(e);
                    this.stack[t] = e;
                    if (this.interval === false) {
                        var i = this;
                        switch (n) {
                        case "jobs":
                            var s = function () {
                                i.wear();
                                i.parent.jobs.update();
                                i.parent.joblist
                                    .update()
                            };
                            break;
                        case "custom":
                            var s = function () {
                                i.wear();
                                i.parent.customs
                                    .showSkill()
                            };
                            break
                        }
                        TWDB.Eventer.set(
                            "carryChecker", s, 1);
                        this.interval = setInterval(
                            function () {
                                i.carry()
                            }, 100)
                    }
                },
                carry: function () {
                    var e = 0;
                    for (var t in this.stack) {
                        var n = this.stack[t];
                        if (n == undefined || n.getImgEl().css(
                            "opacity") == 1) {
                            delete this.stack[t]
                        } else {
                            e++
                        }
                    }
                    if (e == 0) {
                        clearInterval(this.interval);
                        this.interval = false;
                        TWDB.Eventer
                            .trigger("carryChecker")

                    }
                },
                wear: function () {
                    for (var e in Wear.wear) {
                        var t = Wear.wear[e].obj.item_id;
                        if (typeof this.items[t] != "undefined") {
                            this.items[t].css(
                                "opacity", "0.5")
                        }
                    }
                }
            }),
            setUsedItems: function () {
                for (var e in this.calcdata.jobs) {
                    for (var t in this.calcdata.jobs[e].cloth) {
                        var n = this.calcdata.jobs[e].cloth[t].id;
                        if (typeof (this.calcdata.used[n] == "undefined")) {
                            this.calcdata.used[n] = 1
                        } else {
                            this.calcdata.used[n]++
                        }
                    }
                }
                for (var r in this.calcdata.custom) {
                    for (var t in this.calcdata.custom[r].cloth) {
                        var n = this.calcdata.custom[r].cloth[t].id;
                        if (typeof (this.calcdata.used[n] == "undefined")) {
                            this.calcdata.used[n] = 1
                        } else {
                            this.calcdata.used[n]++
                        }
                    }
                }
            },
            jobSearch: function() {
                var _this = this;
                if (this.jobs.selected == 0) {
                    return;
                };
                if (this.gui.job.searchDiv.parent().length) {
                    this.jobs.switchJob(this.jobs.selected);
                    return;
                };
                this.gui.bag.children().remove();
                var pos = TWDB.Map.getNearestJob(this.jobs.selected);
                var max = 4;
                var $dom = jQuery("<table />");
                for (var i = 0; i < pos.length; i++) {
                    if (i === max) {
                        break;
                    };
                    var tmp = pos[i];
                    var rotat = "rotate(" + tmp.angle + "deg);";
                    var $tr = jQuery("<tr />");
                    $tr.append('<td style="text-align:left;vertical-align:middle">' + tmp.time.formatDuration() + "</td>");
                    $tr.append(jQuery('<td style="text-align:left;vertical-align:middle">')
                            .append(jQuery('<img src="' + TWDB.images.arrow + '" title="#DIRECTION#" style="cursor:pointer;-moz-transform: ' + rotat + "-webkit-transform:" + rotat + "-rotat-transform:" + rotat + "-ms-transform:" + rotat + "transform:" + rotat + '" />')
				    .click(function(x, y) { return function() {
						Map.center(x, y);}
					    }(tmp.x, tmp.y))));
                    var $td = jQuery("<td />");
                    var btn = new TWDB.GameAPI.gui.button("#OPEN#", function (id, x, y) { return function() {
									TWDB.Jobs.openJob(id, x, y); }
								    }(_this.jobs.selected, tmp.x, tmp.y));
		    jQuery(btn.divMain).css({"min-width": "50px", "max-width": "80px"});
		    jQuery(btn.divMain).find(".textart_title").css({overflow: "hidden"});
                    btn.appendTo($td);
                    $tr.append($td);
                    if (Premium.hasBonus("automation")) {
                        var $td = jQuery("<td />");
                        var btn = new TWDB.GameAPI.gui.button("#JOB_START#", function (id, x, y) { return function() {
									    TWDB.Jobs.startJob(id, x, y, Number(_this.jobs.basetime)); }
									}(_this.jobs.selected, tmp.x, tmp.y));
                        jQuery(btn.divMain).css({"min-width": "50px", "max-width": "80px"});
                        jQuery(btn.divMain).find(".textart_title").css({overflow: "hidden"});
                        btn.appendTo($td);
                        $tr.append($td);
                    };
                    $dom.append($tr);
                };
                this.gui.job.searchDiv.children().remove();
                this.gui.job.searchDiv.append($dom);
                this.gui.bag.append(this.gui.job.searchDiv);
            },
            isUsedItem: function (e) {
                if (this.calcdata.used[e]) {
                    return true
                } else {
                    return false
                }
            },
            getClothForJob: function (e) {
                if (!isDefined(this.calcdata.jobs[e]) || !isDefined(this.calcdata.jobs[e].cloth)) {
                    return null
                }
                return this.calcdata.jobs[e].cloth
            },
            getLPForJob: function (e) {

                if (!isDefined(this.calcdata.jobs[e]) || !isDefined(this.calcdata.jobs[e].laborpoints)) {
                    return null
                }
                return this.calcdata.jobs[e].laborpoints
            },
            getSelectedJob: function () {
                return this.jobs.selected
            },
            isLoaded: function () {
                if (isDefined(this.calcdata.loaded)) {
                    return this.calcdata.loaded
                }
                return false
            }
        });
        (function ($) {
            var _base = TWDB;
            var w = window;
            var _skill2id = {
                strength: 1,
                flexibility: 2,
                dexterity: 3,
                charisma: 4,
                build: 5,
                punch: 6,
                tough: 7,
                endurance: 8,
                health: 9,
                ride: 10,
                reflex: 11,
                dodge: 12,
                hide: 13,
                swim: 14,
                aim: 15,
                shot: 16,
                pitfall: 17,
                finger_dexterity: 18,
                repair: 19,
                leadership: 20,
                tactic: 21,
                trade: 22,
                animal: 23,
                appearance: 24
            };
            var _id2skill = {
                1: "strength",
                2: "flexibility",
                3: "dexterity",
                4: "charisma",
                5: "build",
                6: "punch",
                7: "tough",
                8: "endurance",
                9: "health",
                10: "ride",
                11: "reflex",
                12: "dodge",
                13: "hide",
                14: "swim",
                15: "aim",
                16: "shot",
                17: "pitfall",
                18: "finger_dexterity",
                19: "repair",
                20: "leadership",
                21: "tactic",
                22: "trade",
                23: "animal",
                24: "appearance"
            };
            var _type2id = {
                animal: 1,
                body: 2,
                foot: 3,
                head: 4,
                left_arm: 5,
                neck: 6,
                right_arm: 7,
                yield: 8,
                pants: 9,
                belt: 10
            };
            var _id2type = {
                1: "animal",
                2: "body",
                3: "foot",
                4: "head",
                5: "left_arm",
                6: "neck",
                7: "right_arm",
                8: "yield",
                9: "pants",
                10: "belt"
            };
            var _class2id = {
                greenhorn: 1,
                adventurer: 2,
                duelist: 3,
                worker: 4,
                soldier: 5
            };
            var Images = _base.images;
            var Script = _base.script;
            var ClothCalc = _base.ClothCalc;
            var Debugger = function (e) {
                var t = {};
                return t
            }($);
            _base.Debugger = Debugger;
            var Error = function (e) {
                var t = {};
                var n = "twdb_error";
                var r = [];
                var i = true;
                t.report = function (e, t) {
                    if (!isDefined(e.message)) {
                        r.push({
                            msg: "failed to add error",
                            e: t
                        })
                    } else {

                        r.push({
                            msg: t + ' ' + (e.stack && (e.stack.match(/:\d+:\d+/) || [])[0] || ''),
                            e: e.message
                        })
                    }
                    if (i) {
                        i = false;
                        WestUi.NotiBar.add(new OnGoingPermanentEntry(
                            function () {
                                s()
                            }, "tw-db.info: an error occured",
                            "tip"))
                    }
                };
                var s = function () {
                    var t = new GameAPI.gui.scrollpane;
                    e(t.getMainDiv()).css("height", "370px");
                    e(t.getMainDiv()).find(
                            ".tw2gui_scrollpane_clipper_contentpane")
                        .addClass("selectable");
                    var i = '<table border="1" cellpadding="3" cellspacing="1">';
                    for (var s = r.length - 1; s >= 0; s--) {
                        i += "<tr><td>" + s + "</td><td>" + r[s].msg + "</td><td>" + r[s].e + "</td></tr>"
                    }
                    i += "</table>";
                    t.appendContent(i);
                    var o = GameAPI.wman.open(n, null, "noreload")
                        .setMiniTitle("TWDB Errorlog").setTitle(
                            "tw-db.info Errorlog")
                        .appendToContentPane(t.getMainDiv())
                };
                return t
            }($);
            _base.Error = Error;
            Debugger.Error = Error;
            var Loader = function (e) {
                var t = {};
                var n = [];
                var r = {};
                var i = {};
                var s;
                var o = false;
                var u = false;
                var a = false;
                var f = 0;
                t.add = function (e, t, r, i) {
                    var s = {
                        ready: false
                    };
                    n.push({
                        key: e,
                        txt: t,
                        call: r,
                        dep: i || {},
                        ready: s,
                        count: 0
                    });
                    return s
                };
                t.init = function () {
                    if (s) {
                        return

                    }
                    d();
                    s = w.setInterval(function () {
                        l()
                    }, 500)
                };
                var l = function () {
                    if (u) {
                        return

                    }
                    u = true;
                    if (o === false) {
                        if (!c()) {
                            u = false;
                            return

                        }
                        try {
                            Updater.query();
                            // Dun - changing cosmetic and link to twdb
                            // paypal
                            var e = w.TheWestApi
                                .register(
                                    "twdb_clothcalc",
                                    "tw-db.info Cloth Calc",
                                    "1.34",
                                    String(Script.gameversion),
                                    "scoobydoo - Dun - Petee [tw-db.info]",
                                    "http://tw-db.info");

                            var Paypal = '<br><br><form action="https://www.paypal.com/cgi-bin/webscr" method="post">' + '<input name="cmd" value="_s-xclick" type="hidden">' + '<input name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----" type="hidden">' + '<input type="image" src="https://www.paypalobjects.com/en_US/DE/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">' + '<img width="1" border="0" height="1" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" alt="">' + "</form>";

                            var forma = $(
                                    "<div style='font-family: comic sans ms;font-size: 13pt;padding-top: 10px;text-align: center;' />")
                                .append("#CCSCRIPT#")
                                .append(Paypal).append(
                                    "<br>#THANK_YOU#"); // Dun -
                            // adding
                            // constant

                            e.setGui(forma);
                            if (e.isOutdated()) {
                                w.TheWestApi.displayOutdated()
                            }
                        } catch (n) {
                            Error.report(n, "");
                            (new UserMessage("#APIERROR#",
                                UserMessage.TYPE_FATAL)).show();
                            p();
                            return

                        }
                        if (window.TheWestApi.version < 2.04) {
                            (new UserMessage(
                                "TWDB-ClothCalc Script is deactivated until the Gameversion on your world is updated to 2.04. Sorry",
                                UserMessage.TYPE_FATAL)).show();
                            p();
                            return

                        }
                        h();
                        return

                    }
                    if (isDefined(i[o.key])) {
                        h();
                        return

                    }
                    if (o.ready.ready) {
                        r[o.key] = true;
                        a = false;
                        h();
                        return

                    }
                    u = false
                };
                var c = function () {
                    if (!isDefined(w.jQuery) || !isDefined(w.TheWestApi) || !isDefined(w.TheWestApi.version) || !w.ItemManager.isLoaded()) {
                        return false
                    }
                    return true
                };
                var h = function () {
                    if (n.length == 0) {
                        m();
                        p();
                        return

                    }
                    o = n.shift();
                    o.count++;
                    if (o.count > f) {
                        if (a) {
                            Error.report({
                                message: "deadlock detected"
                            }, "failed to load module: " + o.key);
                            i[o.key] = true;
                            h();
                            return

                        }
                        f++;
                        a = true
                    }
                    for (var e in o.dep) {
                        if (!isDefined(r[e])) {
                            if (Settings.get("scooby")) {
                                console.log(o.key, "needs ", e)
                            }
                            n.push(o);
                            h();
                            return

                        }
                    }
                    v();
                    try {
                        o.call()
                    } catch (t) {
                        Error.report(t, "failed to load module: " + o.key);
                        i[o.key] = true;
                        h();
                        return

                    }
                    u = false;
                    l()
                };
                var p = function () {
                    w.clearInterval(s);
                    w.setTimeout(function () {
                        delete t
                    }, 1e3)
                };
                var d = function () {};
                var v = function () {};
                var m = function () {};
                t.stack = n;
                t.loaded = r;
                t.failed = i;
                t.current = o;
                return t
            }($);
            Debugger.Loader = Loader;
            var GameAPI = function (e) {
                var t = {};
                var n = {};
                var r = function () {
                    if (n.ready) {
                        return

                    }
                    i();
                    s();
                    n.ready = true
                };
                var i = function () {
                    GameAPI.gui = {};
                    var e = GameAPI.gui;
                    if (w.TheWestApi.version > 2.03) {
                        for (var t in w.west.gui) {
                            if (!w.west.gui.hasOwnProperty(t)) {
                                continue
                            }
                            newName = t.toLowerCase();
                            e[newName] = w.west.gui[t]
                        }
                    } else {
                        for (var t in w.tw2gui) {
                            if (!w.tw2gui.hasOwnProperty(t)) {
                                continue
                            }
                            newName = t.toLowerCase();
                            e[newName] = w.tw2gui[t]
                        }
                    }
                };
                var s = function () {
                    GameAPI.wman = wman
                };
                n = Loader.add("GameAPI", "tw-db GameAPI", r, {});
                return t
            }($);
            _base.GameAPI = GameAPI;
            Debugger.GameAPI = GameAPI;
            var Cache = function (e) {
                var t = {};
                var n = {};
                var r = "";
                var i = {};
                var s = function (e) {
                    if (!i[e]) {
                        i[e] = true;
                        t.save("keys", i)
                    }
                };
                var o = function () {
                    if (n.ready) {
                        return

                    }
                    r = "twdb_" + Character.playerId + "_";
                    i = t.load("keys");
                    if (!i) {
                        i = {
                            keys: true
                        }
                    }
                    n.ready = true
                };
                n = Loader.add("Cache", "tw-db Cachesystem", o);
                t.load = function (n) {
                    s(n);
                    try {
                        return e
                            .parseJSON(decodeURIComponent(localStorage
                                .getItem(r + n)))
                    } catch (i) {
                        Error.report(i, "load " + n + " from cache");
                        t.save(n, null);
                        return null
                    }
                };
                t.save = function (e, n) {
                    s(e);
                    try {
                        localStorage.setItem(r + e,
                            encodeURIComponent(JSON.stringify(n)));
                        return true
                    } catch (i) {
                        Error.report(i, "save " + e + " to cache");
                        t.save(e, null);
                        return false
                    }
                };
                t.reset = function (n, s) {
                    try {
                        if (n) {
                            if (isDefined(s)) {
                                localStorage.removeItem(s)
                            } else {
                                for (var o in i) {
                                    localStorage.removeItem(r + o)
                                }
                            }
                            (new UserMessage(
                                "Reset Done, Site will now be reloaded",
                                UserMessage.TYPE_SUCCESS)).show();
                            location.href = location.href.replace(
                                location.hash || "#", "")
                        } else {
                            var u = e("<div><h2>#CACHE_RESET#</h2></div>");
                            var a = (new GameAPI.gui.textfield(
                                    "twdb_cache_key")).setSize(40)
                                .setLabel("Key:");
                            u.append(a.getMainDiv());
                            var f = (new GameAPI.gui.checkbox(
                                "all Keys")).setSelected(true);
                            f.setCallback(function (e) {
                                if (e) {
                                    a.setValue("")
                                }
                            });
                            e(a.getMainDiv()).find("span").css(
                                "font-size", "12px");
                            e(a.getMainDiv()).find("input").keyup(
                                function () {
                                    f.setSelected(false)
                                });
                            u
                                .append(e(
                                        '<div style="display:block;" />')
                                    .append(f.getMainDiv()));
                            (new GameAPI.gui.dialog(
                                "tw-db Cache Reset", u,
                                GameAPI.gui.dialog.SYS_QUESTION))
                            .addButton("ok", function () {
                                if (f.isSelected()) {
                                    t.reset(true)
                                } else {
                                    t.reset(true, a.getValue())
                                }
                            }).addButton("cancel").show()
                        }
                    } catch (l) {
                        Error.report(l, "cache reset")
                    }
                };
                return t
            }($);
            _base.Cache = Cache;
            Debugger.Cache = Cache;
            var Worker = function (e) {
                var t = {};
                var n = [];
                var r = false;
                var i = false;
                t.add = function (e) {
                    n.push(e);
                    if (r) {
                        return

                    }
                    r = w.setInterval(function () {
                        s()
                    }, 100)
                };
                var s = function () {
                    if (i) {
                        return

                    }
                    i = true;
                    var e = n.shift();
                    try {
                        e()
                    } catch (t) {
                        Error.report(t, "Worker")
                    }
                    if (n.length == 0) {
                        w.clearInterval(r);
                        r = false
                    }
                    i = false
                };
                return t
            }($);
            Debugger.Worker = Worker;
            var Jobs = function (e) {
                var t = {};
                var n = {};
                var r = [];
                var i = {};
                var s = {};
                var o = [1828, 1829, 1830, 2e3, 2003, 2006, 2009];
                var u;
                var a = {};
                var f = function () {
                    if (n.ready) {
                        return

                    }
                    var t = 0;
                    var f = 0;
                    var c = {};
                    while (true) {
                        t++;
                        var h = w.JobList.getJobById(t);
                        if (!h) {
                            f++;
                            if (f > 5) {
                                break
                            }
                            continue
                        }
                        f = 0;
                        r.push(h.id);
                        i[h.name.toLowerCase()] = h.id;
                        s[h.shortname.toLowerCase()] = h.id;
                        for (var p in h.yields) {
                            if (isNaN(p)) {
                                continue
                            }
                            if (c[p]) {
                                continue
                            }
                            c[p] = true;
                            o.push(Number(p))
                        }
                    }
                    u = function (e) {
                        var t = {};
                        t.description = "";
                        t.duration = 1800;
                        t.energy = 6;
                        t.groupid = null;
                        t.id = 1e3;
                        t.malus = 0;
                        t.name = "#CONSTRUCTION#";
                        t.randomyields = [];
                        t.shortname = "construction";
                        t.skills = {
                            build: 3,
                            repair: 1,
                            leadership: 1
                        };
                        t.yields = [];
                        t.calcJobPoints = function () {
                            return 0
                        };
                        t.canDo = function () {
                            return true
                        };
                        return t
                    }(e);
                    r.push(1e3);
                    i[u.name.toLowerCase()] = 1e3;
                    s[u.shortname.toLowerCase()] = 1e3;
                    var d = function (e, t) {
                        var n = e == 1e3 ? u : w.JobList.getJobById(e);
                        var r = t == 1e3 ? u : w.JobList.getJobById(t);
                        return n.name > r.name
                    };
                    r.sort(d);
                    o.sort();
                    a = Cache.load("jobdata");
                    if (a == null || typeof a != "object") {
                        a = {}
                    }
                    Eventer.set("TWDBdataLoaded", function () {
                        l()
                    });

                    n.ready = true
                };
                n = Loader.add("Jobs", "tw-db Jobsystem", f, {
                    Cache: true
                });
                t.getJobByName = function (n) {
                    n = e.trim(n).toLowerCase();
                    if (!i[n]) {
                        return null
                    }
                    return t.getJobById(i[n])
                };
                t.getJobByShortname = function (n) {
                    n = e.trim(n).toLowerCase();
                    if (!s[n]) {
                        return null
                    }
                    return t.getJobById(s[n])
                };
                t.getJobById = function (t) {
                    if (t == 1e3) {
                        var n = u
                    } else {
                        var n = w.JobList.getJobById(t);
                        if (!n) {
                            return n
                        }
                    }
                    var r = e.extend(true, {}, n);
                    var i = 1;
                    if (w.Character.charClass == "adventurer") {
                        if (w.Premium.hasBonus("character")) {
                            i *= 1.2
                        } else {
                            i *= 1.1
                        }
                    }
                    if (w.Premium.hasBonus("money")) {
                        i *= 1.5
                    }
                    for (var s = 0; s < r.randomyields.length; s++) {
                        r.randomyields[s] = (r.randomyields[s] * i)
                            .round(2)
                    }
                    if (typeof r.yields.length == "undefined") {
                        for (var o in r.yields) {
                            r.yields[o].prop = (r.yields[o].prop * i)
                                .round(2)
                        }
                    }
                    return r
                };
                t.openJob = function (e, t, n) {
                    w.JobWindow.open(e, t, n)
                };
                t.startJob = function(id, x, y, duration) {
                    w.JobWindow.startJob(id, x, y, Number(duration)||3600 );	// Bluep - set default to 1h
                };
                t.getAllJobs = function () {
                    return r
                };
                t.isProduct = function (t) {
                    return e.inArray(Number(t), o)
                };
                var l = function () {
                    a = {};
                    Cache.save("jobdata", a)
                };
                t.getPopup = function (e, n) {
                    var r = '<div style="min-width:60px;text-align:center" >';
                    var i = t.getJobById(e);
                    if (isDefined(i)) {
                        r += '<span style="font-weight:bold;display:block;">' + i.name + "</span>";
                        r += '<div class="job" style="position:relative;left:50%;margin:10px -25px;"><div ' + (!isDefined(n) ? "" : 'class="featured ' + n + '"') + '></div><img src="' + Game.cdnURL + "/images/jobs/" + i.shortname + '.png" class="job_icon" ></div>'
                    }
                    return r += "</div>"
                };
                return t
            }($);
            _base.Jobs = Jobs;
            Debugger.Jobs = Jobs;
            var Window = function (e) {
                var t = {};
                var n = "twdb_window";
                var r = null;
                var i = null;
                var s = {};
                var o = {};
                var u = function () {
                    if (o.ready) {
                        return

                    }
                    var t = e(
                            '<div title="tw-db.info" class="menulink" />')
                        .css("background-image",
                            "url(" + Images.button + ")")
                        .mouseenter(
                            function () {
                                e(this).css(
                                    "background-position",
                                    "-25px 0px")
                            }).mouseleave(
                            function () {
                                e(this).css(
                                    "background-position",
                                    "0px 0px")
                            }).click(function () {
                            a()
                        });
                    e("#ui_menubar")
                        .append(
                            e(
                                '<div class="ui_menucontainer" id="TWDB_ClothCalc_menubuttons" />')
                            .append(t)
                            .append(
                                '<div class="menucontainer_bottom" />'));
                    ready = true;
                    o.ready = true
                };
                o = Loader.add("Window", "tw-db Scriptwindow", u);
                t.open = function (e) {
                    a(e)
                };
                var a = function (t) {
                    r = GameAPI.wman.open(n, null).setMiniTitle(
                        "tw-db.info").setTitle("tw-db.info");
                    r
                        .appendToContentPane(e('<div style="width:100%;text-align:center;position:absolute;bottom:0px;left:0px;height:15px;display:block;font-size:12px;color:#000000;">.:powered by tw-db team:. | <a href="http://tw-db.info" style="font-weight:normal;color:#000000;" target="_blank">.:tw-db.info:.</a> | ' + (Script.version / 100 + " rev. " + Script.revision) + "</div>"));
                    r
                        .appendToContentPane(e(
                                '<div title=" tw-db support " style="width:19px;height:19px;position:absolute;bottom:-5px;right:5px;display:block;cursor:pointer;" />')
                            .append(
                                '<img src="' + Images.iconSupport + '" />').click(
                                function () {
                                    Support.open()
                                }));
                    var o;
                    for (var u in s) {
                        if (!isDefined(o)) {
                            o = u
                        }
                        if (t == u) {
                            o = u
                        }
                        r.addTab(s[u].name, u, function (e, t) {
                            f(t)
                        });
                        s[u].gui.children().remove();
                        r.appendToContentPane(s[u].gui)
                    }
                    if (isDefined(o)) {
                        i = s[o].gui;
                        f(o)
                    }
                };
                var f = function (e) {
                    i.hide();
                    r.showLoader();
                    r.activateTab(e);
                    if (!isDefined(s[e])) {
                        return

                    }
                    if (s[e].title != "") {
                        r.setTitle("tw-db.info " + s[e].title)
                    } else {
                        r.setTitle("")
                    }
                    i = s[e].gui;
                    i.show();
                    w.setTimeout(s[e].callback, 10)
                };
                t.addTab = function (t, n, r, i) {
                    s[t] = {
                        title: r,
                        name: n,
                        callback: i,
                        gui: null
                    };
                    s[t].gui = e('<div style="margin-top:10px;"/>')
                        .hide();
                    return s[t].gui
                };
                t.hideLoader = function () {
                    r.hideLoader()
                };
                return t
            }($);
            Debugger.Window = Window;
            var Support = function (e) {
                var t = {};
                var n = "twdb_support";
                var r = {};
                t.addKey = function (e, t) {
                    r[e] = t
                };
                t.open = function () {

                    var t = e('<p style="margin:10px;">Please include the text displayed below in a bug report sent using <a href="http://tw-db.info/?strana=contact" target="_blank">our contact form</a> and also try to describe how to reproduce this error (what did you do when it occured). Thanks!</p>');
                    var i = e('<div style="margin:10px;"/>');
                    var s = "[CODE]";
                    for (var o in r) {
                        s += String(o) + "\n";
                        s += String(r[o]) + "\n";
                        s += "----------" + "\n"
                    }
                    s += "[/CODE]";
                    i.append((new GameAPI.gui.textarea).setContent(s)
                        .setWidth(600).setHeight(250).setReadonly()
                        .getMainDiv());
                    GameAPI.wman.open(n, null).setMiniTitle(
                            "tw-db.info Support").setTitle(
                            "tw-db.info Support")
                        .appendToContentPane(t)
                        .appendToContentPane(i)
                };
                return t
            }($);
            Debugger.Support = Support;
            var Timer = function (e) {
                var t = {};
                var n = 0;
                var r = 0;
                var i = 0;
                t.getTimeout = function () {
                    var e = (new Date).getTime();
                    if (e - n < 2e3) {
                        r++
                    } else {
                        r = 0
                    }
                    if (e - n < 6e4) {
                        i++
                    } else {
                        i = 0
                    }
                    n = e;
                    var t = 0;
                    if (i > 50) {
                        t = 6e4
                    }
                    if (r < 20) {
                        return t + 200
                    }
                    return t + 2e3
                };
                return t
            }($);
            Debugger.Timer = Timer;
            var Eventer = function (e) {
                var t = {};
                var n = {};
                t.set = function (e, t, r) {
                    if (!isDefined(n[e])) {
                        n[e] = {}
                    }
                    if (!isDefined(r)) {
                        var r = false
                    }
                    var i = Number((new Date).getTime());
                    while (n[e][i])
                        i++;
                    n[e][i] = {
                        id: i,
                        call: t,
                        count: r
                    };
                    return i
                };
                t.trigger = function (e) {
                    if (!isDefined(n[e])) {
                        return

                    }
                    var t = 0;
                    for (var r in n[e]) {
                        if (!isDefined(n[e][r].id)) {
                            continue
                        }
                        w.setTimeout(n[e][r].call, 10);
                        if (n[e][r].count == false) {
                            t++;
                            continue
                        }
                        n[e][r].count--;
                        if (n[e][r].count > 0) {
                            t++;
                            continue
                        }
                    }
                    if (t == 0) {
                        delete n[e]
                    }
                };
                t.remove = function (e, t) {
                    if (!isDefined(n[e]) || !isDefined(n[e][t])) {
                        return false
                    }
                    delete n[e][t]
                };
                return t
            }($);
            _base.Eventer = Eventer;
            Debugger.Eventer = Eventer;
            var Calc = function (e) {
                var skInNum = {
                    'strength': [5, 6, 7, 8, 9],
                    'flexibility': [10, 11, 12, 13, 14],
                    'dexterity': [15, 16, 17, 18, 19],
                    'charisma': [20, 21, 22, 23, 24, 25]
                };
                var _self = {};
                var bReady = false;
                var setCache = {
                    sets: {}
                };
                var ccCache = {
                    sets: {},
                    items: {}
                };
                var loader = {};

                var initSetData = function (setMX) {
                    for (set in setMX) {

                        var setM = setMX[set];

                        // Worker.add(function(set) {
                        // return function() {
                        var bonuss = {};

                        var attr = {},
                            skills = {},
                            jobs = {};

                        var lastlevel = 0;
                        for (level in setM.bonus) {

                            if (!setM.bonus.hasOwnProperty(level))
                                continue;

                            bonuss[level] = {
                                jobs: {},
                                attributes: [],
                                skills: []
                            };

                            if (lastlevel > 0) {

                                // for intermediate null level like in
                                // st patrick set and initiate with last
                                // level values

                                for (var intInd = parseInt(lastlevel) + 1; intInd <= level; ++intInd) {

                                    bonuss[intInd] = JSON
                                        .parse(JSON
                                            .stringify(bonuss[lastlevel]))
                                }

                            }

                            for (bonus in setM.bonus[level]) {

                                if (!setM.bonus[level]
                                    .hasOwnProperty(bonus))
                                    continue;

                                var obj = setM.bonus[level][bonus];

                                var id = _skill2id[obj.name];

                                switch (obj.type) {
                                case 'job':

                                    if (!isDefined(bonuss[level]['jobs'][obj.job]))
                                        bonuss[level]['jobs'][obj.job] = 0;

                                    bonuss[level]['jobs'][obj.job] += obj.value;

                                    break;
                                case 'attribute':
                                    if (!isDefined(attr[id]))
                                        attr[id] = 0;
                                    attr[id] += obj.value
                                    bonuss[level]['attributes'][id] = attr[id];

                                    for (iT = 0; iT < ClothCalc._sk4attr[obj.name].length; iT++) {

                                        var idS = ClothCalc._sk4attr[obj.name][iT];

                                        if (!isDefined(skills[idS]))
                                            skills[idS] = 0;
                                        skills[idS] += obj.value
                                        bonuss[level]['skills'][idS] = skills[idS];

                                    }

                                    break;
                                case 'skill':
                                    if (!isDefined(skills[id]))
                                        skills[id] = 0;
                                    skills[id] += obj.value
                                    bonuss[level]['skills'][id] = skills[id];

                                    break;
                                case 'character':

                                    if (obj.bonus && obj.key === 'level') {
                                        var roundingType = obj.roundingMethod;
                                        if (obj.bonus.type === 'skill') {
                                            var idQ = ClothCalc._skill2id[obj.bonus.name];
                                            if (!isDefined(skills[idQ]))
                                                skills[idQ] = 0;
                                            skills[idQ] += Math[roundingType]
                                                (Character.level * obj.bonus.value);
                                            bonuss[level]['skills'][idQ] = skills[idQ];
                                        } else {

                                            for (iT = 0; iT < skInNum[obj.bonus.name].length; iT++) {
                                                var idS = skInNum[obj.bonus.name][iT];

                                                if (!isDefined(skills[idS]))
                                                    skills[idS] = 0;
                                                skills[idS] += Math[roundingType]
                                                    (Character.level * obj.bonus.value);
                                                bonuss[level]['skills'][idS] = skills[idS];

                                            }
                                        }
                                    }
                                    break;
                                default:

                                    break;

                                }

                            }

                            lastlevel = level;

                        }

                        setCache.sets[set] = bonuss

                    }

                    return setCache.sets;
                }
                var loadCalc = function () {
                    if (loader.ready) {
                        return

                    }

                    Worker
                        .add(function () {
                            return function () {
                                setCache = initSetData(west.storage.ItemSetManager._setList);

                                loader.ready = true;
                                bReady = true;
                            }
                        }());

                };
                loader = Loader.add("Calc", "tw-db Calculator",
                    loadCalc, {});
                _self.getCcCache = function () {
                    return ccCache;
                };
                _self.getSetCache = function () {
                    return setCache;
                };
                _self.getSetBonusForJob = function (setName, level,
                    jobId) {

                    if (isDefined(ccCache.sets[setName]) && isDefined(ccCache.sets[setName][level]) && isDefined(ccCache.sets[setName][level][jobId])) {

                        return ccCache.sets[setName][level][jobId]
                    }
                    try {
                        return calcSetBonusForJob(setName, level, jobId)
                    } catch (r) {
                        Error.report(r, "calcSetBonusForJob (" + setName + " " + level + " " + jobId + ")")
                    }
                    return 0

                };
                _self.getItemBonusForJob = function (itemId, jobId) {
                    try {

                        if (isDefined(ccCache) && isDefined(ccCache.items) && isDefined(ccCache.items[itemId]) && isDefined(ccCache.items[itemId][jobId])) {

                            return ccCache.items[itemId][jobId];

                        }
                        return calcItemBonusForJob(itemId, jobId);

                    } catch (exGetItem) {
                        Error.report(exGetItem, "calcItemBonusForJob (" + itemId + " " + jobId + ")")
                    }
                    return 0
                };
                _self.isCached = function (itemId, jobId) {
                    if (isDefined(ccCache.items[itemId]) && isDefined(ccCache.items[itemId][jobId])) {
                        return true
                    } else {
                        return false
                    }
                };
                var calcSetBonusForJob = function (setId, setlevel,
                    jobId) {

                    if (!isDefined(setCache[setId])) {
                        console.log({
                            message: "unknown set " + setId
                        }, "calcSetBonusForJob");
                        return 0
                    }
                    if (!isDefined(setCache[setId][setlevel])) {

                        return 0
                    }

                    var bonus = setCache[setId][setlevel];

                    var jobObj = Jobs.getJobById(jobId);

                    if (!jobObj) {

                        return 0
                    }

                    var total = 0;
                    if (isDefined(bonus.jobs["all"])) {

                        total += bonus.jobs["all"]
                    }
                    if (isDefined(bonus.jobs[jobId])) {
                        total += bonus.jobs[jobId]
                    }

                    for (var a in jobObj.skills) {
                        var f = jobObj.skills[a];

                        if (isDefined(bonus.skills[_skill2id[a]])) {

                            total += bonus.skills[_skill2id[a]] * f;
                        }
                    }
                    if (!isDefined(ccCache.sets[setId])) {
                        ccCache.sets[setId] = {}
                    }
                    if (!isDefined(ccCache.sets[setId][setlevel])) {
                        ccCache.sets[setId][setlevel] = {}
                    }
                    ccCache.sets[setId][setlevel][jobId] = total;

                    return total;
                };
                var calcItemBonusForJob = function (itemId, jobId) {

                    var itemObj = ItemManager.get(itemId);

                    if (!itemObj) {

                        return 0
                    }
                    var bonus = itemObj.bonus;

                    var jobObj = Jobs.getJobById(jobId);

                    if (!jobObj) {
                        return 0
                    }

                    var total = 0;

                    // Items level dependants
                    if (isDefined(bonus.item)) {
                        for (var w in bonus.item) {
                            if (!bonus.item.hasOwnProperty(w))
                                continue;

                            var z = bonus.item[w];
                            switch (z.type) {
                            case 'character':

                                if (z.key == 'level') {

                                    if (z.bonus.type == 'job') {
                                        if (z.bonus.job == "all") {
                                            total += Math[z.roundingMethod]
                                                (z.bonus.value * Character.level)
                                        } else {

                                            if (z.bonus.job[n]) {

                                                total += z.bonus.job[n];
                                            }
                                        }
                                    } else {
                                        if (z.bonus.type == 'attribute') {

                                            for (ee = 0; ee < skInNum[z.bonus.name].length; ee++) {
                                                var idS = skInNum[z.bonus.name][ee];

                                                if (isDefined(jobObj.skills[_id2skill[idS]])) {
                                                    total += Math[z.roundingMethod]
                                                        (z.bonus.value * Character.level)

                                                }

                                            }
                                        } else if (isDefined(jobObj.skills[z.bonus.name])) {

                                            total += Math[z.roundingMethod]
                                                (z.bonus.value * Character.level)

                                        }

                                    }
                                }
                                break;

                            }
                        }

                        for (var skil in jobObj.skills) {

                            var job_skills = jobObj.skills[skil];

                            var f = _id2skill[parseInt(_skill2id[skil] / 5)];

                            if (isDefined(bonus.skills[skil])) {

                                total += bonus.skills[skil] * job_skills
                            }

                            if (isDefined(bonus.attributes[f])) {

                                total += bonus.attributes[f] * job_skills
                            }

                        }

                    }

                    if (!isDefined(ccCache.items[itemId])) {
                        ccCache.items[itemId] = {}
                    }
                    ccCache.items[itemId][jobId] = total;

                    return total;
                };
                // Debugger.ccCache = ccCache;
                return _self
            }($);
            _base.Calc = Calc;
            Debugger.Calc = Calc;
            var Importer = function (e) {
                var t = {};
                var n = {};
                t.div = null;
                var r = function () {
                    if (n.ready) {
                        return

                    }
                    t.div = Window.addTab("importer", "Importer", "",
                        function () {
                            i()
                        });
                    n.ready = true
                };
                n = Loader.add("Importer", "tw-db Importersystem", r, {
                    Window: true
                });
                var i = function () {
                    t.div.children().remove();
                    Window.hideLoader();
                    e.getScript("http://" + Script.url + "/cache/js/sDoImport_" + Script.lang + ".js")
                };
                return t
            }($);
            _base.Importer = Importer;
            Debugger.Importer = Importer;
            
            
  ///// complete ////////////////////////
  //
  //  Settings Object:  handles the Script Settings
  //  Init:             should be loader after Window Module and Cache Module
  //  Methodes:         - get (key,defValue) // get stored settingsvalue
  //                        -> key: index
  //                        -> key: defaultValue
  //                        <- value
  //                    - set (key,data) // set a settingsvalue
  //                        -> key: index
  //                        -> data: new value
  //
  /////////////////////////////
            var Settings = function ($) {
		    var _self = {};                                  
		    var settings = {};                               
		    var wnd = null;                                  
		    var loader = {};                                 

		    var init = function (){                        
		    if (loader.ready) {                          
		      return;                                      
		    };                                             
		    var tmp = Cache.load('settings');              
		    if (typeof(tmp) == 'object' && tmp != null) {
		      settings = tmp;                              
		    } else {                                       
		      settings = {};                               
		    };                                             
                    wnd = Window.addTab('settings','#SETTINGS#','#SETTINGS#',open);
                    loader.ready = true;
                };
                loader = Loader.add("Settings", "tw-db Settingssystem", init, {
                    Cache: true,
                    Window: true
                });
                
                var open = function() {
		wnd.children().remove();
		var bodyscroll = new GameAPI.gui.scrollpane();
		$(bodyscroll.getMainDiv()).css('height','300px');
		wnd.append(bodyscroll.getMainDiv());
		var values = [
                        [0, "collector", "#HELP_COLLECTOR#", false],
                        [0, "jobBoniTooltip", "#HELP_JOBBONI#", false],
                        [0, "buyTip", "#HELP_BUYTIP#", false],
                        [0, "sellTip", "#HELP_SELLTIP#", false],

                        [0, "sellTip1", "#HELP_SELLTIP1#", "#SELLTIP_SETTINGS#"],
                        [0, "sellTip2", "#HELP_SELLTIP2#", "#SELLTIP_SETTINGS#"],
                        [0, "sellTip3", "#HELP_SELLTIP3#", "#SELLTIP_SETTINGS#"],
                        [0, "sellTip4", "#HELP_SELLTIP4#", "#SELLTIP_SETTINGS#"],
                        [0, "sellTip5", "#HELP_SELLTIP5#", "#SELLTIP_SETTINGS#"],

                        [0, "chat", "#HELP_CHAT#", false],
                        [0, "notes", "#SETTING_NOTES#", false],
                        [0, "qbswitch", "#HELP_QBSWITCH#", false],
                        [0, "qfulltext", "#HELP_QFULLTEXT#", false],
                        // [0, "questgroup", "#HELP_QUESTGROUP#", false],
                        [0, "questwiki", "#HELP_QUESTWIKI#", false],
                        [0, "questcancle", "#HELP_QUESTCANCEL#", false],
                        [0, "showbonusjobs", "#HELP_SHOWBONUSJOBS#", false],
                        [0, "showscrollto", "#HELP_SCROLLTO#", false],
                        [0, "fastskillchange", "#HELP_FASTSKILLCHANGE#", false],
                        [0, "fortrecruitment", "#HELP_FORTRECRUITMENT#", false],
                        [0, "enhancedfortrecruitment", "#HELP_ENHANCEDFORTRECRUITMENT#", false],

                        [0, "noworkqueuepa", "#HELP_NOWORKQUEUEPA#", "#PREMIUM_SETTINGS#"],
                        [0, "nofetchallpa", "#HELP_NOFETCHALLPA#", "#PREMIUM_SETTINGS#"],
                        [0, "nowofnuggets", "#HELP_NOWOFNUGGETS#", "#PREMIUM_SETTINGS#"],

                        [0, "forumlastpage", "#HELP_FORUMLASTPAGE#", false],
                        [0, "duelmotivation", "#HELP_DUELMOTIVATION#", false],
                        [0, "autodeposit", "#HELP_AUTODEPOSIT#", false],
                        [0, "deposit", "#HELP_DEPOSIT#", false],

                        [0, "marketmap", "#HELP_MARKETMAP#", false],
                        [0, "marketselldialog", "#MSD_SETTING#", false],
                        [0, "marketreminder", "#HELP_MARKETREMINDER#", false],

                        [0, "chestanalyser", "#HELP_CHESTANALYSER#", false],
                        [0, "directsleep", "#HELP_DIRECTSLEEP#", false],
                        [0, "weeklycrafting", "#CRAFTNOTICE#", false]
                    ];
		    var tmp = {};
		    var table = $('<table />');
		    var group = {};
		    for (var i=0; i < values.length; i++) {
		      var name = values[i][1];
		      tmp[name] = _self.get(name);
		      var row = $('<tr />');
		      switch (values[i][0]) {
			case 0: 
			    var callback = function(name) { return function(){ tmp[name] = !(tmp[name]); }}(name);
			    var checkbox = new GameAPI.gui.checkbox('', (!tmp[name] ? '' : 'tw2gui_checkbox_checked'), callback );
			    row.append($('<td style="width:25px;" />').append(checkbox.getMainDiv()));
			    break;
		      };
		      row.append($('<td></td>').text((values[i][2]+"").twdb_twiceHTMLUnescape())); /**TODO: get rid of unescape **/
		      if (values[i][3]) {
		      	var gname = values[i][3];
			if (!isDefined(group[gname])) {
			  group[gname] = $('<table />').hide();
			  table.append( $('<tr><td style="width:25px;cursor:pointer;"></td><td style="cursor:pointer;" class="item_sell"><span class="twdb_cat butMinus" style="margin-top: -3px;"></span>&nbsp;&nbsp;' + gname + '</td></tr>')
					  .click(function(name) {
					      return function(){
						  $(group[name]).toggle();
						  $(this).find("span.twdb_cat").toggleClass("butMinus").toggleClass("butPlus");
					      }
					  }(gname)),
				       $('<tr>').append( $('<td style="width:25px;">'), $('<td>').append(group[gname]))
				      );
			}
			group[gname].append(row);
		      } else {
			  table.append(row);
		      }
		    };
				
		    var combobox = new GameAPI.gui.combobox();
		    combobox.addItem('left','#LEFT#').addItem('right','#RIGHT#').addItem('custom','#CUSTOM_POSITION#');
		    combobox.select(String(settings['clothPos']));
		    var row = $('<tr />').append($('<td colspan="2" />').append(combobox.getMainDiv()).append('<span>&nbsp;#HELP_POSITION#</span>'));
		    table.append(row);
		    
		    var btn = new GameAPI.gui.button('#SAVE#', function(){
			switch (combobox.getValue()) {
			  case 'left' : settings['clothPos'] = 'left'; break;
			  case 'right' : settings['clothPos'] = 'right'; break;
			  default : settings['clothPos'] = 'custom'; break;
			}
			save(tmp);
		      });
                    
		    var res = $('<div style="width:100%;text-align:right;" />').append($('<img style="position:relative;top:-20px;cursor:pointer;" title=" reset local Storage" src="' + Images.iconReset + '" />').click(function(){Cache.reset();}));
		    bodyscroll.appendContent(table);
		    wnd.append(btn.getMainDiv()).append(res);
		    Window.hideLoader();
                };
                
	      _self.get = function(key, defValue) {
		if (!isDefined(settings[key])) {
		  _self.set(key,defValue);
		  return defValue;
		};
		return settings[key];
	      };
	      
	      _self.set = function(key, data) {
		settings[key] = data;
		Cache.save('settings',settings);
	      };
	      
	      var save = function(tmp) {
		for ( var key in tmp ) {
		  settings[key] = tmp[key];
		};
		if (Cache.save('settings',settings)) {
		  new UserMessage('#SAVE_SUCCESSFUL#', UserMessage.TYPE_SUCCESS).show();
		} else {
		  new UserMessage('#SAVE_ERROR#', UserMessage.TYPE_ERROR).show();
		};
	      };
	      return _self;
            }($);
            _base.Settings = Settings;
            Debugger.Settings = Settings;
            
            
            var Tools = function (e) {
                var t = {};
                var n = {};
                var r;
                var i = function () {
                    if (n.ready) {
                        return

                    }
                    r = Window.addTab("tools", "Tools", "", function () {
                        s()
                    });
                    n.ready = true
                };
                n = Loader.add("Tools", "tw-db Toolsystem", i, {
                    Window: true
                });
                var s = function () {
                    r.children().remove();
                    (new GameAPI.gui.button("open Tool", function () {
                        w.open("http://" + Script.url + "/?strana=politic_map&world=" + location.hostname.split(".")[0])
                    })).appendTo(r);
                    var t = new GameAPI.gui.button;
                    t.setCaption("Alliance Import".escapeHTML()).click(
                        function () {
                            t.disable();
                            e.getScript("http://" + Script.url + "/js/sDoAllianceImport.js")
                        }).appendTo(r);
                    Window.hideLoader()
                };
                return t
            }($);
            Debugger.Tools = Tools;
            var Updater = function (e) {
                var t = {};
                var n = {};
                var r;
                var i = false;
                var s = function () {
                    if (n.ready) {
                        return

                    }
                    r = Window.addTab("notes", "Release Notes",
                        "Release Notes", function () {
                            u()
                        });
                    if (Cache.load("version") && Script.version + " " + Script.revision != Cache
                        .load("version")) {
                        Cache.save("version", Script.version + " " + Script.revision);
                        i = true;
                        var e = "#WAS_UPDATED#";
                        var t = '<div class="txcenter">#OPEN_RELEASENOTES#</div>';
                        t = t.replace("=1=", "<b>" + Script.name + "</b>");
                        (new GameAPI.gui.dialog(e, t,
                            GameAPI.gui.dialog.SYS_WARNING))
                        .addButton("yes", function () {
                            Window.open("notes")
                        }).addButton("no").show()
                    }
                    n.ready = true
                };
                n = Loader.add("Updater", "tw-db Updater", s, {
                    Cache: true,
                    Window: true
                });
                var o = function (t, n) {
                    var r = "#NEED_UPDATE#";
                    var i = '<div class="txcenter">#MAKE_UPDATE#</div>';
                    i = i.replace("=1=", "<b>" + Script.name + "</b>");
                    i += "<div><br />current version: " + Script.version / 100 + " revision " + Script.revision + "<br />new version: " + t / 100 + " revision " + n + "</div>";
                    var s = "http://" + Script.update;
                    if (e.browser.webkit) {
                        s += "?" + Script.version + Script.revision
                    }
                    var o = function () {
                        try {
                            location.href = s
                        } catch (e) {}
                    };
                    (new GameAPI.gui.dialog(r, i,
                        GameAPI.gui.dialog.SYS_WARNING)).addButton(
                        "ok", o).show()
                };
                t.wasUpdated = function () {
                    return i
                };
                var u = function () {
                    r.children().remove();
                    var t = new GameAPI.gui.scrollpane;
                    e(t.getMainDiv()).css("height", "335px");
                    var n = false;
                    for (var i = 0; i < Script.notes.length; i++) {
                        var s = e(
                                "<h3><a>Version " + String(Script.notes[i].version / 100) + "</a></h3>").css(
                                "border-bottom", "1px solid #000000")
                            .click(function () {
                                e(this).next().toggle()
                            });
                        var o = e("<div>" + Script.notes[i].notes + "</div>");
                        t.appendContent(s).appendContent(o);
                        if (n) {
                            o.hide()
                        }
                        n = true
                    }
                    r.append(t.getMainDiv());
                    Window.hideLoader()
                };
                t.query = function () {
                    setTimeout(function () {
                        e.getScript("http://" + Script.check + "?" + (new Date).getTime())
                    }, 500)
                };
                t.check = function (e, t, n) {
                    if (Script.version != e || Script.revision != t) {
                        o(e, t)
                    }
                };
                return t
            }($);
            _base.Updater = Updater;
            Debugger.Updater = Updater;
            var Sleep = function (e) {
                var t = {};
                var n = null;
                var r = [];
                var i = [];
                var s = {};
                var o = 1;
                var u = false;
                var a = {};
                var f = function () {
                    if (a.ready) {
                        return

                    }
                    if (Settings.get("directsleep", true)) {
                        s = Cache.load("barracks");
                        if (s == null || typeof s != "object") {
                            s = {}
                        }
                        if (Character.homeTown.town_id != 0) {
                            l();
                            d()
                        }
                    }
                    a.ready = true
                };
                a = Loader.add("Sleep", "tw-db DirectSleep", f, {
                    Cache: true,
                    Settings: true
                });
                var l = function () {
                    n = GameInject.CharacterButton
                        .add(Images.buttonSleep);
                    n.click(
                        function (e) {
                            if (w.Character.homeTown.town_id != 0 && r.length == 0) {
                                h()
                            } else {
                                c(e)
                            }
                        }).addMousePopup("#SLEEP#")
                };
                var c = function (e) {
                    if (r.length == 0) {
                        return

                    }
                    var t = Map.getLastPosition();
                    t.x = t[0];
                    t.y = t[1];
                    for (var n = 0; n < r.length; n++) {
                        var i = r[n];
                        i.distance = w.Map.calcWayTime(t, i)
                    }
                    r.sort(function (e, t) {
                        return e.distance == t.distance ? 0 : e.distance > t.distance ? 1 : -1
                    });
                    var s = (new GameAPI.gui.selectbox(true)).addItem(
                            0,
                            "#HOTEL# " + w.Map.calcWayTime(t,
                                w.Character.homeTown)
                            .formatDuration())
                        .addListener(function (e) {
                            switch (e) {
                            case 0:
                                h();
                                break;
                            default:
                                p(e);
                                break
                            }
                        });
                    for (var n = 0; n < r.length; n++) {
                        var i = r[n];
                        if (i.stage != 0) {
                            s.addItem(i.id, "#STAGE# " + i.stage + " " + i.distance.formatDuration() + " | " + i.name)
                        }
                    }
                    // Dun - Add auto vertical scollbar
                    $(s.elContent).css({
                        "max-height": "270px",
                        "width": "250px",
                        "overflow-y": 'auto'
                    });
                    s.show(e)
                };
                var h = function () {
                    Ajax.remoteCallMode("building_hotel", "get_data", {
                        town_id: w.Character.homeTown.town_id
                    }, function (e) {
                        if (e.error) {
                            (new UserMessage(e.error,
                                UserMessage.TYPE_ERROR)).show();
                            return

                        }
                        var t = "";
                        for (var n in e.rooms) {
                            if (e.rooms[n].available) {
                                t = n
                            }
                        }
                        w.TaskQueue.add(new TaskSleep(
                            w.Character.homeTown.town_id, t))
                    })
                };
                var p = function (e) {
                    if (isDefined(s[e])) {
                        w.TaskQueue.add(new TaskFortSleep(e, s[e].x,
                            s[e].y))
                    }
                };
                var d = function () {
                    if (w.Character.homeTown.alliance_id == 0) {
                        return

                    }
                    Ajax.remoteCallMode("alliance", "get_data", {
                        alliance_id: w.Character.homeTown.alliance_id
                    }, function (e) {
                        if (e.error) {
                            (new UserMessage(e.error,
                                UserMessage.TYPE_ERROR)).show();
                            return

                        }
                        i = e.data.forts;
                        if (i.length > 0) {
                            w.setTimeout(function () {
                                v()
                            }, Timer.getTimeout())
                        }
                    })
                };
                var v = function () {
                    try {
                        if (i.length <= 0) {
                            return

                        }
                        var e = i.pop();
                        var t = e.fort_id;
                        if (!isDefined(s[t])) {
                            s[t] = {
                                time: 0,
                                stage: 0
                            }
                        }
                        s[t].id = t;
                        s[t].x = e.x;
                        s[t].y = e.y;
                        s[t].name = e.name;
                        s[t].type = e.type;
                        if (s[t].stage != 5 && s[t].time + 60 * 60 * 24 * o > (new Date)
                            .getTime() / 1e3) {
                            r.push(s[t]);
                            if (i.length > 0) {
                                w.setTimeout(function () {
                                    v()
                                }, Timer.getTimeout())
                            } else {
                                Cache.save("barracks", s)
                            }
                            return

                        }
                        Ajax
                            .remoteCallMode(
                                "fort_building_barracks",
                                "index", {
                                    fort_id: t
                                },
                                function (e) {
                                    if (e.error) {
                                        (new UserMessage(
                                            e.error,
                                            UserMessage.TYPE_ERROR))
                                        .show()
                                    } else {
                                        s[t].time = Number(
                                                (new Date)
                                                .getTime() / 1e3)
                                            .round(0);
                                        if (isDefined(e.barrackStage)) {
                                            s[t].stage = e.barrackStage
                                        }
                                    }
                                    r.push(s[t]);
                                    if (i.length > 0) {
                                        w
                                            .setTimeout(
                                                function () {
                                                    v()
                                                },
                                                Timer
                                                .getTimeout())
                                    } else {
                                        Cache.save("barracks",
                                            s)
                                    }
                                })
                    } catch (n) {
                        Error.report(n, "getFortData")
                    }
                };
                return t
            }($);
            Debugger.Sleep = Sleep;
            var Analyser = function ($) {
                var _self = {};
                var ready = false;
                var statistic = null;
                var backup = null;
                var locked = false;
                var reports = [];
                var failedReports = [];
                var lastPage = 0;
                var gui = {};
                var sorting = {};
                _self.extra = false;
                var loader = {};
                var init = function () {
                    if (loader.ready) {
                        return

                    }
                    var e = Cache.load("statistic");
                    if (typeof e == "object" && e != null) {
                        statistic = e
                    } else {
                        reset("all", true)
                    }
                    if (!statistic.ver) {
                        reset("all", true)
                    }
                    switch (statistic.ver) {
                    case 1:
                        reset("job", true, 1);
                        reset("duel", true, 1);
                        statistic.ver = 2;
                    case 2:
                        reset("job", true, 1);
                        reset("duel", true, 1);
                        statistic.ver = 3;
                    case 3:
                        reset("chest", true, 1);
                        statistic.ver = 4
                    }
                    backup = $.extend(true, {}, statistic);
                    GameInject.addTabOnMessagesWindow("#JOBANALYSER#",
                        "analyser-job", function () {
                            show("job")
                        });
                    if (Settings.get("chestanalyser", true)) {
                        GameInject.ItemUse(Chest.add);
                        GameInject.addTabOnMessagesWindow(
                            "#CHESTANALYSER#", "analyser-chest",
                            function () {
                                Chest.show()
                            })
                    }
                    loader.ready = true
                };
                loader = Loader.add("Analyser", "tw-db Job-Analyser",
                    init, {
                        Cache: true,
                        Settings: true,
                        Jobs: true
                    });
                _self.restore = function () {
                    statistic = $.extend(true, {}, backup)
                };
                _self.debug = function () {
                    console.log(statistic);
                    console.log(sorting)
                };
                var reset = function (e, t, n) {
                    if (t == true) {
                        if (!n) {
                            var n = 0
                        } else {
                            var r = /\[report=([0-9]+)([A-Fa-f0-9]{10})\]/;
                            var i = String(n).match(r);
                            if (i) {
                                var n = i[1]
                            }
                        }
                        if (isNaN(parseInt(n))) {
                            var s = 0
                        } else {
                            var s = parseInt(n) - 1
                        }
                        switch (e) {
                        case "job":
                            statistic[e] = {
                                last: s,
                                items: {
                                    last: 0
                                }
                            };
                            break;
                        case "duel":
                            statistic[e] = {
                                last: s
                            };
                            break;
                        case "chest":
                            statistic[e] = {};
                            break;
                        case "all":
                            statistic = {
                                ver: 4
                            };
                            reset("job", true, s + 1);
                            reset("duel", true, s + 1);
                            reset("chest", true, s + 1);
                            break
                        }
                    } else {
                        var o = $('<div><h2>Do you really want to reset the ReportAnalyser statistics?</h2><span style="font-size:12px"><br />Give Report-Link of first Report which should be read after Reset</span></div>');
                        var u = (new GameAPI.gui.textfield(
                            "twdb_analyser_last")).setSize(40);
                        u.setLabel("Report-Link:");
                        o.append(u.getMainDiv());
                        var a = new GameAPI.gui.checkbox(
                            "or use all reports  ");
                        var f = new GameAPI.gui.checkbox(
                            "or use only future reports");
                        a.setCallback(function (e) {
                            if (e) {
                                f.setSelected(false);
                                u.setValue("")
                            }
                        });
                        f.setCallback(function (e) {
                            if (e) {
                                a.setSelected(false);
                                u.setValue("")
                            }
                        });
                        $(u.getMainDiv()).find("span").css("font-size",
                            "12px");
                        $(u.getMainDiv()).find("input").keyup(
                            function () {
                                a.setSelected(false);
                                f.setSelected(false)
                            });
                        o.append($('<div style="display:block;" />')
                            .append(a.getMainDiv()).append(
                                f.getMainDiv()));
                        var l = new GameAPI.gui.dialog(
                            "ReportAnalyser - #RESET#", o);
                        l.addButton("ok", function () {
                            if (a.isSelected()) {
                                reset(e, true)
                            } else if (f.isSelected()) {
                                reset(e, true, statistic[e].last + 1)
                            } else {
                                reset(e, true, u.getValue())
                            }
                            l.hide();
                            MessagesWindow.open("analyser-" + e)
                        });
                        l.addButton("cancel");
                        l.show()
                    }
                };
                var Chest = function (e) {
                    var t = {};
                    t.add = function (e, t) {
                        var n = false;
                        for (i = 0; i < t.msg.effects.length; i += 1) {
                            var r = t.msg.effects[i];
                            if (r.type == "lottery" || r.type == "content") {
                                if (!isDefined(statistic.chest[e])) {
                                    statistic.chest[e] = {
                                        count: 0,
                                        items: {}
                                    }
                                }
                                var s = statistic.chest[e];
                                if (!n) {
                                    s.count++;
                                    n = true
                                }
                                r.items
                                    .each(function (e) {
                                        if (!isDefined(s.items[e.item_id])) {
                                            s.items[e.item_id] = 0
                                        }
                                        s.items[e.item_id] += e.count
                                    })
                            }
                        }
                        Cache.save("statistic", statistic)
                    };
                    t.show = function () {
                        if (!MessagesWindow.window) {
                            return

                        }
                        var t = e(
                                MessagesWindow.window.getContentPane())
                            .find(".messages-analyser-chest");
                        MessagesWindow.window.showLoader();
                        t.children().remove();
                        var n = new GameAPI.gui.scrollpane;
                        e(n.getMainDiv()).css("height", "385px");
                        t.append(n.getMainDiv());
                        for (var r in statistic.chest) {
                            var i = statistic.chest[r];
                            var s = (new tw2widget.Item(ItemManager
                                    .get(r), "item_inventory"))
                                .setCount(i.count);
                            s.getImgEl().addClass("item_inventory_img");
                            n
                                .appendContent(e(
                                        '<div style="float:left;position:relative;height:61px;width:60px;margin:5px" />')
                                    .append(s.getMainDiv()));
                            var o = 0;
                            var u = e('<div style="float:left;position:relative;width:590px;margin:5px" />');
                            for (var a in i.items) {
                                o++;
                                var s = (new tw2widget.Item(ItemManager
                                        .get(a), "item_inventory"))
                                    .setCount(i.items[a]);
                                s.getImgEl().addClass(
                                    "item_inventory_img");
                                u.append(s.getMainDiv())
                            }
                            u.css("heigth", (parseInt(o / 10) + 1) * 61 + "px");
                            n
                                .appendContent('<div style="float:left;position:relative;width:10px;height:' + String((parseInt(o / 10) + 1) * 61 + 10) + "px;background: url(" + Game.cdnURL + '/images/window/report/devider_report.png) repeat-x scroll 0 0 transparent;" />');
                            n.appendContent(u);
                            n
                                .appendContent('<div style="clear:both;position:relative;width:100%;height:10px;display:block;background: url(' + Game.cdnURL + '/images/window/dailyactivity/wood_devider_horiz.png) repeat-x scroll 0 0 transparent;" />')
                        }
                        MessagesWindow.window.hideLoader()
                    };
                    return t
                }($);
                var analyse = function (e) {
                    if (locked) {
                        return

                    }
                    locked = true;
                    reports = [];
                    queryReports(e)
                };
                var queryReports = function (e, t) {
                    if (!t) {
                        t = 1
                    }
                    lastPage = t;
                    Ajax.remoteCall("reports", "get_reports", {
                        page: t,
                        folder: e
                    }, function (t) {
                        readReports(e, t)
                    })
                };
                var readReports = function (e, t) {
                    var n = true;
                    if (typeof t.reports != "object") {
                        t.reports = [];
                        n = false
                    }
                    if (typeof t.page == "undefined" || lastPage != t.page) {
                        t.reports = [];
                        n = false
                    }
                    for (var r = 0; r < t.reports.length; r++) {
                        var i = t.reports[r];
                        if (i.report_id <= statistic[e].last) {
                            n = false;
                            break
                        }
                        reports.push({
                            id: i.report_id,
                            hash: i.hash,
                            type: e
                        })
                    }
                    gui.bar.setMaxValue(reports.length);
                    if (n) {
                        window.setTimeout(function () {
                            queryReports(e, lastPage + 1)
                        }, Timer.getTimeout())
                    } else {
                        analyseReports(e)
                    }
                };
                var analyseReports = function (e) {
                    if (reports.length > 0) {
                        gui.bar.setValue(gui.bar.getValue() + 1);
                        queryReport(reports.pop())
                    } else {
                        Cache.save("statistic", statistic);
                        locked = false;
                        show(e, true)
                    }
                };
                var queryReport = function (e) {
                    $.post("game.php?window=reports&mode=show_report", {
                        flash: null,
                        hash: e.hash,
                        report_id: e.id
                    }, function (t) {
                        readReport(e.type, t)
                    }, "json")
                };
                var readReport = function (e, t) {
                    if (!t || !t.report_id || !t.publishHash) {
                        (new UserMessage("empty Server Response",
                            UserMessage.TYPE_ERROR)).show();
                        return false
                    }
                    if (typeof t.page != "string" || typeof t.title != "string" || typeof t.js != "string") {
                        failedReports.push(t.report_id)
                    } else {
                        switch (e) {
                        case "job":
                            analyseJobReport(t);
                            break;
                        case "duel":
                            analyseDuelReport(t);
                            break
                        }
                        statistic[e].last = t.report_id
                    }
                    window.setTimeout(function () {
                        analyseReports(e)
                    }, Timer.getTimeout())
                };
                var analyseDuelReport = function (e) {};
                var analyseJobReport = function (json) {
                    try {
                        data = {
                            id: null,
                            hash: null,
                            job: null,
                            motivation: null,
                            duration: null,
                            wage: null,
                            bond: null,
                            experience: null,
                            injury: 0,
                            killed: false,
                            date_received: null,
                            items: {}
                        };
                        data.id = json.report_id;
                        data.hash = json.publishHash;
                        var job = Jobs.getJobByName(json.title
                            .slice(json.title.indexOf(":") + 1));
                        if (!job) {
                            failedReports.push(data.id);
                            return false
                        }
                        data.job = job.id;
                        data.date_received = json.date_received;
                        var tmp = $(json.page);
                        tmp
                            .find(".rp_row_jobdata")
                            .each(
                                function (index) {
                                    var str = $
                                        .trim($(this)
                                            .children(
                                                "span:last-child")
                                            .html());
                                    str = str.split(" ").join(
                                        " ");
                                    switch (index) {
                                    case 0:
                                        data.motivation = parseInt(str
                                            .slice(
                                                0,
                                                str
                                                .indexOf(" ")));
                                        break;
                                    case 1:
                                        var tmp = str.replace(
                                            "h",
                                            " * 3600 + ");
                                        tmp = tmp.replace("m",
                                            " * 60 + ");
                                        tmp = tmp.replace("s",
                                            " * 1 + ");
                                        tmp += "0";
                                        try {
                                            data.duration = parseInt(eval(tmp))
                                        } catch (e) {
                                            throw {
                                                message: "unrecognized time on report: " + str
                                            }
                                        }
                                        break;
                                    case 2:
                                        data.wage = parseInt(str
                                            .slice(str
                                                .indexOf(" ") + 1));
                                        break;
                                    case 3:
                                        data.bond = parseInt(str);
                                        break;
                                    case 4:
                                        data.experience = parseInt(str
                                            .slice(
                                                0,
                                                str
                                                .indexOf(" ")));
                                        break
                                    }
                                });
                        tmp.find(".rp_hurtmessage_text").each(
                            function () {
                                var e = new RegExp("[0-9]+");
                                data.injury = Number(e.exec($(this)
                                    .html()))
                            });
                        tmp.find(".rp_row_killmessage").each(
                            function () {
                                data.killed = true
                            });
                        var tmp = json.js.split(";");
                        $(tmp)
                            .each(
                                function () {
                                    var e = new RegExp(
                                        /\s*ItemManager\.get\(([0-9]+)\)\s*\)\.setCount\(([0-9]+)\)/m);
                                    var t = e.exec(this);
                                    if (t) {
                                        data.items[Number(t[1])] = Number(t[2])
                                    }
                                });
                        if (!statistic.job[data.job]) {
                            statistic.job[data.job] = {
                                count: 0,
                                products: {}
                            }
                        }
                        var jobstats = statistic.job[data.job];
                        jobstats.count++;
                        if (!jobstats[data.motivation]) {
                            jobstats[data.motivation] = {
                                count: 0,
                                duration: 0,
                                wage: 0,
                                bond: 0,
                                experience: 0,
                                injury: {},
                                killed: 0,
                                items: {},
                                extraitems: {}
                            }
                        }
                        var stats = jobstats[data.motivation];
                        if (!isDefined(stats.duration)) {
                            stats.duration = 0
                        }
                        stats.count++;
                        stats.duration += data.duration;
                        stats.wage += data.wage;
                        stats.bond += data.bond;
                        stats.experience += data.experience;
                        if (!stats.injury[data.injury]) {
                            stats.injury[data.injury] = 0
                        }
                        stats.injury[data.injury]++;
                        if (data.killed) {
                            stats.killed++
                        }
                        for (var key in data.items) {
                            var id = Number(key);
                            if (id === 138) {
                                if (!isDefined(statistic.extra)) {
                                    statistic.extra = {
                                        count: 0
                                    };
                                    _self.extra = true
                                }
                                statistic.extra.count++;
                                statistic.extra[statistic.extra.count] = data
                            }
                            var count = data.items[id];
                            var item = ItemManager.get(id);
                            if (Jobs.isProduct(id) !== -1) {
                                if (!jobstats.products[id]) {
                                    jobstats.products[id] = {
                                        last: 0
                                    }
                                }
                                var tmp = jobstats.products[id];
                                for (var i = 0; i < count; i++) {
                                    var last = jobstats.count - tmp.last;
                                    tmp.last = jobstats.count;
                                    if (!tmp[last]) {
                                        tmp[last] = 0
                                    }
                                    tmp[last]++
                                }
                            } else if (item.price == 0) {
                                if (!stats.extraitems[id]) {
                                    stats.extraitems[id] = 0
                                }
                                stats.extraitems[id]++
                            } else {
                                luck = true;
                                if (!stats.items[id]) {
                                    stats.items[id] = 0
                                }
                                stats.items[id]++
                            }
                        }
                    } catch (e) {
                        failedReports.push(data.id);
                        return false
                    }
                };
                var show = function (e, t) {
                    if (!MessagesWindow.window) {
                        return

                    }
                    gui.window = $(
                            MessagesWindow.window.getContentPane())
                        .find(".messages-analyser-" + e);
                    if (typeof t == "undefined") {
                        MessagesWindow.window.showLoader();
                        gui.bar = new GameAPI.gui.progressbar(0,
                            reports.length);
                        gui.window.children().remove();
                        gui.window.append(gui.bar.getMainDiv());
                        analyse(e)
                    } else {
                        switch (e) {
                        case "job":
                            var n = showJobs();
                            break;
                        case "duel":
                            var n = showDuels();
                            break
                        }
                        gui.window.children().remove();
                        gui.window.append(n);
                        sort();
                        switchAvg();
                        sort();
                        MessagesWindow.window.hideLoader()
                    }
                };
                var sort = function (e) {
                    try {
                        if (typeof e != "undefined") {
                            if (sorting.type == e) {
                                sorting.ord *= -1
                            } else {
                                sorting.ord = 1;
                                sorting.type = e
                            }
                        } else {
                            var e = sorting.type
                        }
                        var t = sorting.ord;
                        var n = function (n, r) {
                            var i = $(n).find(".cell_" + e).html();
                            var s = $(r).find(".cell_" + e).html();
                            if (Number(i) == i) {
                                return i * 1 > s * 1 ? t : -t
                            } else {
                                return i > s ? t : -t
                            }
                        };
                        gui.rows.sort(n);
                        for (var r = 0; r < gui.rows.length; r++) {
                            gui.bodyscroll.appendContent(gui.rows[r])
                        }
                    } catch (i) {
                        Error.report(i, "Analyser sort")
                    }
                };
                var switchAvg = function () {
                    switch (sorting.avg) {
                    case "avg":
                        sorting.avg = "sum";
                        break;
                    case "sum":
                        sorting.avg = "avg";
                        break
                    }
                    $(gui.window).find("div.row div").each(
                        function (e) {
                            var t = $(this).data(
                                String(sorting.avg));
                            var n = $(this).data(
                                String(sorting.avg) + "-t");
                            $(this).html(t).attr("title", n)
                        })
                };
                var showJobs = function () {
                    sorting = {
                        ord: 1,
                        type: 0,
                        avg: "avg"
                    };
                    var e = $('<div class="fancytable">' + '<div class="_bg tw2gui_bg_tl"></div>' + '<div class="_bg tw2gui_bg_tr"></div>' + '<div class="_bg tw2gui_bg_bl"></div>' + '<div class="_bg tw2gui_bg_br"></div>' + '<div class="trows">' + '<div class="thead statics">' + '<div class="row_head">' + '<div class="cell_0" style="width:91px; text-align:center;">' + '<span title="#NAME#" style="cursor:pointer, margin-bottom:3px;">' + '<img src="' + Images.iconName + '" />' + "</span>" + "</div>" + '<div class="cell_1" style="width:50px; text-align:center;">' + '<span title="#COUNT#">' + '<img src="' + Images.iconCount + '" />' + "</span>" + "</div>" + '<div class="cell_2" style="width:50px; text-align:center;">' + '<span title="#DURATION#">' + '<img src="' + Images.iconClock + '" />' + "</span>" + "</div>" + '<div class="cell_3" style="width:50px; text-align:center;">' + '<span title="#EXPERIENCE#">' + '<img src="' + Images.iconExperience + '" />' + "</span>" + "</div>" + '<div class="cell_4" style="width:50px; text-align:center;">' + '<span title="#WAGE#">' + '<img src="' + Images.iconDollar + '" />' + "</span>" + "</div>" + '<div class="cell_5" style="width:50px; text-align:center;">' + '<span title="#BOND#">' + '<img src="' + Images.iconUpb + '" />' + "</span>" + "</div>" + '<div class="cell_6" style="width:50px; text-align:center;">' + '<span title="#MOTIVATION#">' + '<img src="' + Images.iconMoti + '" />' + "</span>" + "</div>" + '<div class="cell_7" style="width:50px; text-align:center;">' + '<span title="#DANGER#">' + '<img src="' + Images.iconDanger + '" />' + "</span>" + "</div>" + '<div class="cell_8" style="width:50px; text-align:center;">' + '<span title="#KILLED#">' + '<img src="' + Images.iconKilled + '" />' + "</span>" + "</div>" + '<div class="cell_9" style="width:50px; text-align:center;">' + '<span title="#PRODUCTS#">' + '<img src="' + Images.iconYield + '" />' + "</span>" + "</div>" + '<div class="cell_10" style="width:50px; text-align:center;">' + '<span title="#ITEM#">' + '<img src="' + Images.iconItem + '" />' + "</span>" + "</div>" + '<div class="cell_11" style="width:41px; text-align:center;">' + '<span title="#LUCK#">' + '<img src="' + Images.iconLuck + '" />' + "</span>" + "</div>" + '<div class="cell_12" style="width:20px; text-align:right;">' + '<span title="#RESET#">' + '<img src="' + Images.iconReset + '" />' + "</span>" + "</div>" + "</div>" + "</div>" + '<div class="tbody">' + '<div class="_bg tw2gui_bg_l"></div>' + '<div class="_bg tw2gui_bg_r"></div>' + "</div>" + '<div class="tfoot statics">' + '<div class="row row_foot"></div>' + "</div>" + "</div>" + "</div>");
                    e.find(".row_head").find("img").each(function (e) {
                        if (e == 12) {
                            $(this).click(function () {
                                reset("job")
                            })
                        } else {
                            $(this).click(function (e) {
                                return function () {
                                    sort(e)
                                }
                            }(e))
                        }
                    });
                    e.find(".row_head").find("img").css("cursor",
                        "pointer");
                    var t = 0;
                    var n = {
                        jobs: 0,
                        count: 0,
                        duration: 0,
                        experience: 0,
                        wage: 0,
                        bond: 0,
                        motivation: 0,
                        injury: 0,
                        killed: 0,
                        products: 0,
                        items: 0,
                        luck: 0
                    };
                    var r = statistic.job;
                    var i = $();
                    gui.rows = [];
                    for (var s in r) {
                        var o = Jobs.getJobById(s);
                        if (!o) {
                            continue
                        }
                        var u = {
                            count: 0,
                            duration: 0,
                            experience: 0,
                            wage: 0,
                            bond: 0,
                            motivation: 0,
                            injury: 0,
                            killed: 0,
                            products: 0,
                            items: 0,
                            luck: 0
                        };
                        var a = r[s];
                        u.count = a.count;
                        var f = 0;
                        for (var t = 0; t < o.randomyields.length; t++) {
                            f += o.randomyields[t]
                        }
                        if (typeof o.yields.length == "undefined") {
                            for (var l in o.yields) {
                                f += o.yields[l].prop
                            }
                        }
                        for (var l in a.products) {
                            for (var c in a.products[l]) {
                                if (c == "last") {
                                    continue
                                }
                                var h = ItemManager.get(l);
                                u.products += Number(a.products[l][c]);
                                u.luck += Number(h.price * a.products[l][c])
                            }
                        }
                        for (var p in a) {
                            if (p == "count" || p == "products") {
                                continue
                            }
                            var c = a[p];
                            u.motivation += p * c.count;
                            u.bond += c.bond;
                            u.duration = c.duration;
                            u.experience += c.experience;
                            for (var d in c.injury) {
                                u.injury += d * c.injury[d]
                            }
                            for (var l in c.items) {
                                var h = ItemManager.get(l);
                                u.items += Number(c.items[l]);
                                u.luck += Number(h.price * c.items[l])
                            }
                            u.killed += c.killed;
                            u.wage += c.wage
                        }
                        var v = $('<div class="row row_' + t + '" />');
                        var c = $('<div class="cell_0" style="width:91px; text-align:left;cursor:pointer;font-size:11px;" ></div>');
                        c.data("sum", o.name);
                        c.data("sum-t", o.name);
                        c.data("avg", o.name);
                        c.data("avg-t", o.name);
                        v.append(c);
                        n.jobs++;
                        var c = $('<div class="cell_1" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.count);
                        c.data("sum-t", u.count);
                        c.data("avg", u.count);
                        c.data("avg-t", u.count);
                        v.append(c);
                        n.count += u.count;
                        var c = $('<div class="cell_2" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", (u.duration / 3600).round(2));
                        c.data("sum-t", String((u.duration / 3600)
                            .round(2)) + " #HOURS#");
                        c.data("avg", (u.duration / (3600 * u.count))
                            .round(2));
                        c
                            .data(
                                "avg-t",
                                "&empty; " + String((u.duration / (3600 * u.count))
                                    .round(2)) + " #HOURS#");
                        v.append(c);
                        n.duration += u.duration;
                        var c = $('<div class="cell_3" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.experience);
                        c.data("sum-t", String(u.experience));
                        c
                            .data("avg", (u.experience / u.count)
                                .round(2));
                        c.data("avg-t", "&empty; " + String((u.experience / u.count)
                            .round(2)));
                        v.append(c);
                        n.experience += u.experience;
                        var c = $('<div class="cell_4" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.wage);
                        c.data("sum-t", "$" + String(u.wage));
                        c.data("avg", (u.wage / u.count).round(2));
                        c.data("avg-t", "&empty; $" + String((u.wage / u.count).round(2)));
                        v.append(c);
                        n.wage += u.wage;
                        var c = $('<div class="cell_5" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.bond);
                        c.data("sum-t", String(u.bond));
                        c
                            .data("avg", (u.bond / u.count * 100)
                                .round(2));
                        c.data("avg-t", "&empty; " + String((u.bond / u.count * 100)
                            .round(2)) + "%");
                        v.append(c);
                        n.bond += u.bond;
                        var c = $('<div class="cell_6" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.motivation);
                        c.data("sum-t", String(u.motivation) + "%");
                        c
                            .data("avg", (u.motivation / u.count)
                                .round(2));
                        c.data("avg-t", "&empty; " + String((u.motivation / u.count)
                            .round(2)) + "%");
                        v.append(c);
                        n.motivation += u.motivation;
                        var c = $('<div class="cell_7" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.injury);
                        c.data("sum-t", String(u.injury));
                        c.data("avg", (u.injury / u.count).round(2));
                        c
                            .data("avg-t", "&empty; " + String((u.injury / u.count)
                                .round(2)));
                        v.append(c);
                        n.injury += u.injury;
                        var c = $('<div class="cell_8" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.killed);
                        c.data("sum-t", String(u.killed));
                        c.data("avg", (u.killed / u.count * 100)
                            .round(2));
                        c.data("avg-t", "&empty; " + String((u.killed / u.count * 100)
                            .round(2)) + "%");
                        v.append(c);
                        n.killed += u.killed;
                        var c = $('<div class="cell_9" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.products);
                        c.data("sum-t", String(u.products));
                        c.data("avg", (u.products / u.count * 100)
                            .round(2));
                        c.data("avg-t", "&empty; " + String((u.products / u.count * 100)
                            .round(2)) + "% [" + f * 100 + "%]");
                        v.append(c);
                        n.products += u.products;
                        var c = $('<div class="cell_10" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.items);
                        c.data("sum-t", String(u.items));
                        c.data("avg", (u.items / u.count * 100)
                            .round(2));
                        c.data("avg-t", "&empty; " + String((u.items / u.count * 100)
                            .round(2)) + "%");
                        v.append(c);
                        n.items += u.items;
                        var c = $('<div class="cell_11" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        c.data("sum", u.luck);
                        c.data("sum-t", "$" + String(u.luck));
                        c.data("avg", (u.luck / u.count).round(2));
                        c.data("avg-t", "&empty; $" + String((u.luck / u.count).round(2)));
                        v.append(c);
                        n.luck += u.luck;
                        gui.rows.push(v);
                        v.click(function () {
                            detail($(this).children(".cell_0").html())
                        });
                        t++
                    }
                    gui.bodyscroll = new GameAPI.gui.scrollpane;
                    $(gui.bodyscroll.getMainDiv()).css("height",
                        "300px");
                    e.find(".tbody")
                        .append(gui.bodyscroll.getMainDiv());
                    gui.footer = e.find(".row_foot");
                    var c = $('<div class="cell_0" style="width:71px; text-align:center;" ></div>');
                    c.data("sum", n.jobs);
                    c.data("sum-t", n.jobs + " #JOBS#");
                    c.data("avg", n.jobs);
                    c.data("avg-t", n.jobs + " #JOBS#");
                    gui.footer.append(c);
                    var c = $('<div class="cell_0" style="width:20px; text-align:center;cursor:pointer;color:#444;" ></div>');
                    c.mouseenter(function () {
                        $(this).css("color", "#888")
                    }).mouseleave(function () {
                        $(this).css("color", "#444")
                    });
                    c.click(function () {
                        switchAvg()
                    });
                    c.data("sum", "&sum;");
                    c.data("sum-t", "#SWITCH# &empty;");
                    c.data("avg", "&empty;");
                    c.data("avg-t", "#SWITCH# &sum;");
                    gui.footer.append(c);
                    var c = $('<div class="cell_1" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.count);
                    c.data("sum-t", n.count);
                    c.data("avg", n.count);
                    c.data("avg-t", n.count);
                    gui.footer.append(c);
                    var c = $('<div class="cell_2" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", (n.duration / 3600).round(2));
                    c.data("sum-t",
                        String((n.duration / 3600).round(2)) + "#HOURS#");
                    c.data("avg", (n.duration / (3600 * n.count))
                        .round(2));
                    c.data("avg-t", "&empty; " + String((n.duration / (3600 * n.count))
                        .round(2)) + "#HOURS#");
                    gui.footer.append(c);
                    var c = $('<div class="cell_3" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.experience);
                    c.data("sum-t", String(n.experience));
                    c.data("avg", (n.experience / n.count).round(2));
                    c
                        .data("avg-t", "&empty; " + String((n.experience / n.count)
                            .round(2)));
                    gui.footer.append(c);
                    var c = $('<div class="cell_4" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.wage);
                    c.data("sum-t", "$" + String(n.wage));
                    c.data("avg", (n.wage / n.count).round(2));
                    c.data("avg-t", "&empty; $" + String((n.wage / n.count).round(2)));
                    gui.footer.append(c);
                    var c = $('<div class="cell_5" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.bond);
                    c.data("sum-t", String(n.bond));
                    c.data("avg", (n.bond / n.count * 100).round(2));
                    c.data("avg-t", "&empty; " + String((n.bond / n.count * 100).round(2)) + "%");
                    gui.footer.append(c);
                    var c = $('<div class="cell_6" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.motivation);
                    c.data("sum-t", String(n.motivation) + "%");
                    c.data("avg", (n.motivation / n.count).round(2));
                    c.data("avg-t", "&empty; " + String((n.motivation / n.count).round(2)) + "%");
                    gui.footer.append(c);
                    var c = $('<div class="cell_7" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.injury);
                    c.data("sum-t", String(n.injury));
                    c.data("avg", (n.injury / n.count).round(2));
                    c.data("avg-t", "&empty; " + String((n.injury / n.count).round(2)));
                    gui.footer.append(c);
                    var c = $('<div class="cell_8" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.killed);
                    c.data("sum-t", String(n.killed));
                    c.data("avg", (n.killed / n.count * 100).round(2));
                    c.data("avg-t", "&empty; " + String((n.killed / n.count * 100)
                        .round(2)) + "%");
                    gui.footer.append(c);
                    var c = $('<div class="cell_9" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.products);
                    c.data("sum-t", String(n.products));
                    c
                        .data("avg", (n.products / n.count * 100)
                            .round(2));
                    c.data("avg-t", "&empty; " + String((n.products / n.count * 100)
                        .round(2)) + "%");
                    gui.footer.append(c);
                    var c = $('<div class="cell_10" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.items);
                    c.data("sum-t", String(n.items));
                    c.data("avg", (n.items / n.count * 100).round(2));
                    c.data("avg-t",
                        "&empty; " + String((n.items / n.count * 100)
                            .round(2)) + "%");
                    gui.footer.append(c);
                    var c = $('<div class="cell_11" style="width:50px; text-align:center;" ></div>');
                    c.data("sum", n.luck);
                    c.data("sum-t", "$" + String(n.luck));
                    c.data("avg", (n.luck / n.count).round(2));
                    c.data("avg-t", "&empty; $" + String((n.luck / n.count).round(2)));
                    gui.footer.append(c);
                    var i = $(
                            '<div style="margin: 0px 6px 0px 6px;width:680px;" />')
                        .append(e);
                    return i
                };
                var detail = function (e) {};
                _self.getExtra = function () {
                    if (isDefined(statistic.extra)) {
                        return statistic.extra
                    }
                    return null
                };
                return _self
            }($);
            Debugger.Analyser = Analyser;
            var Notes = function (e) {
                var t = {};
                var n = null;
                var r = {};
                var i = function () {
                    if (r.ready) {
                        return

                    }
                    if (r.ready) {
                        return

                    }
                    if (Settings.get("notes", true)) {
                        GameInject.addTabOnMessagesWindow("#NOTES#",
                            "notes", function () {
                                s()
                            })
                    }
                    r.ready = true
                };
                r = Loader.add("Notes", "tw-db Notes", i, {
                    Cache: true,
                    Settings: true
                });
                var s = function () {
                    if (!w.MessagesWindow.window) {
                        return

                    }
                    n = e(w.MessagesWindow.window.getContentPane())
                        .find(".messages-notes");
                    n.css("width", "680px").css("margin", "0 auto")
                        .css("position", "relative")
                        .css("top", "0");
                    a(Cache.load("notes"))
                };
                var o = function (e) {
                    Cache.save("notes", e);
                    (new UserMessage("#SAVE_SUCCESSFUL#",
                        UserMessage.TYPE_SUCCESS)).show()
                };
                var u = function (t) {
                    n.children().remove();
                    w.MessagesWindow.window.showLoader();
                    var r = (new GameAPI.gui.textarea).setWidth(660)
                        .setHeight(300).setContent(t);
                    n
                        .append(
                            e('<div style="margin-left:8px" />')
                            .append(
                                (new GameAPI.gui.bbcodes(
                                    r))
                                .getMainDiv()))
                        .append(r.getMainDiv())
                        .append(
                            e('<div style="margin-left:8px" />')
                            .append(
                                (new GameAPI.gui.button(
                                    "#SAVE#"
                                    .escapeHTML(),
                                    function () {
                                        o(r
                                            .getContent());
                                        a(r
                                            .getContent())
                                    }))
                                .getMainDiv())
                            .append(
                                (new GameAPI.gui.button(
                                    "#PREVIEW#"
                                    .escapeHTML(),
                                    function () {
                                        a(r
                                            .getContent())
                                    }))
                                .getMainDiv()));
                    w.MessagesWindow.window.hideLoader()
                };
                var a = function (t) {
                    n.children().remove();
                    var r = new GameAPI.gui.scrollpane;
                    e(r.getMainDiv()).css("height", "324px");
                    e(r.getMainDiv()).find(
                            ".tw2gui_scrollpane_clipper_contentpane")
                        .addClass("selectable");
                    n
                        .append(
                            e('<div style="margin:8px" />')
                            .append(r.getMainDiv()))
                        .append(
                            e('<div style="margin-left:8px" />')
                            .append(
                                (new GameAPI.gui.button(
                                    "#SAVE#"
                                    .escapeHTML(),
                                    function () {
                                        o(t)
                                    }))
                                .getMainDiv())
                            .append(
                                (new GameAPI.gui.button(
                                    "#EDIT#"
                                    .escapeHTML(),
                                    function () {
                                        u(t)
                                    }))
                                .getMainDiv()));
                    if (t) {
                        w.MessagesWindow.window.showLoader();
                        Ajax.remoteCall("settings", "get_parsed_text", {
                            text: t
                        }, function (e) {
                            r.appendContent(w.Game.TextHandler
                                .parse(e.parsed_text));
                            w.MessagesWindow.window
                                .hideLoader()
                        })
                    }
                };
                return t
            }($);
            Debugger.Notes = Notes;
            var Map = function (e) {
                var t = {};
                var n = false;
                var r = 181;
                var i = 79;
                var s = 0;
                var o = 0;
                var u = {};
                var a = {};
                var f = null;
                var l = null;
                var c = {};
                var h = function () {
                    if (c.ready) {
                        return

                    }
                    if (Settings.get("showscrollto", true)) {
                        d()
                    }
                    Ajax.get("map", "get_minimap", {}, function (e) {
                        if (e.error) {
                            c.failed = true;
                            return (new UserMessage(e.msg)).show()
                        }
                        u = e.job_groups;
                        c.ready = true
                    })
                };
                c = Loader.add("Map", "tw-db Map", h, {
                    Settings: true
                });
                t.getNearestJob = function (e) {
                    var n = JobList.getJobById(e);
                    var r = u[n.groupid];
                    if (!r) {
                        return []
                    }
                    var i = [];
                    var s = t.getLastPosition();
                    for (var o = 0; o < r.length; o++) {
                        var a = r[o][0] - s[0];
                        var f = r[o][1] - s[1];
                        var l = Math.sqrt(a * a + f * f);
                        var c = window.Map.calcWayTime({
                            x: r[o][0],
                            y: r[o][1]
                        }, {
                            x: s[0],
                            y: s[1]
                        });
                        var h = Number(Math.atan(f / a) * 180 / Math.PI)
                            .round(0);
                        if (a < 0) {
                            h -= 180
                        }
                        i.push({
                            dist: l,
                            time: c,
                            x: r[o][0],
                            y: r[o][1],
                            angle: h
                        })
                    }
                    var p = function (e, t) {
                        return e.dist * 1 > t.dist * 1 ? 1 : -1
                    };
                    i.sort(p);
                    return i
                };
                t.getLastPosition = function () {
                    var e = Character.position.x;
                    var t = Character.position.y;
                    var n = TaskQueue.queue;
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r].wayData;
                        if (i.x) {
                            e = i.x;
                            t = i.y
                        }
                    }
                    return [e, t]
                };
                t.setMinimapJob = function (t) {
                    if (f) {
                        window.clearInterval(l);
                        window.clearInterval(f)
                    }
                    var n = function (t) {
                        if (!MinimapWindow.window || e(MinimapWindow.window.divMain)
                            .find(
                                ".tw2gui_jobsearch_string").length == 0 || !e(MinimapWindow.window.divMain)
                            .find(
                                ".tw2gui_jobsearch_string")
                            .is(":visible")) {
                            return

                        }
                        window.clearInterval(f);
                        window.clearInterval(l);
                        f = null;
                        l = null;
                        MinimapWindow.resetSearchContext();
                        e("input.tw2gui_jobsearch_string",
                            MinimapWindow.DOM).val(t).keyup()
                    };
                    l = setInterval(function () {
                        window.clearInterval(f);
                        window.clearInterval(l);
                        f = null;
                        l = null
                    }, 3e5);
                    f = setInterval(function () {
                        n(t)
                    }, 200)
                };
                var p = function (e) {
                    var n = false;
                    var u = 0;
                    var e = [];
                    var a = s;
                    var f = o;
                    for (var a = s; a <= r; a++) {
                        for (var f = o; f <= i; f++) {
                            u++;
                            e.push([a, f]);
                            if (u > 299) {
                                n = true;
                                break
                            }
                        }
                        if (n) {
                            break
                        }
                        o = 0
                    }
                    s = a;
                    o = f + 1;
                    if (e.length > 0) {
                        window.Map.Data.Loader.load(e, function () {
                            setTimeout(function () {
                                t.loadMap()
                            }, Timer.getTimeout())
                        })
                    }
                };
                t.loadMap = function () {
                    p()
                };
                var d = function () {
                    var t = function () {
                        var t = e('<div style="position:absolute;bottom:45px;left:5px;display:block:heigth:30px;" />');
                        var n = new GameAPI.gui.textfield;
                        var r = new GameAPI.gui.textfield;
                        var i = "";
                        var s = "";
                        n.setWidth(45);
                        r.setWidth(45).setMaxLength(5);
                        var o = function () {
                            var e = Number(n.getValue());
                            var t = Number(r.getValue());
                            window.Map.center(e, t);
                            n.setValue("");
                            r.setValue("")
                        };
                        e(n.getMainDiv())
                            .find("input")
                            .keyup(
                                function (t) {
                                    window
                                        .setTimeout(
                                            function () {
                                                if (t.ctrlKey && t.keyCode == 86 && !t.altKey) {
                                                    var u = (new RegExp(
                                                            "^([0-9]{1,5})([^0-9]+)([0-9]{1,5})$"))
                                                        .exec(e
                                                            .trim(n
                                                                .getValue()));
                                                    if (u) {
                                                        n
                                                            .setValue(u[1]);
                                                        r
                                                            .setValue(u[3]);
                                                        e(
                                                                r
                                                                .getMainDiv())
                                                            .find(
                                                                "input")
                                                            .focus();
                                                        i = n
                                                            .getValue();
                                                        s = r
                                                            .getValue();
                                                        return

                                                    }
                                                    var u = (new RegExp(
                                                            "^([0-9]{1,5})$"))
                                                        .exec(e
                                                            .trim(n
                                                                .getValue()));
                                                    if (u) {
                                                        n
                                                            .setValue(u[1]);
                                                        e(
                                                                r
                                                                .getMainDiv())
                                                            .find(
                                                                "input")
                                                            .focus();
                                                        i = n
                                                            .getValue();
                                                        return

                                                    }
                                                    n
                                                        .setValue(i)
                                                }
                                                if (t.keyCode == 13) {
                                                    o();
                                                    return

                                                }
                                                if (String(e
                                                    .trim(n
                                                        .getValue())).length == 0) {
                                                    i = n
                                                        .getValue();
                                                    return

                                                }
                                                var u = (new RegExp(
                                                        "^([0-9]{1,5})$"))
                                                    .exec(e
                                                        .trim(n
                                                            .getValue()));
                                                if (u) {
                                                    n
                                                        .setValue(u[1]);
                                                    if (String(u[1]).length == 5) {
                                                        e(
                                                                r
                                                                .getMainDiv())
                                                            .find(
                                                                "input")
                                                            .focus()
                                                    }
                                                    i = n
                                                        .getValue();
                                                    return

                                                }
                                                n
                                                    .setValue(i)
                                            }, 100)
                                });
                        e(r.getMainDiv())
                            .find("input")
                            .keyup(
                                function (t) {
                                    window
                                        .setTimeout(
                                            function () {
                                                if (t.ctrlKey && t.keyCode == 86 && !t.altKey) {
                                                    var n = (new RegExp(
                                                            "^([0-9]{1,5})$"))
                                                        .exec(e
                                                            .trim(r
                                                                .getValue()));
                                                    if (n) {
                                                        r
                                                            .setValue(n[1]);
                                                        e(
                                                                r
                                                                .getMainDiv())
                                                            .find(
                                                                "input")
                                                            .focus();
                                                        s = r
                                                            .getValue();
                                                        return

                                                    }
                                                    r
                                                        .setValue(s)
                                                }
                                                if (t.keyCode == 13) {
                                                    o();
                                                    return

                                                }
                                                if (String(e
                                                    .trim(r
                                                        .getValue())).length == 0) {
                                                    s = r
                                                        .getValue();
                                                    return

                                                }
                                                var n = (new RegExp(
                                                        "^([0-9]{1,5})$"))
                                                    .exec(e
                                                        .trim(r
                                                            .getValue()));
                                                if (n) {
                                                    r
                                                        .setValue(n[1]);
                                                    if (String(n[1]).length == 5) {
                                                        e(
                                                                r
                                                                .getMainDiv())
                                                            .find(
                                                                "input")
                                                            .focus()
                                                    }
                                                    s = r
                                                        .getValue();
                                                    return

                                                }
                                                r
                                                    .setValue(s)
                                            }, 100)
                                });
                        var u = new GameAPI.gui.button("Ok",
                            function () {
                                o()
                            }, null, null, "#SCROLL_TO#");
                        u.setWidth("50");
                        var a = e(
                                '<img title="#SHOW_COORDS#" src="' + Images.iconCount + '" style="cursor:pointer;opacity:0.5;position:relative;vertical-align:top;position:relative;top:6px;" />')
                            .click(function () {
                                if (e(this).css("opacity") == 1) {
                                    e(this).css("opacity", "0.5");
                                    window.Map.hideCoords()
                                } else {
                                    e(this).css("opacity", "1");
                                    window.Map.showCoords()
                                }
                            });
                        var f = e(
                                '<span style="position:relative;top:-5px" />')
                            .append(n.getMainDiv()).append(
                                "<span>|</span>").append(
                                r.getMainDiv());
                        t.append(a).append(f).append(u.getMainDiv());
                        e(MinimapWindow.window.divMain).find(
                            ".minimap-right").append(t)
                    };
                    GameInject.injectMinimap(function () {
                        t()
                    })
                };
                return t
            }($);
            _base.Map = Map;
            Debugger.Map = Map;
            var BonusJobs = function (e) {
                var t = {};
                var n = {};
                var r = {};
                var i = {
                    gold: false,
                    silver: false
                };
                var s = function () {
                    if (r.ready) {
                        return

                    }
                    if (!Settings.get("showbonusjobs", true)) {
                        r.ready = true;
                        return

                    }
                    n = Cache.load("bonusjobs");
                    if (!isDefined(n)) {
                        n = {}
                    }
                    i = Cache.load("bonusdisplay");
                    if (!isDefined(i)) {
                        i = {
                            gold: false,
                            silver: false
                        }
                    }
                    for (key in n) {
                        if (!n.hasOwnProperty(key)) {
                            continue
                        }
                        var e = n[key];
                        var t = 0;
                        for (var s in e) {
                            if (!e.hasOwnProperty(s)) {
                                continue
                            }
                            if (e[s].gold) {
                                t++;
                                continue
                            }
                            var a = new Date;
                            var f = new Date;
                            f.setHours(2);
                            f.setMinutes(15);
                            f.setSeconds(0);
                            f.setMilliseconds(0);
                            var l = f.getTime();
                            if (a.getHours() < 2 || a.getHours() == 2 && a.getMinutes() < 15) {
                                l -= 24 * 60 * 60 * 1e3
                            }
                            if (e[s].time > l) {
                                t++
                            } else {
                                delete e[s]
                            }
                        }
                        if (t == 0) {
                            delete n[key]
                        }
                    }
                    u();
                    o();
                    r.ready = true
                };
                r = Loader.add("BonusJobs", "tw-db BonusJobs", s, {
                    Settings: true,
                    Cache: true,
                    Jobs: true
                });
                var o = function () {
                    var e = function (e) {
                        var t = window.Map.Helper.getPosition(e.parent);
                        if (!isDefined(t) || !isDefined(t.x) || !isDefined(t.y)) {
                            return

                        }
                        if (!isDefined(window.Map.JobHandler.Featured[t.x + "-" + t.y])) {
                            if (isDefined(n[t.x + "-" + t.y])) {
                                delete n[t.x + "-" + t.y];
                                Cache.save("bonusjobs", n)
                            }
                            return

                        }
                        var e = window.Map.JobHandler.Featured[t.x + "-" + t.y];
                        n[t.x + "-" + t.y] = {};
                        for (var r in e) {
                            if (!e.hasOwnProperty(r)) {
                                continue
                            }
                            n[t.x + "-" + t.y][r] = e[r];
                            n[t.x + "-" + t.y][r]["time"] = (new Date)
                                .getTime()
                        }
                        Cache.save("bonusjobs", n)
                    };
                    GameInject.injectRadialmenu(function (t) {
                        e(t)
                    })
                };
                var u = function () {
                    var t = function () {
                        var t = e(
                                '<div style="position:absolute;top:40px;right:10px;display:block:heigth:30px;" />')
                            .append(
                                e(
                                    '<input title="#HELP_GOLD#" type="checkbox" ' + (i.gold ? 'checked="checked"' : "") + ' style="vertical-align:top;margin-left:5px;margin-right:5px;" />')
                                .change(
                                    function () {
                                        if (e(this)
                                            .attr(
                                                "checked")) {
                                            i.gold = true
                                        } else {
                                            i.gold = false
                                        }
                                        a()
                                    }))
                            .append(
                                '<div title="#HELP_GOLD#" style="position:relative;display:inline-block;height:9px;width:9px;background-color:yellow;border:1px solid red;margin:1px;"></div>')
                            .append(
                                e(
                                    '<input title="#HELP_SILVER#" type="checkbox" ' + (i.silver ? 'checked="checked"' : "") + 'style="vertical-align:top;margin-left:5px;margin-right:5px;" />')
                                .change(
                                    function () {
                                        if (e(this)
                                            .attr(
                                                "checked")) {
                                            i.silver = true
                                        } else {
                                            i.silver = false
                                        }
                                        a()
                                    }))
                            .append(
                                '<div title="#HELP_SILVER#" style="position:relative;display:inline-block;height:9px;width:9px;background-color:white;border:1px solid black;margin:1px;"></div>')
                            .append(
                                e(
                                    '<img title="#BONUS_JOBS# #EXPORT#" style="margin-left:3px;cursor:pointer;position:relative;display:inline-block;height:16px;width:16px;vertical-align:top;top:-2px;" src="' + Images.iconExport + '" />')
                                .click(function () {
                                    f()
                                }))
                            .append(
                                e(
                                    '<img title="#BONUS_JOBS# #IMPORT#" style="margin-left:3px;cursor:pointer;position:relative;display:inline-block;height:16px;width:16px;vertical-align:top;top:-2px;" src="' + Images.iconImport + '" />')
                                .click(function () {
                                    l()
                                }))
                            .append(
                                e(
                                    '<img title="#BONUS_JOBS# #RESET#" style="margin-left:3px;cursor:pointer;position:relative;display:inline-block;height:16px;width:16px;vertical-align:top;top:-2px;" src="' + Images.iconReset2 + '" />')
                                .click(function () {
                                    c()
                                }));
                        e(MinimapWindow.window.divMain).find(
                            ".minimap-right").append(t);
                        a()
                    };
                    GameInject.injectMinimap(function () {
                        t()
                    })
                };
                var a = function () {
                    Cache.save("bonusdisplay", i);
                    e(MinimapWindow.window.divMain).find(
                            "#minimap_worldmap").find(".TWDBbonusjob")
                        .remove();
                    var t = function (t, n, r, i, s) {
                        var o = .00513;
                        var u = parseInt(t * o) - 3;
                        var a = parseInt(n * o) + 2;
                        var f = "";
                        if (i > 1) {
                            f = "-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);-o-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);"
                        }
                        var l = e(
                                '<div class="TWDBbonusjob" style="z-index:7;position:absolute;display:block;width:4px;height:4px;background-color:' + (r ? "yellow" : "white") + ";left:" + u + "px;top:" + a + "px;" + f + "border:1px solid " + (r ? "red" : "black") + ';" />')
                            .click(function (e, t) {
                                return function () {
                                    window.Map.center(e, t)
                                }
                            }(t, n))
                            .addMousePopup(
                                '<div style="min-width:60px;text-align:center">' + s
                                .join('<div class="marker_popup_divider"></div>') + "</div>");
                        e(MinimapWindow.window.divMain).find(
                            "#minimap_worldmap").append(l)
                    };
                    var r = n;
                    if (Settings.get("scooby", false)) {
                        r = window.Map.JobHandler.Featured
                    }
                    for (key in r) {
                        if (!r.hasOwnProperty(key)) {
                            continue
                        }
                        var s = r[key];
                        var o = false;
                        var u = 0;
                        var a = [];
                        for (var f in s) {
                            if (!s.hasOwnProperty(f)) {
                                continue
                            }
                            if (s[f].gold) {
                                if (!i.gold) {
                                    continue
                                }
                                o = true;
                                u++
                            }
                            if (s[f].silver) {
                                if (!i.silver) {
                                    continue
                                }
                                u++
                            }
                            var l = s[f].x;
                            var c = s[f].y;
                            job = JobList.getJobById(s[f].job_id);
                            a.push(Jobs.getPopup(s[f].job_id,
                                s[f].gold ? "gold" : "silver"))
                        }
                        if (u > 0) {
                            t(l, c, o, u, a)
                        }
                    }
                };
                var f = function () {
                    var t = [];
                    for (var r in n) {
                        if (!n.hasOwnProperty(r)) {
                            continue
                        }
                        var i = n[r];
                        for (var s in i) {
                            if (!i.hasOwnProperty(s)) {
                                continue
                            }
                            var o = Jobs.getJobById(s);
                            var u = Math.ceil(i[s].x / 6635) + (i[s].y > 10176 ? 7 : 0);
                            t.push({
                                name: o.name,
                                bonus: i[s].gold ? "gold" : "silver",
                                country: u,
                                x: i[s].x,
                                y: i[s].y,
                                id: s
                            })
                        }
                    }
                    var a = e("<textarea />").css({
                        width: "500px",
                        height: "200px",
                        "background-color": "transparent",
                        "border-width": "0px"
                    }).click(function () {
                        this.select()
                    });
                    var f = "";
                    var l = 1;
                    var c = function (e) {
                        if (f != e) {
                            f = e;
                            l = 1
                        } else {
                            l *= -1
                        }
                        var n = function (e, t) {
                            return e[f] > t[f] ? l : -1 * l
                        };
                        t.sort(n);
                        var r = "";
                        var i = "";
                        for (var s = 0; s < t.length; s++) {
                            var o = t[s];
                            if (f == "country" && i != o.country) {
                                i = o.country;
                                r += "-- #COUNTRY# " + i + " --" + "\n"
                            }
                            r += o.name + "; " + o.bonus + "; " + o.x + "-" + o.y + "; " + o.id + "\n"
                        }
                        a.val(r)
                    };
                    c("name");
                    var h = e("<div />")
                        .css({
                            width: "500px",
                            height: "22px",
                            position: "relative",
                            display: "block"
                        })
                        .append(
                            e(
                                '<img src="' + Images.iconName + '" title=" #ORDER_NAME# "  style="margin:0px 2px 0px 2px;cursor:pointer;" />')
                            .click(function () {
                                c("name")
                            }))
                        .append(
                            e(
                                '<img src="' + Images.iconCount + '" title=" #ORDER_COUNTRY# " style="margin:0px 2px 0px 2px;cursor:pointer;" />')
                            .click(function () {
                                c("country")
                            }));
                    (new GameAPI.gui.dialog("#BONUS_JOBS# #EXPORT#", e(
                        "<div />").append(h).append(a))).addButton(
                        "ok").show()
                };
                var l = function () {
                    var t = e("<textarea />");
                    t.css({
                        width: "400px",
                        height: "100px"
                    });
                    var r = function () {
                        var r = t.val();
                        var i = r.split(/[\n,\r,\r\n]/);
                        for (var s = 0; s < i.length; s++) {
                            var o = i[s].split(";", 4);
                            if (o.length != 4) {
                                continue
                            }
                            if (Number(o[3]) != o[3]) {
                                continue
                            }
                            if (!Jobs.getJobById(Number(o[3]))) {
                                continue
                            }
                            var u = String(o[2]).split("-", 2);
                            if (u.length != 2) {
                                continue
                            }
                            if (Number(u[0]) != u[0] || Number(u[1]) != u[1]) {
                                continue
                            }
                            var f = Jobs.getJobById(Number(o[3]));
                            var l = {
                                gold: e.trim(o[1]) == "gold" ? true : false,
                                group_id: f.groupid,
                                job_id: Number(o[3]),
                                silver: e.trim(o[1]) == "gold" ? false : true,
                                x: Number(u[0]),
                                y: Number(u[1]),
                                time: (new Date).getTime()
                            };
                            var c = Number(u[0]) + "-" + Number(u[1]);
                            if (!isDefined(n[c])) {
                                n[c] = {}
                            }
                            n[c][Number(o[3])] = l
                        }
                        Cache.save("bonusjobs", n);
                        a()
                    };
                    (new GameAPI.gui.dialog("#BONUS_JOBS# #IMPORT#", t))
                    .addButton("ok", r).addButton("cancel")
                        .show()
                };
                var c = function (e) {
                    try {
                        if (e) {
                            for (var t in n) {
                                if (!n.hasOwnProperty(t)) {
                                    continue
                                }
                                var r = n[t];
                                var i = 0;
                                for (var s in r) {
                                    if (!r.hasOwnProperty(s)) {
                                        continue
                                    }
                                    if (e == "gold" && r[s].gold) {
                                        i++;
                                        continue
                                    }
                                    if (e == "silver" && r[s].silver) {
                                        i++;
                                        continue
                                    }
                                    delete r[s]
                                }
                                if (i == 0) {
                                    delete n[t]
                                }
                            }
                            Cache.save("bonusjobs", n);
                            a();
                            (new UserMessage("#BONUS_JOBS# #RESET#",
                                UserMessage.TYPE_SUCCESS)).show()
                        } else {
                            var o = "tw-db #BONUS_JOBS# #RESET#";
                            var u = '<div class="txcenter">#BONUS_JOBS# #RESET#</div>';
                            (new GameAPI.gui.dialog(o, u,
                                GameAPI.gui.dialog.SYS_QUESTION))
                            .addButton("#ALL#", function () {
                                    c("all")
                                }).addButton("#GOLD#", function () {
                                    c("silver")
                                }).addButton("#SILVER#",
                                    function () {
                                        c("gold")
                                    }).addButton("cancel")
                                .show()
                        }
                    } catch (f) {
                        Error.report(f, "bonusjob reset")
                    }
                };
                return t
            }($);
            Debugger.BonusJobs = BonusJobs;
            var Chat = function (e) {
                var t = {};
                var n = false;
                var i = {
                    ":/": "sore",
                    "=:)": "invader",
                    ">:(": "angry",
                    ":'(": "cry",
                    ":)": "smile",
                    ":D": "grin",
                    ":(": "frown",
                    ";)": "smirk",
                    ":P": "tongue",
                    ":o": "ohmy",
                    ":x": "muted",
                    ":|": "silent",
                    ">.<": "palm",
                    "-.-": "nc",
                    "o.O": "oo",
                    "O.o": "oo",
                    "^_^": "happy",
                    o_O: "oo",
                    "x.x": "xx",
                    "T.T": "cry",
                    "el pollo diablo!": "elpollodiablo",
                    "!el pollo diablo": "elpollodiablo_mirror",
                    "el pollo diablo?!": "elpollodiablo_front"
                };
                var s = [];
                var o = {};
                var u = function () {
                    if (o.ready) {
                        return

                    }
                    if (Settings.get("chat", true)) {
                        GameInject.ChatLayout(function (e) {
                            f(e)
                        });
                        GameInject.ChatSend(function (e) {
                            a(e)
                        });
                        var e = Cache.load("chathistory");
                        if (typeof e == "object" && e != null) {
                            if (e.color) {
                                e = e.color;
                                Cache.save("chathistory", e)
                            }
                            s = e
                        }
                    }
                    o.ready = true
                };
                o = Loader.add("Chat", "tw-db Chat Enhancement", u, {
                    Settings: true,
                    Cache: true
                });
                var a = function (e) {
                    var t = e.input.val();
                    if (!t) {
                        return

                    }
                    var n = function (t) {
                        if (e._caps) {
                            t = t.toUpperCase()
                        }
                        if (e._bold) {
                            t = t.replace(/\*/g, "~");
                            t = "*" + t + "*"
                        }
                        return t
                    };
                    if (t.substr(0, 1) == "/") {
                        r = new RegExp(
                            "^\\/(tell|msg)\\s+([^:]+):(.+)$");
                        v = t.match(r);
                        if (v) {
                            if (e._color) {
                                t = "/tell " + v[2] + ":/" + e._color + n(v[3])
                            } else {
                                t = "/tell " + v[2] + ":" + n(v[3])
                            }
                        }
                        e.input.val(t);
                        return

                    }
                    t = n(t);
                    if (e._color) {
                        t = "/" + e._color + t
                    }
                    e.input.val(t);
                    return

                };
                var f = function (e) {
                    var t = e.mainDiv.find(".TWDBchat");
                    if (t.length == 0) {
                        e.mainDiv.find(".chat_input").find(".cbg").css(
                            "left", "38px").addClass(".TWDBchat");
                        e._color = null;
                        e._bold = false;
                        e._caps = false;
                        l(e);
                        m(e)
                    }
                };
                var l = function (t) {
                    var n = e('<span style="padding:3px;display:none;width:160px;position:absolute;bottom:20px;left:-3px;" />');
                    for (var r in i) {
                        n
                            .append(e(
                                    '<img src="' + Game.cdnURL + "/images/chat/emoticons/" + i[r] + '.png?1" title="' + r + '" style="cursor:pointer;margin:1px;" />')
                                .click(
                                    function (e) {
                                        return function () {
                                            t.input
                                                .val(t.input
                                                    .val() + " " + e);
                                            t.input.focus();
                                            n.hide()
                                        }
                                    }(r)))
                    }
                    var s = false;
                    t.mainDiv
                        .find(".chat_input")
                        .append(
                            e(
                                '<div style="position:absolute;width:15px;height:15px;bottom:7px;vertical-align:top;left:23px;cursor:pointer;" />')
                            .append(
                                e('<img style="vertical-align:top;" src="' + Images.iconChatSM + '" />'))
                            .append(n)
                            .hover(function () {
                                s = true;
                                n.show()
                            }, function () {
                                s = false;
                                setTimeout(function () {
                                    if (!s) {
                                        n.hide()
                                    }
                                }, 200)
                            }))
                };
                var c = function (e) {
                    var t = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    if (t) {
                        return String(parseInt(t[1] * 9 / 255 + .5)) + String(parseInt(t[2] * 9 / 255 + .5)) + String(parseInt(t[3] * 9 / 255 + .5))
                    } else {
                        return "000"
                    }
                };
                var h = function (e) {
                    return "rgb(" + parseInt(e[0] * 255 / 9) + "," + parseInt(e[1] * 255 / 9) + "," + parseInt(e[2] * 255 / 9) + ")"
                };
                var p = function (e, t) {
                    if (isDefined(t.color)) {
                        var n = c(t.color);
                        var r = s.length;
                        for (var i = 0; i < r; i++) {
                            var o = s.shift();
                            if (o != n) {
                                s.push(o)
                            }
                        }
                        s.push(n);
                        if (s.length > 5) {
                            s.shift()
                        }
                        Cache.save("chathistory", s);
                        e._color = n
                    }
                    if (t.color === null) {
                        e._color = null
                    }
                    if (isDefined(t.bold)) {
                        e._bold = t.bold
                    }
                    if (isDefined(t.caps)) {
                        e._caps = t.caps
                    }
                    if (e._bold) {
                        e.mainDiv.find(".TWDBtext").css("font-weight",
                            "bold")
                    } else {
                        e.mainDiv.find(".TWDBtext").css("font-weight",
                            "normal")
                    }
                    if (e._caps) {
                        e.mainDiv.find(".TWDBtext").html("A")
                    } else {
                        e.mainDiv.find(".TWDBtext").html("a")
                    }
                    if (e._color) {
                        e.mainDiv.find(".TWDBcolor").children("div")
                            .children("div")
                            .css("background-color", h(e._color));
                        if (e._color[1] >= 4) {
                            e.mainDiv.find(".TWDBtext").css("color",
                                "#000")
                        } else {
                            e.mainDiv.find(".TWDBtext").css("color",
                                "#fff")
                        }
                    } else {
                        e.mainDiv.find(".TWDBcolor").children("div")
                            .children("div").css(
                                "background-color", "#e0e2e0");
                        e.mainDiv.find(".TWDBtext")
                            .css("color", "#000")
                    }
                    e.input.focus()
                };
                var d = function (t) {
                    return e(
                            '<div style="position:absolute;display:block;width:15px;height:15px;"/>')
                        .append(
                            e('<div style="position:absolute;width:15px;height:1px;top:7px;left:0px;background-color:' + t + ';opacity:0.1;" />'))
                        .append(
                            e('<div style="position:absolute;width:1px;height:15px;top:0px;left:7px;background-color:' + t + ';opacity:0.1;" />'))
                        .append(
                            e('<div style="position:absolute;width:15px;height:3px;top:6px;left:0px;background-color:' + t + ';opacity:0.33;" />'))
                        .append(
                            e('<div style="position:absolute;width:3px;height:15px;top:0px;left:6px;background-color:' + t + ';opacity:0.33;" />'))
                        .append(
                            e('<div style="position:absolute;width:15px;height:5px;top:5px;left:0px;background-color:' + t + ';opacity:0.47;" />'))
                        .append(
                            e('<div style="position:absolute;width:5px;height:15px;top:0px;left:5px;background-color:' + t + ';opacity:0.47;" />'))
                        .append(
                            e('<div style="position:absolute;width:13px;height:9px;top:3px;left:1px;background-color:' + t + ';opacity:0.6;" />'))
                        .append(
                            e('<div style="position:absolute;width:9px;height:13px;top:1px;left:3px;background-color:' + t + ';opacity:0.6;" />'))
                        .append(
                            e('<div style="position:absolute;width:11px;height:11px;top:2px;left:2px;background-color:' + t + ';opacity:0.8;" />'))
                        .append(
                            e('<div style="position:absolute;width:13px;height:7px;top:4px;left:1px;background-color:' + t + ';" />'))
                        .append(
                            e('<div style="position:absolute;width:7px;height:13px;top:1px;left:4px;background-color:' + t + ';" />'))
                        .append(
                            e('<div style="position:absolute;width:9px;height:11px;top:2px;left:3px;background-color:' + t + ';" />'))
                        .append(
                            e('<div style="position:absolute;width:11px;height:9px;top:3px;left:2px;background-color:' + t + ';" />'))
                };
                var m = function (t) {
                    try {
                        var n = e('<span style="position:relative;display:none;padding:3px;width:300px;position:absolute;bottom:17px;left:-5px;" />');
                        n
                            .append('<div style="position:absolute;height: 50px; width:25;display:block" />');
                        var r = ["black", "red", "blue", "yellow",
                            "green", "brown", "magenta", "gray"
                        ];
                        n
                            .append(e(
                                    '<div style="display:inline-block;width:15px;height:15px;padding:2px;opacity:0.5;"/>')
                                .append(d("#e0e2e0"))
                                .append(
                                    e('<div style="position:absolute;width:15px;height:15px;" ><table border="0" cellspacing="0" cellpadding="0" style="padding:0px;margin:0px;border:0px;" ><tr><td style="display:block;width:15px;height:15px;vertical-align:top;text-align:center;font-size:11px;color:#000;font-weight:bold;">a</td></tr></table></div>'))
                                .click(
                                    function () {
                                        if (e(this).css(
                                            "opacity") == .5) {
                                            p(t, {
                                                bold: true
                                            });
                                            e(this)
                                                .css(
                                                    "opacity",
                                                    1)
                                        } else {
                                            p(
                                                t, {
                                                    bold: false
                                                });
                                            e(this)
                                                .css(
                                                    "opacity",
                                                    .5)
                                        }
                                        n.hide()
                                    }));
                        n
                            .append(e(
                                    '<div style="display:inline-block;width:15px;height:15px;padding:2px;opacity:0.5;"/>')
                                .append(d("#e0e2e0"))
                                .append(
                                    e('<div style="position:absolute;width:15px;height:15px;" ><table border="0" cellspacing="0" cellpadding="0" style="padding:0px;margin:0px;border:0px;" ><tr><td style="display:block;width:15px;height:15px;vertical-align:top;text-align:center;font-size:11px;color:#000;">A</td></tr></table></div>'))
                                .click(
                                    function () {
                                        if (e(this).css(
                                            "opacity") == .5) {
                                            p(t, {
                                                caps: true
                                            });
                                            e(this)
                                                .css(
                                                    "opacity",
                                                    1)
                                        } else {
                                            p(
                                                t, {
                                                    caps: false
                                                });
                                            e(this)
                                                .css(
                                                    "opacity",
                                                    .5)
                                        }
                                        n.hide()
                                    }));
                        for (var i = 0; i < r.length; i++) {
                            n
                                .append(e(
                                        '<div style="display:inline-block;width:15px;height:15px;padding:2px;"/>')
                                    .append(d(r[i]))
                                    .click(
                                        function () {
                                            p(
                                                t, {
                                                    color: e(
                                                            this)
                                                        .children(
                                                            "div")
                                                        .children(
                                                            "div")
                                                        .css(
                                                            "background-color")
                                                });
                                            n.hide()
                                        }))
                        }
                        n
                            .append(e(
                                    '<div style="margin:2px;display:inline-block;vertical-align:top;width:15px;height:15px;background:url(' + Images.iconChatNoColor + ')no-repeat 0px 0px transparent;"/>')
                                .click(function () {
                                    p(t, {
                                        color: null
                                    });
                                    n.hide()
                                }));
                        n
                            .append(e(
                                    '<div style="margin:3px;display:inline-block;vertical-align:top;width:13px;height:13px;background:url(' + Images.iconChat + ')no-repeat 0px 0px transparent;"/>')
                                .click(function () {
                                    g(t);
                                    n.hide()
                                }));
                        var s = false;
                        t.mainDiv
                            .find(".chat_input")
                            .append(
                                e(
                                    '<div class="TWDBcolor" style="position:absolute;width:15px;height:15px;bottom:7px;vertical-align:top;left:5px;cursor:pointer;" />')
                                .append(d("#e0e2e0"))
                                .append(
                                    e('<div style="position:absolute;width:15px;height:15px;" ><table border="0" cellspacing="0" cellpadding="0" style="padding:0px;margin:0px;border:0px;" ><tr><td class="TWDBtext" style="display:block;width:15px;height:15px;vertical-align:top;text-align:center;font-size:11px;color:#000;">a</td></tr></table></div>'))
                                .append(n)
                                .hover(
                                    function () {
                                        s = true;
                                        n.show()
                                    },
                                    function () {
                                        s = false;
                                        setTimeout(
                                            function () {
                                                if (!s) {
                                                    n
                                                        .hide()
                                                }
                                            },
                                            200)
                                    }))
                    } catch (o) {
                        Error.report(o, "injectColor")
                    }
                };
                var g = function (t) {
                    var n = t.mainDiv.find(".TWDBcolor")
                        .children("div").children("div");
                    var r = c(n.css("background-color"));
                    var i = {};
                    i.customColor = e('<div style="width:50px;height:50px;display:inline-block;vertical-align:top;margin: 5px;" />');
                    i.customColor.css("background-color", h(c(n
                        .css("background-color"))));
                    var o = function (e, t) {
                        if (t && r[e] == 9 || !t && r[e] == 0) {
                            return

                        }
                        var n = [Number(r[0]), Number(r[1]),
                            Number(r[2])
                        ];
                        n[e] += t ? 1 : -1;
                        r = String(n[0]) + String(n[1]) + String(n[2]);
                        i.input.val(r);
                        if (r[e] == 0) {
                            i.plusminus[e].children(".butMinus").css(
                                "opacity", .3)
                        } else {
                            i.plusminus[e].children(".butMinus").css(
                                "opacity", 1)
                        }
                        if (r[e] == 9) {
                            i.plusminus[e].children(".butPlus").css(
                                "opacity", .3)
                        } else {
                            i.plusminus[e].children(".butPlus").css(
                                "opacity", 1)
                        }
                        i.customColor.css("background-color", h(r))
                    };
                    var u = e('<div style="width:42px;height:48px;display:inline-block;vertical-align:top;margin: 6px 5px 6px 5px;" />');
                    i.plusminus = [];
                    for (var a = 0; a < 3; a++) {
                        switch (a) {
                        case 0:
                            var f = "#f00";
                            break;
                        case 1:
                            var f = "#0f0";
                            break;
                        case 2:
                            var f = "#00f";
                            break
                        }
                        i.plusminus[a] = e('<div class="tw2gui_plusminus" style="display:inline-block;background-color:' + f + ';width:12px;height:46px;padding:1px;"><span class="butPlus" style="cursor:pointer;"></span><span style="width:12px;height:10px;display:inline-block;"></span><span class="butMinus" style="cursor:pointer;"></span></div>');
                        i.plusminus[a].children(".butMinus").click(
                            function (e) {
                                return function () {
                                    o(e, false)
                                }
                            }(a));
                        i.plusminus[a].children(".butPlus").click(
                            function (e) {
                                return function () {
                                    o(e, true)
                                }
                            }(a));
                        if (r[a] == 0) {
                            i.plusminus[a].children(".butMinus").css(
                                "opacity", .3)
                        }
                        if (r[a] == 9) {
                            i.plusminus[a].children(".butPlus").css(
                                "opacity", .3)
                        }
                        u.append(i.plusminus[a])
                    }
                    u.append(i.plusminus[0]).append(i.plusminus[1])
                        .append(i.plusminus[2]);
                    i.input = e('<input maxLength="3" type="text" value="' + r + '" style="position: relative; top: -35px; left: 2px;color: rgb(255, 255, 255); font-weight: bold; letter-spacing: 6px; text-shadow: 1px 1px 1px rgb(0, 0, 0); width: 43px; background: none repeat scroll 0pt 0pt transparent; border: medium none; height: 18px; line-height: 18px; margin: 0pt; outline: medium none;" />');
                    i.input.keyup(function () {
                        var e = i.input.val();
                        if (e.length < 3) {
                            return

                        }
                        if (!e.match(/(\d){3}/)) {
                            i.input.val(r);
                            return

                        }
                        r = e;
                        for (var t = 0; t < 3; t++) {
                            if (r[t] == 0) {
                                i.plusminus[t].children(".butMinus")
                                    .css("opacity", .3)
                            } else {
                                i.plusminus[t].children(".butMinus")
                                    .css("opacity", 1)
                            }
                            if (r[t] == 9) {
                                i.plusminus[t].children(".butPlus")
                                    .css("opacity", .3)
                            } else {
                                i.plusminus[t].children(".butPlus")
                                    .css("opacity", 1)
                            }
                        }
                        i.customColor.css("background-color", h(r));
                        i.input.attr("value", r)
                    });
                    u.append(i.input);
                    var l = {
                        bold: t._bold,
                        caps: t._caps
                    };
                    var d = e('<div style="height:50px;display:inline-block;vertical-align:top;margin: 5px;" />');
                    var v = new GameAPI.gui.checkbox("*#BOLD#*",
                        l.bold ? "tw2gui_checkbox_checked" : "",
                        function () {
                            l.bold = l.bold ? false : true
                        });
                    e(v.getMainDiv()).css("display", "block").css(
                        "margin-bottom", "5px");
                    d.append(v.getMainDiv());
                    var v = new GameAPI.gui.checkbox("#CAPITALIZE#",
                        l.caps ? "tw2gui_checkbox_checked" : "",
                        function () {
                            l.caps = l.caps ? false : true
                        });
                    d.append(v.getMainDiv());
                    var m = e('<div style="width:160px;height:50px;display:inline-block;vertical-align:top;border: 1px solid #000;padding: 0px;margin: 5px;" />');
                    m
                        .append('<span style="width:140px;height:15px;display:inline-block;text-align:center;padding: 4px 0px 2px 0px;font-size:11px;">#HISTORY#</span>');
                    for (var a = 0; a < s.length; a++) {
                        var g = e('<div style="width:20px;height:20px;display:inline-block;vertical-align:top;margin: 0px 0px 0px 10px;cursor:pointer;background-color:' + h(s[a]) + ';" />');
                        g.click(function () {
                            p(t, {
                                color: e(this).css(
                                    "background-color"),
                                bold: l.bold,
                                caps: l.caps
                            });
                            i.colorBox.hide()
                        });
                        m.append(g)
                    }
                    var y = e("<div />").append(i.customColor)
                        .append(u).append(d).append(m);
                    i.colorBox = new GameAPI.gui.dialog("#COLOR#", y);
                    i.colorBox.addButton("ok", function () {
                        p(t, {
                            color: e(i.customColor).css(
                                "background-color"),
                            bold: l.bold,
                            caps: l.caps
                        })
                    });
                    i.colorBox.addButton("cancel");
                    i.colorBox.show()
                };
                return t
            }(jQuery);
            Debugger.Chat = Chat;
            var SellTip = function (e) {
                var t = {};
                var n = false;
                var r = {};
                var i = function () {
                    if (r.ready) {
                        return

                    }
                    if (Settings.get("sellTip", true)) {
                        GameInject.injectItem("Inventory", "sellTip",
                            function (e) {
                                return s(e)
                            })
                    }
                    r.ready = true
                };
                r = Loader.add("sellTip", "tw-db sellTip", i, {
                    Settings: true,
                    ClothCalc: true
                });
                var s = function (e) {
                    var t = e.obj.item_id;
                    var n = w.ItemManager.get(t);
                    var r = false;
                    var i = "";
                    if (!n.sellable && !n.auctionable) {
                        return

                    }
                    if (Settings.get("sellTip1", true)) {
                        var s = w.Bag.getItemByItemId(n.item_id);
                        var o = w.Wear.wear[n.type];
                        if (s || o && o.obj.item_id == n.item_id) {
                            var u = (s != undefined ? s.count : 0) + (o != undefined && o.obj.item_id == n.item_id ? 1 : 0);
                            if (u > 1) {
                                r = true;
                                i = "#DOUBLEITEM#".escapeHTML()
                            }
                        }
                    }
                    if (Settings.get("sellTip2", true) && ClothCalc.isLoaded()) {
                        if (!ClothCalc.isUsedItem(n.item_id)) {
                            r = true;
                            i = "#NOTUSED#".escapeHTML()
                        }
                    }
                    if (Settings.get("sellTip3", true)) {
                        if (n.named) {
                            r = false
                        }
                    }
                    if (Settings.get("sellTip4", true)) {
                        if (n.traderlevel === null || n.traderlevel > 15) {
                            r = false
                        }
                    }
                    if (Settings.get("sellTip5", true)) {
                        if (n.set) {
                            r = false
                        }
                    }
                    e.divMain.find(".TWDBsellTip").remove();
                    if (r) {
                        e.divMain
                            .append('<img src="' + Images.iconSell + '" class="TWDBsellTip" title="' + i + '" title=" #NOTATINV# " style="position:absolute;bottom:4px;right:0px;width:19px;height:19px;padding:0px;border:0px;margin:0px;" />')
                    }
                };
                return t
            }($);
            Debugger.SellTip = SellTip;
            var Collector = function (e) {
                var t = {};
                var n = false;
                var r = {};
                var i = function () {
                    if (r.ready) {
                        return

                    }
                    if (Settings.get("collector", true)) {
                        GameInject.injectItem("Trader", "collector",
                            function (e) {
                                return s(e)
                            });
                        GameInject
                            .injectTrader(
                                "collector",
                                function (e) {

                                    if (t.isNewItem(e.item_id)) {

                                        var imgInject = '<img src="' + Images.iconNew + '" class="TWDBcollector" title=" #NOTATINV# " ' + ' style="position:absolute;top:0px;left:0px;padding:0px;border:0px;margin:0px;" />'

                                        return imgInject;
                                    }
                                    return ""
                                });

                        GameInject.injectMarket("collector",
                            function (e) {
                                return o(e)
                            })
                    }
                    r.ready = true
                };
                r = Loader.add("Collector", "tw-db Collector", i, {
                    Settings: true
                });
                t.isNewItem = function (e) {
                    var t = 0;
                    var n = w.ItemManager.get(e);
                    var r = w.Bag.getItemByItemId(n.item_id);
                    var i = w.Wear.wear[n.type];
                    if (r || i && i.obj.item_id == n.item_id) {
                        t = (r != undefined ? r.count : 0) + (i != undefined && i.obj.item_id == n.item_id ? 1 : 0)
                    }
                    if (t == 0) {
                        return true
                    } else {
                        return false
                    }
                };
                var s = function (e) {

                    e.divMain.find(".TWDBcollector").remove();
                    if (t.isNewItem(e.obj.item_id)) {
                        e.divMain
                            .append('<img src="' + Images.iconNew + '" class="TWDBcollector" title=" #NOTATINV# " style="position:absolute;top:-8px;left:-15px;padding:0px;border:0px;margin:0px;" />')
                    }
                };
                var o = function (e) {
                    if (t.isNewItem(e)) {
                        return '<img src="' + Images.iconNew + '" class="TWDBcollector" title=" #NOTATINV# " style="width:18px;height:18px;position:relative;top:0px;left:0px;padding:0px;border:0px;margin:0px;" />'
                    } else {
                        return ""
                    }
                };
                return t
            }($);
            Debugger.Collector = Collector;
            var BuyTip = function (e) {
                var t = {};
                var n = false;
                var r = {};
                var i = 0;
                var s = {};
                var o = {};
                var u = function () {
                    if (o.ready) {
                        return

                    }
                    if (Settings.get("buyTip", true)) {
                        GameInject.injectItem("Trader", "buytip",
                            function (e) {
                                return a(e, "trader")
                            });
                        GameInject.injectTrader("buytip", function (e) {
                            return appendInShop(e)
                        });
                        GameInject.injectMarket("buytip", function (e) {
                            return a(e, "market")
                        })
                    }
                    Eventer.set("TWDBdataLoaded", function () {
                        t.reset()
                    });
                    if (!Updater.wasUpdated()) {
                        r = Cache.load("betteritems");
                        if (r == null || typeof r != "object") {
                            r = {}
                        }
                    }
                    o.ready = true
                };
                o = Loader.add("BuyTip", "tw-db BuyTip", u, {
                    Settings: true,
                    Cache: true,
                    Collector: true,
                    ClothCalc: true,
                    Calc: true
                });
                t.reset = function () {
                    r = {};
                    Cache.save("betteritems", r)
                };
                var appendInShop = function (e) {

                    n = e.item_id;
                    if (!Collector.isNewItem(n) || isDefined(r[n]) && r[n].length == 0) {
                        return ""
                    }

                    if (isDefined(r[n])) {

                        var s = c(n);
                        if (isDefined(s)) {
                            s.css({
                                bottom: "45px",
                                right: "11px"
                            });
                        }
                        return s

                    }
                    // Worker.add(function(e, t) { // Dun deactivate
                    // unecessary worker
                    // return function() {
                    f(n);

                    var s = c(n);
                    if (isDefined(s)) {
                        s.css({
                            bottom: "45px",
                            right: "11px"
                        });
                    }
                    return s

                    // }
                    // }(e, n))

                };
                var a = function (e, t) {

                    if (t == 'shop') {
                        n = e.item_id;
                    } else {
                        n = t == ("market") ? e : e.obj.item_id;
                    }

                    if (!Collector.isNewItem(n) || isDefined(r[n]) && r[n].length == 0) {
                        return ""
                    }
                    if (t == "market") {
                        if (isDefined(r[n])) {
                            return l(n)
                        }

                        i++;

                        Worker.add(function (e, t) {
                            return function () {
                                f(t);
                                var n = w.MarketWindow.DOM
                                    .find("#TWDBbuyTip" + e);
                                n.after(l(t));
                                n.remove()
                            }
                        }(i, n));

                        return '<img id="TWDBbuyTip' + i + '" src="' + Images["iconStar3"] + '" class="TWDBbuyTip" width="18px" height="18px" title="#CALCULATING_WAIT#" style="padding:0px;border:0px;margin:0px;" />'

                    }
                    if (isDefined(r[n])) {
                        if (t == "shop") {
                            var s = c(n);
                            s.css({
                                bottom: "45px",
                                right: "11px"
                            });
                            return s
                        } else {
                            e.divMain.find(".TWDBbuyTip").remove();
                            e.divMain.append(c(n))
                        }
                        return

                    }

                    if (isDefined(e.divMain)) {
                        e.divMain.find(".TWDBbuyTip").remove();
                    }
                    e.divMain
                        .append('<img src="' + Images["iconStar3"] + '" class="TWDBbuyTip" width="25px" height="25px"     title="#CALCULATING_WAIT#"  style="position:absolute;bottom:-8px;right:-5px;padding:0px;border:0px;margin:0px;" />');

                    Worker.add(function (e, t) {
                        return function () {
                            f(t);
                            if (t == "shop") {
                                var s = c(t);
                                s.css({
                                    bottom: "45px",
                                    right: "11px"
                                });
                                return s
                            } else {
                                e.divMain.find(".TWDBbuyTip").remove();
                                e.divMain.append(c(t))
                            }
                        }
                    }(e, n))
                };
                var f = function (e) {

                    if (!ClothCalc.isLoaded()) {
                        return

                    }
                    if (!ClothCalc.isItemUsable(e, true)) {
                        return

                    }

                    if (isDefined(r[e])) {

                        return

                    }
                    r[e] = [];
                    var t = ItemManager.get(e);
                    var n = Jobs.getAllJobs();
                    for (var iU = 0; iU < n.length; iU++) {
                        var jobid = n[iU];

                        var o = ClothCalc.getClothForJob(jobid);

                        if (!isDefined(o)) {
                            continue
                        }

                        var total = 0;

                        var bonusItem = Calc.getItemBonusForJob(e,
                            jobid);

                        if (isDefined(o[ClothCalc._type2id[t.type]])) {

                            var f = ItemManager
                                .get(o[ClothCalc._type2id[t.type]].id);
                            total += Calc.getItemBonusForJob(f.item_id,
                                jobid)

                        }

                        if (isDefined(f) && isDefined(f.set) || isDefined(t.set)) {
                            var l = isDefined(f) && isDefined(f.set) ? f.set : null;
                            var c = isDefined(t.set) ? t.set : null;

                            var h = {};
                            h[l] = 0;
                            h[c] = 0;
                            for (var p in o) {
                                var d = ItemManager.get(o[p].id);
                                if (!isDefined(d)) {
                                    continue
                                }
                                if (d.set) {
                                    if (d.set == l) {
                                        h[l]++
                                    }
                                    if (d.set == c && l != c) {
                                        h[c]++
                                    }
                                }
                            }
                            if (l) {

                                total += Calc.getSetBonusForJob(l,
                                    h[l], jobid);

                                total -= Calc.getSetBonusForJob(l,
                                    h[l] - 1, jobid)

                            }
                            if (c) {
                                bonusItem += Calc.getSetBonusForJob(c,
                                    h[c] + 1, jobid);

                                bonusItem -= Calc.getSetBonusForJob(c,
                                    h[c], jobid)

                            }
                        }

                        if (bonusItem > total) {

                            var v = ClothCalc.getLPForJob(jobid);

                            if (isDefined(v)) {
                                var m = v.sum - total + bonusItem;
                                r[e].push({
                                    job: jobid,
                                    newlp: m,
                                    more: m - v.sum
                                })
                            } else {
                                r[e].push({
                                    job: jobid,
                                    newlp: bonusItem,
                                    more: bonusItem
                                })
                            }

                        }
                    }
                    Cache.save("betteritems", r)

                };

                var l = function (e) {
                    if (!isDefined(r[e])) {
                        return ""
                    }
                    if (r[e].length == 0) {
                        return ""
                    }

                    s[e] = false;
                    var t = h(e).escapeHTML();
                    return "<img onload=\"$(this).next('.TWDBcollector').remove();$(this).addMousePopup('" + t + '\');" src="' + Images["iconStar" + (s[e] ? "2" : "")] + '" class="TWDBbuyTip" width="18px" height="18px" style="padding:0px;border:0px;margin:0px;" />'
                };
                var c = function (t) {
                    if (!isDefined(r[t])) {
                        return

                    }
                    if (r[t].length == 0) {
                        return

                    }
                    s[t] = false;
                    var n = h(t);
                    return e('<img src="' + Images["iconStar" + (s[t] ? "2" : "")] + '" class="TWDBbuyTip" width="25px" height="25px" title=\'' + n + '\' style="position:absolute;bottom:-8px;right:-5px;padding:0px;border:0px;margin:0px;" />')
                };
                var h = function (e) {
                    if (!isDefined(r[e])) {
                        return ""
                    }
                    var t = '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                    if (!ClothCalc.isItemUsable(e)) {
                        var n = ItemManager.get(e);
                        t += '<td colspan="2" style="text-align:center; font-weight:bold;">' + n.level + " #LEVEL#</td></tr><tr>"
                    }
                    for (var i = 0; i < r[e].length; i++) {
                        var o = r[e][i];
                        var u = Jobs.getJobById(o.job);
                        var a = " +" + o.more + " " + u.name.escapeHTML() + " [" + o.newlp + "]";
                        if (o.job == ClothCalc.getSelectedJob()) {
                            a = "<b>" + a + "</b>";
                            s[e] = true
                        }
                        if (o.newlp < 0) {
                            var f = "#FF0000"
                        } else {
                            if (o.newlp - o.more < 0) {
                                var f = "#0000FF"
                            } else {
                                var f = "#008000"
                            }
                        }
                        t += '<td style="color:' + f + ';">' + a + "</td>";
                        if (i % 2) {
                            t += "</tr><tr>"
                        }
                    }
                    if (i % 2) {
                        t += "<td></td></tr>"
                    } else {
                        t = t.substring(0, t.length - 4)
                    }
                    t += "</table>";
                    return t
                };
                return t
            }($);
            Debugger.BuyTip = BuyTip;
            var LpInfo = function (e) {
                var t = {};
                var n = false;
                var r = {};
                var i = function () {
                    if (r.ready) {
                        return

                    }
                    if (Settings.get("jobBoniTooltip", true)) {
                        GameInject.injectItem("Inventory", "lpInfo",
                            function (e) {
                                return s(e)
                            })
                    }
                    r.ready = true
                };
                r = Loader.add("LpInfo", "tw-db LpInfo", i, {
                    Settings: true,
                    Jobs: true,
                    Calc: true
                });
                var s = function (e) {
                    e.divMain.find(".TWDBlpInfo").remove();
                    var t = ClothCalc.getSelectedJob();
                    if (!isDefined(t)) {
                        return

                    }
                    var n = e.obj.item_id;
                    e.divMain.find(".TWDBlpInfo").remove();
                    if (Calc.isCached(n, t)) {
                        e.divMain.append(o(n, t))
                    } else {
                        Worker.add(function (e, t, n) {
                            return function () {
                                e.divMain.find(".TWDBlpInfo").remove();
                                e.divMain.append(o(t, n))
                            }
                        }(e, n, t))
                    }
                };
                var o = function (e, t) {
                    var n = Calc.getItemBonusForJob(e, t);
                    if (isNaN(n) || n <= 0) {
                        return
                    }
                    var t = Jobs.getJobById(t);
                    return '<img src="' + Images.iconLaborpoints + '" title="+' + n + " " + t.name.escapeHTML() + '" class="TWDBlpInfo" style="position: absolute; top: 2px; right: 2px; width: 15px; height: 15px; border: 0px none; margin: 0px;"/>'
                };
                return t
            }($);
            Debugger.LpInfo = LpInfo;

            var Snippets = function ($) {
                var _self = {};
                var timeout = null;
                var interval = null;
                var loader = {};
                var init = function () {
                    if (loader.ready) {
                        return
                    }
                    trustTWDB();
                    if (Settings.get("qbswitch", true)) {
                        QuestbookSwitch()
                    }
                    if (Settings.get("qfulltext", false)) {
                        QuestFullText()
                    }
                    if (Settings.get("fastskillchange", true)) {
                        fastSkillChange()
                    }
                    if (Settings.get("fortrecruitment", true)) {
                        activateFortRecruitment()
                    }
                    if (Settings.get("noworkqueuepa", true)) {
                        removeWorkQueuePA()
                    }
                    if (Settings.get("nofetchallpa", false)) {	// add additional PAs by ... || Settings.get(..)
                        removeVariousPA()
                    }
                    if (Settings.get("nowofnuggets", false)) {
                        changeWofNuggets()
                    }
                    if (Settings.get("marketselldialog", true)) {
                        enhanceMarketSellDialog()
                    }
                    if (Settings.get("weeklycrafting", false)) {
                        weeklyCrafting()
                    }
                    loader.ready = true
                };
                loader = Loader.add("LpInfo", "tw-db LpInfo", init, {
                    Settings: true
                });
                var trustTWDB = function () {
                    try {
                        var str = showlink.toString();
                        str = str.replace("the-west", "tw-db|the-west");
                        str = str.replace("|com|", "|com|info|");
                        eval("showlink = " + str)
                    } catch (e) {}
                };
                
                var fastSkillChange = function () {
                    $("div.char_links.skills").click(function() {
			var e = 80,
			    t = function () {
				if ($(".skills_content,.skills_content4Shaman").length != 2) {
				    if (e-- <= 0 && n != -1) {
					clearInterval(n);
					n = -1;
				    }
				} else {
				    $(".skills_content,.skills_content4Shaman").find(".butMinus,.butPlus").each(function() {
					function r() {
					    e = Math.max(Math.round(e * (e / 200 + 1) / (e / 133 + 1)), 15);
					    n.click();
					    t = setTimeout(r, e)
					}
    
					function i() {
					    t = setTimeout(r,e)
					}
    
					function s() {
					    if (t != -1) {
						clearTimeout(t);
						t = -1
					    }
					    e = 400
					}
					if ($(this).get(0).twdb_skills)
					    return;
					$(this).get(0).twdb_skills = true;
					var e = 400,
					    t = -1,
					    n = $(this).css("cursor","pointer");
					n.mousedown(i).mouseup(s).mouseout(s)
				    })
				}
			    },
			    n = setInterval(t, 50)
		    })
                };
                
                var QuestbookSwitch = function () {
                    try {
                        QuestWindowView.cc_showSolvedQuest = QuestWindowView.showSolvedQuest; // backup original
                        QuestWindowView.showSolvedQuest = function (quest) {
                            QuestWindowView.cc_showSolvedQuest(quest); // call original
                            // identify completion text & hide it
                            var $endtext = $("div.window-quest_solved div.quest_description_container span").slice(1).hide();
                            // create intro text & add it
                            var $introtext = $("<span><br>" + quest.description + "</span>");
                            $("div.window-quest_solved div.quest_description_container").append($introtext);
			    // create switch link & add it
                            var $swbutton = $('<a href="#"> #QB_SHOWCOMP# </a>').addClass("introshown").click(function () {
				var $t = $(this),
				    is = $t.hasClass("introshown");
				$endtext.toggle(is);
				$introtext.toggle(!is);
				$t.text(is ? ' #QB_SHOWINTRO# ' : ' #QB_SHOWCOMP# ');
				$t.toggleClass("introshown");
			    });
                            $("div.window-quest_solved div.solved_text_container").append($("<div style='text-align:center;'>").append($swbutton));
                        }
                    } catch (e) {
                        Error.report(e, "manipulate showSolvedQuest")
                    }
                };
                var QuestFullText = function () {
                    try {
                        QuestWindowView.cc_showQuest = QuestWindowView.showQuest;
                        QuestWindowView.showQuest = function (quest) {
                            QuestWindowView.cc_showQuest(quest);
                            $("div.quest_description_container div#quest_shortd").hide();
                            $("div.quest_description_container div#quest_fulld").show();
                        };
                        
                        QuestEmployerView.cc_showQuest = QuestEmployerView.showQuest;
                        QuestEmployerView.showQuest = function (quest) {
                            QuestEmployerView.cc_showQuest(quest);
                            $("div.quest_description_container div#quest_shortd").hide();
                            $("div.quest_description_container div#quest_fulld").show();
                        }
                    } catch (e) {
                        Error.report(e, "manipulate showQuest")
                    }
                };
                
                var removeWorkQueuePA = function () {
                    try {
                        $("body").append('<style>#queuedTasks .buyPremiumTask {background: url("http://public.beta.the-west.net/images/transparent.png");}</style>');
                        Premium.checkForAutomationPremium = function (callback, failCallback) {
                            if (typeof failCallback !== 'undefined') return failCallback();
                        }
                    } catch (e) {
                        Error.report(e, "manipulate removeWorkQueuePA")
                    }
                };
                
                var changeWofNuggets = function () {
                    try {
                        var str = west.wof.WofPayHandler.prototype.toCheckbox.toString();
                        str = str.replace(/\b0\s?==\s?i\b/, "payOption['iconName'] != 'nugget'");
                        eval("west.wof.WofPayHandler.prototype.toCheckbox = " + str)
                    } catch (e) {
                        Error.report(e, "manipulate changeWofNuggets");
                    }
                };
                
                var removeVariousPA = function () {
                    var excludes = [], reg;
                    if (Settings.get("nofetchallpa", false)) excludes.push("marketdelivery all");
                    // if (Settings.get(" <another PA> ", false)) excludes.push(" <another string> "); --for addit. tests
                    
                    if (!excludes.length) return;	// nothing to filter!
                    reg = new RegExp(excludes.join("|"));
                    
                    try {
                        Premium.twdb_confirmUse = Premium.confirmUse;
                        Premium.confirmUse = function(bonus, title, description, price, payload, callback, cancelCallback, buttons) {
                            if (reg.test(bonus)) {
				if (typeof cancelCallback !== 'undefined') return cancelCallback();
			    } else {
			    	return Premium.twdb_confirmUse(bonus, title, description, price, payload, callback, cancelCallback, buttons);
			    }
                        }                            
                    } catch (e) {
                        Error.report(e, "manipulate removeVariousPA");
                    }
                };
                
                var activateFortRecruitment = function () {
                    try {
												FortBattleWindow.twdb_getInfoArea = FortBattleWindow.getInfoArea;
                        FortBattleWindow.getInfoArea = function () {
														this.preBattle.battleData.canSetPrivilege = true;
														return FortBattleWindow.twdb_getInfoArea.apply(this, arguments);
                        }
                    } catch (e) {
                        Error.report(e, "manipulate FortBattleWindow.getInfoArea")
                    }
                };

                var enhanceMarketSellDialog = function() {
		    if (!w.ItemManager.isLoaded()) {
			ItemManager.init();	// load as soon as possible, otherwise it will fail the first time...
		    }
		    // private variables
		    var item4sale;
		    var settings = TWDB.Cache.load("msdsettings");
		    if (typeof settings != "object" || settings == null) {
			settings = { cb: {} };
		    } else if (typeof settings.cb != "object" || settings.cb == null) {
			settings.cb = {};
		    }
		    
                    try {
			// ========================== backup & wrap Dialog.show function
			if (!isDefined(west.gui.Dialog.prototype.TWDB_show)) {
			    west.gui.Dialog.prototype.TWDB_show = west.gui.Dialog.prototype.show;
			}
			west.gui.Dialog.prototype.show = function() {
			    if (this.divMain.attr('id') === 'market_createoffer_window')  {
				var dlg = this.TWDB_show();
				w.setTimeout(function(){MarketWindow.TWDB_touchUpSellDialog(dlg)},25);
				return dlg;
			    };
			    return this.TWDB_show();
			}
			// ========================== backup & wrap MarketWindow.createMarketOffer function
			if (!isDefined(MarketWindow.TWDB_createMarketOffer)) {
			    MarketWindow.TWDB_createMarketOffer = MarketWindow.createMarketOffer;
			}
			MarketWindow.createMarketOffer = function(source) {
			    var item_id = (typeof source == 'number' ? source : $(source).data('itemId'));
			    if (item_id === undefined) {
				var itemObj = $(this).data('dnd_droppedObj');
				item_id = itemObj.data('itemId');
			    }
			    item4sale = w.ItemManager.get(item_id);
			    return MarketWindow.TWDB_createMarketOffer(item_id);
			}
                    } catch (e) {
                        Error.report(e, "manipulate market sell dialog")
                    }
			
		    // ========================== add enhancements
		    MarketWindow.TWDB_touchUpSellDialog = function(dialog) {
			if (dialog.divMain.attr('id') !== 'market_createoffer_window')  {
			    return;
			};
			var $dc = $("div.tw2gui_dialog_content", dialog.divMain);
			// check if Inno's function has added all controls, otherwise retry with a tiny delay
			if ($dc.find('#auction_item_slot', $dc).html() == "") return w.setTimeout(function(){MarketWindow.TWDB_touchUpSellDialog(dialog)},25);
			
			// allows access to windows, eg chat, by making the framefix very tiny
			$('div.tw2gui_dialog_framefix').css({left:"50%",top:"50%",width:"1px",height:"1px"});
			
			// only basic modifications, controls added later
			$("textarea#auction_description", $dc).css("width","270px").closest("tr").append("<td id='twdb_msd_desc_cc'>");
			var $t2 = $("table:nth-child(2)", $dc);
			$("tr:first-child", $t2).after($("<tr>").append('<td>','<td id="twdb_msd_bid_cc" style="min-width: 90px;">','<td>','<td id="twdb_msd_buy_cc" style="min-width: 90px;">'));
			$("tr:nth-last-child(5) td:nth-child(2) span.tw2gui_textfield", $t2).after('<span id="twdb_msd_mult_cc" title="#MSD_MULTIPLYPRICES#" style="background-image: url(&quot;/images/ranking/town_ranking_icons.png&quot;); display:inline-block; height:16px; width:16px; background-position:0px -80px; cursor:pointer;">&nbsp;</span>');
			$("tr:last-child td:first-child", $t2).attr("colspan",3).before('<td id="twdb_msd_opt_cc">');
			
			var dlgCenter = function() {
			    dialog.divMain.css({"margin-top": "-" + (dialog.divMain.height() / 2) + "px",
			    			"margin-left": "-" + (dialog.divMain.width() / 2) + "px"});
			};
			
			var togglePresets = function() {
			    var val, group = this.groupClass;
			    $('div.tw2gui_checkbox.'+group).not(this.divMain).removeClass('tw2gui_checkbox_checked');
			    if (this.isSelected()) {
				val = this.getValue();
				this.divMain.next().click();
			    } else {
				val = 0;
			    }
			    // saving the pair group:val in settings
			    settings.cb[group] = val;
			    TWDB.Cache.save("msdsettings", settings);
			    new UserMessage("#SAVE_SUCCESSFUL#",UserMessage.TYPE_SUCCESS).show();
			    return this;
			}
			
			var savePresets = function(key, val) {
			    settings[key] = val;
			    TWDB.Cache.save("msdsettings", settings);
			    new UserMessage("#SAVE_SUCCESSFUL#",UserMessage.TYPE_SUCCESS).show();
			}
		    
			var loadPresets = function() {
			    var group, obj;
			    for (group in settings.cb) {
				if (!settings.cb.hasOwnProperty(group)) continue; 
				$('div.tw2gui_checkbox.'+group).each(function(){
					obj = $(this).guiElement();
					if (obj.getValue() === settings.cb[group]) {
					    obj.setSelected(true, true);
					    $(this).next().click();
					}
				});
			    }
			    $("textarea#auction_description", $dc).val(settings.description || "");		  // description
			    $('span#market_days.tw2gui_combobox', $dc).guiElement().select(settings.duration || 1); // auction length 1-7 days
			    $('span#market_rights.tw2gui_combobox', $dc).guiElement().select(isDefined(settings.rights) ? settings.rights : 2); // 2: all, 1: alliance, 0:town
			}
			
		    
			// building controls...
			$("#twdb_msd_desc_cc", $dc)
			    .append($('<div class="tw2gui-iconset tw2gui-icon-save" title="#MSD_SAVEDESCRIPT#">')
					.click(function(){savePresets("description",$("textarea#auction_description", $dc).val());}),          
				    $('<div class="tw2gui-iconset tw2gui-icon-abort" title="#MSD_DELETEDESCRIPT#">')
					.click(function(){savePresets("description","");$("textarea#auction_description", $dc).val("")}));
			    
			$("#twdb_msd_buy_cc", $dc)
			    .append(new west.gui.Checkbox("", "twdb_msd_buy_fix", togglePresets).setTitle("#MSD_USEDEFAULT#").setValue(2).divMain)	// (label, groupClass, callback)
			    .append($('<div class="tw2gui_checkbox" title="#MSD_SETBUYPRICE#">')
				    .append('<span class="invPopup_buyicon" style="height:20px;">')
				    .click(function(){
					$('#market_max_price', $dc).val(item4sale.price || 1).keyup();}))
			    .append('&nbsp;&nbsp;')
			    .append(new west.gui.Checkbox("", "twdb_msd_buy_fix", togglePresets).setTitle("#MSD_USEDEFAULT#").setValue(1).divMain)	// (label, groupClass, callback)
			    .append($('<div class="tw2gui_checkbox" title="#MSD_SETSELLPRICE#">')
				    .append('<span class="invPopup_sellicon" style="height:20px;">')
				    .click(function(){
					$('#market_max_price', $dc).val(item4sale.sell_price || 1).keyup();}));
			    
			$("#twdb_msd_bid_cc", $dc)
			    .append(new west.gui.Checkbox("", "twdb_msd_bid_fix", togglePresets).setTitle("#MSD_USEDEFAULT#").setValue(2).divMain)	// (label, groupClass, callback)
			    .append($('<div class="tw2gui_checkbox" title="#MSD_SETBUYPRICE#">')
				    .append('<span class="invPopup_buyicon" style="height:20px;">')
				    .click(function(){
					$('#market_min_bid', $dc).val(item4sale.price || 1).keyup();}))
			    .append('&nbsp;&nbsp;')
			    .append(new west.gui.Checkbox("", "twdb_msd_bid_fix", togglePresets).setTitle("#MSD_USEDEFAULT#").setValue(1).divMain)	// (label, groupClass, callback)
			    .append($('<div class="tw2gui_checkbox" title="#MSD_SETSELLPRICE#">')
				    .append('<span class="invPopup_sellicon" style="height:20px;">')
				    .click(function(){
					$('#market_min_bid', $dc).val(item4sale.sell_price || 1).keyup();}));
			    
			$("#twdb_msd_mult_cc", $dc).click(function(){
					var p, n = parseInt($('#market_sell_itemStack', $dc).val(), 10);
					if (n>0) {
					    p = parseInt($('#market_min_bid', $dc).val(), 10);
					    if (p>0) { $('#market_min_bid', $dc).val(n*p).keyup(); }
					    p = parseInt($('#market_max_price', $dc).val(), 10);
					    if (p>0) { $('#market_max_price', $dc).val(n*p).keyup(); }
					};
			});
			    
			$("#twdb_msd_opt_cc", $dc)
			    .append($('<span class="tw2gui-iconset tw2gui-icon-save" title="#MSD_SAVEOPT#" style="display: inline-block;">')
					.click(function(){savePresets("duration", parseInt($('#market_days', $dc).data('value'), 10));
							  savePresets("rights", parseInt($('#market_rights', $dc).data('value'), 10));}),          
				    $('<span class="tw2gui-iconset tw2gui-icon-abort" title="#MSD_DELETEOPT#" style="display: inline-block;">')
					.click(function(){savePresets("duration", 1); $('span#market_days.tw2gui_combobox', $dc).guiElement().select(1);
							  savePresets("rights", 2); $('span#market_rights.tw2gui_combobox', $dc).guiElement().select(2);}));
			
			// add icons to sell rights selectbox
			var rights = $('span#market_rights.tw2gui_combobox', $dc).guiElement().items;
			if (rights.length === 3) {	// just in case they change anything there..
			    var ico = ["home","flag","world"];
			    for (var i=0; i<rights.length; i++) {
			    	rights[i].node[0].innerHTML = '<span class="tw2gui-iconset tw2gui-icon-' + ico[rights[i].value] + '" style="display: inline-block;position: relative;top: 4px;"></span>&nbsp;' + rights[i].node[0].innerHTML;
				};
			};
			
			// add toggle function for "other offers" if any
			var $head = $('h4', $dc),
			    $table = $('table#mps_otheroffers', $dc);
			if ($('tr', $table).length > 2 || $('tr:nth-child(2) > td', $table).attr('colspan') != 4) {
			    $head.html($head.html() + '&nbsp;(' + ($('tr', $table).length-1) + ')')
				 .click(function() { $table.toggle(); dlgCenter(); })
				 .css({"cursor": "pointer"});
			} else {
			    $head.html($head.html() + '&nbsp;(0)');
			    $table.hide();
			};
			
			dlgCenter();
			loadPresets();
		    };
                };
                
		var weeklyCrafting = function() {
		    if (w.Character.professionId && w.Character.professionSkill > 599) {
			
			var weeklyCraftingNotice = function (id) {
			    var entry = new OnGoingEntry();
			    var result = ItemManager.get((ItemManager.get(id).craftitem));
			    var notice = "<div style='text-align:center;'>#CRAFTAVAILABLE#<br />"
					+ '<div class="item  item_inventory" style="display:inline-block;float:none;"><img class="tw_item item_inventory_img" src="' + result.image + '"></div><br />'
					+ result.name + "</div>";
			    entry.init("", function() {CharacterWindow.open("crafting");TWDB.Cache.save('craftingCheck', {found: false, date: null});}, 11);
			    entry.setTooltip(notice);
			    entry.setImageClass("work");
			    entry.highlightBorder();
			    WestUi.NotiBar.add(entry);
			    TitleTicker.setNotifyMessage("#CRAFTING#");
			    AudioController.play(AudioController.SOUND_NEWMSG);
			};	// ## weeklyCraftingNotice()
			
			var weeklyCraftingCheck = function () {
			    var craftingCheck = TWDB.Cache.load("craftingCheck") || {found: false, date: null};
			    if (!craftingCheck.found) {
				return weeklyCraftingGet();
			    }
			    var timediff = (new Date(craftingCheck.date)).getTime() - (new ServerDate).getTime();
			    if (timediff < 0) {		// ready to craft
				return weeklyCraftingNotice(craftingCheck.found);
			    } else if (timediff < 86400000) {	// if less than 24 hrs
				if (timediff < 180000) {	// if less than 3 mins	=>	set direct timer
				    w.setTimeout(function(){weeklyCraftingNotice(craftingCheck.found)}, timediff);
				} else {	// 3m < t < 24h		=>	check again in t/2 since JS timers tend to go askew
				    w.setTimeout(function(){weeklyCraftingCheck()}, parseInt(timediff/2));
				}
			    } // else, if > 24hrs, do nothing. You can't stay logged in that long ^^
			}	// ##  weeklyCraftingCheck
			
			var weeklyCraftingGet = function () {
			    Ajax.remoteCall('crafting', '', {}, function(json) {
				if (json.error) { return new UserMessage(json.msg).show(); }
				if (json.hasOwnProperty('recipes_content') && json.recipes_content.length > 0) {
				    var i, timed_recipe = ({1:20099,2:20104,3:20114,4:20109})[w.Character.professionId];
				    for (i = 0; i < json.recipes_content.length; i++) {
					if (json.recipes_content[i].item_id == timed_recipe) {
					    if (json.recipes_content[i].last_craft) {
						TWDB.Cache.save('craftingCheck', {
						    found: timed_recipe,
						    date:  new Date((new ServerDate).getTime() + parseInt(json.recipes_content[i].last_craft * 1e3)),
						    });
					    } else {
						TWDB.Cache.save('craftingCheck', {
						    found: timed_recipe,
						    date:  new Date(null),
						    });
					    }
					return weeklyCraftingCheck();
					}
				    }
				}
				TWDB.Cache.save('craftingCheck', {
				    found: false,
				    date:  null,
				    });
				    // todo: add question if feature should be disabled
			    });
			}	// ##  weeklyCraftingGet
		
			weeklyCraftingCheck();
		    }
		};
		    
                return _self;
            }($);
            Debugger.Snippets = Snippets;

            var GameInject = function ($) {
                var _self = {};
                var save = {};
                var minimap = [];
                var questlog = [];
                var radialmenu = [];
                var quests = [];
                var ready = false;
                var timeout = null;
                var interval = null;
                var _duelmoti = [];
                var _position = [];
                var _reportreceived = [];
                _self.CharacterButton = function (e) {
                    var t = {};
                    var n = 0;
                    var r = null;
                    t.add = function (t) {
                        if (n == 0) {
                            r = e('<div style="width:35px;height:35px;position:absolute;left:141px;top:131px;background: url(' + Game.cdnURL + '/images/interface/character/character.png?3) no-repeat -141px -105px transparent;" />');
                            e("#ui_character_container").prepend(r)
                        }
                        n++;
                        r.css({
                            height: 10 + 26 * n + "px",
                            "background-position": "-141px " + (26 * n - 131) + "px"
                        });
                        var i = e('<div class="char_links" style="top:' + (6 + (n - 1) * 26) + "px;left:6px;background:url(" + t + ')no-repeat 0px 0px transparent;"/>');
                        i.hover(function () {
                            e(this).css("background-position",
                                "-25px 0px")
                        }, function () {
                            e(this).css("background-position",
                                "0px 0px")
                        });
                        r.append(i);
                        return i
                    };
                    return t
                }($);
                _self.ChatLayout = function (e) {
                    var t = [];
                    return function (e) {
                        if (t.length == 0) {
                            try {
                                var n = window.Chat.Layout.Tab.prototype.getMainDiv;
                                window.Chat.Layout.Tab.prototype.getMainDiv = function () {
                                    for (var e = 0; e < t.length; e++) {
                                        try {
                                            t[e](this)
                                        } catch (n) {
                                            Error
                                                .report(n,
                                                    "callbacks on Chat Layout")
                                        }
                                    }
                                    return this.mainDiv
                                }
                            } catch (r) {
                                Error.report(r,
                                    "manipulate Chat Layout")
                            }
                            t.push(e)
                        }
                    }
                }($);
                _self.ChatSend = function (e) {
                    var t = [];
                    return function (e) {
                        if (t.length == 0) {
                            try {
                                window.Chat.Layout.Tab.prototype._send = window.Chat.Layout.Tab.prototype.send;
                                window.Chat.Layout.Tab.prototype.send = function () {
                                    for (var e = 0; e < t.length; e++) {
                                        try {
                                            t[e](this)
                                        } catch (n) {
                                            Error
                                                .report(n,
                                                    "callbacks on Chat Send")
                                        }
                                    }
                                    this._send()
                                }
                            } catch (n) {
                                Error.report(n, "manipulate Chat Send")
                            }
                            t.push(e)
                        }
                    }
                }($);
                _self.MarketOfferTable = function (e) {
                    var t = [];
                    return function (e) {
                        if (t.length == 0) {
                            try {
                                var n = MarketWindow.Offer.updateTable;
                                MarketWindow.Offer.updateTable = function (
                                    e) {
                                    n(e);
                                    for (var r = 0; r < t.length; r++) {
                                        try {
                                            t[r](e)
                                        } catch (i) {
                                            Error
                                                .report(i,
                                                    "callbacks MarketOfferTable")
                                        }
                                    }
                                }
                            } catch (r) {
                                Error.report(r,
                                    "manipulate MarketOfferTable")
                            }
                            t.push(e)
                        }
                    }
                }($);
                _self.MarketWatchlistTable = function (e) {
                    var t = [];
                    return function (e) {
                        if (t.length == 0) {
                            try {
                                var n = MarketWindow.Watchlist.updateTable;
                                MarketWindow.Watchlist.updateTable = function (
                                    e) {
                                    n(e);
                                    for (var r = 0; r < t.length; r++) {
                                        try {
                                            t[r](e)
                                        } catch (i) {
                                            Error
                                                .report(i,
                                                    "callbacks MarketWatchlistTable")
                                        }
                                    }
                                }
                            } catch (r) {
                                Error
                                    .report(r,
                                        "manipulate MarketWatchlistTable")
                            }
                            t.push(e)
                        }
                    }
                }($);
                _self.ItemUse = function ($) {
                    var callbacks = [];
                    return function (callback) {
                        if (callbacks.length == 0) {
                            ItemUse.twdb = function (e, t) {
                                try {
                                    for (var n = 0; n < callbacks.length; n++) {
                                        callbacks[n](e, t)
                                    }
                                } catch (r) {
                                    Error.report(r,
                                        "callbacks on ItemUse")
                                }
                            };
                            var org = ItemUse.doIt;
                            try {
                                var str = ItemUse.doIt.toString();
                                var pos = str
                                    .indexOf("EventHandler.signal('item_used'");
                                var inject = str.substr(0, pos) + "ItemUse.twdb(itemId,res);" + str.substr(pos);
                                eval("ItemUse.doIt = " + inject)
                            } catch (e) {
                                ItemUse.doIt = org;
                                Error.report(e, "manipulate ItemUse")
                            }
                        }
                        callbacks.push(callback)
                    }
                }($);
                _self.injectSetDuelMotivation = function (e) {
                    try {
                        if (!window.Character._setDuelMotivation) {
                            window.Character._setDuelMotivation = window.Character.setDuelMotivation;
                            window.Character.setDuelMotivation = function (
                                e) {
                                try {
                                    this._setDuelMotivation(e);
                                    for (var t = 0; t < _duelmoti.length; t++) {
                                        _duelmoti[t](e)
                                    }
                                } catch (n) {
                                    Error
                                        .report(n,
                                            "Character.setDuelMotivation")
                                }
                            }
                        }
                    } catch (t) {
                        Error
                            .report(t,
                                "manipulate Character.setDuelMotivation")
                    }
                    _duelmoti.push(function (t) {
                        e(t)
                    })
                };
                _self.injectItem = function (type, name, callback) {
                    var item = type + "Item";
                    if (typeof save[item] == "undefined") {
                        save[item] = tw2widget[item].prototype.getMainDiv
                            .toString()
                    }
                    try {
                        tw2widget[item].prototype["TWDB" + name] = function (
                            e) {
                            try {
                                return callback(e)
                            } catch (t) {
                                Error.report(t, "injected " + e + " function: " + name)
                            }
                            return ""
                        }
                    } catch (e) {
                        Error.report(e, "inject " + item + " function: " + name)
                    }
                    try {
                        var inject = "this.TWDB" + name + "(this);";
                        inject.replace(/ /g, "");
                        var newfunction = tw2widget[item].prototype.getMainDiv
                            .toString().replace("return",
                                inject + "\n return");
                        eval("tw2widget['" + item + "'].prototype.getMainDiv = " + newfunction)
                    } catch (e) {
                        Error.report(e, "manipulate " + item + ".prototype.getMainDiv");
                        eval(item + ".prototype.getMainDiv = " + save[item])
                    }
                };

                _self.injectTrader = function(name, callback) {
                    if (typeof save["west.game.shop.item.view.prototype.render"] == "undefined") {
                        save["Trader"] = west.game.shop.item.view.prototype.render.toString()
                    }
                    try {
                        west.game.shop.item.view.prototype["TWDB" + name] = function(e) {
                            try {
                                return callback(e)
                            } catch (t) {
                                Error.report(t, "injected " + e + " function: " + name)
                            }
                            return ""
                        }
                    } catch (e) {
                        Error.report(e, "inject " + item + " function: " + name)
                    }
                    try {
                        var str = west.game.shop.item.view.prototype.render.toString();
                        var inject = "window.setTimeout(function() {$item.append(that.TWDB" + name + "(model.getItemData()))}, 100);";
                        inject.replace(/ /g, "");
                        var newfunction = str.replace("return $item", inject + "\n return $item");
                        eval("west.game.shop.item.view.prototype.render = " + newfunction)
                    } catch (e) {
                        Error.report(e, "west.game.shop.item.view.prototype.render");
                        eval("west.game.shop.item.view.prototype.render = " + save["Trader"])
                    }
                };
                
                _self.injectMarket = function (name, callback) {
                    if (typeof save.MarketWindow == "undefined") {
                        save.MarketWindow = MarketWindow.getClearName
                            .toString()
                    }
                    try {
                        MarketWindow["TWDB" + name] = function (e) {
                            try {
                                return callback(e)
                            } catch (t) {
                                Error.report(t,
                                    "injected MarketWindow function:" + name)
                            }
                            return ""
                        }
                    } catch (e) {
                        Error.report(e, "inject MarketWindow function:" + name)
                    }
                    try {
                        var str = MarketWindow.getClearName.toString();
                        var inject = "this.TWDB" + name + "(obj.item_id)";
                        inject.replace(/ /g, "");
                        var newfunction = "";
                        while (str.indexOf("return") != -1) {
                            var pos = str.indexOf("return");
                            newfunction += str.slice(0, pos + 6) + " " + inject + " + String(";
                            str = str.substr(pos + 7);
                            var pos = str.indexOf(";");
                            newfunction += str.slice(0, pos) + ");";
                            str = str.substr(pos + 1)
                        }
                        newfunction += str;
                        eval("MarketWindow.getClearName = " + newfunction)
                    } catch (e) {
                        Error.report(e,
                            "manipulate MarketWindow.getClearName");
                        eval("MarketWindow.getClearName = " + save.MarketWindow)
                    }
                };
                _self.addTabOnMessagesWindow = function (name,
                    shortname, callback) {
                    if (typeof save.MessagesWindowOpen == "undefined") {
                        save.MessagesWindowOpen = MessagesWindow.open
                            .toString();
                        save.MessagesWindowTab = MessagesWindow.showTab
                            .toString()
                    }
                    try {
                        var inject = "MessagesWindow.window.addTab('" + name + "', '" + shortname + "', tabclick).appendToContentPane($('<div class=\"messages-" + shortname + "\"/>'));";
                        var newfunction = MessagesWindow.open
                            .toString()
                            .replace(
                                /MessagesWindow.Telegram.DOM/g,
                                inject + "MessagesWindow.Telegram.DOM");
                        eval("(function ($) {" + "MessagesWindow.open = " + newfunction + "})(jQuery);")
                    } catch (e) {
                        Error.report(e,
                            "manipulate MessagesWindow.open");
                        eval("(function ($) {" + "MessagesWindow.open = " + save.MessagesWindowOpen + "})(jQuery);")
                    }
                    try {
                        MessagesWindow["TWDB-" + shortname] = function () {
                            callback()
                        }
                    } catch (e) {
                        Error
                            .report(e,
                                "add showTab to MessagesWindow")
                    }
                    try {
                        var inject = "case '" + shortname + "':MessagesWindow['TWDB-" + shortname + "']();break;";
                        var newfunction = MessagesWindow.showTab
                            .toString().replace(
                                /switch(\s)*\(id\)(\s)*{/g,
                                "switch (id) { " + inject);
                        eval("(function ($) {" + "MessagesWindow.showTab = " + newfunction + "})(jQuery);;")
                    } catch (e) {
                        Error.report(e,
                            "manipulate MessagesWindow.showTab");
                        eval("(function ($) {" + "MessagesWindow.showTab = " + save.MessagesWindowTab + "})(jQuery);")
                    }
                };
                _self.addTabOnMarketWindow = function (name, shortname,
                    callback) {
                    var first = false;
                    if (typeof save.MarketWindowOpen == "undefined") {
                        first = true;
                        save.MarketWindowOpen = MarketWindow.open
                            .toString();
                        save.MarketWindowTab = MarketWindow.showTab
                            .toString()
                    }
                    try {
                        var inject = "MarketWindow.window.addTab('" + name + "', '" + shortname + "', tabclick).appendToContentPane($('<div class=\"marketplace-" + shortname + "\"/>'));";
                        var newfunction = MarketWindow.open.toString()
                            .replace(/MarketWindow.DOM/,
                                inject + "MarketWindow.DOM");
                        eval("(function ($) {" + "MarketWindow.open = " + newfunction + "})(jQuery);")
                    } catch (e) {
                        Error.report(e, "manipulate MarketWindow.open");
                        eval("(function ($) {" + "MarketWindow.open = " + save.MarketWindowOpen + "})(jQuery);")
                    }
                    try {
                        MarketWindow["TWDB-" + shortname] = function () {
                            callback()
                        }
                    } catch (e) {
                        Error.report(e, "add showTab to MarketWindow")
                    }
                    try {
                        var inject = "case '" + shortname + "':MarketWindow['TWDB-" + shortname + "']();break;";
                        var newfunction = MarketWindow.showTab
                            .toString().replace(
                                /switch(\s)*\(id\)(\s)*{/,
                                "switch (id) { " + inject);
                        eval("(function ($) {" + "MarketWindow.showTab = " + newfunction + "})(jQuery);;")
                    } catch (e) {
                        Error.report(e,
                            "manipulate MarketWindow.showTab (1)");
                        eval("(function ($) {" + "MarketWindow.showTab = " + save.MarketWindowTab + "})(jQuery);")
                    }
                    if (first) {
                        try {
                            var inject = "MarketWindow.window.setSize(748,471).removeClass('premium-buy');";
                            var newfunction = MarketWindow.showTab
                                .toString().replace(/{/,
                                    "{" + inject);
                            eval("(function ($) {" + "MarketWindow.showTab = " + newfunction + "})(jQuery);;")
                        } catch (e) {
                            Error
                                .report(e,
                                    "manipulate MarketWindow.showTab (2)");
                            eval("(function ($) {" + "MarketWindow.showTab = " + save.MarketWindowTab + "})(jQuery);")
                        }
                    }
                };
                var waitForMinimap = function (e) {
                    if (interval) {
                        window.clearInterval(timeout);
                        window.clearInterval(interval)
                    }
                    var t = function () {
                        if (!MinimapWindow.window || $(MinimapWindow.window.divMain)
                            .find(".mmap_jobs").length == 0) {
                            return

                        }
                        if ($(MinimapWindow.window).find(".loader").is(
                            ":visible")) {
                            return

                        }
                        window.clearInterval(timeout);
                        window.clearInterval(interval);
                        interval = null;
                        timeout = null;
                        for (var e = 0; e < minimap.length; e++) {
                            try {
                                minimap[e]()
                            } catch (t) {
                                Error.report(t, "MinimapWindow inject")
                            }
                        }
                    };
                    timeout = setInterval(function () {
                        window.clearInterval(interval);
                        window.clearInterval(timeout);
                        interval = null;
                        timeout = null
                    }, 3e5);
                    interval = setInterval(function () {
                        t()
                    }, 200)
                };
                _self.injectMinimap = function (e) {
                    try {
                        if (!MinimapWindow._open) {
                            MinimapWindow._open = MinimapWindow.open;
                            MinimapWindow.open = function (e) {
                                try {
                                    MinimapWindow._open(e);
                                    waitForMinimap()
                                } catch (t) {
                                    Error.report(t,
                                        "MinimapWindow.open")
                                }
                            }
                        }
                    } catch (t) {
                        Error
                            .report(t,
                                "manipulate MinimapWindow.open")
                    }
                    try {
                        if (!MinimapWindow._refreshWindow) {
                            MinimapWindow._refreshWindow = MinimapWindow.refreshWindow;
                            MinimapWindow.refreshWindow = function () {
                                try {
                                    MinimapWindow._refreshWindow();
                                    window.setTimeout(function () {
                                        waitForMinimap()
                                    }, 2500)
                                } catch (e) {
                                    Error
                                        .report(e,
                                            "MinimapWindow.refreshWindow")
                                }
                            }
                        }
                    } catch (t) {
                        Error
                            .report(t,
                                "manipulate MinimapWindow.refreshWindow")
                    }
                    minimap.push(function () {
                        e()
                    })
                };
                _self.injectRadialmenu = function (e) {
                    try {
                        if (!window.Map.Radialmenu.prototype._open) {
                            window.Map.Radialmenu.prototype._open = window.Map.Radialmenu.prototype.open;
                            window.Map.Radialmenu.prototype.open = function (
                                e) {
                                try {
                                    this._open(e);
                                    for (var t = 0; t < radialmenu.length; t++) {
                                        radialmenu[t](this)
                                    }
                                } catch (n) {
                                    Error.report(n, "Radialmenu.open")
                                }
                            }
                        }
                    } catch (t) {
                        Error.report(t, "manipulate Radialmenu.open")
                    }
                    radialmenu.push(function (t) {
                        e(t)
                    })
                };
                _self.injectQuestLog = function (e) {
                    try {
                        if (!QuestEmployerView._buildQuestLog) {
                            QuestEmployerView._buildQuestLog = QuestEmployerView.buildQuestLog;
                            QuestEmployerView.buildQuestLog = function (
                                e) {
                                try {
                                    QuestEmployerView._buildQuestLog(e);
                                    for (var t = 0; t < questlog.length; t++) {
                                        questlog[t](e)
                                    }
                                } catch (n) {
                                    Error
                                        .report(n,
                                            "QuestEmployerView.buildQuestLog")
                                }
                            }
                        }
                        questlog.push(function (t) {
                            e(t)
                        })
                    } catch (t) {
                        Error
                            .report(t,
                                "manipulate QuestEmployerView.buildQuestLog")
                    }
                };
                _self.injectQuest = function (e) {
                    try {
                        if (!Quest.prototype._render) {
                            Quest.prototype._render = Quest.render;
                            Quest.prototype.render = function () {
                                try {
                                    this._render();
                                    for (var e = 0; e < quests.length; e++) {
                                        quests[e](this)
                                    }
                                } catch (t) {
                                    Error.report(t, "Quest.render")
                                }
                            }
                        }
                        quests.push(function (t) {
                            e(t)
                        })
                    } catch (t) {
                        Error.report(t, "manipulate Quest.render")
                    }
                };
                _self.injectReportReceivedEntry = function (callback) {
                    try {
                        if (_reportreceived.length == 0) {
                            try {
                                var inject = "this._TWDB(msg);";
                                var newfunction = OnGoingReportReceivedEntry
                                    .toString().replace("{",
                                        "{\n" + inject + "\n");
                                eval("OnGoingReportReceivedEntry = " + newfunction);
                                OnGoingReportReceivedEntry.prototype = new OnGoingEntry;
                                OnGoingReportReceivedEntry.prototype._TWDB = function (
                                    e) {
                                    try {
                                        for (var t = 0; t < _reportreceived.length; t++) {
                                            _reportreceived[t](e)
                                        }
                                    } catch (n) {
                                        Error
                                            .report(n,
                                                "OnGoingReportReceivedEntry")
                                    }
                                }
                            } catch (e) {
                                Error.report(e, "manipulate " + item + ".prototype.getMainDiv");
                                eval(item + ".prototype.getMainDiv = " + save[item])
                            }
                        }
                    } catch (e) {
                        Error
                            .report(e,
                                "manipulate OnGoingReportReceivedEntry")
                    }
                    _reportreceived.push(function (e) {
                        callback(e)
                    })
                };
                return _self
            }($);
            Debugger.GameInject = GameInject;
            var DataManager = function (e) {
                var t = {};
                var n = false;
                var r = {};
                var i = {};
                var s = {};
                var o = [];
                var u = 0;
                var a = {
                    items: {},
                    skills: {}
                };
                var f = {
                    items: true,
                    skills: true
                };
                var l = null;
                var c = {};
                var h = function () {
                    if (c.ready) {
                        return

                    }
                    var t = window.addEventListener ? "addEventListener" : "attachEvent";
                    var n = window[t];
                    var o = t == "attachEvent" ? "onmessage" : "message";
                    n(
                        o,
                        function (t) {
                            if (t.origin !== "http://" + Script.url) {
                                return

                            }
                            try {
                                var n = e.parseJSON(t.data);
                                if (isDefined(n.error)) {
                                    (new UserMessage(Script.url + ": " + n.error,
                                        UserMessage.TYPE_ERROR))
                                    .show()
                                } else {
                                    (new UserMessage(
                                        Script.url + ": " + n.message,
                                        UserMessage.TYPE_SUCCESS))
                                    .show();
                                    r = n.data;
                                    a.skills = s;
                                    a.items = i;
                                    Cache.save("datamanager", a);
                                    f = {
                                        items: true,
                                        skills: true
                                    };
                                    u++;
                                    Eventer
                                        .trigger("TWDBdataLoaded")
                                }
                            } catch (t) {
                                (new UserMessage(
                                    Script.url + ": empty or corrupt data recieved",
                                    UserMessage.TYPE_ERROR))
                                .show()
                            }
                        }, false);
                    var l = Cache.load("datamanager");
                    if (isDefined(l) && isDefined(l.skills) && isDefined(l.items)) {
                        a = l
                    }
                    if (!window.Bag.loaded) {
                        window.Bag.loadItems()
                    }
                    var h = window.setInterval(function () {
                        // Dun : the Wear.loaded was deprecated by inno
                        // at 11/02,
                        // the condition test just the Bag init
                        if (window.Bag.loaded) {
                            window.clearInterval(h);
                            c.ready = true
                        }
                    }, 100)
                };
                c = Loader.add("DataManager", "tw-db DataManager", h, {
                    Cache: true
                });
                t.getData = function (e) {
                    if (isDefined(r[e])) {
                        return r[e]
                    }
                    return r
                };
                t.getSkills = function () {
                    return s
                };
                t.getItems = function () {
                    return i
                };
                t.getAnimals = function () {
                    return o
                };
                t.getVersion = function () {
                    return u
                };
                t.getUp2Date = function () {
                    return f
                };
                var p = function () {
                    try {
                        var t = e.extend(true, {}, a.skills);
                        s = {};
                        for (var n in CharacterSkills.skills) {
                            var r = ClothCalc._skill2id[n];
                            var i = CharacterSkills.skills[n].points;
                            s[r] = i;
                            if (isDefined(t[r])) {
                                if (t[r] != i) {
                                    f.skills = false
                                }
                                delete t[r]
                            } else {
                                f.skills = false
                            }
                        }
                        if (!e.isEmptyObject(t)) {
                            f.skills = false
                        }
                    } catch (o) {
                        Error.report(o, "DataManager loadSkill")
                    }
                };
                var d = function () {
                    try {
                        var t = e.extend(true, {}, a.items);
                        i = {};
                        o = [];
                        for (var n in Bag.items) {
                            for (var r in Bag.items[n]) {
                                var s = Number(r);
                                if (ClothCalc.isItemUsable(s)) {
                                    i[s] = true;
                                    if (n == "animal") {
                                        o
                                            .push({
                                                id: s,
                                                speed: Bag.items[n][s].obj.speed
                                            })
                                    }
                                    if (isDefined(t[s])) {
                                        delete t[s]
                                    } else {
                                        f.items = false
                                    }
                                }
                            }
                        }
                        for (var n in Wear.wear) {
                            var s = Number(Wear.wear[n].getId());
                            if (isDefined(i[s])) {
                                continue
                            }
                            if (ClothCalc.isItemUsable(s)) {
                                i[s] = true;
                                if (n == "animal") {
                                    o.push({
                                        id: s,
                                        speed: Wear.wear[n].obj.speed
                                    })
                                }
                                if (isDefined(t[s])) {
                                    delete t[s]
                                } else {
                                    f.items = false
                                }
                            }
                        }
                        if (!e.isEmptyObject(t)) {
                            f.items = false
                        }
                        var u = function (e, t) {
                            return e["speed"] > t["speed"] ? true : false
                        };
                        o.sort(u)
                    } catch (l) {
                        Error.report(l, "DataManager loadItems")
                    }
                };
                t.loadData = function (e) {
                    p();
                    d();
                    if (e === true) {
                        // if (!f.items || !f.skills || e === true ||
                        // Analyser.extra) {
                        v()
                    }
                };
                var v = function () {
                    try {
                        var t = {};
                        var n = {};
                        for (var r in i) {
                            var o = ItemManager.get(r);
                            var u = Number(_type2id[o.type]);
                            if (!isDefined(t[u])) {
                                t[u] = []
                            }
                            t[u].push(r);
                            if (isDefined(o.set)) {
                                if (!isDefined(n[u])) {
                                    n[u] = []
                                }
                                n[u].push(r)
                            }
                        }
                        var a = {
                            0: Number(Premium.hasBonus("regen")),
                            1: Number(Premium.hasBonus("automation")),
                            2: Number(Premium.hasBonus("money")),
                            3: Number(Premium.hasBonus("character"))
                        };
                        var f = '<form name="TWDB_CC_Form" action="http://' + Script.url + '/ingame_calc_2.php" method="post">';
                        f += '<input style="display:none" type="text" name="worldfull" value="' + window.location.host + '" />';
                        f += '<input style="display:none" type="text" name="version" value="' + TheWestApi.version + '" />';
                        f += '<input style="display:none" type="text" name="nick" value="' + Character.name + '" />';
                        f += '<input style="display:none" type="text" name="level" value="' + Number(Character.level) + '" />';
                        f += '<input style="display:none" type="text" name="class" value="' + Number(_class2id[Character.charClass]) + '" />';
                        f += '<input style="display:none" type="text" name="premium" value=\'' + JSON.stringify(a)
                            .replace(/'/g, "\\'") + "' />";
                        f += '<input style="display:none" type="text" name="items" value=\'' + JSON.stringify(t)
                            .replace(/'/g, "\\'") + "' />";
                        f += '<input style="display:none" type="text" name="setitems" value=\'' + JSON.stringify(n)
                            .replace(/'/g, "\\'") + "' />";
                        f += '<input style="display:none" type="text" name="skill" value=\'' + JSON.stringify(s)
                            .replace(/'/g, "\\'") + "' />";
                        f += '<input style="display:none" type="text" name="custom" value=\'' + JSON.stringify(Customs.getCustoms())
                            .replace(/'/g, "\\'") + "' />";
                        if (Analyser.getExtra()) {
                            f += '<input style="display:none" type="text" name="report" value=\'' + JSON.stringify(
                                    Analyser.getExtra())
                                .replace(/'/g, "\\'") + "' />"
                        }
                        f += "</form>";
                        f += '<script type="text/javascript">document.forms.TWDB_CC_Form.submit();</script>';
                        f += "</body>";
                        Support.addKey("world", window.location.host);
                        Support.addKey("version", TheWestApi.version);
                        Support.addKey("name", Character.name);
                        Support
                            .addKey("level",
                                Number(Character.level));
                        Support.addKey("class",
                            Number(_class2id[Character.charClass]));
                        Support.addKey("premium", JSON.stringify(a)
                            .replace(/'/g, "\\'"));
                        Support.addKey("items", JSON.stringify(t)
                            .replace(/'/g, "\\'"));
                        Support.addKey("setitems", JSON.stringify(n)
                            .replace(/'/g, "\\'"));
                        Support.addKey("skill", JSON.stringify(s)
                            .replace(/'/g, "\\'"));
                        Support.addKey("custom", JSON.stringify(
                            Customs.getCustoms()).replace(/'/g,
                            "\\'"));
                        if (isDefined(l)) {
                            e(l).remove()
                        }
                        l = e('<iframe width="1px" height="1px" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" allowtransparency="false" style="display:none;" />');
                        e("body").append(l);
                        var c = l.get(0);
                        var h = c.contentWindow || c.contentDocument;
                        if (h.document)
                            h = h.document;
                        h.write(f)
                    } catch (p) {
                        Error.report(p, "DataManager sendForm")
                    }
                };
                t.aktuell = f;
                return t
            }($);
            _base.DataManager = DataManager;
            Debugger.DataManager = DataManager;
            var Quests = function (e) {
                var t = {};
                var n = {};
                var r = function () {
                    if (n.ready) {
                        return

                    }
                    /*
                     * if (Settings.get("questgroup", true)) { i() }
                     */
                    if (Settings.get("questwiki", true)) {
                        s()
                    }
                    if (Settings.get("questcancle", true)) {
                        o()
                    }
                    n.ready = true
                };
                n = Loader.add("Quests", "tw-db Quests", r, {
                    Settings: true
                });
                /*
                 * var i = function() { var t = { "#DAILIES#": e('<div
                 * class="TWDBBox" style="display:none;" / >') }; var n =
                 * function(n) { if (n.key != "paper") { return } for
                 * (var r in t) { t[r].children().remove() } var i = {};
                 * var s =
                 * e(GameAPI.wman.getById("window-quest_employer").getMainDiv());
                 * for (var o = 0; o < n.open.length; o++) { var u =
                 * n.open[o]; var a = "#DAILIES#"; for (var f = 0; f <
                 * u.requirements.length; f++) { var l =
                 * u.requirements[f]; if (!isDefined(l.jsInfo) ||
                 * l.jsInfo.type != "task-finish-walk") { continue } a =
                 * l.info } if (!isDefined(t[a])) { t[a] = e('<div
                 * class="TWDBBox" style="display:none;" / >') }
                 * t[a].append(s.find("#open_quest_" + u.id)); var c =
                 * "exclamationgray"; if (!u.accepted) { if
                 * (u.acceptable) { c = "exclamation" } } else { if
                 * (u.finishable) { c = "question" } else { c =
                 * "questiongray" } } if (!isDefined(i[a])) { i[a] = {} }
                 * if (!isDefined(i[a][c])) { i[a][c] = 0 } i[a][c]++ }
                 * var h = s.find(".quest_splitter").next(); for (var r
                 * in t) { var p = e("<span />"); if (isDefined(i[r])) {
                 * for (var d in i[r]) { p.append('<span
                 * style="margin-left:10px;">' + i[r][d] +
                 * "x").append(GameAPI.gui.icon.get(d)) } } var v = e("<div
                 * />").append(e('<span
                 * style="cursor:pointer;font-weigth:bold;margin-left:20px;" >' +
                 * r + "</span>").click(function() {
                 * e(this).parent().children(".TWDBBox").toggle()
                 * }).append(p)).append(t[r]).append('<div
                 * class="quest_splitter" />'); h.append(v) } };
                 * GameInject.injectQuestLog(function(e) { n(e) }) };
                 */
                var s = function () {
                    try {
                        window.Quest.CCopen = function (e, t) {
                            try {
                                ClothCalc.open(e, t)
                            } catch (n) {
                                Error.report(n, "ClothCalc.open ")
                            }
                        }
                    } catch (t) {
                        Error.report(t, "open ClothCalc from Quest")
                    }
                    var n = function (t) {
                        if (t.requirements.length != 0) {
                            t.el
                                .find(".quest_requirement")
                                .each(
                                    function (n) {
                                        if (isDefined(t.requirements[n])) {
                                            var r = t.requirements[n];
                                            if (isDefined(r.jsInfo) && isDefined(r.jsInfo.id)) {
                                                if (r.jsInfo.type == "inventory_changed") {
                                                    var i = Bag
                                                        .getItemByItemId(r.jsInfo.id);
                                                    if (i) {
                                                        e(this)
                                                            .children(
                                                                ":last")
                                                            .before(
                                                                "<span> [" + i.count + "]</span>")
                                                    }
                                                    var s = ItemManager
                                                        .get(r.jsInfo.id);
                                                    if (s) {
                                                        e(this)
                                                            .children(
                                                                ".quest_mmaplink")
                                                            .after(
                                                                '<span title="#SHOWJOBATCC#" class="quest_mmaplink" title="" onclick="javascript:void(Quest.CCopen(\'' + s.name + "','item'))\"><img src=\"" + Images.iconLight + '" /></span>')
                                                    }
                                                } else if (r.jsInfo.type == "task-finish-job") {
                                                    var o = Jobs
                                                        .getJobById(r.jsInfo.id);
                                                    if (o) {
                                                        e(this)
                                                            .children(
                                                                ".quest_mmaplink")
                                                            .after(
                                                                '<span title="#SHOWJOBATCC#" class="quest_mmaplink" title="" onclick="javascript:void(Quest.CCopen(\'' + o.id + "','job'))\"><img src=\"" + Images.iconLight + '" /></span>')
                                                    }
                                                }
                                            }
                                        }
                                    })
                        }
                        t.el
                            .find(".questRequirementHelp")
                            .append(
                                '<a target="_blank" title="#QUESTWIKI#" href="http://' + Script.url + "/quest_redirect.php?id=" + t.id + '" style="margin-left:10px;"><img src="' + Images.questwiki + '" /></a>')
                    };
                    GameInject.injectQuest(function (e) {
                        n(e)
                    })
                };
                var o = function () {
                    try {
                        var e = QuestWindow.cancelQuest;
                        QuestWindow.cancelQuest = function (t) {
                            (new GameAPI.gui.dialog("#QUESTCANCEL#",
                                "#QUESTCANCELDESC#"))
                            .setIcon(
                                    GameAPI.gui.dialog.SYS_QUESTION)
                                .setModal(
                                    true,
                                    false, {
                                        bg: Game.cdnURL + "/images/curtain_bg.png",
                                        opacity: .4
                                    }).addButton("yes",
                                    function () {
                                        e(t)
                                    }).addButton("no",
                                    function () {}).show()
                        }
                    } catch (t) {
                        Error.report(t, "inject " + item + " function: " + name)
                    }
                };
                return t
            }($);
            Debugger.Quests = Quests;
            var Customs = function (e) {
                var t = {};
                var n = {};
                var r = false;
                var i = null;
                var s = {};
                var o = function () {
                    if (s.ready) {
                        return
                    }
                    Eventer.set("TWDBdataLoaded", function () {
                        a()
                    });
                    var e = Cache.load("customs");
                    if (!e || typeof e != "object") {
                        var e = Settings.get("custom");
                        if (!e || typeof e != "object") {
                            u();
                            var e = n
                        } else {
                            for (var t in e) {
                                if (!e.hasOwnProperty(t)) {
                                    continue
                                }
                                e[t].cloth = {};
                                e[t].ready = false
                            }
                        }
                    }
                    n = e;
                    if (Updater.wasUpdated()) {
                        for (var t in e) {
                            if (!e.hasOwnProperty(t)) {
                                continue
                            }
                            e[t].cloth = {};
                            e[t].ready = false
                        }
                    }
                    s.ready = true
                };
                s = Loader.add("Customs", "tw-db Customs", o, {
                    Settings: true,
                    Cache: true
                });
                var u = function () {
                    n = {
                        1: {
                            id: 1,
                            type: "speed",
                            para: {},
                            name: "Speed",
                            cloth: {},
                            ready: false
                        },
                        2: {
                            id: 2,
                            type: "custom",
                            para: {
                                9: 1
                            },
                            name: "max Health",
                            cloth: {},
                            ready: false
                        },
                        3: {
                            id: 3,
                            type: "regen",
                            para: {},
                            name: "Health Regeneration",
                            cloth: {},
                            ready: false
                        },
                        4: {
                            id: 4,
                            type: "fort",
                            para: {
                                att: 200,
                                def: 20,
                                health: 100,
                                type: 0
                            },
                            name: "Fortbattle Attacker (Att)",
                            cloth: {},
                            ready: false
                        },
                        5: {
                            id: 5,
                            type: "fort",
                            para: {
                                att: 20,
                                def: 200,
                                health: 100,
                                type: 0
                            },
                            name: "Fortbattle Attacker (Def)",
                            cloth: {},
                            ready: false
                        },
                        6: {
                            id: 6,
                            type: "fort",
                            para: {
                                att: 200,
                                def: 20,
                                health: 100,
                                type: 1
                            },
                            name: "Fortbattle Defender (Att)",
                            cloth: {},
                            ready: false
                        },
                        7: {
                            id: 7,
                            type: "fort",
                            para: {
                                att: 20,
                                def: 200,
                                health: 100,
                                type: 1
                            },
                            name: "Fortbattle Defender (Def)",
                            cloth: {},
                            ready: false
                        },
                        8: {
                            id: 8,
                            type: "duel",
                            para: {
                                12: 1,
                                15: 1,
                                16: 1,
                                24: 1
                            },
                            name: "Range Dueler (Att)",
                            cloth: {},
                            ready: false
                        },
                        9: {
                            id: 9,
                            type: "duel",
                            para: {
                                12: 1,
                                15: 1,
                                16: 1,
                                21: 1
                            },
                            name: "Range Dueler (Def)",
                            cloth: {},
                            ready: false
                        },
                        10: {
                            id: 10,
                            type: "duel",
                            para: {
                                6: 1,
                                7: 1,
                                11: 1,
                                15: 1
                            },
                            name: "Melee Dueler",
                            cloth: {},
                            ready: false
                        }
                    }
                };
                t.isUp2Date = function () {
                    var e = true;
                    for (var t in n) {
                        if (!n.hasOwnProperty(t)) {
                            continue
                        }
                        if (!n[t].ready) {
                            update = false;
                            break
                        }
                    }
                    return e
                };
                var a = function () {
                    var e = DataManager.getData("custom");
                    for (var t in e) {
                        try {
                            if (!e.hasOwnProperty(t)) {
                                continue
                            }
                            if (!isDefined(n[t])) {
                                continue
                            }
                            n[t].cloth = e[t].cloth;
                            n[t].boni = e[t].boni;
                            var r = n[t];
                            switch (r.type) {
                            case "speed":
                                r.skills = ["ride"];
                                if (!r.laborpoints) {
                                    var directSpeed = (r.cloth && r.cloth[1] && r.cloth[1]["other"] && r.cloth[1]["other"][1]) || 0;
                                    var r = (r.boni && r.boni.other && r.boni.other[1]) || 0;
                                    r -= directSpeed;
                                    directSpeed += (r.boni && r.boni.skill && r.boni.skill[2]) || 0;
                                    directSpeed += (r.boni && r.boni.skill && r.boni.skill[10]) || 0;
                                    directSpeed += CharacterSkills.skills.ride.points;
                                    r.laborpoints = Math.round((100 + directSpeed) * (1 + r / 100));
                                }
                                r.laborpoints += "%";
                                break;
                            case "regen":
                                r.skills = ["health"];
                                r.laborpoints = "";
                                break;
                            case "fort":
                                if (r.para.type == 0) {
                                    var o = {};
                                    o.aim = CharacterSkills.skills.aim.points + (isDefined(r.boni.skill[3]) ? r.boni.skill[3] : 0) + (isDefined(r.boni.skill[15]) ? r.boni.skill[15] : 0);
                                    o.endurance = CharacterSkills.skills.endurance.points + (isDefined(r.boni.skill[1]) ? r.boni.skill[1] : 0) + (isDefined(r.boni.skill[8]) ? r.boni.skill[8] : 0);
                                    o.dodge = CharacterSkills.skills.dodge.points + (isDefined(r.boni.skill[2]) ? r.boni.skill[2] : 0) + (isDefined(r.boni.skill[12]) ? r.boni.skill[12] : 0);
                                    o.leadership = CharacterSkills.skills.leadership.points + (isDefined(r.boni.skill[4]) ? r.boni.skill[4] : 0) + (isDefined(r.boni.skill[20]) ? r.boni.skill[20] : 0);
                                    o.health = CharacterSkills.skills.health.points + (isDefined(r.boni.skill[1]) ? r.boni.skill[1] : 0) + (isDefined(r.boni.skill[9]) ? r.boni.skill[9] : 0);
                                    var u = 100 + (Character.level - 1) * Character.lifePointPerHealthSkill + o.health * (Character.lifePointPerHealthSkill + Character.lifePointPerHealthSkillBonus);
                                    var a = Number(
                                            25 + Math
                                            .pow(
                                                o.leadership * 1 + (Character.charClass == "soldier" ? Premium
                                                    .hasBonus("character") ? .5 : .25 : 0),
                                                .4) + Math.pow(o.aim,
                                                .4) + Math
                                            .pow(
                                                o.endurance,
                                                .4))
                                        .round(2);
                                    var f = Number(
                                            10 + Math
                                            .pow(
                                                o.leadership * 1 + (Character.charClass == "soldier" ? Premium
                                                    .hasBonus("character") ? .5 : .25 : 0),
                                                .4) + Math.pow(o.dodge,
                                                .4) + Math
                                            .pow(
                                                o.endurance,
                                                .4))
                                        .round(2)
                                } else {
                                    var o = {};
                                    o.aim = CharacterSkills.skills.aim.points + (isDefined(r.boni.skill[3]) ? r.boni.skill[3] : 0) + (isDefined(r.boni.skill[15]) ? r.boni.skill[15] : 0);
                                    o.hide = CharacterSkills.skills.hide.points + (isDefined(r.boni.skill[2]) ? r.boni.skill[2] : 0) + (isDefined(r.boni.skill[13]) ? r.boni.skill[13] : 0);
                                    o.dodge = CharacterSkills.skills.dodge.points + (isDefined(r.boni.skill[2]) ? r.boni.skill[2] : 0) + (isDefined(r.boni.skill[12]) ? r.boni.skill[12] : 0);
                                    o.leadership = CharacterSkills.skills.leadership.points + (isDefined(r.boni.skill[4]) ? r.boni.skill[4] : 0) + (isDefined(r.boni.skill[20]) ? r.boni.skill[20] : 0);
                                    o.health = CharacterSkills.skills.health.points + (isDefined(r.boni.skill[1]) ? r.boni.skill[1] : 0) + (isDefined(r.boni.skill[9]) ? r.boni.skill[9] : 0);
                                    var u = 100 + (Character.level - 1) * Character.lifePointPerHealthSkill + o.health * (Character.lifePointPerHealthSkill + Character.lifePointPerHealthSkillBonus);
                                    var a = Number(
                                        25 + Math
                                        .pow(
                                            o.leadership * 1 + (Character.charClass == "soldier" ? Premium
                                                .hasBonus("character") ? .5 : .25 : 0),
                                            .4) + Math.pow(o.aim,
                                            .4) + Math.pow(o.hide,
                                            .4)).round(
                                        2);
                                    var f = Number(
                                        10 + Math
                                        .pow(
                                            o.leadership * 1 + (Character.charClass == "soldier" ? Premium
                                                .hasBonus("character") ? .5 : .25 : 0),
                                            .4) + Math.pow(o.dodge,
                                            .4) + Math.pow(o.hide,
                                            .4)).round(
                                        2)
                                }
                                a += isDefined(r.boni.other[11]) ? Number(r.boni.other[11]) : 0;
                                a += isDefined(r.boni.other[17]) ? Number(r.boni.other[17]) : 0;
                                f += isDefined(r.boni.other[12]) ? Number(r.boni.other[12]) : 0;
                                f += isDefined(r.boni.other[18]) ? Number(r.boni.other[18]) : 0;
                                r.skills = ["health", "attacker",
                                    "defender"
                                ];
                                r.laborpoints = u + " | " + a + " | " + f;
                                break;
                            case "duel":
                                r.skills = [];
                                var l = 0;
                                for (var c in r.para) {
                                    var h = Math.floor(c / 5);
                                    l += r.boni && r.boni.skill && r.boni.skill[c] || 0;
                                    l += r.boni && r.boni.skill && r.boni.skill[h] || 0;
                                    if (isDefined(_id2skill[c])) {
                                        r.skills.push(_id2skill[c]);
                                        if (isDefined(CharacterSkills.skills[_id2skill[c]])) {
                                            l += CharacterSkills.skills[_id2skill[c]].points
                                        } else if (isDefined(CharacterSkills.attributes[_id2skill[c]])) {
                                            l += CharacterSkills.attributes[_id2skill[c]].points
                                        }
                                    }
                                }
                                r.laborpoints = l;
                                break;
                            case "custom":
                                r.skills = [];
                                var l = 0;
                                for (var c in r.para) {
                                    var h = Math.floor(c / 5);
                                    l += r.boni && r.boni.skill && r.boni.skill[c] || 0;
                                    l += r.boni && r.boni.skill && r.boni.skill[h] || 0;
                                    if (isDefined(_id2skill[c])) {
                                        r.skills.push(_id2skill[c]);
                                        if (isDefined(CharacterSkills.skills[_id2skill[c]])) {
                                            l += CharacterSkills.skills[_id2skill[c]].points
                                        } else if (isDefined(CharacterSkills.attributes[_id2skill[c]])) {
                                            l += CharacterSkills.attributes[_id2skill[c]].points
                                        }
                                    }
                                }
                                r.laborpoints = l;
                                break;
                            default:
                                return;
                                break
                            }
                            r.ready = true
                        } catch (p) {
                            Error.report(p,
                                "GENERICERROR#; handle Customs")
                        }
                    }
                };
                t.open = function () {
                    var t = e("<div />");
                    var r = 0;
                    for (var s in n) {
                        if (!n.hasOwnProperty(s)) {
                            continue
                        }
                        var o = n[s];
                        var u = e(
                                '<div title="#EDIT#" style="display:inline-block;vertical-align:top;height:16px;width:16px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/window/messages/head-icons.png') repeat scroll 0 16px transparent;\" />")
                            .click(function (e) {
                                return function () {
                                    c(e)
                                }
                            }(s));
                        var a = e(
                                '<div title="#DELETE#" style="display:inline-block;vertical-align:top;height:16px;width:16px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/icons/delete.png') repeat scroll 0px 0px transparent;\" />")
                            .click(function (e) {
                                return function () {
                                    f(e)
                                }
                            }(s));
                        t
                            .append(e(
                                    '<div style="display:block;height:18px;padding: 3px 0px 0px 0px;border-bottom: 1px solid #666" />')
                                .append(
                                    '<div style="display:inline-block;vertical-align:top;height:16px;width:300px;overflow:hidden;" title="' + String(o.name)
                                    .escapeHTML() + '" >' + String(o.name)
                                    .escapeHTML() + "</div>")
                                .append(u).append(a));
                        r++
                    }
                    if (r < 15) {
                        t
                            .append(e(
                                    '<div title="#ADD#" style="display:block;margin-top:2px;vertical-align:top;height:20px;width:25px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/window/messages/icons.png') repeat scroll 72px -5px transparent;\" />")
                                .click(function () {
                                    l()
                                }))
                    }
                    i = (new GameAPI.gui.dialog("#CUSTOM#", t))
                        .addButton("ok", function () {
                            DataManager.loadData()
                        }).show()
                };
                var f = function (e) {
                    if (!isDefined(n[e])) {
                        return

                    }
                    var r = function () {
                        var r = n;
                        var s = 0;
                        n = {};
                        for (var o in r) {
                            if (!r.hasOwnProperty(o)) {
                                continue
                            }
                            if (o == e) {
                                continue
                            }
                            s++;
                            n[s] = r[o];
                            n[s].id = s
                        }
                        i.hide();
                        t.open()
                    };
                    (new GameAPI.gui.dialog("#DELETE# - #CUSTOM#",
                        "#DELETE#: " + String(n[e].name).escapeHTML() + "?")).addButton("ok", r)
                        .addButton("cancel").show()
                };
                var l = function () {
                    var e = 0;
                    for (var t in n) {
                        if (!n.hasOwnProperty(t)) {
                            continue
                        }
                        e++
                    }
                    if (e >= 15) {
                        (new UserMessage("#CLOTHCALC_TOOMUCH#",
                            UserMessage.TYPE_ERROR)).show()
                    } else {
                        e++;
                        c(e)
                    }
                };
                var c = function (t) {
                    if (isDefined(n[t])) {
                        var r = n[t].name;
                        var i = JSON.stringify({
                            type: n[t].type,
                            para: n[t].para
                        });
                        var s = "#EDIT# - #CUSTOM#"
                    } else {
                        var r = "";
                        var i = "";
                        var s = "#ADD# - #CUSTOM#"
                    }
                    var o = (new GameAPI.gui.textfield(
                            "twdb_cc_custom_name")).setSize(30)
                        .setValue(r);
                    var u = (new GameAPI.gui.textfield(
                            "twdb_cc_custom_name")).setSize(30)
                        .setValue(i);
                    var a = function () {};
                    var f = e('<table width="400px" />')
                        .append(
                            e("<tr />")
                            .append(
                                '<td style="vertical-align:middle">#NAME#:</td>')
                            .append(
                                e("<td />")
                                .append(
                                    o
                                    .getMainDiv())))
                        .append(
                            e("<tr />")
                            .append(
                                '<td style="vertical-align:middle">#CODE#:</td>')
                            .append(
                                e("<td />")
                                .append(
                                    u
                                    .getMainDiv())))
                        .append(
                            e('<tr><td colspan="2">#CLOTHCALC_CUSTOMHELP# <a href="http://' + Script.url + '/?strana=calc" target="_blank">tw-db.info #CALCULATOR#</a></td></tr>'));
                    (new GameAPI.gui.dialog(s, f)).addButton("ok", a)
                        .addButton("cancel").show()
                };
                t.getCustoms = function () {
                    return ClothCalc.data.custom
                };
                t.debug = function () {
                    return n
                };
                return t
            }($);
            Debugger.Customs = Customs;
            var Forum = function (e) {
                var t = {};
                var n = {};
                var r = function () {
                    if (n.ready) {
                        return

                    }
                    if (Settings.get("forumlastpage", true)) {
                        e("#windows").on(
                            "DOMNodeInserted",
                            "iframe",
                            function () {
                                e("iframe[src='forum.php']").load(
                                    function () {
                                        i()
                                    })
                            })
                    }
                    n.ready = true
                };
                n = Loader.add("Forum", "tw-db Forum", r, {
                    Settings: true
                });
                var i = function () {
                    var t = e('iframe[src="forum.php"]').contents();
                    if (t.find("#thread_overview").length == 1) {
                        t
                            .find(".row")
                            .each(
                                function (t) {
                                    var n = Math.floor(e(this)
                                        .find(".cell_4")
                                        .html() / 10) + 1;
                                    var r = e(this).find(
                                        ".cell_1 a").attr(
                                        "onclick").match(
                                        /\d+/);
                                    e(this)
                                        .find(".cell_3")
                                        .append(
                                            '<img src="' + Game.forumURL + '/the-west/buttons/lastpost.gif" style="position:absolute;cursor:pointer;margin-left:3px;" onclick="Forum.openThread(' + r + ", " + n + ')"></img>')
                                })
                    }
                };
                return t
            }($);
            Debugger.Forum = Forum;

            /////////////////////////////
            //
            //  Object for DuelMotivation Bar : 
            //  Methods:
            //
            /////////////////////////////
            var DuelMotivation = (function ($) {
                var _self = {};
                var bar = null;
                var loader = {};
                var lastDeath = null;
                var kotimeout = 0;
                var kotime = null;
                var kotimeStr = "";
                var countdown = 0;
                var synctimer = 0;

                var init = function () {
                    if (loader.ready) {
                        return;
                    };
                    if (!Settings.get('duelmotivation', true)) {
                        loader.ready = true;
                        return;
                    };
                    addBar();
                    GameInject.injectSetDuelMotivation(function () {
                        refresh();
                    });
                    GameInject.injectReportReceivedEntry(function (data) {
                        if (data.type == 'duel') {
                            getMoti();
                        }
                    });
                    if (w.Character.homeTown.town_id != 0) { // we want KO timer only if in town
                        EventHandler.listen(['character_died', 'health'], function () {
                            if (Character.health > 5) {
                                return;
                            }; // safety value of 5, HP regenerate quite fast if you're a HP monster
                            checkSheriff();
                        });
                        var now = new ServerDate().getTime(); // takes care of client-server offset
                        if ((Character.lastDied + 172800) * 1e3 > now) { // if last death is less than 48h ago
                            lastDeath = TWDB.Cache.load('lastDeath');
                            if (Math.abs((new Date(lastDeath)).getTime() - (new Date(Character.lastDied * 1e3)).getTime()) < 1e4) { // 10sec rounding safety 
                                kotime = new Date((Character.lastDied + 172800) * 1e3);
                                kotimeout = parseInt((kotime.getTime() - now) / 1000);
                                initCountdown();
                            } else {
                                checkSheriff();
                            }
                        } else {
                            getMoti();
                        };
                    } else {
                        getMoti();
                    };
                    loader.ready = true;
                };

                loader = Loader.add('DuelMotivation', 'tw-db DuelMotivation', init, {
                    'Settings': true
                });

                var addBar = function () {
                    $('#ui_character_container').css({
                        'background-repeat': 'no-repeat',
                        'height': '191px'
                    });
                    var container = $('<div />').css({
                        'background-image': $('#ui_character_container').css('background-image'),
                        'background-repeat': 'no-repeat',
                        'background-position': 'bottom left',
                        'width': '143px',
                        'height': '15px',
                        'position': 'absolute',
                        'left': '0px',
                        'top': '173px',
                        'padding-top': '2px',
                    });
                    $('.energy_bar').before(container);
                    bar = $('<div class="status_bar">').css({
                        'top': '2px',
                        'left': '3px'
                    });
                    if (Premium.hasBonus('regen')) {
                        bar.css({
                            'background-position': '-137px -13px'
                        })
                    } else {
                        bar.css({
                            'background-position': '-137px -26px'
                        });
                    }
                    container.append(bar);
                    $('.energy_add').css({
                        'top': '161px'
                    });
                };

                var getMoti = function () {
                    if (kotimeout > 0) {
                        return;
                    }; // no need to check if you're KOed      	  
                    Ajax.remoteCall('duel', 'get_data', {}, function (json) {
                        if (json.error) {
                            return new UserMessage(json.msg).show();
                        }
                        window.Character.setDuelMotivation(json.motivation);
                        refresh();
                    });
                };

                var checkSheriff = function () {
                    if (w.Character.homeTown.town_id == 0) {
                        return;
                    }; // no Sheriff without town
                    Ajax.remoteCallMode('building_sheriff', 'index', {
                        town_id: w.Character.homeTown.town_id
                    }, function (json) {
                        if (json.error) {
                            return new UserMessage(json.msg).show();
                        }
                        if (json.timeleft > 0) {
                            kotimeout = json.timeleft;
                            kotime = new Date((new ServerDate).getTime() + kotimeout * 1e3);
                            TWDB.Cache.save('lastDeath', (lastDeath = new Date(parseInt(kotime.getTime() / 1e3 - 172800) * 1e3).toJSON()));
                            initCountdown();
                        } else {
                            getMoti();
                        };
                    });
                };

                var initCountdown = function () {
                    if (countdown) {
                        w.clearInterval(countdown);
                    };
                    kotimeStr = kotime.toLocaleString();
                    bar.css({
                            "background-position": "0px 0px"
                        }).addClass("koblink")
                        .click(function () {
                            bar.removeClass("koblink").stop(true, false).css({
                                opacity: 1
                            });
                        });
                    countdown = w.setInterval(function () {
                        refresh();
                    }, 1000);
                    refresh();
                };

                var refresh = function () {
                    if (kotimeout > 0) {
                        if (++synctimer >= 180) { // recalculate exact duration only every ~3min
                            kotimeout = parseInt((kotime.getTime() - (new ServerDate).getTime()) / 1e3);
                            synctimer = 0
                        } else {
                            kotimeout--; // otherwise -1 because our interval is 1sec
                        }
                        if (kotimeout <= 0) {
                            w.clearInterval(countdown);
                            bar.text('').stop(true, true).css({
                                opacity: 1
                            }).removeMousePopup();
                            getMoti();
                            return;
                        }
                        var timeStr = kotimeout.formatDuration();
                        bar.text(timeStr).addMousePopup("#KOTIME#:&nbsp;" + timeStr + "<br />(" + kotimeStr + ")");
                        if ((kotimeout <= 1800) && bar.hasClass("koblink") && (synctimer % 9 === 0)) {
                            bar.fadeTo(500, .5).fadeTo(500, 1); // blink effect if remaining time < 30m
                        }
                        return;
                    } // <-- if we are KOed; otherwise show motivation ... v v v
                    var motivation = Math.round(Character.duelMotivation * 100);
                    if (Premium.hasBonus('regen')) {
                        bar.css({
                            'background-position': '-' + Math.floor(137 - motivation * 1.37) + 'px -13px'
                        });
                    } else {
                        bar.css({
                            'background-position': '-' + Math.floor(137 - motivation * 1.37) + 'px -26px'
                        });
                    }
                    bar.text(motivation + '%').addMousePopup('#DUELMOTIVATION#:&nbsp;' + motivation + '%');
                };            
                return _self;
            })($);
            Debugger.DuelMotivation = DuelMotivation;

            var Bank = function (e) {
                var t = {};
                var n = true;
                var r = {};
                var i = function () {
                    if (r.ready) {
                        return

                    }
                    if (Settings.get("autodeposit", true)) {
                        EventHandler.listen("position_change",
                            function () {
                                u()
                            });
                        u()
                    }
                    if (Settings.get("deposit", true)) {
                        s()
                    }
                    r.ready = true
                };
                r = Loader.add("Bank", "tw-db Bank", i, {
                    Settings: true
                });
                var s = function () {
                    btn = GameInject.CharacterButton
                        .add(Images.buttonBank);
                    btn.click(function () {
                        o()
                    }).addMousePopup("#DEPOSIT#")
                };
                var o = function () {
                    (new GameAPI.gui.dialog("#DEPOSIT#",
                        e("<span>#MONEY#: " + w.Character.money + "</span>"))).setIcon(
                        GameAPI.gui.dialog.SYS_QUESTION).setIcon(
                        GameAPI.gui.dialog.SYS_QUESTION).setModal(
                        true,
                        false, {
                            bg: w.Game.cdnURL + "/images/curtain_bg.png",
                            opacity: .4
                        }).addButton("yes", function () {
                        a(1)
                    }).addButton("no", function () {}).show()
                };
                var u = function () {
                    try {
                        if (w.Character.homeTown.town_id == 0 || w.Character.money <= 10) {
                            n = true;
                            return

                        }
                        if (w.Character.position.x == w.Character.homeTown.x && w.Character.position.y == w.Character.homeTown.y) {
                            if (n) {
                                n = false;
                                (new GameAPI.gui.dialog(
                                    "#DEPOSIT#",
                                    e("<span>#DEPOSITDESC# <br />#MONEY#: " + w.Character.money + "</span>")))
                                .setIcon(
                                        GameAPI.gui.dialog.SYS_QUESTION)
                                    .setIcon(
                                        GameAPI.gui.dialog.SYS_QUESTION)
                                    .setModal(
                                        true,
                                        false, {
                                            bg: w.Game.cdnURL + "/images/curtain_bg.png",
                                            opacity: .4
                                        })
                                    .addButton(
                                        "yes",
                                        function () {
                                            n = true;
                                            a(w.Character.homeTown.town_id)
                                        }).addButton("no",
                                        function () {}).show()
                            }
                        } else {
                            n = true
                        }
                    } catch (t) {
                        Error.report(t, "autoDeposit")
                    }
                };
                var a = function (e) {
                    if (w.Character.money <= 0) {
                        return

                    }
                    w.BankWindow.townid = e;
                    w.BankWindow.DOM = (new GameAPI.gui.textfield(
                            "tb_balance_input_" + w.BankWindow.townid))
                        .setSize(10).setValue(w.Character.money)
                        .getMainDiv();
                    w.BankWindow.Balance.add()
                };
                return t
            }($);
            Debugger.Bank = Bank;
            var Market = function (e) {
                var t = {};
                var n = false;
                var r = false;
                var i = {};
                var s = {};
                var o = function () {
                    if (s.ready) {
                        return

                    }
                    if (Settings.get("marketmap", true)) {
                        GameInject.addTabOnMarketWindow("#MARKETMAP#",
                            "marketmap", function () {
                                l()
                            })
                    }
                    if (Settings.get("marketreminder", true)) {
                        GameInject.MarketOfferTable(function (e) {
                            u(e)
                        });
                        GameInject.MarketWatchlistTable(function (e) {
                            a(e)
                        });
                        f.init()
                    }
                    s.ready = true
                };
                s = Loader.add("Market", "tw-db Market", o, {
                    Settings: true
                });
                var u = function (t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        var i = e('<div class="mpo_alert" />');
                        e(MarketWindow.offerTable.getMainDiv())
                            .children().find(
                                ".marketBidsData_" + r.market_offer_id)
                            .append(i);
                        if (!r.isFinished) {
                            i.append(getReminderImg(r))
                        }
                    }
                };
                var a = function (t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        var i = e('<div class="mpo_alert" />');
                        e(MarketWindow.watchlistTable.getMainDiv())
                            .children().find(
                                ".marketWatchData_" + r.market_offer_id)
                            .append(i);
                        if (!r.isFinished) {
                            i.append(getReminderImg(r))
                        }
                    }
                };
                getReminderImg = function (t) {
                    var n = e('<img src="' + Images.iconAlarm + '" />')
                        .css({
                            cursor: "pointer"
                        });
                    n.click(function (e, t) {
                        return function () {
                            f.create(e, t)
                        }
                    }(t, n));
                    if (f.exists(t.market_offer_id) === false) {
                        n.css("opacity", .5)
                    } else {}
                    return n
                };
                var f = function (e) {
                    var t = {};
                    var n = {};
                    var r = {};
                    t.init = function () {
                        var e = Cache.load("marketreminder");
                        if (isDefined(e)) {
                            n = e
                        }
                        for (var t in n) {
                            i(t)
                        }
                    };
                    t.exists = function (e) {
                        if (isDefined(n[e])) {
                            return true
                        } else {
                            return false
                        }
                    };
                    var i = function (e) {
                        var t = n[e];
                        var r = t.ends * 1e3 - (new Date).getTime() - t.reminder * 60 * 1e3;
                        if (r < 0) {
                            r = 100
                        }
                        t.timer = setTimeout(function (e) {
                            return function () {
                                u(e)
                            }
                        }(e), r)
                    };
                    var s = function (e, r, s) {
                        var o = parseInt(r.getValue());
                        if (isNaN(o) || o < 1) {
                            t.create(e, s);
                            return

                        }
                        if ((new Date).getTime() / 1e3 + o * 60 >= e.auction_end_date) {
                            (new UserMessage("#REMINDERTOOLATE#"))
                            .show();
                            t.create(e, s);
                            return

                        }
                        if (t.exists(e.market_offer_id)) {
                            clearTimeout(n[e.market_offer_id].timer);
                            delete n[e.market_offer_id].timer
                        }
                        n[e.market_offer_id] = {
                            ends: e.auction_end_date,
                            reminder: o,
                            id: e.market_offer_id,
                            item: e.item_id
                        };
                        Cache.save("marketreminder", n);
                        i(e.market_offer_id)
                    };
                    var o = function (e) {
                        delete n[e];
                        Cache.save("marketreminder", n)
                    };
                    var u = function (t) {
                        var r = n[t];
                        var i = ItemManager.get(r.item);
                        var s = new OnGoingEntry;
                        s.init();
                        s.setTooltip("#AUCTION#: " + i.name + ", #END#: " + Number(
                                r.ends - (new Date).getTime() / 1e3)
                            .getTimeString4Timestamp());
                        s.setImage(e('<img src="' + Images.notiBell + '" />'));
                        WestUi.NotiBar.add(s);
                        TitleTicker.setNotifyMessage("#AUCTION#: " + i.name + ", #END#: " + Number(
                                r.ends - (new Date).getTime() / 1e3)
                            .getTimeString4Timestamp());
                        AudioController
                            .play(AudioController.SOUND_NEWMSG);
                        o(t)
                    };
                    t.create = function (r, i) {
                        var u = e("<div />");
                        u
                            .append('<span style="position:relative; width:100%;display:block;">#AUCTIONEND#: ' + r.auction_ends_in
                                .getTimeString4Timestamp() + "</span>");
                        var a = (new GameAPI.gui.textfield(
                                "twdb_analyser_last")).maxlength(4)
                            .onlyNumeric().setLabel(
                                "#REMINDBEFORE#: ")
                            .setPlaceholder("#MINUTES#");
                        u.append(a.getMainDiv());
                        if (t.exists(r.market_offer_id)) {
                            a.setValue(n[r.market_offer_id].reminder);
                            i.css("opacity", 1)
                        } else {
                            i.css("opacity", .5)
                        }
                        var i = i;
                        var f = (new GameAPI.gui.dialog(
                                "#MARKETREMINDER#", u))
                            .setIcon(
                                GameAPI.gui.dialog.SYS_QUESTION)
                            .setIcon(
                                GameAPI.gui.dialog.SYS_QUESTION)
                            .setModal(
                                true,
                                false, {
                                    bg: w.Game.cdnURL + "/images/curtain_bg.png",
                                    opacity: .4
                                }).addButton("ok", function () {
                                i.css("opacity", 1);
                                s(r, a, i)
                            });
                        if (t.exists(r.market_offer_id)) {
                            f.addButton("#DELETE#", function () {
                                o(r.market_offer_id);
                                i.css("opacity", .5)
                            })
                        }
                        f.addButton("cancel", function () {}).show()
                    };
                    return t
                }(e);
                var l = function () {
                    try {
                        window.MarketWindow.window.showLoader();
                        window.MarketWindow.window.setTitle(
                                "#MARKETMAP#").setSize(840, 655)
                            .addClass("premium-buy");
                        var t = -111;
                        var s = -1;
                        r = e('<div style="position:relative;display:block;margin:10px 9px 10px 9px;width:770px;height:338px;" />');
                        for (var o = 1; o < 16; o++) {
                            if (o == 8) {
                                s += 169;
                                t = -111
                            }
                            t += 110;
                            var u = e('<img style="position:absolute;border:1px solid #000;width:110px;height:169px;left:' + t + "px;top:" + s + 'px;" src="' + Game.cdnURL + "/images/map/minimap/county_" + o + '.jpg" />');
                            if (o == 4) {
                                u.css({
                                    height: "114px"
                                })
                            } else {
                                if (o == 11) {
                                    u.css({
                                        height: "114px",
                                        top: s + 55 + "px"
                                    })
                                } else {
                                    if (o == 15) {
                                        u.css({
                                            height: "108px",
                                            width: "109px",
                                            left: "329px",
                                            top: "114px"
                                        })
                                    }
                                }
                            }
                            r.append(u)
                        }
                        n = e("<div />").append(r);
                        e(MarketWindow.window.getContentPane()).find(
                                ".marketplace-marketmap").children()
                            .remove();
                        e(MarketWindow.window.getContentPane()).find(
                            ".marketplace-marketmap").append(n);
                        i = {};
                        h();
                        p();
                        d();
                        v();
                        window.MarketWindow.window.hideLoader()
                    } catch (a) {
                        Error.report(a, "Market")
                    }
                };
                var c = function (e, t, n, r, s, o, u) {
                    if (!isDefined(i[e])) {
                        i[e] = {};
                        i[e]["name"] = t;
                        i[e]["town_id"] = e;
                        i[e]["x"] = n;
                        i[e]["y"] = r;
                        i[e]["count"] = 0;
                        i[e]["offers_end"] = {};
                        i[e]["offers_unend"] = {};
                        i[e]["money"] = 0;
                        i[e]["distance"] = window.Map.calcWayTime(
                            window.Character.position, {
                                x: n,
                                y: r
                            }).formatDuration()
                    }
                    var a = i[e];
                    if (s != "") {
                        if (!isDefined(a["offers_end"][s["item_id"]])) {
                            a["count"]++;
                            a["offers_end"][s["item_id"]] = s
                        } else {
                            a["offers_end"][s["item_id"]]["count"] += s["count"]
                        }
                    }
                    if (o != "") {
                        if (!isDefined(a["offers_unend"][o["item_id"]])) {
                            a["count"]++;
                            a["offers_unend"][o["item_id"]] = o
                        } else {
                            a["offers_unend"][o["item_id"]]["count"] += o["count"]
                        }
                    }
                    if (u != 0) {
                        a["money"] += u
                    }
                };
                var h = function () {
                    e
                        .ajax({
                            url: "game.php?window=building_market&action=fetch_bids&h=" + Player.h,
                            type: "POST",
                            data: {},
                            dataType: "json",
                            async: false,
                            success: function (e) {
                                var t = e.msg.search_result;
                                for (var n = 0; n < t.length; n++) {
                                    if (t[n]["auction_ends_in"] < 0 || t[n]["current_bid"] == t[n]["max_price"]) {
                                        var r = new Object;
                                        r["item_id"] = t[n].item_id;
                                        r["count"] = t[n].item_count;
                                        var i = ""
                                    } else {
                                        var i = new Object;
                                        i["item_id"] = t[n].item_id;
                                        i["count"] = t[n].item_count;
                                        var r = ""
                                    }
                                    c(t[n].market_town_id,
                                        t[n].market_town_name,
                                        t[n].market_town_x,
                                        t[n].market_town_y, r,
                                        i, 0)
                                }
                            }
                        })
                };
                var p = function () {
                    e
                        .ajax({
                            url: "game.php?window=building_market&action=fetch_offers&h=" + Player.h,
                            type: "POST",
                            data: {},
                            dataType: "json",
                            async: false,
                            success: function (e) {
                                var t = e.msg.search_result;
                                for (var n = 0; n < t.length; n++) {
                                    c(t[n].market_town_id,
                                        t[n].market_town_name,
                                        t[n].market_town_x,
                                        t[n].market_town_y, "",
                                        "", t[n].current_bid)
                                }
                            }
                        })
                };
                var d = function () {
                    for (town_id in i) {
                        var t = i[town_id];
                        var n = '<div style="max-width: 305px;"><b>' + t.name + "</b>" + (t["money"] == 0 ? "" : " " + t["money"] + "$") + "<br/>";
                        var s = 0;
                        for (item_id in t["offers_end"]) {
                            s++;
                            if (s > 19) {
                                n += " ... ";
                                break
                            }
                            var o = t["offers_end"][item_id];
                            if (t["offers_end"][item_id] != 0) {
                                n += '<div class="item item_inventory"><img width="53" height="53" src="' + ItemManager.get(item_id).image + '" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>' + o.count + "</p></span></div>"
                            }
                        }
                        for (item_id in t["offers_unend"]) {
                            s++;
                            if (s > 19) {
                                n += " ... ";
                                break
                            }
                            var o = t["offers_unend"][item_id];
                            if (t["offers_unend"][item_id] != 0) {
                                n += '<div style="opacity:0.35" class="item item_inventory"><img width="53" height="53" src="' + ItemManager.get(item_id).image + '" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>' + o.count + "</p></span></div>"
                            }
                        }
                        n += "</div>";
                        e("<img />")
                            .css({
                                left: t.x / (181 * window.Map.tileSize) * 770 - 8 + "px",
                                top: t.y / (79 * window.Map.tileSize) * 338 - 8 + "px",
                                "background-image": "url(" + Images.point.red + ")"
                            }).attr({
                                "class": "mmap_mappoint",
                                id: town_id,
                                title: n
                            }).click(function (e) {
                                return function () {
                                    TownWindow.open(e.x, e.y)
                                }
                            }(t)).appendTo(r)
                    }
                    e("<img />").css({
                        left: Character.position.x / (181 * window.Map.tileSize) * 770 - 8 + "px",
                        top: Character.position.y / (79 * window.Map.tileSize) * 338 - 8 + "px",
                        "background-image": "url(" + Images.point.blue + ")"
                    }).attr({
                        "class": "mmap_mappoint",
                        id: "mmap_icon_pos",
                        title: "#YOURPOSITION#"
                    }).appendTo(r)
                };
                var v = function () {
                    try {
                        var t = [];
                        for (var r in i) {
                            t.push({
                                id: r,
                                distance: i[r].distance
                            })
                        }
                        t.sort(function (e, t) {
                            return e.distance == t.distance ? 0 : e.distance > t.distance ? 1 : -1
                        });
                        var s = "";
                        for (var o = 0; o < t.length; o++) {
                            var u = i[t[o].id];
                            s += '<div><a onclick="TownWindow.open(' + u.x + ", " + u.y + ');">' + u.name + "</a>" + ' <a title="#SHOWTOWN#" onclick="Map.center(' + u["x"] + ", " + u["y"] + ')"><img src="' + Game.cdnURL + '/images/icons/center.png" /></a>' + " #DISTANCE#: " + u["distance"] + ' <a title="#TOWNWALK#" onclick="TaskQueue.add(new TaskWalk(' + u.town_id + ",'town'))\"><img src=\"" + Game.cdnURL + '/images/map/icons/instantwork.png"></a>' + (u["money"] == 0 ? "" : " " + u["money"] + "$") + "<br />";
                            for (item_id in u["offers_end"]) {
                                var a = u["offers_end"][item_id];
                                if (u["offers_end"][item_id] != 0) {
                                    var f = new ItemPopup(ItemManager
                                        .get(item_id));
                                    s += '<div class="item item_inventory" title="' + f.getXHTML().escapeHTML() + '"><img width="53" height="53" src="' + ItemManager.get(item_id).image + '" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>' + a.count + "</p></span></div>"
                                }
                            }
                            for (item_id in u["offers_unend"]) {
                                var a = u["offers_unend"][item_id];
                                if (u["offers_unend"][item_id] != 0) {
                                    var f = new ItemPopup(ItemManager
                                        .get(item_id));
                                    s += '<div style="opacity:0.35" class="item item_inventory" title="' + f.getXHTML().escapeHTML() + '"><img width="53" height="53" src="' + ItemManager.get(item_id).image + '" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>' + a.count + "</p></span></div>"
                                }
                            }
                            s += "</div>";
                            for (var l = 0; l <= (u.count - u.count % 12) / 12; l++) {
                                s += u.count == 0 ? "<br/>" : "<br/><br/><br/><br/>"
                            }
                        }
                        var c = new GameAPI.gui.scrollpane;
                        e(c.getMainDiv()).css({
                            height: "200px",
                            "margin-left": "8px"
                        });
                        c.appendContent(s);
                        n.append(c.getMainDiv())
                    } catch (h) {
                        Error.report(h, "Market createTownList")
                    }
                };
                return t
            }($);
            Debugger.Market = Market;
            var Fort = function ($) {
                var _self = {};
                var loader = {};
                var init = function () {
                    if (loader.ready) {
                        return

                    }
                    if (Settings.get("enhancedfortrecruitment", true)) {
                        inject()
                    }
                    loader.ready = true
                };
                loader = Loader.add("Fort", "tw-db Fort", init, {
                    Settings: true
                });
                var inject = function () {
                    try {
                        var gradeValues = {
                            TRAITOR: "-2",
                            RESERVIST: "-1",
                            RECRUIT: "0",
                            PRIVATE: "1",
                            CAPTAIN: "2",
                            GENERAL: "3"
                        };
                        var gradeNames = {
                            "-2": "traitor",
                            "-1": "reservist",
                            0: "recruit",
                            1: "private",
                            2: "captain",
                            3: "general"
                        };
                        var getGradeImg = function (e, t, n, r) {
                            try {
                                return '<img class="' + (n || "") + '" src="' + window.Game.cdnURL + "/images/chat/servicegrade_" + gradeNames[e] + '.png" title="' + (t ? window.Chat.rankTitles[gradeNames[e]]
                                    .escapeHTML() : "") + (isDefined(r) && r != "" ? " (" + r + ")" : "") + '" />'
                            } catch (i) {
                                Error.report(i, "getGradeImg")
                            }
                        };
                        var newfunction = String(FortBattleWindow.updateRecruitlist);
                        newfunction = newfunction
                            .replace(
                                /totalCnt\s{0,1}=\s{0,1}0;/,
                                " totalCnt = 0 , totalCntTotal = 0 , gradeCountTotal = { '-2': 0, '-1': 0, '0': 0, '1': 0, '2': 0, '3': 0 };");
                        newfunction = newfunction
                            .replace(/gradeCount\[g\]/,
                                "gradeCount[g] + ' [' + gradeCountTotal[g] + ']'");
                        newfunction = newfunction
                            .replace(/\+\s{0,1}totalCnt\s{0,1}\+/,
                                "+ totalCnt + ' [' + totalCntTotal + ']' +");
                        newfunction = newfunction
                            .replace(
                                /if\(this\.preBattle\.isHidden\(list\[i\]\['class'\],'rank_'\+priv\)\)continue;/g,
                                "totalCntTotal++;gradeCountTotal[priv]++;if(this.preBattle.isHidden(list[i]['class'],'rank_'+priv,list[i].coords.x,list[i].coords.y))continue;");
                        newfunction = newfunction
                            .replace(
                                /getGradeImg\(priv,true,'recruitplayer recruitplayer-'\+i\)/g,
                                "getGradeImg(priv,true,'recruitplayer recruitplayer-'+i,list[i].officername||'')");
                        newfunction = newfunction
                            .replace(
                                /\.addColumns\(\['count','name','town','rank','class','status','evaluated'\]\)/g,
                                ".addColumns(['count','name','town','rank','class','status','healthpoints'])");
                        newfunction = newfunction
                            .replace(
                                /\.appendToThCell\('head','evaluated',.*,.*\);var list=/g,
                                ".appendToThCell('head','healthpoints','#ORDER_HEALTH#','<span class=\"sort sort-healthpoints\">'+'Lp'+'</span>');var list=");
                        newfunction = newfunction
                            .replace(
                                /evaluated:list\[i\]\.officername\|\|''/g,
                                "healthpoints:'<p style=\"font-weight: 700; color: '+((this.preBattle.battleData.fortCoords.x-list[i].coords.x==0&&this.preBattle.battleData.fortCoords.y-list[i].coords.y==0) ? 'rgb(0, 153, 0)' : ((Math.abs(this.preBattle.battleData.fortCoords.x-list[i].coords.x)<=500&&Math.abs(this.preBattle.battleData.fortCoords.y-list[i].coords.y)<=500) ? 'rgb(255, 119, 0)' : 'rgb(255, 0, 0)'))+'\">'+list[i].currhealth+'/'+list[i].maxhealth+'</p>'");
                        eval("FortBattleWindow.updateRecruitlist=(function(){ var lastStamp; return " + newfunction + "})();");
                        var newfunction = String(PreBattle.getSortedPlayerlist);
                        newfunction = newfunction.replace(
                            /pa\s{0,1},\s{0,1}pb\s{0,1}\)/g,
                            "pa,pb,that)");
                        eval("PreBattle.getSortedPlayerlist = " + newfunction);
                        var fb_sort = String(FortBattleWindow.recruitListClick);
                        fb_sort = "FortBattleWindow.recruitListClick=" + fb_sort;
                        fb_sort = fb_sort
                            .replace(
                                /var hidden=function\(classKey,privKey\){return that\.preBattle\.isHidden\(classKey,'rank_'\+privKey\);};/g,
                                "var hidden=function(classKey,privKey, location){return that.preBattle.isHidden(classKey,'rank_'+privKey, null, null, location);};");
                        fb_sort = fb_sort
                            .replace(
                                /return{message:sorting,title:title};/g,
                                "else if(key=='healthpoints'){title='#ORDER_HEALTH#';sorting.append(getSortLink('#SORT_CURRENT_HEALTH_ASC#','>currhealth'));sorting.append(getSortLink('#SORT_CURRENT_HEALTH_DESC#','<currhealth')); sorting.append(getSortLink('#SORT_MAX_HEALTH_ASC#','>maxhealth'));sorting.append(getSortLink('#SORT_MAX_HEALTH_DESC#','<maxhealth'));sorting.append('<br />');sorting.append(getSortLink('#SORT_DISTANCE_ASC#','>distance'));sorting.append(getSortLink('#SORT_DISTANCE_DESC#','<distance'));sorting.append(getVisLink(hidden(null,'-3','atfort')?'#SHOW_PLAYER_AT_FORT#':'#HIDE_PLAYER_AT_FORT#','atfort'));sorting.append(getVisLink(hidden(null,'-3','nearbyfort')?'#SHOW_PLAYER_NEAR_FORT#':'#HIDE_PLAYER_NEAR_FORT#','nearbyfort'));sorting.append(getVisLink(hidden(null,'-3','notatfort')?'#SHOW_PLAYER_NOTAT_FORT#':'#HIDE_PLAYER_NOTAT_FORT#','notatfort'));}return{message:sorting,title:title};");
                        eval(fb_sort);
                        PreBattle.recruitSorting.currhealth = function (
                            e, t, n) {
                            return n ? e.currhealth == t.currhealth : e.currhealth < t.currhealth
                        };
                        PreBattle.recruitSorting.maxhealth = function (
                            e, t, n) {
                            return n ? e.maxhealth == t.maxhealth : e.maxhealth < t.maxhealth
                        };
                        PreBattle.recruitSorting.distance = function (e,
                            t, n, r, i, s) {};
                        PreBattle.isHidden = function (e, t, n, r, i) {
                            if (i == null) {
                                var s = this.battleData.fortCoords.x - n;
                                var o = this.battleData.fortCoords.y - r;
                                var u = "notatfort";
                                if (s == 0 && o == 0) {
                                    u = "atfort"
                                } else if (Math.abs(s) <= 500 && Math.abs(o) <= 500) {
                                    u = "nearbyfort"
                                }
                            } else if (i != null) {
                                var u = i
                            }
                            return e != undefined && this.recruitlistVisibility[e] || t != undefined && this.recruitlistVisibility[t] || u != undefined && this.recruitlistVisibility[u]
                        }
                    } catch (e) {
                        Error.report(e, "Fort")
                    }
                };
                return _self
            }($);
            Debugger.Fort = Fort;
            var CCstarter = function (e) {
                var t = {};
                var n = {};
                var r = function () {
                    if (n.ready) {
                        return

                    }
                    ClothCalc.ready = n.ready;
                    ClothCalc.init();
                    n.ready = true
                };
                n = Loader.add("ClothCalc", "tw-db ClothCalc", r, {});
                return t
            }($);
            Debugger.CCstarter = CCstarter;
            if ((w.location.href.indexOf(".the-west.") != -1 || w.location.href
                .indexOf(".tw.innogames.") != -1) && w.location.href.indexOf("game.php") != -1) {
                Loader.init()
            }
        })(jQuery)

        // END OF EDITABLE AREA

    }
});