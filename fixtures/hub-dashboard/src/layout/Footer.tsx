import './Footer.css';

const Footer = () => {
  return (
    <footer className="dashboard-footer" role="contentinfo">
      <span>Copyright © 2025 The Moment, Inc</span>
      <span className="footer-separator" aria-hidden />
      <a
        href="https://www.steepsoft.com"
        target="_blank"
        rel="noreferrer"
        className="footer-link"
      >
        Powered by Steep Software
      </a>
    </footer>
  );
};

export default Footer;
