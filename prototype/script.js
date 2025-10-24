const sections = [
  {
    id: "overview",
    title: "Repository Overview",
    subtitle: "High-level layout and goals",
    description:
      "Understand the key directories that make up the React codebase and what you will typically touch as a contributor.",
    links: [
      {
        label: "README.md",
        href: "https://github.com/facebook/react/blob/main/README.md",
      },
      {
        label: "Packages directory",
        href: "https://github.com/facebook/react/tree/main/packages",
      },
    ],
    details: `
      <p>The React repository is a monorepo that houses the core renderer, DOM bindings, DevTools, test fixtures, and the experimental React Compiler. The <strong>packages/</strong> folder contains the source for each distributable package such as <code>react</code>, <code>react-dom</code>, and <code>scheduler</code>. Shared configuration and tooling lives under <strong>scripts/</strong> and <strong>compiler/</strong>.</p>
      <p>Most contributions focus on a specific package. The <strong>fixtures/</strong> folder contains runnable examples that exercise React features and are invaluable when verifying changes.</p>
    `,
  },
  {
    id: "compiler",
    title: "React Compiler",
    subtitle: "New React optimizations",
    description:
      "Explore the experimental compiler that transforms component code for better runtime performance.",
    links: [
      {
        label: "compiler/",
        href: "https://github.com/facebook/react/tree/main/compiler",
      },
      {
        label: "Compiler overview blog",
        href: "https://react.dev/learn/react-compiler",
      },
    ],
    details: `
      <p>The compiler introduces zero-cost abstractions and automatic memoization. Code lives in <strong>compiler/packages/</strong> with a combination of TypeScript and Rust. Start by reading the <code>README</code> within each package. The build is coordinated with <code>yarn build-react-compiler</code>.</p>
      <p>Because the compiler is experimental, changes require thorough testing across the fixtures and the React benchmark suite.</p>
    `,
  },
  {
    id: "devtools",
    title: "React DevTools",
    subtitle: "Debugging & profiling utilities",
    description:
      "Run and extend the DevTools packages, available as both a browser extension and embeddable shell.",
    links: [
      {
        label: "DevTools shell",
        href: "https://github.com/facebook/react/tree/main/packages/react-devtools-shell",
      },
      {
        label: "DevTools inline",
        href: "https://github.com/facebook/react/tree/main/packages/react-devtools-inline",
      },
    ],
    details: `
      <p>The DevTools packages share components and utilities but ship through multiple entry points: browser extensions, standalone shell, and embedded inspectors. Use <code>yarn build-for-devtools</code> to compile compatible bundles, then run <code>yarn start</code> inside <strong>packages/react-devtools-shell</strong> to launch the playground.</p>
      <p>To test the Chrome extension locally, run <code>yarn build:chrome:local</code> followed by <code>yarn test:chrome</code> inside <strong>packages/react-devtools-extensions</strong>.</p>
    `,
  },
  {
    id: "testing",
    title: "Testing & QA",
    subtitle: "Ensure stability before landing changes",
    description:
      "React relies on a comprehensive Jest, Flow, ESLint, and custom fixture suite to keep regressions out.",
    links: [
      { label: "yarn test", href: "https://github.com/facebook/react/blob/main/CONTRIBUTING.md#development-workflow" },
      { label: "fixtures/", href: "https://github.com/facebook/react/tree/main/fixtures" },
    ],
    details: `
      <p>Always run <code>yarn test</code> before submitting a PR. Use <code>yarn test --watch</code> to focus on a single test file. Static analysis includes <code>yarn lint</code> and <code>yarn flow</code>. Fixtures provide interactive sandboxes for verifying behavior across renderers.</p>
      <p>GitHub Actions re-runs these suites, but catching regressions locally keeps the feedback loop fast.</p>
    `,
  },
  {
    id: "releases",
    title: "Releases & Channels",
    subtitle: "Understand experimental vs. stable outputs",
    description:
      "React ships multiple channels (stable, canary, experimental). Learn how bundles are built and published.",
    links: [
      {
        label: "scripts/release",
        href: "https://github.com/facebook/react/tree/main/scripts/release",
      },
      {
        label: "ReactVersions.js",
        href: "https://github.com/facebook/react/blob/main/ReactVersions.js",
      },
    ],
    details: `
      <p>Release scripts live under <strong>scripts/release</strong> and rely on Rollup build pipelines defined in <strong>scripts/rollup</strong>. Each channel has its own configuration, ensuring stable users get reliable builds while the experimental channel exposes the latest features to early adopters.</p>
      <p>Check <code>ReactVersions.js</code> to see how the release channels map to npm tags. When contributing code that affects bundle output, verify the production build via <code>yarn build</code> and inspect <strong>build/</strong>.</p>
    `,
  },
];

