import requests
from bs4 import BeautifulSoup
import json
import time

def scrape_university_exam_questions(url):
    """
    大学の公式ページから過去問のテキストを抽出するスクレイパーのテンプレート。
    ※ 実際のHTML構造に合わせてセレクタ（find, select等）を調整する必要があります。
    """
    print(f"Scraping: {url}")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # -------------------------------------------------------------------
        # 【重要】抽出ロジック（対象のサイトに合わせて書き換えてください）
        # -------------------------------------------------------------------
        
        # 例1: ページ内のすべての段落（<p>タグ）のテキストを取得する
        # paragraphs = soup.find_all('p')
        # extracted_text = "\n".join([p.get_text(strip=True) for p in paragraphs])
        
        # 例2: 特定のクラス名を持つ要素から抽出する (例: <div class="exam-question">)
        # question_divs = soup.find_all('div', class_='exam-question')
        # questions = []
        # for q in question_divs:
        #     questions.append(q.get_text(strip=True))
        
        # このテンプレートでは、ページ全体のテキストから余分な空白を削除して抽出します
        extracted_text = soup.get_text(separator='\n', strip=True)
        
        # 抽出したテキストが長すぎる場合は、最初の1000文字などに制限することも可能です
        # extracted_text = extracted_text[:1000]
        
        # -------------------------------------------------------------------
        
        return extracted_text

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None


def main():
    # 収集したデータを保存するリスト
    database = []
    
    # スクレイピング対象のURLリスト（ここに各大学の過去問ページのURLを追加します）
    # ※ 利用規約を確認し、アクセス頻度（time.sleep）に注意してください。
    target_urls = [
        # {"univ": "〇〇大学", "year": "2023", "subject": "英語", "url": "https://example.com/exam/2023/english"},
        # {"univ": "〇〇大学", "year": "2023", "subject": "数学", "url": "https://example.com/exam/2023/math"},
    ]
    
    for item in target_urls:
        text = scrape_university_exam_questions(item["url"])
        
        if text:
            database.append({
                "university": item["univ"],
                "year": item["year"],
                "subject": item["subject"],
                "question_text": text
            })
            
        # サーバーに負荷をかけないよう、必ず待機時間を設ける（最低でも数秒）
        time.sleep(3)
        
    # 結果をJSONファイルに保存
    output_file = 'database.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(database, f, ensure_ascii=False, indent=4)
    print(f"データを {output_file} に保存しました。")

if __name__ == "__main__":
    main()
