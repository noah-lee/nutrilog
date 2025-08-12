import Input from "@/app/_components/Input";
import LogList from "@/app/_components/LogList";
import SummaryCard from "@/app/_components/SummaryCard";

const App = () => {
  return (
    <div className="min-h-svh max-w-vw flex flex-col antialiased">
      <header className="container h-8"></header>
      <main className="container flex-1 flex flex-col items-center gap-4">
        <div className="w-full flex gap-4 flex-wrap">
          <SummaryCard />
          <Input />
        </div>
        <LogList />
      </main>
      <footer className="container h-8"></footer>
    </div>
  );
};

export default App;
