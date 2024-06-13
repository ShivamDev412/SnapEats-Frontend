import Routers from "./router";
import { SkeletonTheme } from "react-loading-skeleton";
function App() {
  return (
    <SkeletonTheme
      baseColor="rgb(63 63 70)"
      enableAnimation={false}
      highlightColor="rgb(82 82 91)"
    >
      <Routers />
    </SkeletonTheme>
  );
}

export default App;
