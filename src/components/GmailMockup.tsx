import axios from "axios";
import { useEffect, useState } from "react";

interface Email {
  address: string;
  from: string;
  id: string;
  message: string;
  subject: string;
  time: string;
  read: string;
}

const GmailMockup = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
        );
        const data = response.data;
        setEmails(data);
        console.log("big data dawg", data);
      } catch (error) {
        if (error instanceof Error) {
          setError("There is an unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
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
          <div>Loading.....</div>
        ) : (
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <button onClick={toggleReadStatus}>
                {allSelectedAreRead ? "Mark as unread" : "Mark as read"}
              </button>
              <ul>
                {emails.map((email) => (
                  <li key={email.id} style={{backgroundColor: email.read === 'true' ? '#FFFFFF' : '#FFC0CB'}}>
                    <h3>
                      {email.address} - {email.from} - {email.time}
                    </h3>
                    <button
                      onClick={() => {
                        handleSelectedEmail(email);
                      }}
                    >
                      Select Email
                    </button>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleInputChange(e, email.id);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 2 }}>
              {selectedEmail ? (
                <div>
                  <h3>{selectedEmail.subject}</h3>
                  <h3>{selectedEmail.from}</h3>
                  <p>{selectedEmail.message}</p>
                </div>
              ) : (
                <div>Please select an email</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GmailMockup;
