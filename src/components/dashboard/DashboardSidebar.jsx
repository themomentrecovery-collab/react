import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

function DashboardSidebar({sections}) {
  return (
    <nav className="dashboard-sidebar" aria-label="Dashboard navigation">
      <ul className="dashboard-sidebar__list">
        {sections.map((section) => (
          <li key={section.path} className="dashboard-sidebar__item">
            <NavLink
              to={section.to}
              end={section.end}
              className={({isActive}) =>
                `dashboard-sidebar__link${isActive ? ' dashboard-sidebar__link--active' : ''}`
              }
            >
              {section.icon ? (
                <span className="dashboard-sidebar__icon" aria-hidden="true">
                  {section.icon}
                </span>
              ) : null}
              <span>{section.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

DashboardSidebar.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      end: PropTypes.bool,
    }),
  ),
};

DashboardSidebar.defaultProps = {
  sections: [],
};

export default DashboardSidebar;
