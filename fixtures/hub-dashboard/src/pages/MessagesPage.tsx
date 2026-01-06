import { FormEvent, useMemo, useState } from 'react';
import Modal from '../components/Modal';
import { useDashboard } from '../context/DashboardContext';
import { referralDetailsMap } from '../data/initialData';
import { Conversation } from '../data/types';

const categoryOrder: Conversation['category'][] = [
  'Referral Agencies',
  'Facilities',
  'Hub Admins',
  'Hub Users',
  'Archives',
];

const MessagesPage = () => {
  const { conversations, sendMessage, markConversationRead } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    null
  );
  const [messageDraft, setMessageDraft] = useState('');
  const [showReferralModal, setShowReferralModal] = useState(false);

  const conversationsByCategory = useMemo(() => {
    const grouped: Record<Conversation['category'], Conversation[]> = {
      'Referral Agencies': [],
      Facilities: [],
      'Hub Admins': [],
      'Hub Users': [],
      Archives: [],
    };
    conversations.forEach((conversation) => {
      grouped[conversation.category].push(conversation);
    });
    return grouped;
  }, [conversations]);

  const defaultConversation = useMemo(() => {
    const unreadConversation = conversations.find((conversation) => conversation.unreadCount > 0);
    return unreadConversation ?? conversations[0] ?? null;
  }, [conversations]);

  const activeConversation = useMemo(() => {
    const id = activeConversationId ?? defaultConversation?.id ?? null;
    return conversations.find((conversation) => conversation.id === id) ?? null;
  }, [activeConversationId, conversations, defaultConversation]);

  const handleConversationSelect = (conversation: Conversation) => {
    setActiveConversationId(conversation.id);
    if (conversation.unreadCount) {
      markConversationRead(conversation.id);
    }
  };

  const filteredConversations = (category: Conversation['category']) => {
    const items = conversationsByCategory[category];
    if (!searchTerm) return items;
    return items.filter((conversation) =>
      conversation.referralName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.referralId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSend = (event: FormEvent) => {
    event.preventDefault();
    if (!activeConversation || !messageDraft.trim()) return;
    sendMessage(activeConversation.id, messageDraft.trim());
    setMessageDraft('');
  };

  const renderConversationList = (category: Conversation['category']) => {
    const items = filteredConversations(category);
    if (items.length === 0) {
      return <p className="helper-text">No conversations.</p>;
    }
    return (
      <ul className="conversation-list">
        {items.map((conversation) => (
          <li key={conversation.id}>
            <button
              type="button"
              onClick={() => handleConversationSelect(conversation)}
              className={conversation.id === activeConversation?.id ? 'conversation active' : 'conversation'}
            >
              <div>
                <strong>{conversation.referralName}</strong>
                <div className="helper-text">{conversation.referralId}</div>
              </div>
              <div className="helper-text">
                {conversation.unreadCount ? (
                  <span className="badge" style={{ backgroundColor: '#f97316', color: '#fff' }}>
                    {conversation.unreadCount}
                  </span>
                ) : null}
              </div>
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const showReferralDetailsButton = activeConversation
    ? ['Referral Agencies', 'Facilities'].includes(activeConversation.category)
    : false;

  const referralDetails = activeConversation
    ? referralDetailsMap[activeConversation.referralDetailsId]
    : undefined;

  return (
    <div className="messages-page">
      <section className="section-card" style={{ display: 'flex', gap: '24px' }}>
        <div className="messages-sidebar" style={{ width: '320px' }}>
          <input
            type="text"
            placeholder="Search by referral name or ID"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{ marginBottom: 12 }}
          />
          {categoryOrder.map((category) => {
            const items = filteredConversations(category);
            const hasUnread = conversationsByCategory[category].some(
              (conversation) => conversation.unreadCount > 0
            );
            return (
              <div key={category} className="conversation-category">
                <div className="section-header" style={{ marginBottom: 8 }}>
                  <h4>{category}</h4>
                  {hasUnread ? (
                    <span className="badge" style={{ backgroundColor: '#ef4444', color: '#fff' }}>
                      New
                    </span>
                  ) : null}
                </div>
                {renderConversationList(category)}
              </div>
            );
          })}
        </div>
        <div className="messages-panel" style={{ flex: 1 }}>
          {activeConversation ? (
            <>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{activeConversation.referralName}</h3>
                  <p className="helper-text">Conversation ID: {activeConversation.id}</p>
                </div>
                {showReferralDetailsButton ? (
                  <button type="button" className="secondary" onClick={() => setShowReferralModal(true)}>
                    Referral Details
                  </button>
                ) : null}
              </header>
              <div className="messages-thread" style={{ marginTop: 16, maxHeight: '360px', overflowY: 'auto', paddingRight: 12 }}>
                {activeConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === 'hubUser' ? 'sent' : 'received'}`}
                    style={{
                      marginBottom: 12,
                      textAlign: message.sender === 'hubUser' ? 'right' : 'left',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-block',
                        backgroundColor: message.sender === 'hubUser' ? '#6366f1' : '#e5e7eb',
                        color: message.sender === 'hubUser' ? '#fff' : '#1f2937',
                        padding: '10px 14px',
                        borderRadius: 12,
                        maxWidth: '70%',
                      }}
                    >
                      <p style={{ margin: 0 }}>{message.body}</p>
                      <small className="helper-text">{new Date(message.sentAt).toLocaleString()}</small>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <input
                  type="text"
                  value={messageDraft}
                  onChange={(event) => setMessageDraft(event.target.value)}
                  placeholder="Type your message"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="primary">
                  Send
                </button>
              </form>
            </>
          ) : (
            <p className="helper-text">Select a conversation to view messages.</p>
          )}
        </div>
      </section>

      {showReferralModal && referralDetails ? (
        <Modal
          title={`Referral ${activeConversation?.referralId}`}
          onClose={() => setShowReferralModal(false)}
          size="large"
        >
          <p>
            Client: {referralDetails.client.firstName} {referralDetails.client.lastName}
            <br />DOB: {referralDetails.client.dateOfBirth} ({referralDetails.client.age})
            <br />Phone: {referralDetails.client.phone}
            <br />Email: {referralDetails.client.email}
            <br />Address: {referralDetails.client.address}
          </p>
          <p>
            Program: {referralDetails.requestedProgramType} ({referralDetails.requestedDuration})
            <br />Court Order: {referralDetails.courtOrder ? 'Yes' : 'No'}
            <br />ASAM Level: {referralDetails.asamLevel ?? 'N/A'}
          </p>
          <p>
            Referral Agency: {referralDetails.agencyName}
            <br />Agency Contact: {referralDetails.contact.firstName} {referralDetails.contact.lastName}
            ({referralDetails.contact.phone})
          </p>
        </Modal>
      ) : null}
    </div>
  );
};

export default MessagesPage;
