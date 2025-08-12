import './App.css'
import SkillBlock from "./Components/SkillBlock.tsx";
import {useRef} from "react";
import Marquee from "react-fast-marquee";

function App() {
  const projects = {
    "Cloud & DevOps": [
      {
        title: "Automated Monitoring Solution",
        description: "Built comprehensive monitoring system providing real-time alerting for deployed products and services. The solution includes customizable dashboards, notification rules and detailed performance analytics.",
        image: "/images/0_0.webp"
      },
      {
        title: "AWS Cost Management",
        description: "Developed intelligent cost prediction and tracking platform for AWS infrastructure spending. Implemented automated cost optimization recommendations and budget alerts to reduce cloud expenses.",
        image: "/images/0_1.webp"
      },
      {
        title: "Docker Deployment Automation",
        description: "Created automated Docker-based deployment pipeline enabling continuous delivery of containerized applications. The system handles container orchestration, scaling and includes automated testing and rollback capabilities.",
        image: "/images/0_2.webp"
      },
      {
        title: "AWS API Integration Platform",
        description: "Built extensible AWS API integration platform supporting multiple managed service solutions and third-party integrations. Implemented secure authentication, rate limiting and detailed API analytics tracking.",
        image: "/images/0_3.webp"
      }
    ],
    "Development": [
      {
        title: "Full Scale API Integration Platform",
        description: "Developed comprehensive integration platform managing 50+ diverse APIs with automated documentation and monitoring. Implemented robust error handling, rate limiting, and real-time analytics tracking for all API endpoints.",
        image: "/images/1_0.webp"
      },
      {
        title: "ODATA API Interface System",
        description: "Built scalable ODATA API interface system enabling standardized data access and manipulation across multiple enterprise systems. Implemented advanced query capabilities, batch processing and full metadata support with automated interface generation.",
        image: "/images/1_1.webp"
      },
      {
        title: "Centralized Product Dashboard",
        description: "Created unified web dashboard for centralized management and monitoring of multiple product environments. Implemented real-time metrics, customizable widgets and role-based access control with seamless product integration capabilities.",
        image: "/images/1_2.webp"
      },
      {
        title: "Standardized Database Platform",
        description: "Created a unified database system that combines data from multiple sources into a single format. Added automated data importing, validation checks and optimized queries for fast data access and reporting.",
        image: "/images/1_3.webp"
      }
    ],
    "Cyber Security": [
      {
        title: "Centralized Elasticsearch Environment",
        description: "Created a centralized Elasticsearch system for tracking and analyzing multiple custom data points across applications. Implemented automated data ingestion, real-time monitoring and customizable dashboards for data visualization.",
        image: "/images/2_0.webp"
      },
      {
        title: "Secure Server Management",
        description: "Managed and maintained security for 25+ Linux-based production servers through automated patching and security hardening. Implemented proactive monitoring, intrusion detection and automated security compliance checking.",
        image: "/images/2_1.webp"
      },
      {
        title: "User-Level Data Encryption",
        description: "Designed and implemented user-level encryption system to secure sensitive data across application layers. Created key management infrastructure and encryption protocols while maintaining application performance and usability.",
        image: "/images/2_2.webp"
      },
      {
        title: "Security Code Reviews",
        description: "Provided expert security consultation and comprehensive code reviews to identify vulnerabilities and security gaps. Delivered detailed reports with remediation steps and helped implement security best practices across development teams.",
        image: "/images/2_3.webp"
      }
    ],
  };

  let imageList: string[] = Object.values(projects).flatMap(category =>
    category.map(project => project.image)
  );

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollToCategory = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start" // important for horizontal scroll
    })
  }

  const skills = {
    "Cloud & DevOps": {
      title: "Cloud & DevOps",
      description: "AWS cloud infrastructure design and automated deployment pipelines to deliver reliable, scalable solutions with comprehensive monitoring and cost optimization.",
      skills: ["AWS Architecture", "Server Management", "CI/CD Pipelines", "System Monitoring"]
    },
    "Development": {
      title: "Development",
      description: "Full-stack development expertise in building scalable applications, API integrations, and database solutions with modern technologies and best practices.",
      skills: ["PHP / Laravel", "TypeScript / JavaScript", "API development", "Database Design"]
    },
    "Cyber Security": {
      title: "Cyber Security",
      description: "Comprehensive security solutions including application hardening, code review, encryption systems and infrastructure security with industry standard compliance.",
      skills: ["Application Security", "Secure Code Review", "API Security", "OWASP Best Practices"]
      }
  }

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
          <div className="flex justify-center gap-12 text-lg">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Full-Stack Development</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Cloud Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Security Solutions</span>
            </div>
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
              <div className="flex overflow-x-auto snap-x py-4">
                {Object.entries(projects).map(([category, categoryProjects]) => (
                  <div key={category} className="flex-none w-full px-4"
                       ref={(el) => {
                         categoryRefs.current[category] = el;
                       }}>
                    <h3 className="text-2xl font-bold text-primary-dark mb-4 font-title">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {categoryProjects.map((project, index) => (
                        <div key={index}
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
                ))}
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-1 mx-25 bg-gradient-to-r from-white via-primary to-white"></div>
        </section>
      </div>
      <section className="container mx-auto px-4 py-16 b relative">
        <h2 className="max-w-100 mx-auto text-4xl font-bold text-primary-dark text-center font-title mb-12">Building Secure, Scalable
          Solutions for Clients Needs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.values(skills).flatMap(category =>
            category.skills.map((skill, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all">
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
          <p>&copy; {new Date().getFullYear()} Ian Cyber Security & Software B.V. - All rights reserved.</p>
        </div>
      </section>
    </>
  )
}

export default App