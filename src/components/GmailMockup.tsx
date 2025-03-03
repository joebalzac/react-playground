import axios from "axios";
import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  read: string;
  address: string;
  message: string;
  from: string;
  subject: string;
}

const GmailMockup = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
      );
      const data: Email[] = response.data;
      setEmails(data);
    } catch (error) {
      setError("An unknown error has occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleSelectedEmail = (email: Email, id: string) => {
    setSelectedEmail(email);
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, read: "true" } : email
      )
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
        : selectedEmailIds.filter((emailId) => emailId! == id)
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

  const allEmailsAreRead = selectedEmailIds.every(
    (id) => emails.find((email) => email.id === id)?.read === "true"
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="grid grid-cols-2">
          <div>
            <button onClick={toggleReadStatus}>
              {allEmailsAreRead ? "Mark as unread" : "Mark as read"}
            </button>
            <ul>
              {emails.map((email) => (
                <li
                  key={email.id}
                  style={{
                    backgroundColor: email.read === "true" ? "#fff" : "#fafafb",
                  }}
                >
                  <h2>{email.from}</h2>
                  <h3>{email.subject}</h3>

                  <button onClick={() => handleSelectedEmail}>Select</button>
                  <button onClick={() => handleDeleteEmail(email.id)}>
                    Delete
                  </button>
                  <input
                    type="checkbox"
                    onChange={(e) => handleInputChange(e, email.id)}
                  />
                </li>
              ))}
            </ul>
          </div>

          {selectedEmail ? (
            <div>
              <h2>{selectedEmail.subject}</h2>
              <h3>{selectedEmail.from}</h3>
              <p>{selectedEmail.message}</p>
            </div>
          ) : (
            <div>Please select an email</div>
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default GmailMockup;
