import axios from "axios";
import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  from: string;
  message: string;
  sender: string;
  subject: string;
  time: string;
  read: string;
}

const GmailMockup = () => {
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
        const data: Email[] = await response.data;
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
    setEmails(
      emails.map((e) => (email.id === e.id ? { ...e, read: "true" } : e))
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

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <ul>
          {emails.map((email) => (
            <>
              <li
                style={{
                  backgroundColor: email.read === "true" ? "#fff" : "#fafa1b",
                }}
                key={email.id}
              >
                {email.subject} - {email.sender} - {email.time}
              </li>
              <button onClick={() => handleSelectedEmail(email)}>
                Select Email
              </button>
              <input type="checkbox" onChange={() => handleCheckboxChange} />
            </>
          ))}
        </ul>
      </div>
      <div style={{ flex: 2 }}>
        {selectedEmail ? (
          <div>
            <h3>{selectedEmail.from}</h3>
            <h3>{selectedEmail.subject}</h3>

            <p>{selectedEmail.message}</p>
          </div>
        ) : (
          <div>KEEP ON FUCKING GRINDING</div>
        )}
      </div>
    </div>
  );
};

export default GmailMockup;
