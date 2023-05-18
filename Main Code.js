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
  if (msg.startsWith("bot?")) {
    var query = msg.substr(4).trim();
    var url = "https://vapis.run.goorm.site/api/chatgpt?plusId=<**** KEY *****>&word=" + encodeURIComponent(query);

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

    if (msg.startsWith(".학생")) {
      searchResult += getMenu(doc, 1);
      replier.reply(searchResult);
    } else if (msg.startsWith(".자하")) {
      searchResult += getMenu(doc, 2);
      replier.reply(searchResult);
    } else if (msg.startsWith(".예술")) {
      searchResult += getMenu(doc, 3);
      replier.reply(searchResult);
    } else if (msg.startsWith(".라운")) {
      searchResult += getMenu(doc, 4);
      replier.reply(searchResult);
    } else if (msg.startsWith(".두레")) {
      searchResult += getMenu(doc, 5);
      replier.reply(searchResult);
    } else if (msg.startsWith(".동원")) {
      searchResult += getMenu(doc, 6);
      replier.reply(searchResult);
    } else if (msg.startsWith(".기숙")) {
      searchResult += getMenu(doc, 7);
      replier.reply(searchResult);
    } else if (msg.startsWith(".공간")) {
      searchResult += getMenu(doc, 8);
      replier.reply(searchResult);
    } else if (msg.startsWith(".감골")) {
      searchResult += getMenu(doc, 9);
      replier.reply(searchResult);
    } else if (msg.startsWith(".사범")) {
      searchResult += getMenu(doc, 10);
      replier.reply(searchResult);
    } else if (msg.startsWith(".302")) {
      searchResult += getMenu(doc, 11);
      replier.reply(searchResult);
    } else if (msg.startsWith(".301")) {
      var results = doc.select("table > tbody > tr:nth-child(12) > td.views-field-field-lunch > div");
      searchResult += results.toArray().map(div => div.text()).join("\n\n");
      replier.reply(searchResult);
    } else if (msg.startsWith(".220")) {
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