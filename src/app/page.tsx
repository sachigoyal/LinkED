"use client"
import { ModeToggle } from "@/components/ModeToogle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("")

  const handleSubmit = async () => {
    const response = await fetch("/api/shorten",  {
      method: "POST",
      body: JSON.stringify({ originalUrl: url }),
    }) 
    const data = await response.json()
    console.log(data)
  }
  return (
    <div className="w-full max-w-3xl mx-auto ">
      <div className="flex justify-between mt-12">
        <h1 className="text-2xl font-bold font-heading ">LinkED🔗</h1>
        <ModeToggle />
      </div>
      <div>
      <Input type="text" placeholder="enter url" onChange={e => setUrl(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
