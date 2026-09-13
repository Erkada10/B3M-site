// === ДАННЫЕ ===
var PUBLISHED_PAGES = {};
var PUBLISHED_NEWS = [];

var APWD = "4goosE";
var VPWD = "взб";
var SK_PAGES = "vzb_page_drafts";
var SK_NEWS = "vzb_news_drafts";

var user = null;
var curView = 'page';
var curPage = 1;
var editing = false;

// === CSS ДЛЯ ЗРИТЕЛЬСКОЙ ВЕРСИИ ===
var CSS_TEXT = [
'* { margin: 0; padding: 0; box-sizing: border-box; }',
'body { font-family: Tahoma, Arial, sans-serif; font-size: 13px; background: #edeef0; color: #333; line-height: 1.4; }',
'#login { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: #edeef0; z-index: 9999; }',
'.login-box { background: #fff; border: 1px solid #e1e3e5; border-radius: 4px; padding: 30px; text-align: center; width: 300px; max-width: 90vw; }',
'.login-box h1 { color: #5e81a8; font-size: 28px; margin-bottom: 5px; }',
'.login-sub { color: #777; font-size: 12px; margin-bottom: 20px; }',
'.login-box input { width: 100%; padding: 8px 12px; border: 1px solid #c0cad5; border-radius: 3px; font-family: inherit; font-size: 14px; margin-bottom: 10px; outline: none; }',
'.login-box input:focus { border-color: #5e81a8; }',
'.login-box button { width: 100%; padding: 8px; background: #5e81a8; color: #fff; border: none; border-radius: 3px; font-family: inherit; font-size: 13px; cursor: pointer; }',
'.login-box button:hover { background: #6d94be; }',
'.lerr { font-size: 12px; margin-top: 10px; min-height: 16px; }',
'@keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }',
'#app { display: none; flex-direction: column; min-height: 100vh; }',
'.header { background: #5e81a8; height: 42px; display: flex; align-items: center; }',
'.header-inner { max-width: 960px; margin: 0 auto; width: 100%; padding: 0 15px; display: flex; align-items: center; gap: 15px; }',
'.logo { color: #fff; font-size: 18px; font-weight: bold; }',
'.status-text { color: rgba(255,255,255,0.7); font-size: 12px; flex: 1; }',
'.btn-link { background: none; border: none; color: #fff; cursor: pointer; font-size: 12px; text-decoration: underline; font-family: inherit; }',
'.btn-link:hover { text-decoration: none; }',
'.layout { max-width: 960px; margin: 10px auto; width: 100%; padding: 0 15px; display: flex; gap: 10px; flex: 1; }',
'.sidebar { width: 200px; flex-shrink: 0; }',
'.side-section { background: #fff; border: 1px solid #e1e3e5; border-radius: 4px; margin-bottom: 10px; overflow: hidden; }',
'.side-header { background: #f5f7fa; padding: 8px 12px; font-weight: bold; font-size: 12px; color: #555; border-bottom: 1px solid #e1e3e5; }',
'.side-item { padding: 8px 12px; cursor: pointer; font-size: 13px; }',
'.side-item:hover { background: #f5f7fa; }',
'.side-item.active { background: #dae1e8; font-weight: bold; color: #000; }',
'.side-empty { padding: 12px; color: #999; font-size: 12px; text-align: center; }',
'.badge-pub { color: #4bb34b; font-size: 14px; }',
'.badge-dirty { color: #e69138; font-size: 14px; }',
'.side-news { border-color: #5e81a8; border-left: 3px solid #5e81a8; }',
'.side-header-news { color: #5e81a8; background: #e8eef5; border-bottom-color: #c5d3e4; }',
'.side-item-news { font-weight: bold; font-size: 14px; color: #5e81a8; background: #f0f4f8; border-left: 3px solid transparent; }',
'.side-item-news:hover { background: #e0e8f0; }',
'.side-item-news.active { background: #dae1e8; color: #000; border-left-color: #5e81a8; }',
'.page-select-wrap { position: relative; }',
'.page-select-btn { width: 100%; padding: 10px 12px; background: #fff; border: 1px solid #c0cad5; border-radius: 3px; font-family: inherit; font-size: 13px; cursor: pointer; text-align: left; display: flex; justify-content: space-between; align-items: center; }',
'.page-select-btn:hover { background: #f5f7fa; border-color: #5e81a8; }',
'.page-select-arrow { font-size: 10px; color: #777; transition: transform 0.2s; }',
'.page-select-list { display: none; margin-top: 4px; border: 1px solid #e1e3e5; border-radius: 3px; background: #fff; max-height: 200px; overflow-y: auto; }',
'.page-select-list.open { display: block; }',
'.page-select-list .side-item { padding: 8px 12px; font-size: 13px; cursor: pointer; }',
'.page-select-list .side-item:hover { background: #f5f7fa; }',
'.page-select-list .side-item.active { background: #dae1e8; font-weight: bold; }',
'.content { flex: 1; min-width: 0; }',
'.page-card, .news-card { background: #fff; border: 1px solid #e1e3e5; border-radius: 4px; padding: 15px; margin-bottom: 10px; }',
'.page-card { white-space: pre-wrap; word-wrap: break-word; }',
'.news-card h3 { margin: 0 0 8px 0; font-size: 15px; color: #333; }',
'.news-card .date { font-size: 11px; color: #777; margin-bottom: 8px; }',
'.news-card p { margin: 0; white-space: pre-wrap; word-wrap: break-word; }',
'.empty-state { text-align: center; padding: 40px; color: #777; }',
'.apanel { display: none; background: #fff; border-top: 1px solid #e1e3e5; padding: 10px 15px; max-width: 960px; margin: 0 auto; width: 100%; }',
'.apanel.visible { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }',
'.ainfo { font-size: 12px; color: #5e81a8; font-weight: bold; margin-right: 15px; }',
'.btn { padding: 6px 12px; background: #e9ebee; border: 1px solid #bdc3c7; color: #333; border-radius: 3px; font-family: inherit; font-size: 12px; cursor: pointer; }',
'.btn:hover { background: #dfe2e6; }',
'.btn.btn-d { background: #ffe6e6; border-color: #dd4b39; color: #dd4b39; }',
'.btn.btn-s { background: #5e81a8; color: #fff; border: none; }',
'.btn.btn-s:hover { background: #6d94be; }',
'#modal-root { position: fixed; inset: 0; z-index: 10000; pointer-events: none; }',
'#modal-root.open { pointer-events: all; }',
'#modal-root .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); pointer-events: all; }',
'#modal-root .modal { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; border: 1px solid #e1e3e5; border-radius: 4px; padding: 20px; width: 450px; max-width: 90vw; max-height: 85vh; overflow-y: auto; }',
'#modal-root .modal h2 { margin: 0 0 12px 0; font-size: 16px; color: #333; }',
'#modal-root textarea { width: 100%; height: 120px; padding: 8px; border: 1px solid #c0cad5; border-radius: 3px; resize: vertical; font-family: inherit; font-size: 13px; margin-bottom: 10px; box-sizing: border-box; }',
'#modal-root input[type="text"] { width: 100%; padding: 8px; border: 1px solid #c0cad5; border-radius: 3px; font-family: inherit; font-size: 13px; margin-bottom: 10px; }',
'#modal-root .btn-modal { padding: 6px 12px; background: #5e81a8; color: #fff; border: none; border-radius: 3px; font-family: inherit; font-size: 12px; cursor: pointer; }',
'#modal-root .btn-cancel { padding: 6px 12px; background: transparent; border: 1px solid #bdc3c7; color: #333; border-radius: 3px; font-family: inherit; font-size: 12px; cursor: pointer; margin-left: 8px; }',
'#modal-root pre { background: #f0f0f0; padding: 10px; border-radius: 3px; font-family: Consolas, monospace; font-size: 12px; white-space: pre-wrap; word-break: break-all; margin-top: 10px; }',
'@media (max-width: 768px) { .layout { flex-direction: column; } .sidebar { width: 100%; margin-bottom: 10px; } }'
].join('\n');

