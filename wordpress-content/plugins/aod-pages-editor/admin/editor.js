(function(){
  const rootId = 'aod-admin-root';
  const restBase = (window.AOD_CONFIG && window.AOD_CONFIG.restBase) || '/wp-json/aod/v1/';
  const nonce = (window.AOD_CONFIG && window.AOD_CONFIG.nonce) || '';

  /** @type {Array<{slug:string,title:string,path?:string}>} */
  let pages = [];
  /** @type {string|null} */
  let activeSlug = null;
  /** @type {{header:{text:Object,images:Object}, page:{text:Object,images:Object}, footer:{text:Object,images:Object}}} */
  let formState = {
    header: { text: {}, images: {} },
    page:   { text: {}, images: {} },
    footer: { text: {}, images: {} },
  };

  function el(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; }

  function api(path, opts){
    const url = restBase.replace(/\/$/, '') + '/' + path.replace(/^\//,'');
    const headers = { 'Content-Type': 'application/json' };
    if (nonce) headers['X-WP-Nonce'] = nonce;
    return fetch(url, Object.assign({ headers, credentials: 'same-origin' }, opts||{}));
  }

  function render(){
    const root = document.getElementById(rootId);
    if (!root) return;
    root.innerHTML = '';
    const layout = el('<div class="aod-flex"><div class="aod-sidebar"></div><div class="aod-content"></div></div>');
    const sidebar = layout.querySelector('.aod-sidebar');
    const content = layout.querySelector('.aod-content');

    // Sidebar: pages list
    const ul = el('<div></div>');
    pages.forEach(p => {
      const item = el(`<div class="aod-page ${activeSlug===p.slug?'active':''}" data-slug="${p.slug}"><strong>${p.title}</strong><br><small>${p.slug}</small></div>`);
      item.addEventListener('click', () => {
        if (activeSlug !== p.slug) loadPage(p.slug);
      });
      ul.appendChild(item);
    });
    sidebar.appendChild(ul);

    // Content editor
    if (!activeSlug){
      content.appendChild(el('<p>Select a page to edit.</p>'));
    } else {
      const head = el(`<div><h2>Edit: ${activeSlug}</h2></div>`);
      content.appendChild(head);

      // Sections: Header / Page / Footer
      const sectionTitles = { header: 'Header', page: 'Page', footer: 'Footer' };
      ['header','page','footer'].forEach((secKey) => {
        const secWrap = el(
          `<div class="aod-section">
            <h3>${sectionTitles[secKey]}</h3>
            <div class="aod-subsection">
              <h4>Text</h4>
              <div class="aod-rows" id="aod-${secKey}-text"></div>
              <button class="button" id="aod-add-${secKey}-text">Add Text Row</button>
            </div>
            <div class="aod-subsection">
              <h4>Images</h4>
              <div class="aod-rows" id="aod-${secKey}-img"></div>
              <button class="button" id="aod-add-${secKey}-img">Add Image Row</button>
            </div>
          </div>`
        );
        content.appendChild(secWrap);

        const textRows = secWrap.querySelector(`#aod-${secKey}-text`);
        const imgRows  = secWrap.querySelector(`#aod-${secKey}-img`);

        function renderTextRows(){
          textRows.innerHTML = '';
          Object.keys(formState[secKey].text).sort().forEach(k => {
            const v = formState[secKey].text[k] ?? '';
            const row = el(`<div class="aod-row"><input type="text" value="${k}"><input type="text" value="${v}"><button class="button-link-delete">Delete</button></div>`);
            const [keyInput, valInput, delBtn] = row.querySelectorAll('input,button');
            keyInput.addEventListener('change', () => {
              const newKey = keyInput.value.trim();
              if (!newKey) return;
              const oldVal = formState[secKey].text[k];
              delete formState[secKey].text[k];
              formState[secKey].text[newKey] = oldVal;
              renderTextRows();
            });
            valInput.addEventListener('input', () => {
              formState[secKey].text[k] = valInput.value;
            });
            delBtn.addEventListener('click', () => {
              delete formState[secKey].text[k];
              renderTextRows();
            });
            textRows.appendChild(row);
          });
        }
        function renderImgRows(){
          imgRows.innerHTML = '';
          Object.keys(formState[secKey].images).sort().forEach(k => {
            const v = formState[secKey].images[k] ?? '';
            const row = el(`<div class="aod-row"><input type="text" value="${k}"><input type="url" value="${v}"><button class="button-link-delete">Delete</button></div>`);
            const [keyInput, valInput, delBtn] = row.querySelectorAll('input,button');
            keyInput.addEventListener('change', () => {
              const newKey = keyInput.value.trim();
              if (!newKey) return;
              const oldVal = formState[secKey].images[k];
              delete formState[secKey].images[k];
              formState[secKey].images[newKey] = oldVal;
              renderImgRows();
            });
            valInput.addEventListener('input', () => {
              formState[secKey].images[k] = valInput.value;
            });
            delBtn.addEventListener('click', () => {
              delete formState[secKey].images[k];
              renderImgRows();
            });
            imgRows.appendChild(row);
          });
        }
        renderTextRows();
        renderImgRows();
        secWrap.querySelector(`#aod-add-${secKey}-text`).addEventListener('click', () => {
          let base = 'key'; let i=1; let candidate = base; while(formState[secKey].text[candidate]) { i++; candidate = base + '-' + i; }
          formState[secKey].text[candidate] = '';
          renderTextRows();
        });
        secWrap.querySelector(`#aod-add-${secKey}-img`).addEventListener('click', () => {
          let base = 'image.key'; let i=1; let candidate = base; while(formState[secKey].images[candidate]) { i++; candidate = base + '.' + i; }
          formState[secKey].images[candidate] = '';
          renderImgRows();
        });
      });

      // Actions
      const actions = el('<div class="aod-actions"><button class="button button-primary" id="aod-save">Save</button><span id="aod-status" style="margin-left:8px;"></span></div>');
      content.appendChild(actions);
      const saveBtn = actions.querySelector('#aod-save');
      const statusEl = actions.querySelector('#aod-status');
      saveBtn.addEventListener('click', async () => {
        statusEl.textContent = 'Saving...';
        try {
          const res = await api('pages/' + encodeURIComponent(activeSlug), {
            method: 'POST',
            body: JSON.stringify({ header: formState.header, page: formState.page, footer: formState.footer })
          });
          if (!res.ok) throw new Error('Failed with ' + res.status);
          statusEl.textContent = 'Saved';
          setTimeout(()=> statusEl.textContent = '', 1500);
        } catch (e) {
          console.error(e);
          statusEl.textContent = 'Error saving';
        }
      });
    }

    root.appendChild(layout);
  }

  async function loadPages(){
    const res = await api('pages');
    if (res.ok) pages = await res.json();
    else pages = [];
    // Preserve selection if exists
    if (activeSlug && !pages.find(p=>p.slug===activeSlug)) activeSlug = null;
    render();
  }

  async function loadPage(slug){
    activeSlug = slug;
    render();
    // Load existing overrides
    const res = await api('pages/' + encodeURIComponent(slug));
    if (res.ok){
      const data = await res.json();
      const norm = (sec) => ({ text: (sec && sec.text) || {}, images: (sec && sec.images) || {} });
      formState = {
        header: norm(data && data.header),
        page:   norm(data && data.page),
        footer: norm(data && data.footer),
      };
    } else {
      formState = { header:{text:{},images:{}}, page:{text:{},images:{}}, footer:{text:{},images:{}} };
    }
    render();
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadPages();
  });
})();
