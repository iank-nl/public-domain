import './App.css'
import SkillBlock from "./Components/SkillBlock.tsx";
import {useRef, useEffect, useState} from "react";
import Marquee from "react-fast-marquee";
import skills from "./skills.json";
import SkillProjectsBlock from "./Components/SkillProjectsBlock.tsx";

function App() {
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const projectScrollRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState<string>("Automated Monitoring Solution");
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const allProjects = Object.values(skills).flatMap(category => category.projects);
    const projectsPerPage = Math.floor(scrollPosition / 2);
    console.log(projectsPerPage);
    if (allProjects[projectsPerPage]) {
      setActiveProject(allProjects[projectsPerPage].title);
    }
  }, [scrollPosition]);

  const scrollToCategory = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start" // important for horizontal scroll
    })
  }

  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollToProject = (project: string) => {
    let index = 0;
    let i = 0;
    for (const [, value] of Object.entries(skills)) {
      for (const [, value2] of Object.entries(value.projects)) {
        if (value2.title === project)
          index = i;
        i++;
      }
    }
    const allProjects = Object.values(skills).flatMap(category => category.projects);
    if (projectScrollRef.current) {
      const scrollWidth = projectScrollRef.current.scrollWidth;
      const containerWidth = projectScrollRef.current.clientWidth;
      const maxScroll = scrollWidth - containerWidth;
      const scrollPercentage = (index / (allProjects.length - 1));
      console.log(projectScrollRef.current);
      projectScrollRef.current.scrollTo({
        left: maxScroll * scrollPercentage,
        behavior: 'smooth'
      });
    }
  }

  let imageList: string[] = Object.values(skills).flatMap(category =>
    category.projects.map(project => project.image)
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-primary-dark backdrop-blur-sm shadow-md z-50 text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <span className=" font-title text-4xl">ICSS</span>
          <a href="mailto:hello@iank.nl" className="hover:text-primary-light transition-colors">
            hello@iank.nl
          </a>
        </div>
      </div>

      <header className="bg-gradient-to-r from-primary-dark to-primary text-white pt-24 pb-5 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in-down font-title mt-4">ICSS - Software and Security</h1>
          <p className="text-3xl font-light mb-12">Develop. Secure. Deliver.</p>
          <div className="justify-center gap-12 text-lg grid md:grid-cols-3">
            {["Full-Stack Development", "Cloud Infrastructure", "Security Solutions"].map((ability) => (
              <div className="flex justify-center items-center gap-2" key={ability}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{ability}</span>
              </div>))}
          </div>
        </div>
        <Marquee className="mt-16 p-1 bg-gray-900/25" direction="right">
          <div className="flex gap-0">
            {imageList.map((image, index) => (
              <img key={index} src={image} alt="" className="h-32 w-auto object-contain grayscale ml-16" />
            ))}
          </div>
        </Marquee>
      </header>
      <div
        className="absolute left-0 right-0 h-50 mx-0 bg-gradient-to-b from-primary/25 to-white"></div>

      <div className="w-full bg-gradient-to-b from-white to-gray-50">
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b relative">
          <h2 className="text-4xl font-bold mb-8 text-primary-dark text-center font-title">Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, data]) => (
              <SkillBlock
                key={category}
                title={data.title}
                onClick={() => scrollToCategory(category)}
                description={data.description}
                skills={data.skills}
              />
            ))}
          </div>

          <div className="mt-24 overflow-hidden">
            <h2 className="text-4xl font-bold mb-8 text-primary-dark text-center"></h2>
            <div className="flex flex-col gap-8">
              <div className="flex overflow-x-auto snap-x py-4" ref={(el) => {
                projectScrollRef.current = el;
              }} onScroll={(e) => {
                let pos = Math.floor(e.currentTarget.scrollLeft / 100);
                if (pos !== scrollPosition)
                  setScrollPosition(pos);
              }}>
                {Object.entries(skills).map(([category, set]) => (
                  <SkillProjectsBlock category={category} setCategoryRef={(el) => {
                    categoryRefs.current[category] = el;
                  }} setProjectRef={(el, project) => {
                    projectRefs.current[project] = el
                  }} projects={set.projects} key={category} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {Object.entries(skills).map(([category, set]) => (<div key={category}>
              {set.projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => scrollToProject(project.title)}
                  className={`w-2 h-2 rounded-full bg-primary-dark transition-opacity mx-1 cursor-pointer ${
                    activeProject === project.title ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                  }`}
                  aria-label={`Navigate to ${project.title}`}
                />
              ))}
            </div>))}
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-1 mx-25 bg-gradient-to-r from-white via-primary to-white"></div>
        </section>
      </div>
      <section className="container mx-auto px-4 py-16 b relative">
        <h2 className="max-w-100 mx-auto text-4xl font-bold text-primary-dark text-center font-title mb-12">Developing
          secure solutions and delivering exceptional results for your business</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.values(skills).flatMap(category =>
            category.skills.map((skill) => (
              <div key={skill} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all">
                <p className="text-2xl font-medium text-center text-black font-title">{skill}</p>
              </div>
            ))
          )}
        </div>
      </section>


      <section className="bg-gradient-to-b from-gray-100 to-gray-200 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <p className="text-xl mb-4">For inquiries about services:</p>
            <a href="mailto:hello@iank.nl"
               className="text-2xl font-semibold text-primary-dark hover:text-primary transition-colors duration-300 font-title">
              hello@iank.nl
            </a>
            <p className="mt-6 text-gray-600 max-w-2xl">
              Whether you're looking to discuss a potential project, need technical consultation, or have questions
              about services, ICSS is here to help. Expect a response within 1-2 business days.
            </p>
          </div>
        </div>
        <div className="mt-16 ml-16 text-left text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ian Cyber Security & Software - All rights reserved.</p>
        </div>
      </section>
    </>
  )
}

export default App