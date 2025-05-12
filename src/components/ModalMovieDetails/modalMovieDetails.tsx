"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Movie } from "@/types/Movies";
import Image from "next/image";

interface ModalMovieDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  movie?: Movie;
}

export default function ModalMovieDetails({
  isOpen,
  onClose,
  movie,
}: ModalMovieDetailsProps) {
  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {movie.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {movie.imageLink && (
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden">
              <Image
                src={movie.imageLink}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Título Original</h3>
              <p className="text-muted-foreground">
                {movie.originalTitle || "-"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Data de Lançamento</h3>
              <p className="text-muted-foreground">
                {movie.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Gênero</h3>
              <p className="text-muted-foreground">{movie.genre || "-"}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Duração</h3>
              <p className="text-muted-foreground">
                {movie.duration ? `${movie.duration} minutos` : "-"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Orçamento</h3>
              <p className="text-muted-foreground">
                {movie.budget
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(movie.budget)
                  : "-"}
              </p>
            </div>

            {movie.description && (
              <div>
                <h3 className="font-semibold text-lg">Descrição</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {movie.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
