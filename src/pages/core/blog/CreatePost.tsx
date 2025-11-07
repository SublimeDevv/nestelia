import { useRef } from "react";
import { Editor } from "./components";
import { CreatePost as CreatePostService } from "./services/blogService";
import Quill from "quill";
import type { PostModel } from "./models";

export default function CreatePost() {
  const editorRef = useRef<Quill | null>(null);

  const publicarPost = async () => {
    if (editorRef.current) {
      const delta = editorRef.current.getContents();

      const post: PostModel = {
        title: "Test",
        content: JSON.stringify(delta),
      };

      const response = await CreatePostService(post);
      console.log(response);

    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 tracking-tight">
            Crear publicación
          </h1>
          <div className="w-16 h-0.5 bg-gray-900 mt-4"></div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <Editor ref={editorRef} />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Guardar borrador
          </button>
          <button
            onClick={publicarPost}
            className="px-6 py-2.5 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded"
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}