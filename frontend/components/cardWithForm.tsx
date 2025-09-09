import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner" // ✅ Correct Sonner import

export function CardWithForm() {
  const [projectName, setProjectName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
      // First, check if project with same name exists
      const checkResponse = await fetch(`${apiUrl}/api/projects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!checkResponse.ok) {
        throw new Error("Failed to check existing projects");
      }

      const existingProjects = await checkResponse.json();
      const projectExists = existingProjects.some(
        (project: { name: string }) => 
          project.name.toLowerCase() === projectName.toLowerCase()
      );

      if (projectExists) {
        toast.error("A project with this name already exists");
        setIsSubmitting(false);
        return;
      }

      // If no duplicate found, create the project
      const response = await fetch(`${apiUrl}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: projectName }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Project created successfully!")
        setProjectName("")
      } else {
        toast.error(data.error || "Something went wrong")
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Network error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4 p-0">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Deploying..." : "Deploy"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
