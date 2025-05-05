import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListTable, { TableData } from "./ListTable";

const PatientForm: React.FC = () => {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [symptom, setSymptom] = useState("");
  const [symptomData, setSymptomData] = useState<string[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [search, setSearch] = useState("");

  const handleChange = (e: SelectChangeEvent) => {
    setGender(e.target.value);
  };

  const handleAddSymptoms = () => {
    if (symptom.trim()) {
      setSymptomData((prev) => [...prev, symptom.trim()]);
      setSymptom("");
    }
  };

  const handleRemove = (item: string) => {
    setSymptomData((prev) => prev.filter((fItem) => fItem !== item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !dateOfVisit.trim()) {
      alert("Please fill in the required fields");
      return;
    }

    const data: TableData = {
      name,
      age,
      dateOfVisit,
      gender,
    };

    setTableData((prev) => [...prev, data]);
    console.log("Submitted Data:", data);
  };

  useEffect(() => {
    if (search.trim()) {
      const filteredData = tableData.filter((item) => item.name === search);

      setTableData(filteredData);
    }
    setTableData(tableData);
  }, [search, tableData]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          sx={{ mt: 2 }}
          label="Full Name"
          variant="outlined"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          name="age"
          sx={{ mt: 2 }}
          label="Age"
          variant="outlined"
          required
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            value={gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="dateOfVisit"
          sx={{ mt: 2 }}
          label="Date of Visit"
          variant="outlined"
          required
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateOfVisit}
          onChange={(e) => setDateOfVisit(e.target.value)}
          fullWidth
        />
        <Typography sx={{ mt: 2 }}>Symptoms List</Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            name="symptom"
            value={symptom}
            label="Symptom"
            variant="outlined"
            onChange={(e) => setSymptom(e.target.value)}
            fullWidth
          />
          <Button
            variant="outlined"
            size="medium"
            onClick={handleAddSymptoms}
            sx={{ height: "56px" }}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          {symptomData.map((item) => (
            <Box
              key={item}
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography>{item}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(item)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>

      <TextField
        name="search"
        sx={{ mt: 2 }}
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />

      {tableData?.length ? <ListTable tableData={tableData} /> : null}
    </>
  );
};

export default PatientForm;
