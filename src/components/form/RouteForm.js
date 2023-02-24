import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Button from "../control/Button";
import Input from "../control/Input";
import { Form, useForm } from "./routForm";
const initialFValues = {
  id: "",
  from: "",
  to: "",
  travelTime: "",
  distance: "",
  fare: "",
};
const RouteForm = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("from" in fieldValues)
      temp.from = fieldValues.from ? "" : "This field is required.";
    if ("to" in fieldValues)
      temp.to = fieldValues.to ? "" : "This field is required.";
    if ("travelTime" in fieldValues)
      temp.travelTime = fieldValues.travelTime ? "" : "This field is required.";
    if ("distance" in fieldValues)
      temp.distance = fieldValues.distance ? "" : "This field is required.";
    if ("fare" in fieldValues)
      temp.fare = fieldValues.fare ? "" : "This field is required.";
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
      addOrEdit(values, resetForm);
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
            name="from"
            label="From"
            value={values.from}
            onChange={handleInputChange}
            error={errors.from}
          />
          <Input
            label="To"
            name="to"
            value={values.to}
            onChange={handleInputChange}
            error={errors.to}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Travel Time"
            name="travelTime"
            value={values.travelTime}
            onChange={handleInputChange}
            error={errors.travelTime}
          />
          <Input
            label="Distance"
            name="distance"
            value={values.distance}
            onChange={handleInputChange}
            error={errors.distance}
          />
          <Input
            label="Fare"
            name="fare"
            value={values.fare}
            onChange={handleInputChange}
            error={errors.fare}
          />
          <div>
            <Button type="submit" text="Submit" />
            <Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default RouteForm;
