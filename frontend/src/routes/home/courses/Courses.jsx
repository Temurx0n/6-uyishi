import "./Courses.css";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
const Courses = () => {
  const [modal, setModal] = useState(false);
  const [img, setImg] = useState("");
  const [data, setCourses] = useState([]);

  const modals = () => {
    if (localStorage.getItem("token")) {
      setModal(true);
    } else {
      alert("Token mavjud emas");
      window.location = "/login";
    }
  };


  const sendData = (e) => {
    e.preventDefault();
    let { title, price, author, file } = e.target;
    fetch("http://localhost:4000/data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        price: price.value,
        author: author.value,
        img,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        title.value = "";
        price.value = "";
        author.value = "";
        file.value = "";
      });
  };

  useEffect(() => {
    fetch("http://localhost:4000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);


  return (
    <div className="courses">
      <div className="courses_header">
        <button onClick={() => modals()} className="create_courses_btn">
          Create
        </button>
        <div className="courses_header_texts">
          <h4 className="courses_header_texts_id">Id</h4>
          <h4 className="courses_header_texts_title">Title</h4>
          <h4 className="courses_header_texts_price">Price</h4>
          <h4 className="courses_header_texts_author">Author</h4>

          <h4 className="courses_header_texts_update">Update</h4>
          <h4 className="courses_header_texts_delete">Delete</h4>
        </div>
      </div>
      {modal ? (
        <div className="courses_modal">
          <div
            onClick={() => window.location.reload(false) && setModal(false)}
            className="courses_modal_overlay"
          ></div>
          <div className="courses_modal_content">
            <div className="courses_modal_header">
              <h2 className="courses_modal_title">Create course</h2>
              <span
                onClick={() => window.location.reload(false) && setModal(false)}
                className="courses_modal_closeSpan"
              >
                <GrClose className="courses_close" />
              </span>
            </div>
            <form onSubmit={(e) => sendData(e)} className="form_courses">
              <div className="form_courses_div">
                <label for="title">Title:</label>
                <input
                  type="text"
                  className="form_courses_input"
                  placeholder="Enter your title..."
                  required
                  id="title"
                  name="title"
                  minLength={3}
                  maxLength={20}
                />
              </div>

              <div className="form_courses_div">
                <label for="price">Price:</label>
                <input
                  type="text"
                  className="form_courses_input"
                  placeholder="Enter your price..."
                  required
                  id="price"
                  name="price"
                  minLength={3}
                  maxLength={12}
                />
              </div>

              <div className="form_courses_div">
                <label for="author">Author:</label>
                <input
                  type="text"
                  className="form_courses_input"
                  placeholder="Enter your author..."
                  required
                  id="author"
                  name="author"
                  minLength={3}
                  maxLength={20}
                />
              </div>

              <button type="submit" className="form_courses_btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <div className="coursesAll">
        {data.map((el, inx) => (
          <div className="data_courses_div" key={inx}>
            <h4 className="courses_header_texts_id">{inx + 1}</h4>
            <p className="courses_header_texts_title">{el.title}</p>
            <p className="courses_header_texts_price">{el.price}</p>
            <p className="courses_header_texts_author">{el.author}</p>
            <img className="courses_header_texts_img" src={el.img} alt="" />
            <span className="courses_header_texts_update">
              <FiEdit className="courses_update" />
            </span>
            <span className="courses_header_texts_delete">
              <MdDelete className="courses_delete"
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Courses;
