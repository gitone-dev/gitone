import { usePingQuery } from "./generated/types";

function App() {
  const { data, loading, error } = usePingQuery();

  if (loading) {
    return <div className="App">loading</div>;
  } else if (error) {
    return <div className="App">{error.message}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">{data?.ping}</header>
    </div>
  );
}

export default App;
