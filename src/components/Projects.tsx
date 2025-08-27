// Projects Component
"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useSound } from "../hooks/useSound";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import projectsData from "../../public/data/projects.json";

interface ProjectInfo {
    title: string; description: string; info: string[]; skills: string[];
}

export default function Projects() {
    const swipeSnd = useSound("swipe");

    return (
        <section id="projects" className="text-center py-20">
            {/* Header */}
            <h2 className="text-[3.6rem] mb-16 text-[#bbffff]">Latest Projects</h2>
            {/* Swiper */}
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                onSlideChange={swipeSnd}
                className="max-w-6xl mx-auto bg-bg border border-bg-third rounded-[.8rem]"
            >
                {projectsData.map(({ title, description, info, skills }: ProjectInfo) => (
                    <SwiperSlide key={title} className="group">
                        <div className="relative w-full h-[55rem] flex justify-center items-center">
                            {/* Project Image */}
                            <Image
                                src={`/images/projects/${title}.png`}
                                alt={title}
                                className="object-cover rounded-lg"
                                sizes="100vw"
                                fill
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5),#444546)] border border-bg-third rounded-lg flex flex-col justify-center items-center text-center px-16 py-0 translate-y-full transition-transform duration-1000 ease-in-out group-[.swiper-slide-active]:translate-y-0 will-change-transform">
                                {/* Title */}
                                <a
                                    className="text-[3rem] text-[#ccffff] transition duration-300 hover:text-main"
                                    href={`https://github.com/aryelsoares/${title}`}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={faExternalLink} className="mr-2" /> {title}
                                </a>
                                {/* Description */}
                                <p className="text-start text-[1.6rem] my-4">{description}</p>
                                {/* List */}
                                <ul className="list-disc list-inside text-start text-[1.6rem] mb-8">
                                    {info.map((list, i) => (
                                        <li key={i}>{list}</li>
                                    ))}
                                </ul>
                                {/* Skills */}
                                <div>
                                    {skills.map((skill, index) => (
                                        <Image
                                            key={`${skill}-${index}`}
                                            className="m-2 inline-block"
                                            src={`/images/icons/${skill}.svg`}
                                            title={skill}
                                            alt={skill}
                                            width={50}
                                            height={50}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* GitHub Button */}
            <a
                href="https://github.com/aryelsoares?tab=repositories"
                className="inline-block text-[1.6rem] px-[2.8rem] py-[1rem] mt-20 mb-8 rounded-[4rem] bg-bg-third text-text font-semibold tracking-wide transition duration-500 hover:shadow-[0_0_2.5rem_#444546] hover:text-main"
                title="Check all projects in GitHub"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faGithub} className="mr-4" aria-hidden="true" />GitHub Repository
            </a>
        </section>
    );
}