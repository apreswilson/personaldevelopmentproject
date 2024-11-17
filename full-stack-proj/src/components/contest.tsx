import useState from "react"
import useEffect from "react";
import { addNewOne, fetchOneContest } from "../api-client";
import Header from "./header";

const Contest = ({ initialContest, onContestClick }) => {
   const [contest, setContest] = useState(initialContest)

   useEffect(() => {
      if (!contest.names) {
         fetchOneContest(contest.id).then((contest) => {
            setContest(contest)
         });
      }
   }, [contest.id, contest.names])

   const handleClickContestList = (event) => {
      event.preventDefault();
      onContestClick();
   }

   const handleNewNameSubmit = async (event) => {
      event.preventDefault();
      const newNameInput = event.target.newName;
      const updatedContest = await addNewOne({ contestId: contest.id, newNameValue: newNameInput.value })
      setContest(updatedContest)
   }

   return (
      <>
         <Header message={contest.contestName} />
         <div className="contest">
            <div className="title">Contest Description</div>
            <div className="description">{contest.description}</div>

            <div className="title">Proposed Names</div>
            <div className="body">
               {contest.names?.length > 0 ?
                  <div className="list">
                     {contest.names.map((proposedName) => (
                        <div className="item" key={proposedName.id}>
                           {proposedName.name}
                        </div>
                     ))}
                  </div>
                  :
                  <div>No list</div>
               }
            </div>

            <div className="title">
               <div className="body">
                  <form onSubmit={handleNewNameSubmit}>
                     <input type="text" name="newName" placeholder="New Name Here"></input>
                     <button type="submit">Submit</button>
                  </form>
               </div>
            </div>

            <a href="/" className="link" onClick={handleClickContestList}>Contest List</a>
         </div>
      </>
   )
}

export default Contest;