// Skills Component
"use client";

import { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import skillsData from "../../public/data/skills.json";
import ShowChart from "../components/Chart";
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
    const lastTextRef = useRef<string>("");

    const infoRef = useRef<HTMLSpanElement>(null);
    const [canShowDescription, setCanShowDescription] = useState(false);
    const [activeSkill, setActiveSkill] = useState<string | null>(null);

    function animateText(text: string): void {
        if (!infoRef.current) return;
        if (text === lastTextRef.current) return;

        typedRef.current?.destroy();
        typedRef.current = new Typed(infoRef.current, {
            strings: [text],
            typeSpeed: 5,
            contentType: 'html',
        });
        lastTextRef.current = text;
    }

    function formatIconMessage({ title, subtitle, description }: IconMessage): string {
        return `
            <span style="text-align: center; font-size: 1.8rem; color: #aaffff;"><p>${title}</p></span><br>
            <span style="text-align: center; font-size: 1.6rem; color: #ddffff;"><p>${subtitle}</p></span><br>
            ${description}
        `;
    }

    useEffect(() => {
        if (!activeSkill) {
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
        }
    }, [activeSkill, canShowDescription]);

    useEffect(() => {
        const handleClick = () => setCanShowDescription(true);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
            typedRef.current?.destroy();
        }; 
    }, []);

    return (
        <section
            id="skills"
            className="grid grid-cols-1 lg:grid-cols-2 max-w-400 mx-auto gap-12 lg:gap-42 py-[1%] lg:py-[6.5%] mb-20"
        >
            {/* First Column */}
            <div className="flex flex-col items-center">
                {/* Head */}
                <h2 className="text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] mb-5 lg:mb-20 text-[#bbffff]">Technical Skills</h2>
                {/* Skills Data */}
                <div className="flex flex-col gap-4 lg:gap-12">
                    {skillsData.map(({ category, skills }: SkillInfo) => (
                        <div key={category} className="flex items-center gap-4 sm:gap-8">
                            {/* Category */}
                            <h3 className="w-48 text-end text-[1.6rem] sm:text-[2.4rem] font-bold text-[#ddffff]">{category}</h3>
                            {/* Skill Icons */}
                            <div className="flex flex-wrap w-max p-2 sm:p-4 bg-[#212121] border border-bg-third rounded-[.8rem] justify-center">
                                {skills.map(({ label, title, subtitle, description }: IconData) => (
                                    <img
                                        key={label}
                                        className={`mx-1 sm:mx-4 w-10 sm:w-15 lg:w-20 h-auto transition-transform duration-300 ease-in-out hover:animate-swing
                                                    ${activeSkill === label ? "animate-swing" : "hover:animate-swing"}`}
                                        src={`/images/icons/${label}.svg`}
                                        title={title}
                                        alt={label}
                                        onMouseOver={() => {
                                            if (canShowDescription) {
                                                if (activeSkill !== label) iconSnd();
                                                animateText(formatIconMessage({ title, subtitle, description }));
                                                setActiveSkill(label);
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
                <div className="w-180 justify-center hidden lg:flex">
                    <ShowChart />
                </div>

                {/* Skill Box */}
                <div
                    id="info"
                    className="w-140 sm:w-180 h-124 sm:h-128 px-4 py-4 text-[1.4rem] sm:text-[1.6rem] bg-bg-second border border-bg-third rounded-[.8rem]"
                >
                    <span ref={infoRef} id="info-typed" />
                </div>
            </div>
        </section>
    );
}