import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
export default function Login() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: register1,
    handleSubmit: hS1,
    formState: { errors: errors1 },
  } = useForm();
  const url = `https://dapper-precious-sedum.glitch.me/profile`;
  const onLoginSubmit = (dat) => {
    const email = dat.Email;
    const password = dat.Password;
    fetch(`${url}/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).length === 0) {
          toast({
            title: "Account Not Found",
            description:"Create a new account",
            position: "top-center",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          if (data.password !== password) {
            toast({
              title: "Password do not match",
              position: "top-center",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Sign In Successfully!",
              position: "top-center",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            document.getElementById("loginform").reset()
          }
        }
      });
  };
  const onSubmit = (data) => {
    let obj = {
      name: data.Name,
      id: data.Email,
      password: data.Password,
      cart: [],
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    toast({
      title: "Account Created Successfully.",
      position: "top-center",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    document.getElementById("ca").reset()
  };
  return (
    <DIV>
      <Tabs variant="soft-rounded" id="modal">
        <TabList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <form action="" id="loginform" onSubmit={hS1(onLoginSubmit)}>
              <label>Enter your Email</label>
              <input
                autoComplete="off"
                {...register1("Email", {
                  required: true,
                  pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
              {errors1?.Email?.type === "required" && (
                <p>
                  <RiErrorWarningFill /> This field is required
                </p>
              )}
              {errors1?.Email?.type === "pattern" && (
                <p>
                  <RiErrorWarningFill /> Invalid email address
                </p>
              )}

              <label>Enter your Password</label>
              <input
                type="password"
                autoComplete="off"
                {...register1("Password", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                })}
              />
              {errors1?.Password?.type === "required" && (
                <p>
                  <RiErrorWarningFill /> This field is required
                </p>
              )}
              {errors1?.Password?.type === "minLength" && (
                <p>
                  <RiErrorWarningFill /> Password must be 6 characters
                </p>
              )}
              {errors1?.Password?.type === "maxLength" && (
                <p>
                  <RiErrorWarningFill /> Password must be 6 characters
                </p>
              )}
              <input type="submit" />
            </form>
          </TabPanel>
          <TabPanel>
            <form id="ca" onSubmit={handleSubmit(onSubmit)}>
              <label>Enter your Name</label>
              <input
                autoComplete="off"
                {...register("Name", {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {errors?.Name?.type === "required" && (
                <p>
                  <RiErrorWarningFill /> This field is required
                </p>
              )}
              {errors?.Name?.type === "maxLength" && (
                <p>
                  <RiErrorWarningFill /> Name cannot exceed 20 characters
                </p>
              )}
              {errors?.Name?.type === "minLength" && (
                <p>
                  <RiErrorWarningFill /> Name must be at 3 characters
                </p>
              )}
              {errors?.Name?.type === "pattern" && (
                <p>
                  <RiErrorWarningFill /> Alphabetical characters only
                </p>
              )}

              <label>Enter your Email</label>
              <input
                autoComplete="off"
                {...register("Email", {
                  required: true,
                  pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
              {errors?.Email?.type === "required" && (
                <p>
                  <RiErrorWarningFill /> This field is required
                </p>
              )}
              {errors?.Email?.type === "pattern" && (
                <p>
                  <RiErrorWarningFill /> Invalid email address
                </p>
              )}

              <label>Create your Password</label>
              <input
                type="password"
                autoComplete="off"
                {...register("Password", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                })}
              />
              {errors?.Password?.type === "required" && (
                <p>
                  <RiErrorWarningFill /> This field is required
                </p>
              )}
              {errors?.Password?.type === "minLength" && (
                <p>
                  <RiErrorWarningFill /> Password must be 6 characters
                </p>
              )}
              {errors?.Password?.type === "maxLength" && (
                <p>
                  <RiErrorWarningFill /> Password must be 6 characters
                </p>
              )}

              <input type="submit" />
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DIV>
  );
}
const DIV = styled.div`
  background-color: #000004;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  #modal {
    border: 2px solid white;
    /* height: 60%; */
    padding: 20px;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      width: 150px;
      color: white;
    }
    button[aria-selected="true"] {
      background-color: #f76f22;
      color: white;
      font-weight: 700;
    }
    #loginform,
    #ca {
      display: flex;
      flex-direction: column;
      color: white;
      input {
        background-color: transparent;
        height: 50px;
        margin-top: 15px;
        margin-bottom: 10px;
        border: 1px solid;
        padding: 10px;
        border-radius: 10px;
      }
      input[type="submit"] {
        width: 50%;
        margin: auto;
        margin-top: 15px;
        color: #f76f22;
        border-radius: 50px;
        border: 0;
        background-color: white;
        font-size: 18px;
        font-weight: 700;
        height: 40px;
        padding: 0px;
      }
      caret-color: #f76f22;
      p {
        display: flex;
        align-items: center;
        gap: 5px;
        padding-bottom: 5px;
        color: red;
      }
    }
  }
`;
