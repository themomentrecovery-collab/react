const dashboards = {
  facility: {
    title: 'Facility Dashboard',
    subtitle: 'Welcome, Alex — your caseload snapshot is ready.',
    timestamp: 'Updated October 29, 2025 · 7:26 PM PT',
    quickActions: [
      {
        title: 'Intake Confirmation',
        description: 'Confirm arrival + assign pod',
        icon: '📝',
        tone: 'blue',
      },
      {
        title: 'Submit Reports',
        description: 'Progress + completion logs',
        icon: '📤',
        tone: 'violet',
      },
      {
        title: 'Download Documents',
        description: 'Find by referral or program',
        icon: '⬇️',
        tone: 'indigo',
      },
      {
        title: 'Update Bed Count',
        description: 'Available / total capacity',
        icon: '🛏️',
        tone: 'teal',
      },
    ],
    summaryCards: [
      { title: 'Pending', metric: '8', caption: 'Awaiting confirmation' },
      { title: 'Active', metric: '7', caption: 'In treatment' },
      { title: 'Available Beds', metric: '15 / 16', caption: 'One hold pending' },
    ],
    summaryDetail: {
      title: 'Admissions in Progress',
      body: 'Today’s referrals are trending up 12% compared to the weekly average.',
      bullets: [
        'Expedite verifications for Maria Lopez and David Kim.',
        'Share completed intake packets with the county liaison.',
        'Confirm detox pod readiness for late-evening admissions.',
      ],
    },
    alerts: {
      title: 'Recent Alerts',
      cta: 'View all',
      items: [
        {
          person: 'Maria Lopez',
          code: 'REF-205-911',
          timestamp: '10/29/2025, 7:02 PM',
          status: { label: 'Pending', tone: 'warning' },
          detail: 'Awaiting insurance authorization from Medi-Cal.',
        },
        {
          person: 'David Kim',
          code: 'REF-202-304',
          timestamp: '10/29/2025, 5:42 PM',
          status: { label: 'Labs Ready', tone: 'success' },
          detail: 'Rapid labs uploaded · requires RN review before admission.',
        },
        {
          person: 'Jordan Smith',
          code: 'REF-199-118',
          timestamp: '10/29/2025, 4:18 PM',
          status: { label: 'Docs Missing', tone: 'danger' },
          detail: 'Intake consent not signed · resend e-sign link.',
        },
      ],
    },
    tasks: [
      {
        title: 'Bed Management',
        description:
          'Verify pod availability and release holds older than 24 hours.',
        actions: ['Update counts', 'Review hold queue'],
      },
      {
        title: 'Evening Admissions',
        description:
          'Coordinate transport and nursing assignments for tonight’s arrivals.',
        actions: ['View transport status', 'Message charge nurse'],
      },
      {
        title: 'Compliance Docs',
        description:
          'Ensure daily progress notes are posted before 9 PM deadline.',
        actions: ['Upload reports', 'Notify supervisors'],
      },
    ],
  },
  agency: {
    title: 'Agency Dashboard',
    subtitle: 'Welcome, John — monitor referral placements and discharges.',
    timestamp: 'Updated October 29, 2025 · 7:48 PM PT',
    quickActions: [
      {
        title: 'Create Referral',
        description: 'Start a new placement request',
        icon: '➕',
        tone: 'blue',
      },
      {
        title: 'ASAM Assessment',
        description: 'Record level of care data',
        icon: '🩺',
        tone: 'pink',
      },
      {
        title: 'Download Reports',
        description: 'Monthly utilization exports',
        icon: '📥',
        tone: 'indigo',
      },
      {
        title: 'Open Messages',
        description: 'Track notes across facilities',
        icon: '💬',
        tone: 'teal',
      },
    ],
    summaryCards: [
      { title: 'Pending', metric: '9', caption: 'Needs facility placement' },
      { title: 'Active', metric: '5', caption: 'In progress' },
      { title: 'Completed', metric: '4', caption: 'Discharged this week' },
    ],
    summaryDetail: {
      title: 'Placement Priorities',
      body: 'Focus on high-priority detox requests flagged by the county team.',
      bullets: [
        'Coordinate transportation updates with RapidRide partners.',
        'Confirm authorization renewals for long-stay clients.',
        'Share new bed openings to reduce pending backlog.',
      ],
    },
    alerts: {
      title: 'Recent Alerts',
      cta: 'View queue',
      items: [
        {
          person: 'Michael Davis',
          code: 'REF-562-400',
          timestamp: '10/29/2025, 7:15 PM',
          status: { label: 'ASAM Needed', tone: 'warning' },
          detail: 'Upload updated ASAM within 12 hours to keep referral active.',
        },
        {
          person: 'Lisa Chen',
          code: 'REF-548-102',
          timestamp: '10/29/2025, 6:58 PM',
          status: { label: 'Ready to Admit', tone: 'success' },
          detail: 'Receiving facility confirmed · finalize transport ETA.',
        },
        {
          person: 'Robert Wilson',
          code: 'REF-537-804',
          timestamp: '10/29/2025, 6:31 PM',
          status: { label: 'Docs Missing', tone: 'danger' },
          detail: 'Insurance coverage expired · renew in client portal.',
        },
      ],
    },
    tasks: [
      {
        title: 'Referral Follow-ups',
        description: 'Check in on pending referrals exceeding 48 hours.',
        actions: ['Sort by urgency', 'Bulk message facilities'],
      },
      {
        title: 'Care Coordination',
        description:
          'Align outpatient services for clients transitioning this week.',
        actions: ['View discharge list', 'Share care plans'],
      },
      {
        title: 'Reporting',
        description: 'Submit Q4 utilization summary to county partners.',
        actions: ['Download template', 'Schedule review meeting'],
      },
    ],
  },
  hub: {
    title: 'Referral Hub Dashboard',
    subtitle: 'Centralized operations across facilities and agencies.',
    timestamp: 'Updated October 29, 2025 · 7:57 PM PT',
    quickActions: [
      {
        title: 'Claim Referral',
        description: 'Move from pool → yours',
        icon: '📥',
        tone: 'blue',
      },
      {
        title: 'Start Matching',
        description: 'Prioritize high-acuity cases',
        icon: '🎯',
        tone: 'violet',
      },
      {
        title: 'Open Hold Queue',
        description: 'Track future beds',
        icon: '📊',
        tone: 'indigo',
      },
      {
        title: 'Download Reports',
        description: 'Monthly / ad hoc exports',
        icon: '📈',
        tone: 'teal',
      },
    ],
    summaryCards: [
      { title: 'Referral Pool', metric: '23', caption: 'Across all counties' },
      { title: 'Active Matches', metric: '11', caption: 'In review with facilities' },
      { title: 'Open Holds', metric: '6', caption: 'Beds reserved this week' },
    ],
    summaryDetail: {
      title: 'Network Signal',
      body: 'Orange County detox programs show strongest capacity this evening.',
      bullets: [
        '3 facilities with immediate availability for Medi-Cal clients.',
        'Hold queue wait time averaging 9 hours (↓2h vs. yesterday).',
        '2 escalations open with QA for documentation completeness.',
      ],
    },
    alerts: {
      title: 'Matching Tasks',
      cta: 'Open workboard',
      items: [
        {
          person: 'County: Orange',
          code: 'REF-230-778',
          timestamp: '10/29/2025, 7:45 PM',
          status: { label: 'High Priority', tone: 'danger' },
          detail: 'Detox (3.7) · Two facilities reviewing · expedite selection.',
        },
        {
          person: 'County: Riverside',
          code: 'REF-228-553',
          timestamp: '10/29/2025, 7:10 PM',
          status: { label: 'Docs Ready', tone: 'success' },
          detail: 'Partial hospitalization placement awaiting facility claim.',
        },
        {
          person: 'County: LA',
          code: 'REF-225-492',
          timestamp: '10/29/2025, 6:54 PM',
          status: { label: 'Queue Hold', tone: 'warning' },
          detail: 'Bed release expected in 2 hours · confirm with facility.',
        },
      ],
    },
    tasks: [
      {
        type: 'matching',
        title: 'Facility Matching',
        description:
          'Filter the network to match referrals, assign holds, or skip facilities.',
        filters: [
          {
            label: 'Referral',
            type: 'select',
            options: ['Detox (3.7) – Lopez', 'Detox (3.7) – Rivera', 'Residential (3.5) – Cho'],
          },
          {
            label: 'County',
            type: 'select',
            options: ['Orange', 'Los Angeles', 'Riverside', 'San Diego'],
          },
          {
            label: 'Program',
            type: 'select',
            options: ['Detox (3.7)', 'Residential (3.5)', 'IOP (2.1)'],
          },
          {
            label: 'Insurance',
            type: 'select',
            options: ['Medi-Cal', 'CalOptima', 'Beacon Health'],
          },
        ],
        suggestions: [
          {
            facility: 'Harbor Recovery Center',
            badges: ['Detox Pods · 3 Beds', 'RN Coverage 24/7'],
            wait: 'Admit in 2h',
          },
          {
            facility: 'Sierra Renewal Clinic',
            badges: ['Trauma Support', 'Spanish Language Track'],
            wait: 'Hold queue 4h',
          },
          {
            facility: 'New Dawn Wellness',
            badges: ['Medi-Cal Preferred', 'Dual Diagnosis'],
            wait: 'Immediate opening',
          },
        ],
      },
      {
        title: 'Queue Oversight',
        description:
          'Monitor hold queue volume and clear escalations with facility contacts.',
        actions: ['View hold queue', 'Assign reviewer', 'Download nightly report'],
      },
      {
        title: 'Message Center',
        description: 'Check unread facility messages and close resolved threads.',
        actions: ['Open inbox', 'Mark resolved'],
      },
    ],
  },
  alerts: {
    title: 'Global Alerts',
    subtitle: 'Network-wide notifications across all dashboards.',
    timestamp: 'Updated October 29, 2025 · 7:30 PM PT',
    quickActions: [],
    summaryCards: [],
    summaryDetail: {
      title: 'All Alerts',
      body: 'Select a dashboard on the left to view contextual alerts and actions.',
      bullets: [],
    },
    alerts: {
      title: 'No Selection',
      cta: 'Go to dashboard',
      items: [],
    },
    tasks: [
      {
        title: 'Stay organized',
        description: 'Pick a dashboard to resume work where you left off.',
        actions: [
          { label: 'Return to Facility', target: 'facility' },
          { label: 'Return to Agency', target: 'agency' },
          { label: 'Return to Hub', target: 'hub' },
        ],
      },
    ],
  },
  reports: {
    title: 'Reports',
    subtitle: 'Download utilization, compliance, and financial summaries.',
    timestamp: 'Updated automatically every hour',
    quickActions: [],
    summaryCards: [
      { title: 'Monthly Exports', metric: '12', caption: 'Prepared this year' },
      { title: 'Ad-hoc Reports', metric: '4', caption: 'Custom pulls in queue' },
    ],
    summaryDetail: {
      title: 'Suggested next steps',
      body: 'Run the Referral Conversion Overview before tomorrow’s steering meeting.',
      bullets: ['Filter by county to highlight growth areas.', 'Share outputs with finance partners.'],
    },
    alerts: {
      title: 'Report Activity',
      cta: 'Open history',
      items: [
        {
          person: 'Utilization by County',
          code: 'Export · CSV',
          timestamp: '10/29/2025, 5:00 PM',
          status: { label: 'Completed', tone: 'success' },
          detail: 'Queued by Alex Lawson',
        },
        {
          person: 'Financial Summary',
          code: 'Export · XLSX',
          timestamp: '10/29/2025, 4:45 PM',
          status: { label: 'Processing', tone: 'warning' },
          detail: 'Est. ready in 2 minutes',
        },
      ],
    },
    tasks: [
      {
        title: 'Recurring Reports',
        description: 'Schedule weekly referral throughput for leadership.',
        actions: ['Create schedule', 'Share link'],
      },
    ],
  },
  messages: {
    title: 'Messages',
    subtitle: 'Unify discussions across facilities and agency teams.',
    timestamp: 'Updated moments ago',
    quickActions: [],
    summaryCards: [
      { title: 'Unread Threads', metric: '14', caption: 'Across all workspaces' },
      { title: 'Mentions', metric: '6', caption: 'Needs your reply' },
    ],
    summaryDetail: {
      title: 'Inbox Focus',
      body: 'Prioritize unread messages in the Referral Hub queue to keep matches moving.',
      bullets: ['Filter by county for triage.', 'Use templates to speed up responses.'],
    },
    alerts: {
      title: 'Latest Messages',
      cta: 'Open inbox',
      items: [
        {
          person: 'Harbor Recovery Center',
          code: 'Thread · Detox 3.7',
          timestamp: '10/29/2025, 7:20 PM',
          status: { label: 'Reply Needed', tone: 'warning' },
          detail: 'Requesting transportation confirmation.',
        },
        {
          person: 'Sierra Renewal Clinic',
          code: 'Thread · Residential',
          timestamp: '10/29/2025, 6:55 PM',
          status: { label: 'Resolved', tone: 'success' },
          detail: 'Shared discharge summary for review.',
        },
      ],
    },
    tasks: [
      {
        title: 'Templates',
        description: 'Refresh message templates for new county guidelines.',
        actions: ['Review guidelines', 'Update templates'],
      },
    ],
  },
  support: {
    title: 'Support',
    subtitle: 'Find help articles or reach our operations desk.',
    timestamp: 'Live chat available 7 AM – 10 PM PT',
    quickActions: [
      {
        title: 'Knowledge Base',
        description: 'Search playbooks and guides',
        icon: '📚',
        tone: 'blue',
      },
      {
        title: 'Contact Support',
        description: 'Chat, email, or phone',
        icon: '☎️',
        tone: 'indigo',
      },
    ],
    summaryCards: [],
    summaryDetail: {
      title: 'Need assistance?',
      body: 'We respond within 10 minutes during support hours.',
      bullets: ['Chat: average wait 3 minutes.', 'Emergency line: (800) 555-0102.'],
    },
    alerts: {
      title: 'Top Articles',
      cta: 'Browse all',
      items: [
        {
          person: 'Setting up referral rules',
          code: 'Article · 5 min read',
          timestamp: 'Updated 10/15/2025',
          status: { label: 'Popular', tone: 'success' },
          detail: 'Walkthrough for new counties joining the hub.',
        },
        {
          person: 'Managing hub queues',
          code: 'Article · 8 min read',
          timestamp: 'Updated 10/10/2025',
          status: { label: 'New', tone: 'warning' },
          detail: 'Best practices for balancing holds across facilities.',
        },
      ],
    },
    tasks: [
      {
        title: 'Open a ticket',
        description: 'Log a new operations or technical issue with the hub.',
        actions: ['Start ticket'],
      },
    ],
  },
};

