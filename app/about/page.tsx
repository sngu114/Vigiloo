export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFF] px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold text-[#7042F4] mb-2">
            About Us
          </h1>
          <p className="text-gray-600">
            Learn more about Vigiloo and our mission.
          </p>
        </div>

        {/* Mission */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Vigiloo is dedicated to helping people recognize and prevent scams 
            in everyday life. Our goal is to make cybersecurity education simple, 
            accessible, and practical for everyone.
          </p>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Our Team
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Nathan Soto - SCRUM Master</li>
            <li>Steven Nguyen - UI/UX Designer</li>
            <li>Andy Tran - Software Architect</li>
            <li>Sergio Nuno Zuniga - Senior Developer</li>
            <li>Caleb Zeringue - Product Tester</li>
            <li>Marcus Hudson - CI/CD Pipeline Enginner</li>
        </ul>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Contact Us
          </h2>
          <p className="text-gray-700">
            Email: contact@vigiloo.com
          </p>
        </section>

      </div>
    </main>
  );
}