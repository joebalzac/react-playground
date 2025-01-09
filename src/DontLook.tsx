import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { name: string; email: string } = { name: "", email: "" };
    if (!formData.name.trim()) newErrors.name = "Please Add Name";
    if (!formData.email.trim()) newErrors.email = "Please add an email";
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setFormData({ name: "", email: "" });
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
      console.log("Form submitted successfully", formData);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div>
      <h1>Welcome to our Product Page</h1>
      <p>Plese fill out our form to setup a demo</p>
      {formSubmitted ? (
        <div>
          <h2>Thank you for submitting</h2>
          <p>We will get back to you soon</p>
        </div>
      ) : (
        <div>
          <form action="" onSubmit={handleFormSubmit}>
            <div>
              <input
                type="text"
                placeholder="Enter Full Name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
              />
              <label htmlFor="name">Full Name</label>
              {errors.name && (
                <p style={{ color: "red" }}>Please fill in your name</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Email Address"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <label htmlFor="email">Email Address</label>
            {errors.email && (
              <p style={{ color: "red" }}>Please fill in your email</p>
            )}
            <button type="submit">Submit Form</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
