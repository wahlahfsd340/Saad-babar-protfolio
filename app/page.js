import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Projects, About, Contact } from "../components/Sections";
import { Progress, Glow } from "../components/Ui";
import { profile } from "../components/data";

export default function Page() {
  return (
    <>
      <Progress /><Glow /><Navbar />
      <main><Hero /><Projects /><About /><Contact /></main>
      <footer><div className="wrap">&copy; {new Date().getFullYear()} {profile.handle}. All rights reserved.</div></footer>
    </>
  );
}
