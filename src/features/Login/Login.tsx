import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "./auth-reducer";
import { AppRootStateType } from "../../app/store";
import { Navigate } from "react-router-dom";

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

const validate = (values: FormikErrorType) => {
    const errors: FormikErrorType = {};

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 3) {
        errors.password = "The password must be more than 3 characters";
    }

    return errors;
};

export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn);

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate,
        onSubmit: (values) => {
            dispatch(loginTC(values));
            formik.resetForm({
                values: { email: "", password: "", rememberMe: false },
            });
        },
    });

    if (isLoggedIn) {
        return <Navigate to={"/"} />;
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                                    {" "}
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                type={"email"}
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            ) : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: "red" }}>{formik.errors.password}</div>
                            ) : null}
                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Checkbox
                                        onChange={formik.handleChange}
                                        checked={formik.values.rememberMe}
                                        name={"rememberMe"}
                                    />
                                }
                            />
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                disabled={!(formik.isValid && formik.dirty)}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
