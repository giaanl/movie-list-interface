"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Movie } from "@/types/Movies";
import { GenreEnum } from "@/types/GenreEnum";
import { MoviesService } from "@/services/MoviesService";
import { toast } from "sonner";

interface ModalMovieProps {
  isOpen: boolean;
  onClose: () => void;
  movie?: Movie;
  onSubmit: (movie: Movie) => void;
}

export default function ModalMovie({
  isOpen,
  onClose,
  movie,
  onSubmit,
}: ModalMovieProps) {
  const [formData, setFormData] = useState<Movie>({
    title: "",
    originalTitle: "",
    duration: 0,
    description: "",
    budget: 0,
    imageLink: "",
    releaseDate: "",
    genre: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    } else {
      setFormData({
        title: "",
        originalTitle: "",
        duration: 0,
        description: "",
        budget: 0,
        imageLink: "",
        releaseDate: "",
      });
      setFile(null);
    }
  }, [isOpen, movie]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "duration" || name === "budget"
          ? value === ""
            ? 0
            : Number(value).toString()
          : value,
    }));
  };

  const handleGenreChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (movie) {
        await MoviesService.updateMovie(formData);
      } else {
        await MoviesService.createMovie(formData);
      }
      e.preventDefault();
      onSubmit(formData);
      onClose();
    } catch (error) {
      if (!movie) {
        toast.error("Erro ao cadastrar filme");
      } else {
        toast.error("Erro ao atualizar filme");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        setFormData((prev) => ({
          ...prev,
          file: base64String,
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
    setFile(selectedFile);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {movie ? "Editar Filme" : "Cadastrar Novo Filme"}
          </DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4"
            onClick={onClose}
          ></Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Título Original</label>
            <Input
              name="originalTitle"
              value={formData.originalTitle}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duração (minutos)</label>
            <Input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Orçamento</label>
            <Input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Arquivo de Imagem</label>
            <Input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Data de Estreia</label>
            <Input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gênero</label>
            <Select
              value={formData.genre ?? ""}
              onValueChange={handleGenreChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um gênero" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(GenreEnum).map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button
                className="m-0.25"
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancelar
              </Button>

              <Button
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none m-0.25"
                type="submit"
              >
                {movie ? "Salvar Alterações" : "Cadastrar Filme"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
