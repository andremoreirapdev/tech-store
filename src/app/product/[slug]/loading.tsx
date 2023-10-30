import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  const imageUrls = [
    {
      id: "1",
      name: "imagem 1",
    },
    {
      id: "2",
      name: "imagem 2",
    },
    {
      id: "3",
      name: "imagem 3",
    },
    {
      id: "4",
      name: "imagem 4",
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8">
      <div className="flex flex-col">
        <Skeleton className="flex h-[380px] w-full items-center justify-center bg-accent">
          <div className="h-auto max-h-[70%] w-auto max-w-[80%]" />
        </Skeleton>

        <div className="mt-8 grid grid-cols-4 gap-4 px-5">
          {imageUrls.map((imageUrl) => (
            <button
              key={imageUrl.id}
              className="flex h-[100px] items-center justify-center rounded-lg bg-accent"
            >
              <Skeleton className="h-auto max-h-[70%] w-auto max-w-[80%]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
