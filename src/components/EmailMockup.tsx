import axios from "axios";
import React, { useEffect, useState } from "react";

const EmailMockup = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  interface Email {
    id: string;
    from: string;
    address: string;
    time: string;
    message: string;
    subject: string;
    tag: string;
    read: string;
  }

  const fetchEmails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://gist.githubusercontent.com/Jsarihan/d5f8cd2d159d676fbfb2fab94750635e/raw/b54cc1bd819b157a93bde00fe059825002f1f602/email.json"
      );
      setEmails(response.data);
    } catch (error) {
      setError("An unknown error has occurred");
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
        read: selectedEmailIds.includes(email.id) ? "true" : email.read,
      }))
    );
    setSelectedEmailIds([]);
  };

  const allSelectedAreRead = selectedEmailIds.every(
    (id) => emails.find((email) => email.id === id)?.read === "true"
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-300 min-h-screen">
      {isLoading ? (
        <div className="text-center text-lg font-semibold text-gray-400">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {/* Email List */}
          <div className="border-r border-gray-700 pr-4">
            <h2 className="text-xl font-bold mb-4 text-white">Inbox</h2>
            <button
              onClick={toggleReadStatus}
              className="px-4 py-2 text-white rounded-md text-sm bg-green-600 hover:bg-green-500 transition"
            >
              {allSelectedAreRead ? "Mark as unread" : "Mark as read"}
            </button>
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-4 rounded-lg shadow-md mb-3 transition-all ${
                  email.read === "true"
                    ? "bg-gray-800 border border-gray-600"
                    : "bg-gray-700 border-l-4 border-blue-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    onChange={(e) => {
                      handleInputChange(e, email.id);
                    }}
                  />
                  <h3 className="font-semibold text-lg text-white">
                    {email.from}
                  </h3>
                </div>
                <h5 className="text-gray-400">{email.subject}</h5>
                <p className="text-sm text-gray-500">{email.time}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-500 transition"
                    onClick={() => handleDeleteEmail(email.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-500 transition"
                    onClick={() => handleSelectedEmail(email)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Email Display */}
          <div className="pl-4">
            {selectedEmail ? (
              <div className="p-6 border border-gray-700 rounded-lg shadow-md bg-gray-800">
                <h4 className="text-xl font-bold mb-2 text-white">
                  {selectedEmail.subject}
                </h4>
                <p className="text-gray-400">{selectedEmail.message}</p>
              </div>
            ) : (
              <div className="text-gray-500 italic text-center">
                Please select an email, you coward.
              </div>
            )}
          </div>
        </div>
      )}

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default EmailMockup;
