import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const navItemShape = PropTypes.shape({
  key: PropTypes.string,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  description: PropTypes.string,
  end: PropTypes.bool,
});

function DashboardSidebar({sections}) {
  const normalizedSections = Array.isArray(sections)
    ? sections.some((section) => Array.isArray(section.items))
      ? sections
      : [
          {
            id: 'primary',
            items: sections,
          },
        ]
    : [];

  return (
    <nav className="hub-sidebar" aria-label="Dashboard navigation">
      {normalizedSections.map((section) => (
        <div key={section.id || section.label || section.items?.[0]?.to} className="hub-sidebar__section">
          {section.label ? <p className="hub-sidebar__heading">{section.label}</p> : null}
          <ul className="hub-sidebar__list">
            {section.items?.map((item) => (
              <li key={item.key || item.to} className="hub-sidebar__item">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({isActive}) =>
                    `hub-sidebar__link${isActive ? ' hub-sidebar__link--active' : ''}`
                  }
                >
                  {item.icon ? (
                    <span className="hub-sidebar__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  ) : null}
                  <span className="hub-sidebar__copy">
                    <span className="hub-sidebar__label">{item.label}</span>
                    {item.description ? (
                      <span className="hub-sidebar__description">{item.description}</span>
                    ) : null}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

DashboardSidebar.propTypes = {
  sections: PropTypes.oneOfType([
    PropTypes.arrayOf(navItemShape),
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        items: PropTypes.arrayOf(navItemShape).isRequired,
      }),
    ),
  ]),
};

DashboardSidebar.defaultProps = {
  sections: [],
};

export default DashboardSidebar;
