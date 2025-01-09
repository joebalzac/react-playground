import React, { useState } from "react";

const Form = () => {
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      setFormData({ name: "", email: "" });
      console.log("Form submitted successfully:", formData);
    } else {
      console.log("Form contains errors");
    }
  };

  return (
    <div>
      <h1>Welcome to our Product</h1>
      <p>Discover how our product can revolutionize your workflow</p>

      {formSubmitted ? (
        <div>
          <div>
            <h2>Thank you for signing up we will be in touch soon</h2>
            <p>We will contact you shortly</p>
          </div>
        </div>
      ) : (
        <div>
          <form action="" onSubmit={handleFormSubmit}>
            <div>
              <input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <label htmlFor="name">Enter Full Name</label>
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email Address</label>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <button type="submit">Submit Form</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
