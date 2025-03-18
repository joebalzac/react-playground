import axios from "axios";
import { useEffect, useState } from "react";

interface Email {
  id: string;
  name: string;
  from: string;
  address: string;
  subject: string;
  read: string;
}

const GmailMockupTwo = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
      );
      const data: Email[] = await res.data;
      setEmails(data);
      console.log("Big data dog", data);
    } catch (error) {
      if (error) {
        setError("An unknown error has occurred");
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
        title: selectedEmailIds.includes(email.id) ? "true" : email.read,
      }))
    );
    setSelectedEmailIds([]);
  };

  const allSelectedAreRead = selectedEmailIds.every(
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
              {allSelectedAreRead ? "Unread" : "Read"}
            </button>
            <ul>
              {emails.map((email) => (
                <li
                  style={{
                    backgroundColor: email.read === "true" ? "#fff" : "#f23",
                  }}
                >
                  {email.address} = {email.subject}
                  <input
                    type="checkbox"
                    onChange={(e) => handleInputChange(e, email.id)}
                  />
                  <button onClick={() => handleSelectedEmail(email)}>
                    Select
                  </button>
                  <button onClick={() => handleDeleteEmail(email.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedEmail ? (
              <div>{selectedEmail.address}</div>
            ) : (
              <div>Please select an email tfdfdffo view...</div>
            )}
          </div>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GmailMockupTwo;
