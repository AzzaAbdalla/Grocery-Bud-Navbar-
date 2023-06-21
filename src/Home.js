import React, { useState } from "react";
import List from "./List";
import Alert from "./Alert";

const Home = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //alert
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      //handle edit
      setList(
        list.map((item) => {
          if (item.id === editID) return { ...item, title: name };
          return item;
        })
      );

      showAlert(true, "item edited", "success");
      setName("");
      setEditID(null);
      setIsEditing(false);
    } else {
      showAlert(true, "item added successfully", "success");
      const item = { id: new Date().getTime().toString(), title: name };
      setList([...list, item]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "item removed", "danger");
  };

  const editItem = (id) => {
    const eItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(eItem.title);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handelSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button
            className="clear-btn"
            onClick={() => {
              setList([]);
              showAlert(true, "now list is empty", "danger");
            }}
          >
            Clear List
          </button>
        </div>
      )}
    </section>
  );
};

export default Home;
