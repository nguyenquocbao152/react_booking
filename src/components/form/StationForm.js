import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Button from "../control/Button";
import Input from "../control/Input";
import { Form, useForm } from "./statioForm";
const initialFValues = {
  id: "",
  stationStart: "",
  stationEnd: "",
};
function StationForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("stationStart" in fieldValues)
      temp.stationStart = fieldValues.stationStart
        ? ""
        : "This field is required.";
    if ("stationEnd" in fieldValues)
      temp.stationEnd = fieldValues.stationEnd ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (validate()) {
        addOrEdit(values, resetForm);
      }
    }
  };
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            name="stationStart"
            label="Station Start"
            value={values.stationStart}
            onChange={handleInputChange}
            error={errors.stationStart}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Station End"
            name="stationEnd"
            value={values.stationEnd}
            onChange={handleInputChange}
            error={errors.stationEnd}
          />
          <div>
            <Button type="submit" text="Submit" />
            <Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default StationForm;
