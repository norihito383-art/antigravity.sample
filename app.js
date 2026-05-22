// --- 設定 ---
const API_URL = "https://script.google.com/macros/s/AKfycbye7Ufg7vxLehmNYwm2XjyoTszXwlsgfERtq7u-cmqgC_9we7U8QsTb9rxijyPHAt1X5g/exec";

// --- Firebase Configuration ---
// TODO: ご自身のFirebaseプロジェクトの設定に書き換えてください
const firebaseConfig = {
    apiKey: "AIzaSyADrTnG81pPPheXmIsupKI83Czo-9eo6-A",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();

// --- State ---
let allQuestions = [];
let currentQuestions = [];
let activeUnit = "すべて";
let sortOrder = "default";

// --- DOM Elements ---
const questionsContainer = document.getElementById('questions-container');
const searchInput = document.getElementById('search-text');
const resultsCount = document.getElementById('results-count');
const unitLinks = document.querySelectorAll('.unit-link');
const loadingEl = document.getElementById('loading');
const emptyStateEl = document.getElementById('empty-state');
const sortSelect = document.getElementById('sort-select');

// Modal Elements
const questionModal = document.getElementById('question-modal');
const closeQuestionBtn = document.getElementById('close-modal');
const postModal = document.getElementById('post-modal');
const btnOpenPost = document.getElementById('btn-open-post');
const closePostBtn = document.getElementById('close-post-modal');
const btnSubmitPost = document.getElementById('btn-submit-post');
const texInput = document.getElementById('post-tex-input');
const postStatus = document.getElementById('post-status');

// New File Input Elements
const postPdfInput = document.getElementById('post-pdf-input');
const postTexFileInput = document.getElementById('post-tex-file-input');
const modalPdfViewer = document.getElementById('modal-pdf-viewer');
const modalText = document.getElementById('modal-text');

// --- Setup ---
async function init() {
    setupEventListeners();
    await fetchQuestions();
}

async function fetchQuestions() {
    if (API_URL === "YOUR_GAS_WEB_APP_URL_HERE") {
        loadingEl.style.display = 'none';
        emptyStateEl.style.display = 'block';
        emptyStateEl.innerHTML = '<h3>設定が必要です</h3><p>app.js の1行目にある API_URL を、<br>あなたのGoogle Apps ScriptのURLに変更してください。</p>';
        return;
    }

    loadingEl.style.display = 'flex';
    emptyStateEl.style.display = 'none';
    questionsContainer.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("ネットワークエラー");

        allQuestions = await response.json();
        currentQuestions = [...allQuestions];

        loadingEl.style.display = 'none';
        renderQuestions(currentQuestions);
    } catch (error) {
        console.error("データの取得に失敗しました:", error);
        loadingEl.style.display = 'none';
        emptyStateEl.style.display = 'block';
        emptyStateEl.innerHTML = '<h3>エラーが発生しました</h3><p>データの読み込みに失敗しました。</p>';
    }
}

// KaTeX設定（共通）
const KATEX_OPTS = {
    delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
    ],
    throwOnError: false
};

// TeXの \\\\ (改行コマンド)を改行文字に変換するヘルパー
function cleanTexForDisplay(text) {
    if (!text) return '';

    let cleaned = text;

    // 1. section, subsection 見出しを綺麗に装飾
    cleaned = cleaned.replace(/\\(?:subsection|section|subsubsection)\*?\{([^}]+)\}/g, '\n【$1】\n');

    // 2. リスト・レイアウト用の環境タグを削除
    cleaned = cleaned.replace(/\\(?:begin|end)\{(?:qlist|enumerate|itemize|center|document)\}/g, '');

    // 3. カスタムラベル付き項目 \item[(1)] や \qitem[(1)] を (1) に変換
    cleaned = cleaned.replace(/\\(?:qitem|item)\s*\[([^\]]+)\]/g, '\n$1 ');

    // 4. 通常の項目 \item や \qitem を連番 (1), (2), ... に変換
    let itemCounter = 1;
    cleaned = cleaned.replace(/\\(?:qitem|item)\b/g, () => {
        return `\n(${itemCounter++}) `;
    });

    // 5. レイアウト専用のTeXコマンドを削除・改行化
    cleaned = cleaned.replace(/\\noindent\b/g, '');
    cleaned = cleaned.replace(/\\(?:medskip|bigskip|smallskip)\b/g, '\n');
    cleaned = cleaned.replace(/\\(?:vspace|hspace)\{[^}]*\}/g, '');

    // 6. \\ (TeXの改行) を実際の改行文字に変換
    cleaned = cleaned.replace(/\\\\/g, '\n');

    // 7. 連続する改行を整理
    return cleaned.replace(/\n{3,}/g, '\n\n').trim();
}

