/* GSAC reader — client-side static reader over the repo's Markdown.
 * No middleware, no DB. Reads manifest.json + the .md files live.
 */
(() => {
  "use strict";

  const els = {
    navTree: document.getElementById("nav-tree"),
    content: document.getElementById("content"),
    search: document.getElementById("search"),
    searchResults: document.getElementById("search-results"),
    searchStatus: document.getElementById("search-status"),
    filter: document.getElementById("filter"),
    themeToggle: document.getElementById("theme-toggle"),
    menuToggle: document.getElementById("menu-toggle"),
    prevLink: document.getElementById("prev-link"),
    nextLink: document.getElementById("next-link"),
    readCheckbox: document.getElementById("read-checkbox"),
  };

  const state = {
    manifest: null,
    docsByPath: new Map(),   // path -> {title, kind, crumb}
    flatOrder: [],           // ordered list of paths for prev/next
    bodyIndex: new Map(),    // path -> lowercased plain text (built lazily)
    cache: new Map(),        // path -> raw markdown
    read: new Set(JSON.parse(localStorage.getItem("gsac-read") || "[]")),
    current: null,
  };

  /* ---------- init ---------- */
  async function init() {
    initTheme();

    // Guard: the rendering libraries load from cdn.jsdelivr.net. If a proxy,
    // offline session, or regional block stopped them, fail with guidance
    // instead of a permanently blank page.
    if (typeof marked === "undefined" || typeof mermaid === "undefined" || typeof hljs === "undefined") {
      els.content.innerHTML = errorHtml(
        "Couldn't load the rendering libraries",
        "This reader loads marked, highlight.js, and mermaid from <code>cdn.jsdelivr.net</code>, which your network blocked or couldn't reach. " +
        "The content itself is plain Markdown — read it directly at " +
        '<a href="https://github.com/sivakrushna-works/GSAC">github.com/sivakrushna-works/GSAC</a>.'
      );
      return;
    }

    configureMarked();
    mermaid.initialize({ startOnLoad: false, theme: currentMermaidTheme(), securityLevel: "strict" });

    try {
      state.manifest = await fetchJSON("manifest.json");
    } catch (e) {
      els.content.innerHTML = errorHtml(
        "Couldn't load manifest.json",
        "Run the reader from the repo root via a static server, e.g. <code>python -m http.server 8000</code>, then open <code>http://localhost:8000</code>. " +
        "If you added documents, regenerate the index with <code>py build-manifest.py</code>."
      );
      return;
    }

    buildIndexes();
    renderNav();
    wireEvents();
    buildBodyIndexInBackground();

    window.addEventListener("hashchange", route);
    route();
  }

  function buildIndexes() {
    for (const section of state.manifest.sections) {
      for (const group of section.groups) {
        for (const d of group.docs) {
          state.docsByPath.set(d.path, {
            title: d.title,
            kind: d.kind,
            crumb: `${section.title} › ${group.title}`,
          });
          state.flatOrder.push(d.path);
        }
      }
    }
  }

  /* ---------- navigation tree ---------- */
  function renderNav() {
    const frag = document.createDocumentFragment();
    for (const section of state.manifest.sections) {
      const secEl = document.createElement("div");
      secEl.className = "nav-section";
      secEl.dataset.section = section.id;

      const secTitle = document.createElement("div");
      secTitle.className = "sec-title";
      secTitle.textContent = section.title;
      secEl.appendChild(secTitle);

      section.groups.forEach((group, gi) => {
        const grpEl = document.createElement("div");
        grpEl.className = "nav-group";
        // Collapse everything except the first group of the curriculum by default.
        if (!(section.id === "curriculum" && gi === 0)) grpEl.classList.add("collapsed");

        const grpTitle = document.createElement("button");
        grpTitle.type = "button";
        grpTitle.className = "grp-title";
        grpTitle.setAttribute("aria-expanded", String(!grpEl.classList.contains("collapsed")));
        grpTitle.innerHTML =
          `<span class="caret">▾</span><span class="grp-label">${escapeHtml(shortLabel(group.title))}</span>` +
          `<span class="grp-count">${group.docs.length}</span>`;
        grpTitle.addEventListener("click", () => {
          grpEl.classList.toggle("collapsed");
          grpTitle.setAttribute("aria-expanded", String(!grpEl.classList.contains("collapsed")));
        });
        grpEl.appendChild(grpTitle);

        const docsEl = document.createElement("div");
        docsEl.className = "grp-docs";
        for (const d of group.docs) {
          const a = document.createElement("a");
          a.className = "nav-doc";
          a.href = "#" + d.path;
          a.dataset.path = d.path;
          a.innerHTML = `<span class="dot">●</span><span class="doc-label">${escapeHtml(shortLabel(d.title))}</span>`;
          if (state.read.has(d.path)) a.classList.add("read");
          docsEl.appendChild(a);
        }
        grpEl.appendChild(docsEl);
        secEl.appendChild(grpEl);
      });
      frag.appendChild(secEl);
    }
    els.navTree.innerHTML = "";
    els.navTree.appendChild(frag);
  }

  function highlightNav(path) {
    els.navTree.querySelectorAll(".nav-doc.active").forEach((e) => e.classList.remove("active"));
    const active = els.navTree.querySelector(`.nav-doc[data-path="${cssEscape(path)}"]`);
    if (active) {
      active.classList.add("active");
      // Expand its group and scroll it into view.
      const grp = active.closest(".nav-group");
      if (grp) grp.classList.remove("collapsed");
      active.scrollIntoView({ block: "nearest" });
    }
  }

  /* ---------- routing / document loading ---------- */
  function route() {
    let path = decodeURIComponent(location.hash.replace(/^#/, "")).trim();
    let anchor = "";
    const hashIdx = path.indexOf("#");
    if (hashIdx >= 0) { anchor = path.slice(hashIdx + 1); path = path.slice(0, hashIdx); }
    if (!path) path = "README.md";
    loadDoc(path, anchor);
  }

  async function loadDoc(path, anchor) {
    state.current = path;
    highlightNav(path);
    updateReadCheckbox(path);
    updatePrevNext(path);

    let md;
    try {
      md = await fetchDoc(path);
    } catch (e) {
      els.content.innerHTML = errorHtml("Couldn't load document", `<code>${escapeHtml(path)}</code> — ${escapeHtml(String(e.message || e))}`);
      return;
    }

    els.content.innerHTML = marked.parse(md);
    if (path === "README.md") injectHomeHero();
    rewriteLinks(path);
    highlightCode();
    await renderMermaid();

    if (anchor) {
      const target = document.getElementById(anchor) || findHeadingByText(anchor);
      if (target) target.scrollIntoView();
      else els.main().scrollTop = 0;
    } else {
      els.main().scrollTop = 0;
    }
    document.title = (state.docsByPath.get(path)?.title || "GSAC") + " — GSAC";
    closeNavOnMobile();
  }

  els.main = () => document.querySelector(".main");

  /* Rewrite in-doc relative links so cross-references stay in the reader. */
  function rewriteLinks(basePath) {
    const baseDir = basePath.includes("/") ? basePath.slice(0, basePath.lastIndexOf("/")) : "";
    els.content.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (/^(https?:)?\/\//i.test(href) || href.startsWith("mailto:")) {
        a.target = "_blank"; a.rel = "noopener";
        return;
      }
      if (href.startsWith("#")) {
        // In-page anchor -> route within the current doc.
        a.addEventListener("click", (ev) => {
          ev.preventDefault();
          location.hash = "#" + basePath + href;
        });
        return;
      }
      // Relative link to another file (usually .md).
      let [target, frag] = href.split("#");
      const resolved = resolvePath(baseDir, target);
      a.setAttribute("href", "#" + resolved + (frag ? "#" + frag : ""));
      if (!/\.md$/i.test(resolved) && !state.docsByPath.has(resolved)) {
        // Non-markdown asset (e.g., a directory or image) — leave as a plain hash route attempt.
      }
    });
  }

  function resolvePath(baseDir, target) {
    // Normalize a relative path (handles ./ and ../) against baseDir.
    const parts = (baseDir ? baseDir.split("/") : []);
    for (const seg of target.split("/")) {
      if (seg === "" || seg === ".") continue;
      if (seg === "..") parts.pop();
      else parts.push(seg);
    }
    let p = parts.join("/");
    // A link to a directory -> its README.md.
    if (state.docsByPath.has(p)) return p;
    if (state.docsByPath.has(p + "/README.md")) return p + "/README.md";
    return p;
  }

  /* ---------- prev / next ---------- */
  function updatePrevNext(path) {
    const idx = state.flatOrder.indexOf(path);
    const setLink = (el, targetPath) => {
      if (targetPath) {
        el.hidden = false;
        el.href = "#" + targetPath;
        const base = el.id === "prev-link" ? "‹ " : "";
        const tail = el.id === "next-link" ? " ›" : "";
        el.textContent = base + shortLabel(state.docsByPath.get(targetPath).title) + tail;
      } else {
        el.hidden = true;
      }
    };
    setLink(els.prevLink, idx > 0 ? state.flatOrder[idx - 1] : null);
    setLink(els.nextLink, idx >= 0 && idx < state.flatOrder.length - 1 ? state.flatOrder[idx + 1] : null);
  }

  /* ---------- read progress ---------- */
  function updateReadCheckbox(path) {
    els.readCheckbox.checked = state.read.has(path);
  }
  function toggleRead() {
    if (!state.current) return;
    if (els.readCheckbox.checked) state.read.add(state.current);
    else state.read.delete(state.current);
    localStorage.setItem("gsac-read", JSON.stringify([...state.read]));
    const nav = els.navTree.querySelector(`.nav-doc[data-path="${cssEscape(state.current)}"]`);
    if (nav) nav.classList.toggle("read", els.readCheckbox.checked);
  }

  /* ---------- search ---------- */
  async function buildBodyIndexInBackground() {
    const paths = state.flatOrder.slice();
    let done = 0;
    els.searchStatus.textContent = "indexing…";
    const CONCURRENCY = 8;
    let i = 0;
    async function worker() {
      while (i < paths.length) {
        const p = paths[i++];
        try {
          const md = await fetchDoc(p);
          state.bodyIndex.set(p, stripMarkdown(md).toLowerCase());
        } catch { /* skip */ }
        done++;
        if (done % 20 === 0 || done === paths.length) {
          els.searchStatus.textContent = done < paths.length ? `indexing ${done}/${paths.length}` : "";
        }
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  }

  function runSearch(qRaw) {
    const q = qRaw.trim().toLowerCase();
    if (!q) { hideSearch(); return; }
    const terms = q.split(/\s+/).filter(Boolean);
    const results = [];
    for (const path of state.flatOrder) {
      const meta = state.docsByPath.get(path);
      const title = meta.title.toLowerCase();
      const body = state.bodyIndex.get(path);
      let score = 0;
      let snippet = "";
      for (const t of terms) {
        if (title.includes(t)) score += 10;
        if (body && body.includes(t)) {
          score += 2;
          if (!snippet) snippet = makeSnippet(body, t);
        }
      }
      // Require every term to appear somewhere.
      const allPresent = terms.every((t) => title.includes(t) || (body && body.includes(t)));
      if (score > 0 && allPresent) results.push({ path, meta, score, snippet });
    }
    results.sort((a, b) => b.score - a.score);
    renderSearchResults(results.slice(0, 30), terms);
  }

  function renderSearchResults(results, terms) {
    if (results.length === 0) {
      els.searchResults.innerHTML = `<div class="empty">No matches. ${state.bodyIndex.size < state.flatOrder.length ? "(Full-text indexing still in progress.)" : ""}</div>`;
    } else {
      els.searchResults.innerHTML = results.map((r) =>
        `<a class="result" href="#${escapeAttr(r.path)}">
           <div class="r-title">${highlightTerms(escapeHtml(shortLabel(r.meta.title)), terms)}</div>
           <div class="r-crumb">${escapeHtml(r.meta.crumb)}</div>
           ${r.snippet ? `<div class="r-snippet">${highlightTerms(escapeHtml(r.snippet), terms)}</div>` : ""}
         </a>`
      ).join("");
    }
    els.searchResults.hidden = false;
    els.searchResults.querySelectorAll(".result").forEach((a) =>
      a.addEventListener("click", () => hideSearch()));
  }

  function hideSearch() { els.searchResults.hidden = true; }

  function makeSnippet(body, term) {
    const idx = body.indexOf(term);
    if (idx < 0) return "";
    const start = Math.max(0, idx - 40);
    const end = Math.min(body.length, idx + 80);
    return (start > 0 ? "…" : "") + body.slice(start, end).trim() + (end < body.length ? "…" : "");
  }

  /* ---------- sidebar filter ---------- */
  function applyFilter(qRaw) {
    const q = qRaw.trim().toLowerCase();
    els.navTree.querySelectorAll(".nav-section").forEach((sec) => {
      let secVisible = false;
      sec.querySelectorAll(".nav-group").forEach((grp) => {
        let grpVisible = false;
        grp.querySelectorAll(".nav-doc").forEach((doc) => {
          const label = doc.querySelector(".doc-label").textContent.toLowerCase();
          const match = !q || label.includes(q);
          doc.classList.toggle("hidden", !match);
          if (match) grpVisible = true;
        });
        grp.classList.toggle("hidden", !grpVisible);
        if (q) grp.classList.toggle("collapsed", false);
        if (grpVisible) secVisible = true;
      });
      sec.classList.toggle("hidden", !secVisible);
    });
  }

  /* ---------- rendering helpers ---------- */
  function configureMarked() {
    marked.setOptions({ gfm: true, breaks: false });
  }

  function highlightCode() {
    els.content.querySelectorAll("pre code").forEach((block) => {
      if (block.classList.contains("language-mermaid")) return;
      try { window.hljs && window.hljs.highlightElement(block); } catch { /* noop */ }
    });
  }

  async function renderMermaid() {
    const blocks = [...els.content.querySelectorAll("code.language-mermaid")];
    let n = 0;
    for (const code of blocks) {
      const pre = code.closest("pre");
      const graph = code.textContent;
      const div = document.createElement("div");
      div.className = "mermaid";
      const id = "mmd-" + Date.now() + "-" + (n++);
      try {
        const { svg } = await mermaid.render(id, graph);
        div.innerHTML = svg;
      } catch (e) {
        div.className = "mermaid-error";
        div.textContent = "diagram could not render";
      }
      pre.replaceWith(div);
    }
  }

  function injectHomeHero() {
    const c = state.manifest.counts || {};
    const hero = document.createElement("div");
    hero.className = "hero-counts";
    hero.innerHTML =
      stat(c.chapters, "Chapters") + stat(c.caseStudies, "Case Studies") + stat(c.projects, "Projects");
    const h1 = els.content.querySelector("h1");
    if (h1 && h1.nextSibling) h1.parentNode.insertBefore(hero, h1.nextSibling);
    else els.content.prepend(hero);
    function stat(num, lbl) {
      return `<div class="stat"><div class="num">${num ?? "—"}</div><div class="lbl">${lbl}</div></div>`;
    }
  }

  function findHeadingByText(anchor) {
    // GitHub-style slug fallback: match a heading whose slug equals the anchor.
    const slug = (s) => s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
    return [...els.content.querySelectorAll("h1,h2,h3,h4,h5,h6")].find((h) => slug(h.textContent) === anchor) || null;
  }

  /* ---------- theme ---------- */
  function initTheme() {
    const saved = localStorage.getItem("gsac-theme");
    const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(theme);
  }
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("gsac-theme", theme);
    document.getElementById("hljs-light").disabled = theme === "dark";
    document.getElementById("hljs-dark").disabled = theme !== "dark";
  }
  function currentMermaidTheme() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "default";
  }

  /* ---------- events ---------- */
  function wireEvents() {
    els.search.addEventListener("input", debounce((e) => runSearch(e.target.value), 120));
    els.search.addEventListener("focus", () => { if (els.search.value) runSearch(els.search.value); });
    document.addEventListener("click", (e) => {
      if (!els.searchResults.contains(e.target) && e.target !== els.search) hideSearch();
    });
    els.search.addEventListener("keydown", (e) => { if (e.key === "Escape") { hideSearch(); els.search.blur(); } });

    els.filter.addEventListener("input", debounce((e) => applyFilter(e.target.value), 100));

    els.themeToggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(next);
      mermaid.initialize({ startOnLoad: false, theme: currentMermaidTheme(), securityLevel: "strict" });
      if (state.current) loadDoc(state.current, ""); // re-render diagrams for the theme
    });

    els.menuToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      els.menuToggle.setAttribute("aria-expanded", String(open));
    });

    const skipLink = document.getElementById("skip-link");
    if (skipLink) skipLink.addEventListener("click", () => els.content.focus());
    els.readCheckbox.addEventListener("change", toggleRead);

    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== els.search && document.activeElement !== els.filter) {
        e.preventDefault(); els.search.focus();
      }
    });
  }

  function closeNavOnMobile() { document.body.classList.remove("nav-open"); }

  /* ---------- fetch + utils ---------- */
  async function fetchJSON(url) {
    const r = await fetch(url, { cache: "no-cache" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }
  async function fetchDoc(path) {
    if (state.cache.has(path)) return state.cache.get(path);
    const r = await fetch(path, { cache: "no-cache" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const text = await r.text();
    state.cache.set(path, text);
    return text;
  }

  function stripMarkdown(md) {
    return md
      .replace(/```[\s\S]*?```/g, " ")      // code/mermaid blocks
      .replace(/`[^`]*`/g, " ")
      .replace(/\|/g, " ")                   // table pipes
      .replace(/[#>*_\-\[\]()]/g, " ")
      .replace(/\s+/g, " ");
  }

  function shortLabel(title) {
    return title
      .replace(/^Chapter\s+/i, "")
      .replace(/^Case Study\s+/i, "")
      .replace(/^Project\s+/i, "")
      .replace(/^Part\s+/i, "Part ");
  }

  function highlightTerms(html, terms) {
    let out = html;
    for (const t of terms) {
      if (!t) continue;
      const re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      out = out.replace(re, "<mark>$1</mark>");
    }
    return out;
  }

  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const escapeAttr = (s) => s.replace(/"/g, "%22");
  const cssEscape = (s) => (window.CSS && CSS.escape ? CSS.escape(s) : s.replace(/["\\]/g, "\\$&"));

  function debounce(fn, ms) {
    let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  }

  function errorHtml(title, detail) {
    return `<h1>${escapeHtml(title)}</h1><p>${detail}</p>`;
  }

  init();
})();
