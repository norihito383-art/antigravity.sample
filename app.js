let allQuestions = [
    {
        "id": "東京大学_2025_第1問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2025",
        "subject": "数学",
        "question_text": `第1問
座標平面上の点 $\\text{A}(0,0)$, $\\text{B}(0,1)$, $\\text{C}(1,1)$, $\\text{D}(1,0)$ を考える。実数 $0<t<1$ に対して、線分 $\\text{AB}$, $\\text{BC}$, $\\text{CD}$ を $t:(1-t)$ に内分する点をそれぞれ $P_t, Q_t, R_t$ とし、線分 $P_tQ_t$, $Q_tR_t$ を $t:(1-t)$ に内分する点をそれぞれ $S_t, T_t$ とする。さらに、線分 $S_tT_t$ を $t:(1-t)$ に内分する点を $U_t$ とする。また、点 $\\text{A}$ を $U_0$、点 $\\text{D}$ を $U_1$ とする。

    (1) 点 $U_t$ の座標を求めよ。
    (2) $t$ が $0 \\le t \\le 1$ の範囲を動くときに点 $U_t$ が描く曲線と、線分 $\\text{AD}$ で囲まれた部分の面積を求めよ。
    (3) $a$ を $0<a<1$ を満たす実数とする。$t$ が $0 \\le t \\le a$ の範囲を動くときに点 $U_t$ が描く曲線の長さを、$a$ の多項式の形で求めよ。`
    },
    {
        "id": "東京大学_2025_第2問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2025",
        "subject": "数学",
        "question_text": `第2問
(1) $x>0$ のとき、不等式 $\\log x \\le x-1$ を示せ。
    (2) 次の極限を求めよ。
    \\[ \\lim_{n\\to\\infty} n \\int_{1}^{2} \\log\\left(\\frac{1+x^{\\frac{1}{n}}}{2}\\right) dx \\]`
    },
    {
        "id": "東京大学_2025_第3問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2025",
        "subject": "数学",
        "question_text": `第3問
平行四辺形 $\\text{ABCD}$ において、$\\angle \\text{ABC} = \\frac{\\pi}{6}$, $\\text{AB}=a$, $\\text{BC}=b$, $a \\le b$ とする。次の条件を満たす長方形 $\\text{EFGH}$ を考え、その面積を $S$ とする。
条件: 点 $\\text{A, B, C, D}$ はそれぞれ辺 $\\text{EF, FG, GH, HE}$ 上にある。ただし、辺はその両端の点も含むものとする。

    (1) $\\angle \\text{BCG} = \\theta$ とするとき、$S$ を $a, b, \\theta$ を用いて表せ。
    (2) $S$ のとりうる値の最大値を $a, b$ を用いて表せ。`
    },
    {
        "id": "東京大学_2025_第4問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2025",
        "subject": "数学",
        "question_text": `第4問
この問いでは、0以上の整数の2乗になる数を平方数と呼ぶ。$a$ を正の整数とし、$f_a(x) = x^2+x-a$ とおく。

    (1) $n$ を正の整数とする。$f_a(n)$ が平方数ならば、$n \\le a$ であることを示せ。
    (2) $f_a(n)$ が平方数となる正の整数 $n$ の個数を $N_a$ とおく。次の条件(i), (ii)が同値であることを示せ。
    (i) $N_a = 1$ である。
    (ii) $4a+1$ は素数である。`
    },
    {
        "id": "東京大学_2025_第5問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2025",
        "subject": "数学",
        "question_text": `第5問
$n$ を2以上の整数とする。1から $n$ までの数字が書かれた札が各1枚ずつ合計 $n$ 枚あり、横一列におかれている。1以上 $(n-1)$ 以下の整数 $i$ に対して、次の操作 $(T_i)$ を考える。
$(T_i)$: 左から $i$ 番目の札の数字が、左から $(i+1)$ 番目の札の数字よりも大きければ、これら2枚の札の位置を入れかえる。そうでなければ、札の位置をかえない。
最初の状態において札の数字は左から $A_1, A_2, \\dots, A_n$ であったとする。この状態から $(n-1)$ 回の操作 $(T_1), (T_2), \\dots, (T_{n-1})$ を順に行った後、続けて $(n-1)$ 回の操作 $(T_{n-1}), \\dots, (T_2), (T_1)$ を順に行ったところ、札の数字は左から $1, 2, \\dots, n$ と小さい順に並んだ。以下の問いに答えよ。

    (1) $A_1$ と $A_2$ のうち少なくとも一方は2以下であることを示せ。
    (2) 最初の状態としてありうる札の数字の並び方 $A_1, A_2, \\dots, A_n$ の総数を $c_n$ とする。$n$ が4以上の整数であるとき、$c_n$ を $c_{n-1}$ と $c_{n-2}$ を用いて表せ。`
    },
    {
        "id": "東京大学_2026_第6問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2026",
        "subject": "数学",
        "question_text": `第6問
複素数平面上の点 $\\frac{1}{2}$ を中心とする半径 $\\frac{1}{2}$ の円の周から原点を除いた曲線を $C$ とする。

    (1) 曲線 $C$ 上の複素数 $z$ に対し、$\\frac{1}{z}$ の実部は1であることを示せ。
    (2) $\\alpha, \\beta$ を曲線 $C$ 上の相異なる複素数とするとき、$\\frac{1}{\\alpha^2} + \\frac{1}{\\beta^2}$ がとりうる範囲を複素数平面上に図示せよ。
    (3) $\\gamma$ を (2) で求めた範囲に属さない複素数とするとき、$\\frac{1}{\\gamma}$ の実部がとりうる値の最大値と最小値を求めよ。`
    },
    {
        "id": "東京大学_2026_第1問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2026",
        "subject": "数学",
        "question_text": `第1問
(1) 関数 $f(\\theta) = \\sin\\theta - \\theta + \\frac{\\theta^3}{6}$ の区間 $-1 \\le \\theta \\le 1$ における最大値 $M$ および最小値 $m$ を求めよ。
    (2) (1) で定めた $M$ に対し、次の不等式を示せ。
    \\[ \\frac{7}{8}\\pi \\le \\int_{0}^{2\\pi} \\sin(\\cos x - x) dx \\le \\frac{7}{8}\\pi + 4M \\]`
    },
    {
        "id": "東京大学_2026_第2問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2026",
        "subject": "数学",
        "question_text": `第2問
$n$ を正の整数とする。座標平面上の $3n$ 個の点がなす集合
\\[ \\{ (x,y) \\mid x,y \\text{ は } 1 \\le x \\le 3, \\ 1 \\le y \\le n \\text{ を満たす整数} \\} \\]
から相異なる3点を選ぶ。ただし、どの3点も等確率で選ばれるものとする。選んだ3点が三角形の3頂点となる確率を $p_n$ とする。

    (1) $p_5$ を求めよ。
    (2) $m$ を2以上の整数とする。$p_{2m}$ を求めよ。`
    },
    {
        "id": "東京大学_2026_第3問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2026",
        "subject": "数学",
        "question_text": `第3問
座標空間内の原点を中心とする半径5の球面を $S$ とする。$S$ 上の相異なる3点 $\\text{P, Q, R}$ が次の条件を満たすように動く。
条件: $\\text{P, Q}$ は $xy$ 平面上にあり、三角形 $\\text{PQR}$ の重心は $\\text{G}(2,0,1)$ である。
以下の問いに答えよ。

    (1) 線分 $\\text{PQ}$ の中点 $\\text{M}$ の軌跡を $xy$ 平面上に図示せよ。
    (2) 線分 $\\text{PQ}$ が通過する範囲を $xy$ 平面上に図示せよ。`
    },
    {
        "id": "東京大学_2026_第4問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2026",
        "subject": "数学",
        "question_text": `第4問
$k$ を実数とし、座標平面上の曲線 $C$ を $y=x^3-kx$ で定める。$C$ 上の2点 $\\text{P, Q}$ に対する以下の条件 $(*)$ を考える。
条件 $(*)$: 原点 $\\text{O}$, 点 $\\text{P}$, 点 $\\text{Q}$ は相異なり、$C$ の $\\text{O, P, Q}$ における接線のうち、どの2本も交わり、そのなす角はすべて $\\frac{\\pi}{3}$ となる。ただし、2直線のなす角は $0$ 以上 $\\frac{\\pi}{2}$ 以下の範囲で考えるものとする。

    (1) 条件 $(*)$ を満たす $\\text{P, Q}$ が存在するような $k$ の範囲を求めよ。
    (2) $k$ が (1) で定まる範囲にあるとする。$\\text{P, Q}$ が条件 $(*)$ を満たすように動くとき、$C$ の $\\text{O, P, Q}$ における接線によって囲まれる三角形の面積 $S$ の最大値を $M$、最小値を $m$ とおく。ただし、3本の接線が1点で交わるときは $S=0$ とする。$M=4m$ となる $k$ の値を求めよ。`
    },
    {
        "id": "東京大学_2026_第5問",
        "university": "東京大学",
        "faculty": "理科",
        "year": "2026",
        "subject": "数学",
        "question_text": `第5問
複素数平面上の原点を中心とする半径1の円を $C$ とする。複素数 $\\alpha$ と $C$ 上の点 $\\text{P}(z)$ に対し、$w=(z-\\alpha)^3$ とおく。$\\text{P}$ が $C$ 上を動くときの点 $\\text{Q}(w)$ の軌跡を $D$ とする。

    (1) $\\alpha=-3$ とし、$w$ の偏角を $\\theta$ とおく。$\\text{P}$ が $C$ 上を動くとき、$\\sin\\theta$ がとりうる値の範囲を求めよ。
    (2) $\\alpha$ が次の条件を満たすように動く。
    条件: $D$ は実軸の正の部分および負の部分の両方と共有点を持つ。
    複素数平面上の点 $\\text{R}(\\alpha)$ が動きうる範囲の面積を求めよ。`
    },
    {
        "id": "京都大学_2025_第6問",
        "university": "京都大学",
        "faculty": "理系",
        "year": "2025",
        "subject": "数学",
        "question_text": `第6問
$n$ を正の整数とする。$n$ の正の約数のうち、3で割って1余るものの個数を $f(n)$、3で割って2余るものの個数を $g(n)$ とする。

    (1) $f(2800)$, $g(2800)$ を求めよ。
    (2) $f(n) \\ge g(n)$ を示せ。
    (3) $g(n)=15$ であるとき、$f(n)$ がとりうる値を求めよ。`
    },
    {
        "id": "京都大学_2025_問1",
        "university": "京都大学",
        "faculty": "理系",
        "year": "2025",
        "subject": "数学",
        "question_text": `問1
$i$ は虚数単位とする。複素数 $z$ が、絶対値が2である複素数全体を動くとき、$\\left|z - \\frac{i}{z}\\right|$ の最大値と最小値を求めよ。`
    },
    {
        "id": "京都大学_2025_問2",
        "university": "京都大学",
        "faculty": "理系",
        "year": "2025",
        "subject": "数学",
        "question_text": `問2
次の定積分の値を求めよ。

    (1) $\\displaystyle \\int_{0}^{\\sqrt{3}} \\frac{x\\sqrt{x^2+1}+2x^3+1}{x^2+1} dx$
    (2) $\\displaystyle \\int_{0}^{\\frac{\\pi}{2}} \\sqrt{\\frac{1-\\cos x}{1+\\cos x}} dx$`
    },
    {
        "id": "京都大学_2025_問3",
        "university": "京都大学",
        "faculty": "理系",
        "year": "2025",
        "subject": "数学",
        "question_text": `問3
正の整数 $x, y, z$ を用いて
\\[ N = 9z^2 = x^6 + y^4 \\]
と表される正の整数 $N$ の最小値を求めよ。`
    },
    {
        "id": "京都大学_2025_問4",
        "university": "京都大学",
        "faculty": "理系",
        "year": "2025",
        "subject": "数学",
        "question_text": `問4
$e$ は自然対数の底とする。$x > \\frac{1}{\\sqrt{e}}$ において定義された次の関数 $f(x), g(x)$ を考える。
\\[ f(x) = x^2 \\log x \\]
\\[ g(x) = x^2 \\log x - \\frac{1}{1+2\\log x} \\]
実数 $t$ は $t > \\frac{1}{\\sqrt{e}}$ を満たすとする。曲線 $y=f(x)$ 上の点 $(t, f(t))$ における接線に垂直で、点 $(t, g(t))$ を通る直線を $l_t$ とする。直線 $l_t$ が $x$ 軸と交わる点の $x$ 座標を $p(t)$ とする。$t$ が $\\frac{1}{\\sqrt{e}} < t \\le e$ の範囲を動くとき、$p(t)$ の取りうる値の範囲を求めよ。`
    },
    {
        "id": "京都大学_2025_問5",
        "university": "京都大学",
        "faculty": "理系",
        "year": "2025",
        "subject": "数学",
        "question_text": `問5
座標空間の4点 $\\text{O, A, B, C}$ は同一平面上にないとする。$s, t, u$ は0でない実数とする。直線 $\\text{OA}$ 上の点 $\\text{L}$、直線 $\\text{OB}$ 上の点 $\\text{M}$、直線 $\\text{OC}$ 上の点 $\\text{N}$ を
\\[ \\vec{\\text{OL}} = s\\vec{\\text{OA}}, \\quad \\vec{\\text{OM}} = t\\vec{\\text{OB}}, \\quad \\vec{\\text{ON}} = u\\vec{\\text{OC}} \\]
が成り立つようにとる。

    (1) $s, t, u$ が $\\frac{1}{s} + \\frac{2}{t} + \\frac{3}{u} = 4$ を満たす範囲であらゆる値をとるとき、3点 $\\text{L, M, N}$ の定める平面 $\\text{LMN}$ は、$s, t, u$ の値に無関係な一定の点 $\\text{P}$ を通ることを示せ。さらに、そのような点 $\\text{P}$ はただ一つに定まることを示せ。
    (2) 四面体 $\\text{OABC}$ の体積を $V$ とする。(1) における点 $\\text{P}$ について、四面体 $\\text{PABC}$ の体積を $V$ を用いて表せ。`
    },
    {
        "id": "京都大学_2025_問6",
        "university": "京都大学",
        "faculty": "理系",
        "year": "2025",
        "subject": "数学",
        "question_text": `問6
$\\theta$ は実数とする。$xyz$ 空間の2点 $\\text{A}\\left(0,0,\\frac{\\sqrt{2}}{4}\\right)$, $\\text{P}\\left(\\cos\\theta, \\sin\\theta, \\frac{1}{2}\\cos\\theta\\right)$ を通る直線 $\\text{AP}$ が $xy$ 平面と交わるとき、その交点を $\\text{Q}$ とする。$\\theta$ が $-\\frac{\\pi}{4} < \\theta < \\frac{\\pi}{4}$ の範囲を動くときの点 $\\text{Q}$ の軌跡を求め、その軌跡を $xy$ 平面上に図示せよ。`
    },
    {
        "id": "京都大学_2025_問7",
        "university": "京都大学",
        "faculty": "理系",
        "year": "2025",
        "subject": "数学",
        "question_text": `問7
$n$ は2以上の整数とする。1枚の硬貨を続けて $n$ 回投げる。このとき、$k$ 回目 $(1 \\le k \\le n)$ に表が出たら $X_k = 1$、裏が出たら $X_k = 0$ として、$X_1, X_2, \\dots, X_n$ を定める。
\\[ Y_n = \\sum_{k=2}^{n} X_{k-1}X_k \\]
とするとき、$Y_n$ が奇数である確率 $p_n$ を求めよ。`
    }
];

