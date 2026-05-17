app_js_content = """// --- 設定 ---
// TODO: あなたが発行したGoogle Apps Scriptの「ウェブアプリのURL」をここに貼り付けてください
const API_URL = "YOUR_GAS_WEB_APP_URL_HERE";

// --- State ---
let allQuestions = [];
let currentQuestions = [];
let activeUnit = "すべて";

// --- DOM Elements ---
const questionsContainer = document.getElementById('questions-container');
const searchInput = document.getElementById('search-text');
const resultsCount = document.getElementById('results-count');
const unitLinks = document.querySelectorAll('.unit-link');
const loadingEl = document.getElementById('loading');
const emptyStateEl = document.getElementById('empty-state');

// Modal Elements
const questionModal = document.getElementById('question-modal');
const closeQuestionBtn = document.getElementById('close-modal');
const postModal = document.getElementById('post-modal');
const btnOpenPost = document.getElementById('btn-open-post');
const closePostBtn = document.getElementById('close-post-modal');
const btnSubmitPost = document.getElementById('btn-submit-post');
const texInput = document.getElementById('post-tex-input');
const postStatus = document.getElementById('post-status');

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
            
            card.innerHTML = `
                <div class="card-header">
                    <div>
                        <div class="univ-name">${q.university || '不明'}</div>
                        <div class="faculty-name">${q.faculty || ''} - ${q.year || ''}年</div>
                    </div>
                    <div class="tags">
                        <span class="tag subject">${q.subject || '数学'}</span>
                        ${unitsHtml}
                    </div>
                </div>
                <div class="question-preview">${q.question_text || ''}</div>
                <div class="card-footer" style="margin-top: 1rem; font-size: 0.8rem; color: var(--text-secondary); text-align: right;">
                    作成者: ${q.author || '不明'}
                </div>
            `;
            
            card.addEventListener('click', () => openQuestionModal(q));
            questionsContainer.appendChild(card);
        });
        
        // Render math in the new cards
        if (window.renderMathInElement) {
            renderMathInElement(questionsContainer, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "\\[", right: "\\]", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\(", right: "\\)", display: false}
                ],
                throwOnError: false
            });
        }
    }
    
    resultsCount.textContent = `${questions.length} 件ヒット`;
}

function filterQuestions() {
    const searchTerm = searchInput.value.toLowerCase();
    
    currentQuestions = allQuestions.filter(q => {
        // Keyword / Author search
        const textToSearch = (q.question_text + " " + q.university + " " + (q.author||"")).toLowerCase();
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
    
    renderQuestions(currentQuestions);
}

// --- Event Listeners ---
function setupEventListeners() {
    searchInput.addEventListener('input', filterQuestions);
    
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
}

// --- Modal Functions ---
function openQuestionModal(q) {
    let unitsArr = [];
    if (Array.isArray(q.units)) unitsArr = q.units;
    else if (typeof q.units === 'string') unitsArr = q.units.split(',').map(s => s.trim()).filter(s => s);
    const unitsHtml = unitsArr.map(u => `<span class="tag unit">${u}</span>`).join('');
    
    document.getElementById('modal-tags').innerHTML = `
        <span class="tag subject">${q.subject || '数学'}</span>
        <span class="tag year">${q.year || ''}年</span>
        ${unitsHtml}
    `;
    document.getElementById('modal-title').textContent = `${q.university || ''} ${q.year || ''}年 ${q.faculty || ''}`;
    document.getElementById('modal-subtitle').textContent = `作成者: ${q.author || '不明'}`;
    
    const textEl = document.getElementById('modal-text');
    textEl.textContent = q.question_text || '';
    
    if (window.renderMathInElement) {
        renderMathInElement(textEl, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\[", right: "\\]", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false}
            ],
            throwOnError: false
        });
    }
    
    questionModal.classList.add('active');
}

// --- Posting Logic ---
async function handlePostSubmit() {
    const rawTex = texInput.value;
    if (!rawTex.trim()) {
        showPostStatus("テキストを入力してください", true);
        return;
    }
    
    btnSubmitPost.disabled = true;
    btnSubmitPost.innerHTML = '送信中...';
    showPostStatus("データをパースして送信しています...", false);
    
    try {
        const parsedData = parseTexData(rawTex);
        
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
    const lines = tex.split('\\n');
    let author = "不明";
    let categories = [];
    let university = "未設定";
    let year = new Date().getFullYear().toString();
    
    // Extract metadata from comments
    const authorMatch = tex.match(/%\\s*@author:\\s*(.+)/);
    if (authorMatch) author = authorMatch[1].trim();
    
    const catMatch = tex.match(/%\\s*@category:\\s*(.+)/);
    if (catMatch) categories = catMatch[1].split(',').map(s => s.trim());
    
    const univMatch = tex.match(/%\\s*@university:\\s*(.+)/);
    if (univMatch) university = univMatch[1].trim();
    
    const yearMatch = tex.match(/%\\s*@year:\\s*(\\d+)/);
    if (yearMatch) year = yearMatch[1].trim();
    
    // Remove metadata lines to get pure body
    let bodyText = lines.filter(l => !l.trim().startsWith('%')).join('\\n').trim();
    
    // Clean up basic tex tags
    bodyText = bodyText.replace(/\\\\begin\\{enumerate\\}/g, '');
    bodyText = bodyText.replace(/\\\\end\\{enumerate\\}/g, '');
    
    // UUIDっぽいIDを生成
    const uniqueId = university + "_" + year + "_" + Math.random().toString(36).substring(2, 7);
    
    return {
        id: uniqueId,
        university: university,
        faculty: "理系", 
        year: year,
        subject: "数学",
        author: author,
        units: categories, // GAS側で配列を正しく文字列にするロジックが入っています
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
"""

with open(r"c:\Users\norih\OneDrive\Desktop\sample.anti\app.js", "w", encoding="utf-8") as f:
    f.write(app_js_content)

print("app.js rewritten successfully.")
