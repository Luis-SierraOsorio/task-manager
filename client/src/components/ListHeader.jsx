export default function ListHeader({ listName }) {
  function signOut(){
    console.log("Sign Out")
  }

  
    return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create">ADD NEW</button>
        <button className="signout" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}
