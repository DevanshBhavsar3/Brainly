function CardSkeleton() {
  return (
    <div className="w-full h-fit bg-gray-700 border-2 border-white/10 px-4 py-2 rounded-md *:animate-pulse">
      <div className="bg-white/20 h-5 w-2/3 rounded-full mb-5"></div>
      <div className="bg-white/20 h-5 w-full rounded-full mb-1"></div>
      <div className="bg-white/20 h-5 w-1/2 rounded-full mb-1"></div>
      <div className="bg-white/20 h-5 w-2/3 rounded-full mb-5"></div>
      <div className="bg-white/20 h-5 w-20 rounded-full"></div>
    </div>
  );
}

export default CardSkeleton;
