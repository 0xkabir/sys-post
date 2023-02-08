import { toast } from 'react-hot-toast';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    CardBody,
    Input,
    Button
  } from "@material-tailwind/react";
   
  export default function AccPost() {

    const handleStringRequest = event => {
        event.preventDefault()
        const form = event.target;
        const string = form.string.value;
        const url = `https://sysonex-admin-testing.onrender.com/login/${string}`
        const tokenObj = {token: localStorage.getItem('systoken')}
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tokenObj)
        })
        .then(response => response.json())
        .then(data => {
            if(typeof(data) === 'string'){
                form.reset()
                localStorage.setItem('jwt', data)
                toast.success('JWT Token Received')
            }
            else if(data?.detail){
                toast.error('Token is invalid')
            }
        })
    }

    const handleAuthRequest = () => {
        const jwt_token = localStorage.getItem('jwt')
        fetch('https://sysonex-admin-testing.onrender.com/auth', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "authorization": `bearer ${jwt_token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(typeof(data)==='string'){
                toast.success('You are Authenticated')
            }
            else if(data?.message === 'invalid signature'){
                toast.error('You are not authenticated')
            }
        })
    }

    const data = [
      {
        label: "String Request",
        value: "string",
        desc: <form className="flex flex-col gap-y-3" onSubmit={handleStringRequest}>
                <Input label="A Random String" id="string"/>
                <Button type="submit" variant="outlined" className="w-max-140 mx-auto">Send Request</Button>
            </form>,
      },
      {
        label: "Auth Request",
        value: "auth",
        desc: <Button onClick={handleAuthRequest} variant="outlined" className="w-max-140 mx-auto">Send Request</Button>,
      }
    ];
   
    return (
      <div className="h-[100vh] flex justify-center items-center">
          <Card className="w-96">
            <CardBody className="text-center">
            <Tabs value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
            {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
            </CardBody>
        </Card>
      </div>
    );
  }