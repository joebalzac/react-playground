import axios from "axios";
import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  from: string;
  time: string;
  subject: string;
  message: string;
  read: string;
}

const GmailMockupTwo = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);

  const fetchEmails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
      );
      const data: Email[] = res.data;
      setEmails(data);
    } catch (err) {
      if (err) {
        setError("An unknown error has ocurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleSelectedEmail = (email: Email) => {
    setSelectedEmail(email);
    setEmails(
      emails.map((e) => (e.id === email.id ? { ...e, read: "true" } : e))
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
  };

  const allSelectedAreRead = selectedEmailIds.every(
    (id) => emails.find((email) => email.id === id)?.read === "true"
  );

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <div style={{ display: "flex" }}>
            <button onClick={toggleReadStatus}>
              {allSelectedAreRead ? "Mark as unread" : "Mark as read"}
            </button>
            <div>
              {emails.map((email) => (
                <div
                  key={email.id}
                  style={{
                    background: email.read === "true" ? "#fff" : "#fafafb",
                  }}
                >
                  <input
                    type="checkbox"
                    onChange={(e) => handleInputChange(e, email.id)}
                  />
                  <h3>{email.from}</h3>
                  <h4>{email.subject}</h4>
                  <button onClick={() => handleSelectedEmail(email)}>
                    Select
                  </button>
                  <button onClick={() => handleDeleteEmail(email.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div>
              {selectedEmail ? (
                <div>
                  <h3>{selectedEmail.subject}</h3>
                  <p>{selectedEmail.message}</p>
                </div>
              ) : (
                <div>Please select an email to view....</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GmailMockupTwo;
