import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Button from "../control/Button";
import Input from "../control/Input";
import { Form, useForm } from "./feebackForm";

const initialFValues = {
  id: "",
  rely: "",
};
const FeedbackForm = (props) => {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("rely" in fieldValues)
      temp.rely = fieldValues.rely ? "" : "This field is required.";
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
        <Grid item xs={12}>
          <Input
            name="rely"
            label="Rely"
            value={values.rely}
            onChange={handleInputChange}
            error={errors.rely}
          />
        </Grid>
        <Grid item xs={6}>
          <div>
            <Button type="submit" text="Submit" />
            <Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default FeedbackForm;
