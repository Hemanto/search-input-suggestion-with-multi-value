import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import { Chip } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useCacheApi } from "react-cache-api";

function MultiSelect({
  endPoint,
  label,
  placeholder,
  onChange,
  debounceDelay = 200,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestion] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [cache, setCache] = useState({});
  const removeItem = (label) => {
    const filterData = selectedData.filter((item) => item !== label);
    setSelectedData([...filterData]);
    onChange(filterData);
  };

  const Tag = ({ label }) => {
    return (
      <div className="chip-wrapper">
        <Chip label={label} onDelete={() => removeItem(label)} />
      </div>
    );
  };

  useEffect(() => {
    if (cache.hasOwnProperty(searchQuery)) {
      console.log("found");
    } else {
      const timer = setTimeout(() => {
        getDataSuggestion();
      }, debounceDelay);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchQuery]);

  const getDataSuggestion = () => {
    fetch(`${endPoint}${searchQuery}`)
      .then((data) => data.json())
      .then((data) => setSuggestion(data.entries))
      .then((data) =>
        setCache((prev) => ({ ...prev, [searchQuery]: suggestions }))
      )
      .catch((err) => console.log(err));
  };

  const handleToggle = (value) => {
    const currentIndex = selectedData.indexOf(value);
    const newChecked = [...selectedData];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedData(newChecked);
    onChange(newChecked);
  };

  return (
    <div>
      <span>{label}</span>
      <div className="box">
        {selectedData?.map((item, i) => (
          <Tag key={i} label={item} index={i} />
        ))}

        <Input
          placeholder={placeholder}
          className="inputWidth"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="listWidth">
        {searchQuery ? (
          <List>
            {suggestions?.map((item, i) => (
              <ListItem key={i} className="list">
                <ListItemButton onClick={() => handleToggle(item.API)} dense>
                  <Checkbox
                    edge="start"
                    type="checkbox"
                    value={item.API}
                    checked={selectedData?.includes(item.API) ? true : false}
                  />
                  <ListItemText>{item.API}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : null}
      </div>
    </div>
  );
}

export default MultiSelect;
