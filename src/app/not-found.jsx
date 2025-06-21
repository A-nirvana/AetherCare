"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
      <img
        src="https://res.cloudinary.com/dmhbmurzw/image/upload/v1750441830/ChatGPT_Image_Jun_20_2025_09_31_50_PM_wellf0.png"
        alt="Doctor 404 Illustration"
        className="w-[600px]"
      />

      <h1 className="text-4xl font-extrabold text-green-700 mb-2">UH-OH! VITALS NOT FOUND</h1>

      <p className="text-gray-700 max-w-md mb-4">
        The patient record you’re looking for seems to have disappeared from our system.
      </p>

      <Link
        href="/"
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
