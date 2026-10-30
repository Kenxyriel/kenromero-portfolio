// Invoice maker: live A4 invoice preview and PDF download. Everything stays in this browser.
(function () {
  const $ = id => document.getElementById(id);
  const KEEP = ['f-name', 'f-role', 'f-email', 'f-web', 'f-pay', 'f-terms', 'f-cur'];
  const STORE = 'kr-invoice-profile';
  const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const addDays = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return iso(d); };
  const fmtDate = s => s ? new Date(s + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let part = 'deposit';
  let items = [
    { desc: 'Social media management package', note: 'November 2026', qty: 1, rate: 450 }
  ];

  function money(n) {
    const cur = $('f-cur').value;
    return new Intl.NumberFormat(cur === 'PHP' ? 'en-PH' : 'en-US', { style: 'currency', currency: cur }).format(n || 0);
  }

  function loadProfile() {
    try {
      const p = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (p) KEEP.forEach(k => { if (typeof p[k] === 'string') $(k).value = p[k]; });
    } catch (e) {}
  }
  function saveProfile() {
    try { const p = {}; KEEP.forEach(k => p[k] = $(k).value); localStorage.setItem(STORE, JSON.stringify(p)); } catch (e) {}
  }

  function renderItems() {
    const host = $('items');
    host.innerHTML = '';
    items.forEach((it, i) => {
      const row = document.createElement('div');
      row.style.display = 'grid'; row.style.gap = '6px';
      row.innerHTML =
        '<div class="item">' +
          '<label><span>Description</span><input id="it-d-' + i + '" placeholder="Description" value="' + esc(it.desc) + '"></label>' +
          '<label><span>Quantity</span><input id="it-q-' + i + '" type="number" min="0" step="1" inputmode="decimal" value="' + esc(it.qty) + '" aria-label="Quantity"></label>' +
          '<label><span>Price</span><input id="it-r-' + i + '" type="number" min="0" step="0.01" inputmode="decimal" value="' + esc(it.rate) + '" aria-label="Price"></label>' +
          '<button type="button" class="remove" aria-label="Remove item" data-i="' + i + '">✕</button>' +
        '</div>' +
        '<label><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Detail</span><input id="it-n-' + i + '" placeholder="Detail, e.g. month or platforms (optional)" value="' + esc(it.note) + '" style="font-size:13px;min-height:36px"></label>';
      host.appendChild(row);
      row.querySelector('#it-d-' + i).addEventListener('input', e => { it.desc = e.target.value; render(); });
      row.querySelector('#it-n-' + i).addEventListener('input', e => { it.note = e.target.value; render(); });
      row.querySelector('#it-q-' + i).addEventListener('input', e => { it.qty = parseFloat(e.target.value) || 0; render(); });
      row.querySelector('#it-r-' + i).addEventListener('input', e => { it.rate = parseFloat(e.target.value) || 0; render(); });
      row.querySelector('.remove').addEventListener('click', () => { items.splice(i, 1); if (!items.length) items.push({ desc: '', note: '', qty: 1, rate: 0 }); renderItems(); render(); });
    });
  }

  const LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke-width="2.6" stroke-linecap="round"><path d="M32 59A27 27 0 0 1 32 5" stroke="#f2b124"/><path d="M32 5A27 27 0 0 1 55.38 45.5" stroke="#d9d9d9"/><path d="M48.62 53.28A27 27 0 0 1 32.94 58.98" stroke="#4b4b4b"/></g><g fill="none" stroke-width="5.4" transform="translate(32 32) scale(1.08) translate(-32 -32)"><g stroke="#262626"><path d="M19 19V45"/><path d="M19 35.5L32 19M24 30.5L34.1 45"/></g><path d="M31.5 21.7H38a6.3 6.3 0 0 1 0 12.6H33.5" stroke="#f2b124" stroke-linejoin="round"/><path d="M35.5 34.3L50.3 47.4" stroke="#f2b124"/></g></svg>';

  function sheetHTML() {
    const subtotal = items.reduce((s, it) => s + (it.qty || 0) * (it.rate || 0), 0);
    const share = part === 'full' ? 1 : 0.5;
    const due = Math.round(subtotal * share * 100) / 100;
    const paid = $('f-paid').checked;
    const partLabel = { deposit: '50% deposit', final: 'Final 50%', full: 'Full amount' }[part];
    const terms = $('f-terms').value.split('\n').map(s => s.trim()).filter(Boolean);
    const contact = [$('f-email').value, $('f-web').value].filter(Boolean).join('\n');
    const billTo = [$('f-contact').value, $('f-cemail').value, $('f-caddr').value].filter(Boolean).join('\n');
    const rows = items.filter(it => it.desc || it.rate).map(it =>
      '<tr><td>' + esc(it.desc || 'Item') + (it.note ? '<span class="sub">' + esc(it.note) + '</span>' : '') + '</td>' +
      '<td class="num">' + esc(it.qty) + '</td><td class="num">' + money(it.rate) + '</td><td class="num">' + money((it.qty || 0) * (it.rate || 0)) + '</td></tr>').join('');
    return '<div class="sheet">' +
      '<div class="s-band"></div>' +
      (paid ? '<div class="paid">PAID<small>' + esc(fmtDate($('f-paidon').value)) + '</small></div>' : '') +
      '<div class="s-body">' +
        '<div class="s-top">' +
          '<div class="s-from">' + LOGO + '<div><div class="s-name">' + esc($('f-name').value) + '</div><div class="s-role">' + esc($('f-role').value) + '</div></div></div>' +
          '<div class="s-title"><h2>' + (paid ? 'Receipt' : 'Invoice') + '</h2><div class="s-no">No. ' + esc($('f-no').value) + '</div></div>' +
        '</div>' +
        '<div class="s-meta">' +
          '<div><div class="s-label">Bill to</div><p class="strong">' + esc($('f-client').value) + '</p><p>' + esc(billTo) + '</p></div>' +
          '<div><div class="s-label">Issued</div><p>' + esc(fmtDate($('f-issued').value)) + '</p></div>' +
          '<div><div class="s-label">' + (paid ? 'Paid on' : 'Due') + '</div><p>' + esc(fmtDate(paid ? $('f-paidon').value : $('f-due').value)) + '</p></div>' +
        '</div>' +
        '<table class="s-items"><thead><tr><th>Description</th><th class="num">Qty</th><th class="num">Price</th><th class="num">Amount</th></tr></thead><tbody>' + rows + '</tbody></table>' +
        '<div class="s-sum">' +
          '<div class="s-pay"><div class="s-label">How to pay</div><p>' + esc($('f-pay').value) + '</p><p class="ref">Please use <b>' + esc($('f-no').value) + '</b> as the payment reference.</p></div>' +
          '<div class="s-totals">' +
            '<div><span>Package total</span><span>' + money(subtotal) + '</span></div>' +
            (part !== 'full' ? '<div class="muted"><span>This invoice: ' + partLabel + '</span><span>' + money(due) + '</span></div>' : '') +
            (part === 'final' ? '<div class="muted"><span>Deposit already paid</span><span>' + money(subtotal - due) + '</span></div>' : '') +
            '<div class="ticket"><div class="t-lab">' + (paid ? 'Amount paid' : 'Amount due') + ' · ' + $('f-cur').value + '</div><div class="t-amt">' + money(due) + '</div>' +
            '<div class="t-due">' + (paid ? 'Received with thanks.' : 'Due by ' + esc(fmtDate($('f-due').value))) + '</div></div>' +
          '</div>' +
        '</div>' +
        (terms.length ? '<div class="s-terms"><div class="s-label">Terms</div><ul>' + terms.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul></div>' : '') +
      '</div>' +
      '<div class="s-foot"><div class="s-thanks">Thank you for working with me.</div><div class="s-contact">' + esc(contact) + '</div></div>' +
    '</div>';
  }

  function fit() {
    const w = $('fit').clientWidth;
    const s = Math.min(1, w / 794);
    const inner = $('fit-inner');
    inner.style.transform = 'scale(' + s + ')';
    $('fit').style.height = (inner.firstElementChild.firstElementChild.offsetHeight * s) + 'px';
  }

  function render() {
    $('sheet-host').innerHTML = sheetHTML();
    fit();
  }

  function setPart(p) {
    part = p;
    document.querySelectorAll('[data-part]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.part === p)));
    render();
  }

  function status(msg, err) { const s = $('status'); s.textContent = msg; s.classList.toggle('err', !!err); }

  async function downloadPDF() {
    const btn = $('btn-pdf');
    btn.disabled = true; status('Making your PDF…');
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      const host = $('capture-host');
      host.innerHTML = sheetHTML();
      const el = host.firstElementChild;
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false });
      host.innerHTML = '';
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
      const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
      const pagePx = Math.floor(canvas.width * ph / pw);
      for (let y = 0, page = 0; y < canvas.height; y += pagePx, page++) {
        const slice = document.createElement('canvas');
        slice.width = canvas.width; slice.height = Math.min(pagePx, canvas.height - y);
        const ctx = slice.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, y, canvas.width, slice.height, 0, 0, canvas.width, slice.height);
        if (page) pdf.addPage();
        pdf.addImage(slice.toDataURL('image/jpeg', 0.94), 'JPEG', 0, 0, pw, slice.height * pw / slice.width);
      }
      const name = (($('f-paid').checked ? 'Receipt ' : 'Invoice ') + $('f-no').value + ' ' + $('f-client').value).replace(/[\\/:*?"<>|]+/g, '').replace(/[.\s]+$/, '') + '.pdf';
      pdf.save(name);
      saveProfile();
      saveCurrent(true);
      status('Downloaded ' + name + ' and saved it to your list.');
    } catch (e) {
      status('Could not make the PDF' + (e && e.message ? ': ' + e.message : '.'), true);
    } finally { btn.disabled = false; }
  }

  // Saved invoices live in this browser, keyed by invoice number.
  const SAVED = 'kr-invoices';
  const PREFIX = 'KR-';
  function readSaved() {
    try { const list = JSON.parse(localStorage.getItem(SAVED) || '[]'); return Array.isArray(list) ? list : []; } catch (e) { return []; }
  }
  function writeSaved(list) {
    try { localStorage.setItem(SAVED, JSON.stringify(list)); return true; } catch (e) { status('Could not save. This browser is blocking storage.', true); return false; }
  }
  const numOf = no => { const m = /(\d+)\s*$/.exec(no || ''); return m ? parseInt(m[1], 10) : 0; };
  function nextNo() {
    return PREFIX + (readSaved().reduce((max, inv) => Math.max(max, numOf(inv.no)), 0) + 1);
  }
  const totalOf = inv => {
    const subtotal = inv.items.reduce((s, it) => s + (it.qty || 0) * (it.rate || 0), 0);
    return Math.round(subtotal * (inv.part === 'full' ? 1 : 0.5) * 100) / 100;
  };
  function currentInvoice() {
    return {
      no: $('f-no').value.trim(), cur: $('f-cur').value, issued: $('f-issued').value, due: $('f-due').value,
      client: $('f-client').value, contact: $('f-contact').value, cemail: $('f-cemail').value, caddr: $('f-caddr').value,
      items: items.map(it => ({ ...it })), part, paid: $('f-paid').checked, paidon: $('f-paidon').value,
      savedAt: new Date().toISOString(),
    };
  }
  function saveCurrent(quiet) {
    const inv = currentInvoice();
    if (!inv.no) { status('Add an invoice number first.', true); return false; }
    const list = readSaved().filter(x => x.no !== inv.no);
    list.push(inv);
    if (!writeSaved(list)) return false;
    renderSaved();
    if (!quiet) status('Saved ' + inv.no + '.');
    return true;
  }
  function openInvoice(no) {
    const inv = readSaved().find(x => x.no === no);
    if (!inv) return;
    $('f-no').value = inv.no; $('f-cur').value = inv.cur; $('f-issued').value = inv.issued; $('f-due').value = inv.due;
    $('f-client').value = inv.client; $('f-contact').value = inv.contact; $('f-cemail').value = inv.cemail; $('f-caddr').value = inv.caddr || '';
    $('f-paid').checked = !!inv.paid; $('f-paidon').value = inv.paidon || iso(new Date()); $('paid-on-wrap').hidden = !inv.paid;
    items = inv.items.map(it => ({ ...it }));
    if (!items.length) items = [{ desc: '', note: '', qty: 1, rate: 0 }];
    $('stage-note').textContent = '';
    setPart(inv.part || 'deposit'); renderItems(); render();
    status('Opened ' + inv.no + '.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  let pendingDelete = null;
  function deleteInvoice(no) {
    if (pendingDelete !== no) { pendingDelete = no; renderSaved(); return; }
    pendingDelete = null;
    writeSaved(readSaved().filter(x => x.no !== no));
    renderSaved();
    status('Deleted ' + no + '.');
  }
  function renderSaved() {
    const list = readSaved().sort((a, b) => numOf(b.no) - numOf(a.no));
    $('saved-count').textContent = list.length ? list.length + (list.length === 1 ? ' invoice · ' : ' invoices · ') : '';
    $('saved-empty').hidden = list.length > 0;
    $('saved-wrap').hidden = list.length === 0;
    const body = $('saved-body');
    body.innerHTML = '';
    list.forEach(inv => {
      const tr = document.createElement('tr');
      const fmt = new Intl.NumberFormat(inv.cur === 'PHP' ? 'en-PH' : 'en-US', { style: 'currency', currency: inv.cur || 'USD' });
      const label = { deposit: '50% deposit', final: 'Final 50%', full: 'Full' }[inv.part] || '';
      tr.innerHTML =
        '<td class="mono">' + esc(inv.no) + '</td>' +
        '<td>' + esc(inv.client || 'No client') + '<span class="sub">' + esc(label) + '</span></td>' +
        '<td class="num">' + fmt.format(totalOf(inv)) + '</td>' +
        '<td>' + esc(fmtDate(inv.issued)) + '</td>' +
        '<td><span class="pill ' + (inv.paid ? 'paid-pill' : '') + '">' + (inv.paid ? 'Paid' : 'Unpaid') + '</span></td>' +
        '<td class="acts"><button type="button" class="small" data-open="' + esc(inv.no) + '">Open</button> ' +
        '<button type="button" class="small ghost del" data-del="' + esc(inv.no) + '">' + (pendingDelete === inv.no ? 'Tap again to delete' : 'Delete') + '</button></td>';
      body.appendChild(tr);
    });
    body.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => openInvoice(b.dataset.open)));
    body.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => deleteInvoice(b.dataset.del)));
  }
  function backup() {
    const blob = new Blob([JSON.stringify({ app: 'kr-invoice-maker', version: 1, invoices: readSaved() }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'kr-invoices-backup-' + iso(new Date()) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    status('Backup file saved. Keep it in your Google Drive.');
  }
  function restore(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const incoming = Array.isArray(data) ? data : data.invoices;
        if (!Array.isArray(incoming)) throw new Error('not a backup');
        const byNo = new Map(readSaved().map(x => [x.no, x]));
        incoming.filter(x => x && x.no && Array.isArray(x.items)).forEach(x => byNo.set(x.no, x));
        writeSaved([...byNo.values()]);
        renderSaved();
        status('Restored ' + incoming.length + ' invoices.');
      } catch (e) { status('That file is not an invoice backup.', true); }
    };
    reader.readAsText(file);
  }

  function newInvoice() {
    $('f-no').value = nextNo();
    const today = iso(new Date());
    $('f-issued').value = today; $('f-due').value = addDays(today, 7);
    ['f-client', 'f-contact', 'f-cemail', 'f-caddr'].forEach(k => $(k).value = '');
    $('f-paid').checked = false; $('paid-on-wrap').hidden = true;
    items = [{ desc: '', note: '', qty: 1, rate: 0 }];
    $('stage-note').textContent = '';
    setPart('deposit'); renderItems(); render();
    $('f-client').focus({ preventScroll: true });
    status('New invoice ' + $('f-no').value + '.');
  }

  // init
  loadProfile();
  const today = iso(new Date());
  $('f-issued').value = today; $('f-due').value = addDays(today, 7); $('f-paidon').value = today;
  renderItems(); render(); renderSaved();
  if (readSaved().length) newInvoice();
  $('btn-save').addEventListener('click', () => saveCurrent(false));
  $('btn-backup').addEventListener('click', backup);
  $('f-restore').addEventListener('change', e => { if (e.target.files[0]) restore(e.target.files[0]); e.target.value = ''; });
  $('form').addEventListener('input', e => {
    if (e.target.id === 'f-issued' && e.target.value) $('f-due').value = addDays(e.target.value, 7);
    if (e.target.id === 'f-paid') $('paid-on-wrap').hidden = !e.target.checked;
    if (KEEP.includes(e.target.id)) saveProfile();
    render();
  });
  $('form').addEventListener('submit', e => e.preventDefault());
  document.querySelectorAll('[data-part]').forEach(b => b.addEventListener('click', () => setPart(b.dataset.part)));
  $('btn-add').addEventListener('click', () => { items.push({ desc: '', note: '', qty: 1, rate: 0 }); renderItems(); render(); const d = $('it-d-' + (items.length - 1)); if (d) d.focus(); });
  $('btn-pdf').addEventListener('click', downloadPDF);
  $('btn-new').addEventListener('click', newInvoice);
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  // Install as an app
  let installEvent = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvent = e; $('btn-install').hidden = false; });
  $('btn-install').addEventListener('click', async () => {
    if (!installEvent) return;
    installEvent.prompt();
    await installEvent.userChoice;
    installEvent = null; $('btn-install').hidden = true;
  });
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (/iphone|ipad|ipod/i.test(navigator.userAgent) && !standalone) $('install-hint').hidden = false;
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/invoice/sw.js', { scope: '/invoice/' }).catch(() => {});
})();
