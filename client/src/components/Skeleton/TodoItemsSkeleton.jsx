export function TodoItemsSkeleton() {
    return (
        <div className="w-full px-12 py-7">
            <div className="flex justify-start items-center mb-4 py-6 border-b border-gray-200 w-full max-w-full box-border">
                <div className="m-0 text-[2.5rem] flex items-center gap-3 font-semibold leading-none">
                    All Tasks
                </div>

                <div className="relative w-[90px] h-7 ml-3 bg-gray-300 rounded-full overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-5">
                <div className="relative w-16 h-8 bg-gray-300 rounded-full overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>

                <div className="relative w-20 h-8 bg-gray-300 rounded-full overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>

                <div className="relative w-24 h-8 bg-gray-300 rounded-full overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>

                <div className="relative w-px h-6 bg-gray-200 mx-2"></div>

                <div className="relative w-[300px] h-8 bg-gray-300 rounded-full overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
            </div>

            <div className="custom-scroller list-none pt-1 pb-[100px] max-h-[calc(100vh-200px)] overflow-y-auto w-full box-border">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div className="flex items-center justify-between gap-3 px-2 py-4 border-b border-gray-200 last:border-b-0">
                        <div className='relative w-5 h-5 bg-gray-300 rounded overflow-hidden'>
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>

                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <div className="relative w-60 h-4 bg-gray-300 rounded overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                            </div>

                            <div className="relative w-full h-4 bg-gray-300 mt-1 rounded overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}