// === ПРИВЯЗКА КНОПОК ===
document.getElementById('loginBtn').onclick = login;
document.getElementById('pwd').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') login();
});
document.getElementById('outBtn').onclick = logout;
document.getElementById('newBtn').onclick = newPage;
document.getElementById('editBtn').onclick = toggleEdit;
document.getElementById('delBtn').onclick = deletePage;
document.getElementById('addNewsBtn').onclick = addNews;
document.getElementById('pubBtn').onclick = showPublished;
document.getElementById('copyBtn').onclick = copyCode;

// === ВХОД / ВЫХОД ===
function login() {
  var pwd = document.getElementById('pwd').value;
  var err = document.getElementById('lerr');

  if (pwd === APWD) {
    err.style.color = '#4bb34b';
    err.textContent = '✓ Верно. Вход...';
    setTimeout(function() {
      document.getElementById('login').style.display = 'none';
      document.getElementById('app').style.display = 'flex';
      document.getElementById('apanel').classList.add('visible');
      user = 'admin';
      render();
      err.textContent = '';
      err.style.color = '';
    }, 400);
  } else {
    err.style.color = '#dd4b39';
    err.textContent = '✗ Неверный пароль';
    document.getElementById('pwd').value = '';
    document.getElementById('pwd').focus();
    var box = document.querySelector('.login-box');
    box.style.animation = 'none';
    void box.offsetWidth;
    box.style.animation = 'shake 0.3s';
  }
}

