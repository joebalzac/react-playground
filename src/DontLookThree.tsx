import { useEffect, useState } from "react";

interface Email {
  id: string;
  from: string;
  message: string;
  subject: string;
  time: string;
  read: string;
  address: string;
}

const GmailMockup = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
        );
        const data = await response.json();
        setEmails(data);
        console.log("Big Data", data);
      } catch (error) {
        if (error instanceof Error) {
          setError("an unknown error has occured");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmails();
  }, []);

  const handleSelectedEmail = (email: Email) => {
    setSelectedEmail(email);
    console.log("selected email", email);
    setEmails(
      emails.map((e) => (e.id === email.id ? { ...e, read: "true" } : e))
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
    console.log("this is working", selectedEmailIds);
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
    <div style={{ padding: "0px, 20px" }}>
      <h1>Gmail Mockup</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button onClick={toggleReadStatus}>
            {allSelectedAreRead ? "Mark as Unread" : "Mark as read"}
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              gap: "24px",
            }}
          >
            <div style={{ flex: 1 }}>
              <h2>Emails</h2>
              <ul>
                {emails.map((email) => (
                  <li
                    style={{
                      backgroundColor:
                        email.read === "true" ? "#ffffff" : "#fafabb",
                    }}
                    key={email.id}
                  >
                    {email.from} - {email.subject} - {email.time}
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, email.id)}
                    />
                    <button onClick={() => handleSelectedEmail(email)}>
                      Select Email
                    </button>
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
                <div>{error && <p>{error}</p>}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GmailMockup;
