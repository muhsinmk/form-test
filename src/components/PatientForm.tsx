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
import React, { useMemo, useState } from "react";
import ListTable, { TableData } from "./ListTable";

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dateOfVisit: "",
    symptom: "",
  });
  const [symptomData, setSymptomData] = useState<string[]>([]);
  const [allTableData, setAllTableData] = useState<TableData[]>([]);
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
  };

  const handleAddSymptom = () => {
    const { symptom } = formData;
    if (symptom.trim()) {
      setSymptomData((prev) => [...prev, symptom.trim()]);
      setFormData((prev) => ({ ...prev, symptom: "" }));
    }
  };

  const handleRemoveSymptom = (item: string) => {
    setSymptomData((prev) => prev.filter((s) => s !== item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, age, gender, dateOfVisit } = formData;

    if (!name.trim() || !dateOfVisit.trim()) {
      alert("Please fill in the required fields");
      return;
    }

    const newData: TableData = { name, age, gender, dateOfVisit };
    setAllTableData((prev) => [...prev, newData]);

    setFormData({
      name: "",
      age: "",
      gender: "",
      dateOfVisit: "",
      symptom: "",
    });
    setSymptomData([]);
  };

  const filteredTableData = useMemo(() => {
    if (!search.trim()) return allTableData;
    return allTableData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allTableData]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          sx={{ mt: 2 }}
          label="Full Name"
          required
          fullWidth
          value={formData.name}
          onChange={handleInputChange}
        />

        <TextField
          name="age"
          sx={{ mt: 2 }}
          label="Age"
          type="number"
          required
          fullWidth
          value={formData.age}
          onChange={handleInputChange}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={formData.gender}
            label="Gender"
            onChange={handleSelectChange}
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
          type="date"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.dateOfVisit}
          onChange={handleInputChange}
        />

        <Typography sx={{ mt: 2 }}>Symptoms List</Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            name="symptom"
            label="Symptom"
            fullWidth
            value={formData.symptom}
            onChange={handleInputChange}
          />
          <Button
            variant="outlined"
            sx={{ height: 56 }}
            onClick={handleAddSymptom}
          >
            Add
          </Button>
        </Box>

        {symptomData.length > 0 && (
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
                  onClick={() => handleRemoveSymptom(item)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
        )}

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
        label="Search"
        fullWidth
        sx={{ mt: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTableData.length > 0 && (
        <ListTable tableData={filteredTableData} />
      )}
    </>
  );
};

export default PatientForm;
