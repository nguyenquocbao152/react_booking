import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { requestUrl } from "../../const/Const";
import Button from "../control/Button";
import DatePicker from "../control/DatePicker";
import Input from "../control/Input";
import SelectRoute from "../control/SelectRoute";
import SelectStation from "../control/SelectStation";
import Select from "../control/SelectVehicle";
import { Form, useForm } from "./triForm";
const initialFValues = {
  id: "",
  vehicalId: "",
  date: new Date(),
  time: "",
  routeId: "",
  stationId: "",
};
function TripForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [vehicle, setVehicle] = useState([]);
  const [route, setRoute] = useState([]);
  const [station, setStation] = useState([]);
  useEffect(() => {
    const requestUr = `${requestUrl}vehicle/getAllVehicle`;
    const fetchData = async () => {
      const result = await fetch(requestUr, {
        method: "POST",
      });
      result.json().then((json) => {
        setVehicle(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const requestUr = `${requestUrl}route/getAllRoutes`;
    const fetchData = async () => {
      const result = await fetch(requestUr, {
        method: "POST",
      });
      result.json().then((json) => {
        setRoute(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const requestUr = `${requestUrl}station/getAllStation`;
    const fetchData = async () => {
      const result = await fetch(requestUr, {
        method: "POST",
      });
      result.json().then((json) => {
        setStation(json);
      });
    };
    fetchData();
  }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("time" in fieldValues)
      temp.time = fieldValues.time ? "" : "This field is required.";
    if ("vehicalId" in fieldValues)
      temp.vehicalId =
        fieldValues.vehicalId.length !== 0 ? "" : "This field is required.";
    if ("routeId" in fieldValues)
      temp.routeId =
        fieldValues.routeId.length !== 0 ? "" : "This field is required.";
    if ("stationId" in fieldValues)
      temp.stationId =
        fieldValues.stationId.length !== 0 ? "" : "This field is required.";
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
        console.log("value:", values);
        let date = handleChange(values.date);
        console.log("date: ", date);
        //addOrEdit(values, resetForm);
      }
    }
  };
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  const handleChange = (e) => {
    const dateFormat =
      e.getFullYear() +
      "-" +
      (e.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      e.getDate().toString().padStart(2, "0");
    return dateFormat;
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <SelectRoute
            name="routeId"
            label="Route"
            value={values.routeId}
            onChange={handleInputChange}
            options={route}
            error={errors.routeId}
          />
          <Select
            name="vehicalId"
            label="Vehicle"
            value={values.vehicalId}
            onChange={handleInputChange}
            options={vehicle}
            error={errors.vehicalId}
          />
          <Input
            name="time"
            label="Time"
            value={values.time}
            onChange={handleInputChange}
            error={errors.time}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectStation
            name="stationId"
            label="Station"
            value={values.stationId}
            onChange={handleInputChange}
            options={station}
            error={errors.stationId}
          />
          <DatePicker
            name="date"
            label="Date"
            value={values.date}
            onChange={handleInputChange}
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

export default TripForm;
