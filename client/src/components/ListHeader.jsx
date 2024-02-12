import { useState } from "react";
import Modal from "./Modal";

export default function ListHeader({ listName }) {
  const [showModal, setShowModal] = useState(false);
  function signOut() {
    console.log("Sign Out");
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          Sign Out
        </button>
      </div>

      {showModal && <Modal mode={"create"} setShowModal={setShowModal}></Modal>}
    </div>
  );
}
