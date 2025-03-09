

interface Testimonial {
    name: string;
    comment: string;
  }
  
  interface Partner {
    name: string;
    logo: string;
  }
  
  const testimonials: Testimonial[] = [
    { name: "Sarah J.", comment: "Hamro Pasal has revolutionized my online shopping experience. Their customer service is unparalleled!" },
    { name: "Mike T.", comment: "I've never had such a smooth and enjoyable shopping experience. Hamro Pasal is my go-to for all my needs." },
    { name: "Emily R.", comment: "The variety of products and the ease of use make Hamro Pasal stand out from other e-commerce platforms." },
  ];
  
  const partners: Partner[] = [
    { name: "EcoGoods", logo: "https://broadwayinfosys.com/uploads/logo/1705900306_15549.svg" },
    { name: "FashionForward", logo: "https://broadwayinfosys.com/uploads/logo/1705900306_15549.svg" },
    { name: "GadgetWorld", logo: "https://broadwayinfosys.com/uploads/logo/1705900306_15549.svg" },
    { name: "Global Partners", logo: "https://broadwayinfosys.com/uploads/logo/1705900306_15549.svg" }, // SVG from the internet

  ];
const AboutUs=()=>{
    return <>
   

    
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">About Hamro Pasal</h1>
        
        {/* Company Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2023, Hamro Pasal has quickly become a leader in the e-commerce industry. 
            We're passionate about providing our customers with a seamless shopping experience, 
            offering a wide range of high-quality products at competitive prices. Our commitment 
            to innovation and customer satisfaction drives everything we do.
          </p>
        </section>
        
        {/* Video Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Experience Hamro Pasal</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/EqVWlifUeuM?si=X6LSc4wPPI0_H_vE" 
              title="Hamro Pasal Promotional Video"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </section>
        
        {/* Mission Statement */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
            "To revolutionize online shopping by providing an unparalleled user experience, 
            curating the finest products, and fostering a community of satisfied customers."
          </blockquote>
        </section>
        
        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Customer-Centric Approach</li>
            <li>Innovation and Continuous Improvement</li>
            <li>Transparency and Integrity</li>
            <li>Sustainability and Ethical Practices</li>
          </ul>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6">
                <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partnerships */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  width={200}
                  height={100}
                  className="max-w-full h-auto"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join the Hamro Pasal Community</h2>
          <p className="text-gray-700 mb-6">Experience the future of online shopping today!</p>
          <a 
            href="/" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Start Shopping Now
          </a>
        </section>
      </main>
    </div>



    </>
}
export default AboutUs;