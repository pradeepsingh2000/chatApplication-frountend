// import React, { useState } from "react";
// import { useFormik } from "formik";
// import { useNavigate, useParams } from "react-router-dom";
// import { singUpSchema } from "../schema";
// import { registerUser } from "../redux/api/auth";
// import toastResponse from "../utils/response";
// import { setUser } from "../redux/reducer/authslice";
// import { useDispatch } from "react-redux";
// import { warn } from "../const";
// import Loader from "../components/loader";
// export default function Register() {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useParams()

//   const initialValues = {
//     password: "",
//     email: "",
//     firstName: "",
//     lastName: ""
//   };
//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
//     useFormik({
//       initialValues: initialValues,
//       validationSchema: singUpSchema,
//       onSubmit: async (values) => {
//         values.role = user
//         setLoading(true)
//         registerUser(values)
//           .then((data) => {
//             if (data.success) {
//               toastResponse.success(data.message);
//               dispatch(setUser(data.data));
//               localStorage.setItem("token", data.data.token);
//               setLoading(false)
//               navigate("/home");
//             } else {
//               setLoading(false)
//               toastResponse.error(data.message);
//             }
//           })
//           .catch((err) => {
//             toastResponse.error(err.message);
//           });
//       },
//     });

//   const loginContainer = {
//     backgroundPosition: "center center",
//     backgroundSize: "cover",
//     position: "fixed",
//     overflow: "auto",
//     top: 0,
//     bottom: 0,
//   };

//   return (
//     <div>
//       {
//         loading ? (
//           <div className="position-absolute loaderClass">
//             <Loader />
//           </div>

//         ) : (
//           <div className="container-fluid" style={loginContainer}>
//             <div className="form-container">
//               <div className="login-icon"></div>
//               <div className="login-title ">Sign up  {user}</div>
//               <form className="pa-24">
//                 <div className="form-group m-2">
//                   <input
//                     type="text"
//                     className="form-control react-form-input"
//                     id="firstName"
//                     onChange={handleChange}
//                     value={values.firstName}
//                     onBlur={handleBlur}
//                     placeholder="First Name"
//                   />
//                   {touched.firstName && errors.firstName ? (
//                     <p style={warn}>{errors.firstName}</p>
//                   ) : null}
//                 </div>

//                 <div className="form-group m-2">
//                   <input
//                     type="text"
//                     className="form-control react-form-input"
//                     id="lastName"
//                     onChange={handleChange}
//                     value={values.lastName}
//                     onBlur={handleBlur}
//                     placeholder="Last Name"
//                   />
//                   {touched.lastName && errors.lastName ? (
//                     <p style={warn}>{errors.lastName}</p>
//                   ) : null}
//                 </div>

//                 <div className="form-group m-2">
//                   <input
//                     type="email"
//                     className="form-control react-form-input"
//                     id="email"
//                     onChange={handleChange}
//                     value={values.email}
//                     onBlur={handleBlur}
//                     placeholder="Email"
//                   />
//                   {touched.email && errors.email ? (
//                     <p style={warn}>{errors.email}</p>
//                   ) : null}
//                 </div>
//                 <div className="form-group m-2">
//                   <input
//                     type="password"
//                     className="form-control react-form-input"
//                     id="password"
//                     onChange={handleChange}
//                     value={values.password}
//                     onBlur={handleBlur}
//                     placeholder="Password"
//                   />
//                   {touched.password && errors.password ? (
//                     <p style={warn}>{errors.password}</p>
//                   ) : null}
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn form-button mt-3"
//                   onClick={(e) => handleSubmit(e)}
//                 >
//                   Sign up
//                 </button>


//                 <div className="row justify-content-md-center">
//                   {

//                     user == 'admin' ? (<div
//                       className="col-md-auto link-label"
//                       onClick={() => navigate("/register/user")}
//                     >
//                       Sing Up as User?
//                     </div>) :

//                       <div
//                         className="col-md-auto link-label"
//                         onClick={() => navigate("/register/admin")}
//                       >
//                         Sing Up as Admin?
//                       </div>

//                   }



//                   {
//                     user == 'admin' ? (<div
//                       className=" col-md-auto link-label"
//                       onClick={() => navigate("/login/user")}
//                     >
//                       Login as User?
//                     </div>) : (<div
//                       className=" col-md-auto  link-label"
//                       onClick={() => navigate("/login/admin")}
//                     >
//                       Login as Admin?
//                     </div>)
//                   }
//                 </div>
//               </form>
//             </div >
//             {loading && <Loader />
//             }
//           </div >
//         )
//       }

//     </div >
//   );
// }