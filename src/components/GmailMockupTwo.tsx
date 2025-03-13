import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  from: string;
  subject: string;
  message: string;
  address: string;
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
      .then((res) => res.json())
      .then((data) => setEmails(data));
  }, []);

  console.log(emails);

  const handleSelectedEmail = (email: Email) => {
    setSelectedEmail(email);
    setEmails(
      emails.map((e) => (e.id === email.id ? { ...email, read: "true" } : e))
    );
  };

  const handleDeleteEmail = (id: string) => {
    setEmails(emails.filter((email) => email.id !== id));
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
    <div className="grid grid-cols-2">
      <div>
        <button onClick={toggleReadStatus}>
          {allSelectedAreRead ? "Mark as Unread" : "Mark as Read"}
        </button>
        <ul>
          {emails.map((email) => (
            <li
              style={{
                backgroundColor: email.read === "true" ? "#fff" : "#fafa22",
              }}
              key={email.id}
            >
              <input
                type="checkbox"
                onChange={(e) => handleInputChange(e, email.id)}
              />
              <h2>{email.address}</h2>
              <h3>{email.subject}</h3>
              <button onClick={() => handleSelectedEmail(email)}>Select</button>
              <button onClick={() => handleDeleteEmail(email.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedEmail ? (
          <div>
            {selectedEmail.subject}
            {selectedEmail.message}
          </div>
        ) : (
          <div>Please Select an email</div>
        )}
      </div>
    </div>
  );
};

export default GmailMockupTwo;