const quickActionsContainer = document.getElementById('quick-actions');
const summaryCardsContainer = document.getElementById('summary-cards');
const summaryDetailContainer = document.getElementById('summary-detail');
const alertsTitle = document.getElementById('alerts-title');
const alertsList = document.getElementById('alerts-list');
const alertsButton = document.getElementById('alerts-view-all');
const tasksGrid = document.getElementById('tasks-grid');
const quickActionsSection = document.querySelector('.quick-actions');
const summarySection = document.querySelector('.summary');
const tasksSection = document.querySelector('.tasks');

function createActionCard(action) {
  const colors = {
    blue: 'rgba(59, 130, 246, 0.15)',
    violet: 'rgba(139, 92, 246, 0.15)',
    indigo: 'rgba(79, 70, 229, 0.15)',
    teal: 'rgba(20, 184, 166, 0.15)',
    pink: 'rgba(236, 72, 153, 0.15)',
  };

  return `
    <article class="action-card">
      <div class="action-icon" style="background:${colors[action.tone] ?? 'rgba(59,130,246,0.15)'}">
        ${action.icon ?? '⚡️'}
      </div>
      <h3>${action.title}</h3>
      <p>${action.description}</p>
    </article>
  `;
}

function renderQuickActions(actions = []) {
  quickActionsContainer.innerHTML = actions.map(createActionCard).join('');
  quickActionsSection.style.display = actions.length ? 'block' : 'none';
}

