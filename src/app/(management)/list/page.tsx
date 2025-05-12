"use client";

import { useEffect, useState } from "react";
import ModalMovie from "@/components/ModalMovie/modalMovie";
import ModalMovieDetails from "@/components/ModalMovieDetails/modalMovieDetails";
import ModalFilter, {
  MovieFilters,
} from "@/components/modalFilter/modalFilter";
import { Movie } from "@/types/Movies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Eye,
  Sun,
  Moon,
} from "lucide-react";
import { MoviesService } from "@/services/MoviesService";

export default function List() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<MovieFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const itemsPerPage = 10;
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response: any = await MoviesService.getMovies(filters);
        setMovies(response?.list || []);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setMovies([]);
      }
    };
    fetchMovies();
  }, [filters]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleApplyFilters = (newFilters: MovieFilters) => {
    setFilters(newFilters);
  };

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleViewDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (movie: Movie) => {
    try {
      const response: any = await MoviesService.getMovies(filters);
      setMovies(response?.list || []);
    } catch (error) {}
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    buttons.push(
      <Button
        key="first"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="hidden sm:flex hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none w-full sm:w-auto"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
    );

    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none w-full sm:w-auto"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(i)}
          className={`hidden sm:flex hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none w-full sm:w-auto ${
            currentPage === i ? "bg-blue-600 text-white" : ""
          }`}
        >
          {i}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none w-full sm:w-auto"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    );

    buttons.push(
      <Button
        key="last"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="hidden sm:flex hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none w-full sm:w-auto"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    );

    return buttons;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-center text-2xl font-medium text-black dark:text-white">
          Listagem de Filmes
        </h1>
        <Button
          variant="outline"
          onClick={toggleTheme}
          className="w-10 h-10 p-0"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Button
          className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none w-full sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Cadastrar Filme
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsFilterModalOpen(true)}
          className="w-full sm:w-auto dark:border-gray-600 dark:hover:bg-gray-800"
        >
          Filtrar Filmes
        </Button>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {movies.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border dark:border-gray-600">
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-600">
                <TableHead className="w-[40%] dark:text-gray-200">Título</TableHead>
                <TableHead className="w-[30%] dark:text-gray-200">Lançamento</TableHead>
                <TableHead className="w-[20%] dark:text-gray-200">Gênero</TableHead>
                <TableHead className="w-[20%] dark:text-gray-200">Duração</TableHead>
                <TableHead className="w-[10%] text-center dark:text-gray-200">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMovies.map((movie) => (
                <TableRow key={movie.id} className="dark:border-gray-600">
                  <TableCell className="font-medium dark:text-gray-200">{movie.title}</TableCell>
                  <TableCell className="dark:text-gray-200">
                    {movie.releaseDate
                      ? new Date(movie.releaseDate).toLocaleDateString("pt-BR")
                      : "-"}
                  </TableCell>
                  <TableCell className="dark:text-gray-200">{movie.genre || "-"}</TableCell>
                  <TableCell className="dark:text-gray-200">{movie.duration || "-"}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(movie)}
                        className="hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none dark:border-gray-600 dark:hover:bg-gray-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(movie)}
                        className="hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none dark:border-gray-600 dark:hover:bg-gray-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 dark:text-gray-400">Nenhum filme encontrado</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a{" "}
            {Math.min(startIndex + itemsPerPage, filteredMovies.length)} de{" "}
            {filteredMovies.length} filmes
          </div>
          <div className="flex items-center gap-2">
            {renderPaginationButtons()}
          </div>
        </div>
      )}

      <ModalMovie
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMovie(undefined);
        }}
        movie={selectedMovie}
        onSubmit={handleSubmit}
      />

      <ModalMovieDetails
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedMovie(undefined);
        }}
        movie={selectedMovie}
      />

      <ModalFilter
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
}
