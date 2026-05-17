import re
import json

def parse_tex_file(filepath):
    """
    ユーザーが投稿したTeXファイルを読み込み、
    % @author: や % @category: などのメタデータを抽出してJSON形式に変換します。
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # --- 1. ファイル全体からメタデータを抽出 ---
    # 例: % @author: norihito
    author_match = re.search(r'%\s*@author:\s*(.+)', content)
    author = author_match.group(1).strip() if author_match else "不明"

    # 例: % @category: 確率, 微積分
    category_match = re.search(r'%\s*@category:\s*(.+)', content)
    categories = [c.strip() for c in category_match.group(1).split(',')] if category_match else []
    
    # 大学名や年度も埋め込むことができます
    # 例: % @university: 東京大学
    univ_match = re.search(r'%\s*@university:\s*(.+)', content)
    university = univ_match.group(1).strip() if univ_match else "不明"
    
    year_match = re.search(r'%\s*@year:\s*(\d+)', content)
    year = year_match.group(1).strip() if year_match else "2025"

    # --- 2. 各問題（セクション）の抽出 ---
    # \subsection*{第1問} のようなタグで問題を区切ります
    questions = []
    
    # 複数問題がある場合を考慮し、セクションごとに分割
    # (\subsection*{...} から次の \subsection*{ またはファイル末尾まで)
    sections = re.split(r'\\subsection\*\{(.+?)\}', content)
    
    # sections[0] は最初の \subsection より前の部分（メタデータなど）
    # sections[1] は "第1問" などの見出し
    # sections[2] は その中身... と交互に続きます
    
    for i in range(1, len(sections), 2):
        q_num = sections[i].strip()
        q_body = sections[i+1].strip()
        
        # TeX特有のレイアウト用タグのお掃除（必要に応じて）
        q_body = q_body.replace(r"\begin{enumerate}", "")
        q_body = q_body.replace(r"\end{enumerate}", "")
        q_body = re.sub(r"\\item\[(.*?)\]", r"\1", q_body)
        
        question_text = f"{q_num}\n{q_body}"
        
        questions.append({
            "id": f"{university}_{year}_{q_num}",
            "university": university,
            "faculty": "理系/理科", # 固定または抽出
            "year": year,
            "subject": "数学",
            "author": author,
            "units": categories,
            "question_text": question_text
        })

    return questions

# テスト用の実行コード
if __name__ == "__main__":
    # ダミーのTeXコンテンツを作成してテストします
    sample_tex = """
% @author: math_lover
% @category: 確率, 漸化式
% @university: 京都大学
% @year: 2026

\\subsection*{第1問}
サイコロを $n$ 回投げるとき、出た目の和が偶数になる確率を求めよ。

\\subsection*{第2問}
ある袋には赤玉と白玉が入っている。ここから玉を取り出すとき...
"""
    
    # 一時ファイルに保存して読み込ませるテスト
    with open("dummy_test.tex", "w", encoding="utf-8") as f:
        f.write(sample_tex.strip())
        
    result = parse_tex_file("dummy_test.tex")
    print(json.dumps(result, ensure_ascii=False, indent=2))