function renderSummaryCards(cards = []) {
  summaryCardsContainer.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <h4>${card.title}</h4>
          <div class="metric">${card.metric}</div>
          ${card.caption ? `<p>${card.caption}</p>` : ''}
        </article>
      `,
    )
    .join('');
  summaryCardsContainer.style.display = cards.length ? 'grid' : 'none';
}

function renderSummaryDetail(detail) {
  if (!detail) {
    summaryDetailContainer.innerHTML = '';
    summaryDetailContainer.style.display = 'none';
    return;
  }

  const bullets = (detail.bullets ?? [])
    .map((item) => `<li>${item}</li>`)
    .join('');

  summaryDetailContainer.innerHTML = `
    <h3>${detail.title}</h3>
    <p>${detail.body}</p>
    ${bullets ? `<ul>${bullets}</ul>` : ''}
  `;
  summaryDetailContainer.style.display = 'grid';
}

function createAlertItem(item) {
  return `
    <li class="alert-item">
      <div class="meta">
        <strong>${item.person}</strong>
        <span>${item.code}</span>
      </div>
      <div class="meta">
        <span>${item.timestamp}</span>
        ${item.status ? `<span class="status-badge" data-tone="${item.status.tone}">${item.status.label}</span>` : ''}
      </div>
      <div>${item.detail}</div>
    </li>
  `;
}

function renderAlerts(config = {}) {
  const { title, cta, items = [] } = config;
  alertsTitle.textContent = title ?? 'Alerts';
  alertsButton.textContent = cta ?? 'View all';
  alertsButton.style.display = cta ? 'inline-flex' : 'none';
  alertsList.innerHTML = items.length
    ? items.map(createAlertItem).join('')
    : '<li class="alert-item">No alerts to display. Select a dashboard to view contextual updates.</li>';
}

function createTaskCard(task) {
  if (task.type === 'matching') {
    return `
      <article class="task-card">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="tasks-grid-inner">
          <div class="matching-form">
            ${(task.filters ?? [])
              .map(
                (field) => `
                  <label class="form-field">
                    <span>${field.label}</span>
                    ${field.type === 'select'
                      ? `<select>${field.options.map((opt) => `<option>${opt}</option>`).join('')}</select>`
                      : `<input type="text" placeholder="${field.placeholder ?? ''}" />`
                    }
                  </label>
                `,
              )
              .join('')}
          </div>
          <div class="facility-suggestions">
            ${(task.suggestions ?? [])
              .map(
                (suggestion) => `
                  <div class="facility-row">
                    <div class="facility-meta">
                      <strong>${suggestion.facility}</strong>
                      <div class="badge-row">
                        ${(suggestion.badges ?? [])
                          .map((badge) => `<span class="badge">${badge}</span>`)
                          .join(' ')}
                      </div>
                    </div>
                    <span class="status-badge" data-tone="success">${suggestion.wait}</span>
                  </div>
                `,
              )
              .join('')}
            <div class="task-actions">
              <button class="primary-button">Send referral</button>
              <button class="secondary-button">Skip / Not available</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  return `
    <article class="task-card">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      ${task.actions?.length
        ? `<div class="task-actions">${task.actions
            .map((action) => {
              if (typeof action === 'string') {
                return `<button>${action}</button>`;
              }
              return `<button data-target="${action.target ?? ''}">${action.label ?? 'Action'}</button>`;
            })
            .join('')}</div>`
        : ''}
    </article>
  `;
}

