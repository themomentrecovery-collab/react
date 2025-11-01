const supportLinks = [
  { label: 'FAQ', href: '#faq', icon: '❓' },
  { label: 'Request Support', href: '#support', icon: '🆘' },
  { label: 'Employee Handbook', href: '#handbook', icon: '📘' },
  { label: 'Standard Operating Procedures', href: '#sop', icon: '🗂️' },
  { label: 'Terms of Service', href: '#tos', icon: '📜' },
  { label: 'Privacy Policy', href: '#privacy', icon: '🔒' },
];

const SupportPage = () => {
  return (
    <div className="support-page">
      <section className="section-card">
        <h2>Support Resources</h2>
        <div
          className="support-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
          }}
        >
          {supportLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="support-tile"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: 24,
                borderRadius: 18,
                background: '#fff',
                boxShadow: '0 18px 30px rgba(99, 102, 241, 0.15)',
                textDecoration: 'none',
                color: '#1f2937',
                fontWeight: 600,
                minHeight: 160,
              }}
            >
              <span style={{ fontSize: 36 }}>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
