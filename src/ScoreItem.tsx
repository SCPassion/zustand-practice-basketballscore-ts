import { useScoresStore } from "./store/store"

type ScoreItemProps = {
  team: "home" | "guest";
}

export default function ScoreItem({team}: ScoreItemProps) {
  // use the Zustand store with a selector to get the score for the team
  const score = useScoresStore(state => team === "home" ? state.homeScore: state.guestScore);
  const incrementScore = useScoresStore(state => state.incrementScore)
  // This component will only re-render when the const score changes
  // The changes of the alter score will not cause this component to re-render

  // NOTE:
  // if the other component is not using the selector, say:
  // const { homeScore, guestScore, incrementScore } = useScoresStore();
  // then the other component will re-render ast well
  // because the entire store is being used
  return (   
  <div>
    <h2>{team.toUpperCase()}</h2>
    <p>{score}</p>
    <div className="space-x-2">
      <button className="bg-gray-500" onClick={()=>incrementScore(team, 1)}>+1</button>
      <button className="bg-gray-500" onClick={()=>incrementScore(team, 2)}>+2</button>
      <button className="bg-gray-500 cursor-pointer" onClick={()=>incrementScore(team, 3)}>+3</button>
    </div>
  </div>
  )
}