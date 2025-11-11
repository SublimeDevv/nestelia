export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-400">Error al cargar entradas: {message}</div>
    </div>
  );
}
