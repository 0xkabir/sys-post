import React, { useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Button,
    Dialog,
    DialogBody,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Input,
  } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
   
  export default function Home() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleSignUp = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value;
        const pass = form.pass.value;
        const confirm_pass = form.confirm_pass.value
        if(pass === confirm_pass){
            const userObj = {email: email, password: pass, confirmpassword: confirm_pass}
            console.log(userObj)
            fetch("https://sysonex-admin-testing.onrender.com/signup", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userObj)
            })
            .then(response => response.json())
            .then(data => {
                if(data?.email){
                    form.reset()
                    setOpen(false)
                    toast.success('User Created Successfully')
                }
                else if(data?.constraint === "tenants_email_key"){
                    setOpen(false)
                    toast.error('Email Already Exists')
                }
            })
        }
        else{
            toast.error("Passwords Don't Match")
        }
    }

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value;
        const pass = form.pass.value;
        const userObj = {email: email, password: pass}
        fetch("https://sysonex-admin-testing.onrender.com/login", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userObj)
        })
        .then(response => response.json())
        .then(data => {
            if(typeof(data) === 'string'){
                localStorage.setItem('systoken', data)
                form.reset()
                setOpen(false)
                toast.success('Login Successful')
                navigate('/account')
            }
            else if(JSON.stringify(data) === JSON.stringify({})){
                form.reset()
                setOpen(false)
                toast.error("User Does not Exist")
            }
        })
    }

    const data = [
        {
          label: "SignUp",
          value: "signup",
          desc: 
          <Card className="w-max-96 mx-auto shadow-sm">
          <CardBody className="text-center">
              <form className="flex flex-col gap-y-3" onSubmit={handleSignUp}>
                <Input label="Email" id="email"/>
                <Input label="Password" id="pass"/>
                <Input label="Confirm Password" id="confirm_pass"/>
                <Button type="submit" variant="outlined" className="w-max-140 mx-auto">Sign Up</Button>
              </form>
          </CardBody>
        </Card>,
        },
        {
          label: "Login",
          value: "login",
          desc: <Card className="w-max-96 mx-auto shadow-sm">
          <CardBody className="text-center">
              <form className="flex flex-col gap-y-3" onSubmit={handleLogin}>
                <Input label="Email" id="email"/>
                <Input label="Password" id="pass"/>
                <Button type="submit" variant="outlined" className="w-max-140 mx-auto">Login</Button>
              </form>
          </CardBody>
        </Card>,
        }
      ];


    return (
    <div className='relative h-[100vh] flex items-center justify-center'>
      <Card className="w-max-96 mx-auto">
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            Welcome to Sys-post
          </Typography>
          <Button variant="outlined" onClick={handleOpen}>Start Actions</Button>
        </CardBody>
      </Card>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody>
        <Tabs id="custom-animation" value="html">
            <TabsHeader>
                {data.map(({ label, value, desc }) => (
                <Tab key={value} value={value}>
                    {label}
                </Tab>
                ))}
            </TabsHeader>
            <TabsBody
                animate={{
                mount: { y: 0 },
                unmount: { y: 250 },
                }}
            >
                {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value} className="px-0">
                    {desc}
                </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
        </DialogBody>
      </Dialog>
      </div>
    );
  }