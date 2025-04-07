import React, { useEffect, useState } from "react";

interface Email {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
}

const GmailMockupTwo = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<number[]>([]);

  const fetchEmails = async () => {
    fetch(
      "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
    )
      .then((res) => res.json())
      .then((data) => setEmails(data));
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div>
        {emails.map((email) => (
          <div key={email.id}>
            {email.from} - {email.subject}
          </div>
        ))}
      </div>
      <div>
        {selectedEmail ? (
          <div>{selectedEmail.from}</div>
        ) : (
          <div>Please select an email </div>
        )}
      </div>
    </div>
  );
};

export default GmailMockupTwo;
