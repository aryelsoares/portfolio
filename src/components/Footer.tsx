// Footer Component
"use client"

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useSound } from "../hooks/useSound";

interface Btn {
    name: string, desc: string; link: string; icon: IconDefinition;
}

export default function Footer() {
    const clickSnd = useSound("click");
    const currentYear = new Date().getFullYear();

    const buttons: Btn[] = [
        { name: "Linkedin", desc: "Linkedin account of Aryel", link: "https://linkedin.com/in/aryelsoares", icon: faLinkedin },
        { name: "GitHub", desc: "GitHub account of Aryel", link: "https://github.com/aryelsoares", icon: faGithub }
    ];

    return (
        <footer className="px-[9%] py-8 bg-bg-second text-[1.6rem]">
            <div className="flex items-center justify-between gap-6">
                {/* Left */}
                <p>Copyright &copy; {currentYear} by Aryel | MIT License.</p>
                {/* Right */}
                <div className="flex items-center gap-12">
                    {buttons.map(({ name, desc, link, icon }, index) => (
                        <a
                            key={name}
                            href={link}
                            title={desc}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={clickSnd}
                            className={`
                                relative
                                flex items-center justify-center
                                w-18 h-18
                                rounded-full
                                bg-bg-third
                                text-text
                                transition-all duration-300
                                hover:text-main
                                hover:shadow-[0_0_1.5rem_#444546]
                                ${index !== buttons.length - 1 ? "after:content-[''] after:absolute after:right-[-1.5rem] after:top-1/2 after:-translate-y-1/2 after:h-10 after:w-px after:bg-bg-third" : ""}
                            `}
                        >
                            <FontAwesomeIcon icon={icon} size="lg" aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}