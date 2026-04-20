function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function capitalize(tag) {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

function certificationLabel(certification) {
  if (certification === "featured") {
    return `<span class="label-featured">(Featured Certification)</span>`;
  }
  if (certification === "j2c") {
    return `<span class="label-j2c">(J2C Certification)</span>`;
  }
  return "";
}

function renderLinks(links, bibtexAvailable, pubIndex) {
  const linkHtml = (links || [])
    .map(link => {
      const label = escapeHtml(link.label);
      const url = escapeHtml(link.url);
      return `<a class="paper-button" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    })
    .join("");

  const bibtexButton = bibtexAvailable
    ? `<a class="paper-button bibtex-button" href="#" data-pub-index="${pubIndex}">bibtex</a>`
    : "";

  return `
    <span class="paper-links-inline">
      ${linkHtml}
      ${bibtexButton}
    </span>
  `;
}

function underlineOwnName(authors) {
  return String(authors).replaceAll(
    "Satoshi Hayakawa",
    "<u>Satoshi Hayakawa</u>"
  );
}

function renderPublicationItem(pub, index) {
  const authors = underlineOwnName(escapeHtml(pub.authors || ""));
  const year = escapeHtml(pub.year ?? "");
  const title = escapeHtml(pub.title || "");
  const venue = escapeHtml(pub.venue || "");
  const details = escapeHtml(pub.details || "");
  const tags = Array.isArray(pub.tags) ? pub.tags : [];
  const tagsAttr = escapeHtml(tags.join(" "));
  const certHtml = certificationLabel(pub.certification);
  const linksHtml = renderLinks(pub.links, Boolean(pub.bibtex), index);

  let venueBlock = `<em>${venue}</em>`;
  if (certHtml) venueBlock += ` ${certHtml}`;
  if (details) venueBlock += `, ${details}`;
  venueBlock += `.`;

  return `
    <li data-tags="${tagsAttr}">
      ${authors} (${year}). <strong>${title}</strong> ${venueBlock} ${linksHtml}
    </li>
  `;
}

function renderPublications() {
  const list = document.getElementById("publicationList");
  if (!list || typeof PUBLICATIONS === "undefined") return;

  list.innerHTML = PUBLICATIONS.map((pub, idx) => renderPublicationItem(pub, idx)).join("");
}

function getFilterButtons() {
  return Array.from(document.querySelectorAll(".filter-chip[data-filter]"));
}

function getPublicationItems() {
  return Array.from(document.querySelectorAll("#publicationList li"));
}

function updateFilterButtonStates(activeFilters) {
  getFilterButtons().forEach(button => {
    const filter = button.dataset.filter;
    if (filter === "all" || filter === "clear") return;
    button.classList.toggle("active", activeFilters.has(filter));
  });
}

function matchesFilters(itemTags, activeFilters) {
  if (activeFilters.size === 0) return false;

  const primaryFilters = ["journal", "conference", "workshop", "preprint"];
  const activePrimary = primaryFilters.filter(tag => activeFilters.has(tag));
  const needsSelected = activeFilters.has("selected");

  const matchesPrimary =
    activePrimary.length === 0 || activePrimary.some(tag => itemTags.includes(tag));

  const matchesSelected =
    !needsSelected || itemTags.includes("selected");

  return matchesPrimary && matchesSelected;
}

function updatePublicationVisibility(activeFilters) {
  const items = getPublicationItems();
  const result = document.getElementById("filterResultNote");

  let visibleCount = 0;

  items.forEach(item => {
    const itemTags = (item.dataset.tags || "").split(/\s+/).filter(Boolean);
    const visible = matchesFilters(itemTags, activeFilters);
    item.style.display = visible ? "" : "none";
    if (visible) visibleCount += 1;
  });

  if (result) {
    result.textContent = `Showing ${visibleCount} publication${visibleCount === 1 ? "" : "s"}.`;
  }
}

function setupFilter() {
  const buttons = getFilterButtons();
  if (buttons.length === 0) return;

  const activeFilters = new Set(["journal", "conference", "workshop", "preprint"]);

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      if (filter === "all") {
        activeFilters.clear();
        ["journal", "conference", "workshop", "preprint"].forEach(tag => activeFilters.add(tag));
      } else if (filter === "clear") {
        activeFilters.clear();
      } else {
        if (activeFilters.has(filter)) {
          activeFilters.delete(filter);
        } else {
          activeFilters.add(filter);
        }
      }

      updateFilterButtonStates(activeFilters);
      updatePublicationVisibility(activeFilters);
    });
  });

  updateFilterButtonStates(activeFilters);
  updatePublicationVisibility(activeFilters);
}

function getPageLang() {
  return document.documentElement.lang === "ja" ? "ja" : "en";
}

function renderNewsItem(item, lang, hidden) {
  const body = item[lang];
  const hiddenClass = hidden ? " hidden-news older-news" : "";
  const highlightClass = item.highlight ? "news-highlight" : "";

  const itemsHtml = Array.isArray(body.items) && body.items.length > 0
    ? `<ul class="news-sublist">${body.items.map(x => `<li>${x}</li>`).join("")}</ul>`
    : "";

  return `
    <dt class="${hiddenClass.trim()}"><span>${item.date}</span></dt>
    <dd class="${hiddenClass.trim()}">
      <div class="${highlightClass}">
        <p>${body.text}</p>
        ${itemsHtml}
      </div>
    </dd>
  `;
}

function renderNews() {
  const list = document.getElementById("newsList");
  const button = document.getElementById("toggleNewsButton");
  if (!list || typeof NEWS === "undefined") return;

  const lang = getPageLang();
  const initiallyVisible = 5;

  list.innerHTML = NEWS.map((item, idx) => renderNewsItem(item, lang, idx >= initiallyVisible)).join("");

  const hiddenItems = document.querySelectorAll(".older-news");
  if (!button) return;

  const labels = {
    en: { open: "Show older news", close: "Hide older news" },
    ja: { open: "過去のニュースを表示", close: "過去のニュースを隠す" }
  };

  if (hiddenItems.length === 0) {
    button.style.display = "none";
    return;
  }

  let expanded = false;
  button.textContent = labels[lang].open;

  button.addEventListener("click", () => {
    expanded = !expanded;
    hiddenItems.forEach(el => {
      el.classList.toggle("hidden-news", !expanded);
    });
    button.textContent = expanded ? labels[lang].close : labels[lang].open;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderNews();
  renderPublications();
  setupFilter();
});