function logout() {
  user = null;
  curView = 'page';
  curPage = 1;
  editing = false;
  document.getElementById('app').style.display = 'none';
  document.getElementById('login').style.display = 'flex';
  document.getElementById('pwd').value = '';
  document.getElementById('lerr').textContent = '';
  document.getElementById('lerr').style.color = '';
  document.getElementById('apanel').classList.remove('visible');
}

// === LOCALSTORAGE ===
function getDrafts(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch (e) {
    return {};
  }
}

function saveDrafts(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// === СТРАНИЦЫ ===
function getAllPages() {
  var drafts = getDrafts(SK_PAGES);
  var pages = {};
  for (var k in PUBLISHED_PAGES) pages[k] = PUBLISHED_PAGES[k];
  for (var k2 in drafts) {
    if (drafts[k2] === null) delete pages[k2];
    else pages[k2] = drafts[k2];
  }
  return pages;
}

function getPageNums() {
  return Object.keys(getAllPages()).map(Number).sort(function(a, b) {
    return a - b;
  });
}

function isPagePub(n) {
  return PUBLISHED_PAGES.hasOwnProperty(String(n));
}

function isPageModified(n) {
  var drafts = getDrafts(SK_PAGES);
  var key = String(n);
  if (!drafts.hasOwnProperty(key)) return false;
  if (drafts[key] === null) return true;
  if (!PUBLISHED_PAGES.hasOwnProperty(key)) return true;
  return drafts[key] !== PUBLISHED_PAGES[key];
}

// === НОВОСТИ ===
function getAllNews() {
  var drafts = getDrafts(SK_NEWS);
  var news = PUBLISHED_NEWS.slice();

  for (var i = news.length - 1; i >= 0; i--) {
    var id = news[i].id;
    if (drafts.hasOwnProperty(String(id))) {
      if (drafts[String(id)] === null) news.splice(i, 1);
      else news[i] = drafts[String(id)];
    }
  }

  for (var k in drafts) {
    if (drafts[k] !== null) {
      var nid = Number(k);
      var found = false;
      for (var j = 0; j < news.length; j++) {
        if (news[j].id === nid) { found = true; break; }
      }
      if (!found) news.push(drafts[k]);
    }
  }

  news.sort(function(a, b) { return b.id - a.id; });
  return news;
}

function getNextNewsId() {
  var all = getAllNews();
  var max = 0;
  for (var i = 0; i < all.length; i++) {
    if (all[i].id > max) max = all[i].id;
  }
  return max + 1;
}

// === УТИЛИТЫ ===
function esc(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// === РЕНДЕР ===
function render() {
  renderStatus();
  renderSidebar();
  renderContent();
}

function renderStatus() {
  var s = document.getElementById('status');
  var pageCount = Object.keys(PUBLISHED_PAGES).length;
  var newsCount = PUBLISHED_NEWS.length;

  var pageDrafts = getDrafts(SK_PAGES);
  var modifiedPages = 0;
  for (var k in pageDrafts) {
    if (pageDrafts[k] === null || !PUBLISHED_PAGES.hasOwnProperty(k) || pageDrafts[k] !== PUBLISHED_PAGES[k]) {
      modifiedPages++;
    }
  }

  var newsDrafts = getDrafts(SK_NEWS);
  var modifiedNews = 0;
  for (var k2 in newsDrafts) {
    if (newsDrafts[k2] !== null) modifiedNews++;
  }

  s.textContent = 'Админ | Стр: ' + pageCount + ' (черн: ' + modifiedPages + ') | Новостей: ' + newsCount + ' (черн: ' + modifiedNews + ')';
}

function renderSidebar() {
  var html = '';
  var nums = getPageNums();
  var news = getAllNews();

  // Раздел новостей
  html += '<div class="side-section side-news">';
  html += '<div class="side-header side-header-news">Новости</div>';
  if (news.length === 0) {
    html += '<div class="side-empty">Нет новостей</div>';
  } else {
    html += '<div class="side-item side-item-news' + (curView === 'news' ? ' active' : '') + '" onclick="goToNews()">📰 Новости (' + news.length + ')</div>';
  }
  html += '</div>';

  // Раздел страниц
  html += '<div class="side-section">';
  html += '<div class="side-header">Страницы</div>';
  if (nums.length === 0) {
    html += '<div class="side-empty">Нет страниц</div>';
  } else {
    html += '<div class="page-select-wrap">';
    html += '<button class="page-select-btn" onclick="togglePageList()">';
    html += '📄 Стр. ' + curPage + ' <span class="page-select-arrow">▼</span>';
    html += '</button>';
    html += '<div class="page-select-list" id="pageSelectList">';
    for (var i = 0; i < nums.length; i++) {
      var n = nums[i];
      var isActive = (curView === 'page' && n === curPage);
      var badge = '';
      if (isPageModified(n)) badge = ' <span class="badge-dirty">●</span>';
      else if (isPagePub(n)) badge = ' <span class="badge-pub">●</span>';
      html += '<div class="side-item' + (isActive ? ' active' : '') + '" onclick="goToPage(' + n + ')">Стр. ' + n + badge + '</div>';
    }
    html += '</div>';
    html += '</div>';
  }
  html += '</div>';

  document.getElementById('sidebar').innerHTML = html;
}

function togglePageList() {
  var list = document.getElementById('pageSelectList');
  if (list) list.classList.toggle('open');
}

function renderContent() {
  var el = document.getElementById('content');

  if (curView === 'news') {
    renderNews(el);
    return;
  }

  var pages = getAllPages();
  var nums = getPageNums();

  // Режим редактирования
  if (editing && user === 'admin') {
    var content = pages[String(curPage)] || '';
    el.innerHTML = '<textarea id="earea" style="width:100%;min-height:300px;padding:8px;border:1px solid #c0cad5;border-radius:3px;font-family:inherit;font-size:13px;resize:vertical;outline:none" placeholder="Текст страницы..."></textarea>' +
      '<div style="margin-top:10px;display:flex;gap:8px">' +
      '<button class="btn btn-s" onclick="saveEdit()">Сохранить черновик</button>' +
      '<button class="btn" onclick="cancelEdit()">Отмена</button>' +
      '</div>';
    var area = document.getElementById('earea');
    area.value = content;
    area.focus();
    return;
  }

  // Нет страниц
  if (nums.length === 0) {
    el.innerHTML = '<div class="empty-state">Нет страниц</div>';
    return;
  }

  // Проверка текущей страницы
  if (!pages.hasOwnProperty(String(curPage))) curPage = nums[0] || 1;

  var pageContent = pages[String(curPage)] || '';
  var statusBadge = '';

  if (isPageModified(curPage)) {
    statusBadge = '<div style="font-size:11px;color:#e69138;margin-bottom:8px">● Черновик — не виден зрителям</div>';
  } else if (isPagePub(curPage)) {
    statusBadge = '<div style="font-size:11px;color:#4bb34b;margin-bottom:8px">● Опубликовано — виден зрителям</div>';
  }

  if (pageContent.trim() === '') {
    el.innerHTML = statusBadge + '<div class="page-card"><div class="empty-state">Пустая страница ' + curPage + '</div></div>';
  } else {
    el.innerHTML = statusBadge + '<div class="page-card">' + esc(pageContent) + '</div>';
  }
}

function renderNews(el) {
  var news = getAllNews();

  if (news.length === 0) {
    el.innerHTML = '<div class="empty-state">Нет новостей</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < news.length; i++) {
    var item = news[i];
    html += '<div class="news-card">';
    html += '<h3>' + esc(item.title || 'Без заголовка') + '</h3>';
    html += '<div class="date">' + esc(item.date || '') + '</div>';
    html += '<p>' + esc(item.content || '') + '</p>';
    html += '<div style="margin-top:10px;display:flex;gap:8px">';
    html += '<button class="btn" onclick="editNews(' + item.id + ')">Редактировать</button>';
    html += '<button class="btn btn-d" onclick="deleteNews(' + item.id + ')">Удалить</button>';
    html += '</div>';
    html += '</div>';
  }

  el.innerHTML = html;
}

// === НАВИГАЦИЯ ===
function goToPage(n) {
  if (editing) {
    if (!confirm('Выйти из редактирования без сохранения?')) return;
    editing = false;
  }
  curView = 'page';
  curPage = n;
  render();
}

function goToNews() {
  if (editing) {
    if (!confirm('Выйти из редактирования без сохранения?')) return;
    editing = false;
  }
  curView = 'news';
  render();
}

// === СТРАНИЦЫ: СОЗДАНИЕ / РЕДАКТИРОВАНИЕ / УДАЛЕНИЕ ===
function newPage() {
  if (editing) {
    if (!confirm('Выйти из редактирования без сохранения?')) return;
    editing = false;
  }
  var nums = getPageNums();
  var next = nums.length > 0 ? nums[nums.length - 1] + 1 : 1;
  var drafts = getDrafts(SK_PAGES);
  drafts[String(next)] = '';
  saveDrafts(SK_PAGES, drafts);
  curPage = next;
  curView = 'page';
  editing = true;
  render();
}

function toggleEdit() {
  if (editing || curView !== 'page') return;
  var pages = getAllPages();
  if (!pages.hasOwnProperty(String(curPage))) {
    var drafts = getDrafts(SK_PAGES);
    drafts[String(curPage)] = '';
    saveDrafts(SK_PAGES, drafts);
  }
  editing = true;
  render();
}

function saveEdit() {
  var text = document.getElementById('earea').value;
  var drafts = getDrafts(SK_PAGES);
  drafts[String(curPage)] = text;
  saveDrafts(SK_PAGES, drafts);
  editing = false;
  render();
  toast('Страница ' + curPage + ' сохранена в черновик');
}

function cancelEdit() {
  editing = false;
  render();
}

function deletePage() {
  if (curView !== 'page') return;
  var pages = getAllPages();
  if (!pages.hasOwnProperty(String(curPage))) {
    toast('Страница не существует');
    return;
  }

  var preview = (pages[String(curPage)] || '').substring(0, 200);
  if (preview.trim() === '') preview = '(пустая страница)';

  var pubStatus = isPagePub(curPage)
    ? 'Эта страница опубликована и видна зрителям.'
    : 'Эта страница существует только в черновике.';

  showModal(
    '<h2>Удалить страницу ' + curPage + '?</h2>' +
    '<div style="color:#e69138;font-size:12px;margin-bottom:10px">' + pubStatus + '</div>' +
    '<div style="background:#f5f7fa;padding:10px;border-radius:3px;margin-bottom:10px;max-height:100px;overflow-y:auto;white-space:pre-wrap">' + esc(preview) + '</div>' +
    '<div style="color:#999;font-size:12px;margin-bottom:15px">Действие необратимо. После удаления нажмите «Скопировать код» и обновите файл.</div>' +
    '<button class="btn-modal" onclick="confirmDeletePage()">Да, удалить</button>' +
    '<button class="btn-cancel" onclick="closeModal()">Отмена</button>'
  );
}

function confirmDeletePage() {
  var drafts = getDrafts(SK_PAGES);
  if (isPagePub(curPage)) {
    drafts[String(curPage)] = null;
  } else {
    delete drafts[String(curPage)];
  }
  saveDrafts(SK_PAGES, drafts);

  var nums = getPageNums();
  var deletedNum = curPage;

  if (nums.length === 0) {
    curPage = 1;
  } else {
    var prev = null, next = null;
    for (var i = 0; i < nums.length; i++) {
      if (nums[i] < deletedNum) prev = nums[i];
      if (nums[i] > deletedNum && next === null) next = nums[i];
    }
    curPage = next !== null ? next : (prev !== null ? prev : nums[0]);
  }

  closeModal();
  render();

  if (nums.length === 0) {
    toast('Страница ' + deletedNum + ' удалена. Страниц больше нет.');
  } else {
    toast('Страница ' + deletedNum + ' удалена. Открыта страница ' + curPage);
  }
}

// === НОВОСТИ: СОЗДАНИЕ / РЕДАКТИРОВАНИЕ / УДАЛЕНИЕ ===
function addNews() {
  var id = getNextNewsId();
  var dateStr = new Date().toLocaleDateString('ru-RU');

  showModal(
    '<h2>Новая новость</h2>' +
    '<input type="text" id="newsTitle" placeholder="Заголовок">' +
    '<textarea id="newsContent" placeholder="Текст новости..."></textarea>' +
    '<button class="btn-modal" onclick="saveNewNews(' + id + ',\'' + dateStr + '\')">Создать</button>' +
    '<button class="btn-cancel" onclick="closeModal()">Отмена</button>'
  );

  setTimeout(function() {
    document.getElementById('newsTitle').focus();
  }, 50);
}

function saveNewNews(id, dateStr) {
  var title = document.getElementById('newsTitle').value;
  var content = document.getElementById('newsContent').value;
  var drafts = getDrafts(SK_NEWS);

  drafts[String(id)] = { id: id, title: title, content: content, date: dateStr };
  saveDrafts(SK_NEWS, drafts);

  closeModal();
  curView = 'news';
  render();
  toast('Новость создана (черновик)');
}

function editNews(id) {
  var news = getAllNews();
  var item = null;

  for (var i = 0; i < news.length; i++) {
    if (news[i].id === id) { item = news[i]; break; }
  }
  if (!item) return;

  showModal(
    '<h2>Редактировать новость</h2>' +
    '<input type="text" id="newsTitle" value="' + esc(item.title || '') + '" placeholder="Заголовок">' +
    '<textarea id="newsContent" placeholder="Текст новости...">' + esc(item.content || '') + '</textarea>' +
    '<button class="btn-modal" onclick="saveEditNews(' + id + ',\'' + esc(item.date || '') + '\')">Сохранить</button>' +
    '<button class="btn-cancel" onclick="closeModal()">Отмена</button>'
  );

  setTimeout(function() {
    document.getElementById('newsTitle').focus();
  }, 50);
}

function saveEditNews(id, dateStr) {
  var title = document.getElementById('newsTitle').value;
  var content = document.getElementById('newsContent').value;
  var drafts = getDrafts(SK_NEWS);

  drafts[String(id)] = { id: id, title: title, content: content, date: dateStr };
  saveDrafts(SK_NEWS, drafts);

  closeModal();
  render();
  toast('Новость сохранена (черновик)');
}

function deleteNews(id) {
  var news = getAllNews();
  var item = null;

  for (var i = 0; i < news.length; i++) {
    if (news[i].id === id) { item = news[i]; break; }
  }
  if (!item) return;

  showModal(
    '<h2>Удалить новость?</h2>' +
    '<div style="background:#f5f7fa;padding:10px;border-radius:3px;margin-bottom:10px"><b>' + esc(item.title || '') + '</b></div>' +
    '<div style="color:#999;font-size:12px;margin-bottom:15px">Действие необратимо.</div>' +
    '<button class="btn-modal" style="background:#dd4b39" onclick="confirmDeleteNews(' + id + ')">Да, удалить</button>' +
    '<button class="btn-cancel" onclick="closeModal()">Отмена</button>'
  );
}

function confirmDeleteNews(id) {
  var drafts = getDrafts(SK_NEWS);
  drafts[String(id)] = null;
  saveDrafts(SK_NEWS, drafts);
  closeModal();
  render();
  toast('Новость удалена (черновик)');
}

// === СТАТУС ПУБЛИКАЦИИ ===
function showPublished() {
  var pubPages = getPageNums().filter(function(n) { return isPagePub(n); });

  var html = '<h2>Видные зрителям</h2>';
  html += '<p style="margin-bottom:10px">Страницы (в файле):</p>';

  if (pubPages.length === 0) {
    html += '<div style="color:#999;margin-bottom:15px">Нет опубликованных страниц</div>';
  } else {
    html += '<div style="margin-bottom:15px">';
    for (var i = 0; i < pubPages.length; i++) {
      var mod = isPageModified(pubPages[i]);
      html += '<div style="padding:4px 0">Стр. ' + pubPages[i];
      html += mod ? ' <span style="color:#e69138">(есть черновик)</span>' : ' <span style="color:#4bb34b">✓</span>';
      html += '</div>';
    }
    html += '</div>';
  }

  html += '<p style="margin-bottom:10px">Новостей (в файле): ' + PUBLISHED_NEWS.length + '</p>';

  var newsDrafts = getDrafts(SK_NEWS);
  var newsDraftCount = 0;
  for (var k in newsDrafts) {
    if (newsDrafts[k] !== null) newsDraftCount++;
  }
  if (newsDraftCount > 0) {
    html += '<div style="color:#e69138;margin-bottom:10px">Черновиков новостей: ' + newsDraftCount + '</div>';
  }

  html += '<div style="color:#999;font-size:12px;margin-bottom:15px">Нажмите «Скопировать код» и сохраните новый файл, чтобы изменения стали видны.</div>';
  html += '<button class="btn-cancel" onclick="closeModal()">Закрыть</button>';

  showModal(html);
}

// === ЭКСПОРТ КОДА ===
function copyCode() {
  var pages = getAllPages();
  var cleanPages = {};
  for (var k in pages) {
    if (pages[k] !== null && pages[k] !== undefined && pages[k] !== '') {
      cleanPages[k] = pages[k];
    }
  }

  var news = getAllNews();
  var cleanNews = [];
  for (var i = 0; i < news.length; i++) {
    if (news[i] && (news[i].title || news[i].content)) {
      cleanNews.push({
        id: news[i].id,
        title: news[i].title,
        content: news[i].content,
        date: news[i].date || ''
      });
    }
  }

  buildViewerSite(CSS_TEXT, JSON.stringify(cleanPages), JSON.stringify(cleanNews));
}

function buildViewerSite(cssText, jsonPages, jsonNews) {
  // Защита от </script> в данных
  jsonPages = jsonPages.replace(/<\/script/gi, '<\\/script');
  jsonNews = jsonNews.replace(/<\/script/gi, '<\\/script');

  var L = [];

  // --- HTML структура ---
  L.push('<!DOCTYPE html>');
  L.push('<html lang="ru">');
  L.push('<head>');
  L.push('<meta charset="UTF-8">');
  L.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
  L.push('<title>ВЗБ</title>');
  L.push('<style>');
  L.push(cssText);
  L.push('</style>');
  L.push('</head>');
  L.push('<body>');
  L.push('<div id="login">');
  L.push('<div class="login-box"><h1>ВЗБ</h1><div class="login-sub">Введите пароль</div>');
  L.push('<input type="password" id="pwd" placeholder="Пароль" autocomplete="off">');
  L.push('<button id="loginBtn">Войти</button>');
  L.push('<div class="lerr" id="lerr"></div></div></div>');
  L.push('<div id="app">');
  L.push('<div class="header"><div class="header-inner"><span class="logo">ВЗБ</span><span class="status-text" id="status"></span><button class="btn-link" id="outBtn">Выход</button></div></div>');
  L.push('<div class="layout"><div class="sidebar" id="sidebar"></div><div class="content" id="content"></div></div>');
  L.push('</div>');

  // --- JS зрительской версии ---
  L.push('<script>');
  L.push('var PUBLISHED_PAGES = ' + jsonPages + ';');
  L.push('var PUBLISHED_NEWS = ' + jsonNews + ';');
  L.push('var VPWD = "взб";');
  L.push('var user = null, curView = "page", curPage = 1;');
  L.push('document.getElementById("loginBtn").onclick = login;');
  L.push('document.getElementById("pwd").addEventListener("keydown", function(e){ if(e.key==="Enter") login(); });');
  L.push('document.getElementById("outBtn").onclick = logout;');

  // login
  L.push('function login(){');
  L.push('  var p = document.getElementById("pwd").value;');
  L.push('  var err = document.getElementById("lerr");');
  L.push('  if(p === VPWD){');
  L.push('    err.style.color = "#4bb34b";');
  L.push('    err.textContent = "\\u2713 Верно. Вход...";');
  L.push('    setTimeout(function(){');
  L.push('      document.getElementById("login").style.display = "none";');
  L.push('      document.getElementById("app").style.display = "flex";');
  L.push('      user = "viewer";');
  L.push('      render();');
  L.push('      err.textContent = "";');
  L.push('      err.style.color = "";');
  L.push('    }, 400);');
  L.push('  } else {');
  L.push('    err.style.color = "#dd4b39";');
  L.push('    err.textContent = "\\u2717 Неверный пароль";');
  L.push('    document.getElementById("pwd").value = "";');
  L.push('    document.getElementById("pwd").focus();');
  L.push('  }');
  L.push('}');

  // logout
  L.push('function logout(){');
  L.push('  user = null; curView = "page"; curPage = 1;');
  L.push('  document.getElementById("app").style.display = "none";');
  L.push('  document.getElementById("login").style.display = "flex";');
  L.push('  document.getElementById("pwd").value = "";');
  L.push('  document.getElementById("lerr").textContent = "";');
  L.push('  document.getElementById("lerr").style.color = "";');
  L.push('}');

  // utils
  L.push('function esc(t){ var d=document.createElement("div"); d.textContent=t; return d.innerHTML; }');
  L.push('function getPageNums(){ return Object.keys(PUBLISHED_PAGES).map(Number).sort(function(a,b){return a-b;}); }');
  L.push('function getNews(){ return PUBLISHED_NEWS.slice().sort(function(a,b){return b.id-a.id;}); }');
  L.push('function render(){ renderStatus(); renderSidebar(); renderContent(); }');

  // renderStatus
  L.push('function renderStatus(){');
  L.push('  document.getElementById("status").textContent = "Зритель | Стр: " + Object.keys(PUBLISHED_PAGES).length + " | Новостей: " + PUBLISHED_NEWS.length;');
  L.push('}');

  // renderSidebar
  L.push('function renderSidebar(){');
  L.push('  var h = "", nums = getPageNums();');
  L.push('  var news = getNews();');
  L.push('  h += \'<div class="side-section side-news">\';');
  L.push('  h += \'<div class="side-header side-header-news">Новости</div>\';');
  L.push('  if(news.length === 0){ h += \'<div class="side-empty">Нет новостей</div>\'; }');
  L.push('  else { h += \'<div class="side-item side-item-news\'+(curView===\'news\'?\' active\':\'\')+\'" onclick="goToNews()">\\uD83D\\uDCF0 Новости (\'+news.length+\')</div>\'; }');
  L.push('  h += \'</div>\';');
  L.push('  h += \'<div class="side-section"><div class="side-header">Страницы</div>\';');
  L.push('  if(nums.length === 0){ h += \'<div class="side-empty">Нет страниц</div>\'; }');
  L.push('  else {');
  L.push('    h += \'<div class="page-select-wrap"><button class="page-select-btn" onclick="togglePageList()">\\uD83D\\uDCC4 Стр. \'+curPage+\' <span class="page-select-arrow">\\u25BC</span></button>\';');
  L.push('    h += \'<div class="page-select-list" id="pageSelectList">\';');
  L.push('    for(var i=0;i<nums.length;i++){ var n=nums[i]; var act=(curView===\'page\'&&n===curPage); h += \'<div class="side-item\'+(act?\' active\':\'\')+\'" onclick="goToPage(\'+n+\')">Стр. \'+n+\'</div>\'; }');
  L.push('    h += \'</div></div>\';');
  L.push('  }');
  L.push('  h += \'</div>\';');
  L.push('  document.getElementById("sidebar").innerHTML = h;');
  L.push('}');

  // togglePageList
  L.push('function togglePageList(){ var list=document.getElementById("pageSelectList"); if(list) list.classList.toggle("open"); }');

  // renderContent
  L.push('function renderContent(){');
  L.push('  var el = document.getElementById("content");');
  L.push('  if(curView === "news"){');
  L.push('    var news = getNews();');
  L.push('    if(news.length === 0){ el.innerHTML = \'<div class="empty-state">Нет новостей</div>\'; return; }');
  L.push('    var h = "";');
  L.push('    for(var i=0;i<news.length;i++){ var item=news[i]; h += \'<div class="news-card"><h3>\'+esc(item.title||"Без заголовка")+\'</h3><div class="date">\'+esc(item.date||"")+\'</div><p>\'+esc(item.content||"")+\'</p></div>\'; }');
  L.push('    el.innerHTML = h; return;');
  L.push('  }');
  L.push('  var nums = getPageNums();');
  L.push('  if(nums.length === 0){ el.innerHTML = \'<div class="empty-state">Нет страниц</div>\'; return; }');
  L.push('  if(!PUBLISHED_PAGES.hasOwnProperty(String(curPage))) curPage = nums[0]||1;');
  L.push('  var pc = PUBLISHED_PAGES[String(curPage)]||"";');
  L.push('  if(pc.trim() === "") el.innerHTML = \'<div class="page-card"><div class="empty-state">Пустая страница \'+curPage+\'</div></div>\';');
  L.push('  else el.innerHTML = \'<div class="page-card">\'+esc(pc)+\'</div>\';');
  L.push('}');

  // navigation
  L.push('function goToPage(n){ curView="page"; curPage=n; render(); }');
  L.push('function goToNews(){ curView="news"; render(); }');

  // keyboard nav
  L.push('document.addEventListener("keydown", function(e){');
  L.push('  if(!user) return;');
  L.push('  if(e.target.tagName === "INPUT") return;');
  L.push('  if(curView !== "page") return;');
  L.push('  var nums = getPageNums(); if(nums.length === 0) return;');
  L.push('  var idx = nums.indexOf(curPage);');
  L.push('  if(e.key === "ArrowLeft" && idx > 0){ curPage = nums[idx-1]; render(); }');
  L.push('  else if(e.key === "ArrowRight" && idx < nums.length-1){ curPage = nums[idx+1]; render(); }');
  L.push('});');

  L.push('<\/script>');
  L.push('</body>');
  L.push('</html>');

  var html = L.join('\n');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(html).then(function() {
      toast('Код для зрителей скопирован! Вставьте в index.html и сохраните.');
    }).catch(function() {
      showCodeModal(html);
    });
  } else {
    showCodeModal(html);
  }
}

function showCodeModal(html) {
  showModal(
    '<h2>Код для зрителей</h2>' +
    '<p style="margin-bottom:10px">Скопируйте (Ctrl+A → Ctrl+C) и вставьте в index.html:</p>' +
    '<textarea readonly id="codeArea" style="height:200px;font-family:Consolas,monospace;font-size:11px" onclick="this.select()"></textarea>' +
    '<button class="btn-cancel" onclick="closeModal()">Закрыть</button>'
  );
  setTimeout(function() {
    document.getElementById('codeArea').value = html;
  }, 50);
}

// === МОДАЛЬНЫЕ ОКНА ===
function showModal(html) {
  var root = document.getElementById('modal-root');
  root.classList.add('open');
  root.innerHTML = '<div class="overlay" onclick="closeModal()"></div><div class="modal">' + html + '</div>';
}

function closeModal() {
  var root = document.getElementById('modal-root');
  root.classList.remove('open');
  root.innerHTML = '';
}

// === TOAST ===
var toastTimer;
function toast(msg) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();

  var el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:4px;font-size:13px;z-index:10001;font-family:Tahoma,Arial,sans-serif';

  document.body.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { el.remove(); }, 3000);
}

// === КЛАВИАТУРА ===
document.addEventListener('keydown', function(e) {
  if (!user || editing) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (curView !== 'page') return;

  var nums = getPageNums();
  if (nums.length === 0) return;

  var idx = nums.indexOf(curPage);
  if (e.key === 'ArrowLeft' && idx > 0) {
    curPage = nums[idx - 1];
    render();
  } else if (e.key === 'ArrowRight' && idx < nums.length - 1) {
    curPage = nums[idx + 1];
    render();
  }
});
