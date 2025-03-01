"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { toast } from "react-hot-toast";

interface JobFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
  skillsRequired: string[];
}

const categories = ["Software", "Marketing", "Design", "Finance"];
const locations = ["Remote", "On-site", "Hybrid"];

export default function JobPostForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      salary: 0,
      skillsRequired: [],
    },
  });

  const [skills, setSkills] = useState<string[]>([]);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      setSkills([...skills, e.currentTarget.value.trim()]);
      setValue("skillsRequired", [...skills, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    setValue("skillsRequired", updatedSkills);
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      const response = await axios.post("/api/jobs", data);
      toast.success("Job posted successfully!");
      router.push("/jobs");
    } catch (error) {
      toast.error("Failed to post job!");
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <Input {...register("title", { required: "Title is required" })} placeholder="Enter job title" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Job Description</label>
          <Textarea {...register("description", { required: "Description is required" })} placeholder="Enter job description" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select {...field}>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <Select {...field}>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Salary</label>
          <Input type="number" {...register("salary", { required: "Salary is required", min: 1 })} placeholder="Enter salary amount" />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Skills Required</label>
          <Input type="text" placeholder="Press Enter to add skill" onKeyDown={handleAddSkill} />
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                {skill} <button type="button" onClick={() => handleRemoveSkill(skill)}>×</button>
              </span>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Job"}
        </Button>
      </form>
    </div>
  );
}
