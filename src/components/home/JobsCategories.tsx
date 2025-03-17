import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "./JobCard";

const JobsCategories = () => {
  return (
    <Tabs defaultValue="account" className="w-fit">
      <TabsList className="grid w-full grid-cols-3 items-center justify-center py-10 gap-8">
        <TabsTrigger
          value="popular_company"
          className="border px-5 py-3 rounded-full data-[state=active]:bg-primary001 data-[state=active]:text-white"
        >
          Popular Company
        </TabsTrigger>
        <TabsTrigger
          value="recomended_jobs"
          className="border px-5 py-3 rounded-full data-[state=active]:bg-primary001 data-[state=active]:text-white"
        >
          Recomended Jobs
        </TabsTrigger>
        <TabsTrigger
          value="new_jobs"
          className="border px-5 py-3 rounded-full data-[state=active]:bg-primary001 data-[state=active]:text-white"
        >
          New Jobs
        </TabsTrigger>
      </TabsList>

      <TabsContent value="popular_company" className="pt-10">
        <div className="grid grid-cols-3 gap-5">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </TabsContent>
      <TabsContent value="recomended_jobs"></TabsContent>
      <TabsContent value="new_jobs"></TabsContent>
    </Tabs>
  );
};

export default JobsCategories;
