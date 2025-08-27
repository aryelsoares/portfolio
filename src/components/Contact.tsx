// Contact Component
"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ClientOnly } from "@/components/ClientOnly";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEraser } from "@fortawesome/free-solid-svg-icons";
import { useSound } from "../hooks/useSound";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import "react-quill-new/dist/quill.snow.css";

export default function Contact() {
    const sentSnd = useSound("sent");
    const errorSnd = useSound("error");
    const hoverSnd = useSound("hover");
    const eraseSnd = useSound("erase");

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", { color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
            ],
        }),
        []
    );

    const formats = useMemo(
        () => ["size", "bold", "italic", "color", "background", "list", "link"],
        []
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleReset = () => {
        setName(""); setEmail(""); setSubject(""); setMessage("");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);

        // validate message size
        if (message.length < 30 || message.length > 10e3) {
            errorSnd();
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Message size must be between 30-1000 characters",
                scrollbarPadding: false,
            });
            setIsSending(false);
            return;
        }

        // try send message
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await res.json();

            // return treatment
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Something went wrong while sending the email.");
            }

            // success
            sentSnd();
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Message sent successfully!",
                scrollbarPadding: false,
            });
            handleReset();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            errorSnd();
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Something went wrong!",
                scrollbarPadding: false,
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact">
            <div className="flex flex-col items-center">
                <h2 className="text-[3.8rem] mt-20 mb-12 text-center text-[#bbffff]">Contact Form</h2>

                <form className="max-w-[70rem] mx-auto my-4 text-center mb-12" action="#" autoComplete="off" onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="flex justify-between flex-wrap">
                        <input className="w-[49%] p-[1.5rem] text-[1.6rem] bg-bg-second mx-0 my-[.7rem] border-[.1rem] border-solid border-bg-third rounded-[.8rem]"
                        type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} minLength={5} maxLength={30} required />
                        <input className="w-[49%] p-[1.5rem] text-[1.6rem] bg-bg-second mx-0 my-[.7rem] border-[.1rem] border-solid border-bg-third rounded-[.8rem]"
                        type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} minLength={5} maxLength={30} required />
                    </div>
                    <div>
                        <input className="w-[100%] p-[1.5rem] text-[1.6rem] bg-bg-second mx-0 my-[.7rem] mb-12 border-[.1rem] border-solid border-bg-third rounded-[.8rem]"
                        type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} minLength={5} maxLength={60} required />
                    </div>
                    <div className="my-4 text-left">
                        <ClientOnly>
                            <ReactQuill
                                theme="snow"
                                value={message}
                                onChange={setMessage}
                                modules={modules}
                                formats={formats}
                                placeholder="Write your message here..."
                                className="my-quill"
                            />
                        </ClientOnly>
                    </div>
                    <div className="flex justify-center gap-12 mb-20">
                        <button className="inline-block text-[1.6rem] px-[2.8rem] py-[1rem] rounded-[4rem] bg-bg-third text-text font-semibold tracking-wide transition duration-500 hover:shadow-[0_0_2.5rem_#444546] hover:text-main mt-12 cursor-pointer"
                        type="submit" title="Send Message to Aryel" onClick={hoverSnd} disabled={isSending}>
                            {!isSending ? (
                                <>
                                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" aria-hidden="true" />
                                    Send Message
                                </>
                            ) : (
                                <>
                                    <svg aria-hidden="true" role="status" className="inline w-7 h-7 mr-2 animate-spin text-main" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                    </svg>
                                    Sending...
                                </>
                            )}
                        </button>
                        <button className="inline-block text-[1.6rem] px-[2.8rem] py-[1rem] rounded-[4rem] bg-bg-third text-text font-semibold tracking-wide transition duration-500 hover:shadow-[0_0_2.5rem_#444546] hover:text-main mt-12 cursor-pointer"
                        type="reset" title="Clear all inputs" onClick={eraseSnd} disabled={isSending}>
                            <FontAwesomeIcon icon={faEraser} className="mr-2" aria-hidden="true" /> Reset
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}