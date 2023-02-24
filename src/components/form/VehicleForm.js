import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Button from "../control/Button";
import Input from "../control/Input";
import { Form, useForm } from "./vehiclForm";
const initialFValues = {
  id: "",
  licensePlates: "",
  color: "",
  seat: "",
  type: "",
};
const VehicleForm = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("licensePlates" in fieldValues)
      temp.licensePlates = fieldValues.licensePlates
        ? ""
        : "This field is required.";
    if ("color" in fieldValues)
      temp.color = fieldValues.color ? "" : "This field is required.";
    if ("seat" in fieldValues)
      temp.seat = fieldValues.seat ? "" : "This field is required.";
    if ("type" in fieldValues)
      temp.type = fieldValues.type ? "" : "This field is required.";
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
            name="licensePlates"
            label="License Plates"
            value={values.licensePlates}
            onChange={handleInputChange}
            error={errors.licensePlates}
          />
          <Input
            label="Color"
            name="color"
            value={values.color}
            onChange={handleInputChange}
            error={errors.color}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Seat"
            name="seat"
            value={values.seat}
            onChange={handleInputChange}
            error={errors.seat}
          />
          <Input
            label="Type"
            name="type"
            value={values.type}
            onChange={handleInputChange}
            error={errors.type}
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

export default VehicleForm;
