import type {MouseEventHandler} from "react";

interface SkillBlockProps {
  title: string;
  description: string;
  skills: string[];
  onClick: MouseEventHandler;
}

export default function SkillBlock ({title, description, skills, onClick}: SkillBlockProps) {
  return (
    <>
      <div onClick={onClick}
           className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
        <h3 className="text-2xl font-bold mb-4 text-primary-dark font-title text-center">{title}</h3>
        <p className="mb-4 text-center text-gray-600 text-lg">{description}</p>

        <ul className="space-y-3 hidden">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};