const sectionList = document.getElementById("sectionList");
const navItemTemplate = document.getElementById("navItemTemplate");
const cardTemplate = document.getElementById("cardTemplate");
const linkTemplate = document.getElementById("linkTemplate");
const contentPanel = document.getElementById("contentPanel");
const dialog = document.getElementById("detailDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogBody = document.getElementById("dialogBody");
const checklistButtons = document.querySelectorAll(".check");
const checklistStatus = document.querySelector(".checklist-status");

const state = {
  activeSection: null,
  checklist: new Set(),
};

function renderNav() {
  sections.forEach((section, index) => {
    const navNode = navItemTemplate.content.firstElementChild.cloneNode(true);
    const button = navNode.querySelector("button");
    button.textContent = section.title;
    button.dataset.section = section.id;
    button.setAttribute("aria-describedby", `${section.id}-subtitle`);
    if (index === 0) {
      state.activeSection = section.id;
      button.setAttribute("aria-current", "true");
    }
    button.addEventListener("click", () => activateSection(section.id));
    sectionList.appendChild(navNode);
  });
}

function renderSection(section) {
  contentPanel.innerHTML = "";
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  card.querySelector(".card-title").textContent = section.title;
  const subtitle = card.querySelector(".card-subtitle");
  subtitle.id = `${section.id}-subtitle`;
  subtitle.textContent = section.subtitle;
  card.querySelector(".card-description").textContent = section.description;

  const linksList = card.querySelector(".card-links");
  section.links.forEach((link) => {
    const node = linkTemplate.content.firstElementChild.cloneNode(true);
    const anchor = node.querySelector("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    linksList.appendChild(node);
  });

  const moreButton = card.querySelector(".card-more");
  moreButton.addEventListener("click", () => openDialog(section));

  card.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      openDialog(section);
    }
  });

  contentPanel.appendChild(card);
}

function activateSection(sectionId) {
  if (state.activeSection === sectionId) return;
  state.activeSection = sectionId;
  for (const button of sectionList.querySelectorAll("button")) {
    if (button.dataset.section === sectionId) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  }
  const section = sections.find((item) => item.id === sectionId);
  if (section) {
    renderSection(section);
  }
}

function openDialog(section) {
  dialogTitle.textContent = section.title;
  dialogBody.innerHTML = section.details;
  dialog.showModal();
}

function setupChecklist() {
  checklistButtons.forEach((button) => {
    button.addEventListener("click", () => toggleChecklist(button));
  });
  updateChecklistStatus();
}

function toggleChecklist(button) {
  const key = button.dataset.check;
  if (state.checklist.has(key)) {
    state.checklist.delete(key);
    button.setAttribute("aria-pressed", "false");
  } else {
    state.checklist.add(key);
    button.setAttribute("aria-pressed", "true");
  }
  updateChecklistStatus();
}

function updateChecklistStatus() {
  const total = checklistButtons.length;
  const completed = state.checklist.size;
  const remaining = total - completed;
  if (remaining === 0) {
    checklistStatus.textContent = "🎉 All setup steps completed!";
  } else {
    checklistStatus.textContent = `${completed} of ${total} steps complete — ${remaining} remaining.`;
  }
}

renderNav();
renderSection(sections[0]);
setupChecklist();
