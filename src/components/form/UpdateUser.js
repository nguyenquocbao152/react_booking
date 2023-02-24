import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Button from "../control/Button";
import Input from "../control/Input";
import RadioGroup from "../control/RadioGroup";
import Select from "../control/Select";
import { Form, useForm } from "./useForm";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];
const roleUser = [
  { id: "user", title: "user" },
  { id: "admin", title: "admin" },
];
const initialFValues = {
  id: "",
  fullName: "",
  email: "",
  role: "",
  gender: "male",
};
const UpdateUser = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const [data, setData] = useState([]);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("role" in fieldValues)
      temp.role =
        fieldValues.role.length !== 0 ? "" : "This field is required.";
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
      console.log("values:", values);
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
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            name="role"
            label="Role"
            value={values.role}
            onChange={handleInputChange}
            options={roleUser}
            error={errors.role}
          />
          <RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
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

export default UpdateUser;
