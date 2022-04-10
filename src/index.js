import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myapps" element={<Navigate replace to="/learn" />} />
        <Route path="/learn" element={<Learn />}>
          <Route path="courses" element={<Courses />}>
            <Route path=":course_id" element={<CourseId />} />
          </Route>
          <Route path="bundles" element={<Bundles />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

function Home() {
  return (
    <>
      <div className="container">
        <h2>Home route</h2>
        <p>
          <button className="btn btn-danger">Click</button>
        </p>
      </div>
    </>
  );
}

function Learn() {
  return (
    <>
      <div className="container mt-3">
        <p className="bg-info px-4 py-2">
          <Link to="/learn/courses" className="btn btn-success me-4">
            Courses
          </Link>
          <Link to="/learn/bundles" className="btn btn-primary">
            Bundles
          </Link>
        </p>
        <Outlet />
      </div>
    </>
  );
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "NodeJs"];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];
  const applyActiveStyles = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "pink" : "yellow",
    };
  };
  return (
    <>
      <h2>Courses route</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        repudiandae expedita facilis natus aut perferendis aspernatur, omnis
        dignissimos eos molestiae.
      </p>
      <p>More tests</p>
      <NavLink
        to={`/learn/courses/${randomCourseName}`}
        style={applyActiveStyles}
      >
        {randomCourseName}
      </NavLink>{" "}
      <NavLink to={`/learn/courses/tests`} style={applyActiveStyles}>
        Tests
      </NavLink>
      <Outlet />
    </>
  );
}

function Bundles() {
  return (
    <>
      <h2>Bundles route</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas vitae,
        quae natus veniam voluptatum ex accusantium doloremque dolores modi
        corrupti.
      </p>
    </>
  );
}

function CourseId() {
  const navigate = useNavigate();
  const { course_id } = useParams();
  return (
    <>
      <h2>Information about {course_id}.</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas vitae,
        quae natus veniam voluptatum ex accusantium doloremque dolores modi
        corrupti.
      </p>
      <p>
        <button
          onClick={() => {
            navigate("/dashboard", { state: { name: course_id, price: 399 } });
          }}
          className="btn btn-warning"
        >
          Price for {course_id}
        </button>
      </p>
      <p>
        <Link
          to="/dashboard"
          state={JSON.stringify(`{ name: ${course_id}, price: "399" }`)}
        >
          Test link
        </Link>
      </p>
    </>
  );
}

function Dashboard() {
  const location = useLocation();
  console.log(typeof location.state);

  return (
    <>
      <div className="container">
        <h2>Dashboard</h2>
        <p>
          The price of the {location.state.name} course is: $
          {location.state.price}.
        </p>
      </div>
    </>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
