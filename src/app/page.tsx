import JobList from "@/components/Jobs/JobList";
import JobForm from "@/components/Jobs/JobsForm";

export default function Home() {
  return (
    <div>
      <main className="p-6">
        <JobForm />
        <JobList />
      </main>
    </div>
  );
}
