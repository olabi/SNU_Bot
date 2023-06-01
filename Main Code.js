const scriptName = "SNUbot";
var a = { "0": "███ ", "1": "░░█ ", "2": "███ ", "3": "███ ", "4": "█░█ ", "5": "███ ", "6": "███ ", "7": "███ ", "8": "███ ", "9": "███ " };
var b = { "0": "█░█ ", "1": "░░█ ", "2": "░░█ ", "3": "░░█ ", "4": "█░█ ", "5": "█░░ ", "6": "█░░ ", "7": "░░█ ", "8": "█░█ ", "9": "█░█ " };
var c = { "0": "█░█ ", "1": "░░█ ", "2": "███ ", "3": "███ ", "4": "███ ", "5": "███ ", "6": "███ ", "7": "░░█ ", "8": "███ ", "9": "███ " };
var d = { "0": "█░█ ", "1": "░░█ ", "2": "█░░ ", "3": "░░█ ", "4": "░░█ ", "5": "░░█ ", "6": "█░█ ", "7": "░░█ ", "8": "█░█ ", "9": "░░█ " };
var e = { "0": "███ ", "1": "░░█ ", "2": "███ ", "3": "███ ", "4": "░░█ ", "5": "███ ", "6": "███ ", "7": "░░█ ", "8": "███ ", "9": "███ " };

/*

 * Copyright 2023 bmcyver

 *

 * Licensed under the Apache License, Version 2.0 (the "License");

 * you may not use this file except in compliance with the License.

 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software

 * distributed under the License is distributed on an "AS IS" BASIS,

 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

 * See the License for the specific language governing permissions andlimitations under the License.

 */



const AI = require('AI');
var query;
// 바드 예제

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

  if (msg.startsWith('bard?')) {

    const chat = new AI.bard('__Secure-1PSID=<YOUR_COOKIE>');
    query = msg.substr(5).trim();

    replier.reply(chat.ask(encodeURIComponent(query)));

  }

  try {
    if (msg == ".시간") {
      var 날짜 = new Date();
      var Y = String(날짜.getFullYear());
      var MM = String(날짜.getMonth());
      var DD = String(날짜.getDate());
      var DW = String(날짜.getDay());
      var 요일 = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
      var H = String(날짜.getHours());
      var M = String(날짜.getMinutes());

      if (H.length == (1)) {
        H = "0" + H;
      }
      if (M.length == (1)) {
        M = "0" + M;
      }

      replier.reply(
        Y + "년 " + MM + "월 " + DD + "일(" + 요일[DW] + ")"
        + "\n" + a[H[0]] + a[H[1]] + " ░ " + a[M[0]] + a[M[1]]
        + "\n" + b[H[0]] + b[H[1]] + " █ " + b[M[0]] + b[M[1]]
        + "\n" + c[H[0]] + c[H[1]] + " ░ " + c[M[0]] + c[M[1]]
        + "\n" + d[H[0]] + d[H[1]] + " █ " + d[M[0]] + d[M[1]]
        + "\n" + e[H[0]] + e[H[1]] + " ░ " + e[M[0]] + e[M[1]]);

    }
  } catch (e) {
    replier.reply(e);
  }
  if (msg.startsWith("gpt3?")) {
    query = msg.substr(5).trim();
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
    } else if (msg.startsWith(".감골")) {
      searchResult += getMenu(doc, 8);
      replier.reply(searchResult);
    } else if (msg.startsWith(".사범")) {
      searchResult += getMenu(doc, 9);
      replier.reply(searchResult);
    } else if (msg.startsWith(".302")) {
      searchResult += getMenu(doc, 10);
      replier.reply(searchResult);
    } else if (msg.startsWith(".301")) {
      var results = doc.select("table > tbody > tr:nth-child(11) > td.views-field-field-lunch > div");
      searchResult += results.toArray().map(div => div.text()).join("\n\n");
      replier.reply(searchResult);
    } else if (msg.startsWith(".220")) {
      searchResult += getMenu(doc, 12);
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