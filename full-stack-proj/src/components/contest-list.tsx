import { useEffect, useState } from "react";
import { fetchContests } from "../api-client";
import ContestPreview from "./contest-preview";
import Header from "./header";
const ContestList = ({ initialContests, onContestClick }) => {
   const [contests, setContests] = useState(initialContests ?? []);

   useEffect(() => {
      if (!initialContests) {
         fetchContests().then((contests) => {
            setContests(contests);
         });
      }
   }, [initialContests]);

   return (
      <>
         <Header message="Naming Contests" />

         <div className="contest-list">
            {contests.map((contest) => {
               return (
                  <ContestPreview key={contest.id} contest={contest} onClick={onContestClick} />
               );
            })}
         </div>

      </>

   );
};

export default ContestList;