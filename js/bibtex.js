document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("bibtexModal");
  const modalTitle = document.getElementById("bibtexTitle");
  const modalContent = document.getElementById("bibtexContent");
  const closeBtn = document.querySelector(".bibtex-close");
  const copyButton = document.getElementById("copyButton");

  if (!modal || !modalTitle || !modalContent || !closeBtn || !copyButton) {
    return;
  }

  function resetCopyButton() {
    copyButton.textContent = "Copy to Clipboard";
    copyButton.classList.remove("copied");
  }

  function openBibtexModal(pubIndex) {
    if (
      typeof PUBLICATIONS === "undefined" ||
      !Array.isArray(PUBLICATIONS) ||
      pubIndex < 0 ||
      pubIndex >= PUBLICATIONS.length
    ) {
      return;
    }

    const pub = PUBLICATIONS[pubIndex];
    if (!pub || !pub.bibtex) {
      return;
    }

    modalTitle.textContent = "BibTeX Citation";
    modalContent.textContent = pub.bibtex;
    modal.style.display = "block";
    resetCopyButton();
  }

  function closeBibtexModal() {
    modal.style.display = "none";
  }

  document.addEventListener("click", function (e) {
    const button = e.target.closest(".bibtex-button");
    if (!button) return;

    e.preventDefault();

    const rawIndex = button.getAttribute("data-pub-index");
    const pubIndex = Number(rawIndex);

    if (Number.isInteger(pubIndex)) {
      openBibtexModal(pubIndex);
    }
  });

  closeBtn.addEventListener("click", closeBibtexModal);

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeBibtexModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeBibtexModal();
    }
  });

  copyButton.addEventListener("click", async function () {
    const text = modalContent.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied!";
      copyButton.classList.add("copied");

      setTimeout(() => {
        resetCopyButton();
      }, 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      copyButton.textContent = "Copied!";
      copyButton.classList.add("copied");

      setTimeout(() => {
        resetCopyButton();
      }, 2000);
    }
  });
});