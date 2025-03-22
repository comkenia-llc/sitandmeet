"use client";
import Image from "next/image";

export default function CardOption({ title, image, onClick }) {
    return (
        <div
            onClick={onClick}
            className="relative w-full h-48 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:scale-105 transition-transform duration-200"
        >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />

            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 z-10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold text-center px-4 z-20">
                    {title}
                </span>
            </div>
        </div>
    );
}