// --- Render & Filter ---
function renderQuestions(questions) {
    questionsContainer.innerHTML = '';

    if (questions.length === 0) {
        emptyStateEl.style.display = 'block';
    } else {
        emptyStateEl.style.display = 'none';

        questions.forEach(q => {
            const card = document.createElement('div');
            card.className = 'question-card';

            // Format units tags
            let unitsArr = [];
            if (Array.isArray(q.units)) {
                unitsArr = q.units;
            } else if (typeof q.units === 'string') {
                unitsArr = q.units.split(',').map(s => s.trim()).filter(s => s);
            }
            const unitsHtml = unitsArr.map(u => `<span class="tag unit">${u}</span>`).join('');

            // 難易度バッジ（星数）
            const diff = parseInt(q.difficulty) || 0;
            const diffHtml = diff > 0
                ? `<span class="tag difficulty diff-${diff}">${'★'.repeat(diff)}${'☆'.repeat(5 - diff)}</span>`
                : '';

            // HTMLのシェルだけを innerHTML で作り、問題文は textContent で設定する
            // （innerHTML に直接埋め込むと \ が HTML パーサーに壊される）
            card.innerHTML = `
                <div class="card-header">
                    <div class="tags">
                        <span class="tag subject">${q.subject || '数学'}</span>
                        ${unitsHtml}
                        ${diffHtml}
                    </div>
                </div>
                <div class="card-meta">
                    <span class="card-univ">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        ${q.university || '不明'}（${q.year || ''}年）
                    </span>
                    <span class="card-author">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        ${q.author || '不明'}
                    </span>
                </div>
                <div class="question-preview"></div>
            `;

            // textContent でセット → KaTeX が正しく認識できる
            const previewEl = card.querySelector('.question-preview');
            previewEl.textContent = cleanTexForDisplay(q.question_text);

            card.addEventListener('click', () => openQuestionModal(q));
            questionsContainer.appendChild(card);
        });

        // Render math in the new cards
        if (window.renderMathInElement) {
            renderMathInElement(questionsContainer, KATEX_OPTS);
        }
    }

    resultsCount.textContent = `${questions.length} 件ヒット`;
}

function sortQuestions(questions) {
    const sorted = [...questions];
    switch (sortOrder) {
        case 'difficulty-desc':
            sorted.sort((a, b) => (parseInt(b.difficulty) || 0) - (parseInt(a.difficulty) || 0));
            break;
        case 'difficulty-asc':
            sorted.sort((a, b) => (parseInt(a.difficulty) || 0) - (parseInt(b.difficulty) || 0));
            break;
        case 'year-desc':
            sorted.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
            break;
        case 'year-asc':
            sorted.sort((a, b) => (parseInt(a.year) || 0) - (parseInt(b.year) || 0));
            break;
        default:
            // 登録順（元の順序を維持）
            break;
    }
    return sorted;
}

function filterQuestions() {
    const searchTerm = searchInput.value.toLowerCase();

    currentQuestions = allQuestions.filter(q => {
        // Keyword / Author search
        const textToSearch = (q.question_text + " " + q.university + " " + (q.author || "")).toLowerCase();
        const textMatch = textToSearch.includes(searchTerm);

        // Unit match
        let unitMatch = activeUnit === "すべて";
        if (!unitMatch) {
            let unitsArr = [];
            if (Array.isArray(q.units)) unitsArr = q.units;
            else if (typeof q.units === 'string') unitsArr = q.units.split(',').map(s => s.trim());
            unitMatch = unitsArr.includes(activeUnit);
        }

        return textMatch && unitMatch;
    });

    renderQuestions(sortQuestions(currentQuestions));
}

