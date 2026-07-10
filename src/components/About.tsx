// About Component
"use client";

import Image from "next/image";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useSound } from "../hooks/useSound";

interface Btn {
    name: string; desc: string; link: string; icon: IconDefinition;
}

export default function About() {
    const clickSnd = useSound("click");

    const buttons: Btn[] = [
        { name: "Resume", desc: "Get CV in pdf", link: "/data/curriculum.pdf", icon: faBook },
        { name: "Linkedin", desc: "Linkedin accout of Aryel", link: "https://linkedin.com/in/aryelsoares", icon: faLinkedin },
        { name: "GitHub", desc: "GitHub account of Aryel", link: "https://github.com/aryelsoares", icon: faGithub },
    ];

    return (
        <section id="about" className="flex flex-col-reverse lg:flex-row px-[12.5%] py-[5%] lg:py-[8%] justify-between items-center gap-12">
            {/* Text */}
            <div className="flex-1">
                <p className="text-[1.4rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.4rem] text-center lg:text-left font-bold text-[#ddffff]">👋 Hi! My name is</p>
                <h1 className="text-[3.6rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.6rem] text-center lg:text-left font-bold leading-[1.4] text-[#aaffff]">Aryel Soares</h1>
                <h2 className="text-[1.4rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.4rem] text-center lg:text-left font-bold mb-8 text-[#eeffff]">💼 Backend Developer | <span className="text-[#ddffff]">Freelancer</span></h2>

                <p className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.6rem] my-4">
                    I am a backend-oriented programmer focused on designing and implementing solutions
                    that address real business constraints such as performance, scalability, and data
                    reliability.
                </p>

                <p className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.6rem] my-4">
                    I hold a degree in Applied Mathematics and work at the intersection of software
                    engineering and data analysis, developing custom systems for automation, analytics,
                    and intelligent decision support.
                </p>

                <p className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.6rem] my-4">
                    I work mainly with backend systems, taking ownership of core application logic
                    and infrastructure, while also handling frontend integration when needed. I actively
                    assist in incorporating AI solutions into products to streamline workflows and
                    increase overall productivity.
                </p>

                <div className="flex justify-center lg:justify-start gap-4 md:gap-10 lg:gap-12 mt-12">
                    {buttons.map(({ name, desc, link, icon }) => (
                        <a
                            href={link}
                            key={name}
                            title={desc}
                            className="inline-flex items-center text-[1.2rem] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.6rem] px-8 md:px-[2.8rem] py-4 rounded-[4rem] bg-bg-third text-text font-semibold tracking-wide transition duration-500 hover:shadow-[0_0_2.5rem_#444546] hover:text-main"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={clickSnd}
                        >
                            <FontAwesomeIcon icon={icon} className="mr-2" aria-hidden="true" /> {name}
                        </a>
                    ))}
                </div>
            </div>
            {/* Image */}
            <div className="flex-1 flex justify-center">
                <Image
                    src="/images/About.png"
                    alt="Aryel"
                    className="border-[.2rem] border-solid border-bg-third rounded-[10%] w-80 md:w-160 lg:min-w-lg lg:w-200 h-auto"
                    width="500"
                    height="500"
                    priority
                />
            </div>
        </section>
    );
}