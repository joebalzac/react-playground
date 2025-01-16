import axios from "axios";
import { useEffect, useState } from "react";

interface Email {
  id: string;
  time: string;
  subject: string;
  send: string;
  from: string;
  message: string;
  read: string;
  sender: string;
}

const GmailMockup = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
          setError("An unknown error has occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmails();
  }, []);

  const handleSelectedEmail = (email: Email) => {
    setSelectedEmail(email);
    setEmails(
      emails.map((e) => (e.id === email.id ? { ...email, read: "true" } : e))
    );
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
          <div>isLoading.....</div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <button onClick={toggleReadStatus}>
                {allSelectedAreRead ? "Mark as unread" : "Mark as read"}
              </button>
              <ul>
                {emails.map((email) => (
                  <li
                    style={{
                      backgroundColor:
                        email.read === "true" ? "#fff" : "#fafab4",
                    }}
                    key={email.id}
                  >
                    {email.sender} - {email.from} -{email.time}
                    <button onClick={() => handleSelectedEmail(email)}>
                      Select Email
                    </button>
                    <input
                      type="checkbox"
                      onChange={(e) => handleInputChange(e, email.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 2 }}>
              {selectedEmail ? (
                <div>
                  <h3>{selectedEmail.from}</h3>
                  <h3>{selectedEmail.subject}</h3>
                  <p> {selectedEmail.message}</p>
                </div>
              ) : (
                <div>Please select an email to conitnue</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GmailMockup;