// --- Event Listeners ---
function setupEventListeners() {
    searchInput.addEventListener('input', filterQuestions);
    sortSelect.addEventListener('change', () => {
        sortOrder = sortSelect.value;
        filterQuestions();
    });

    unitLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Update active state
            unitLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update filter
            activeUnit = link.dataset.unit;
            filterQuestions();
        });
    });

    // Modals
    btnOpenPost.addEventListener('click', () => {
        postModal.classList.add('active');
        postStatus.style.display = 'none';
        texInput.value = '';
    });
    closePostBtn.addEventListener('click', () => postModal.classList.remove('active'));
    closeQuestionBtn.addEventListener('click', () => questionModal.classList.remove('active'));

    [questionModal, postModal].forEach(m => {
        m.addEventListener('click', (e) => {
            if (e.target === m) m.classList.remove('active');
        });
    });

    // Form Submit
    btnSubmitPost.addEventListener('click', handlePostSubmit);

    // TeX File Reader
    postTexFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                texInput.value = event.target.result;
            };
            reader.readAsText(file);
        }
    });
}

// --- Modal Functions ---
function openQuestionModal(q) {
    let unitsArr = [];
    if (Array.isArray(q.units)) unitsArr = q.units;
    else if (typeof q.units === 'string') unitsArr = q.units.split(',').map(s => s.trim()).filter(s => s);
    const unitsHtml = unitsArr.map(u => `<span class="tag unit">${u}</span>`).join('');

    const diff = parseInt(q.difficulty) || 0;
    const diffHtml = diff > 0
        ? `<span class="tag difficulty diff-${diff}">${'★'.repeat(diff)}${'☆'.repeat(5 - diff)}</span>`
        : '';

    document.getElementById('modal-tags').innerHTML = `
        <span class="tag subject">${q.subject || '数学'}</span>
        <span class="tag year">${q.year || ''}年</span>
        ${unitsHtml}
        ${diffHtml}
    `;
    document.getElementById('modal-title').textContent = `${q.university || ''} ${q.year || ''}年 ${q.faculty || ''}`;
    document.getElementById('modal-subtitle').textContent = `作成者: ${q.author || '不明'}`;

    // PDFがある場合はiframeを表示、ない場合はKaTeXテキストを表示
    if (q.pdf_url) {
        modalText.style.display = 'none';
        modalPdfViewer.style.display = 'block';
        modalPdfViewer.src = q.pdf_url;
    } else {
        modalPdfViewer.style.display = 'none';
        modalPdfViewer.src = '';
        modalText.style.display = 'block';
        modalText.textContent = cleanTexForDisplay(q.question_text);

        if (window.renderMathInElement) {
            renderMathInElement(modalText, KATEX_OPTS);
        }
    }

    questionModal.classList.add('active');
}

// --- Posting Logic ---
async function handlePostSubmit() {
    const rawTex = texInput.value;
    const pdfFile = postPdfInput.files[0];
    const texFile = postTexFileInput.files[0];

    if (!rawTex.trim() && !pdfFile) {
        showPostStatus("テキストを入力するか、PDFを選択してください", true);
        return;
    }

    btnSubmitPost.disabled = true;
    btnSubmitPost.innerHTML = '送信中...';
    showPostStatus("データを処理しています...", false);

    try {
        let pdfUrl = "";
        let texUrl = "";
        const parsedData = parseTexData(rawTex);
        const fileBaseName = `${parsedData.id}_${Date.now()}`;

        // 1. Upload PDF if exists
        if (pdfFile) {
            if (firebaseConfig.apiKey === "YOUR_API_KEY") {
                throw new Error("Firebase Storageを利用するにはapp.jsのfirebaseConfigを設定してください。");
            }
            showPostStatus("PDFをアップロード中...", false);
            const pdfRef = storage.ref(`questions/${fileBaseName}.pdf`);
            await pdfRef.put(pdfFile);
            pdfUrl = await pdfRef.getDownloadURL();
        }

        // 2. Upload TeX file if exists
        if (texFile) {
            if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
                showPostStatus("TeXファイルをアップロード中...", false);
                const texRef = storage.ref(`questions/${fileBaseName}.tex`);
                await texRef.put(texFile);
                texUrl = await texRef.getDownloadURL();
            }
        }

        // 3. Update parsed data with URLs
        parsedData.pdf_url = pdfUrl;
        parsedData.tex_url = texUrl;

        showPostStatus("データベースに保存中...", false);

        // POST to GAS
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(parsedData),
        });

        const result = await response.json();

        if (result.status === "success") {
            showPostStatus("✅ 送信が完了しました！自動でリロードします...", false);
            postStatus.style.color = "#10b981"; // success green

            setTimeout(() => {
                postModal.classList.remove('active');

                // フォームをリセット
                postPdfInput.value = '';
                postTexFileInput.value = '';
                texInput.value = '';

                fetchQuestions(); // 再読み込み
                btnSubmitPost.disabled = false;
                btnSubmitPost.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> 送信する';
            }, 1500);
        } else {
            throw new Error(result.message || "送信に失敗しました");
        }

    } catch (error) {
        console.error(error);
        showPostStatus(`❌ エラー: ${error.message}`, true);
        btnSubmitPost.disabled = false;
        btnSubmitPost.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> 送信する';
    }
}

