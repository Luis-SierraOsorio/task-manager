import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function ListHeader({ listName, getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);
  // this is a function for when the signout button is clicked, removes cookies
  function signOut() {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  }

  return (
    <div className="list-header">
      {/* title named from app.jsx */}
      <h1>{listName}</h1>
      <div className="button-container">
        {/* button to show the modal for either adding/editing task, for this its adding */}
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        {/* sign out button */}
        <button className="signout" onClick={signOut}>
          Sign Out
        </button>
      </div>

      {/* opens the modal in the create mode*/}
      {showModal && (
        <Modal
          mode={"create"}
          setShowModal={setShowModal}
          getData={getData}
        ></Modal>
      )}
    </div>
  );
}
