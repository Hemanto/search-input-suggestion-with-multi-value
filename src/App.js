import logo from "./logo.svg";
import "./App.css";
import CustomizedHook from "./Components/MultiSelect";
import MultiSelect from "./Components/MultiSelect";
import { CacheApiConfig } from "react-cache-api";

function App() {
  return (
    <div className="centerDiv">
      <CacheApiConfig baseURL="https://api.publicapis.org">
        <MultiSelect
          endPoint="https://api.publicapis.org/entries?title="
          label="MultiSelect"
          placeholder="Search"
          onChange={(values) => console.log(values)}
        />
      </CacheApiConfig>
    </div>
  );
}

export default App;
