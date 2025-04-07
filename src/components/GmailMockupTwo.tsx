import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  from: string;
  subject: string;
  message: string;
  time: string;
  read: string;
}

const GmailMockupTwo = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email[]>([]);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);

  const fetchEmails = async () => {
    fetch(
      "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
    )
      .then((res) => res.json())
      .then((data) => setEmails(data));
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleSelectedEmail = (email: Email) => {
    setSelectedEmail([...selectedEmail, email]);
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
        : selectedEmailIds.filter((email) => email !== id)
    );
  };

  const toggleReadStatus = () => {
    setEmails(
      emails.map((email) => ({
        ...email,
        read: selectedEmailIds.includes(email.id) ? "true" : email.read,
      }))
    );
  };

  const allSelectedAreRead = selectedEmailIds.every(
    (id) => emails.find((email) => email.id === id)?.read === "true"
  );

  return (
    <div className="grid grid-cols-2">
      <div>
        <button onClick={toggleReadStatus}>
          {allSelectedAreRead ? "Mark as read" : "Mark as unread"}
        </button>
        {emails.map((email) => (
          <div
            key={email.id}
            style={{
              backgroundColor: email.read === "true" ? "#fff" : "#fafafb",
            }}
          >
            <input
              type="checkbox"
              onChange={(e) => handleInputChange(e, email.id)}
            />
            <div key={email.id}>
              {email.from} - {email.subject} - {email.time}
            </div>
            <button onClick={() => handleSelectedEmail(email)}>Select</button>
            <button onClick={() => handleDeleteEmail(email.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        {selectedEmail ? (
          <div>
            {selectedEmail.map((emailSelect) => (
              <div>
                {emailSelect.from}
                {emailSelect.message}
              </div>
            ))}
          </div>
        ) : (
          <div>Please select an email </div>
        )}
      </div>
    </div>
  );
};

export default GmailMockupTwo;
