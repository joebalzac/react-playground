import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  subject: string;
  from: string;
  time: string;
  read: string;
  message: string;
}

const GmailMockup = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
        );
        const data: Email[] = await response.json();
        setEmails(data);
        console.log(data);
      } catch (error) {
        setError("An error occurred while fetching emails.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleSelectedEmail = (email: Email) => {
    setSelectedEmail(email);
    setEmails((prevEmails) =>
      prevEmails.map((e) => (e.id === email.id ? { ...e, read: "true" } : e))
    );
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSelectedEmailIds((prevIds) =>
      e.target.checked
        ? [...prevIds, id]
        : prevIds.filter((emailId) => emailId !== id)
    );
  };

  const allSelectedAreRead = selectedEmailIds.every(
    (id) => emails.find((email) => email.id === id)?.read === "true"
  );

  const toggleReadStatus = () => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        selectedEmailIds.includes(email.id)
          ? { ...email, read: allSelectedAreRead ? "false" : "true" }
          : email
      )
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Pane */}
      <div style={{ flex: 1, padding: "1rem", borderRight: "1px solid #ccc" }}>
        <button
          onClick={toggleReadStatus}
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        >
          {allSelectedAreRead ? "Mark as Unread" : "Mark as Read"}
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {isLoading ? (
            <p>Loading emails...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                style={{
                  backgroundColor:
                    email.read === "true" ? "#f0f0f0" : "#ffffff",
                }}
              >
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, email.id)}
                />
                <li
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelectedEmail(email)}
                >
                  <strong>{email.subject}</strong> - {email.from} -{" "}
                  {new Date(email.time).toLocaleString()}
                </li>
              </div>
            ))
          )}
        </ul>
      </div>
      <div>
        {selectedEmail ? (
          <div>
            <header>
              <h2>{selectedEmail.subject}</h2>
              <p>
                <strong>From:</strong> {selectedEmail.from}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(selectedEmail.time).toLocaleString()}
              </p>
            </header>
            <hr />
            <div>
              <p>{selectedEmail.message}</p>
            </div>
          </div>
        ) : (
          <p>Please select an email to view its contents.</p>
        )}
      </div>
    </div>
  );
};

export default GmailMockup;
