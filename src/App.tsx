import ScoreItem from "./ScoreItem";
function App() {

  return (<section className="flex justify-center items-center h-screen gap-10 text-3xl">
    <ScoreItem team="home" />
    <ScoreItem team="guest" />
  </section>)

}

export default App;
