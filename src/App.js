import { useEffect, useState } from "react";
import { data } from "./services/enyetech";
import "./App.css";
import Display from "./components/Display";
import Header from "./components/Header";

const FILTER_MAP = {
  ALL: () => true,
};

function App() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, searchState] = useState("");

  const oneProp = "Come here";

  function searchSpace(event) {
    event.preventDefault();
    searchState(event.target.value);
  }
  useEffect(() => {
    let mounted = true;
    data()
      .then((items) => {
        if (mounted) {
          setList(items.records.profiles);
        }
      })
      .catch((error) => {
        document.querySelector("#error").innerHTML = error;
      }); //rewrite for better display
    return () => (mounted = false);
  }, []);

  if (!list) {
    return (
      <div>
        <div className="ui negative message">
          <div className="header">We encountered an Error</div>
          <div id="error"></div>
        </div>
      </div>
    );
  } else {
    if (search === "") {
      return (
        <div>
          <div>{header({ oneProp, searchSpace, search })}</div>
          <div className="ui container centered grid">
            <div className="ui row divided grid ">
            <Display list={list} />
            </div>
          </div>
        </div>
      );
    } else {
      // eslint-disable-next-line array-callback-return
      const items = list.filter((item) => {
        if (
          item.FirstName.toLowerCase().includes(search.toLocaleLowerCase()) ||
          item.LastName.toLowerCase().includes(search.toLocaleLowerCase())
        ) {
          return item;
        }
      });
      return (
        <div>
          <div>{header({ oneProp, searchSpace, search })}</div>
           <div className="ui container centered grid">
            <div className="ui row divided grid ">
            <Display list={items} />
            </div>
          </div>
        </div>
      );
    }
  }
}
function header(props) {
  return (
    <header>
      <div>
        <Header {...props} />
      </div>
    </header>
  );
}

export default App;
