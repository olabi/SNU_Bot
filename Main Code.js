const scriptName = "메신저봇r";
var a = { "0": "███ ", "1": "░░█ ", "2": "███ ", "3": "███ ", "4": "█░█ ", "5": "███ ", "6": "███ ", "7": "███ ", "8": "███ ", "9": "███ " };
var b = { "0": "█░█ ", "1": "░░█ ", "2": "░░█ ", "3": "░░█ ", "4": "█░█ ", "5": "█░░ ", "6": "█░░ ", "7": "░░█ ", "8": "█░█ ", "9": "█░█ " };
var c = { "0": "█░█ ", "1": "░░█ ", "2": "███ ", "3": "███ ", "4": "███ ", "5": "███ ", "6": "███ ", "7": "░░█ ", "8": "███ ", "9": "███ " };
var d = { "0": "█░█ ", "1": "░░█ ", "2": "█░░ ", "3": "░░█ ", "4": "░░█ ", "5": "░░█ ", "6": "█░█ ", "7": "░░█ ", "8": "█░█ ", "9": "░░█ " };
var e = { "0": "███ ", "1": "░░█ ", "2": "███ ", "3": "███ ", "4": "░░█ ", "5": "███ ", "6": "███ ", "7": "░░█ ", "8": "███ ", "9": "███ " };

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        if (msg == ".시간") {
            var 날짜 = new Date();
            var H = String(날짜.getHours());
            var M = String(날짜.getMinutes());

            if (H.length == (1)) {
                H = "0" + H;
            }
            if (M.length == (1)) {
                M = "0" + M;
            }

            replier.reply(
                a[H[0]] + a[H[1]] + "░ " + a[M[0]] + a[M[1]]
                + "\n" + b[H[0]] + b[H[1]] + "█ " + b[M[0]] + b[M[1]]
                + "\n" + c[H[0]] + c[H[1]] + "░ " + c[M[0]] + c[M[1]]
                + "\n" + d[H[0]] + d[H[1]] + "█ " + d[M[0]] + d[M[1]]
                + "\n" + e[H[0]] + e[H[1]] + "░ " + e[M[0]] + e[M[1]]);

        }
    } catch (e) {
        replier.reply(e);
    }
    if (msg.startsWith("성?")) {
        var query = msg.substr(2).trim();
        var url = "https://vapis.run.goorm.site/api/chatgpt?plusId=FZpOMB_kQZEE&word=" + encodeURIComponent(query);

        try {
            var data = JSON.parse(
                org.jsoup.Jsoup.connect(url)
                    .ignoreContentType(true)
                    .ignoreHttpErrors(true).get().text());
            replier.reply(data.message);
        } catch (e) {
            replier.reply('Error: ' + e);
        }
    } else if (msg.startsWith(".")) {
        var searchUrl = "https://snuco.snu.ac.kr/ko/foodmenu?";
        var doc = org.jsoup.Jsoup.connect(searchUrl).get();
        var searchResult = "점심 메뉴:\n";

        if (msg.startsWith(".학생회관")) {
            searchResult += getMenu(doc, 1);
            replier.reply(searchResult);
        } else if (msg.startsWith(".자하연")) {
            searchResult += getMenu(doc, 2);
            replier.reply(searchResult);
        } else if (msg.startsWith(".예술계")) {
            searchResult += getMenu(doc, 3);
            replier.reply(searchResult);
        } else if (msg.startsWith(".두레미담")) {
            searchResult += getMenu(doc, 5);
            replier.reply(searchResult);
        } else if (msg.startsWith(".220동")) {
            searchResult += getMenu(doc, 13);
            replier.reply(searchResult);
        } else if (msg == ".") {
            var ranNum = Math.floor(Math.random() * 13);
            searchResult = doc.select("table > tbody > tr:nth-child(" + ranNum + ") > td.views-field-field-restaurant").text() + " 점심 메뉴:\n";
            searchResult += getMenu(doc, ranNum);
            replier.reply(searchResult);
        }
    }

}

function getMenu(doc, index) {
    var results = doc.select("table > tbody > tr:nth-child(" + index + ") > td.views-field-field-lunch > p");
    return results.toArray().map(function (p) {
        return p.text();
    }).join("\n\n");
}

function onCreate(savedInstanceState, activity) {
    var textView = new android.widget.TextView(activity);
    textView.setText("Hello, World!");
    textView.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(textView);
}

function onStart(activity) { }
function onResume(activity) { }
function onPause(activity) { }
function onStop(activity) { }