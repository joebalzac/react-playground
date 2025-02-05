import axios from "axios";
import { useEffect, useState } from "react";

interface Email {
  address: string;
  from: string;
  id: string;
  subject: string;
  message: string;
  time: string;
  read: string;
}

const EmailMockup = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<String[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
        );
        const data = response.data;
        setEmails(data);
        console.log("Big Data Dog", data);
      } catch (error) {
        if (error) {
          setError("An unknown error occured");
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
    setError("");
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
        read: selectedEmailIds.includes(email.id) ? "true" : email.id,
      }))
    );
  };

  const allSelectedAreRead = selectedEmailIds.every(
    (id) => emails.find((email) => email.id === id)?.read === "true"
  );

  return (
    <div style={{ display: "flex" }}>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <div style={{ flex: "1" }}>
          <button
            onClick={toggleReadStatus}
            disabled={selectedEmailIds.length === 0}
          >
            {allSelectedAreRead ? "Mark as Unread" : "Mark as Read"}
          </button>
          <div>
            <ul>
              {emails?.map((email) => (
                <li
                  style={{
                    background: email.read === "true" ? "#ffffff" : "#faf3f2",
                  }}
                  key={email.id}
                >
                  <h3>
                    {email.address} - {email.subject} - {email.time}
                  </h3>

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
        </div>
      )}

      <div style={{ flex: "2" }}>
        {selectedEmail ? (
          <div>
            {selectedEmail.subject}
            <p>{selectedEmail.message}</p>
          </div>
        ) : (
          <div>
            <h5 style={{ color: "red" }}>
              {error || "Please select an email"}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailMockup;
