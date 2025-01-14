import axios from "axios";
import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  from: string;
  sender: string;
  time: string;
  subject: string;
  message: string;
  read: string;
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
        const response = await axios.get(
          "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
        );
        const data: Email[] = await response.data;
        setEmails(data);
        console.log("Big Data", data);
      } catch (error) {
        if (error instanceof Error) {
          setError;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleSelectedEmail = (email: Email) => {
    setSelectedEmail(email);
    setError("");
    setEmails(
      emails.map((e) => (e.id === email.id ? { ...email, read: "true" } : e))
    );
  };

  const handleCheckboxChange = (
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
    const allRead = selectedEmailIds.every(
      (id) => emails.find((email) => email.id === id)?.read === "true"
    );

    setEmails(
      emails.map((email) => ({
        ...email,
        read: allRead ? "false" : "true",
      }))
    );

    setSelectedEmailIds([]);
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
            <div style={{ flex: 1 }}>
              <button onClick={toggleReadStatus}>
                {allSelectedAreRead ? "Mark as unread" : "Mark as read"}
              </button>
              <ul>
                {emails.map((email) => (
                  <li
                    style={{
                      backgroundColor:
                        email.read === "true" ? "#ffffff" : "#ee9cf7",
                    }}
                    key={email.id}
                  >
                    {email.sender} - {email.from} - {email.time}
                    <button onClick={() => handleSelectedEmail(email)}>
                      Select Email
                    </button>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, email.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ flex: 2 }}>
              {selectedEmail ? (
                <div>
                  <h3>{selectedEmail.from}</h3>
                  <h4>{selectedEmail.subject}</h4>

                  <p>{selectedEmail.message}</p>
                </div>
              ) : (
                <p style={{ color: "red" }}>
                  {error || "Please select an email to continue."}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GmailMockup;
