"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GenreEnum } from "@/types/GenreEnum";

interface ModalFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: MovieFilters) => void;
}

export interface MovieFilters {
  minDuration?: number;
  maxDuration?: number;
  startDate?: string;
  endDate?: string;
  genre?: string;
}

export default function ModalFilter({
  isOpen,
  onClose,
  onApplyFilters,
}: ModalFilterProps) {
  const [filters, setFilters] = useState<MovieFilters>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name.includes("Duration") ? Number(value) : value,
    }));
  };

  const handleGenreChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      genre: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({});
    onApplyFilters({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Filtrar Filmes</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Duração Mínima (min)
              </label>
              <Input
                type="number"
                name="minDuration"
                value={filters.minDuration || ""}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Duração Máxima (min)
              </label>
              <Input
                type="number"
                name="maxDuration"
                value={filters.maxDuration || ""}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Inicial</label>
              <Input
                type="date"
                name="startDate"
                value={filters.startDate || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data Final</label>
              <Input
                type="date"
                name="endDate"
                value={filters.endDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gênero</label>
            <Select
              value={filters.genre || ""}
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
                type="button"
                variant="outline"
                onClick={handleClearFilters}
              >
                Limpar Filtros
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              >
                Aplicar Filtros
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