function parseTexData(tex) {
    // 簡易的なTeXパーサー（ブラウザ版）
    let author = "不明";
    let categories = [];
    let university = "未設定";
    let year = new Date().getFullYear().toString();

    // Extract metadata (supports both "% @author: name" and "@author {name}")
    const authorMatch = tex.match(/(?:%\s*@author:|@author\s*\{)\s*([^}\n]+)/);
    if (authorMatch) author = authorMatch[1].trim();

    const catMatch = tex.match(/(?:%\s*@category:|@category\s*\{)\s*([^}\n]+)/);
    if (catMatch) {
        // 全角カンマや読点「、」も分割に対応
        categories = catMatch[1].split(/[,、]/).map(s => s.trim()).filter(s => s);
    }

    const univMatch = tex.match(/(?:%\s*@university:|@university\s*\{)\s*([^}\n]+)/);
    if (univMatch) university = univMatch[1].trim();

    const yearMatch = tex.match(/(?:%\s*@year:|@year\s*\{)\s*(\d+)/);
    if (yearMatch) year = yearMatch[1].trim();

    // 難易度: @difficulty{3} または % @difficulty: 3（数字1～5）
    let difficulty = null;
    const diffMatch = tex.match(/(?:%\s*@difficulty:|@difficulty\s*\{)\s*([1-5])/);
    if (diffMatch) difficulty = parseInt(diffMatch[1]);

    // --- 本文の抽出とクリーンアップ ---
    let bodyText = tex;

    // 1. メタデータ行を削除
    bodyText = bodyText.replace(/%\s*@.*\n?/g, '');
    bodyText = bodyText.replace(/@(?:author|category|university|year|difficulty)\s*\{.*?\}\n?/g, '');

    // 2. プリアンブル（\documentclass 等）を削除し、\begin{document}の中身だけにする
    const docMatch = bodyText.match(/\\begin\{document\}([\s\S]*?)(?:\\end\{document\}|$)/);
    if (docMatch) {
        bodyText = docMatch[1];
    }

    // 3. カスタムタグやリスト環境をWeb用に変換

    // section, subsection 見出しを綺麗に装飾
    bodyText = bodyText.replace(/\\(?:subsection|section|subsubsection)\*?\{([^}]+)\}/g, '\n【$1】\n');

    // リスト・レイアウト用の環境タグを削除
    bodyText = bodyText.replace(/\\(?:begin|end)\{(?:qlist|enumerate|itemize|center|document)\}/g, '');

    // カスタムラベル付き項目 \item[(1)] や \qitem[(1)] を (1) に変換
    bodyText = bodyText.replace(/\\(?:qitem|item)\s*\[([^\]]+)\]/g, '\n$1 ');

    // 通常の項目 \item や \qitem を連番 (1), (2), ... に変換
    let itemCounter = 1;
    bodyText = bodyText.replace(/\\(?:qitem|item)\b/g, () => {
        return `\n(${itemCounter++}) `;
    });

    // レイアウト専用のTeXコマンドを削除・改行化
    bodyText = bodyText.replace(/\\noindent\b/g, '');
    bodyText = bodyText.replace(/\\(?:medskip|bigskip|smallskip)\b/g, '\n');
    bodyText = bodyText.replace(/\\(?:vspace|hspace)\{[^}]*\}/g, '');

    // 前後の不要な空白をトリム
    bodyText = bodyText.trim();

    // UUIDっぽいIDを生成
    const uniqueId = university + "_" + year + "_" + Math.random().toString(36).substring(2, 7);

    return {
        id: uniqueId,
        university: university,
        faculty: "未設定",
        year: year,
        subject: "数学",
        author: author,
        units: categories,
        difficulty: difficulty,
        question_text: bodyText
    };
}

function showPostStatus(msg, isError) {
    postStatus.textContent = msg;
    postStatus.style.color = isError ? "#ef4444" : "#64748b";
    postStatus.style.display = "block";
}

// Initialize app
document.addEventListener('DOMContentLoaded', init);