// DOM Elements
const questionsContainer = document.getElementById('questions-container');
const searchInput = document.getElementById('search-text');
const filterUniversity = document.getElementById('filter-university');
const filterYear = document.getElementById('filter-year');
const filterSubject = document.getElementById('filter-subject');
const resultsCount = document.getElementById('results-count');
const loadingState = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

// Modal Elements
const modal = document.getElementById('question-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalText = document.getElementById('modal-text');
const modalTags = document.getElementById('modal-tags');

// Initialize
function init() {
    populateFilterOptions();
    renderQuestions(allQuestions);
    setupEventListeners();
    showLoading(false);
}

// Render Math function using KaTeX
function renderMath() {
    // KaTeX might take a moment to load from CDN
    setTimeout(() => {
        if (window.renderMathInElement) {
            window.renderMathInElement(document.body, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ],
                throwOnError: false,
                output: 'html' // Use HTML output for better integration
            });
        }
    }, 50);
}

// Populate dropdown filters based on available data
function populateFilterOptions() {
    const universities = [...new Set(allQuestions.map(q => q.university))].sort();
    const years = [...new Set(allQuestions.map(q => q.year))].sort().reverse();
    const subjects = [...new Set(allQuestions.map(q => q.subject))].sort();

    universities.forEach(u => filterUniversity.add(new Option(u, u)));
    years.forEach(y => filterYear.add(new Option(`${y}年度`, y)));
    subjects.forEach(s => filterSubject.add(new Option(s, s)));
}

