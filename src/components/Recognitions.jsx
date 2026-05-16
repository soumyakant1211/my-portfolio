import { Award, Star, Trophy, Image as ImageIcon } from 'lucide-react';

const recognitions = [
  {
    id: 1,
    title: "Monthly I Appreciate",
    date: "Nov 2024",
    icon: <Award className="text-yellow-500" size={24} />,
    description: "Awarded for rapid framework adaptation and delivering an end-to-end automated document generation solution that significantly improved operational efficiency.",
    image: "/award_photo_1.webp"
  },
  {
    id: 2,
    title: "Excellence in Delivery",
    date: "May 2024",
    icon: <Trophy className="text-emerald-500" size={24} />,
    description: "Recognized for outstanding execution metrics, collaborative excellence, and delivering highly stable automation pipelines to direct clients.",
    image: "/award_photo_2.webp"
  },
  {
    id: 3,
    title: "Rising Star",
    date: "Feb 2023",
    icon: <Star className="text-violet-500" size={24} />,
    description: "Awarded for high automation impact, accelerating test execution times, and significant coverage improvements across legacy systems.",
    image: "/award_photo_3.jpeg"
  }
];

const Recognitions = () => {
  return (
    <section id="recognitions" className="py-10 md:py-12 scroll-mt-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-800 dark:text-slate-100">
        <span className="text-violet-500 font-mono">03.</span> Recognitions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recognitions.map((award) => (
          <div 
            key={award.id} 
            className="flex flex-col rounded-3xl glass overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-violet-500/25 group border border-transparent hover:border-violet-500/40"
          >
            {/* Photo Section */}
            <div className="relative h-56 w-full bg-slate-200 dark:bg-slate-800/50 flex flex-col items-center justify-center border-b border-white/10 dark:border-slate-800 overflow-hidden shrink-0">
              {award.image ? (
                <img 
                  src={award.image} 
                  alt={award.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <>
                  <ImageIcon size={48} className="text-slate-400 dark:text-slate-600 mb-3 group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-500 uppercase">
                    Photo Pending
                  </span>
                </>
              )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  {award.icon}
                </div>
                <span className="text-xs font-bold font-mono px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full">
                  {award.date}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {award.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm">
                {award.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recognitions;
