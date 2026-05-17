export default function JobSkeleton() {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 animate-pulse">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-full skeleton flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 skeleton rounded w-2/3" />
          <div className="h-4 skeleton rounded w-1/3" />
          <div className="h-3 skeleton rounded w-1/2 mt-1" />
          <div className="flex gap-2 mt-3">
            <div className="h-6 skeleton rounded-full w-20" />
            <div className="h-6 skeleton rounded-full w-24" />
            <div className="h-6 skeleton rounded-full w-16" />
          </div>
          <div className="h-3 skeleton rounded w-full mt-3" />
          <div className="h-3 skeleton rounded w-4/5" />
          <div className="flex justify-between mt-4 pt-3 border-t border-[#F3F2EF]">
            <div className="h-4 skeleton rounded w-16" />
            <div className="h-7 skeleton rounded-full w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
