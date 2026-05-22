function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // 1行目はヘッダーなので、2行目からデータを取得
  var headers = data[0];
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var key = headers[j];
      var value = row[j];
      
      // units（単元）はカンマ区切り文字列を配列に変換
      if (key === "units" && value !== undefined && value !== null && value !== "") {
        var strVal = typeof value.split === "function" ? value : String(value);
        obj[key] = strVal.split(",").map(function(s) { return s.trim(); });
      } else {
        obj[key] = value || "";
      }
    }
    result.push(obj);
  }
  
  // JSON形式でレスポンスを返す（CORS対応）
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 送信されたJSONデータをパース
    var postData = JSON.parse(e.postData.contents);
    
    // シートのヘッダーを取得
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // 追加する行のデータを作成
    var newRow = [];
    for (var i = 0; i < headers.length; i++) {
      var key = headers[i];
      var val = postData[key] || "";
      
      // unitsは配列なのでカンマ区切り文字列に戻して保存
      if (key === "units" && Array.isArray(val)) {
        newRow.push(val.join(", "));
      } else {
        newRow.push(val);
      }
    }
    
    // シートに追記
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// -------------------------------------------------------------
// 【初回のみ実行】初期データをセットアップするための関数
// スプレッドシートのメニューバーでこの関数を選んで「実行」を押すと、
// 東大・京大のテストデータが入ります。
// -------------------------------------------------------------
function setupInitialData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear(); // シートをクリア
  
  // ヘッダーをセット
  sheet.appendRow(["id", "university", "faculty", "year", "subject", "author", "units", "difficulty", "question_text", "pdf_url", "tex_url"]);
  
  // テストデータ
  var initialData = [
    ["東京大学_2025_第1問", "東京大学", "理科", "2025", "数学", "norihito", "確率, 微積分", 3, "第1問\n座標平面上の点 $\\text{A}(0,0)$, $\\text{B}(0,1)$, $\\text{C}(1,1)$, $\\text{D}(1,0)$ を考える。実数 $0<t<1$ に対して...", "", ""],
    ["京都大学_2025_第6問", "京都大学", "理系", "2025", "数学", "member_A", "整数", 4, "第6問\n$n$ を正の整数とする。$n$ の正の約数のうち、3で割って1余るものの個数を $f(n)$、3で割って2余るものの個数を $g(n)$ とする。\n    (1) $f(2800)$, $g(2800)$ を求めよ。\n    (2) $f(n) \\ge g(n)$ を示せ。", "", ""]
  ];
  
  for (var i = 0; i < initialData.length; i++) {
    sheet.appendRow(initialData[i]);
  }
}
