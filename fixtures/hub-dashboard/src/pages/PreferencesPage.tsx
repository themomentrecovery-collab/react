import { ChangeEvent, FormEvent, useState } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import Modal from '../components/Modal';
import { useDashboard } from '../context/DashboardContext';

const states = ['WA', 'OR', 'CA', 'ID'];

const PreferencesPage = () => {
  const { preferenceSettings, updatePreferenceSettings, user } = useDashboard();
  const [formState, setFormState] = useState({
    personalPhone: preferenceSettings.personalPhone,
    personalEmail: preferenceSettings.personalEmail,
    street: preferenceSettings.homeAddress.street,
    city: preferenceSettings.homeAddress.city,
    state: preferenceSettings.homeAddress.state,
    zip: preferenceSettings.homeAddress.zip,
    workPhone: preferenceSettings.workPhone,
    workEmail: preferenceSettings.workEmail,
  });
  const [notificationSettings, setNotificationSettings] = useState(
    preferenceSettings.notifications
  );
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    securityAnswer: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updatePreferenceSettings({
      personalPhone: formState.personalPhone,
      personalEmail: formState.personalEmail,
      homeAddress: {
        street: formState.street,
        city: formState.city,
        state: formState.state,
        zip: formState.zip,
      },
      workPhone: formState.workPhone,
      workEmail: formState.workEmail,
      notifications: notificationSettings,
    });
    setFeedback('Preferences saved successfully.');
  };

  const validatePassword = () => {
    const { newPassword, confirmPassword } = passwordForm;
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords must match.');
      return false;
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/\d/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword) || newPassword.length < 8) {
      setPasswordError('Password must be 8+ characters and include upper, lower, number, and special character.');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handlePasswordSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validatePassword()) return;
    setFeedback('Password updated.');
    setShowPasswordModal(false);
    setPasswordForm({ securityAnswer: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="preferences-page">
      <form onSubmit={handleSubmit}>
        <section className="section-card" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div>
            <h3>Hub User Info</h3>
            <p className="helper-text">Personal contact information is used for urgent outreach.</p>
            <label>
              Personal Phone Number
              <input name="personalPhone" value={formState.personalPhone} onChange={handleInputChange} />
            </label>
            <label>
              Personal Email
              <input name="personalEmail" value={formState.personalEmail} onChange={handleInputChange} />
            </label>
            <label>
              Home Address
              <input name="street" value={formState.street} onChange={handleInputChange} placeholder="Street" />
            </label>
            <div className="grid-2">
              <label>
                City
                <input name="city" value={formState.city} onChange={handleInputChange} />
              </label>
              <label>
                State
                <select name="state" value={formState.state} onChange={handleInputChange}>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              ZIP Code
              <input name="zip" value={formState.zip} onChange={handleInputChange} />
            </label>
          </div>

          <div>
            <h3>Hub Account Info</h3>
            <p className="helper-text">Work contact details are shared with agencies and facilities.</p>
            <label>
              Username
              <input value={user.username} disabled />
            </label>
            <label>
              Work Phone Number
              <input name="workPhone" value={formState.workPhone} onChange={handleInputChange} />
            </label>
            <label>
              Work Email
              <input name="workEmail" value={formState.workEmail} onChange={handleInputChange} />
            </label>
            <button type="button" className="secondary" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </button>
          </div>
        </section>

        <section className="section-card">
          <h3>Email Alert Preferences</h3>
          <div>
            {Object.entries(notificationSettings).map(([key, value]) => (
              <ToggleSwitch
                key={key}
                id={key}
                label={key.replace(/([A-Z])/g, ' $1')}
                checked={value}
                onChange={(checked) => handleToggleChange(key, checked)}
              />
            ))}
          </div>
        </section>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <button type="submit" className="primary">
            Save Changes
          </button>
        </div>
      </form>

      {feedback ? <p className="helper-text">{feedback}</p> : null}

      {showPasswordModal ? (
        <Modal
          title="Change Password"
          onClose={() => setShowPasswordModal(false)}
          footer={
            <>
              <button type="button" className="secondary" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
              <button type="button" className="primary" onClick={handlePasswordSubmit}>
                Confirm
              </button>
            </>
          }
        >
          <form onSubmit={handlePasswordSubmit}>
            <p className="helper-text">Security question: What is your favorite city?</p>
            <label>
              Security Answer
              <input
                value={passwordForm.securityAnswer}
                onChange={(event) => setPasswordForm((prev) => ({ ...prev, securityAnswer: event.target.value }))}
              />
            </label>
            <label>
              Current Password
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(event) => setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))}
              />
            </label>
            <label>
              New Password
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(event) => setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))}
              />
            </label>
            <label>
              Confirm New Password
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) => setPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
              />
            </label>
            {passwordError ? <p className="helper-text" style={{ color: '#dc2626' }}>{passwordError}</p> : null}
          </form>
        </Modal>
      ) : null}
    </div>
  );
};

export default PreferencesPage;
