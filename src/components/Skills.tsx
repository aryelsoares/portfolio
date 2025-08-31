// Skills Component
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Typed from "typed.js";
import skillsData from "../../public/data/skills.json";
import { useSound } from "../hooks/useSound";

interface IconMessage {
    title: string; subtitle: string; description: string;
}

interface IconData {
    label: string; title: string; subtitle: string; description: string;
}

interface SkillInfo {
    category: string; skills: IconData[];
}

export default function Skills() {
    const iconSnd = useSound("icon");
    
    const typedRef = useRef<Typed | null>(null);
    let lastText = "";

    const infoRef = useRef<HTMLSpanElement>(null);

    function animateText(text: string): void {
        if (!infoRef.current) return;

        if (text === lastText) return;

        if (typedRef.current) {
            typedRef.current.destroy();
            typedRef.current = null;
        }

        typedRef.current = new Typed(infoRef.current, {
            strings: [text],
            typeSpeed: 5,
            contentType: 'html',
        });
        lastText = text;
    }

    function formatIconMessage({ title, subtitle, description }: IconMessage) {
        return `
            <span style="text-align: center; font-size: 1.8rem; color: #aaffff;"><p>${title}</p></span><br>
            <span style="text-align: center; font-size: 1.6rem; color: #ddffff;"><p>${subtitle}</p></span><br>
            ${description}
        `;
    }

    const [canShowDescription, setCanShowDescription] = useState(false);

    useEffect(() => {
        if (!canShowDescription) {
            animateText(formatIconMessage({
                title: "⚙️ Skill Descriptions ⚙️",
                subtitle: "💡 Interact with the page to enable it!",
                description: "",
            }));
        } else {
            animateText(formatIconMessage({
                title: "⚙️ Skill Descriptions ⚙️",
                subtitle: "✅ Interaction enabled!",
                description: "Move cursor around icons to get quick information about the use of these technologies in my projects.",
            }));
        }

        const handleClick = () => {
            setCanShowDescription(true);
        }

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
            typedRef.current?.destroy();
        };
    });

    return (
        <section
            id="skills"
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-[20rem] max-w-7xl mx-auto py-[1%] lg:py-[7.5%] mb-20"
        >
            {/* First Column */}
            <div className="flex flex-col items-center">
                {/* Head */}
                <h2 className="text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] mb-5 lg:mb-20 text-[#bbffff]">Technical Skills</h2>
                {/* Skills Data */}
                <div className="flex flex-col gap-4 lg:gap-12">
                    {skillsData.map(({ category, skills }: SkillInfo) => (
                        <div key={category} className="flex items-center gap-8">
                            {/* Category */}
                            <h3 className="w-48 text-end text-[2.4rem] font-bold text-[#ddffff]">{category}</h3>
                            {/* Skill Icons */}
                            <div className="flex flex-wrap w-max p-4 bg-bg border border-bg-third rounded-[.8rem] justify-center">
                                {skills.map(({ label, title, subtitle, description }: IconData) => (
                                    <Image
                                        key={label}
                                        className="mx-4 w-[40px] lg:w-[50px] h-auto transition-transform duration-300 ease-in-out hover:animate-swing"
                                        src={`/images/icons/${label}.svg`}
                                        title={title}
                                        alt={label}
                                        width="50"
                                        height="50"
                                        onMouseOver={() => {
                                            if (canShowDescription) {
                                                animateText(formatIconMessage({ title, subtitle, description }));
                                                iconSnd();
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Second Column */}
            <div className="self-center flex flex-col items-center gap-8">
                {/* Stats */}
                <div className="w-[45rem] flex justify-center">
                    {/* eslint-disable @next/next/no-img-element */}
                    <img
                        src="https://github-readme-stats.vercel.app/api/top-langs?username=aryelsoares&layout=compact&langs_count=16&theme=dark&hide=jupyter%20notebook,tex"
                        title="Language usage statistics"
                        className="hidden lg:flex"
                        alt="Concepts"
                        width="280"
                        height="280"
                    />
                </div>
                {/* Skill Box */}
                <div
                    id="info"
                    className="w-[45rem] h-128 px-4 py-4 text-[1.6rem] bg-bg-second border border-bg-third rounded-[.8rem]"
                >
                    <span ref={infoRef} id="info-typed" />
                </div>
            </div>
        </section>
    );
}