// Render cards
function renderQuestions(questions) {
    questionsContainer.innerHTML = '';
    resultsCount.textContent = `${questions.length} 件ヒット`;
    
    if (questions.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';

    questions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="card-header">
                <div class="tags">
                    <span class="tag subject">${q.subject}</span>
                    <span class="tag year">${q.year}年度</span>
                </div>
            </div>
            <h3 class="univ-name">${q.university}</h3>
            <p class="faculty-name">${q.faculty || ''}</p>
            <div class="question-preview">${q.question_text}</div>
        `;
        
        card.addEventListener('click', () => openModal(q));
        questionsContainer.appendChild(card);
    });
    
    // Render math in the new cards
    renderMath();
}

// Filter Logic
function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedUniv = filterUniversity.value;
    const selectedYear = filterYear.value;
    const selectedSubject = filterSubject.value;

    const filtered = allQuestions.filter(q => {
        const matchSearch = q.question_text.toLowerCase().includes(searchTerm) || 
                            q.university.toLowerCase().includes(searchTerm);
        const matchUniv = selectedUniv === '' || q.university === selectedUniv;
        const matchYear = selectedYear === '' || q.year === selectedYear;
        const matchSubject = selectedSubject === '' || q.subject === selectedSubject;

        return matchSearch && matchUniv && matchYear && matchSubject;
    });

    renderQuestions(filtered);
}

// Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', filterData);
    filterUniversity.addEventListener('change', filterData);
    filterYear.addEventListener('change', filterData);
    filterSubject.addEventListener('change', filterData);
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Modal Functions
function openModal(question) {
    modalTags.innerHTML = `
        <span class="tag subject">${question.subject}</span>
        <span class="tag year">${question.year}年度</span>
    `;
    modalTitle.textContent = question.university;
    modalSubtitle.textContent = question.faculty ? `${question.faculty} - ${question.subject}` : question.subject;
    modalText.textContent = question.question_text;
    
    modal.classList.add('active');
    
    // Render math in modal
    renderMath();
}

function showLoading(show) {
    loadingState.style.display = show ? 'flex' : 'none';
    if(show) questionsContainer.innerHTML = '';
}

// Start app
init();
