import ImageWithDeleteButton from "@/components/protected/property-detail/delete-image";
import UploadCoverImage from "@/components/protected/property-detail/upload-cover-image";
import UploadCarouselImages from "@/components/protected/property-detail/upload-images";
import { createClient } from "@/utils/supabase/server";

interface ImagesPageProps {
  params: {
    id: string;
  };
}

export default async function Images({ params }: ImagesPageProps) {
  const { id } = params;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const { data: galleryData, error: galleryError } = await supabase.storage
    .from("gallery-image")
    .list(`${user.id}/${id}`, {
      limit: 40,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (galleryError) {
    console.error(galleryError);
    return <div>Error loading gallery images</div>;
  }

  const { data: coverData, error: coverError } = await supabase.storage
    .from("cover-image")
    .list(`${user.id}/${id}`, {
      limit: 1,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    });

  if (coverError) {
    console.error(coverError);
    return <div>Error loading cover images</div>;
  }

  return (
    <main className="pb-16 lg:pb-24 antialiased flex flex-col lg:flex-row">
      <div className="w-full lg:w-4/6 p-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryData.map((image) => (
              <div
                key={image.name}
                className="aspect-w-1 aspect-h-1 rounded-sm overflow-hidden"
              >
                <ImageWithDeleteButton id={id} fileName={image.name} dir="gallery-image">               
                  <img
                    src={`https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/gallery-image/${user.id}/${id}/${image.name}`}
                    alt={`Image`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      height: "100%",
                    }}
                  />
                </ImageWithDeleteButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside className="w-full lg:w-2/6 p-4 flex flex-col space-y-4">
        {coverData.length > 0 ? (
          <div className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
            <ImageWithDeleteButton id={id} fileName={coverData[0].name} dir="cover-image">               
              <img
                src={`https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/cover-image/${user.id}/${id}/${coverData[0].name}`}
                alt="Cover Image"
                className="w-full h-full object-cover"
              />
            </ImageWithDeleteButton>
          </div>
        ) : (
          <UploadCoverImage id={id} />
        )}
        <UploadCarouselImages id={id} />
      </aside>
    </main>
  );
}
