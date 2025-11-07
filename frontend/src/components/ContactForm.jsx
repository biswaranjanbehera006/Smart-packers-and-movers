import React from "react";

const ContactForm = () => {
return (
<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fff8f1" }}>
<div className="w-full max-w-md p-8 rounded-xl shadow-lg"
style={{
background: "linear-gradient(135deg, #6f4e37, #c9a57c)",
}}>
<h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "#fff8f1" }}>Contact Us</h2> <form className="space-y-4"> <div>
<label className="block mb-1" style={{ color: "#fff8f1" }}>Name</label>
<input
type="text"
placeholder="Your Name"
className="w-full px-4 py-2 rounded-lg focus:outline-none"
style={{ background: "linear-gradient(90deg, #fff8f1, #c9a57c)", color: "#6f4e37" }}
/> </div> <div>
<label className="block mb-1" style={{ color: "#fff8f1" }}>Email</label>
<input
type="email"
placeholder="Your Email"
className="w-full px-4 py-2 rounded-lg focus:outline-none"
style={{ background: "linear-gradient(90deg, #fff8f1, #c9a57c)", color: "#6f4e37" }}
/> </div> <div>
<label className="block mb-1" style={{ color: "#fff8f1" }}>Subject</label>
<input
type="text"
placeholder="Subject"
className="w-full px-4 py-2 rounded-lg focus:outline-none"
style={{ background: "linear-gradient(90deg, #fff8f1, #c9a57c)", color: "#6f4e37" }}
/> </div> <div>
<label className="block mb-1" style={{ color: "#fff8f1" }}>Message</label>
<textarea
rows="5"
placeholder="Your Message"
className="w-full px-4 py-2 rounded-lg focus:outline-none"
style={{ background: "linear-gradient(90deg, #fff8f1, #c9a57c)", color: "#6f4e37" }}
></textarea> </div>
<button
type="submit"
className="w-full py-2 px-4 rounded-lg font-bold transition-colors duration-300"
style={{ background: "linear-gradient(90deg, #ffb6c1, #c9a57c)", color: "#6f4e37" }}
>
Submit </button> </form> </div> </div>
);
};

export default ContactForm;