function renderTasks(tasks = []) {
  tasksGrid.innerHTML = tasks.map(createTaskCard).join('');
  tasksSection.style.display = tasks.length ? 'block' : 'none';
  tasksGrid.querySelectorAll('button[data-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      if (!target) {
        return;
      }
      const navButton = navButtons.find((btn) => btn.dataset.dashboard === target);
      if (navButton) {
        navButton.click();
      }
    });
  });
}

function renderDashboard(id) {
  const dashboard = dashboards[id] ?? dashboards.facility;

  document.getElementById('dashboard-title').textContent = dashboard.title;
  document.getElementById('dashboard-subtitle').textContent = dashboard.subtitle ?? '';
  document.getElementById('dashboard-timestamp').textContent = dashboard.timestamp ?? '';

  renderQuickActions(dashboard.quickActions);
  renderSummaryCards(dashboard.summaryCards);
  renderSummaryDetail(dashboard.summaryDetail);
  const hasSummary = (dashboard.summaryCards?.length ?? 0) > 0 || Boolean(dashboard.summaryDetail);
  summarySection.style.display = hasSummary ? 'grid' : 'none';
  renderAlerts(dashboard.alerts);
  renderTasks(dashboard.tasks);
}

const navButtons = Array.from(document.querySelectorAll('.nav-button'));

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const id = button.dataset.dashboard;
    renderDashboard(id);
  });
});

// initial render
renderDashboard('facility');
