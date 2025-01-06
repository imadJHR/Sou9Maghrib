import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2015, Saga has been at the forefront of culinary innovation,
              blending traditional techniques with modern gastronomy. Our passionate
              team of chefs creates unforgettable dining experiences that celebrate
              the finest ingredients and artisanal craftsmanship.
            </p>
            <p className="text-gray-600">
              Every dish tells a story, every flavor carries a memory, and every
              meal is an opportunity to create something extraordinary.
            </p>
          </div>
          <div className="relative h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80"
              alt="Chef preparing food"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}