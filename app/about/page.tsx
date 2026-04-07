import Link from 'next/link';

export default function AboutPage() {
  const team = [
    { 
      name: "Nathan Soto", 
      role: "SCRUM Master", 
      email: "nsoto1@lsu.edu", 
      bio: "I make Vigiloo happen.",
      github: "https://github.com/nathsoto1", 
      linkedin: "https://www.linkedin.com/in/nathan-soto-49224825a/",
      image: "/nathans.jpg",
      darkModeImage: "/nathansDarkMode.png" 
    },
    { 
      name: "Steven Nguyen", 
      role: "UI/UX Designer", 
      email: "sngu114@lsu.edu - stevennguyen896@gmail.com", 
      bio: "I make Vigiloo look pretty.",
      github: "https://github.com/sngu114", 
      linkedin: "https://www.linkedin.com/in/steven-nguyen-a7017132a/",
      image: "/steven.jpg",
      darkModeImage: "/stevenDarkMode.png"
    },
    { 
      name: "Andy Tran", 
      role: "Software Architect", 
      email: "atran66@lsu.edu", 
      bio: "I build Vigiloo.",
      github: "https://github.com/atran66", 
      linkedin: "https://www.linkedin.com/in/andy-tran3/",
      image: "/andy.jpg",
      darkModeImage: "/andyDarkMode.png"
    },
    { 
      name: "Sergio Nuno Zuniga", 
      role: "Senior Developer", 
      email: "snunoz2@lsu.edu", 
      bio: "I develop Vigiloo. I'm the CEO.",
      github: "https://github.com/snunoz", 
      linkedin: "https://linkedin.com/in/",
      image: "/sergio.jpg",
      darkModeImage: "/sergioDarkMode.png"
    },
    { 
      name: "Caleb Zeringue", 
      role: "Product Tester", 
      email: "czeri13@lsu.edu", 
      bio: "I test Vigiloo.",
      github: "https://github.com/Yeleb", 
      linkedin: "https://linkedin.com/in/",
      image: "/caleb.PNG",
      darkModeImage: "/calebDarkMode.png"
    },
    { 
      name: "Marcus Hudson", 
      role: "CI/CD Pipeline Engineer", 
      email: "mhuds34@lsu.edu", 
      bio: "I connect Vigiloo to the world.",
      github: "https://github.com/mmarcvss", 
      linkedin: "https://linkedin.com/in/",
      image: "/marcus.png",
      darkModeImage: "/marcusDarkMode.png"
    },
  ];

  return (
    <main className="min-h-screen bg-transparent px-6 py-20 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-16">
          
          {/* Title */}
          <div className="max-w-4xl">
            <p className="text-sm font-bold text-[#7042F4] uppercase tracking-widest mb-4">Organization</p>
            <h1 className="text-5xl font-black tracking-tight mb-4 text-foreground">About Us</h1>
            <p className="text-muted-foreground font-medium">
              Learn more about Vigiloo and our mission.
            </p>
          </div>

          {/* Mission */}
          <section className="max-w-4xl">
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vigiloo is dedicated to helping people recognize and prevent scams 
              in everyday life. Our goal is to make cybersecurity education simple, 
              inclusive, and practical for everyone. Special thank you to our professor, John Denny.
            </p>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-xl font-bold mb-8 text-[#7042F4]">Meet The Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {team.map((member, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  {/* Profile Picture Box */}
                  <div className="relative w-full aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
                    {/* Light Mode Image */}
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover dark:hidden" 
                    />
                    {/* Dark Mode Image */}
                    <img 
                      src={member.darkModeImage} 
                      alt={`${member.name} dark mode`}
                      className="hidden w-full h-full object-cover dark:block" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                      <span className="text-xs font-semibold text-[#7042F4] uppercase tracking-wider">{member.role}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">{member.email}</p>
                    {/* New Bio Section */}
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Link 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-lg hover:opacity-80 transition-opacity"
                    >
                      GitHub
                    </Link>
                    <Link 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-border text-foreground text-xs font-bold rounded-lg hover:bg-muted transition-colors"
                    >
                      LinkedIn
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="pt-6 border-t border-border max-w-4xl">
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">Contact Us</h2>
            <p className="text-muted-foreground">
              Email: <span className="text-[#7042F4] font-semibold">contact@vigiloo.com</span>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border max-w-6xl">
          <Link href="/home" className="text-[#7042F4] font-bold hover:underline flex items-center gap-2">
            ← Back to Vigiloo
          </Link>
        </div>

      </div>
    </main>
  );
}