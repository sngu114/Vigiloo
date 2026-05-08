type WorldCardProps = {
  world: any;
  isActive: boolean;
  onSelect: () => void;
};

export default function WorldCard({ world, isActive, onSelect }: WorldCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer transition-all duration-500 flex flex-col items-center group ${
        isActive ? "scale-105 z-20" : "scale-75 opacity-40 grayscale"
      }`}
    >
      <div
        className="w-32 h-32 lg:w-56 lg:h-56 rounded-[2.5rem] flex items-center justify-center text-5xl lg:text-8xl shadow-2xl transition-all duration-500 bg-gray-50 dark:bg-gray-900 group-hover:animate-bounce"
        style={{
          border: isActive ? `4px solid ${world.color}` : "4px solid transparent",
        }}
      >
        {world.icon}
      </div>
    </div>
  );
}