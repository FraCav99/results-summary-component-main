const summarySection = document.getElementById("summary");
const continueBtn = summarySection.lastElementChild;

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const summaryItem = new SummaryItem(item);
      summarySection.insertBefore(summaryItem.createItem(), continueBtn);
    });
  });

class SummaryItem {
  #category;
  #icon;
  #score;

  constructor({ category, score, icon }) {
    this.#category = category;
    this.#score = score;
    this.#icon = icon;
  }

  createItem() {
    const summaryItem = document.createElement("div");
    summaryItem.setAttribute("class", "summary-item");
    summaryItem.setAttribute(`data-${this.#category.toLowerCase()}`, "");

    summaryItem.appendChild(this.#createStatDescription());
    summaryItem.appendChild(this.#createScoreParagraph());
    return summaryItem;
  }

  #createStatDescription() {
    const statDescription = document.createElement("div");
    statDescription.setAttribute("class", "stat-description");

    const iconEl = document.createElement("img");
    iconEl.setAttribute("src", this.#icon);
    iconEl.setAttribute("alt", "");
    iconEl.setAttribute("aria-hidden", "true");

    const summaryItemTitle = document.createElement("h3");
    summaryItemTitle.setAttribute("class", "summary-item-stat");
    summaryItemTitle.textContent = this.#category;

    statDescription.appendChild(iconEl);
    statDescription.appendChild(summaryItemTitle);

    return statDescription;
  }

  #createScoreParagraph() {
    const scoreParagraph = document.createElement("p");

    const highlightedScore = document.createElement("span");
    highlightedScore.setAttribute("class", "summary-score");
    highlightedScore.textContent = this.#score;

    scoreParagraph.append(highlightedScore);
    scoreParagraph.append(" / 100");

    return scoreParagraph;
  }
}
