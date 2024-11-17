import ContestList from "./contest-list";
import { useState, useEffect } from "react";
import Contest from "./contest";
const App = ({ initialData }) => {

   const [page, setPage] = useState<"contestList" | "contest">("contestList")
   const [currentContest, setCurrentContest] = useState<object | undefined>(initialData.currentContest);

   useEffect(() => {
      window.onpopstate = (event) => {
         const newPage = event.state?.contestId ? "contest" : "contestList";
         setPage("contest");
         setCurrentContest({ id: event.state?.contestId });
      }
   }, [])



   const navigateToContent = ({ id: contestId }) => {
      window.history.pushState({ contestId }, "", `/contest/${contestId}`)
      setPage("contest");
      setCurrentContest(contestId)
   }


   const navigateToContestList = () => {
      window.history.pushState({}, "", `/`)
      setPage("contestList");
      setCurrentContest(undefined)
   }

   const pageContent = () => {
      switch (page) {
         case "contestList":
            return (<ContestList
               initialContests={initialData.contests}
               onContestClick={navigateToContent} />);
         case "contest":
            return <Contest initialContest={currentContest} onContestClick={navigateToContestList} />
         default:
            break;
      }
   }

   return (
      <div className="container">
         {pageContent()}
      </div>
   );
};

export default App;