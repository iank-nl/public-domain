import {type Ref} from "react";

interface SkillProjectsBlockProps {
  category: string;
  setCategoryRef: Ref<HTMLDivElement>;
  setProjectRef: (el: HTMLDivElement|null, project: string) => void;
  projects: {
    title: string;
    description: string;
    image: string;
  }[];
}

export default function SkillProjectsBlock ({category, setCategoryRef, setProjectRef, projects}: SkillProjectsBlockProps) {
  return (
    <>
      <div key={category} className="flex-none w-full px-4"
           ref={setCategoryRef}>
        <h3 className="text-2xl font-bold text-primary-dark mb-4 font-title">{category}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <div key={index}
                 ref={(el) => {
                   setProjectRef(el, project.title)
                 }}
                 className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img src={project.image} alt={project.title} className="w-auto h-32 object-contain mx-auto" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-primary-dark mb-2 font-title">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};