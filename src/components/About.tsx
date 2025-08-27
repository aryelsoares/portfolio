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
    const buttons: Btn[] = [
        { name: "Resume", desc: "Download CV in pdf", link: "/data/curriculum.pdf", icon: faBook },
        { name: "Linkedin", desc: "Linkedin accout of Aryel", link: "https://linkedin.com/in/aryelsoares", icon: faLinkedin },
        { name: "GitHub", desc: "GitHub account of Aryel", link: "https://github.com/aryelsoares", icon: faGithub },
    ];

    const clickSnd = useSound("click");

    return (
        <section id="about" className="flex px-[10%] py-[10%] justify-between items-center gap-12">
            {/* Text */}
            <div className="flex-1">
                <h3 className="text-[3.2rem] font-bold text-[#ddffff]">👋 Hi! My name is</h3>
                <h1 className="text-[5.6rem] font-bold leading-[1.3] text-[#aaffff]">Aryel Soares</h1>
                <h3 className="text-[3.2rem] font-bold mb-8 text-[#eeffff]">💼 Backend Developer | Freelancer</h3>

                <p className="text-[1.6rem] mb-3">
                    🧠 I am a backend-focused programmer dedicated to solving business problems.
                </p>

                <p className="text-[1.6rem] mb-3">
                    🎓 Graduated in applied mathematics, 🛠️ I specialize in building tailored solutions for a
                    wide range of business challenges, combining 📊 data-driven thinking with 🧩 flexible
                    problem-solving across domains like 🔄 automation, 📈 analytics, and 🤖 AI.
                </p>

                <p className="text-[1.6rem] mb-3">
                    💻 With a strong background in backend development, I adapt quickly to diverse challenges
                    across different industries, always aiming to deliver ⚡ efficient, 📐 scalable, and 🎯
                    impactful solutions.
                </p>

                <div className="flex gap-12 mt-12">
                    {buttons.map(({ name, desc, link, icon }) => (
                        <a
                            href={link}
                            key={name}
                            title={desc}
                            className="inline-block text-[1.6rem] px-[2.8rem] py-4 rounded-[4rem] bg-bg-third text-text font-semibold tracking-wide transition duration-500 hover:shadow-[0_0_2.5rem_#444546] hover:text-main"
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
            <div className="flex-1 flex justify-content">
                <Image
                    src="/images/About.png"
                    alt="Aryel"
                    className="border-[.2rem] border-solid border-bg-third rounded-[10%] ml-20 mr-180"
                    width="400"
                    height="400"
                />
            </div>
        </section>
    );
}