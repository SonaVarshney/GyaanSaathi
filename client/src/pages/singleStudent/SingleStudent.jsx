import "./single.scss";

import { useLocation, useNavigate} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import useFetch from "../../hooks/useFetch";
import Course from "../../components/course/Course";

const Single = ({ type }) => {
  
  // get id of the user using location
  // auth context can also be used 

  const location = useLocation();
  
  let id
  if (type === "Main")
    id = location.pathname.split("/")[2];
  else
    id = location.pathname.split("/")[3];
  const { data } = useFetch(`/students/${id}`)
  const attendance = useFetch(`/students/getAttendance/${id}`).data 
  
  
  // used to navigate to a certain link
  const navigate = useNavigate();

  return (
    <div className="studentProfile">

        {(type === "Admin") ? (<AdminNavbar />) : (<Navbar />)}
      
        <div className="top">
          <div className="left">
            <img
              src={data.profilePicture || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
              alt=""
              className="itemImg"
            />

            <div className="details">
              {/* Name */}
              <h1 className="itemTitle">{data.name}</h1>
                
                {/* ID */}
                <div className="detailItem">
                  <span className="itemKey">Enrollment Number:</span>
                  <span className="itemValue">{data.enroll}</span>
                </div>
                
                {/* Username */}
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{data.username}</span>
                </div>
                
                {/* Email */}
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                
                {/* Phone Number */}
                <div className="detailItem">
                  <span className="itemKey">Phone Number:</span>
                  <span className="itemValue">{data.studentPhone}</span>
                </div>

                {/* Address */}
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{data.studentAddress}</span>
                </div>
                
                {/* Department */}
                <div className="detailItem">
                  <span className="itemKey">Class:</span>
                  <span className="itemValue">{data.classname}</span>
                </div>

                {/* Gender */}
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{data.gender}</span>
                </div>

                {/* Date of Birth */}
                <div className="detailItem">
                  <span className="itemKey">Date of Birth:</span>
                  <span className="itemValue">{data.dob}</span>
                </div>

                <button className="editButton" onClick={() => navigate("edit")}>Edit Profile</button>
            </div>
          </div>
          <div className="right">
            <div className="title">Marks</div>
            <div className="attendance">
              <h2 className="title">Attendance</h2>
              <div>{attendance.perc ? (<><span>Attendance: </span>{attendance?.perc}</>):("Attendance doesn't currently exist")}</div>
              <div><span>Classes Attended:</span> {attendance?.attended}</div>
              <div><span>Total Classes:</span> {attendance?.total}</div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h2 className="courseTitle">Courses</h2>
          <div className="coursesContainer">
            {data.classInfo?.subjects?.map((item, index) => (
              <Course 
                name={item.name}
                index={index}
                subjectCode={item.subjectCode}
                syllabusPicture={item.syllabusPicture} 
                teacher={item.teacher.teachername}
              />
            ))}
          </div>
        </div>
        
    </div>
  );
};

export default Single;
