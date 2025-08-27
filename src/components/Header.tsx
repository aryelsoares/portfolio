// Header Component
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWrench, faBriefcase, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useSound } from "../hooks/useSound";

interface Nav {
    id: string; label: string; icon: IconDefinition;
}

export default function Header() {
    const hoverSnd = useSound("hover");

    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>("section");

        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);

            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    const id = section.getAttribute("id");
                    if (id) current = id;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems: Nav[] = [
        { id: "about", label: "About", icon: faUser },
        { id: "skills", label: "Skills", icon: faWrench },
        { id: "projects", label: "Projects", icon: faBriefcase },
        { id: "contact", label: "Contact", icon: faEnvelope },
    ];

    return (
        <header
            className={`sticky top-0 py-8 px-[9%] flex justify-between items-center bg-bg-second transition-all duration-300 border-b z-100 site-header ${
                isSticky ? "border-[#444546]" : "border-transparent"
            }`}
        >
            <a href="#" className="flex items-center gap-2 text-[2.5rem] text-text">
                <Image src="/logo.png" alt="Logo" width={25} height={25} />
                Aryel&apos;s Portfolio
            </a>
            <nav>
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`text-[1.7rem] ml-16 transition-colors duration-300 hover:text-main ${
                            activeSection === item.id ? "text-main" : "text-text"
                        }`}
                        onClick={hoverSnd}
                    >
                        <FontAwesomeIcon icon={item.icon} className="mr-2" aria-hidden="true" /> {item.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}