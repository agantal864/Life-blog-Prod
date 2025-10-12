export default function FeaturedToggle({isFeatured, onToggle}: {isFeatured: boolean; onToggle: () => void}) {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="font-serif font-medium text-lg">Featured</h2>
      <button onClick={onToggle}
        className={`w-10 h-6 flex items-center rounded-full px-1 transition-colors duration-300 ${
        isFeatured ? 'bg-black' : 'bg-gray-300'}`}>
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 
            ${isFeatured ? 'translate-x-4' : 'translate-x-0'}`}/>
      </button>
    </div>
  );
}
