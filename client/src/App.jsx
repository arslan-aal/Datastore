// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   function handleChange(e) {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     console.log("Form Data:", form);

//     alert("Form submitted successfully!");
//   }

//   return (
//     <div className="container">
//       <div className="form-card">
//         <h1>Contact Us</h1>
//         <p>Send us your message</p>

//         <form onSubmit={handleSubmit}>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <label>Message</label>
//           <textarea
//             name="message"
//             placeholder="Write your message"
//             value={form.message}
//             onChange={handleChange}
//             rows="5"
//             required
//           />

//           <button type="submit">Send Message</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;


// import { useState } from "react";
// import axios from "axios";
// import "./App.css";


// function App() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setStatus("");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/messages",
//         form
//       );

//       setStatus(response.data.message);

//       setForm({
//         name: "",
//         email: "",
//         message: "",
//       });
//     } catch (error) {
//       setStatus(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="container">
//       <div className="form-card">
//         <h1>Contact Us</h1>
//         <p>Send us your message</p>

//         <form onSubmit={handleSubmit}>
//           <label htmlFor="name">Name</label>
//           <input
//             id="name"
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <label htmlFor="message">Message</label>
//           <textarea
//             id="message"
//             name="message"
//             placeholder="Write your message"
//             value={form.message}
//             onChange={handleChange}
//             rows="5"
//             required
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Sending..." : "Send Message"}
//           </button>

//           {status && <p role="status">{status}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;

import EcommerceHome from "./components/EcommerceHome";

function App() {
  return <EcommerceHome />;
}

export default App;
