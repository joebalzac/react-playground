import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  from: string;
  address: string;
  time: string;
  message: string;
  subject: string;
  tag: string;
  read: string;
}

const GmailMockupTwo = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
    )
      .then((response) => response.json())
      .then((data) => setEmails(data));
  }, []);

  const handleSelectedEmail = (email: Email) => {
    setSelectedEmail(email);
    setEmails(
      emails.map((e) => (e.id === email.id ? { ...email, read: "true" } : e))
    );
  };

  const handleDeleteEmail = (id: string) => {
    setEmails(emails.filter((email) => id !== email.id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSelectedEmailIds(
      e.target.checked
        ? [...selectedEmailIds, id]
        : selectedEmailIds.filter((emailId) => emailId !== id)
    );
  };

  const toggleReadStatus = () => {
    setEmails(
      emails.map((email) => ({
        ...email,
        read: selectedEmailIds.includes(email.id) ? "true" : email.read,
      }))
    );
    setSelectedEmailIds([]);
  };

  const allSelectedAreRead = selectedEmailIds.every(
    (id) => emails.find((email) => email.id === id)?.read === "true"
  );

  return (
    <div className="flex">
      <div>
        <button onClick={toggleReadStatus}>
          {allSelectedAreRead ? "Mark as unread" : "Mark as read"}
        </button>
        {emails.map((email) => (
          <li
            style={{
              backgroundColor: email.read === "true" ? "#ffffff" : "#fafabb",
            }}
            key={email.id}
          >
            <h3>{email.from} </h3>
            <p>{email.subject}</p>
            <p>{email.time}</p>
            <input
              type="checkbox"
              onChange={(e) => handleInputChange(e, email.id)}
            />
            <button onClick={() => handleSelectedEmail(email)}>Select</button>
            <button onClick={() => handleDeleteEmail(email.id)}>Delete</button>
          </li>
        ))}
      </div>

      <div>
        {selectedEmail ? (
          <div>
            {selectedEmail.subject}
            {selectedEmail.message}
          </div>
        ) : (
          <div>Please select another email</div>
        )}
      </div>
    </div>
  );
};

export default GmailMockupTwo;
