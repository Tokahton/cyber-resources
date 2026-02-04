(function () {
  const STORAGE_KEY = 'cyber-resources-active-tab';
  const tabIds = ['tools', 'tutorials', 'cert', 'thm'];

  const tabButtons = tabIds.map(function (id) {
    return document.getElementById('tab-' + id);
  }).filter(Boolean);

  const panels = tabIds.map(function (id) {
    return document.getElementById('panel-' + id);
  }).filter(Boolean);

  function setActiveTab(activeId) {
    tabButtons.forEach(function (btn) {
      var id = btn.id.replace('tab-', '');
      var isActive = id === activeId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      var id = panel.id.replace('panel-', '');
      var isActive = id === activeId;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });

    try {
      localStorage.setItem(STORAGE_KEY, activeId);
    } catch (e) {}
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.id.replace('tab-', '');
      setActiveTab(id);
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      var i = tabButtons.indexOf(btn);
      var next = e.key === 'ArrowRight' ? i + 1 : i - 1;
      if (next < 0) next = tabButtons.length - 1;
      if (next >= tabButtons.length) next = 0;
      var nextId = tabButtons[next].id.replace('tab-', '');
      setActiveTab(nextId);
      tabButtons[next].focus();
    });
  });

  var saved = '';
  try {
    saved = localStorage.getItem(STORAGE_KEY) || '';
  } catch (e) {}
  if (saved && tabIds.indexOf(saved) !== -1) {
    setActiveTab(saved);
  } else {
    setActiveTab('tools');
  }
})();
